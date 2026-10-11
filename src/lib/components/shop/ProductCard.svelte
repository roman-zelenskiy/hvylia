<script lang="ts">
	import { resolve } from '$app/paths';
	import { Heart, Scale, ShoppingBag, Check } from '@lucide/svelte';
	import type { Summary } from '#lib/catalog/query.ts';
	import { discount } from '#lib/catalog/format.ts';
	import { productImage } from '#lib/images.ts';
	import { compare, wishlist } from '#lib/stores/shop.svelte.ts';
	import { addToCart, toggleCompare, toggleWishlist } from '#lib/stores/actions.ts';
	import Price from '#lib/components/ui/Price.svelte';
	import Rating from '#lib/components/ui/Rating.svelte';

	let {
		product: p,
		view = 'grid',
		eager = false
	}: { product: Summary; view?: 'grid' | 'list'; eager?: boolean } = $props();

	const off = $derived(discount(p.price, p.oldPrice));
	const out = $derived(p.stock === 'out');
	let added = $state(false);
	const href = $derived(resolve('/product/[slug]', { slug: p.slug }));
</script>

<article
	class={[
		'card group relative flex bg-white',
		view === 'list' ? 'flex-row gap-5 p-4' : 'h-full flex-col'
	]}
>
	<div
		class={[
			'relative overflow-hidden bg-paper',
			view === 'list' ? 'aspect-square w-36 shrink-0 sm:w-48' : 'aspect-square'
		]}
	>
		<enhanced:img
			src={productImage(p.image)}
			alt={p.alt}
			sizes={view === 'list' ? '192px' : '(min-width: 1280px) 330px, (min-width: 768px) 30vw, 50vw'}
			loading={eager ? 'eager' : 'lazy'}
			fetchpriority={eager ? 'high' : undefined}
			class="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-precise)] group-hover:scale-[1.03]"
		/>
		<div class="absolute top-3 left-3 flex flex-col items-start gap-1">
			{#if p.badges.includes('hit')}<span class="badge bg-ink text-white">Хіт</span>{/if}
			{#if p.badges.includes('new')}<span class="badge bg-white text-ink ring-1 ring-line"
					>Новинка</span
				>{/if}
			{#if off}<span class="badge bg-signal text-ink">−{off}%</span>{/if}
		</div>
		<div class="absolute top-2 right-2 z-10 flex flex-col gap-1">
			<button
				type="button"
				class="icon-btn bg-white/90 backdrop-blur"
				aria-pressed={wishlist.ready && wishlist.has(p.slug)}
				aria-label="В обране: {p.name}"
				onclick={() => toggleWishlist(p.slug, p.name)}
			>
				<Heart size={17} fill={wishlist.ready && wishlist.has(p.slug) ? 'currentColor' : 'none'} />
			</button>
			<button
				type="button"
				class="icon-btn bg-white/90 backdrop-blur"
				aria-pressed={compare.ready && compare.has(p.slug)}
				aria-label="Порівняти: {p.name}"
				onclick={() => toggleCompare(p.slug, p.name)}
			>
				<Scale size={17} />
			</button>
		</div>
	</div>

	<div class={['flex min-w-0 flex-1 flex-col', view === 'list' ? 'py-1' : 'p-4']}>
		<p class="eyebrow">{p.brandName}</p>
		<h3 class="mt-1.5 text-[15px] leading-snug font-medium">
			<!-- розтягнуте посилання: уся картка клікабельна -->
			<a {href} class="after:absolute after:inset-0 after:z-0 hover:text-blue">{p.name}</a>
		</h3>
		{#if view === 'list'}
			<p class="mt-2 line-clamp-2 text-sm text-graphite">{p.short}</p>
			<ul class="mt-3 hidden flex-wrap gap-1.5 sm:flex">
				{#each p.highlights as h (h)}<li
						class="mono rounded-[var(--radius-xs)] bg-paper px-2 py-1 text-[11.5px] text-graphite"
					>
						{h}
					</li>{/each}
			</ul>
		{/if}
		{#if p.reviews}<div class="mt-2">
				<Rating value={p.rating} count={p.reviews} size={12} />
			</div>{/if}
		{#if p.colors.length > 1}
			<ul class="mt-3 flex gap-1.5" aria-label="Кольори">
				{#each p.colors as c (c.id)}
					<li
						class="h-3.5 w-3.5 rounded-full ring-1 ring-black/15"
						style:background={c.hex}
						title={c.name}
					>
						<span class="sr-only">{c.name}</span>
					</li>
				{/each}
			</ul>
		{/if}
		<div class="mt-auto flex items-end justify-between gap-3 pt-4">
			<div>
				<Price price={p.price} old={p.oldPrice} />
				<p
					class={[
						'mt-0.5 text-xs',
						out ? 'text-alert' : p.stock === 'low' ? 'text-[#a15c00]' : 'text-ok'
					]}
				>
					{out ? 'Немає в наявності' : p.stock === 'low' ? 'Закінчується' : 'В наявності'}
				</p>
			</div>
			<button
				type="button"
				class="btn btn-primary btn-sm relative z-10 !h-10 !w-10 !px-0"
				disabled={out}
				aria-label={out ? `${p.name}: немає в наявності` : `У кошик: ${p.name}`}
				onclick={() => {
					addToCart(p.slug, p.colors[0]?.id ?? 'default', 1, p.name);
					added = true;
					setTimeout(() => (added = false), 1200);
				}}
			>
				{#if added}<Check size={18} />{:else}<ShoppingBag size={18} />{/if}
			</button>
		</div>
	</div>
</article>

<style>
	.card {
		box-shadow: 0 0 0 1px var(--color-line);
		transition: box-shadow 0.2s;
	}
	.card:hover {
		box-shadow: 0 0 0 1px var(--color-ink);
	}
	.card:has(:focus-visible) {
		box-shadow: 0 0 0 2px var(--color-blue);
	}
</style>
