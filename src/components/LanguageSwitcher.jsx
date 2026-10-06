import { useLanguage } from '../i18n'

export function LanguageSwitcher() {
	const { language, setLanguage } = useLanguage()

	const switchWrapperStyle = {
		display: 'inline-flex',
		gap: 6,
		padding: 4,
		borderRadius: 999,
		background: 'rgba(255,255,255,0.7)',
		border: '1px solid rgba(119,117,135,0.18)',
	}

	const getButtonStyle = (isActive) => ({
		fontSize: 12,
		border: 'none',
		borderRadius: 999,
		padding: '6px 10px',
		fontWeight: 700,
		cursor: 'pointer',
		background: isActive ? '#3525cd' : 'transparent',
		color: isActive ? '#fff' : '#171b26',
	})

	return (
		<div style={switchWrapperStyle}>
			<button
				type="button"
				onClick={() => setLanguage('fr')}
				aria-pressed={language === 'fr'}
				style={getButtonStyle(language === 'fr')}
			>
				FR
			</button>
			<button
				type="button"
				onClick={() => setLanguage('en')}
				aria-pressed={language === 'en'}
				style={getButtonStyle(language === 'en')}
			>
				EN
			</button>
		</div>
	)
}
