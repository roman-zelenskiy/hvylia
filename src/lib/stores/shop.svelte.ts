import { promoCodes } from '#lib/data/site.ts';
import { storage } from './storage.ts';

export type CartLine = { slug: string; color: string; qty: number };
export const lineKey = (l: Pick<CartLine, 'slug' | 'color'>) => `${l.slug}:${l.color}`;
export const MAX_QTY = 10;

const clamp = (n: number) => Math.min(MAX_QTY, Math.max(1, Math.round(n) || 1));

/** Кошик: лише вибір покупця (товар, колір, кількість). Ціни завжди беруться з каталогу. */
class Cart {
	lines = $state<CartLine[]>([]);
	promo = $state<string | null>(null);
	removed = $state<{ line: CartLine; index: number } | null>(null);
	/** Лічильник «пострілів» — іконка кошика відповідає звуковою хвилею */
	pulses = $state(0);
	drawer = $state(false);
	ready = $state(false);

	count = $derived(this.lines.reduce((s, l) => s + l.qty, 0));

	load() {
		const saved = storage.read<{ lines?: unknown; promo?: unknown }>('hvylia:cart', {});
		this.lines = Array.isArray(saved.lines)
			? saved.lines
					.filter(
						(l): l is CartLine => !!l && typeof l.slug === 'string' && typeof l.color === 'string'
					)
					.map((l) => ({ ...l, qty: clamp(l.qty) }))
			: [];
		this.promo = typeof saved.promo === 'string' && promoCodes[saved.promo] ? saved.promo : null;
		this.ready = true;
	}
	private save() {
		storage.write('hvylia:cart', { lines: this.lines, promo: this.promo });
	}
	add(slug: string, color: string, qty = 1) {
		const key = lineKey({ slug, color });
		const line = this.lines.find((l) => lineKey(l) === key);
		if (line) line.qty = clamp(line.qty + qty);
		else this.lines.push({ slug, color, qty: clamp(qty) });
		this.removed = null;
		this.pulses += 1;
		this.save();
	}
	setQty(key: string, qty: number) {
		const line = this.lines.find((l) => lineKey(l) === key);
		if (line) line.qty = clamp(qty);
		this.save();
	}
	remove(key: string) {
		const index = this.lines.findIndex((l) => lineKey(l) === key);
		if (index < 0) return;
		this.removed = { line: this.lines[index], index };
		this.lines.splice(index, 1);
		this.save();
	}
	undo() {
		if (!this.removed) return;
		this.lines.splice(Math.min(this.removed.index, this.lines.length), 0, this.removed.line);
		this.removed = null;
		this.save();
	}
	applyPromo(code: string) {
		const c = code.trim().toUpperCase();
		if (!promoCodes[c]) return false;
		this.promo = c;
		this.save();
		return true;
	}
	clearPromo() {
		this.promo = null;
		this.save();
	}
	clear() {
		this.lines = [];
		this.promo = null;
		this.removed = null;
		this.save();
	}
}

/** Список slug-ів у сховищі: обране, порівняння, переглянуті */
class SlugList {
	items = $state<string[]>([]);
	ready = $state(false);
	constructor(
		private key: string,
		private limit: number
	) {}
	load() {
		const v = storage.read<unknown>(this.key, []);
		this.items = Array.isArray(v)
			? v.filter((x): x is string => typeof x === 'string').slice(0, this.limit)
			: [];
		this.ready = true;
	}
	has = (slug: string) => this.items.includes(slug);
	toggle(slug: string) {
		this.items = this.has(slug)
			? this.items.filter((s) => s !== slug)
			: [slug, ...this.items].slice(0, this.limit);
		storage.write(this.key, this.items);
		return this.has(slug);
	}
	push(slug: string) {
		this.items = [slug, ...this.items.filter((s) => s !== slug)].slice(0, this.limit);
		storage.write(this.key, this.items);
	}
	remove(slug: string) {
		this.items = this.items.filter((s) => s !== slug);
		storage.write(this.key, this.items);
	}
	clear() {
		this.items = [];
		storage.write(this.key, this.items);
	}
}

export const cart = new Cart();
export const wishlist = new SlugList('hvylia:wishlist', 50);
export const compare = new SlugList('hvylia:compare', 4);
export const recent = new SlugList('hvylia:recent', 8);

/** Оголошення для скрінрідерів (aria-live) */
export const live = $state({ text: '', n: 0 });
export function announce(text: string) {
	live.text = text;
	live.n += 1;
}

export function loadShop() {
	cart.load();
	wishlist.load();
	compare.load();
	recent.load();
}
