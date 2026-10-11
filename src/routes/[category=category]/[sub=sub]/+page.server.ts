import { error } from '@sveltejs/kit';
import { categories, categoryBySlug } from '#lib/data/categories.ts';
import { landingFor, landings } from '#lib/data/landings.ts';
import { catalogPage } from '#lib/server/pages.ts';

export const entries = () => [
	...categories.flatMap((c) => c.subs.map((s) => ({ category: c.slug, sub: s.slug }))),
	...landings.map((l) => ({ category: l.category, sub: l.slug }))
];

export function load({ params }) {
	const c = categoryBySlug.get(params.category);
	if (!c) error(404, { message: 'Такої категорії немає' });
	const crumbsBase = [
		{ href: '/', label: 'Головна' },
		{ href: `/${c.slug}`, label: c.name }
	];

	// підкатегорія
	const s = c.subs.find((x) => x.slug === params.sub);
	if (s)
		return {
			kind: 'sub' as const,
			h1: s.h1,
			lead: s.lead,
			title: `${s.h1} — купити в Україні, ціни | Хвиля`,
			description: `${s.h1}: ${s.lead.charAt(0).toLowerCase()}${s.lead.slice(1)} Офіційна гарантія, безкоштовна доставка від 3000 грн.`,
			path: `/${c.slug}/${s.slug}`,
			crumbs: [...crumbsBase, { label: s.name }],
			subs: c.subs.map((x) => ({
				href: `/${c.slug}/${x.slug}`,
				label: x.name,
				current: x.slug === s.slug
			})),
			seoText: c.seoText.slice(0, 1),
			faq: c.faq,
			...catalogPage((p) => p.category === c.slug && p.sub === s.slug)
		};

	// SEO-сторінка під запит
	const l = landingFor(c.slug, params.sub);
	if (!l) error(404, { message: 'Такого розділу немає' });
	return {
		kind: 'landing' as const,
		h1: l.h1,
		lead: l.lead,
		title: l.title,
		description: l.description,
		path: `/${c.slug}/${l.slug}`,
		crumbs: [...crumbsBase, { label: l.h1 }],
		subs: c.subs.map((x) => ({ href: `/${c.slug}/${x.slug}`, label: x.name })),
		seoText: l.text,
		faq: l.faq,
		...catalogPage(l.match)
	};
}
