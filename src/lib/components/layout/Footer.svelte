<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { shop } from '#lib/data/site.ts';
	import Logo from '#lib/components/ui/Logo.svelte';

	const nav = $derived(page.data.nav as { slug: string; name: string }[]);
	const info = [
		{ href: '/dostavka-i-oplata', label: 'Доставка і оплата' },
		{ href: '/harantiia-ta-povernennia', label: 'Гарантія та повернення' },
		{ href: '/faq', label: 'Питання та відповіді' },
		{ href: '/pro-nas', label: 'Про нас' },
		{ href: '/kontakty', label: 'Контакти' },
		{ href: '/polityka-konfidentsiinosti', label: 'Політика конфіденційності' }
	] as const;
</script>

<footer class="mt-24 border-t border-line bg-white">
	<div class="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
		<div>
			<Logo />
			<p class="mt-4 max-w-xs text-sm text-graphite">
				{shop.tagline}. Офіційна гарантія, доставка Новою Поштою по всій Україні.
			</p>
			<p class="mono mt-6 text-xs text-mute">
				Демо-магазин для портфоліо. Замовлення не обробляються, оплата не списується.
			</p>
		</div>
		<nav aria-label="Каталог">
			<h2 class="eyebrow">Каталог</h2>
			<ul class="mt-4 grid gap-2 text-sm">
				{#each nav as c (c.slug)}<li>
						<a
							href={resolve('/[category=category]', { category: c.slug })}
							class="wave-link hover:text-blue">{c.name}</a
						>
					</li>{/each}
				<li><a href={resolve('/brand')} class="wave-link hover:text-blue">Бренди</a></li>
			</ul>
		</nav>
		<nav aria-label="Покупцям">
			<h2 class="eyebrow">Покупцям</h2>
			<ul class="mt-4 grid gap-2 text-sm">
				{#each info as l (l.href)}<li>
						<a href={resolve(l.href)} class="wave-link hover:text-blue">{l.label}</a>
					</li>{/each}
			</ul>
		</nav>
		<div>
			<h2 class="eyebrow">Аудіо-експерт</h2>
			<a
				href={shop.phoneHref}
				rel="external"
				class="mono mt-4 block text-xl font-medium hover:text-blue">{shop.phone}</a
			>
			<p class="text-sm text-graphite">{shop.hours}, безкоштовно по Україні</p>
			<a href="mailto:{shop.email}" rel="external" class="wave-link mt-3 text-sm hover:text-blue"
				>{shop.email}</a
			>
			<p class="mt-3 text-sm text-graphite">Шоурум: {shop.city}, {shop.street}</p>
			<ul class="mt-4 flex gap-4 text-sm">
				<li>
					<a
						href={shop.telegram}
						rel="external noopener"
						target="_blank"
						class="wave-link hover:text-blue">Telegram</a
					>
				</li>
				<li>
					<a
						href={shop.instagram}
						rel="external noopener"
						target="_blank"
						class="wave-link hover:text-blue">Instagram</a
					>
				</li>
				<li>
					<a
						href={shop.youtube}
						rel="external noopener"
						target="_blank"
						class="wave-link hover:text-blue">YouTube</a
					>
				</li>
			</ul>
		</div>
	</div>
	<div class="border-t border-line">
		<p class="wrap mono flex h-14 items-center justify-between text-xs text-graphite">
			<span>© 2026 {shop.legalName}</span><span>Фото: Unsplash</span>
		</p>
	</div>
</footer>
