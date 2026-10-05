export const stats = [
  { label: 'Projects', value: '5', meta: 'Mini Projects', icon: 'science', color: 'primary' },
  { label: 'Primitives', value: '12', meta: 'Hooks used', icon: 'extension', color: 'tertiary' },
  { label: 'Network', value: 'Live Sync', meta: 'REST APIs', icon: 'cloud_sync', color: 'secondary' },
  { label: 'Persistence', value: 'Client State', meta: 'LocalStorage', icon: 'database', color: 'primary-alt' },
]

export const projects = [
  { key: 'contacts', title: 'Contacts', subtitle: 'Full CRUD Sandbox', desc: 'Manage contacts with CRUD, forms & LocalStorage with schema validation.', icon: 'contacts', accent: 'primary', chips: ['React', 'Formik', 'Storage'], footer: 'v1.4 • IndexedDB Sync', button: 'Open Project' },
  { key: 'todo', title: 'Todo List', subtitle: 'State & Persistence', desc: 'Manage tasks, filters, completion states & persistence with custom reducers.', icon: 'check_circle', accent: 'surface', chips: ['Hooks', 'State', 'LocalStorage'], footer: 'useReducer Flow', button: 'Open Project' },
  { key: 'weather', title: 'Weather', subtitle: 'REST Async Client', desc: 'Search cities & real-time conditions with live debounced geolocation query feeds.', icon: 'wb_sunny', accent: 'secondary', chips: ['REST API', 'Async', 'Fetch'], footer: 'OpenWeather API', button: 'Open Project' },
  { key: 'blog', title: 'Dev Blog', subtitle: 'Client Routing', desc: 'Create, edit articles & comments using simulated database state and markdown rendering.', icon: 'article', accent: 'tertiary', chips: ['Router', 'Markdown', 'CRUD'], footer: 'React Router v7', button: 'Open Project' },
  { key: 'quiz', title: 'Quiz App', subtitle: 'Interactive Learning', desc: 'Challenge your knowledge with timed questions, scoring, and instant feedback loops.', icon: 'quiz', accent: 'primary', chips: ['State', 'Logic', 'UX'], footer: 'Adaptive Flow', button: 'Open Project' },
]

export const defaultContacts = [
  { id: 1, name: 'Alicia Stone', email: 'alicia@studio.dev', role: 'Product Designer' },
  { id: 2, name: 'Milo Chen', email: 'milo@labs.dev', role: 'Frontend Engineer' },
  { id: 3, name: 'Nora West', email: 'nora@ux.club', role: 'User Researcher' },
]

export const defaultTasks = [
  { id: 1, text: 'Refine dashboard cards', completed: true },
  { id: 2, text: 'Ship weather module', completed: false },
  { id: 3, text: 'Add quiz interactions', completed: false },
]

export const defaultBlogPosts = [
  { id: 1, title: 'Designing clean state transitions', excerpt: 'How to keep visual feedback obvious without adding friction to the user journey.' },
  { id: 2, title: 'Why local-first apps feel instant', excerpt: 'Caching and optimistic UI patterns create a responsive product experience.' },
]

export const questions = [
  {
    category: 'Hooks & State',
    prompt: 'What does the useState hook return in React?',
    options: ['A single state variable object', 'An array with the current state value and updater function', 'A Redux reducer dispatch function', 'A promise resolving to the next state'],
    answer: 'An array with the current state value and updater function',
  },
  {
    category: 'Rendering',
    prompt: 'What is the purpose of JSX?',
    options: ['Style sheet syntax', 'A template language for UI', 'CSS utility library', 'Database query syntax'],
    answer: 'A template language for UI',
  },
  {
    category: 'Data Flow',
    prompt: 'Which prop pattern is commonly used to pass state upward?',
    options: ['Inheritance', 'Callback props', 'Context injection', 'Portal rendering'],
    answer: 'Callback props',
  },
  {
    category: 'Array Methods',
    prompt: 'What does the map() method return?',
    options: ['An object', 'A new array', 'A string', 'A promise'],
    answer: 'A new array',
  },
]

export const weatherCodes = {
  0: 'Clear sky',
  1: 'Mostly clear',
  2: 'Partly cloudy',
  3: 'Cloudy',
  45: 'Foggy',
  48: 'Rime fog',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Heavy drizzle',
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',
  80: 'Rain showers',
  81: 'Heavy showers',
  82: 'Violent showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Severe thunderstorm',
}
