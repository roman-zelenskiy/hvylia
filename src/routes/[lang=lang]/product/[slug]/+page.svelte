<script lang="ts">
	import { t } from '#lib/ui.ts';
	import { lhref } from '#lib/lang.ts';
	import { page } from '$app/state';
	import { Heart, Scale, ShieldCheck, Truck, Undo2, Zap, Check } from '@lucide/svelte';
	import { onMount, untrack } from 'svelte';
	import { fly } from 'svelte/transition';
	import { delay } from '#lib/api/client.ts';
	import type { Summary } from '#lib/catalog/query.ts';
	import { formatDate, formatPrice } from '#lib/catalog/format.ts';
	import { FREE_SHIPPING_FROM, RETURN_DAYS } from '#lib/data/site.ts';
	import { productCutout, productImage } from '#lib/images.ts';
	import { curve, hasCurve } from '#lib/audio/fr.ts';
	import { isValidPhone } from '#lib/phone.ts';
	import { reducedMotion } from '#lib/motion.ts';
	import { breadcrumbs, product as productLd } from '#lib/seo/schema.ts';
	import { compare, recent, wishlist } from '#lib/stores/shop.svelte.ts';
	import { addToCart, toggleCompare, toggleWishlist } from '#lib/stores/actions.ts';
	import Seo from '#lib/seo/Seo.svelte';
	import Gallery from '#lib/components/product/Gallery.svelte';
	import FRGraph from '#lib/components/audio/FRGraph.svelte';
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
		{ href: '/', label: t.home },
		{ href: `/${data.category.slug}`, label: data.category.name },
		{ href: `/${data.category.slug}/${data.sub.slug}`, label: data.sub.name },
		{ label: p.name }
	]);
	const path = $derived(`/product/${p.slug}`);
	const cut = $derived(productCutout(p.slug));
	const lcpSource = $derived((cut ?? productImage(p.images[0])).sources.avif);
	// АЧХ: цей товар + схожі моделі того ж класу для порівняння
	const frCurves = $derived(
		hasCurve(p.facets.type)
			? [
					{ id: p.slug, label: p.name, values: curve(p.facets.type, p.slug)! },
					...data.similar
						.filter((s) => hasCurve(s.type))
						.slice(0, 2)
						.map((s) => ({ id: s.slug, label: s.name, values: curve(s.type, s.slug)! }))
				]
			: []
	);
	// активна крива на графіку; інший товар — знову його власна
	let frActive = $derived(p.slug);
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
	const ocError = $derived(ocTouched && !isValidPhone(ocPhone) ? t.product.ocError : '');
	async function sendOneClick(e: SubmitEvent) {
		e.preventDefault();
		ocTouched = true;
		if (!isValidPhone(ocPhone)) return document.getElementById('oc-phone')?.focus();
		ocStatus = 'sending';
		await delay(400, 800);
		ocStatus = 'done';
	}

	const tabs = $derived([
		{ id: 'opys', label: t.product.tabs.opys },
		{ id: 'kharakterystyky', label: t.product.tabs.kharakterystyky },
		{ id: 'vidhuky', label: t.product.tabs.vidhuky, count: data.rating.count },
		{ id: 'pytannia', label: t.product.tabs.pytannia, count: data.questions.length }
	]);
</script>

