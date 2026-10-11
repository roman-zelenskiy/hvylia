import { announce, cart, compare, wishlist } from './shop.svelte.ts';
import { toast } from './toast.svelte.ts';

/** Додати в кошик: лічильник «звучить», відкривається міні-кошик, скрінрідер чує підтвердження */
export function addToCart(slug: string, color: string, qty: number, name: string) {
	cart.add(slug, color, qty);
	cart.drawer = true;
	announce(`${name} додано в кошик. У кошику ${cart.count} шт.`);
}

export function toggleWishlist(slug: string, name: string) {
	const on = wishlist.toggle(slug);
	toast.show(
		on ? `«${name}» в обраному` : `«${name}» прибрано з обраного`,
		on ? { href: '/wishlist', label: 'Відкрити' } : undefined
	);
}

export function toggleCompare(slug: string, name: string) {
	if (!compare.has(slug) && compare.items.length >= 4) {
		toast.show('Порівнювати можна до 4 товарів. Приберіть один зі списку.', {
			href: '/compare',
			label: 'До порівняння'
		});
		return;
	}
	const on = compare.toggle(slug);
	toast.show(
		on ? `«${name}» додано до порівняння` : `«${name}» прибрано з порівняння`,
		on ? { href: '/compare', label: 'Порівняти' } : undefined
	);
}
