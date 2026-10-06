import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppHeader } from '../components/AppHeader'
import { defaultContacts } from '../data/mockData'
import { useLanguage } from '../i18n'

export function ContactsPage() {
	const navigate = useNavigate()
	const { t } = useLanguage()
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
		if (!value.trim()) return t('common.fieldRequired')
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
		setErrors((current) => ({ ...current, [field]: value.trim() ? '' : t('common.fieldRequired') }))
	}

	return (
		<>
			<AppHeader title={t('contacts.title')} />

			<main className="content">
				<section className="hero-block">
					<div className="status-chip">
						<span className="pulse-dot" />
						<span>{t('contacts.status')}</span>
					</div>
					<h1>{t('contacts.title')}</h1>
					<p>{t('contacts.subtitle')}</p>
				</section>

				<form className="module-card contact-form-panel" onSubmit={handleSubmit}>
					<div className="panel-header">
						<h3>{t('contacts.addTitle')}</h3>
						<span className="panel-badge">{t('contacts.newBadge')}</span>
					</div>

					<div className="field-grid">
						<div className="field-group">
							<input
								className={errors.name ? 'input-error' : ''}
								value={form.name}
								onChange={(e) => updateField('name', e.target.value)}
								placeholder={t('contacts.fullName')}
							/>
							{errors.name && <p className="field-error">{errors.name}</p>}
						</div>

						<div className="field-group">
							<input
								className={errors.email ? 'input-error' : ''}
								value={form.email}
								onChange={(e) => updateField('email', e.target.value)}
								placeholder={t('contacts.email')}
								type="email"
							/>
							{errors.email && <p className="field-error">{errors.email}</p>}
						</div>

						<div className="field-group">
							<input
								className={errors.role ? 'input-error' : ''}
								value={form.role}
								onChange={(e) => updateField('role', e.target.value)}
								placeholder={t('contacts.role')}
							/>
							{errors.role && <p className="field-error">{errors.role}</p>}
						</div>
					</div>

					<button type="submit" className="primary-action">{t('contacts.submit')}</button>
				</form>

				<div className="search-wrap contacts-search">
					<span className="material-symbols-outlined search-icon">search</span>
					<input type="text" placeholder={t('contacts.searchPlaceholder')} aria-label={t('contacts.searchPlaceholder')} />
				</div>

				<section className="projects-panel">
					<div className="projects-header">
						<h2>{t('contacts.members')}</h2>
						<span>{contacts.length} {t('contacts.people')}</span>
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
