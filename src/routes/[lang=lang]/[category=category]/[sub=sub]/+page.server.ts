import { t } from '#lib/ui.ts';
import { error } from '@sveltejs/kit';
import { categories, categoryBySlug } from '#lib/data/categories.ts';
import { landingFor, landings } from '#lib/data/landings.ts';
import { catalogPage } from '#lib/server/pages.ts';
import { langs } from '#lib/lang.ts';

export const entries = () =>
	langs.flatMap((lang) => [
		...categories.flatMap((c) => c.subs.map((s) => ({ lang, category: c.slug, sub: s.slug }))),
		...landings.map((l) => ({ lang, category: l.category, sub: l.slug }))
	]);

export function load({ params }) {
	const c = categoryBySlug.get(params.category);
	if (!c) error(404, { message: t.catPage.notFound });
	const crumbsBase = [
		{ href: '/', label: t.home },
		{ href: `/${c.slug}`, label: c.name }
	];

	// підкатегорія
	const s = c.subs.find((x) => x.slug === params.sub);
	if (s)
		return {
			kind: 'sub' as const,
			h1: s.h1,
			lead: s.lead,
			title: t.catPage.subTitle(s.h1),
			description: t.catPage.subDescription(s.h1, s.lead),
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
	if (!l) error(404, { message: t.catPage.subNotFound });
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
		graphic: l.slug,
		faq: l.faq,
		...catalogPage(l.match)
	};
}
