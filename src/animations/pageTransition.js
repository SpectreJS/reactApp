import { gsap } from 'gsap'

export function animatePageTransition(target) {
	if (!target) return undefined

	const ctx = gsap.context(() => {
		gsap.set(target, {
			opacity: 0,
			y: 14,
			filter: 'blur(2px)',
		})

		gsap.to(target, {
			opacity: 1,
			y: 0,
			filter: 'blur(0px)',
			duration: 0.42,
			ease: 'power2.out',
			clearProps: 'filter',
		})
	}, target)

	return ctx
}
