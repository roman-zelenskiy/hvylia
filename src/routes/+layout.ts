import { resolve } from '$app/paths';
import type { Summary } from '#lib/catalog/query.ts';

// Усі публічні сторінки пререндеряться: SSR відбувається на збірці
export const prerender = true;
export const trailingSlash = 'never';

type Catalog = {
	products: Summary[];
	brandNames: Record<string, string>;
	categories: { slug: string; name: string; subs: { slug: string; name: string }[] }[];
};

/**
 * Дані для шапки, мега-меню, міні-кошика й порівняння — зі статичного /api/catalog.json.
 * Універсальний load: під час пререндеру дані вбудовуються в HTML, а fallback-сторінка
 * статичного хостингу (404.html) отримує їх тим самим запитом без серверних __data.json.
 */
export async function load({ fetch }) {
	const data: Catalog = await (await fetch(resolve('/api/catalog.json'))).json();
	return {
		nav: data.categories,
		brands: Object.entries(data.brandNames).map(([slug, name]) => ({ slug, name })),
		catalog: data.products
	};
}
