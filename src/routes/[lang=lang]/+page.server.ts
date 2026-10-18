import { t } from '#lib/ui.ts';
import { brands } from '#lib/data/brands.ts';
import { categories } from '#lib/data/categories.ts';
import { reviews } from '#lib/data/reviews.ts';
import { summaries, summaryBySlug } from '#lib/server/catalog.ts';
import { cutouts } from '#lib/images.ts';

import { langs } from '#lib/lang.ts';

export const entries = () => langs.map((lang) => ({ lang }));

const HERO = 'aurel-studio-x';

export function load() {
	const by = (pred: (s: (typeof summaries)[number]) => boolean) => summaries.filter(pred);
	const popular = [...summaries].sort((a, b) => b.popularity - a.popularity);
	return {
		hero: summaryBySlug.get(HERO)!,
		// криві для «Порівняйте звук»: різні класи навушників
		compare: ['aurel-studio-x', 'aurel-air-pro', 'kobza-m1-studio', 'pulse-lab-raid-7'].map(
			(slug) => {
				const s = summaryBySlug.get(slug)!;
				return {
					slug,
					name: s.name,
					type: slug === 'kobza-m1-studio' ? 'studio' : s.type,
					price: s.price
				};
			}
		),
		cats: categories.map((c) => {
			const items = popular.filter((p) => p.category === c.slug);
			return {
				slug: c.slug,
				name: c.name,
				lead: c.lead,
				// обкладинка плитки — найпопулярніший товар з вирізкою, крім флагмана з hero
				cover: items.find((p) => p.slug !== HERO && p.slug in cutouts)?.slug ?? '',
				count: items.length,
				image: items[0]?.image,
				alt: items[0]?.alt ?? ''
			};
		}),
		hits: popular.filter((p) => p.stock !== 'out').slice(0, 8),
		news: [...summaries].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4),
		sets: [
			{
				id: 'travel',
				label: t.sets.travel,
				items: by((p) => (p.anc && p.category === 'navushnyky') || p.sub === 'portatyvni').slice(
					0,
					4
				)
			},
			{
				id: 'home',
				label: t.sets.home,
				items: by((p) =>
					['polychna-akustyka', 'saundbary', 'rozumni-kolonky', 'pidsylyuvachi'].includes(p.sub)
				).slice(0, 4)
			},
			{
				id: 'vinyl',
				label: t.sets.vinyl,
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
