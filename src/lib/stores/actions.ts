import { t } from '#lib/ui.ts';
import { announce, cart, compare, wishlist } from './shop.svelte.ts';
import { toast } from './toast.svelte.ts';

/** Додати в кошик: лічильник «звучить», відкривається міні-кошик, скрінрідер чує підтвердження */
export function addToCart(slug: string, color: string, qty: number, name: string) {
	cart.add(slug, color, qty);
	cart.drawer = true;
	announce(t.actions.added(name, cart.count));
}

export function toggleWishlist(slug: string, name: string) {
	const on = wishlist.toggle(slug);
	toast.show(
		on ? t.actions.wishOn(name) : t.actions.wishOff(name),
		on ? { href: '/wishlist', label: t.actions.open } : undefined
	);
}

export function toggleCompare(slug: string, name: string) {
	if (!compare.has(slug) && compare.items.length >= 4) {
		toast.show(t.actions.compareLimit, {
			href: '/compare',
			label: t.actions.toCompare
		});
		return;
	}
	const on = compare.toggle(slug);
	toast.show(
		on ? t.actions.compareOn(name) : t.actions.compareOff(name),
		on ? { href: '/compare', label: t.actions.compare } : undefined
	);
}
