<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import { live, loadShop } from '#lib/stores/shop.svelte.ts';
	import Header from '#lib/components/layout/Header.svelte';
	import Footer from '#lib/components/layout/Footer.svelte';
	import Toasts from '#lib/components/layout/Toasts.svelte';
	import MiniCart from '#lib/components/shop/MiniCart.svelte';

	let { children } = $props();

	// localStorage читаємо лише після монтування — серверний HTML і перший рендер клієнта збігаються
	onMount(loadShop);
</script>

<div id="page">
	<a
		href="#main"
		class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:bg-blue focus:px-4 focus:py-3 focus:text-white"
		>Перейти до вмісту</a
	>
	<Header />
	<main id="main" tabindex="-1" class="outline-none">
		{@render children()}
	</main>
	<Footer />
</div>
<MiniCart />
<Toasts />
<div class="sr-only" aria-live="polite" aria-atomic="true">
	{#key live.n}<span>{live.text}</span>{/key}
</div>
