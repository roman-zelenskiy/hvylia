import { products } from '#lib/data/products.ts';

/** Характеристики всіх товарів (їх 20) — таблиця порівняння будується в браузері з localStorage */
export function load() {
	return {
		specs: Object.fromEntries(
			products.map((p) => [
				p.slug,
				p.specs.flatMap((g) =>
					g.rows.map((r) => ({ group: g.title, label: r.label, value: r.value }))
				)
			])
		)
	};
}
