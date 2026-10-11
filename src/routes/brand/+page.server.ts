import { brands } from '#lib/data/brands.ts';
import { products } from '#lib/data/products.ts';

export function load() {
	return {
		list: brands.map((b) => ({ ...b, count: products.filter((p) => p.brand === b.slug).length }))
	};
}
