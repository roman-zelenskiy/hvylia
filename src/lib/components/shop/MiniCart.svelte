<script lang="ts">
	import { t } from '#lib/ui.ts';
	import { lhref } from '#lib/lang.ts';
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
	closeLabel={t.mini.close}
>
	<div class="flex h-16 shrink-0 items-center gap-3 border-b border-line px-5">
		<h2 id="mini-cart-title" class="text-lg font-semibold tracking-tight">{t.mini.title}</h2>
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
				<span class="text-graphite">{t.total}</span>
				<span class="mono text-xl font-medium">{formatPrice(view.total)}</span>
			</div>
			{#if view.discount}<p class="mt-1 text-right text-xs text-blue">
					{t.mini.withPromo(cart.promo ?? '')}
				</p>{/if}
			<div class="mt-4 grid grid-cols-2 gap-2">
				<a href={lhref('/cart')} class="btn btn-secondary btn-lg">{t.mini.toCart}</a>
				<a href={lhref('/checkout')} class="btn btn-primary btn-lg" data-autofocus
					>{t.mini.checkout}</a
				>
			</div>
		</div>
	{:else}
		<div class="flex flex-1 flex-col items-center justify-center px-8 text-center">
			<ShoppingBag size={40} strokeWidth={1.2} class="text-line-2" />
			<p class="mt-4 text-lg font-medium">{t.mini.empty}</p>
			<p class="mt-1 text-sm text-graphite">{t.mini.emptyText}</p>
			<a
				href={lhref('/[category=category]', { category: 'navushnyky' })}
				class="btn btn-primary btn-md mt-6">{t.toCatalog}</a
			>
		</div>
		<UndoBar />
	{/if}
</Overlay>
