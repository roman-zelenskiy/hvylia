<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { ShoppingBag } from '@lucide/svelte';
	import { cartView } from '#lib/catalog/cart.ts';
	import type { Summary } from '#lib/catalog/query.ts';
	import { formatPrice, goods } from '#lib/catalog/format.ts';
	import { cart } from '#lib/stores/shop.svelte.ts';
	import Seo from '#lib/seo/Seo.svelte';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import CartRows from '#lib/components/shop/CartRows.svelte';
	import FreeShipping from '#lib/components/shop/FreeShipping.svelte';
	import ProductCard from '#lib/components/shop/ProductCard.svelte';
	import PromoField from '#lib/components/shop/PromoField.svelte';
	import UndoBar from '#lib/components/shop/UndoBar.svelte';

	const catalog = $derived(page.data.catalog as Summary[]);
	const view = $derived(cartView(cart.lines, catalog, cart.promo));
	// «Додайте до замовлення»: недорогі аксесуари й ЦАП, яких ще немає в кошику
	const extras = $derived(
		catalog
			.filter(
				(p) =>
					!cart.lines.some((l) => l.slug === p.slug) &&
					p.stock !== 'out' &&
					(p.category === 'aksesuary' || p.sub === 'tsap' || p.sub === 'aksesuary-dlia-vinilu')
			)
			.slice(0, 4)
	);
</script>

<Seo
	title="Кошик | Хвиля"
	description="Ваш кошик у магазині аудіотехніки «Хвиля»."
	path="/cart"
	noindex
/>

<div class="wrap pt-6">
	<Breadcrumbs items={[{ href: '/', label: 'Головна' }, { label: 'Кошик' }]} />
	<h1 class="h-display mt-6 border-b border-line pb-8 text-[clamp(2rem,4.4vw,3.5rem)]">Кошик</h1>

	{#if !cart.ready}
		<div class="mt-8 grid gap-4" aria-hidden="true">
			{#each [0, 1] as i (i)}<div class="skeleton h-28"></div>{/each}
		</div>
	{:else if view.rows.length}
		<div class="mt-8 grid items-start gap-10 lg:grid-cols-[1fr_380px]">
			<div>
				<FreeShipping total={view.total} />
				<CartRows rows={view.rows} />
				<UndoBar />
			</div>
			<aside
				class="grid gap-5 bg-white p-6 ring-1 ring-line lg:sticky lg:top-[150px]"
				aria-labelledby="sum-title"
			>
				<h2 id="sum-title" class="text-lg font-semibold">Разом</h2>
				<dl class="grid gap-2 text-sm">
					<div class="flex justify-between">
						<dt class="text-graphite">{goods(view.count)}</dt>
						<dd class="mono">{formatPrice(view.subtotal)}</dd>
					</div>
					{#if view.discount}<div class="flex justify-between text-blue">
							<dt>Знижка {cart.promo}</dt>
							<dd class="mono">−{formatPrice(view.discount)}</dd>
						</div>{/if}
					<div class="flex justify-between">
						<dt class="text-graphite">Доставка</dt>
						<dd>{view.freeShipping ? 'безкоштовно' : 'за тарифами НП'}</dd>
					</div>
					<div class="flex items-baseline justify-between border-t border-line pt-3">
						<dt class="font-medium">До сплати</dt>
						<dd class="mono text-2xl font-medium">{formatPrice(view.total)}</dd>
					</div>
				</dl>
				<PromoField />
				<a href={resolve('/checkout')} class="btn btn-primary btn-lg w-full">Оформити замовлення</a>
			</aside>
		</div>
	{:else}
		<div class="mt-10 border border-dashed border-line-2 px-6 py-16 text-center">
			<ShoppingBag size={36} strokeWidth={1.3} class="mx-auto text-line-2" />
			<p class="mt-4 text-lg font-medium">Кошик порожній</p>
			<p class="mt-1 text-graphite">Подивіться хіти — з них зазвичай починають.</p>
			<a href={resolve('/')} class="btn btn-primary btn-md mt-6">На головну</a>
		</div>
		<UndoBar />
	{/if}

	{#if cart.ready && extras.length}
		<section class="mt-20" aria-labelledby="extras-title">
			<h2 id="extras-title" class="text-2xl font-semibold tracking-tight">Додайте до замовлення</h2>
			<ul class="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
				{#each extras as p (p.slug)}<li><ProductCard product={p} /></li>{/each}
			</ul>
		</section>
	{/if}
</div>
