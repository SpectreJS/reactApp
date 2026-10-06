import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LanguageSwitcher } from '../components/LanguageSwitcher'
import { defaultBlogPosts } from '../data/mockData'
import { useLanguage } from '../i18n'

export function BlogPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
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
    setErrors((current) => ({ ...current, [field]: value.trim() ? '' : t('common.fieldRequired') }))
  }

  const addPost = (event) => {
    event.preventDefault()

    const nextErrors = {
      title: title.trim() ? '' : t('common.fieldRequired'),
      excerpt: excerpt.trim() ? '' : t('common.fieldRequired'),
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
          <button className="icon-button" type="button" aria-label={t('common.openMenu')}>
            <span className="material-symbols-outlined">menu</span>
          </button>

          <div className="brand-wrap">
            <div className="brand-badge">RML</div>
            <span className="brand-name">{t('blog.title')}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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

      <main className="content">
        <section className="hero-block">
          <div className="status-chip">
            <span className="pulse-dot" />
            <span>{t('blog.status')}</span>
          </div>
          <h1>{t('blog.title')}</h1>
          <p>{t('blog.subtitle')}</p>
        </section>

        <form className="module-card blog-form" onSubmit={addPost}>
          <div className="field-group">
            <input
              className={errors.title ? 'input-error' : ''}
              value={title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder={t('blog.articleTitle')}
            />
            {errors.title && <p className="field-error">{errors.title}</p>}
          </div>

          <div className="field-group">
            <textarea
              className={errors.excerpt ? 'input-error' : ''}
              value={excerpt}
              onChange={(e) => updateField('excerpt', e.target.value)}
              placeholder={t('blog.articleExcerpt')}
              rows={4}
            />
            {errors.excerpt && <p className="field-error">{errors.excerpt}</p>}
          </div>

          <button type="submit" className="primary-action">{t('blog.publish')}</button>
        </form>

        <section className="projects-panel">
          <div className="projects-header">
            <h2>{t('blog.latestPosts')}</h2>
            <span>{posts.length} {t('blog.items')}</span>
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
