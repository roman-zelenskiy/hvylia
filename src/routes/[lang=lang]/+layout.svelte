<script lang="ts">
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { setLang, isLang } from '#lib/lang.ts';
	import { t } from '#lib/ui.ts';
	import { reducedMotion } from '#lib/motion.ts';
	import { live, loadShop } from '#lib/stores/shop.svelte.ts';
	import Header from '#lib/components/layout/Header.svelte';
	import Footer from '#lib/components/layout/Footer.svelte';
	import Toasts from '#lib/components/layout/Toasts.svelte';
	import MiniCart from '#lib/components/shop/MiniCart.svelte';

	let { children } = $props();

	// мова — з маршруту, ще до рендера дочірніх компонентів (на збірці й у браузері)
	if (isLang(page.params.lang)) setLang(page.params.lang);

	// localStorage читаємо лише після монтування — серверний HTML і перший рендер клієнта збігаються
	onMount(loadShop);

	/**
	 * View Transitions: картинка товару, по якій клікнули, «перелітає» в галерею сторінки товару.
	 * Ім’я переходу даємо лише клікнутому елементу — однакові імена на сторінці зривають перехід.
	 */
	let clicked: Element | null = null;
	onNavigate((nav) => {
		if (!document.startViewTransition || reducedMotion()) return;
		const toProduct = nav.to?.route.id === '/[lang=lang]/product/[slug]';
		const src = toProduct
			? clicked?.closest('[data-vt-scope]')?.querySelector<HTMLElement>('[data-vt]')
			: null;
		clicked = null;
		if (src) src.style.viewTransitionName = 'product-hero';
		return new Promise((done) => {
			const t = document.startViewTransition(async () => {
				if (src) src.style.viewTransitionName = '';
				done();
				await nav.complete;
			});
			t.finished.finally(() => src && (src.style.viewTransitionName = ''));
		});
	});
</script>

<svelte:document onclickcapture={(e) => (clicked = e.target as Element)} />

<div id="page">
	<a
		href="#main"
		class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:bg-blue focus:px-4 focus:py-3 focus:text-white"
		>{t.skip}</a
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
