<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { LayoutGrid, List, SlidersHorizontal, X } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import { getProducts } from '#lib/api/client.ts';
	import { goods } from '#lib/catalog/format.ts';
	import {
		emptyFilters,
		hasActiveFilters,
		parseFilters,
		serializeFilters,
		sorts,
		PER_PAGE,
		type FilterKey,
		type Filters,
		type QueryResult,
		type SortId
	} from '#lib/catalog/query.ts';
	import { reducedMotion } from '#lib/motion.ts';
	import { storage } from '#lib/stores/storage.ts';
	import { announce } from '#lib/stores/shop.svelte.ts';
	import FilterPanel from './FilterPanel.svelte';
	import ProductCard from '#lib/components/shop/ProductCard.svelte';
	import Overlay from '#lib/components/ui/Overlay.svelte';
	import Pagination from '#lib/components/ui/Pagination.svelte';
	import Select from '#lib/components/ui/Select.svelte';

	/**
	 * Список товарів з фільтрами. Сервер рендерить розділ без фільтрів (повний HTML);
	 * після гідратації стан береться з URL (?brand=…&page=2), запити йдуть у фейковий API.
	 */
	let {
		scope,
		initial,
		show,
		path
	}: { scope: string[]; initial: QueryResult; show: FilterKey[]; path: string } = $props();

	let hydrated = $state(false);
	// null — показуємо серверний результат (initial)
	let fetched = $state<QueryResult | null>(null);
	const result = $derived(fetched ?? initial);
	let loading = $state(false);
	let error = $state('');
	let mobileFilters = $state(false);
	let view = $state<'grid' | 'list'>('grid');
	let seq = 0;

	onMount(() => {
		hydrated = true;
		view = storage.read<'grid' | 'list'>('hvylia:view', 'grid');
	});

	// URL — джерело істини для фільтрів; при пререндері query недоступний
	const filters = $derived<Filters>(
		hydrated && browser ? parseFilters(page.url.searchParams) : emptyFilters
	);
	const pristine = $derived(
		!hasActiveFilters(filters) &&
			filters.sort === 'popular' &&
			filters.page === 1 &&
			filters.more === 1
	);

	$effect(() => {
		const f = filters;
		const my = ++seq;
		if (pristine) {
			fetched = null;
			loading = false;
			return;
		}
		loading = true;
		error = '';
		getProducts(scope, f)
			.then((r) => {
				if (my !== seq) return;
				fetched = r;
				announce(r.total ? `Знайдено ${goods(r.total)}` : 'За цими фільтрами нічого не знайдено');
			})
			.catch((e: Error) => my === seq && (error = e.message))
			.finally(() => my === seq && (loading = false));
	});

	const href = (f: Filters) => `${path}${serializeFilters(f)}`;
	// звичайна навігація без скидання скролу й фокусу: load не залежить від query, тож дані не перезапитуються;
	// історія оновлюється — «назад/вперед» працюють
	const apply = (next: Filters) => goto(resolve(href(next) as '/'), { reset: false });
	const reset = () => apply({ ...emptyFilters, sort: filters.sort });

	type Chip = { label: string; next: Filters };
	const chips = $derived.by<Chip[]>(() => {
		const f = filters;
		const out: Chip[] = [];
		const name = (list: { value: string; label: string }[], v: string) =>
			list.find((x) => x.value === v)?.label ?? v;
		for (const v of f.brand)
			out.push({
				label: name(result.facets.brand, v),
				next: { ...f, brand: f.brand.filter((x) => x !== v) }
			});
		for (const v of f.type)
			out.push({
				label: name(result.facets.type, v),
				next: { ...f, type: f.type.filter((x) => x !== v) }
			});
		for (const v of f.conn)
			out.push({
				label: name(result.facets.conn, v),
				next: { ...f, conn: f.conn.filter((x) => x !== v) }
			});
		for (const v of f.color)
			out.push({
				label: name(result.facets.color, v),
				next: { ...f, color: f.color.filter((x) => x !== v) }
			});
		if (f.priceMin !== null || f.priceMax !== null)
			out.push({
				label: `${f.priceMin ?? result.priceBounds.min}–${f.priceMax ?? result.priceBounds.max} ₴`,
				next: { ...f, priceMin: null, priceMax: null }
			});
		if (f.anc) out.push({ label: 'З шумозаглушенням', next: { ...f, anc: false } });
		if (f.inStock) out.push({ label: 'В наявності', next: { ...f, inStock: false } });
		if (f.rating) out.push({ label: `Рейтинг від ${f.rating}`, next: { ...f, rating: 0 } });
		if (f.q) out.push({ label: `«${f.q}»`, next: { ...f, q: '' } });
		return out.map((c) => ({ ...c, next: { ...c.next, page: 1, more: 1 } }));
	});

	const moreLeft = $derived(result.total - (result.page - 1) * PER_PAGE - result.items.length);
	const ms = () => (reducedMotion() ? 0 : 260);
</script>

