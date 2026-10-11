<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { Heart } from '@lucide/svelte';
	import type { Summary } from '#lib/catalog/query.ts';
	import { goods } from '#lib/catalog/format.ts';
	import { wishlist } from '#lib/stores/shop.svelte.ts';
	import Seo from '#lib/seo/Seo.svelte';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import ProductCard from '#lib/components/shop/ProductCard.svelte';

	const items = $derived(
		wishlist.items
			.map((s) => (page.data.catalog as Summary[]).find((p) => p.slug === s))
			.filter((p): p is Summary => !!p)
	);
</script>

<Seo title="Обране | Хвиля" description="Збережені товари «Хвилі»." path="/wishlist" noindex />

<div class="wrap pt-6">
	<Breadcrumbs items={[{ href: '/', label: 'Головна' }, { label: 'Обране' }]} />
	<div class="mt-6 flex items-end justify-between gap-4 border-b border-line pb-8">
		<h1 class="h-display text-[clamp(2rem,4.4vw,3.5rem)]">Обране</h1>
		{#if items.length}<p class="mono text-sm text-graphite">{goods(items.length)}</p>{/if}
	</div>
	{#if !wishlist.ready}
		<div class="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4" aria-hidden="true">
			{#each [0, 1, 2, 3] as i (i)}<div class="skeleton aspect-[3/4]"></div>{/each}
		</div>
	{:else if items.length}
		<ul class="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
			{#each items as p (p.slug)}<li><ProductCard product={p} /></li>{/each}
		</ul>
	{:else}
		<div class="mt-10 border border-dashed border-line-2 px-6 py-16 text-center">
			<Heart size={36} strokeWidth={1.3} class="mx-auto text-line-2" />
			<p class="mt-4 text-lg font-medium">В обраному поки порожньо</p>
			<p class="mt-1 text-graphite">Натисніть на серце на картці, щоб зберегти товар на потім.</p>
			<a
				href={resolve('/[category=category]', { category: 'navushnyky' })}
				class="btn btn-primary btn-md mt-6">До каталогу</a
			>
		</div>
	{/if}
</div>
