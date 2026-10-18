import { t } from '#lib/ui.ts';
import { error } from '@sveltejs/kit';
import { langs } from '#lib/lang.ts';
import { categories, categoryBySlug } from '#lib/data/categories.ts';
import { catalogPage } from '#lib/server/pages.ts';

export const entries = () =>
	langs.flatMap((lang) => categories.map((c) => ({ lang, category: c.slug })));

export function load({ params }) {
	const c = categoryBySlug.get(params.category);
	if (!c) error(404, { message: t.catPage.notFound });
	return {
		kind: 'category' as const,
		h1: c.h1,
		lead: c.lead,
		title: c.seoTitle,
		description: c.seoDescription,
		path: `/${c.slug}`,
		crumbs: [{ href: '/', label: t.home }, { label: c.name }],
		subs: c.subs.map((s) => ({ href: `/${c.slug}/${s.slug}`, label: s.name })),
		seoText: c.seoText,
		faq: c.faq,
		...catalogPage((p) => p.category === c.slug)
	};
}
