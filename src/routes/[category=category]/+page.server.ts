import { error } from '@sveltejs/kit';
import { categories, categoryBySlug } from '#lib/data/categories.ts';
import { catalogPage } from '#lib/server/pages.ts';

export const entries = () => categories.map((c) => ({ category: c.slug }));

export function load({ params }) {
	const c = categoryBySlug.get(params.category);
	if (!c) error(404, { message: 'Такої категорії немає' });
	return {
		kind: 'category' as const,
		h1: c.h1,
		lead: c.lead,
		title: c.seoTitle,
		description: c.seoDescription,
		path: `/${c.slug}`,
		crumbs: [{ href: '/', label: 'Головна' }, { label: c.name }],
		subs: c.subs.map((s) => ({ href: `/${c.slug}/${s.slug}`, label: s.name })),
		seoText: c.seoText,
		faq: c.faq,
		...catalogPage((p) => p.category === c.slug)
	};
}
