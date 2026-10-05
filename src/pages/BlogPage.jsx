import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { defaultBlogPosts } from '../data/mockData'

export function BlogPage() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState(() => {
    if (typeof window === 'undefined') return defaultBlogPosts
    const saved = localStorage.getItem('mini-lab-blog')
    return saved ? JSON.parse(saved) : defaultBlogPosts
  })
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [errors, setErrors] = useState({ title: '', excerpt: '' })

  useEffect(() => {
    localStorage.setItem('mini-lab-blog', JSON.stringify(posts))
  }, [posts])

  const updateField = (field, value) => {
    if (field === 'title') setTitle(value)
    if (field === 'excerpt') setExcerpt(value)
    setErrors((current) => ({ ...current, [field]: value.trim() ? '' : 'field required' }))
  }

  const addPost = (event) => {
    event.preventDefault()

    const nextErrors = {
      title: title.trim() ? '' : 'field required',
      excerpt: excerpt.trim() ? '' : 'field required',
    }

    setErrors(nextErrors)

    if (nextErrors.title || nextErrors.excerpt) {
      return
    }

    setPosts((current) => [{ id: Date.now(), title: title.trim(), excerpt: excerpt.trim() }, ...current])
    setTitle('')
    setExcerpt('')
    setErrors({ title: '', excerpt: '' })
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
            <span className="brand-name">Dev Blog</span>
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
            <span>Writes & notes</span>
          </div>
          <h1>Dev Blog</h1>
          <p>Capture insights and publish technical notes.</p>
        </section>

        <form className="module-card blog-form" onSubmit={addPost}>
          <div className="field-group">
            <input
              className={errors.title ? 'input-error' : ''}
              value={title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Article title"
            />
            {errors.title && <p className="field-error">{errors.title}</p>}
          </div>

          <div className="field-group">
            <textarea
              className={errors.excerpt ? 'input-error' : ''}
              value={excerpt}
              onChange={(e) => updateField('excerpt', e.target.value)}
              placeholder="Write a short insight..."
              rows={4}
            />
            {errors.excerpt && <p className="field-error">{errors.excerpt}</p>}
          </div>

          <button type="submit" className="primary-action">Publish</button>
        </form>

        <section className="projects-panel">
          <div className="projects-header">
            <h2>Latest posts</h2>
            <span>{posts.length} items</span>
          </div>

          <div className="list-stack">
            {posts.map((post) => (
              <article key={post.id} className="module-card blog-item">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
