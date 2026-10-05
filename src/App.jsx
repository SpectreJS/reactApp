import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BottomNav } from './components/BottomNav'
import { BlogPage } from './pages/BlogPage'
import { ContactsPage } from './pages/ContactsPage'
import { DashboardPage } from './pages/DashboardPage'
import { QuizPage } from './pages/QuizPage'
import { TodoPage } from './pages/TodoPage'
import { WeatherPage } from './pages/WeatherPage'

function AppRoutes() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
      <BottomNav />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
