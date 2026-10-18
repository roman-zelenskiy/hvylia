import { lhref } from '#lib/lang.ts';
import type { Summary } from '#lib/catalog/query.ts';

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
export async function load({ fetch, params }) {
	const lang = params.lang === 'en' ? 'en' : 'uk';
	const data: Catalog = await (await fetch(lhref('/api/catalog.json', {}, lang))).json();
	return {
		lang,
		nav: data.categories,
		brands: Object.entries(data.brandNames).map(([slug, name]) => ({ slug, name })),
		catalog: data.products
	};
}
