import '../assets/style/BottomNav.css'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/contacts', label: 'Contacts', icon: 'people' },
  { to: '/todo', label: 'Todo', icon: 'checklist' },
  { to: '/weather', label: 'Weather', icon: 'wb_sunny' },
  { to: '/blog', label: 'Blog', icon: 'article' },
  { to: '/quiz', label: 'Quiz', icon: 'quiz' },
]

export function BottomNav() {
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
