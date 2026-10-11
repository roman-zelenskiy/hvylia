import { error, json } from '@sveltejs/kit';
import { productBySlug, products } from '#lib/data/products.ts';
import { ratingOf } from '#lib/data/reviews.ts';

export const prerender = true;

export const entries = () => products.map((p) => ({ slug: p.slug }));

export function GET({ params }) {
	const p = productBySlug.get(params.slug);
	if (!p) error(404, { message: 'Товар не знайдено' });
	return json({ ...p, rating: ratingOf(p.slug) });
}