<div class="lg:grid lg:grid-cols-[260px_1fr] lg:gap-10">
	<aside class="hidden lg:block" aria-label="Фільтри">
		<div class="sticky top-[150px] max-h-[calc(100svh-170px)] overflow-y-auto pr-2">
			<FilterPanel {filters} {result} {show} onchange={apply} />
		</div>
	</aside>

	<div class="min-w-0">
		<div class="flex flex-wrap items-center gap-3 border-b border-line pb-4">
			<button
				type="button"
				class="btn btn-secondary btn-md lg:hidden"
				onclick={() => (mobileFilters = true)}
				aria-haspopup="dialog"
			>
				<SlidersHorizontal size={16} /> Фільтри{#if chips.length}<span class="mono text-blue"
						>· {chips.length}</span
					>{/if}
			</button>
			<p class="mono text-sm text-graphite" aria-live="polite">
				{loading ? 'Шукаємо…' : goods(result.total)}
			</p>
			<div class="ml-auto flex items-center gap-2">
				<div class="w-52">
					<Select
						id="sort"
						label="Сортування"
						hideLabel
						value={filters.sort}
						options={sorts.map((s) => ({ value: s.id, label: s.label }))}
						onchange={(v: SortId) => apply({ ...filters, sort: v, page: 1, more: 1 })}
					/>
				</div>
				<div
					class="hidden rounded-[var(--radius-sm)] shadow-[inset_0_0_0_1px_var(--color-line-2)] sm:flex"
					role="group"
					aria-label="Вигляд списку"
				>
					<button
						type="button"
						class="icon-btn"
						aria-pressed={view === 'grid'}
						aria-label="Сітка"
						onclick={() => ((view = 'grid'), storage.write('hvylia:view', 'grid'))}
						><LayoutGrid size={17} /></button
					>
					<button
						type="button"
						class="icon-btn"
						aria-pressed={view === 'list'}
						aria-label="Список"
						onclick={() => ((view = 'list'), storage.write('hvylia:view', 'list'))}
						><List size={17} /></button
					>
				</div>
			</div>
		</div>

		{#if chips.length}
			<div class="flex flex-wrap items-center gap-2 pt-4">
				{#each chips as c (c.label)}
					<a
						href={resolve(href(c.next) as '/')}
						data-sveltekit-reset="false"
						class="chip is-active gap-1.5"
						aria-label="Прибрати фільтр: {c.label}"
					>
						{c.label}<X size={13} />
					</a>
				{/each}
				<button type="button" class="ml-1 text-sm text-blue hover:text-blue-ink" onclick={reset}
					>Скинути все</button
				>
			</div>
		{/if}

		<h2 class="sr-only">Товари</h2>
		{#if error}
			<p class="mt-8 bg-alert-soft p-4 text-alert" role="alert">
				Не вдалося завантажити товари: {error}. Спробуйте оновити сторінку.
			</p>
		{:else if loading}
			<ul
				class="mt-6 grid gap-4 {view === 'grid' ? 'grid-cols-2 xl:grid-cols-3' : ''}"
				aria-label="Завантаження товарів"
				aria-busy="true"
			>
				{#each Array.from({ length: Math.min(PER_PAGE, Math.max(3, result.items.length)) }, (_, i) => i) as i (i)}
					<li class="bg-white p-4 ring-1 ring-line" in:fade={{ duration: 120 }}>
						<div class="skeleton aspect-square w-full"></div>
						<div class="skeleton mt-4 h-3 w-1/3"></div>
						<div class="skeleton mt-2 h-4 w-3/4"></div>
						<div class="skeleton mt-6 h-5 w-1/2"></div>
					</li>
				{/each}
			</ul>
		{:else if result.items.length}
			<ul class="mt-6 grid gap-4 {view === 'grid' ? 'grid-cols-2 xl:grid-cols-3' : ''}">
				{#each result.items as p, i (p.slug)}
					<li animate:flip={{ duration: ms() }} in:fade={{ duration: ms() }}>
						<ProductCard product={p} {view} eager={i < 2} />
					</li>
				{/each}
			</ul>
			{#if moreLeft > 0}
				<div class="mt-8 flex justify-center">
					<button
						type="button"
						class="btn btn-secondary btn-lg min-w-64"
						onclick={() => apply({ ...filters, more: filters.more + 1 })}
					>
						Показати ще {Math.min(PER_PAGE, moreLeft)}
					</button>
				</div>
			{/if}
			<div class="mt-8">
				<Pagination
					page={result.page}
					pages={result.pages}
					href={(p) => resolve(href({ ...filters, page: p, more: 1 }) as '/')}
				/>
			</div>
		{:else}
			<div class="mt-10 border border-dashed border-line-2 px-6 py-16 text-center">
				<p class="text-lg font-medium">Нічого не знайдено</p>
				<p class="mx-auto mt-2 max-w-sm text-graphite">
					Спробуйте прибрати частину фільтрів або розширити діапазон ціни.
				</p>
				<button type="button" class="btn btn-primary btn-md mt-6" onclick={reset}
					>Скинути фільтри</button
				>
			</div>
		{/if}
	</div>
</div>

<Overlay
	bind:open={mobileFilters}
	labelledby="mobile-filters-title"
	side="left"
	width="max-w-[380px]"
	closeLabel="Закрити фільтри"
>
	<div class="flex h-16 shrink-0 items-center border-b border-line px-5">
		<h2 id="mobile-filters-title" class="text-lg font-semibold">Фільтри</h2>
	</div>
	<div class="flex-1 overflow-y-auto px-5">
		<FilterPanel {filters} {result} {show} onchange={apply} />
	</div>
	<div class="grid shrink-0 grid-cols-2 gap-2 border-t border-line p-4">
		<button type="button" class="btn btn-secondary btn-lg" onclick={reset}>Скинути</button>
		<button
			type="button"
			class="btn btn-primary btn-lg"
			onclick={() => (mobileFilters = false)}
			data-autofocus
		>
			Показати {loading ? '…' : result.total}
		</button>
	</div>
</Overlay>
