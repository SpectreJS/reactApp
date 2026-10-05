import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { defaultTasks } from '../data/mockData'

export function TodoPage() {
  const navigate = useNavigate()
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
      setError('field required')
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
      <header className="top-bar">
        <div className="top-left">
          <button className="icon-button" type="button" aria-label="Open Navigation Menu">
            <span className="material-symbols-outlined">menu</span>
          </button>

          <div className="brand-wrap">
            <div className="brand-badge">RML</div>
            <span className="brand-name">Todo Productivity</span>
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

      <main className="content todo-page">
        <section className="hero-block">
          <div className="status-chip">
            <span className="pulse-dot" />
            <span>Productivity</span>
          </div>
          <h1>Todo Productivity</h1>
          <p>Keep your priorities clear, your focus sharp, and your momentum strong.</p>
        </section>

        <div className="todo-overview">
          <div className="todo-stat-card accent-primary">
            <div className="stat-icon">
              <span className="material-symbols-outlined">task_alt</span>
            </div>
            <div className="stat-label">
              <small>Total tasks</small>
              <strong>{tasks.length}</strong>
            </div>
          </div>

          <div className="todo-stat-card accent-secondary">
            <div className="stat-icon">
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
            <div className="stat-label">
              <small>Active</small>
              <strong>{activeCount}</strong>
            </div>
          </div>

          <div className="todo-stat-card accent-tertiary">
            <div className="stat-icon">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <div className="stat-label">
              <small>Completed</small>
              <strong>{completionRate}%</strong>
            </div>
          </div>
        </div>

        <div className="module-card todo-workspace">
          <div className="todo-panel">
            <div className="todo-panel-header">
              <div>
                <span className="eyebrow">Today</span>
                <h2>Priority board</h2>
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
                  placeholder="Add a task"
                />
                {error && <p className="field-error">{error}</p>}
              </div>
              <button type="submit" className="primary-action">Add task</button>
            </form>

            <div className="filter-row">
              {['all', 'active', 'completed'].map((value) => (
                <button key={value} type="button" className={`filter-pill ${filter === value ? 'active' : ''}`} onClick={() => setFilter(value)}>
                  {value}
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
                  <button type="button" className="ghost-button" onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>

          <aside className="todo-side-panel">
            <div className="todo-side-card">
              <span className="eyebrow accent">Focus</span>
              <h3>Productive day</h3>
              <ul className="todo-focus-list">
                <li><span className="material-symbols-outlined">check_circle</span> Ship core milestone</li>
                <li><span className="material-symbols-outlined">schedule</span> Two deep work blocks</li>
                <li><span className="material-symbols-outlined">leaderboard</span> Keep the streak alive</li>
              </ul>
            </div>

            <div className="todo-side-card muted">
              <span className="eyebrow accent">Momentum</span>
              <h3>Winning streak</h3>
              <div className="streak-value">6 days</div>
              <p>Small consistent actions create big wins over time.</p>
            </div>
          </aside>
        </div>
      </main>
    </>
  )
}
