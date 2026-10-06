import { LanguageSwitcher } from './LanguageSwitcher'
import { useLanguage } from '../i18n'

export function AppHeader({ title }) {
	const { t } = useLanguage()

	return (
		<header className="top-bar">
			<div className="top-left">
				<div className="brand-wrap">
					<div className="brand-badge">RML</div>
					<span className="brand-name">{title}</span>
				</div>
			</div>

			<div className='nav-profil'>
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
	)
}
