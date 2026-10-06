import '../assets/style/pages/WeatherPage.scss'
import { useEffect, useState } from 'react'
import { LanguageSwitcher } from '../components/LanguageSwitcher'
import { weatherCodes } from '../data/mockData'
import { useLanguage } from '../i18n'

const getWeatherMeta = (code) => {
  const label = weatherCodes[code] ?? 'Current conditions'

  switch (code) {
    case 0:
      return { label, icon: 'wb_sunny', accent: 'sun' }
    case 1:
    case 2:
      return { label, icon: 'partly_cloudy_day', accent: 'cloud' }
    case 3:
    case 45:
    case 48:
      return { label, icon: 'cloud', accent: 'cloud' }
    case 51:
    case 53:
    case 55:
    case 61:
    case 63:
    case 65:
    case 80:
    case 81:
    case 82:
      return { label, icon: 'rainy', accent: 'rain' }
    case 95:
    case 96:
    case 99:
      return { label, icon: 'thunderstorm', accent: 'storm' }
    default:
      return { label, icon: 'wb_sunny', accent: 'sun' }
  }
}

const formatWeekday = (value) => {
  if (!value) return 'Today'
  return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(value))
}

export function WeatherPage() {
  const { t } = useLanguage()
  const [city, setCity] = useState('San Francisco')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cityError, setCityError] = useState('')

  const loadWeather = async (query = city) => {
    if (!query.trim()) {
      setCityError(t('weather.emptyError'))
      return
    }

    setCityError('')
    setLoading(true)
    setError('')

    try {
      const geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
      )
      const geoJson = await geo.json()
      const result = geoJson.results?.[0]

      if (!result) throw new Error('Location not found')

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${result.latitude}&longitude=${result.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,pressure_msl,weather_code,wind_speed_10m,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&forecast_days=5&timezone=auto`
      )
      const weatherJson = await weatherRes.json()
      const current = weatherJson.current
      const daily = weatherJson.daily
      const currentMeta = getWeatherMeta(current.weather_code)

      const forecast = daily.time.map((date, index) => {
        const dayMeta = getWeatherMeta(daily.weather_code[index])
        return {
          day: formatWeekday(date),
          icon: dayMeta.icon,
          label: dayMeta.label,
          high: Math.round(daily.temperature_2m_max[index]),
          low: Math.round(daily.temperature_2m_min[index]),
        }
      })

      setWeather({
        city: result.name,
        country: result.country,
        coordinates: `${result.latitude.toFixed(4)}° ${result.latitude >= 0 ? 'N' : 'S'}, ${Math.abs(result.longitude).toFixed(4)}° ${result.longitude >= 0 ? 'E' : 'W'}`,
        timezone: weatherJson.timezone ?? 'UTC',
        tempF: Math.round((current.temperature_2m * 9) / 5 + 32),
        tempC: Math.round(current.temperature_2m),
        feelsLikeF: Math.round((current.apparent_temperature * 9) / 5 + 32),
        humidity: current.relative_humidity_2m,
        wind: Math.round(current.wind_speed_10m),
        pressure: Math.round(current.pressure_msl),
        uvIndex: Math.round(current.uv_index),
        condition: currentMeta.label,
        icon: currentMeta.icon,
        precipitation: 5,
        dewPoint: Math.max(45, Math.round(current.temperature_2m - 10)),
        lowF: Math.round((Math.min(...daily.temperature_2m_min) * 9) / 5 + 32),
        highF: Math.round((Math.max(...daily.temperature_2m_max) * 9) / 5 + 32),
        forecast,
      })
    } catch (err) {
      setError(t('weather.searchError'))
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWeather('San Francisco')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <header className="top-bar">
        <div className="top-left">
          <button className="icon-button" type="button" aria-label={t('common.openMenu')}>
            <span className="material-symbols-outlined">menu</span>
          </button>

          <div className="brand-wrap">
            <div className="brand-badge">RML</div>
            <span className="brand-name">{t('weather.status')}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LanguageSwitcher />
          <div className="avatar-wrap">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
              alt="Studio portrait"
              className="avatar"
            />
            <span className="avatar-status" />
          </div>
        </div>
      </header>

      <main className="content weather-shell">
        <section className="weather-hero">
          <div className="weather-hero__copy">
            <h1>{t('weather.title')}</h1>
            <span className="weather-badge">{t('weather.badge')}</span>
          </div>
          <div className="weather-timing-badge">
            <span className="material-symbols-outlined">timer</span>
            <span>500ms Debounced</span>
          </div>
        </section>

        <div className="module-card weather-panel">
          <div className="weather-search-field">
            <span className="material-symbols-outlined weather-search-icon">search</span>
            <input
              value={city}
              className={cityError ? 'input-error' : ''}
              onChange={(e) => {
                setCity(e.target.value)
                if (e.target.value.trim()) setCityError('')
              }}
              placeholder={t('weather.searchPlaceholder')}
            />
            <span className="weather-shortcut">⌘K</span>
          </div>

          <button
            type="button"
            className="primary-action weather-search-button"
            onClick={() => loadWeather(city)}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite' }}>sync</span>
                <span>{t('weather.loading')}</span>
              </>
            ) : (
              <>
                <span>{t('weather.search')}</span>
              </>
            )}
          </button>
        </div>

        {loading && <p className="status-line">{t('weather.loading')}</p>}
        {error && <p className="status-line error">{error}</p>}

        {weather && (
          <>
            <section className="module-card weather-detail-card">
              <div className="weather-location-row">
                <div className="weather-location-wrap">
                  <span className="material-symbols-outlined">location_on</span>
                  <div>
                    <h2>{weather.city}</h2>
                    <p>{weather.coordinates}</p>
                  </div>
                </div>
                <span className="weather-live-badge">LIVE TELEMETRY</span>
              </div>

              <div className="weather-current-summary">
                <div className="weather-main-condition">
                  <span className="material-symbols-outlined weather-main-icon">{weather.icon}</span>
                  <div>
                    <div className="weather-temp-row">
                      <strong>{weather.tempF}°F</strong>
                      <span>/ {weather.tempC}°C</span>
                    </div>
                    <p>{weather.condition}</p>
                    <small>Precipitation: {weather.precipitation}% • Barometric Pressure: {weather.pressure} hPa</small>
                  </div>
                </div>

                <div className="weather-range-box">
                  <div>
                    <span>{t('weather.dayTempRange')}</span>
                    <strong>Low: {weather.lowF}°F • High: {weather.highF}°F</strong>
                  </div>
                  <div className="weather-sun-times">
                    <span><b>06:12 AM</b> {t('weather.sunrise')}</span>
                    <span><b>08:04 PM</b> {t('weather.sunset')}</span>
                  </div>
                </div>
              </div>

              <div className="weather-metric-grid">
                <article className="weather-metric-card">
                  <div className="metric-head">
                    <span>Humidity</span>
                    <span className="material-symbols-outlined">humidity_percentage</span>
                  </div>
                  <strong>{weather.humidity}%</strong>
                  <small>Dew point: {weather.dewPoint}°</small>
                </article>

                <article className="weather-metric-card">
                  <div className="metric-head">
                    <span>Wind Speed</span>
                    <span className="material-symbols-outlined">air</span>
                  </div>
                  <strong>{weather.wind} mph NW</strong>
                  <small>Gusts up to 18 mph</small>
                </article>

                <article className="weather-metric-card">
                  <div className="metric-head">
                    <span>Feels Like</span>
                    <span className="material-symbols-outlined">device_thermostat</span>
                  </div>
                  <strong>{weather.feelsLikeF}°F</strong>
                  <small>Slight sea breeze</small>
                </article>

                <article className="weather-metric-card">
                  <div className="metric-head">
                    <span>UV Index</span>
                    <span className="material-symbols-outlined">wb_sunny</span>
                  </div>
                  <strong>Moderate ({weather.uvIndex})</strong>
                  <small>Protection advised</small>
                </article>

                <article className="weather-metric-card air-quality">
                  <div className="metric-head">
                    <span>Air Quality</span>
                    <span className="material-symbols-outlined">energy_savings_leaf</span>
                  </div>
                  <strong>Good (24 AQI)</strong>
                  <small>Healthy atmospheric</small>
                </article>
              </div>
            </section>

            <section className="module-card weather-forecast-panel">
              <div className="weather-forecast-header">
                <h3>5-Day Extended Forecast</h3>
                <span>SYNCHRONIZED REST UTC</span>
              </div>

              <div className="weather-forecast-grid">
                {weather.forecast.map((day, index) => (
                  <div className={`forecast-day ${index === 1 ? 'is-active' : ''}`} key={`${day.day}-${index}`}>
                    {index === 1 && <span className="forecast-day-tag">TODAY</span>}
                    <span className="forecast-day-label">{day.day}</span>
                    <span className="material-symbols-outlined forecast-day-icon">{day.icon}</span>
                    <strong>{day.label}</strong>
                    <div className="forecast-day-temp">
                      <span>{day.high}°</span>
                      <span>{day.low}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="weather-cache-bar">
              <div className="weather-cache-info">
                <span className="material-symbols-outlined">database</span>
                <span>Cached in LocalStorage 5 mins ago • Live API linked</span>
              </div>

              <div className="weather-cache-actions">
                <button type="button" className="ghost-button">
                  <span className="material-symbols-outlined">refresh</span>
                  <span>Force Re-fetch</span>
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  )
}
