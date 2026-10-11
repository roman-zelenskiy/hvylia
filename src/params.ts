import { defineParams } from '@sveltejs/kit/params';
import { categories } from '#lib/data/categories.ts';
import { landings } from '#lib/data/landings.ts';

const categorySlugs = new Set(categories.map((c) => c.slug));
const subSlugs = new Set([
	...categories.flatMap((c) => c.subs.map((s) => s.slug)),
	...landings.map((l) => l.slug)
]);

/**
 * Динамічні сегменти приймають лише відомі значення. Невідомий шлях (/nope) не збігається
 * з [category] — і на статичному хостингу клієнт одразу показує 404, не шукаючи неіснуючих даних.
 */
export const params = defineParams({
	category: (p: string) => (categorySlugs.has(p) ? p : undefined),
	sub: (p: string) => (subSlugs.has(p) ? p : undefined)
});
