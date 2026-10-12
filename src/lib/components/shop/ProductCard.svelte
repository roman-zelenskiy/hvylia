<script lang="ts">
	import { resolve } from '$app/paths';
	import { Heart, Scale, Plus, Check } from '@lucide/svelte';
	import type { Summary } from '#lib/catalog/query.ts';
	import { discount, formatPrice } from '#lib/catalog/format.ts';
	import { productCutout, productImage } from '#lib/images.ts';
	import { compare, wishlist } from '#lib/stores/shop.svelte.ts';
	import { addToCart, toggleCompare, toggleWishlist } from '#lib/stores/actions.ts';
	import Rating from '#lib/components/ui/Rating.svelte';

	let {
		product: p,
		view = 'grid',
		eager = false
	}: { product: Summary; view?: 'grid' | 'list'; eager?: boolean } = $props();

	const off = $derived(discount(p.price, p.oldPrice));
	const out = $derived(p.stock === 'out');
	const cut = $derived(productCutout(p.slug));
	let added = $state(false);
	const href = $derived(resolve('/product/[slug]', { slug: p.slug }));
</script>

<article
	data-vt-scope
	class={[
		'card group relative',
		view === 'list'
			? 'grid grid-cols-[132px_1fr] gap-4 sm:grid-cols-[200px_1fr] sm:gap-6'
			: 'flex h-full flex-col'
	]}
>
	<div class="stage aspect-square rounded-[var(--radius-md)]">
		{#if cut}
			<enhanced:img
				src={cut}
				alt={p.alt}
				sizes={view === 'list'
					? '200px'
					: '(min-width: 1280px) 300px, (min-width: 768px) 30vw, 45vw'}
				loading={eager ? 'eager' : 'lazy'}
				fetchpriority={eager ? 'high' : undefined}
				class="cutout lift absolute inset-[11%] h-[78%] w-[78%] object-contain"
				data-vt
			/>
		{:else}
			<enhanced:img
				src={productImage(p.image)}
				alt={p.alt}
				sizes="300px"
				loading="lazy"
				class="absolute inset-0 h-full w-full object-cover"
				data-vt
			/>
		{/if}
		<div class="absolute top-3 left-3 z-10 flex gap-1.5">
			{#if off}<span class="badge bg-blue text-white">−{off}%</span>{/if}
			{#if p.badges.includes('new')}<span class="badge bg-white text-ink shadow-sm">Новинка</span
				>{/if}
			{#if p.badges.includes('hit') && !off}<span class="badge bg-ink text-white">Хіт</span>{/if}
		</div>
		<div
			class="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1 opacity-100 transition-opacity duration-200 md:opacity-0 md:group-focus-within:opacity-100 md:group-hover:opacity-100 [&:has([aria-pressed=true])]:opacity-100"
		>
			<button
				type="button"
				class="icon-btn bg-white/90 shadow-sm backdrop-blur"
				aria-pressed={wishlist.ready && wishlist.has(p.slug)}
				aria-label="В обране: {p.name}"
				onclick={() => toggleWishlist(p.slug, p.name)}
			>
				<Heart size={17} fill={wishlist.ready && wishlist.has(p.slug) ? 'currentColor' : 'none'} />
			</button>
			<button
				type="button"
				class="icon-btn bg-white/90 shadow-sm backdrop-blur"
				aria-pressed={compare.ready && compare.has(p.slug)}
				aria-label="Порівняти: {p.name}"
				onclick={() => toggleCompare(p.slug, p.name)}
			>
				<Scale size={17} />
			</button>
		</div>
		<button
			type="button"
			class="add absolute right-3 bottom-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-ink text-white shadow-[var(--shadow-pop)] transition-[transform,background-color] duration-300 ease-[var(--ease-out-soft)] hover:bg-blue disabled:bg-line-2"
			disabled={out}
			aria-label={out ? `${p.name}: немає в наявності` : `У кошик: ${p.name}`}
			onclick={() => {
				addToCart(p.slug, p.colors[0]?.id ?? 'default', 1, p.name);
				added = true;
				setTimeout(() => (added = false), 1200);
			}}
		>
			{#if added}<Check size={18} />{:else}<Plus size={19} />{/if}
		</button>
	</div>

	<div class={['flex min-w-0 flex-1 flex-col', view === 'list' ? 'py-2' : 'px-1 pt-4']}>
		<div class="flex items-baseline justify-between gap-3">
			<p class="text-[13px] text-graphite">{p.brandName}</p>
			{#if p.reviews}<Rating value={p.rating} count={p.reviews} size={11} />{/if}
		</div>
		<h3 class="mt-1 text-[17px] leading-snug font-medium tracking-[-0.01em]">
			<a {href} class="after:absolute after:inset-0 after:z-0 hover:text-blue">{p.name}</a>
		</h3>
		{#if view === 'list'}<p class="mt-2 line-clamp-2 text-[15px] text-graphite">{p.short}</p>{/if}
		<div class="mt-auto flex items-center justify-between gap-3 pt-3">
			<p class="flex items-baseline gap-2">
				<span class={['mono text-[17px] font-medium', off && 'text-blue']}
					>{#if off}<span class="sr-only">Ціна зі знижкою: </span>{/if}{formatPrice(p.price)}</span
				>
				{#if p.oldPrice}<s class="mono text-[13px] text-mute"
						><span class="sr-only">Стара ціна: </span>{formatPrice(p.oldPrice)}</s
					>{/if}
			</p>
			{#if p.colors.length > 1}
				<ul class="flex -space-x-1" aria-label="Кольори">
					{#each p.colors as c (c.id)}<li
							class="h-4 w-4 rounded-full ring-2 ring-paper"
							style:background={c.hex}
							title={c.name}
						>
							<span class="sr-only">{c.name}</span>
						</li>{/each}
				</ul>
			{/if}
		</div>
		{#if out}<p class="mt-1 text-[13px] text-alert">
				Немає в наявності
			</p>{:else if p.stock === 'low'}<p class="mt-1 text-[13px] text-[#9a5300]">
				Закінчується
			</p>{/if}
	</div>
</article>

<style>
	.lift {
		transition: transform 0.6s var(--ease-out-soft);
	}
	.group:hover .lift {
		transform: translateY(-6px) scale(1.04) rotate(-1.5deg);
	}
	.add:active:not(:disabled) {
		transform: scale(0.92);
	}
	.card:has(a:focus-visible) .stage {
		outline: 2px solid var(--color-blue);
		outline-offset: 3px;
	}
</style>
