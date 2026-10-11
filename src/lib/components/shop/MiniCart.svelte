<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { ShoppingBag } from '@lucide/svelte';
	import { cartView } from '#lib/catalog/cart.ts';
	import type { Summary } from '#lib/catalog/query.ts';
	import { formatPrice, goods } from '#lib/catalog/format.ts';
	import { cart } from '#lib/stores/shop.svelte.ts';
	import Overlay from '#lib/components/ui/Overlay.svelte';
	import CartRows from './CartRows.svelte';
	import FreeShipping from './FreeShipping.svelte';
	import UndoBar from './UndoBar.svelte';

	const view = $derived(cartView(cart.lines, page.data.catalog as Summary[], cart.promo));
	$effect(() => {
		void page.url.pathname;
		cart.drawer = false;
	});
</script>

<Overlay
	bind:open={cart.drawer}
	labelledby="mini-cart-title"
	side="right"
	width="max-w-[440px]"
	closeLabel="Закрити кошик"
>
	<div class="flex h-16 shrink-0 items-center gap-3 border-b border-line px-5">
		<h2 id="mini-cart-title" class="text-lg font-semibold tracking-tight">Кошик</h2>
		{#if view.count}<span class="mono text-sm text-graphite">{goods(view.count)}</span>{/if}
	</div>
	{#if view.rows.length}
		<div class="flex-1 overflow-y-auto px-5">
			<div class="pt-4"><FreeShipping total={view.total} /></div>
			<CartRows rows={view.rows} compact />
		</div>
		<UndoBar />
		<div class="shrink-0 border-t border-line p-5">
			<div class="flex items-baseline justify-between">
				<span class="text-graphite">Разом</span>
				<span class="mono text-xl font-medium">{formatPrice(view.total)}</span>
			</div>
			{#if view.discount}<p class="mt-1 text-right text-xs text-blue">
					з урахуванням промокоду {cart.promo}
				</p>{/if}
			<div class="mt-4 grid grid-cols-2 gap-2">
				<a href={resolve('/cart')} class="btn btn-secondary btn-lg">До кошика</a>
				<a href={resolve('/checkout')} class="btn btn-primary btn-lg" data-autofocus>Оформити</a>
			</div>
		</div>
	{:else}
		<div class="flex flex-1 flex-col items-center justify-center px-8 text-center">
			<ShoppingBag size={40} strokeWidth={1.2} class="text-line-2" />
			<p class="mt-4 text-lg font-medium">Кошик порожній</p>
			<p class="mt-1 text-sm text-graphite">Почніть з навушників — у нас є з чого обрати.</p>
			<a
				href={resolve('/[category=category]', { category: 'navushnyky' })}
				class="btn btn-primary btn-md mt-6">До каталогу</a
			>
		</div>
		<UndoBar />
	{/if}
</Overlay>
