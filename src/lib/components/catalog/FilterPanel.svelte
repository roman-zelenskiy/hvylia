<script lang="ts">
	import { t } from '#lib/ui.ts';
	import { ChevronDown } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import type { FilterKey, Filters, QueryResult } from '#lib/catalog/query.ts';
	import Checkbox from '#lib/components/ui/Checkbox.svelte';
	import RangeSlider from '#lib/components/ui/RangeSlider.svelte';

	/** Фільтри розділу з лічильниками. Кожна зміна одразу йде в URL (через onchange) */
	let {
		filters,
		result,
		show,
		onchange
	}: {
		filters: Filters;
		result: QueryResult;
		show: FilterKey[];
		onchange: (next: Filters) => void;
	} = $props();

	let collapsed = $state<Record<string, boolean>>({});
	const toggleIn = (list: string[], v: string) =>
		list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
	const set = (patch: Partial<Filters>) => onchange({ ...filters, ...patch, page: 1, more: 1 });
	const b = $derived(result.priceBounds);
</script>

{#snippet section(id: string, title: string, body: Snippet)}
	<section class="border-b border-line py-4">
		<h3>
			<button
				type="button"
				class="flex w-full items-center justify-between text-left text-sm font-medium hover:text-blue"
				aria-expanded={!collapsed[id]}
				aria-controls="flt-{id}"
				onclick={() => (collapsed[id] = !collapsed[id])}
			>
				{title}<ChevronDown
					size={16}
					class="transition-transform duration-200 {collapsed[id] ? '-rotate-90' : ''}"
				/>
			</button>
		</h3>
		<div id="flt-{id}" class="reveal mt-3" hidden={collapsed[id]}>{@render body()}</div>
	</section>
{/snippet}

{#snippet priceBody()}
	<RangeSlider
		min={b.min}
		max={b.max}
		low={filters.priceMin ?? b.min}
		high={filters.priceMax ?? b.max}
		onchange={(lo, hi) =>
			set({ priceMin: lo <= b.min ? null : lo, priceMax: hi >= b.max ? null : hi })}
	/>
{/snippet}

{#snippet brandBody()}
	<ul>
		{#each result.facets.brand as f (f.value)}
			<li>
				<Checkbox
					checked={filters.brand.includes(f.value)}
					count={f.count}
					disabled={!f.count && !filters.brand.includes(f.value)}
					onchange={() => set({ brand: toggleIn(filters.brand, f.value) })}>{f.label}</Checkbox
				>
			</li>
		{/each}
	</ul>
{/snippet}

{#snippet typeBody()}
	<ul>
		{#each result.facets.type as f (f.value)}
			<li>
				<Checkbox
					checked={filters.type.includes(f.value)}
					count={f.count}
					onchange={() => set({ type: toggleIn(filters.type, f.value) })}>{f.label}</Checkbox
				>
			</li>
		{/each}
	</ul>
{/snippet}

{#snippet connBody()}
	<ul>
		{#each result.facets.conn as f (f.value)}
			<li>
				<Checkbox
					checked={filters.conn.includes(f.value)}
					count={f.count}
					onchange={() => set({ conn: toggleIn(filters.conn, f.value) })}>{f.label}</Checkbox
				>
			</li>
		{/each}
	</ul>
{/snippet}

{#snippet ancBody()}
	<Checkbox checked={filters.anc} count={result.facets.anc} onchange={(v) => set({ anc: v })}
		>{t.filter.anc}</Checkbox
	>
{/snippet}

{#snippet colorBody()}
	<ul class="flex flex-wrap gap-2">
		{#each result.facets.color as f (f.value)}
			<li>
				<label class="swatch" title="{f.label} ({f.count})">
					<input
						type="checkbox"
						class="sr-only"
						checked={filters.color.includes(f.value)}
						onchange={() => set({ color: toggleIn(filters.color, f.value) })}
					/>
					<span class="swatch-dot" style:background={f.hex} aria-hidden="true"></span>
					<span class="text-[13px]">{f.label}</span>
					<span class="mono text-[11px] text-mute">{f.count}</span>
				</label>
			</li>
		{/each}
	</ul>
{/snippet}

{#snippet stockBody()}
	<Checkbox
		checked={filters.inStock}
		count={result.facets.inStock}
		onchange={(v) => set({ inStock: v })}>{t.filter.inStock}</Checkbox
	>
{/snippet}

{#snippet ratingBody()}
	<fieldset>
		<legend class="sr-only">{t.filter.rating}</legend>
		{#each [{ value: 0, label: t.filter.any, count: undefined }, ...result.facets.rating.map( (r) => ({ value: r.value, label: t.filter.from(r.value.toFixed(1)), count: r.count }) )] as r (r.value)}
			<label class="check">
				<input
					type="radio"
					class="sr-only"
					name="rating"
					checked={filters.rating === r.value}
					onchange={() => set({ rating: r.value })}
				/>
				<span class="check-box is-radio" aria-hidden="true"></span>
				<span class="flex-1">{r.label}</span>
				{#if r.count !== undefined}<span class="mono text-xs text-mute">{r.count}</span>{/if}
			</label>
		{/each}
	</fieldset>
{/snippet}

<div>
	<h2 class="sr-only">{t.catalog.filters}</h2>
	{#if show.includes('price')}{@render section('price', t.filter.price, priceBody)}{/if}
	{#if show.includes('brand')}{@render section('brand', t.filter.brand, brandBody)}{/if}
	{#if show.includes('type')}{@render section('type', t.filter.type, typeBody)}{/if}
	{#if show.includes('conn')}{@render section('conn', t.filter.conn, connBody)}{/if}
	{#if show.includes('anc')}{@render section('anc', t.filter.ancTitle, ancBody)}{/if}
	{#if show.includes('color')}{@render section('color', t.filter.color, colorBody)}{/if}
	{#if show.includes('stock')}{@render section('stock', t.filter.stock, stockBody)}{/if}
	{#if show.includes('rating')}{@render section('rating', t.filter.rating, ratingBody)}{/if}
</div>

<style>
	.swatch {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		height: 32px;
		padding: 0 10px 0 6px;
		border-radius: var(--radius-sm);
		box-shadow: inset 0 0 0 1px var(--color-line);
		transition: box-shadow 0.15s;
	}
	.swatch:hover {
		box-shadow: inset 0 0 0 1px var(--color-ink);
	}
	.swatch:has(input:checked) {
		box-shadow: inset 0 0 0 2px var(--color-blue);
	}
	.swatch:has(input:focus-visible) {
		outline: 2px solid var(--color-blue);
		outline-offset: 2px;
	}
	.swatch-dot {
		width: 18px;
		height: 18px;
		border-radius: 999px;
		box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.15);
	}
</style>
