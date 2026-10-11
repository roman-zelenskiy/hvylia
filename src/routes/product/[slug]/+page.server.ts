import { error } from '@sveltejs/kit';
import { brandBySlug } from '#lib/data/brands.ts';
import { categoryBySlug } from '#lib/data/categories.ts';
import { productBySlug, products } from '#lib/data/products.ts';
import { questions, ratingOf, reviews } from '#lib/data/reviews.ts';
import { pick, summaryBySlug } from '#lib/server/catalog.ts';

export const entries = () => products.map((p) => ({ slug: p.slug }));

export function load({ params }) {
	const p = productBySlug.get(params.slug);
	if (!p) error(404, { message: 'Такого товару немає' });
	const brand = brandBySlug.get(p.brand)!;
	const category = categoryBySlug.get(p.category)!;
	const sub = category.subs.find((s) => s.slug === p.sub)!;
	const similar = products
		.filter((x) => x.slug !== p.slug && (x.sub === p.sub || x.category === p.category))
		.sort(
			(a, b) => Number(b.sub === p.sub) - Number(a.sub === p.sub) || b.popularity - a.popularity
		)
		.slice(0, 4)
		.map((x) => x.slug);
	return {
		product: p,
		summary: summaryBySlug.get(p.slug)!,
		brand,
		category: { slug: category.slug, name: category.name },
		sub: { slug: sub.slug, name: sub.name },
		rating: ratingOf(p.slug),
		reviews: reviews
			.filter((r) => r.product === p.slug)
			.sort((a, b) => b.date.localeCompare(a.date)),
		questions: questions.filter((q) => q.product === p.slug),
		together: pick(p.together),
		similar: pick(similar)
	};
}
