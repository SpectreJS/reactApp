import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { weatherCodes } from '../data/mockData'

export function WeatherPage() {
  const navigate = useNavigate()
  const [city, setCity] = useState('Paris')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cityError, setCityError] = useState('')

  const loadWeather = async (query = city) => {
    if (!query.trim()) {
      setCityError('field required')
      return
    }

    setCityError('')
    setLoading(true)
    setError('')

    try {
      const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`)
      const geoJson = await geo.json()
      const result = geoJson.results?.[0]

      if (!result) throw new Error('Location not found')

      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${result.latitude}&longitude=${result.longitude}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`)
      const weatherJson = await weatherRes.json()
      const current = weatherJson.current

      setWeather({
        city: result.name,
        country: result.country,
        temp: Math.round(current.temperature_2m),
        wind: Math.round(current.wind_speed_10m),
        condition: weatherCodes[current.weather_code] ?? 'Current conditions',
      })
    } catch (err) {
      setError('Unable to fetch weather. Try another city.')
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWeather('Paris')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <header className="top-bar">
        <div className="top-left">
          <button className="icon-button" type="button" aria-label="Open Navigation Menu">
            <span className="material-symbols-outlined">menu</span>
          </button>

          <div className="brand-wrap">
            <div className="brand-badge">RML</div>
            <span className="brand-name">Weather</span>
          </div>
        </div>

        <div className="avatar-wrap">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            alt="Studio portrait"
            className="avatar"
          />
          <span className="avatar-status" />
        </div>
      </header>

      <main className="content">
        <section className="hero-block">
          <div className="status-chip">
            <span className="pulse-dot" />
            <span>Live forecast</span>
          </div>
          <h1>Weather</h1>
          <p>Check conditions and plan your day with a live city report.</p>
        </section>

        <div className="module-card weather-card">
          <div className="weather-search-field">
            <div className="field-group weather-field-group">
              <input
                className={cityError ? 'input-error' : ''}
                value={city}
                onChange={(e) => {
                  setCity(e.target.value)
                  if (e.target.value.trim()) setCityError('')
                }}
                placeholder="Search city"
              />
              {cityError && <p className="field-error">{cityError}</p>}
            </div>
            <button type="button" className="primary-action" onClick={() => loadWeather(city)}>Search</button>
          </div>

          {loading && <p className="status-line">Loading weather...</p>}
          {error && <p className="status-line error">{error}</p>}

          {weather && (
            <>
              <div className="weather-summary">
                <span className="material-symbols-outlined large-icon">wb_sunny</span>
                <div>
                  <h3>{weather.city}</h3>
                  <p>{weather.country}</p>
                </div>
              </div>

              <div className="weather-stats">
                <div>
                  <small>Temperature</small>
                  <strong>{weather.temp}°C</strong>
                </div>
                <div>
                  <small>Wind</small>
                  <strong>{weather.wind} km/h</strong>
                </div>
                <div>
                  <small>Condition</small>
                  <strong>{weather.condition}</strong>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  )
}
