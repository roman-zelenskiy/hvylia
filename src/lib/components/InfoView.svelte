<script lang="ts">
	import type { InfoPage } from '#lib/data/info.ts';
	import { breadcrumbs, faqPage } from '#lib/seo/schema.ts';
	import Seo from '#lib/seo/Seo.svelte';
	import Accordion from '#lib/components/ui/Accordion.svelte';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';

	let { page: p }: { page: InfoPage } = $props();
	const crumbs = $derived([{ href: '/', label: 'Головна' }, { label: p.h1 }]);
</script>

<Seo
	title={p.title}
	description={p.description}
	path="/{p.slug}"
	jsonld={[breadcrumbs(crumbs, `/${p.slug}`), ...(p.faq ? [faqPage(p.faq)] : [])]}
/>

<div class="wrap pt-6">
	<Breadcrumbs items={crumbs} />
	<div class="mt-6 border-b border-line pb-8">
		<h1 class="h-display text-[clamp(2rem,4.4vw,3.5rem)]">{p.h1}</h1>
		<p class="mt-4 max-w-2xl text-graphite">{p.lead}</p>
	</div>
	<div class="mt-10 grid max-w-4xl gap-12">
		{#each p.sections as s (s.title)}
			<section class="grid gap-3 md:grid-cols-[220px_1fr] md:gap-10">
				<h2 class="text-lg font-semibold tracking-tight">{s.title}</h2>
				<div class="grid gap-3 text-[15px]">
					{#each s.paragraphs as para, i (i)}<p>{para}</p>{/each}
					{#if s.list}
						<ul class="grid gap-2 border-l border-line pl-4">
							{#each s.list as li (li)}<li class="text-graphite">{li}</li>{/each}
						</ul>
					{/if}
				</div>
			</section>
		{/each}
		{#if p.faq}
			<section aria-labelledby="info-faq-title">
				<h2 id="info-faq-title" class="sr-only">Відповіді</h2>
				<Accordion id="info-faq" items={p.faq} />
			</section>
		{/if}
	</div>
</div>
