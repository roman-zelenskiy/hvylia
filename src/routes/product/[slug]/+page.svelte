<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { Heart, Scale, ShieldCheck, Truck, Undo2, Zap, Check } from '@lucide/svelte';
	import { onMount, untrack } from 'svelte';
	import { fly } from 'svelte/transition';
	import { delay } from '#lib/api/client.ts';
	import type { Summary } from '#lib/catalog/query.ts';
	import { formatDate } from '#lib/catalog/format.ts';
	import { FREE_SHIPPING_FROM, RETURN_DAYS } from '#lib/data/site.ts';
	import { productImage } from '#lib/images.ts';
	import { isValidPhone } from '#lib/phone.ts';
	import { reducedMotion } from '#lib/motion.ts';
	import { breadcrumbs, product as productLd } from '#lib/seo/schema.ts';
	import { compare, recent, wishlist } from '#lib/stores/shop.svelte.ts';
	import { addToCart, toggleCompare, toggleWishlist } from '#lib/stores/actions.ts';
	import Seo from '#lib/seo/Seo.svelte';
	import Gallery from '#lib/components/product/Gallery.svelte';
	import Reviews from '#lib/components/product/Reviews.svelte';
	import ProductCard from '#lib/components/shop/ProductCard.svelte';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Overlay from '#lib/components/ui/Overlay.svelte';
	import PhoneInput from '#lib/components/ui/PhoneInput.svelte';
	import Price from '#lib/components/ui/Price.svelte';
	import Rating from '#lib/components/ui/Rating.svelte';
	import Stepper from '#lib/components/ui/Stepper.svelte';
	import Tabs from '#lib/components/ui/Tabs.svelte';

	let { data } = $props();
	const p = $derived(data.product);

	let color = $state('');
	let qty = $state(1);
	let tab = $state('opys');
	let added = $state(false);
	let buyVisible = $state(true);
	let buyBox = $state<HTMLElement>();

	// при переході між товарами стан вибору скидається
	$effect.pre(() => {
		void p.slug;
		color = p.colors[0].id;
		qty = 1;
		tab = 'opys';
	});

	const out = $derived(p.stock === 'out');
	const colorName = $derived(p.colors.find((c) => c.id === color)?.name ?? '');
	const crumbs = $derived([
		{ href: '/', label: 'Головна' },
		{ href: `/${data.category.slug}`, label: data.category.name },
		{ href: `/${data.category.slug}/${data.sub.slug}`, label: data.sub.name },
		{ label: p.name }
	]);
	const path = $derived(`/product/${p.slug}`);
	const lcpSource = $derived(productImage(p.images[0]).sources.avif);
	const imageUrls = $derived(p.images.map((f) => productImage(f).img.src));
	const recentItems = $derived(
		recent.ready
			? recent.items
					.filter((s) => s !== p.slug)
					.map((s) => (page.data.catalog as Summary[]).find((x) => x.slug === s))
					.filter((x): x is Summary => !!x)
					.slice(0, 4)
			: []
	);

	onMount(() => {
		const io = new IntersectionObserver(
			([e]) => (buyVisible = e.isIntersecting || e.boundingClientRect.top > 0),
			{ rootMargin: '-80px 0px 0px 0px' }
		);
		if (buyBox) io.observe(buyBox);
		return () => io.disconnect();
	});
	// недавно переглянуті — після монтування (localStorage); запис без підписки на сам список
	$effect(() => {
		const slug = p.slug;
		if (recent.ready) untrack(() => recent.push(slug));
	});

	function add() {
		addToCart(p.slug, color, qty, p.name);
		added = true;
		setTimeout(() => (added = false), 1400);
	}

	// «Купити в 1 клік» (демо)
	let oneClick = $state(false);
	let ocPhone = $state('');
	let ocTouched = $state(false);
	let ocStatus = $state<'idle' | 'sending' | 'done'>('idle');
	const ocError = $derived(
		ocTouched && !isValidPhone(ocPhone) ? 'Вкажіть номер повністю: +380 (XX) XXX-XX-XX' : ''
	);
	async function sendOneClick(e: SubmitEvent) {
		e.preventDefault();
		ocTouched = true;
		if (!isValidPhone(ocPhone)) return document.getElementById('oc-phone')?.focus();
		ocStatus = 'sending';
		await delay(400, 800);
		ocStatus = 'done';
	}

	const tabs = $derived([
		{ id: 'opys', label: 'Опис' },
		{ id: 'kharakterystyky', label: 'Характеристики' },
		{ id: 'vidhuky', label: 'Відгуки', count: data.rating.count },
		{ id: 'pytannia', label: 'Питання', count: data.questions.length }
	]);
