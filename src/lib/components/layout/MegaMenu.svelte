<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { ArrowRight, ChevronRight, LayoutGrid, X } from '@lucide/svelte';
	import { fade, fly } from 'svelte/transition';
	import { formatPrice } from '#lib/catalog/format.ts';
	import { productImage } from '#lib/images.ts';
	import { reducedMotion } from '#lib/motion.ts';

	/**
	 * Мега-меню каталогу. Відкривається кліком або наведенням (з затримкою, щоб не блимало),
	 * ліворуч — категорії, праворуч — підкатегорії, бренди і промо-товар. Esc і клік поза меню закривають.
	 */
	let open = $state(false);
	let active = $state('navushnyky');
	let root: HTMLDivElement;
	let trigger: HTMLButtonElement;
	let hoverTimer: ReturnType<typeof setTimeout>;

	const nav = $derived(
		page.data.nav as { slug: string; name: string; subs: { slug: string; name: string }[] }[]
	);
	const catalog = $derived(page.data.catalog as import('#lib/catalog/query.ts').Summary[]);
	const current = $derived(nav.find((c) => c.slug === active) ?? nav[0]);
	const brandsIn = $derived([
		...new Map(
			catalog.filter((p) => p.category === active).map((p) => [p.brand, p.brandName])
		).entries()
	]);
	const promo = $derived(
		catalog
			.filter((p) => p.category === active && p.stock !== 'out')
			.sort((a, b) => b.popularity - a.popularity)[0]
	);

	const hoverable = () => matchMedia('(hover: hover) and (pointer: fine)').matches;
	function enter() {
		if (!hoverable()) return;
		clearTimeout(hoverTimer);
		hoverTimer = setTimeout(() => (open = true), 180);
	}
	function leave() {
		if (!hoverable()) return;
		clearTimeout(hoverTimer);
		hoverTimer = setTimeout(() => (open = false), 260);
	}
	function close(focus = false) {
		open = false;
		if (focus) trigger.focus();
	}

	// будь-яка навігація закриває меню
	$effect(() => {
		void page.url.pathname;
		open = false;
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (open && e.key === 'Escape') close(true);
	}}
	onpointerdown={(e) => {
		if (open && !root.contains(e.target as Node)) open = false;
	}}
/>

<div
	bind:this={root}
	class="static"
	role="presentation"
	onpointerenter={enter}
	onpointerleave={leave}
>
	<button
		bind:this={trigger}
		type="button"
		class="btn btn-dark btn-md gap-2.5"
		aria-expanded={open}
		aria-controls="mega-menu"
		onclick={() => (open = !open)}
	>
		{#if open}<X size={17} />{:else}<LayoutGrid size={17} />{/if}
		Каталог
	</button>

	{#if open}
		<div
			id="mega-menu"
			class="absolute top-full right-0 left-0 z-40 border-t border-line bg-white shadow-[var(--shadow-pop)]"
			transition:fly={{ y: -6, duration: reducedMotion() ? 0 : 180 }}
		>
			<nav aria-label="Каталог товарів" class="wrap grid min-h-[380px] grid-cols-[260px_1fr] gap-0">
				<ul class="border-r border-line py-4 pr-4">
					{#each nav as c (c.slug)}
						<li>
							<a
								href={resolve('/[category=category]', { category: c.slug })}
								class={[
									'flex h-11 items-center justify-between rounded-[var(--radius-xs)] px-3 text-[15px] transition-colors',
									active === c.slug ? 'bg-paper text-ink' : 'text-graphite hover:text-ink'
								]}
								aria-current={active === c.slug ? 'true' : undefined}
								onpointerenter={() => (active = c.slug)}
								onfocus={() => (active = c.slug)}
							>
								{c.name}
								<ChevronRight size={15} class={active === c.slug ? 'text-blue' : 'text-line-2'} />
							</a>
						</li>
					{/each}
					<li class="mt-3 border-t border-line pt-3">
						<a
							href={resolve('/brand')}
							class="flex h-11 items-center px-3 text-[15px] text-graphite hover:text-ink"
							>Усі бренди</a
						>
					</li>
				</ul>

				<div class="relative overflow-hidden">
					{#key active}
						<div
							class="grid h-full grid-cols-[1fr_1fr_280px] gap-8 py-6 pl-8"
							in:fly={{ x: 10, duration: reducedMotion() ? 0 : 220, delay: 60 }}
							out:fade={{ duration: 80 }}
						>
							<div>
								<p class="eyebrow">Розділи</p>
								<ul class="mt-3 grid gap-1">
									{#each current.subs as s (s.slug)}
										<li>
											<a
												href={resolve('/[category=category]/[sub=sub]', {
													category: current.slug,
													sub: s.slug
												})}
												class="wave-link py-1.5 text-[15px] hover:text-blue">{s.name}</a
											>
										</li>
									{/each}
								</ul>
								<a
									href={resolve('/[category=category]', { category: current.slug })}
									class="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-blue hover:text-blue-ink"
								>
									Усі {current.name.toLowerCase()}
									<ArrowRight size={14} />
								</a>
							</div>
							<div>
								<p class="eyebrow">Популярні бренди</p>
								<ul class="mt-3 grid gap-1">
									{#each brandsIn as [slug, name] (slug)}
										<li>
											<a
												href={resolve('/brand/[slug]', { slug })}
												class="wave-link py-1.5 text-[15px] hover:text-blue">{name}</a
											>
										</li>
									{/each}
								</ul>
							</div>
							{#if promo}
								<a
									href={resolve('/product/[slug]', { slug: promo.slug })}
									class="group flex flex-col bg-paper p-4 transition-colors hover:bg-blue-soft"
								>
									<span class="eyebrow">Обирають найчастіше</span>
									<enhanced:img
										src={productImage(promo.image)}
										alt={promo.alt}
										sizes="248px"
										class="my-3 aspect-[4/3] w-full object-cover mix-blend-multiply"
									/>
									<span class="text-[15px] font-medium group-hover:text-blue">{promo.name}</span>
									<span class="mono mt-1 text-sm">{formatPrice(promo.price)}</span>
								</a>
							{/if}
						</div>
					{/key}
				</div>
			</nav>
		</div>
	{/if}
</div>
