import { brands } from '#lib/data/brands.ts';
import { categories } from '#lib/data/categories.ts';
import { reviews } from '#lib/data/reviews.ts';
import { summaries, summaryBySlug } from '#lib/server/catalog.ts';

export function load() {
	const by = (pred: (s: (typeof summaries)[number]) => boolean) => summaries.filter(pred);
	const popular = [...summaries].sort((a, b) => b.popularity - a.popularity);
	return {
		hero: summaryBySlug.get('aurel-studio-x')!,
		cats: categories.map((c) => {
			const items = popular.filter((p) => p.category === c.slug);
			return {
				slug: c.slug,
				name: c.name,
				count: items.length,
				image: items[0]?.image,
				alt: items[0]?.alt ?? ''
			};
		}),
		hits: popular.filter((p) => p.badges.includes('hit') && p.stock !== 'out').slice(0, 4),
		news: [...summaries].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4),
		sets: [
			{
				id: 'travel',
				label: 'Для подорожей',
				items: by((p) => (p.anc && p.category === 'navushnyky') || p.sub === 'portatyvni').slice(
					0,
					4
				)
			},
			{
				id: 'home',
				label: 'Для дому',
				items: by((p) =>
					['polychna-akustyka', 'saundbary', 'rozumni-kolonky', 'pidsylyuvachi'].includes(p.sub)
				).slice(0, 4)
			},
			{
				id: 'vinyl',
				label: 'Перший вініл',
				items: [...by((p) => p.category === 'vinil'), ...by((p) => p.slug === 'basalt-b2')].slice(
					0,
					4
				)
			}
		],
		brands: brands.map((b) => ({ slug: b.slug, name: b.name, country: b.country })),
		reviews: [...reviews]
			.filter((r) => r.rating === 5)
			.sort((a, b) => b.date.localeCompare(a.date))
			.slice(0, 3)
			.map((r) => ({ ...r, productName: summaryBySlug.get(r.product)?.name ?? '' }))
	};
}
