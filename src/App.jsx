import { useEffect, useRef } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { animatePageTransition, revealSectionElements } from './animations'
import { BottomNav } from './components/BottomNav'
import { LanguageProvider } from './i18n'
import { BlogPage } from './pages/BlogPage'
import { ContactsPage } from './pages/ContactsPage'
import { DashboardPage } from './pages/DashboardPage'
import { QuizPage } from './pages/QuizPage'
import { TodoPage } from './pages/TodoPage'
import { WeatherPage } from './pages/WeatherPage'

function AppRoutes() {
	const location = useLocation()
	const pageRef = useRef(null)

	useEffect(() => {
		if (!pageRef.current) return

		const pageContext = animatePageTransition(pageRef.current)
		const revealContext = revealSectionElements(pageRef.current)

		return () => {
			pageContext?.revert()
			revealContext?.revert()
		}
	}, [location.pathname])

	return (
		<div className="app-shell">
			<div ref={pageRef} className="page-transition-shell">
				<Routes location={location}>
					<Route path="/" element={<DashboardPage />} />
					<Route path="/contacts" element={<ContactsPage />} />
					<Route path="/todo" element={<TodoPage />} />
					<Route path="/weather" element={<WeatherPage />} />
					<Route path="/blog" element={<BlogPage />} />
					<Route path="/quiz" element={<QuizPage />} />
				</Routes>
			</div>
			<BottomNav />
		</div>
	)
}

function App() {
	return (
		<LanguageProvider>
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
		</LanguageProvider>
	)
}

export default App
