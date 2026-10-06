import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export const translations = {
	en: {
		nav: {
			home: 'Home',
			contacts: 'Contacts',
			todo: 'Todo',
			weather: 'Weather',
			blog: 'Blog',
			quiz: 'Quiz',
		},
		common: {
			openMenu: 'Open Navigation Menu',
			search: 'Search',
			fieldRequired: 'Field required',
			live: 'Live',
			today: 'Today',
		},
		dashboard: {
			status: 'Sandbox Environment',
			title: 'React Mini Projects Lab',
			subtitle: 'Practice, build and master modern React development.',
			activeWorkspace: 'Active Workspace Target',
			workspaceText: 'Front-End Developer • React 19 • TypeScript • Tailwind',
			searchPlaceholder: 'Search sandbox modules...',
			header: 'Active Sandboxes',
			ready: 'Ready',
			stats: {
				projects: 'Projects',
				primitives: 'Primitives',
				network: 'Network',
				persistence: 'Persistence',
			},
			projectCards: {
				contacts: { title: 'Contacts', subtitle: 'Full CRUD Sandbox', button: 'Open Project' },
				todo: { title: 'Todo List', subtitle: 'State & Persistence', button: 'Open Project' },
				weather: { title: 'Weather', subtitle: 'REST Async Client', button: 'Open Project' },
				blog: { title: 'Dev Blog', subtitle: 'Client Routing', button: 'Open Project' },
				quiz: { title: 'Quiz App', subtitle: 'Interactive Learning', button: 'Open Project' },
			},
		},
		contacts: {
			status: 'Team Directory',
			title: 'Contacts',
			subtitle: 'Manage collaborators, roles and communication channels.',
			addTitle: 'Add contact',
			newBadge: 'New',
			fullName: 'Full name',
			email: 'Email address',
			role: 'Role / department',
			submit: 'Add to directory',
			searchPlaceholder: 'Search contacts...',
			members: 'Team members',
			people: 'people',
		},
		todo: {
			status: 'Productivity',
			title: 'Todo Productivity',
			subtitle: 'Keep your priorities clear, your focus sharp, and your momentum strong.',
			total: 'Total tasks',
			active: 'Active',
			completed: 'Completed',
			today: 'Today',
			priorityBoard: 'Priority board',
			addTaskPlaceholder: 'Add a task',
			addTask: 'Add task',
			all: 'All',
			filterActive: 'Active',
			filterCompleted: 'Completed',
			delete: 'Delete',
			focus: 'Focus',
			productiveDay: 'Productive day',
			momentum: 'Momentum',
			winningStreak: 'Winning streak',
			streak: '6 days',
		},
		weather: {
			status: 'Weather',
			title: 'Weather Radar',
			badge: 'Async/Await',
			searchPlaceholder: 'Search for a city, e.g., San Francisco, Tokyo...',
			search: 'Search',
			loading: 'Loading weather data...',
			dayTempRange: 'Day Temperature Range',
			sunrise: 'Sunrise',
			sunset: 'Sunset',
			searchError: 'Unable to fetch weather. Try another city.',
			emptyError: 'Field required',
		},
		blog: {
			status: 'Writes & notes',
			title: 'Dev Blog',
			subtitle: 'Capture insights and publish technical notes.',
			articleTitle: 'Article title',
			articleExcerpt: 'Write a short insight...',
			publish: 'Publish',
			latestPosts: 'Latest posts',
			items: 'items',
		},
		quiz: {
			status: 'Lab #06',
			title: 'Interactive Knowledge Check',
			score: 'Current Score',
			resultLabel: 'Current Score',
			restart: 'Restart',
			previous: 'Previous',
			next: 'Next Question',
			seeResults: 'See Results',
			questionOf: 'Question',
			of: 'of',
			sessionTelemetry: 'Session Telemetry',
			accuracy: 'Accuracy',
			avgSpeed: 'Avg speed',
			answered: 'Answered',
			live: 'Live',
		},
	},
	fr: {
		nav: {
			home: 'Accueil',
			contacts: 'Contacts',
			todo: 'Todo',
			weather: 'Météo',
			blog: 'Blog',
			quiz: 'Quiz',
		},
		common: {
			openMenu: 'Ouvrir le menu de navigation',
			search: 'Rechercher',
			fieldRequired: 'Champ requis',
			live: 'En direct',
			today: 'Aujourd’hui',
		},
		dashboard: {
			status: 'Environnement de test',
			title: 'Laboratoire de mini-projets React',
			subtitle: 'Pratiquez, construisez et maîtrisez le React moderne.',
			activeWorkspace: 'Cible de l’espace de travail',
			workspaceText: 'Développeuse front • React 19 • TypeScript • Tailwind',
			searchPlaceholder: 'Rechercher un module...',
			header: 'Sandbox actifs',
			ready: 'Prêt',
			stats: {
				projects: 'Projets',
				primitives: 'Primitives',
				network: 'Réseau',
				persistence: 'Persistance',
			},
			projectCards: {
				contacts: { title: 'Contacts', subtitle: 'Sandbox CRUD complet', button: 'Ouvrir le projet' },
				todo: { title: 'Liste de tâches', subtitle: 'État & persistance', button: 'Ouvrir le projet' },
				weather: { title: 'Météo', subtitle: 'Client asynchrone REST', button: 'Ouvrir le projet' },
				blog: { title: 'Blog Dev', subtitle: 'Routage client', button: 'Ouvrir le projet' },
				quiz: { title: 'Quiz', subtitle: 'Apprentissage interactif', button: 'Ouvrir le projet' },
			},
		},
		contacts: {
			status: 'Annuaire d’équipe',
			title: 'Contacts',
			subtitle: 'Gérez les collaborateurs, les rôles et les canaux de communication.',
			addTitle: 'Ajouter un contact',
			newBadge: 'Nouveau',
			fullName: 'Nom complet',
			email: 'Adresse e-mail',
			role: 'Rôle / service',
			submit: 'Ajouter au répertoire',
			searchPlaceholder: 'Rechercher un contact...',
			members: 'Membres de l’équipe',
			people: 'personnes',
		},
		todo: {
			status: 'Productivité',
			title: 'Productivité Todo',
			subtitle: 'Gardez vos priorités claires, votre focus net et votre élan fort.',
			total: 'Total des tâches',
			active: 'Actives',
			completed: 'Terminé',
			today: 'Aujourd’hui',
			priorityBoard: 'Tableau des priorités',
			addTaskPlaceholder: 'Ajouter une tâche',
			addTask: 'Ajouter',
			all: 'Tout',
			filterActive: 'Actives',
			filterCompleted: 'Terminées',
			delete: 'Supprimer',
			focus: 'Concentration',
			productiveDay: 'Journée productive',
			momentum: 'Élan',
			winningStreak: 'Série gagnante',
			streak: '6 jours',
		},
		weather: {
			status: 'Météo',
			title: 'Radar météo',
			badge: 'Async/Await',
			searchPlaceholder: 'Rechercher une ville, ex. Paris, Tokyo...',
			search: 'Rechercher',
			loading: 'Chargement des données météo...',
			dayTempRange: 'Plage de température du jour',
			sunrise: 'Lever du soleil',
			sunset: 'Coucher du soleil',
			searchError: 'Impossible de récupérer la météo. Essayez une autre ville.',
			emptyError: 'Champ requis',
		},
		blog: {
			status: 'Écrits & notes',
			title: 'Blog Dev',
			subtitle: 'Capturer des idées et publier des notes techniques.',
			articleTitle: 'Titre de l’article',
			articleExcerpt: 'Écrivez une courte idée...',
			publish: 'Publier',
			latestPosts: 'Derniers articles',
			items: 'éléments',
		},
		quiz: {
			status: 'Lab #06',
			title: 'Quiz interactif',
			score: 'Score actuel',
			resultLabel: 'Score actuel',
			restart: 'Recommencer',
			previous: 'Précédent',
			next: 'Question suivante',
			seeResults: 'Voir les résultats',
			questionOf: 'Question',
			of: 'sur',
			sessionTelemetry: 'Télémétrie de session',
			accuracy: 'Précision',
			avgSpeed: 'Vitesse moy.',
			answered: 'Répondu',
			live: 'En direct',
		},
	},
}

const LANG_KEY = 'mini-lab-language'

export function getInitialLanguage() {
	try {
		const saved = localStorage.getItem(LANG_KEY)
		if (saved === 'fr' || saved === 'en') return saved
	} catch { }

	return typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
	const [language, setLanguage] = useState(getInitialLanguage)

	useEffect(() => {
		try {
			localStorage.setItem(LANG_KEY, language)
		} catch { }
	}, [language])

	const value = useMemo(() => ({
		language,
		setLanguage,
		t: (path) => {
			const keys = path.split('.')
			let result = translations[language]

			for (const key of keys) {
				result = result?.[key]
				if (result === undefined) return path
			}

			return result
		},
	}), [language])

	return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
	const context = useContext(LanguageContext)

	if (!context) {
		throw new Error('useLanguage must be used inside LanguageProvider')
	}

	return context
}
