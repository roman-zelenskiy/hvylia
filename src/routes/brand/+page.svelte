<script lang="ts">
	import { resolve } from '$app/paths';
	import { ArrowUpRight } from '@lucide/svelte';
	import { goods } from '#lib/catalog/format.ts';
	import { breadcrumbs } from '#lib/seo/schema.ts';
	import Seo from '#lib/seo/Seo.svelte';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';

	let { data } = $props();
	const crumbs = [{ href: '/', label: 'Головна' }, { label: 'Бренди' }];
</script>

<Seo
	title="Бренди аудіотехніки — навушники, колонки, вініл | Хвиля"
	description="Усі бренди «Хвилі»: навушники Aurel і Kobza Audio, колонки Nordwave і Lumen, вініл Ottava, Hi-Fi Basalt. Офіційна гарантія."
	path="/brand"
	jsonld={[breadcrumbs(crumbs, '/brand')]}
/>

<div class="wrap pt-6">
	<Breadcrumbs items={crumbs} />
	<h1 class="h-display mt-6 text-[clamp(2rem,4.4vw,3.5rem)]">Бренди</h1>
	<p class="mt-4 max-w-2xl text-graphite">
		Ми працюємо напряму з виробниками — тому даємо офіційну гарантію і знаємо кожну модель
		зсередини.
	</p>
	<ul class="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
		{#each data.list as b (b.slug)}
			<li class="bg-white">
				<a
					href={resolve('/brand/[slug]', { slug: b.slug })}
					class="group flex h-full flex-col p-6 transition-colors hover:bg-paper"
				>
					<span class="flex items-start justify-between">
						<span class="text-2xl font-semibold tracking-tight group-hover:text-blue">{b.name}</span
						>
						<ArrowUpRight
							size={18}
							class="text-mute transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue"
						/>
					</span>
					<span class="mt-2 text-sm text-graphite">{b.tagline}</span>
					<span class="mono mt-6 text-xs text-graphite"
						>{b.country} · з {b.founded} · {goods(b.count)}</span
					>
				</a>
			</li>
		{/each}
	</ul>
</div>
