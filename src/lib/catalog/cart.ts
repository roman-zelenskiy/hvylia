import { FREE_SHIPPING_FROM, promoCodes } from '#lib/data/site.ts';
import type { Summary } from './query.ts';
import type { CartLine } from '#lib/stores/shop.svelte.ts';

export type CartRow = CartLine & { key: string; product: Summary; colorName: string; sum: number };

/** Розрахунок кошика: ціни — з каталогу, у сховищі лише вибір покупця */
export function cartView(lines: CartLine[], catalog: Summary[], promo: string | null) {
	const bySlug = new Map(catalog.map((p) => [p.slug, p]));
	const rows: CartRow[] = [];
	for (const l of lines) {
		const product = bySlug.get(l.slug);
		if (!product || product.stock === 'out') continue;
		const color = product.colors.find((c) => c.id === l.color) ?? product.colors[0];
		rows.push({
			...l,
			key: `${l.slug}:${l.color}`,
			product,
			colorName: color?.name ?? '',
			sum: product.price * l.qty
		});
	}
	const subtotal = rows.reduce((s, r) => s + r.sum, 0);
	const discount =
		promo && promoCodes[promo] ? Math.round((subtotal * promoCodes[promo].percent) / 100) : 0;
	const total = subtotal - discount;
	return {
		rows,
		count: rows.reduce((s, r) => s + r.qty, 0),
		subtotal,
		discount,
		total,
		freeShipping: total >= FREE_SHIPPING_FROM,
		toFree: Math.max(0, FREE_SHIPPING_FROM - total),
		progress: Math.min(1, total / FREE_SHIPPING_FROM)
	};
}
