import '../assets/style/DashboardPage.css'
import { useNavigate } from 'react-router-dom'
import { ProjectCard } from '../components/ProjectCard'
import { projects, stats } from '../data/mockData'

export function DashboardPage() {
  const navigate = useNavigate()

  return (
    <>
      <header className="top-bar">
        <div className="top-left">
          <button className="icon-button" type="button" aria-label="Open Navigation Menu">
            <span className="material-symbols-outlined">menu</span>
          </button>

          <div className="brand-wrap">
            <div className="brand-badge">RML</div>
            <span className="brand-name">React Mini Projects Lab</span>
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
            <span>Sandbox Environment</span>
          </div>
          <h1>React Mini Projects Lab</h1>
          <p>Practice, build and master modern React development.</p>
        </section>

        <section className="telemetry-card">
          <div className="telemetry-icon">
            <span className="material-symbols-outlined">terminal</span>
          </div>
          <div className="telemetry-copy">
            <p className="eyebrow">Active Workspace Target</p>
            <p className="telemetry-text">Front-End Developer • React 19 • TypeScript • Tailwind</p>
          </div>
        </section>

        <section className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="stat-header">
                <span className="stat-label">{stat.label}</span>
                <span className={`material-symbols-outlined stat-icon ${stat.color}`}>{stat.icon}</span>
              </div>
              <div className="stat-body">
                <div className="stat-value">{stat.value}</div>
                <span className={`stat-meta ${stat.color}`}>{stat.meta}</span>
              </div>
            </div>
          ))}
        </section>

        <div className="search-wrap">
          <span className="material-symbols-outlined search-icon">search</span>
          <input type="text" placeholder="Search sandbox modules..." aria-label="Search sandbox modules" />
          <span className="search-shortcut">⌘K</span>
        </div>

        <section className="projects-panel">
          <div className="projects-header">
            <h2>Active Sandboxes</h2>
            <span>5/5 Ready</span>
          </div>

          {projects.map((project) => (
            <ProjectCard key={project.key} project={project} onSelect={(key) => navigate(`/${key}`)} />
          ))}
        </section>
      </main>
    </>
  )
}
