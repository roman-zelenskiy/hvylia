<script lang="ts">
	import { resolve } from '$app/paths';
	import { ArrowLeft, ArrowRight, MessageCircle, Phone } from '@lucide/svelte';
	import { curve } from '#lib/audio/fr.ts';
	import { delay } from '#lib/api/client.ts';
	import { formatDate, formatPrice, goods } from '#lib/catalog/format.ts';
	import { shop } from '#lib/data/site.ts';
	import { productCutout, productImage } from '#lib/images.ts';
	import { isValidPhone } from '#lib/phone.ts';
	import { organization, website } from '#lib/seo/schema.ts';
	import Seo from '#lib/seo/Seo.svelte';
	import AncDemo from '#lib/components/audio/AncDemo.svelte';
	import FRGraph from '#lib/components/audio/FRGraph.svelte';
	import ProductCard from '#lib/components/shop/ProductCard.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Overlay from '#lib/components/ui/Overlay.svelte';
	import PhoneInput from '#lib/components/ui/PhoneInput.svelte';
	import Rating from '#lib/components/ui/Rating.svelte';

	let { data } = $props();
	const hero = $derived(data.hero);
	const heroCut = $derived(productCutout(hero.slug));

	const heroCurve = $derived([
		{ id: hero.slug, label: hero.name, values: curve('over-ear', hero.slug) ?? [] }
	]);
	const compareCurves = $derived(
		data.compare.map((c) => ({ id: c.slug, label: c.name, values: curve(c.type, c.slug) ?? [] }))
	);
	let compareActive = $state('aurel-studio-x');
	const compareItem = $derived(data.compare.find((c) => c.slug === compareActive)!);
	const character: Record<string, string> = {
		'aurel-studio-x':
			'Зібраний бас, рівна середина, повітряний верх. Звук для довгого прослуховування.',
		'aurel-air-pro': 'Більше басу й енергії — під метро, спорт і поп-музику.',
		'kobza-m1-studio': 'Майже рівна лінія: монітори для зведення, нічого не прикрашають.',
		'pulse-lab-raid-7': 'Підкреслені низи й верхи: кроки й постріли чути чіткіше.'
	};

	// стрічка хітів
	let rail = $state<HTMLUListElement>();
	const scrollRail = (dir: number) =>
		rail?.scrollBy({ left: dir * rail.clientWidth * 0.8, behavior: 'smooth' });

	// відгуки
	let review = $state(0);
	const r = $derived(data.reviews[review]);

	// консультація (демо)
	let call = $state(false);
	let phone = $state('');
	let callTouched = $state(false);
	let callStatus = $state<'idle' | 'sending' | 'done'>('idle');
	const callError = $derived(callTouched && !isValidPhone(phone) ? 'Вкажіть номер повністю' : '');
	async function sendCall(e: SubmitEvent) {
		e.preventDefault();
		callTouched = true;
		if (!isValidPhone(phone)) return document.getElementById('call-phone')?.focus();
		callStatus = 'sending';
		await delay(400, 700);
		callStatus = 'done';
	}

	// підписка (демо)
	let email = $state('');
	let subTouched = $state(false);
	let subStatus = $state<'idle' | 'sending' | 'done'>('idle');
	const subError = $derived(
		subTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
			? 'Перевірте адресу email'
			: ''
	);
	async function subscribe(e: SubmitEvent) {
		e.preventDefault();
		subTouched = true;
		if (subError || !email) return document.getElementById('sub-email')?.focus();
		subStatus = 'sending';
		await delay(300, 600);
		subStatus = 'done';
	}

	const collections = [
		{
			id: 'travel',
			title: 'Для подорожей',
			text: 'Шумозаглушення й автономність на весь переліт',
			href: resolve('/[category=category]/[sub=sub]', {
				category: 'navushnyky',
				sub: 'z-shumopodavlenniam'
			}),
			image: 'aurel-studio-x-2.jpg'
		},
		{
			id: 'home',
			title: 'Для дому',
			text: 'Полична акустика, саундбари й розумні колонки',
			href: resolve('/[category=category]/[sub=sub]', { category: 'kolonky', sub: 'dlia-domu' }),
			image: 'basalt-b2-2.jpg'
		},
		{
			id: 'vinyl',
			title: 'Перший вініл',
			text: 'Програвач, платівка й догляд — усе для старту',
			href: resolve('/[category=category]/[sub=sub]', {
				category: 'vinil',
				sub: 'dlia-pochatkivtsiv'
			}),
			image: 'ottava-primo-2.jpg'
		}
	];
