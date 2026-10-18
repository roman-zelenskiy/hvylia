import { t } from '#lib/ui.ts';
import { error } from '@sveltejs/kit';
import { langs } from '#lib/lang.ts';
import { brandBySlug, brands } from '#lib/data/brands.ts';
import { catalogPage } from '#lib/server/pages.ts';

export const entries = () => langs.flatMap((lang) => brands.map((b) => ({ lang, slug: b.slug })));

export function load({ params }) {
	const b = brandBySlug.get(params.slug);
	if (!b) error(404, { message: t.brandPage.notFound });
	return {
		brand: b,
		h1: b.name,
		eyebrow: t.brandPage.eyebrow(b.country, b.founded),
		lead: b.tagline,
		title: t.brandPage.title(b.name),
		description: t.brandPage.description(b.name, b.country, b.tagline),
		path: `/brand/${b.slug}`,
		crumbs: [
			{ href: '/', label: t.home },
			{ href: '/brand', label: t.brandsPage.h1 },
			{ label: b.name }
		],
		subs: [],
		seoText: [{ title: t.brandPage.about(b.name), paragraphs: b.about }],
		faq: [],
		...catalogPage((p) => p.brand === b.slug)
	};
}
