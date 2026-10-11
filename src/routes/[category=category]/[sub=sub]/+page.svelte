<script lang="ts">
	import CategoryPage from '#lib/components/catalog/CategoryPage.svelte';
	let { data } = $props();
</script>

<CategoryPage {data} />
