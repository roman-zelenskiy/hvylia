import { brandBySlug, brands } from '#lib/data/brands.ts';
import { products } from '#lib/data/products.ts';
import { ratingOf } from '#lib/data/reviews.ts';
import type { Product } from '#lib/data/types.ts';
import type { Summary } from '#lib/catalog/query.ts';

/** Фейкова «БД»: компактні картки товарів для списків і клієнтських запитів */
export function toSummary(p: Product): Summary {
	const r = ratingOf(p.slug);
	return {
		slug: p.slug,
		name: p.name,
		brand: p.brand,
		brandName: brandBySlug.get(p.brand)?.name ?? p.brand,
		category: p.category,
		sub: p.sub,
		price: p.price,
		oldPrice: p.oldPrice,
		stock: p.stock,
		badges: p.badges,
		image: p.images[0],
		alt: p.alt,
		short: p.short,
		highlights: p.highlights.slice(0, 3),
		colors: p.colors,
		type: p.facets.type,
		connection: p.facets.connection,
		anc: p.facets.anc,
		rating: r.value,
		reviews: r.count,
		popularity: p.popularity,
		createdAt: p.createdAt
	};
}

export const summaries: Summary[] = products.map(toSummary);
export const summaryBySlug = new Map(summaries.map((s) => [s.slug, s]));
export const brandNames: Record<string, string> = Object.fromEntries(
	brands.map((b) => [b.slug, b.name])
);

export const pick = (slugs: string[]) =>
	slugs.map((s) => summaryBySlug.get(s)).filter((s): s is Summary => !!s);