</script>

<Seo
	title="{p.name} — купити, ціна {p.price} ₴ | Хвиля"
	description="{p.name}: {p.short} Офіційна гарантія {Math.round(p.warrantyMonths / 12) ||
		''}{p.warrantyMonths >= 12 ? ' р.' : ''}, доставка по Україні, 30 днів на повернення."
	{path}
	type="product"
	image={imageUrls[0]}
	jsonld={[
		breadcrumbs(crumbs, path),
		productLd(p, data.brand, imageUrls, data.rating, data.reviews)
	]}
/>

<svelte:head>
	<!-- головне фото — LCP: браузер починає вантажити його разом з HTML -->
	{#if lcpSource}
		<link
			rel="preload"
			as="image"
			type="image/avif"
			imagesrcset={lcpSource}
			imagesizes="(min-width: 1024px) 640px, 100vw"
			fetchpriority="high"
		/>
	{/if}
</svelte:head>

<div class="wrap pt-6">
	<Breadcrumbs items={crumbs} />

	<div class="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14">
		<Gallery images={p.images} alt={p.alt} name={p.name} />

		<div>
			<a
				href={resolve('/brand/[slug]', { slug: data.brand.slug })}
				class="eyebrow wave-link hover:text-blue">{data.brand.name}</a
			>
			<h1 class="h-display mt-3 text-[clamp(1.9rem,3.4vw,2.75rem)]">{p.name}</h1>
			<div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
				{#if data.rating.count}
					<button
						type="button"
						class="hover:text-blue"
						onclick={() => (
							(tab = 'vidhuky'),
							document.getElementById('product-tabs')?.scrollIntoView()
						)}
					>
						<Rating value={data.rating.value} count={data.rating.count} />
					</button>
				{/if}
				<span class="mono text-xs text-graphite">Код: {p.id.toUpperCase()}</span>
			</div>
			<p class="mt-5 text-[15px] text-graphite">{p.short}</p>

			<div bind:this={buyBox} class="mt-6 border-y border-line py-6">
				<Price price={p.price} old={p.oldPrice} size="lg" />
				<p
					class={[
						'mt-2 text-sm',
						out ? 'text-alert' : p.stock === 'low' ? 'text-[#a15c00]' : 'text-ok'
					]}
				>
					{out
						? 'Немає в наявності'
						: p.stock === 'low'
							? 'Закінчується — залишилось кілька штук'
							: 'В наявності, відправимо сьогодні'}
				</p>

				{#if p.colors.length > 1 || p.colors[0]}
					<fieldset class="mt-6">
						<legend class="text-sm">Колір: <span class="font-medium">{colorName}</span></legend>
						<div class="mt-2 flex flex-wrap gap-2">
							{#each p.colors as c (c.id)}
								<label class="swatch" title={c.name}>
									<input
										type="radio"
										class="sr-only"
										name="color"
										value={c.id}
										bind:group={color}
									/>
									<span class="swatch-dot" style:background={c.hex} aria-hidden="true"></span>
									<span class="sr-only">{c.name}</span>
								</label>
							{/each}
						</div>
					</fieldset>
				{/if}

				<div class="mt-6 flex flex-wrap items-center gap-3">
					<Stepper bind:value={qty} max={10} />
					<Button size="lg" class="min-w-48 flex-1" disabled={out} onclick={add}>
						{#if added}<Check size={18} /> Додано{:else}У кошик{/if}
					</Button>
					<button
						type="button"
						class="icon-btn !h-[52px] !w-[52px] shadow-[inset_0_0_0_1px_var(--color-line-2)]"
						aria-pressed={wishlist.ready && wishlist.has(p.slug)}
						aria-label="В обране"
						onclick={() => toggleWishlist(p.slug, p.name)}
					>
						<Heart
							size={19}
							fill={wishlist.ready && wishlist.has(p.slug) ? 'currentColor' : 'none'}
						/>
					</button>
					<button
						type="button"
						class="icon-btn !h-[52px] !w-[52px] shadow-[inset_0_0_0_1px_var(--color-line-2)]"
						aria-pressed={compare.ready && compare.has(p.slug)}
						aria-label="Порівняти"
						onclick={() => toggleCompare(p.slug, p.name)}
					>
						<Scale size={19} />
					</button>
				</div>
				<Button
					variant="secondary"
					full
					size="lg"
					class="mt-3"
					disabled={out}
					onclick={() => ((oneClick = true), (ocStatus = 'idle'))}
				>
					<Zap size={17} /> Купити в 1 клік
				</Button>
			</div>

			<ul class="mt-6 grid gap-4 text-sm">
				<li class="flex gap-3">
					<Truck size={18} class="mt-0.5 shrink-0 text-blue" /><span
						><b class="font-medium">Доставка Новою Поштою за 1–3 дні.</b>
						{p.price >= FREE_SHIPPING_FROM
							? 'Безкоштовно для цього товару.'
							: `Безкоштовно від ${FREE_SHIPPING_FROM} ₴.`}</span
					>
				</li>
				{#if p.warrantyMonths}<li class="flex gap-3">
						<ShieldCheck size={18} class="mt-0.5 shrink-0 text-blue" /><span
							><b class="font-medium">Офіційна гарантія {p.warrantyMonths} міс.</b> Обмін у сервісі виробника.</span
						>
					</li>{/if}
				<li class="flex gap-3">
					<Undo2 size={18} class="mt-0.5 shrink-0 text-blue" /><span
						><b class="font-medium">{RETURN_DAYS} днів на повернення</b> без пояснення причин.
						<a href={resolve('/harantiia-ta-povernennia')} class="wave-link text-blue">Умови</a
						></span
					>
				</li>
			</ul>

			<ul
				class="mt-6 grid grid-cols-2 gap-px border border-line bg-line"
				aria-label="Ключові характеристики"
			>
				{#each p.highlights as h (h)}<li class="mono bg-white px-3 py-2.5 text-[12.5px]">
						{h}
					</li>{/each}
			</ul>
		</div>
	</div>

	<section id="product-tabs" class="mt-16" aria-label="Детальна інформація">
		<Tabs id="pd" {tabs} bind:active={tab}>
			{#snippet panel(id)}
				{#if id === 'opys'}
					<div class="grid max-w-3xl gap-4 text-[15px] leading-relaxed">
						{#each p.description as para, i (i)}<p>{para}</p>{/each}
					</div>
				{:else if id === 'kharakterystyky'}
					<div class="grid max-w-4xl gap-10">
						{#each p.specs as g (g.title)}
							<table class="w-full text-sm">
								<caption class="eyebrow pb-3 text-left">{g.title}</caption>
								<tbody>
									{#each g.rows as r (r.label)}
										<tr class="border-t border-line">
											<th scope="row" class="w-1/2 py-3 pr-4 text-left font-normal text-graphite"
												>{r.label}</th
											>
											<td class="mono py-3">{r.value}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						{/each}
					</div>
				{:else if id === 'vidhuky'}
					<Reviews reviews={data.reviews} rating={data.rating} productName={p.name} />
				{:else}
					<ul class="grid max-w-3xl gap-6">
						{#each data.questions as q (q.id)}
							<li class="border-l-2 border-line pl-4">
								<p class="font-medium">{q.q}</p>
								<p class="mt-1 text-xs text-graphite">{q.author} · {formatDate(q.date)}</p>
								<p class="mt-3 text-[15px]">
									<span class="eyebrow mr-2 text-blue">Хвиля</span>{q.a}
								</p>
							</li>
						{:else}
							<li class="text-graphite">
								Питань ще немає. Зателефонуйте аудіо-експерту: 0 800 33 41 77 — відповімо одразу.
							</li>
						{/each}
					</ul>
				{/if}
			{/snippet}
		</Tabs>
	</section>

	{#each [{ title: 'З цим купують', items: data.together }, { title: 'Схожі товари', items: data.similar }, { title: 'Ви переглядали', items: recentItems }] as block (block.title)}
		{#if block.items.length}
			<section class="mt-20" aria-labelledby="blk-{block.title}">
				<h2 id="blk-{block.title}" class="text-2xl font-semibold tracking-tight">{block.title}</h2>
				<ul class="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
					{#each block.items as s (s.slug)}<li><ProductCard product={s} /></li>{/each}
				</ul>
			</section>
		{/if}
	{/each}
</div>

<!-- липка панель покупки: з’являється, коли основна кнопка пішла за край екрана -->
{#if !buyVisible}
	<div
		class="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 backdrop-blur"
		transition:fly={{ y: 80, duration: reducedMotion() ? 0 : 240 }}
	>
		<div class="wrap flex h-[72px] items-center gap-4">
			<enhanced:img
				src={productImage(p.images[0])}
				alt=""
				sizes="48px"
				class="hidden h-12 w-12 object-cover sm:block"
			/>
			<div class="min-w-0 flex-1">
				<p class="truncate text-sm font-medium">{p.name}</p>
				<p class="text-xs text-graphite">{colorName}</p>
			</div>
			<Price price={p.price} old={p.oldPrice} />
			<Button disabled={out} onclick={add}
				>{#if added}<Check size={17} /> Додано{:else}У кошик{/if}</Button
			>
		</div>
	</div>
{/if}

<Overlay bind:open={oneClick} labelledby="oc-title" closeLabel="Закрити">
	<form class="p-6 sm:p-8" novalidate onsubmit={sendOneClick}>
		<h2 id="oc-title" class="pr-10 text-xl font-semibold tracking-tight">Купити в 1 клік</h2>
		{#if ocStatus === 'done'}
			<p class="mt-4 text-ok" role="status">
				Дякуємо! Аудіо-експерт передзвонить протягом 10 хвилин, щоб підтвердити замовлення.
			</p>
			<p class="mono mt-3 text-xs text-graphite">Це демо: номер нікуди не надсилається.</p>
		{:else}
			<p class="mt-2 text-sm text-graphite">
				{p.name}, {colorName.toLowerCase()} · {qty} шт. Залиште номер — ми передзвонимо й оформимо замовлення
				за вас.
			</p>
			<div class="mt-5"><PhoneInput id="oc-phone" bind:value={ocPhone} error={ocError} /></div>
			<Button type="submit" full size="lg" class="mt-5" loading={ocStatus === 'sending'}
				>Чекаю дзвінка</Button
			>
			<p class="mono mt-3 text-center text-xs text-graphite">Демо-магазин: дані не надсилаються.</p>
		{/if}
	</form>
</Overlay>

<style>
	.swatch {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border-radius: 999px;
		box-shadow: inset 0 0 0 1px var(--color-line);
		transition: box-shadow 0.15s;
	}
	.swatch:hover {
		box-shadow: inset 0 0 0 1px var(--color-ink);
	}
	.swatch:has(input:checked) {
		box-shadow: inset 0 0 0 2px var(--color-blue);
	}
	.swatch:has(input:focus-visible) {
		outline: 2px solid var(--color-blue);
		outline-offset: 2px;
	}
	.swatch-dot {
		width: 28px;
		height: 28px;
		border-radius: 999px;
		box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.15);
	}
</style>
