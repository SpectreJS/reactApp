import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppHeader } from '../components/AppHeader'
import { defaultTasks } from '../data/mockData'
import { useLanguage } from '../i18n'

export function TodoPage() {
	const navigate = useNavigate()
	const { t } = useLanguage()
	const [tasks, setTasks] = useState(() => {
		if (typeof window === 'undefined') return defaultTasks
		const saved = localStorage.getItem('mini-lab-tasks')
		return saved ? JSON.parse(saved) : defaultTasks
	})
	const [filter, setFilter] = useState('all')
	const [text, setText] = useState('')
	const [error, setError] = useState('')

	useEffect(() => {
		localStorage.setItem('mini-lab-tasks', JSON.stringify(tasks))
	}, [tasks])

	const completedCount = tasks.filter((task) => task.completed).length
	const activeCount = tasks.length - completedCount
	const completionRate = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0

	const visibleTasks = useMemo(() => {
		switch (filter) {
			case 'active':
				return tasks.filter((task) => !task.completed)
			case 'completed':
				return tasks.filter((task) => task.completed)
			default:
				return tasks
		}
	}, [tasks, filter])

	const addTask = (event) => {
		event.preventDefault()

		if (!text.trim()) {
			setError(t('common.fieldRequired'))
			return
		}

		setError('')
		setTasks((current) => [{ id: Date.now(), text: text.trim(), completed: false }, ...current])
		setText('')
	}

	const toggleTask = (id) => {
		setTasks((current) => current.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
	}

	const deleteTask = (id) => {
		setTasks((current) => current.filter((task) => task.id !== id))
	}

	return (
		<>
			<AppHeader title={t('todo.title')} />

			<main className="content todo-page">
				<section className="hero-block">
					<div className="status-chip">
						<span className="pulse-dot" />
						<span>{t('todo.status')}</span>
					</div>
					<h1>{t('todo.title')}</h1>
					<p>{t('todo.subtitle')}</p>
				</section>

				<div className="todo-overview">
					<div className="todo-stat-card accent-primary">
						<div className="stat-icon">
							<span className="material-symbols-outlined">task_alt</span>
						</div>
						<div className="stat-label">
							<small>{t('todo.total')}</small>
							<strong>{tasks.length}</strong>
						</div>
					</div>

					<div className="todo-stat-card accent-secondary">
						<div className="stat-icon">
							<span className="material-symbols-outlined">pending_actions</span>
						</div>
						<div className="stat-label">
							<small>{t('todo.active')}</small>
							<strong>{activeCount}</strong>
						</div>
					</div>

					<div className="todo-stat-card accent-tertiary">
						<div className="stat-icon">
							<span className="material-symbols-outlined">trending_up</span>
						</div>
						<div className="stat-label">
							<small>{t('todo.completed')}</small>
							<strong>{completionRate}%</strong>
						</div>
					</div>
				</div>

				<div className="module-card todo-workspace">
					<div className="todo-panel">
						<div className="todo-panel-header">
							<div>
								<span className="eyebrow">{t('todo.today')}</span>
								<h2>{t('todo.priorityBoard')}</h2>
							</div>
							<span className="todo-percent">{completionRate}%</span>
						</div>

						<div className="todo-progress" aria-label="Task completion progress">
							<div className="todo-progress-bar" style={{ width: `${completionRate}%` }} />
						</div>

						<form className="todo-form" onSubmit={addTask}>
							<div className="field-group todo-field-group">
								<input
									className={error ? 'input-error' : ''}
									value={text}
									onChange={(e) => {
										setText(e.target.value)
										if (e.target.value.trim()) setError('')
									}}
									placeholder={t('todo.addTaskPlaceholder')}
								/>
								{error && <p className="field-error">{error}</p>}
							</div>
							<button type="submit" className="primary-action">{t('todo.addTask')}</button>
						</form>

						<div className="filter-row">
							{[
								{ value: 'all', label: t('todo.all') },
								{ value: 'active', label: t('todo.filterActive') },
								{ value: 'completed', label: t('todo.filterCompleted') },
							].map(({ value, label }) => (
								<button key={value} type="button" className={`filter-pill ${filter === value ? 'active' : ''}`} onClick={() => setFilter(value)}>
									{label}
								</button>
							))}
						</div>

						<div className="list-stack todo-list">
							{visibleTasks.map((task) => (
								<div key={task.id} className={`module-card task-item todo-task-item ${task.completed ? 'done' : ''}`}>
									<label className="check-wrap">
										<input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
										<span>{task.text}</span>
									</label>
									<button type="button" className="ghost-button" onClick={() => deleteTask(task.id)}>{t('todo.delete')}</button>
								</div>
							))}
						</div>
					</div>

					<aside className="todo-side-panel">
						<div className="todo-side-card">
							<span className="eyebrow accent">{t('todo.focus')}</span>
							<h3>{t('todo.productiveDay')}</h3>
							<ul className="todo-focus-list">
								<li><span className="material-symbols-outlined">check_circle</span> Ship core milestone</li>
								<li><span className="material-symbols-outlined">schedule</span> Two deep work blocks</li>
								<li><span className="material-symbols-outlined">leaderboard</span> Keep the streak alive</li>
							</ul>
						</div>

						<div className="todo-side-card muted">
							<span className="eyebrow accent">{t('todo.momentum')}</span>
							<h3>{t('todo.winningStreak')}</h3>
							<div className="streak-value">{t('todo.streak')}</div>
							<p>Small consistent actions create big wins over time.</p>
						</div>
					</aside>
				</div>
			</main>
		</>
	)
}
