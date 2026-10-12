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
	<div class="head-in mt-6 pb-4">
		<h1 class="h-display text-[clamp(2.4rem,5.6vw,4.75rem)]">{p.h1}</h1>
		<p class="mt-5 max-w-2xl text-[17px] text-graphite">{p.lead}</p>
	</div>
	<div class="mt-10 grid max-w-5xl gap-3">
		{#each p.sections as s (s.title)}
			<section
				class="in-view grid gap-4 rounded-lg bg-white p-6 md:grid-cols-[240px_1fr] md:gap-10 md:p-10"
			>
				<h2 class="text-2xl leading-tight font-semibold tracking-[-0.03em]">{s.title}</h2>
				<div class="grid max-w-2xl gap-3 text-[16px]">
					{#each s.paragraphs as para, i (i)}<p>{para}</p>{/each}
					{#if s.list}
						<ul class="mt-1 grid gap-2">
							{#each s.list as li (li)}<li
									class="flex gap-3 rounded-sm bg-paper px-4 py-3 text-graphite"
								>
									<span
										class="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-blue"
										aria-hidden="true"
									></span>{li}
								</li>{/each}
						</ul>
					{/if}
				</div>
			</section>
		{/each}
		{#if p.faq}
			<section aria-labelledby="info-faq-title" class="rounded-lg bg-white p-6 md:p-10">
				<h2 id="info-faq-title" class="sr-only">Відповіді</h2>
				<Accordion id="info-faq" items={p.faq} />
			</section>
		{/if}
	</div>
</div>
