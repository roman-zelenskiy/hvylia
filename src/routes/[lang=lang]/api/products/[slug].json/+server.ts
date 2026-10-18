import { t } from '#lib/ui.ts';
import { error, json } from '@sveltejs/kit';
import { langs } from '#lib/lang.ts';
import { productBySlug, products } from '#lib/data/products.ts';
import { ratingOf } from '#lib/data/reviews.ts';

export const prerender = true;

export const entries = () => langs.flatMap((lang) => products.map((p) => ({ lang, slug: p.slug })));

export function GET({ params }) {
	const p = productBySlug.get(params.slug);
	if (!p) error(404, { message: t.apiProduct.notFound });
	return json({ ...p, rating: ratingOf(p.slug) });
}
