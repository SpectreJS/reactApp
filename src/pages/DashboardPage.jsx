import '../assets/style/pages/DashboardPage.scss'
import { useNavigate } from 'react-router-dom'
import { AppHeader } from '../components/AppHeader'
import { ProjectCard } from '../components/ProjectCard'
import { getProjects, getStats } from '../data/mockData'
import { useLanguage } from '../i18n'

export function DashboardPage() {
	const navigate = useNavigate()
	const { language, t } = useLanguage()
	const stats = getStats(language)
	const projects = getProjects(language)

	return (
		<>
			<AppHeader title={t('dashboard.title')} />

			<main className="content">
				<section className="hero-block">
					<div className="status-chip">
						<span className="pulse-dot" />
						<span>{t('dashboard.status')}</span>
					</div>
					<h1>{t('dashboard.title')}</h1>
					<p>{t('dashboard.subtitle')}</p>
				</section>

				<section className="telemetry-card">
					<div className="telemetry-icon">
						<span className="material-symbols-outlined">terminal</span>
					</div>
					<div className="telemetry-copy">
						<p className="eyebrow">{t('dashboard.activeWorkspace')}</p>
						<p className="telemetry-text">{t('dashboard.workspaceText')}</p>
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
					<input type="text" placeholder={t('dashboard.searchPlaceholder')} aria-label={t('dashboard.searchPlaceholder')} />
					<span className="search-shortcut">⌘K</span>
				</div>

				<section className="projects-panel">
					<div className="projects-header">
						<h2>{t('dashboard.header')}</h2>
						<span>5/5 {t('dashboard.ready')}</span>
					</div>

					{projects.map((project) => (
						<ProjectCard key={project.key} project={project} onSelect={(key) => navigate(`/${key}`)} />
					))}
				</section>
			</main>
		</>
	)
}
