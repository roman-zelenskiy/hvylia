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

	// безшовна хвиля: період 600 по x, малюємо 2 періоди + запас для дрейфу
	const wave = (() => {
		let d = '';
		for (let x = 0; x <= 1800; x += 6) {
			const t = (x / 600) * Math.PI * 2;
			const y = 30 + Math.sin(t * 2) * 12 * Math.sin(t + 0.6) + Math.sin(t * 7) * 3;
			d += `${x ? 'L' : 'M'}${x} ${y.toFixed(1)}`;
		}
		return d;
	})();
</script>

<footer class="mt-28 px-3 pb-3 md:px-5 md:pb-5">
	<div class="foot mx-auto max-w-[1440px] overflow-hidden rounded-[28px] bg-ink text-white">
		<div
			class="grid gap-10 px-6 pt-14 pb-10 sm:grid-cols-2 md:px-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]"
		>
			<div>
				<Logo />
				<p class="mt-4 max-w-xs text-sm text-white/65">
					{shop.tagline}. Офіційна гарантія, доставка Новою Поштою по всій Україні.
				</p>
				<p class="mt-6 max-w-xs text-xs text-white/50">
					Демо-магазин для портфоліо. Замовлення не обробляються, оплата не списується.
				</p>
			</div>
			<nav aria-label="Каталог">
				<h2 class="text-sm text-white/50">Каталог</h2>
				<ul class="mt-4 grid gap-2 text-sm">
					{#each nav as c (c.slug)}<li>
							<a href={resolve('/[category=category]', { category: c.slug })} class="wave-link"
								>{c.name}</a
							>
						</li>{/each}
					<li><a href={resolve('/brand')} class="wave-link">Бренди</a></li>
				</ul>
			</nav>
			<nav aria-label="Покупцям">
				<h2 class="text-sm text-white/50">Покупцям</h2>
				<ul class="mt-4 grid gap-2 text-sm">
					{#each info as l (l.href)}<li>
							<a href={resolve(l.href)} class="wave-link">{l.label}</a>
						</li>{/each}
				</ul>
			</nav>
			<div>
				<h2 class="text-sm text-white/50">Аудіо-експерт</h2>
				<a href={shop.phoneHref} rel="external" class="mono mt-4 block text-2xl font-medium"
					>{shop.phone}</a
				>
				<p class="text-sm text-white/65">{shop.hours}, безкоштовно по Україні</p>
				<a href="mailto:{shop.email}" rel="external" class="wave-link mt-3 text-sm">{shop.email}</a>
				<p class="mt-3 text-sm text-white/65">Шоурум: {shop.city}, {shop.street}</p>
				<ul class="mt-4 flex gap-4 text-sm">
					<li>
						<a href={shop.telegram} rel="external noopener" target="_blank" class="wave-link"
							>Telegram</a
						>
					</li>
					<li>
						<a href={shop.instagram} rel="external noopener" target="_blank" class="wave-link"
							>Instagram</a
						>
					</li>
					<li>
						<a href={shop.youtube} rel="external noopener" target="_blank" class="wave-link"
							>YouTube</a
						>
					</li>
				</ul>
			</div>
		</div>
		<!-- фінальний акорд: назва магазину на всю ширину, над нею — тиха хвиля -->
		<div class="relative px-6 md:px-12" aria-hidden="true">
			<svg viewBox="0 0 1200 60" preserveAspectRatio="none" class="wave block h-10 w-full">
				<g class="wave-drift">
					<path d={wave} fill="none" stroke="#7f8cff" stroke-width="1.5" />
				</g>
			</svg>
			<p class="wordmark select-none" data-text="Хвиля"></p>
		</div>
		<p
			class="flex flex-wrap items-center justify-between gap-2 px-6 pt-2 pb-6 text-xs text-white/50 md:px-12"
		>
			<span>© 2026 {shop.legalName}</span><span>Фото: Unsplash</span>
		</p>
	</div>
</footer>

<style>
	.foot :global(.wave-link:hover),
	.foot a:hover {
		color: #9aa5ff;
	}
	.wordmark {
		font-size: clamp(5rem, 22vw, 19rem);
		font-weight: 600;
		letter-spacing: -0.07em;
		line-height: 0.78;
		margin-left: -0.04em;
		color: rgb(255 255 255 / 0.08);
	}
	/* декоративний напис — у псевдоелементі, щоб не читався як текст сторінки */
	.wordmark::before {
		content: attr(data-text);
	}
	.wave-drift {
		animation: drift 9s linear infinite;
	}
	@keyframes drift {
		to {
			transform: translateX(-600px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.wave-drift {
			animation: none;
		}
	}
</style>
