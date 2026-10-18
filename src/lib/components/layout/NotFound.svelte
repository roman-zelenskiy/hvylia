<script lang="ts">
	import { t } from '#lib/ui.ts';
	import { lhref } from '#lib/lang.ts';
	import { page } from '$app/state';
	import SearchBox from '#lib/components/layout/SearchBox.svelte';

	const nav = $derived((page.data.nav ?? []) as { slug: string; name: string }[]);
	let { status = 404, message = '' }: { status?: number; message?: string } = $props();
	const notFound = $derived(status === 404);
	// «зламана» хвиля: штрихи обриваються посередині — тиша на місці сторінки
	const bars = Array.from({ length: 48 }, (_, i) =>
		Math.round(8 + 34 * Math.abs(Math.sin(i * 0.45)) * (i > 18 && i < 30 ? 0.06 : 1))
	);
</script>

<svelte:head>
	<title>{notFound ? t.nf.title : t.nf.error} {t.brandSuffix}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="wrap max-w-3xl pt-16 pb-8 text-center">
	<svg
		class="mx-auto h-16 w-full max-w-md"
		viewBox="0 0 {48 * 8} 64"
		preserveAspectRatio="none"
		aria-hidden="true"
	>
		{#each bars as h, i (i)}<rect
				x={i * 8 + 2}
				y={(64 - h) / 2}
				width="2"
				height={h}
				rx="1"
				fill={i > 18 && i < 30 ? 'var(--color-line-2)' : 'var(--color-ink)'}
			/>{/each}
	</svg>
	<p class="mono mt-8 text-sm text-blue">{status}</p>
	<h1 class="h-display mt-3 text-[clamp(2rem,5vw,3.5rem)]">
		{notFound ? t.nf.h1 : t.nf.h1Error}
	</h1>
	<p class="mx-auto mt-4 max-w-md text-graphite">
		{notFound ? t.nf.text : message}
	</p>
	<div class="mx-auto mt-8 max-w-lg text-left">
		<SearchBox id="search-404" label={t.search.errorPage} />
	</div>
	<ul class="mt-8 flex flex-wrap justify-center gap-2">
		{#each nav as c (c.slug)}<li>
				<a href={lhref('/[category=category]', { category: c.slug })} class="chip">{c.name}</a>
			</li>{/each}
	</ul>
	<a href={lhref('/')} class="btn btn-primary btn-md mt-10">{t.nf.home}</a>
</div>