</script>

<Seo
	title="Хвиля — купити навушники, колонки, програвачі вінілу в Україні"
	description="Магазин аудіотехніки «Хвиля»: бездротові навушники з шумозаглушенням, портативні колонки, полична акустика і вініл. Гарантія до 3 років, 30 днів на повернення."
	path="/"
	jsonld={[organization(), website()]}
/>

<!-- ───────── Hero: АЧХ флагмана ───────── -->
<section class="relative overflow-hidden pt-10 pb-6 md:pt-16" aria-labelledby="hero-title">
	<div class="wrap grid items-end gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
		<div class="relative z-10">
			<h1 id="hero-title" class="h-display hero-in text-[clamp(3rem,8.2vw,8.25rem)]">
				Аудіотехніка, в&nbsp;якій чути різницю
			</h1>
			<p class="hero-in mt-6 max-w-md text-[17px] text-graphite" style="--d: 120ms">
				Навушники, колонки й вініл з офіційною гарантією до 3 років. Перед покупкою — консультація
				аудіо-експерта.
			</p>
			<div class="hero-in mt-8 flex flex-wrap gap-3" style="--d: 220ms">
				<a href={resolve('/product/[slug]', { slug: hero.slug })} class="btn btn-primary btn-lg"
					>{hero.name} · <span class="mono">{formatPrice(hero.price)}</span></a
				>
				<a
					href={resolve('/[category=category]', { category: 'navushnyky' })}
					class="btn btn-secondary btn-lg">Усі навушники</a
				>
			</div>
		</div>
		<div data-vt-scope class="hero-product relative mx-auto aspect-square w-[min(100%,560px)]">
			{#if heroCut}
				<enhanced:img
					src={heroCut}
					alt={hero.alt}
					sizes="(min-width: 1024px) 560px, 90vw"
					fetchpriority="high"
					loading="eager"
					class="cutout h-full w-full object-contain"
					data-vt
				/>
			{/if}
		</div>
	</div>
	<div class="wrap relative mt-2">
		<FRGraph
			curves={heroCurve}
			active={hero.slug}
			sweep
			height={220}
			label="Частотна характеристика {hero.name}: рівний бас, підйом близько 3 кГц, плавний спад на верхах"
		/>
	</div>
</section>

<!-- ───────── Категорії ───────── -->
<section class="wrap mt-20" aria-labelledby="cats-title">
	<h2 id="cats-title" class="h-section in-view">Що шукаєте?</h2>
	<ul class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:grid-rows-2">
		{#each data.cats as c, i (c.slug)}
			{@const cut = productCutout(c.cover)}
			<li class={['in-view', i === 0 && 'lg:row-span-2']}>
				<a
					href={resolve('/[category=category]', { category: c.slug })}
					class="group stage flex h-full min-h-56 flex-col justify-between rounded-[var(--radius-lg)] p-6"
				>
					<span class="relative z-10">
						<span
							class="block text-[clamp(1.4rem,2.4vw,2rem)] leading-none font-semibold tracking-[-0.03em] group-hover:text-blue"
							>{c.name}</span
						>
						<span class="mt-2 block text-sm text-graphite">{goods(c.count)}</span>
					</span>
					{#if cut}
						<enhanced:img
							src={cut}
							alt=""
							sizes="(min-width: 1024px) 420px, 60vw"
							loading="lazy"
							class="cutout tilt self-end object-contain {i === 0
								? 'mt-6 h-64 w-full lg:h-[26rem]'
								: 'h-36 w-3/4'}"
						/>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</section>

<!-- ───────── Порівняйте звук ───────── -->
<section class="wrap mt-28" aria-labelledby="cmp-title">
	<div
		class="grid gap-10 rounded-[var(--radius-lg)] bg-white p-6 md:p-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-14"
	>
		<div class="in-view">
			<h2 id="cmp-title" class="h-section">Порівняйте, як вони звучать</h2>
			<p class="mt-4 text-graphite">
				Графік показує, які частоти модель підсилює. Наведіть курсор — побачите рівень на будь-якій
				частоті.
			</p>
			<div class="mt-8 flex flex-wrap gap-2" role="radiogroup" aria-label="Модель на графіку">
				{#each data.compare as c (c.slug)}
					<label class="chip">
						<input
							type="radio"
							class="sr-only"
							name="cmp"
							value={c.slug}
							bind:group={compareActive}
						/>
						{c.name}
					</label>
				{/each}
			</div>
			{#key compareActive}
				<p class="reveal mt-6 text-[17px]">{character[compareActive]}</p>
			{/key}
			<a
				href={resolve('/product/[slug]', { slug: compareItem.slug })}
				class="wave-link mt-6 inline-block font-medium text-blue"
				>{compareItem.name}, <span class="mono">{formatPrice(compareItem.price)}</span></a
			>
		</div>
		<div class="in-view self-center">
			<FRGraph
				curves={compareCurves}
				active={compareActive}
				height={340}
				label="Порівняння частотних характеристик чотирьох навушників"
			/>
		</div>
	</div>
</section>

<!-- ───────── Хіти ───────── -->
<section class="mt-28" aria-labelledby="hits-title">
	<div class="wrap flex items-end justify-between gap-4">
		<h2 id="hits-title" class="h-section in-view">Обирають найчастіше</h2>
		<div class="hidden gap-2 md:flex">
			<button
				type="button"
				class="icon-btn !h-12 !w-12 bg-white"
				aria-label="Прокрутити назад"
				onclick={() => scrollRail(-1)}><ArrowLeft size={18} /></button
			>
			<button
				type="button"
				class="icon-btn !h-12 !w-12 bg-white"
				aria-label="Прокрутити вперед"
				onclick={() => scrollRail(1)}><ArrowRight size={18} /></button
			>
		</div>
	</div>
	<ul
		bind:this={rail}
		class="rail no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
		aria-label="Хіти продажів"
	>
		{#each data.hits as p (p.slug)}
			<li class="w-[72vw] shrink-0 snap-start sm:w-[42vw] lg:w-[22rem]">
				<ProductCard product={p} />
			</li>
		{/each}
	</ul>
</section>

<!-- ───────── ANC ───────── -->
<section class="mt-28 px-3 md:px-5" aria-labelledby="anc-title">
	<div
		class="mx-auto max-w-[1440px] overflow-hidden rounded-[32px] bg-ink px-6 py-14 text-white md:px-14 md:py-20"
	>
		<h2 id="anc-title" class="h-section in-view max-w-3xl">Тиша — теж частина звуку</h2>
		<p class="in-view mt-4 max-w-xl text-white/60">
			Активне шумозаглушення прибирає гул транспорту, тому музику можна слухати тихіше й довше.
		</p>
		<div class="mt-12"><AncDemo /></div>
		<a
			href={resolve('/[category=category]/[sub=sub]', {
				category: 'navushnyky',
				sub: 'z-shumopodavlenniam'
			})}
			class="btn btn-lg mt-12 bg-white text-ink hover:bg-blue hover:text-white"
			>Навушники з шумозаглушенням</a
		>
	</div>
</section>

<!-- ───────── Добірки ───────── -->
<section class="wrap mt-28" aria-labelledby="sets-title">
	<h2 id="sets-title" class="h-section in-view">Готові добірки</h2>
	<ul class="mt-8 grid gap-3 md:grid-cols-3">
		{#each collections as c (c.id)}
			<li class="in-view">
				<a
					href={c.href}
					class="group relative block aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-ink"
				>
					<enhanced:img
						src={productImage(c.image)}
						alt=""
						sizes="(min-width: 768px) 30vw, 90vw"
						loading="lazy"
						class="zoom absolute inset-0 h-full w-full object-cover opacity-85"
					/>
					<span
						class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 pt-24 text-white"
					>
						<span class="block text-2xl font-semibold tracking-tight">{c.title}</span>
						<span class="mt-1 block text-white/75">{c.text}</span>
					</span>
				</a>
			</li>
		{/each}
	</ul>
</section>

<!-- ───────── Бренди ───────── -->
<section class="wrap mt-28" aria-labelledby="brands-title">
	<h2 id="brands-title" class="sr-only">Бренди</h2>
	<ul class="flex flex-wrap items-baseline gap-x-10 gap-y-4">
		{#each data.brands as b (b.slug)}
			<li>
				<a
					href={resolve('/brand/[slug]', { slug: b.slug })}
					class="brand text-[clamp(1.6rem,3.6vw,3rem)] font-semibold tracking-[-0.04em] text-mute hover:text-ink"
					>{b.name}</a
				>
			</li>
		{/each}
	</ul>
</section>

<!-- ───────── Відгуки ───────── -->
<section class="wrap mt-28" aria-labelledby="rev-title">
	<div class="grid gap-10 rounded-[var(--radius-lg)] bg-white p-6 md:p-12 lg:grid-cols-[1fr_auto]">
		<div>
			<h2 id="rev-title" class="text-graphite">Що кажуть покупці</h2>
			{#key review}
				<figure class="reveal mt-6">
					<Rating value={r.rating} showValue={false} size={15} />
					<blockquote
						class="mt-4 max-w-3xl text-[clamp(1.4rem,2.6vw,2.2rem)] leading-tight font-medium tracking-[-0.02em]"
					>
						«{r.text}»
					</blockquote>
					<figcaption class="mt-6 text-graphite">
						{r.author}, {r.city}, {formatDate(r.date)} — про
						<a
							href={resolve('/product/[slug]', { slug: r.product })}
							class="wave-link text-ink hover:text-blue">{r.productName}</a
						>
					</figcaption>
				</figure>
			{/key}
		</div>
		<div class="flex flex-col items-end justify-between gap-6">
			{#key review}
				{@const rc = productCutout(r.product)}
				{#if rc}
					<div
						class="stage reveal relative hidden aspect-square w-64 rounded-[var(--radius-md)] lg:block"
						aria-hidden="true"
					>
						<enhanced:img
							src={rc}
							alt=""
							sizes="256px"
							loading="lazy"
							class="cutout absolute inset-[14%] h-[72%] w-[72%] object-contain"
						/>
					</div>
				{/if}
			{/key}
			<div class="flex gap-2">
				<button
					type="button"
					class="icon-btn !h-12 !w-12 bg-paper"
					aria-label="Попередній відгук"
					onclick={() => (review = (review + data.reviews.length - 1) % data.reviews.length)}
					><ArrowLeft size={18} /></button
				>
				<button
					type="button"
					class="icon-btn !h-12 !w-12 bg-paper"
					aria-label="Наступний відгук"
					onclick={() => (review = (review + 1) % data.reviews.length)}
					><ArrowRight size={18} /></button
				>
			</div>
		</div>
	</div>
</section>

<!-- ───────── Експерт і розсилка ───────── -->
<section class="wrap mt-6" aria-label="Консультація і розсилка">
	<div class="grid gap-3 lg:grid-cols-[1.3fr_1fr]">
		<div class="in-view rounded-[var(--radius-lg)] bg-blue p-8 text-white md:p-12">
			<h2
				class="text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.05] font-semibold tracking-[-0.035em]"
			>
				Не знаєте, що обрати? Спитайте аудіо-експерта
			</h2>
			<p class="mt-4 max-w-lg text-white/75">
				Наші консультанти — звукорежисери й музиканти. Підберемо навушники під ваш телефон і музику.
			</p>
			<div class="mt-8 flex flex-wrap gap-2">
				<Button size="lg" variant="secondary" onclick={() => ((call = true), (callStatus = 'idle'))}
					><Phone size={17} /> Замовити дзвінок</Button
				>
				<a
					href={shop.telegram}
					rel="external noopener"
					target="_blank"
					class="btn btn-lg bg-white/15 text-white hover:bg-white/25"
					><MessageCircle size={17} /> Telegram</a
				>
			</div>
		</div>
		<div class="in-view rounded-[var(--radius-lg)] bg-white p-8 md:p-12">
			<h2 class="text-2xl font-semibold tracking-tight">Листи для уважних слухачів</h2>
			<p class="mt-2 text-graphite">Огляди новинок і розбори кодеків — двічі на місяць.</p>
			{#if subStatus === 'done'}
				<p class="mt-6 text-ok" role="status">
					Готово! Перший лист прийде у вівторок. Це демо — адреса нікуди не надсилається.
				</p>
			{:else}
				<form class="mt-6 grid gap-2" novalidate onsubmit={subscribe}>
					<label for="sub-email" class="sr-only">Email</label>
					<input
						id="sub-email"
						type="email"
						inputmode="email"
						autocomplete="email"
						placeholder="Ваш email"
						class="field !h-12"
						bind:value={email}
						onblur={() => (subTouched = !!email)}
						aria-invalid={!!subError}
						aria-describedby={subError ? 'sub-e' : 'sub-h'}
					/>
					{#if subError}<p id="sub-e" class="field-error">{subError}</p>{:else}<p
							id="sub-h"
							class="field-hint"
						>
							Демо-форма: адреса не зберігається.
						</p>{/if}
					<Button type="submit" size="lg" loading={subStatus === 'sending'}>Підписатися</Button>
				</form>
			{/if}
		</div>
	</div>
</section>

<Overlay bind:open={call} labelledby="call-title">
	<form class="p-6 sm:p-8" novalidate onsubmit={sendCall}>
		<h2 id="call-title" class="pr-10 text-xl font-semibold tracking-tight">
			Замовити дзвінок аудіо-експерта
		</h2>
		{#if callStatus === 'done'}
			<p class="mt-4 text-ok" role="status">
				Дякуємо! Експерт передзвонить протягом 15 хвилин (демо — номер нікуди не надсилається).
			</p>
		{:else}
			<p class="mt-2 text-sm text-graphite">
				Передзвонимо протягом 15 хвилин у робочий час ({shop.hours}).
			</p>
			<div class="mt-5"><PhoneInput id="call-phone" bind:value={phone} error={callError} /></div>
			<Button type="submit" full size="lg" class="mt-5" loading={callStatus === 'sending'}
				>Чекаю дзвінка</Button
			>
		{/if}
	</form>
</Overlay>

<style>
	/* єдиний «оркестрований» момент при завантаженні: заголовок, текст і кнопки, потім флагман */
	@media (prefers-reduced-motion: no-preference) {
		.hero-in {
			animation: hero-in 0.9s var(--ease-out-soft) both;
			animation-delay: var(--d, 0ms);
		}
		.hero-product {
			animation: product-in 1.2s var(--ease-out-soft) 0.15s both;
		}
	}
	@keyframes hero-in {
		/* не 0: елемент з нульовою прозорістю Chrome не рахує як LCP до кінця анімації */
		from {
			opacity: 0.01;
			transform: translateY(28px);
		}
	}
	@keyframes product-in {
		/* не 0: елемент з нульовою прозорістю Chrome не рахує як LCP до кінця анімації */
		from {
			opacity: 0.01;
			transform: translateY(40px) scale(0.92) rotate(-4deg);
		}
	}
	.tilt {
		position: relative;
		z-index: 1;
		transition: transform 0.7s var(--ease-out-soft);
	}
	.group:hover .tilt {
		transform: translateY(-8px) rotate(-3deg) scale(1.04);
	}
	.zoom {
		transition:
			transform 0.9s var(--ease-out-soft),
			opacity 0.4s;
	}
	.group:hover .zoom {
		transform: scale(1.05);
		opacity: 1;
	}
	.brand {
		transition: color 0.25s;
	}
	.rail {
		padding-inline: max(16px, calc((100vw - 1440px) / 2 + 32px));
		scroll-padding-inline: max(16px, calc((100vw - 1440px) / 2 + 32px));
	}
</style>
