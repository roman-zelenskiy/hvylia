<script lang="ts">
	import { resolve } from '$app/paths';
	import { Heart, Menu, Scale, Search, ShoppingBag } from '@lucide/svelte';
	import { cart, compare, wishlist } from '#lib/stores/shop.svelte.ts';
	import Logo from '#lib/components/ui/Logo.svelte';
	import CountIcon from './CountIcon.svelte';
	import MegaMenu from './MegaMenu.svelte';
	import MobileMenu from './MobileMenu.svelte';
	import SearchBox from './SearchBox.svelte';

	let mobileMenu = $state(false);
	let mobileSearch = $state(false);
	let scrolled = $state(false);
</script>

<svelte:window onscroll={() => (scrolled = window.scrollY > 8)} />

<header class="sticky top-0 z-40 px-3 pt-3 md:px-5">
	<div
		class={[
			'bar relative mx-auto max-w-[1440px] rounded-[22px] bg-white/90 backdrop-blur-xl',
			scrolled && 'is-raised'
		]}
	>
		<div class="flex h-16 items-center gap-2 pr-2 pl-3 md:gap-4 md:pl-5">
			<button
				type="button"
				class="icon-btn lg:hidden"
				aria-label="Меню"
				aria-expanded={mobileMenu}
				onclick={() => (mobileMenu = true)}
			>
				<Menu size={20} />
			</button>
			<a href={resolve('/')} class="shrink-0 rounded-full" aria-label="«Хвиля» — на головну">
				<Logo />
			</a>
			<div class="hidden lg:block"><MegaMenu /></div>
			<div class="ml-2 hidden flex-1 md:block lg:max-w-[560px]">
				<SearchBox id="search-desktop" />
			</div>

			<div class="ml-auto flex items-center">
				<button
					type="button"
					class="icon-btn !h-11 !w-11 md:hidden"
					aria-label="Пошук"
					aria-expanded={mobileSearch}
					onclick={() => (mobileSearch = !mobileSearch)}
				>
					<Search size={20} />
				</button>
				<span class="hidden sm:contents">
					<CountIcon
						href={resolve('/compare')}
						label="Порівняння"
						count={compare.ready ? compare.items.length : 0}><Scale size={20} /></CountIcon
					>
				</span>
				<CountIcon
					href={resolve('/wishlist')}
					label="Обране"
					count={wishlist.ready ? wishlist.items.length : 0}><Heart size={20} /></CountIcon
				>
				<CountIcon
					label="Кошик"
					count={cart.ready ? cart.count : 0}
					pulses={cart.pulses}
					onclick={() => (cart.drawer = true)}
				>
					<ShoppingBag size={20} />
				</CountIcon>
			</div>
		</div>
		{#if mobileSearch}
			<div class="px-3 pb-3 md:hidden">
				<SearchBox id="search-mobile" autofocus onnavigate={() => (mobileSearch = false)} />
			</div>
		{/if}
	</div>
</header>

<MobileMenu bind:open={mobileMenu} />

<style>
	.bar {
		box-shadow: 0 0 0 1px rgb(8 9 12 / 0.05);
		transition: box-shadow 0.3s var(--ease-precise);
	}
	.bar.is-raised {
		box-shadow:
			0 0 0 1px rgb(8 9 12 / 0.04),
			0 18px 40px -24px rgb(8 9 12 / 0.35);
	}
</style>
