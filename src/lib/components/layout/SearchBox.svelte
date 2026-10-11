<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Search, X, Clock, FolderOpen } from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import { search, type SearchHit } from '#lib/api/client.ts';
	import { formatPrice } from '#lib/catalog/format.ts';
	import { productImage } from '#lib/images.ts';
	import { storage } from '#lib/stores/storage.ts';

	/** Пошук з автокомплітом: debounce, категорії й товари, підсвітка збігів, стрілки, недавні запити */
	let {
		id = 'search',
		label = 'Пошук по сайту',
		autofocus = false,
		onnavigate
	}: { id?: string; label?: string; autofocus?: boolean; onnavigate?: () => void } = $props();

	const RECENT = 'hvylia:recent-queries';
	let q = $state('');
	let open = $state(false);
	let loading = $state(false);
	let hits = $state<SearchHit | null>(null);
	let active = $state(-1);
	let recent = $state<string[]>([]);
	let root: HTMLFormElement;
	let timer: ReturnType<typeof setTimeout>;
	let seq = 0;

	type Item = {
		kind: 'recent' | 'category' | 'product';
		href: string;
		label: string;
		meta?: string;
		image?: string;
	};

	const items = $derived.by<Item[]>(() => {
		if (q.trim().length < 2)
			return recent.map((r) => ({
				kind: 'recent',
				href: `/search?q=${encodeURIComponent(r)}`,
				label: r
			}));
		if (!hits) return [];
		return [
			...hits.categories.map((c) => ({
				kind: 'category' as const,
				href: c.href,
				label: c.label,
				meta: c.parent
			})),
			...hits.products.map((p) => ({
				kind: 'product' as const,
				href: `/product/${p.slug}`,
				label: p.name,
				meta: formatPrice(p.price),
				image: p.image
			}))
		];
	});

	function onInput() {
		active = -1;
		open = true;
		clearTimeout(timer);
		const value = q.trim();
		if (value.length < 2) {
			hits = null;
			loading = false;
			return;
		}
		loading = true;
		const my = ++seq;
		timer = setTimeout(async () => {
			const res = await search(value);
			if (my !== seq) return; // застаріла відповідь
			hits = res;
			loading = false;
		}, 220);
	}

	function remember(term: string) {
		const t = term.trim();
		if (!t) return;
		recent = [t, ...recent.filter((r) => r.toLowerCase() !== t.toLowerCase())].slice(0, 5);
		storage.write(RECENT, recent);
	}

	function go(href: string, term?: string) {
		if (term) remember(term);
		open = false;
		onnavigate?.();
		goto(resolve(href as '/'));
	}

	/** Підсвітка збігів: розбиваємо назву на шматки, збіги — у <mark> */
	function parts(text: string) {
		const words = q
			.trim()
			.toLowerCase()
			.split(/\s+/)
			.filter((w) => w.length > 1);
		if (!words.length) return [{ t: text, m: false }];
		const re = new RegExp(
			`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
			'gi'
		);
		return text
			.split(re)
			.filter(Boolean)
			.map((t) => ({ t, m: words.includes(t.toLowerCase()) }));
	}
</script>

<svelte:window
	onpointerdown={(e) => {
		if (open && !root.contains(e.target as Node)) open = false;
	}}
/>

<form
	bind:this={root}
	role="search"
	aria-label={label}
	class="relative w-full"
	onsubmit={(e) => {
		e.preventDefault();
		if (active >= 0 && items[active])
			go(
				items[active].href,
				items[active].kind === 'product' ? undefined : q || items[active].label
			);
		else if (q.trim()) go(`/search?q=${encodeURIComponent(q.trim())}`, q);
	}}
>
	<label for={id} class="sr-only">Пошук товарів</label>
	<Search
		size={17}
		class="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-graphite"
	/>
	<!-- svelte-ignore a11y_autofocus -->
	<input
		{id}
		type="search"
		role="combobox"
		aria-expanded={open && (items.length > 0 || q.trim().length >= 2)}
		aria-controls="{id}-list"
		aria-autocomplete="list"
		aria-activedescendant={active >= 0 ? `${id}-o${active}` : undefined}
		autocomplete="off"
		{autofocus}
		placeholder="Навушники, колонка, програвач…"
		class="field !h-11 !bg-paper pr-10 pl-10 focus:!bg-white"
		bind:value={q}
		oninput={onInput}
		onfocus={() => {
			recent = storage.read<string[]>(RECENT, []);
			open = true;
		}}
		onkeydown={(e) => {
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				active = Math.min(items.length - 1, active + 1);
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				active = Math.max(-1, active - 1);
			} else if (e.key === 'Escape' && open) {
				e.preventDefault();
				e.stopPropagation();
				open = false;
			}
		}}
	/>
	{#if q}
		<button
			type="button"
			class="icon-btn absolute top-1/2 right-1 !h-9 !w-9 -translate-y-1/2"
			aria-label="Очистити пошук"
			onclick={() => ((q = ''), onInput())}
		>
			<X size={16} />
		</button>
	{/if}

	{#if open && (items.length || q.trim().length >= 2)}
		<div
			class="popover absolute top-full right-0 left-0 z-40 mt-1.5 max-h-[70vh] overflow-auto p-1.5"
			transition:fly={{ y: -4, duration: 140 }}
		>
			{#if q.trim().length < 2}<p class="eyebrow px-3 pt-2 pb-1">Нещодавно шукали</p>{/if}
			<ul id="{id}-list" role="listbox" aria-label="Підказки пошуку">
				{#each items as item, i (item.kind + item.href)}
					{#if item.kind === 'product' && (i === 0 || items[i - 1].kind !== 'product')}
						<li role="presentation" class="eyebrow px-3 pt-3 pb-1">Товари</li>
					{/if}
					<!-- клавіатура обробляється на рівні listbox/combobox (стрілки, Enter) -->
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<li
						id="{id}-o{i}"
						role="option"
						aria-selected={i === active}
						class={['option !min-h-11', i === active && 'is-active']}
						onpointerenter={() => (active = i)}
						onclick={() => go(item.href, item.kind === 'product' ? undefined : q || item.label)}
					>
						{#if item.kind === 'product' && item.image}
							<enhanced:img
								src={productImage(item.image)}
								alt=""
								sizes="40px"
								class="h-10 w-10 shrink-0 rounded-[var(--radius-xs)] object-cover"
							/>
						{:else if item.kind === 'recent'}
							<Clock size={16} class="shrink-0 text-mute" />
						{:else}
							<FolderOpen size={16} class="shrink-0 text-mute" />
						{/if}
						<span class="min-w-0 flex-1 truncate">
							{#each parts(item.label) as part, j (j)}{#if part.m}<mark
										class="bg-blue-soft text-blue">{part.t}</mark
									>{:else}{part.t}{/if}{/each}
							{#if item.kind === 'category' && item.meta}<span class="text-mute">
									— {item.meta}</span
								>{/if}
						</span>
						{#if item.kind === 'product'}<span class="mono shrink-0 text-[13px]">{item.meta}</span
							>{/if}
					</li>
				{/each}
			</ul>
			{#if q.trim().length >= 2}
				{#if loading && !hits}
					<div class="grid gap-2 p-2" aria-hidden="true">
						{#each [0, 1, 2] as k (k)}<div class="skeleton h-10"></div>{/each}
					</div>
				{:else if hits && !items.length}
					<p class="px-3 py-4 text-sm text-graphite" role="status">
						Нічого не знайдено за «{q}». Спробуйте «навушники» або назву бренду.
					</p>
				{:else}
					<button type="submit" class="option mt-1 !text-blue"
						>Усі результати за «{q.trim()}» →</button
					>
				{/if}
			{/if}
		</div>
	{/if}
</form>
