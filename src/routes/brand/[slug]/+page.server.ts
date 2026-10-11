import { error } from '@sveltejs/kit';
import { brandBySlug, brands } from '#lib/data/brands.ts';
import { catalogPage } from '#lib/server/pages.ts';

export const entries = () => brands.map((b) => ({ slug: b.slug }));

export function load({ params }) {
	const b = brandBySlug.get(params.slug);
	if (!b) error(404, { message: 'Такого бренду немає' });
	return {
		brand: b,
		h1: b.name,
		eyebrow: `${b.country} · з ${b.founded}`,
		lead: b.tagline,
		title: `${b.name} — офіційна гарантія, ціни | Хвиля`,
		description: `${b.name} (${b.country}): ${b.tagline.toLowerCase()}. Техніка ${b.name} з офіційною гарантією, доставка по Україні, 30 днів на повернення.`,
		path: `/brand/${b.slug}`,
		crumbs: [
			{ href: '/', label: 'Головна' },
			{ href: '/brand', label: 'Бренди' },
			{ label: b.name }
		],
		subs: [],
		seoText: [{ title: `Про ${b.name}`, paragraphs: b.about }],
		faq: [],
		...catalogPage((p) => p.brand === b.slug)
	};
}
