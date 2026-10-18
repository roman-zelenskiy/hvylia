import { json } from '@sveltejs/kit';
import { langs } from '#lib/lang.ts';
import { brandNames, summaries } from '#lib/server/catalog.ts';
import { categories } from '#lib/data/categories.ts';

// Статичний «API»: пререндериться в JSON під час збірки
export const prerender = true;

export function GET() {
	return json({
		products: summaries,
		brandNames,
		categories: categories.map((c) => ({
			slug: c.slug,
			name: c.name,
			subs: c.subs.map((s) => ({ slug: s.slug, name: s.name }))
		}))
	});
}

export const entries = () => langs.map((lang) => ({ lang }));
