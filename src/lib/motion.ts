import { browser } from '$app/env';

/** Користувач просить менше руху — анімації спрощуємо до миттєвих */
export const reducedMotion = () =>
	browser && matchMedia('(prefers-reduced-motion: reduce)').matches;
