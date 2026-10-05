import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { defaultContacts } from '../data/mockData'

export function ContactsPage() {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState(() => {
    if (typeof window === 'undefined') return defaultContacts
    const saved = localStorage.getItem('mini-lab-contacts')
    return saved ? JSON.parse(saved) : defaultContacts
  })
  const [form, setForm] = useState({ name: '', email: '', role: '' })
  const [errors, setErrors] = useState({ name: '', email: '', role: '' })

  useEffect(() => {
    localStorage.setItem('mini-lab-contacts', JSON.stringify(contacts))
  }, [contacts])

  const validateField = (name, value) => {
    if (!value.trim()) return 'field required'
    return ''
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {
      name: validateField('name', form.name),
      email: validateField('email', form.email),
      role: validateField('role', form.role),
    }

    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean)) {
      return
    }

    setContacts((current) => [
      { id: Date.now(), name: form.name.trim(), email: form.email.trim(), role: form.role.trim() || 'Team Member' },
      ...current,
    ])
    setForm({ name: '', email: '', role: '' })
    setErrors({ name: '', email: '', role: '' })
  }

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: value.trim() ? '' : 'field required' }))
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
            <span className="brand-name">Contacts</span>
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
            <span>Team Directory</span>
          </div>
          <h1>Contacts</h1>
          <p>Manage collaborators, roles and communication channels.</p>
        </section>

        <form className="module-card contact-form-panel" onSubmit={handleSubmit}>
          <div className="panel-header">
            <h3>Add contact</h3>
            <span className="panel-badge">New</span>
          </div>

          <div className="field-grid">
            <div className="field-group">
              <input
                className={errors.name ? 'input-error' : ''}
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Full name"
              />
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>

            <div className="field-group">
              <input
                className={errors.email ? 'input-error' : ''}
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="Email address"
                type="email"
              />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>

            <div className="field-group">
              <input
                className={errors.role ? 'input-error' : ''}
                value={form.role}
                onChange={(e) => updateField('role', e.target.value)}
                placeholder="Role / department"
              />
              {errors.role && <p className="field-error">{errors.role}</p>}
            </div>
          </div>

          <button type="submit" className="primary-action">Add to directory</button>
        </form>

        <div className="search-wrap contacts-search">
          <span className="material-symbols-outlined search-icon">search</span>
          <input type="text" placeholder="Search contacts..." aria-label="Search contacts" />
          <span className="search-shortcut">⌘F</span>
        </div>

        <section className="projects-panel">
          <div className="projects-header">
            <h2>Team members</h2>
            <span>{contacts.length} people</span>
          </div>

          <div className="list-stack contact-list-stack">
            {contacts.map((contact) => (
              <div key={contact.id} className="module-card contact-item-card">
                <div className="avatar-mini">{contact.name.charAt(0).toUpperCase()}</div>

                <div className="contact-copy">
                  <div className="contact-copy__head">
                    <strong>{contact.name}</strong>
                    <span className="contact-status online" />
                  </div>
                  <span>{contact.role}</span>
                  <small>{contact.email}</small>
                </div>

                <button type="button" className="contact-action" aria-label={`Message ${contact.name}`}>
                  <span className="material-symbols-outlined">sms</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
