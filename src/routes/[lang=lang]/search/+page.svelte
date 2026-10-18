<script lang="ts">
	import { t } from '#lib/ui.ts';
	import { browser } from '$app/env';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import Seo from '#lib/seo/Seo.svelte';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import CatalogView from '#lib/components/catalog/CatalogView.svelte';

	let { data } = $props();
	let hydrated = $state(false);
	onMount(() => (hydrated = true));
	const q = $derived(hydrated && browser ? (page.url.searchParams.get('q') ?? '').trim() : '');
</script>

<Seo title={t.searchPage.title(q)} description={t.searchPage.description} path="/search" noindex />

<div class="wrap pt-6">
	<Breadcrumbs items={[{ href: '/', label: t.home }, { label: t.searchPage.crumb }]} />
	<h1 class="h-display head-in mt-6 pb-4 text-[clamp(2.4rem,5.6vw,4.75rem)]">
		{#if q}{t.searchPage.results(q)}{:else}{t.searchPage.h1}{/if}
	</h1>
	<div class="mt-6">
		<CatalogView scope={data.scope} initial={data.initial} show={data.filters} path="/search" />
	</div>
</div>
