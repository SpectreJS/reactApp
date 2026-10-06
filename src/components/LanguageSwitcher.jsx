import { useLanguage } from '../i18n'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div style={{ display: 'inline-flex', gap: 6, borderRadius: 999, background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(119,117,135,0.18)', padding: 4 }}>
      <button
        type="button"
        onClick={() => setLanguage('fr')}
        aria-pressed={language === 'fr'}
        style={{
          border: 'none',
          borderRadius: 999,
          padding: '6px 10px',
          background: language === 'fr' ? '#3525cd' : 'transparent',
          color: language === 'fr' ? '#fff' : '#171b26',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        style={{
          border: 'none',
          borderRadius: 999,
          padding: '6px 10px',
          background: language === 'en' ? '#3525cd' : 'transparent',
          color: language === 'en' ? '#fff' : '#171b26',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        EN
      </button>
    </div>
  )
}