<Seo
	title={t.product.title(p.name, formatPrice(p.price))}
	description={t.product.description(p.name, p.short, p.warrantyMonths)}
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
		<Gallery images={p.images} alt={p.alt} name={p.name} slug={p.slug} />

		<div>
			<a
				href={lhref('/brand/[slug]', { slug: data.brand.slug })}
				class="wave-link text-[15px] font-medium text-blue">{data.brand.name}</a
			>
			<h1 class="h-display mt-2 text-[clamp(2.2rem,4.2vw,3.6rem)]">{p.name}</h1>
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
				<span class="mono text-xs text-graphite">{t.product.code(p.id.toUpperCase())}</span>
			</div>
			<p class="mt-5 max-w-xl text-[17px] text-graphite">{p.short}</p>

			<div
				bind:this={buyBox}
				class="mt-7 rounded-lg bg-white p-6 shadow-[0_1px_0_rgb(8_9_12/0.04)] sm:p-7"
			>
				<Price price={p.price} old={p.oldPrice} size="lg" />
				<p
					class={[
						'mt-2 text-sm',
						out ? 'text-alert' : p.stock === 'low' ? 'text-[#a15c00]' : 'text-ok'
					]}
				>
					{out ? t.product.out : p.stock === 'low' ? t.product.low : t.product.in}
				</p>

				{#if p.colors.length > 1 || p.colors[0]}
					<fieldset class="mt-6">
						<legend class="text-sm"
							>{t.product.color} <span class="font-medium">{colorName}</span></legend
						>
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
						{#if added}<Check size={18} /> {t.added}{:else}{t.inCart}{/if}
					</Button>
					<button
						type="button"
						class="icon-btn !h-[52px] !w-[52px] bg-paper"
						aria-pressed={wishlist.ready && wishlist.has(p.slug)}
						aria-label={t.product.wish}
						onclick={() => toggleWishlist(p.slug, p.name)}
					>
						<Heart
							size={19}
							fill={wishlist.ready && wishlist.has(p.slug) ? 'currentColor' : 'none'}
						/>
					</button>
					<button
						type="button"
						class="icon-btn !h-[52px] !w-[52px] bg-paper"
						aria-pressed={compare.ready && compare.has(p.slug)}
						aria-label={t.product.compare}
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
					<Zap size={17} />
					{t.product.oneClick}
				</Button>
			</div>

			<ul class="mt-6 grid gap-4 text-sm">
				<li class="flex gap-3">
					<Truck size={18} class="mt-0.5 shrink-0 text-blue" /><span
						><b class="font-medium">{t.product.npTitle}</b>
						{p.price >= FREE_SHIPPING_FROM
							? t.product.freeThis
							: t.product.freeFrom(FREE_SHIPPING_FROM)}</span
					>
				</li>
				{#if p.warrantyMonths}<li class="flex gap-3">
						<ShieldCheck size={18} class="mt-0.5 shrink-0 text-blue" /><span
							><b class="font-medium">{t.product.warranty(p.warrantyMonths)}</b>
							{t.product.warrantyText}</span
						>
					</li>{/if}
				<li class="flex gap-3">
					<Undo2 size={18} class="mt-0.5 shrink-0 text-blue" /><span
						><b class="font-medium">{t.product.returns(RETURN_DAYS)}</b>
						{t.product.returnsText}
						<a href={lhref('/harantiia-ta-povernennia')} class="wave-link text-blue"
							>{t.product.terms}</a
						></span
					>
				</li>
			</ul>

			<ul class="mt-6 flex flex-wrap gap-2" aria-label={t.product.keySpecs}>
				{#each p.highlights as h (h)}<li class="rounded-full bg-white px-4 py-2 text-sm">
						{h}
					</li>{/each}
			</ul>
		</div>
	</div>

	{#if frCurves.length}
		<section class="mt-20 rounded-lg bg-white p-6 md:p-10" aria-labelledby="fr-title">
			<div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-start">
				<div>
					<h2 id="fr-title" class="h-section text-[clamp(1.8rem,3vw,2.6rem)]">
						{t.product.sounds(p.name)}
					</h2>
					<p class="mt-4 text-graphite">
						{t.product.frText}
					</p>
					{#if frCurves.length > 1}
						<div class="mt-6 flex flex-wrap gap-2" role="radiogroup" aria-label={t.homePage.model}>
							{#each frCurves as c (c.id)}
								<label class="chip">
									<input
										type="radio"
										class="sr-only"
										name="fr"
										value={c.id}
										checked={frActive === c.id}
										onchange={() => (frActive = c.id)}
									/>
									{c.label}
								</label>
							{/each}
						</div>
					{/if}
				</div>
				{#key p.slug}
					<FRGraph
						curves={frCurves}
						active={frActive}
						sweep
						height={300}
						label={t.product.frLabel(p.name)}
					/>
				{/key}
			</div>
			<p class="mt-4 text-xs text-mute">
				{t.product.frDemo}
			</p>
		</section>
	{/if}

	<section id="product-tabs" class="mt-16" aria-label={t.product.details}>
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
									<span class="eyebrow mr-2 text-blue">{t.brand}</span>{q.a}
								</p>
							</li>
						{:else}
							<li class="text-graphite">
								{t.product.noQuestions}
							</li>
						{/each}
					</ul>
				{/if}
			{/snippet}
		</Tabs>
	</section>

	{#each [{ title: t.product.blocks.together, items: data.together }, { title: t.product.blocks.similar, items: data.similar }, { title: t.product.blocks.recent, items: recentItems }] as block (block.title)}
		{#if block.items.length}
			<section class="mt-20" aria-labelledby="blk-{block.title}">
				<h2 id="blk-{block.title}" class="h-section text-[clamp(1.8rem,3vw,2.6rem)]">
					{block.title}
				</h2>
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
		class="fixed inset-x-3 bottom-3 z-30 md:inset-x-5"
		transition:fly={{ y: 100, duration: reducedMotion() ? 0 : 320 }}
	>
		<div
			class="mx-auto flex h-[72px] max-w-[1100px] items-center gap-4 rounded-[22px] bg-white/90 pr-3 pl-3 shadow-[0_0_0_1px_rgb(8_9_12/0.05),0_24px_48px_-24px_rgb(8_9_12/0.4)] backdrop-blur-xl sm:pl-3"
		>
			<span class="stage relative hidden h-12 w-12 shrink-0 rounded-sm sm:block">
				<enhanced:img
					src={cut ?? productImage(p.images[0])}
					alt=""
					sizes="48px"
					class={cut
						? 'cutout absolute inset-[10%] h-[80%] w-[80%] object-contain'
						: 'h-full w-full rounded-sm object-cover'}
				/>
			</span>
			<div class="min-w-0 flex-1">
				<p class="truncate text-sm font-medium">{p.name}</p>
				<p class="text-xs text-graphite">{colorName}</p>
			</div>
			<Price price={p.price} old={p.oldPrice} />
			<Button disabled={out} onclick={add}
				>{#if added}<Check size={17} /> {t.added}{:else}{t.inCart}{/if}</Button
			>
		</div>
	</div>
{/if}

<Overlay bind:open={oneClick} labelledby="oc-title" closeLabel={t.close}>
	<form class="p-6 sm:p-8" novalidate onsubmit={sendOneClick}>
		<h2 id="oc-title" class="pr-10 text-xl font-semibold tracking-tight">{t.product.oneClick}</h2>
		{#if ocStatus === 'done'}
			<p class="mt-4 text-ok" role="status">
				{t.product.ocDone}
			</p>
			<p class="mono mt-3 text-xs text-graphite">{t.product.ocDemo}</p>
		{:else}
			<p class="mt-2 text-sm text-graphite">
				{t.product.ocText(p.name, colorName, qty)}
			</p>
			<div class="mt-5"><PhoneInput id="oc-phone" bind:value={ocPhone} error={ocError} /></div>
			<Button type="submit" full size="lg" class="mt-5" loading={ocStatus === 'sending'}
				>{t.waitCall}</Button
			>
			<p class="mono mt-3 text-center text-xs text-graphite">{t.product.ocDemoShort}</p>
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
