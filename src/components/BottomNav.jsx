import '../assets/style/components/bottomNav.scss'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../i18n'

export function BottomNav() {
	const { t } = useLanguage()

	const items = [
		{ to: '/', label: t('nav.home'), icon: 'home' },
		{ to: '/contacts', label: t('nav.contacts'), icon: 'people' },
		{ to: '/todo', label: t('nav.todo'), icon: 'checklist' },
		{ to: '/weather', label: t('nav.weather'), icon: 'wb_sunny' },
		{ to: '/blog', label: t('nav.blog'), icon: 'article' },
		{ to: '/quiz', label: t('nav.quiz'), icon: 'quiz' },
	]

	return (
		<nav className="bottom-nav" aria-label="Main navigation">
			{items.map((item) => (
				<NavLink
					key={item.to}
					to={item.to}
					className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}
				>
					<span className="material-symbols-outlined">{item.icon}</span>
					<span>{item.label}</span>
				</NavLink>
			))}
		</nav>
	)
}
