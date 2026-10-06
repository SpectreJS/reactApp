import { gsap } from 'gsap'

export function revealSectionElements(root) {
	if (!root) return undefined

	const ctx = gsap.context(() => {
		const elements = gsap.utils.toArray(
			root.querySelectorAll(
				'[data-reveal], .hero-block, .module-card, .stats-grid, .projects-panel, .todo-overview, .weather-panel, .quiz-hero, .contact-form-panel, .blog-form',
			),
		)
		if (!elements.length) return

		gsap.fromTo(
			elements,
			{ opacity: 0, y: 18 },
			{
				opacity: 1,
				y: 0,
				duration: 0.45,
				stagger: 0.08,
				ease: 'power2.out',
				clearProps: 'transform,opacity',
			},
		)
	}, root)

	return ctx
}
