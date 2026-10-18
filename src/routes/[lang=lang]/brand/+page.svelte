<script lang="ts">
	import { t } from '#lib/ui.ts';
	import { lhref } from '#lib/lang.ts';
	import { ArrowUpRight } from '@lucide/svelte';
	import { goods } from '#lib/catalog/format.ts';
	import { breadcrumbs } from '#lib/seo/schema.ts';
	import Seo from '#lib/seo/Seo.svelte';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';

	let { data } = $props();
	const crumbs = [{ href: '/', label: t.home }, { label: t.brandsPage.h1 }];
</script>

<Seo
	title={t.brandsPage.title}
	description={t.brandsPage.description}
	path="/brand"
	jsonld={[breadcrumbs(crumbs, '/brand')]}
/>

<div class="wrap pt-6">
	<Breadcrumbs items={crumbs} />
	<h1 class="h-display head-in mt-6 text-[clamp(2.4rem,5.6vw,4.75rem)]">{t.brandsPage.h1}</h1>
	<p class="mt-4 max-w-2xl text-graphite">
		{t.brandsPage.lead}
	</p>
	<ul class="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.list as b (b.slug)}
			<li class="in-view">
				<a
					href={lhref('/brand/[slug]', { slug: b.slug })}
					class="group flex h-full min-h-52 flex-col rounded-lg bg-white p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-pop)]"
				>
					<span class="flex items-start justify-between">
						<span
							class="text-[2rem] leading-none font-semibold tracking-[-0.04em] group-hover:text-blue"
							>{b.name}</span
						>
						<ArrowUpRight
							size={18}
							class="text-mute transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue"
						/>
					</span>
					<span class="mt-2 text-sm text-graphite">{b.tagline}</span>
					<span class="mt-auto pt-6 text-sm text-graphite"
						>{t.brandsPage.meta(b.country, b.founded, goods(b.count))}</span
					>
				</a>
			</li>
		{/each}
	</ul>
</div>
