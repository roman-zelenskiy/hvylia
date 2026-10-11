<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { Heart, Menu, Phone, Scale, Search, ShoppingBag } from '@lucide/svelte';
	import { shop } from '#lib/data/site.ts';
	import { cart, compare, wishlist } from '#lib/stores/shop.svelte.ts';
	import Logo from '#lib/components/ui/Logo.svelte';
	import CountIcon from './CountIcon.svelte';
	import MegaMenu from './MegaMenu.svelte';
	import MobileMenu from './MobileMenu.svelte';
	import SearchBox from './SearchBox.svelte';

	let mobileMenu = $state(false);
	let mobileSearch = $state(false);
	const nav = $derived(page.data.nav as { slug: string; name: string }[]);
</script>

<header class="sticky top-0 z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
	<div class="hidden border-b border-line md:block">
		<div class="wrap flex h-9 items-center justify-between gap-6 text-[12.5px] text-graphite">
			<p class="mono flex gap-5">
				<span>Безкоштовна доставка від 3&#8239;000&nbsp;₴</span>
				<span class="hidden lg:inline">Гарантія до 3 років</span>
				<span class="hidden lg:inline">30 днів на повернення</span>
			</p>
			<div class="flex items-center gap-5">
				<a href={resolve('/dostavka-i-oplata')} class="wave-link hover:text-ink"
					>Доставка і оплата</a
				>
				<a href={resolve('/kontakty')} class="wave-link hover:text-ink">Контакти</a>
				<a
					href={shop.phoneHref}
					rel="external"
					class="mono flex items-center gap-1.5 text-ink hover:text-blue"
				>
					<Phone size={13} />{shop.phone}<span class="text-graphite">· {shop.hours}</span>
				</a>
			</div>
		</div>
	</div>

	<div class="relative border-b border-line">
		<div class="wrap flex h-16 items-center gap-3 md:gap-5">
			<button
				type="button"
				class="icon-btn -ml-2 lg:hidden"
				aria-label="Меню"
				aria-expanded={mobileMenu}
				onclick={() => (mobileMenu = true)}
			>
				<Menu size={20} />
			</button>
			<a
				href={resolve('/')}
				class="shrink-0 rounded-[var(--radius-xs)]"
				aria-label="«Хвиля» — на головну"
			>
				<Logo />
			</a>
			<div class="hidden lg:block"><MegaMenu /></div>
			<div class="hidden flex-1 md:block"><SearchBox id="search-desktop" /></div>

			<div class="ml-auto flex items-center md:ml-0">
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
			<div class="wrap pb-3 md:hidden">
				<SearchBox id="search-mobile" autofocus onnavigate={() => (mobileSearch = false)} />
			</div>
		{/if}
	</div>

	<nav aria-label="Категорії" class="hidden border-b border-line lg:block">
		<ul class="wrap flex h-11 items-center gap-7 text-sm">
			{#each nav as c (c.slug)}
				<li>
					<a
						href={resolve('/[category=category]', { category: c.slug })}
						class="wave-link hover:text-ink {page.url.pathname.startsWith(`/${c.slug}`)
							? 'text-ink'
							: 'text-graphite'}"
						aria-current={page.url.pathname.startsWith(`/${c.slug}`) ? 'true' : undefined}
						>{c.name}</a
					>
				</li>
			{/each}
			<li><a href={resolve('/brand')} class="wave-link text-graphite hover:text-ink">Бренди</a></li>
			<li class="ml-auto">
				<a
					href={resolve('/[category=category]/[sub=sub]', {
						category: 'vinil',
						sub: 'dlia-pochatkivtsiv'
					})}
					class="wave-link text-blue">Перший вініл →</a
				>
			</li>
		</ul>
	</nav>
</header>

<MobileMenu bind:open={mobileMenu} />
