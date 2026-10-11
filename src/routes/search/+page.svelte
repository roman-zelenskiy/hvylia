<script lang="ts">
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

<Seo
	title={q ? `«${q}» — пошук | Хвиля` : 'Пошук | Хвиля'}
	description="Пошук навушників, колонок, програвачів вінілу та аксесуарів у магазині «Хвиля»."
	path="/search"
	noindex
/>

<div class="wrap pt-6">
	<Breadcrumbs items={[{ href: '/', label: 'Головна' }, { label: 'Пошук' }]} />
	<h1 class="h-display mt-6 border-b border-line pb-8 text-[clamp(2rem,4.4vw,3.5rem)]">
		{#if q}Результати за «{q}»{:else}Пошук по каталогу{/if}
	</h1>
	<div class="mt-6">
		<CatalogView scope={data.scope} initial={data.initial} show={data.filters} path="/search" />
	</div>
</div>
