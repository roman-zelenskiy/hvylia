<script lang="ts">
	import { t } from '#lib/ui.ts';
	import { lhref } from '#lib/lang.ts';
	import { page } from '$app/state';
	import { ArrowLeft, ChevronRight, Phone } from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import { shop } from '#lib/data/site.ts';
	import { reducedMotion } from '#lib/motion.ts';
	import Overlay from '#lib/components/ui/Overlay.svelte';
	import Logo from '#lib/components/ui/Logo.svelte';

	/** Мобільне меню: багаторівнева навігація — слайд углиб категорії і назад */
	let { open = $bindable(false) }: { open?: boolean } = $props();
	let level = $state<string | null>(null);
	let dir = $state(1);

	const nav = $derived(
		page.data.nav as { slug: string; name: string; subs: { slug: string; name: string }[] }[]
	);
	const cat = $derived(nav.find((c) => c.slug === level));
	const d = () => (reducedMotion() ? 0 : 240);

	$effect(() => {
		void page.url.pathname;
		open = false;
	});
	$effect(() => {
		if (!open) level = null;
	});

	const info = t.infoLinks.slice(0, 5);
</script>

<Overlay
	bind:open
	labelledby="mobile-menu-title"
	side="left"
	width="max-w-[420px]"
	closeLabel={t.menu.close}
>
	<div class="flex h-16 shrink-0 items-center border-b border-line px-4">
		<h2 id="mobile-menu-title" class="sr-only">{t.menu.title}</h2>
		<Logo />
	</div>
	<div class="relative flex-1 overflow-x-hidden overflow-y-auto">
		{#key level}
			<div
				class="absolute inset-0 overflow-y-auto p-4"
				in:fly={{ x: 40 * dir, duration: d() }}
				out:fly={{ x: -40 * dir, duration: d() }}
			>
				{#if cat}
					<button
						type="button"
						class="mb-2 flex h-11 items-center gap-2 text-sm text-graphite hover:text-ink"
						data-autofocus
						onclick={() => ((dir = -1), (level = null))}
					>
						<ArrowLeft size={16} />
						{t.menu.allCats}
					</button>
					<p class="mb-2 text-xl font-semibold tracking-tight">{cat.name}</p>
					<ul class="divide-y divide-line border-y border-line">
						<li>
							<a
								href={lhref('/[category=category]', { category: cat.slug })}
								class="flex h-12 items-center text-blue">{t.menu.all(cat.name)}</a
							>
						</li>
						{#each cat.subs as s (s.slug)}
							<li>
								<a
									href={lhref('/[category=category]/[sub=sub]', {
										category: cat.slug,
										sub: s.slug
									})}
									class="flex h-12 items-center justify-between hover:text-blue"
									>{s.name}<ChevronRight size={16} class="text-line-2" /></a
								>
							</li>
						{/each}
					</ul>
				{:else}
					<p class="eyebrow mb-2">{t.menu.catalog}</p>
					<ul class="divide-y divide-line border-y border-line">
						{#each nav as c, i (c.slug)}
							<li>
								<button
									type="button"
									class="flex h-12 w-full items-center justify-between text-left text-[16px] hover:text-blue"
									data-autofocus={i === 0 ? '' : undefined}
									onclick={() => ((dir = 1), (level = c.slug))}
								>
									{c.name}<ChevronRight size={16} class="text-line-2" />
								</button>
							</li>
						{/each}
						<li>
							<a href={lhref('/brand')} class="flex h-12 items-center text-[16px] hover:text-blue"
								>{t.menu.brands}</a
							>
						</li>
					</ul>
					<p class="eyebrow mt-6 mb-2">{t.menu.buyers}</p>
					<ul class="grid">
						{#each info as l (l.href)}
							<li>
								<a href={lhref(l.href)} class="flex h-10 items-center text-graphite hover:text-ink"
									>{l.label}</a
								>
							</li>
						{/each}
					</ul>
					<a href={shop.phoneHref} rel="external" class="btn btn-secondary btn-md mt-6 w-full"
						><Phone size={16} /><span class="mono">{shop.phone}</span></a
					>
					<p class="mt-2 text-center text-xs text-graphite">{shop.hours}</p>
				{/if}
			</div>
		{/key}
	</div>
</Overlay>
