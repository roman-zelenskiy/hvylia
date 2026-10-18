export type Lang = 'uk' | 'en';
export const langs: Lang[] = ['uk', 'en'];
export const isLang = (v: unknown): v is Lang => v === 'uk' || v === 'en';

/**
 * Поточна мова сторінки. Сайт статичний: на збірці сторінки пререндеряться по одній
 * (prerender.concurrency = 1), а в браузері мова фіксована до повного перезавантаження,
 * тож модулі даних і рядків просто перемикаються на потрібну версію.
 */
export let lang: Lang = 'uk';
const listeners = new Set<(l: Lang) => void>();

/** Підписка модуля даних: викликається одразу з поточною мовою і при кожній зміні */
export function onLang(fn: (l: Lang) => void) {
	listeners.add(fn);
	fn(lang);
}

export function setLang(l: Lang) {
	if (l === lang) return;
	lang = l;
	for (const fn of listeners) fn(l);
}
