<script lang="ts">
	import { t } from '#lib/ui.ts';
	import { lhref } from '#lib/lang.ts';
	import { page } from '$app/state';
	import { Scale, X } from '@lucide/svelte';
	import type { Summary } from '#lib/catalog/query.ts';
	import { formatPrice } from '#lib/catalog/format.ts';
	import { productCutout, productImage } from '#lib/images.ts';
	import { compare } from '#lib/stores/shop.svelte.ts';
	import { addToCart } from '#lib/stores/actions.ts';
	import Seo from '#lib/seo/Seo.svelte';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import Checkbox from '#lib/components/ui/Checkbox.svelte';
	import Rating from '#lib/components/ui/Rating.svelte';

	let { data } = $props();
	let onlyDiff = $state(false);

	const items = $derived(
		compare.items
			.map((s) => (page.data.catalog as Summary[]).find((p) => p.slug === s))
			.filter((p): p is Summary => !!p)
	);
	const rows = $derived.by(() => {
		const keys: Record<string, { group: string; label: string }> = {};
		for (const p of items)
			for (const r of data.specs[p.slug] ?? [])
				keys[`${r.group}|${r.label}`] = { group: r.group, label: r.label };
		return Object.entries(keys).map(([key, k]) => {
			const values = items.map(
				(p) => data.specs[p.slug]?.find((r) => `${r.group}|${r.label}` === key)?.value ?? '—'
			);
			return { ...k, values, differs: new Set(values).size > 1 };
		});
	});
	const shownRows = $derived(onlyDiff ? rows.filter((r) => r.differs) : rows);
</script>

<Seo title={t.comparePage.title} description={t.comparePage.description} path="/compare" noindex />

<div class="wrap pt-6">
	<Breadcrumbs items={[{ href: '/', label: t.home }, { label: t.comparePage.h1 }]} />
	<div class="mt-6 flex flex-wrap items-end justify-between gap-4 pb-4">
		<h1 class="h-display head-in text-[clamp(2.4rem,5.6vw,4.75rem)]">{t.comparePage.h1}</h1>
		{#if items.length > 1}<Checkbox bind:checked={onlyDiff}>{t.comparePage.onlyDiff}</Checkbox>{/if}
	</div>

	{#if !compare.ready}
		<div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4" aria-hidden="true">
			{#each [0, 1, 2, 3] as i (i)}<div class="skeleton aspect-[3/4]"></div>{/each}
		</div>
	{:else if !items.length}
		<div class="mt-10 rounded-lg bg-white px-6 py-20 text-center">
			<Scale size={36} strokeWidth={1.3} class="mx-auto text-line-2" />
			<p class="mt-4 text-lg font-medium">{t.comparePage.empty}</p>
			<p class="mt-1 text-graphite">{t.comparePage.emptyText}</p>
			<a
				href={lhref('/[category=category]', { category: 'navushnyky' })}
				class="btn btn-primary btn-md mt-6">{t.comparePage.toHeadphones}</a
			>
		</div>
	{:else}
		<div class="mt-8 overflow-x-auto">
			<table class="w-full min-w-[720px] table-fixed text-sm">
				<thead>
					<tr>
						<th scope="col" class="w-48 text-left align-bottom"
							><span class="sr-only">{t.comparePage.spec}</span></th
						>
						{#each items as p (p.slug)}
							<th scope="col" class="px-3 pb-4 text-left align-top font-normal">
								<div class="stage relative aspect-square overflow-hidden rounded-md">
									{#if productCutout(p.slug)}
										<enhanced:img
											src={productCutout(p.slug)!}
											alt=""
											sizes="220px"
											class="cutout absolute inset-[12%] h-[76%] w-[76%] object-contain"
										/>
									{:else}
										<enhanced:img
											src={productImage(p.image)}
											alt=""
											sizes="220px"
											class="h-full w-full object-cover"
										/>
									{/if}
									<button
										type="button"
										class="icon-btn absolute top-2 right-2 z-10 bg-white/90 shadow-sm"
										aria-label={t.comparePage.remove(p.name)}
										onclick={() => compare.remove(p.slug)}><X size={16} /></button
									>
								</div>
								<a
									href={lhref('/product/[slug]', { slug: p.slug })}
									class="mt-3 block font-medium hover:text-blue">{p.name}</a
								>
								<p class="mono mt-1">{formatPrice(p.price)}</p>
								{#if p.reviews}<div class="mt-1">
										<Rating value={p.rating} count={p.reviews} size={11} />
									</div>{/if}
								<button
									type="button"
									class="btn btn-primary btn-sm mt-3 w-full"
									disabled={p.stock === 'out'}
									onclick={() => addToCart(p.slug, p.colors[0].id, 1, p.name)}>{t.inCart}</button
								>
							</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each shownRows as r, i (r.group + r.label)}
						{#if i === 0 || shownRows[i - 1].group !== r.group}
							<tr
								><th colspan={items.length + 1} scope="colgroup" class="eyebrow pt-8 pb-2 text-left"
									>{r.group}</th
								></tr
							>
						{/if}
						<tr class={['border-t border-line', r.differs && 'bg-blue-soft/50']}>
							<th scope="row" class="py-3 pr-3 text-left font-normal text-graphite">{r.label}</th>
							{#each r.values as v, j (j)}<td class="mono px-3 py-3">{v}</td>{/each}
						</tr>
					{/each}
				</tbody>
			</table>
			<p class="mt-4 text-xs text-graphite">
				<span class="inline-block h-3 w-3 bg-blue-soft align-middle"></span>
				{t.comparePage.legend}
			</p>
		</div>
	{/if}
</div>
