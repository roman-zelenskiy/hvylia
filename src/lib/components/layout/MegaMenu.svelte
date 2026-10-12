<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { ArrowRight, ChevronRight, LayoutGrid, X } from '@lucide/svelte';
	import { fade, fly } from 'svelte/transition';
	import { formatPrice } from '#lib/catalog/format.ts';
	import { productCutout, productImage } from '#lib/images.ts';
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
			class="mega absolute top-[calc(100%+10px)] right-0 left-0 z-40 overflow-hidden rounded-[22px] bg-white"
			transition:fly={{ y: -10, duration: reducedMotion() ? 0 : 220 }}
		>
			<nav aria-label="Каталог товарів" class="grid min-h-[400px] grid-cols-[280px_1fr] gap-0">
				<ul class="bg-paper/60 p-3">
					{#each nav as c (c.slug)}
						<li>
							<a
								href={resolve('/[category=category]', { category: c.slug })}
								class={[
									'flex h-12 items-center justify-between rounded-sm px-4 text-[16px] font-medium transition-colors',
									active === c.slug ? 'bg-white text-ink shadow-sm' : 'text-graphite hover:text-ink'
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
					<li class="mt-2">
						<a
							href={resolve('/brand')}
							class="flex h-12 items-center px-4 text-[15px] text-graphite hover:text-ink"
							>Усі бренди</a
						>
					</li>
				</ul>

				<div class="relative grid overflow-hidden">
					{#key active}
						<div
							class="grid h-full grid-cols-[1fr_1fr_300px] gap-8 p-4 pl-10 [grid-area:1/1]"
							in:fly={{ x: 10, duration: reducedMotion() ? 0 : 220, delay: 60 }}
							out:fade={{ duration: 80 }}
						>
							<div>
								<p class="pt-4 text-sm text-mute">Розділи</p>
								<ul class="mt-3 grid gap-1">
									{#each current.subs as s (s.slug)}
										<li>
											<a
												href={resolve('/[category=category]/[sub=sub]', {
													category: current.slug,
													sub: s.slug
												})}
												class="wave-link py-1.5 text-[17px] font-medium tracking-[-0.01em] hover:text-blue"
												>{s.name}</a
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
								<p class="pt-4 text-sm text-mute">Бренди</p>
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
									class="group stage relative flex flex-col justify-end overflow-hidden rounded-lg p-5"
								>
									<span class="absolute top-5 left-5 text-sm text-graphite"
										>Обирають найчастіше</span
									>
									{#if productCutout(promo.slug)}
										<enhanced:img
											src={productCutout(promo.slug)!}
											alt={promo.alt}
											sizes="220px"
											class="cutout promo-img mx-auto mt-12 mb-4 aspect-square w-[72%] object-contain"
										/>
									{:else}
										<enhanced:img
											src={productImage(promo.image)}
											alt={promo.alt}
											sizes="260px"
											class="mt-12 mb-4 aspect-[4/3] w-full rounded-sm object-cover"
										/>
									{/if}
									<span class="relative text-[17px] font-medium group-hover:text-blue"
										>{promo.name}</span
									>
									<span class="mono relative mt-1 text-sm">{formatPrice(promo.price)}</span>
								</a>
							{/if}
						</div>
					{/key}
				</div>
			</nav>
		</div>
	{/if}
</div>

<style>
	.mega {
		box-shadow:
			0 0 0 1px rgb(8 9 12 / 0.05),
			0 32px 64px -32px rgb(8 9 12 / 0.45);
	}
	.promo-img {
		transition: transform 0.6s var(--ease-out-soft);
	}
	.group:hover .promo-img {
		transform: translateY(-6px) rotate(-2deg) scale(1.04);
	}
</style>
