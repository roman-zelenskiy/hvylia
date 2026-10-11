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
	import CatalogView from './CatalogView.svelte';

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
	};
	let { data }: { data: Data } = $props();

	let expanded = $state(false);
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
		class="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-4 border-b border-line pb-8"
	>
		<div class="max-w-2xl">
			{#if data.eyebrow}<p class="eyebrow mb-3">{data.eyebrow}</p>{/if}
			<h1 class="h-display text-[clamp(2rem,4.4vw,3.5rem)]">{data.h1}</h1>
			<p class="mt-4 text-[15px] text-graphite">{data.lead}</p>
		</div>
		<p class="mono text-sm text-graphite">{data.initial.total} у розділі</p>
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
			class="mt-20 grid gap-8 border-t border-line pt-12 lg:grid-cols-[260px_1fr] lg:gap-10"
			aria-labelledby="seo-title"
		>
			<p class="eyebrow">Довідка</p>
			<div class="max-w-3xl">
				<h2 id="seo-title" class="text-2xl font-semibold tracking-tight">
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
			class="mt-16 grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10"
			aria-labelledby="faq-title"
		>
			<h2 id="faq-title" class="text-2xl font-semibold tracking-tight">Питання й відповіді</h2>
			<div class="max-w-3xl"><Accordion id="cat-faq" items={data.faq} /></div>
		</section>
	{/if}
</div>
