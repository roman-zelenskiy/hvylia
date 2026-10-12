<script lang="ts">
	import { browser } from '$app/env';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import {
		hasActiveFilters,
		parseFilters,
		type FilterKey,
		type QueryResult
	} from '#lib/catalog/query.ts';
	import { brandLd, breadcrumbs, collection, faqPage } from '#lib/seo/schema.ts';
	import type { Brand } from '#lib/data/types.ts';
	import Seo from '#lib/seo/Seo.svelte';
	import Accordion from '#lib/components/ui/Accordion.svelte';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import { productCutout } from '#lib/images.ts';
	import CatalogView from './CatalogView.svelte';
	import LandingGraphic from './LandingGraphic.svelte';

	type Data = {
		h1: string;
		lead: string;
		title: string;
		description: string;
		path: string;
		crumbs: { href?: string; label: string }[];
		subs: { href: string; label: string; current?: boolean }[];
		seoText: { title: string; paragraphs: string[] }[];
		faq: { q: string; a: string }[];
		scope: string[];
		initial: QueryResult;
		filters: FilterKey[];
		eyebrow?: string;
		brand?: Brand;
		/** SEO-сторінка: id інфографіки */
		graphic?: string;
	};
	let { data }: { data: Data } = $props();

	let expanded = $state(false);
	// колаж шапки: до трьох популярних товарів розділу, що мають вирізку
	const collage = $derived(
		data.initial.items
			.map((p) => ({ slug: p.slug, alt: p.alt, pic: productCutout(p.slug) }))
			.filter((x) => x.pic)
			.slice(0, 3)
	);
	// комбінації фільтрів не індексуємо; canonical — завжди основна сторінка розділу
	const filtered = $derived(
		browser &&
			(hasActiveFilters(parseFilters(page.url.searchParams)) || page.url.searchParams.has('page'))
	);
</script>

<Seo
	title={data.title}
	description={data.description}
	path={data.path}
	noindex={filtered}
	jsonld={[
		breadcrumbs(data.crumbs, data.path),
		collection(data.h1, data.description, data.path, data.initial.items),
		...(data.faq.length ? [faqPage(data.faq)] : []),
		...(data.brand ? [brandLd(data.brand)] : [])
	]}
/>

<div class="wrap pt-6">
	<Breadcrumbs items={data.crumbs} />
	<div
		class={[
			'mt-6 grid grid-cols-[minmax(0,1fr)] items-center gap-8',
			(data.graphic || collage.length) && 'lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-12'
		]}
	>
		<div class="head-in max-w-2xl">
			{#if data.eyebrow}<p class="eyebrow mb-3">{data.eyebrow}</p>{/if}
			<h1 class="h-display text-[clamp(2.4rem,5.6vw,4.75rem)]">{data.h1}</h1>
			<p class="mt-5 max-w-xl text-[17px] text-graphite">{data.lead}</p>
			<p class="mt-6 inline-flex h-9 items-center rounded-full bg-white px-4 text-sm">
				<span class="mono mr-1.5 font-medium">{data.initial.total}</span> у розділі
			</p>
		</div>
		{#if data.graphic}
			<LandingGraphic id={data.graphic} />
		{:else if collage.length}
			<div
				class="stage collage relative hidden aspect-[4/3] rounded-lg md:block"
				aria-hidden="true"
			>
				{#each collage as c, i (c.slug)}
					<enhanced:img
						src={c.pic!}
						alt=""
						sizes="260px"
						class="cutout c-{i} absolute object-contain"
						style="--i: {i}"
					/>
				{/each}
			</div>
		{/if}
	</div>
	{#if data.subs.length}
		<nav aria-label="Підрозділи" class="no-scrollbar -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
			<ul class="flex gap-2 py-4">
				{#each data.subs as s (s.href)}
					<li>
						<a
							href={resolve(s.href as '/')}
							class={['chip whitespace-nowrap', s.current && 'is-active']}
							aria-current={s.current ? 'page' : undefined}>{s.label}</a
						>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}

	<div class="mt-4">
		<CatalogView scope={data.scope} initial={data.initial} show={data.filters} path={data.path} />
	</div>

	{#if data.seoText.length}
		<section
			class="mt-24 grid gap-8 rounded-lg bg-white p-6 md:p-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12"
			aria-labelledby="seo-title"
		>
			<p class="text-graphite">Довідка</p>
			<div class="max-w-3xl">
				<h2 id="seo-title" class="h-section text-[clamp(1.8rem,3vw,2.6rem)]">
					{data.seoText[0].title}
				</h2>
				<div class="relative mt-4 space-y-4 text-graphite">
					{#each data.seoText as block, i (block.title)}
						{#if i > 0}<h3 class="pt-2 text-lg font-medium text-ink" hidden={!expanded}>
								{block.title}
							</h3>{/if}
						{#each block.paragraphs as p, j (j)}
							<p hidden={!expanded && (i > 0 || j > 0)}>{p}</p>
						{/each}
					{/each}
				</div>
				{#if data.seoText.length > 1 || data.seoText[0].paragraphs.length > 1}
					<button
						type="button"
						class="wave-link mt-4 text-sm font-medium text-blue"
						aria-expanded={expanded}
						onclick={() => (expanded = !expanded)}
					>
						{expanded ? 'Згорнути' : 'Читати далі'}
					</button>
				{/if}
			</div>
		</section>
	{/if}

	{#if data.faq.length}
		<section
			class="mt-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12"
			aria-labelledby="faq-title"
		>
			<h2 id="faq-title" class="h-section text-[clamp(1.8rem,3vw,2.6rem)]">Питання й відповіді</h2>
			<div class="max-w-3xl"><Accordion id="cat-faq" items={data.faq} /></div>
		</section>
	{/if}
</div>

<style>
	/* колаж: три вирізки «на сцені», кожна з’являється з нахилом */
	.collage :global(.cutout) {
		animation: drop-in 0.9s var(--ease-out-soft) calc(var(--i) * 110ms + 120ms) both;
	}
	.collage :global(.c-0) {
		left: 6%;
		bottom: 12%;
		width: 52%;
		height: 70%;
		z-index: 2;
	}
	.collage :global(.c-1) {
		right: 6%;
		top: 10%;
		width: 40%;
		height: 46%;
	}
	.collage :global(.c-2) {
		right: 10%;
		bottom: 10%;
		width: 34%;
		height: 38%;
		z-index: 1;
	}
	@keyframes drop-in {
		from {
			opacity: 0;
			transform: translateY(24px) rotate(-4deg) scale(0.94);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.collage :global(.cutout) {
			animation: none;
		}
	}
</style>
