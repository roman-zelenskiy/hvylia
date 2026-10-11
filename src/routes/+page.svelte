<script lang="ts">
	import { resolve } from '$app/paths';
	import {
		ArrowRight,
		Headphones,
		MessageCircle,
		Phone,
		ShieldCheck,
		Truck,
		Undo2
	} from '@lucide/svelte';
	import { delay } from '#lib/api/client.ts';
	import { formatDate, goods } from '#lib/catalog/format.ts';
	import { shop } from '#lib/data/site.ts';
	import { productImage } from '#lib/images.ts';
	import { isValidPhone } from '#lib/phone.ts';
	import { organization, website } from '#lib/seo/schema.ts';
	import Seo from '#lib/seo/Seo.svelte';
	import WaveRing from '#lib/components/home/WaveRing.svelte';
	import ProductCard from '#lib/components/shop/ProductCard.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Overlay from '#lib/components/ui/Overlay.svelte';
	import PhoneInput from '#lib/components/ui/PhoneInput.svelte';
	import Price from '#lib/components/ui/Price.svelte';
	import Rating from '#lib/components/ui/Rating.svelte';
	import Tabs from '#lib/components/ui/Tabs.svelte';

	let { data } = $props();
	const hero = $derived(data.hero);
	let set = $state('travel');

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

	const perks = [
		{
			icon: ShieldCheck,
			title: 'Гарантія до 3 років',
			text: 'Офіційна гарантія виробника на всю техніку'
		},
		{
			icon: Undo2,
			title: '30 днів на повернення',
			text: 'Не підійшло — повернемо гроші без пояснень'
		},
		{
			icon: Truck,
			title: 'Безкоштовна доставка',
			text: 'Новою Поштою від 3000 ₴, відправка в день замовлення'
		},
		{ icon: Headphones, title: 'Аудіо-експерт', text: 'Підберемо техніку під ваш телефон і музику' }
	];
</script>

<Seo
	title="Хвиля — купити навушники, колонки, програвачі вінілу в Україні"
	description="Магазин аудіотехніки «Хвиля»: бездротові навушники з шумозаглушенням, портативні колонки, полична акустика і вініл. Гарантія до 3 років, 30 днів на повернення."
	path="/"
	jsonld={[organization(), website()]}
/>

<!-- ───────── Hero ───────── -->
<section class="grid-lines border-b border-line" aria-labelledby="hero-title">
	<div class="wrap grid items-center gap-10 py-12 lg:grid-cols-[1fr_minmax(0,560px)] lg:py-20">
		<div>
			<p class="eyebrow">Флагман 2026 · {hero.brandName}</p>
			<h1 id="hero-title" class="h-display mt-5 text-[clamp(2.4rem,5.6vw,4.6rem)]">
				Аудіотехніка для тих, хто <span class="text-blue">слухає уважно</span>
			</h1>
			<p class="mt-6 max-w-lg text-[16px] text-graphite">
				Бездротові навушники з шумозаглушенням, полична акустика і вініл — з офіційною гарантією до
				3 років і консультацією аудіо-експерта.
			</p>
			<div class="mt-8 border-t border-line pt-6">
				<p class="text-lg font-medium">{hero.name}</p>
				<ul class="mono mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-graphite">
					{#each hero.highlights as h (h)}<li>{h}</li>{/each}
				</ul>
				<div class="mt-5 flex flex-wrap items-center gap-4">
					<Price price={hero.price} old={hero.oldPrice} size="lg" />
					<a href={resolve('/product/[slug]', { slug: hero.slug })} class="btn btn-primary btn-lg"
						>Детальніше <ArrowRight size={17} /></a
					>
					<a
						href={resolve('/[category=category]/[sub=sub]', {
							category: 'navushnyky',
							sub: 'z-shumopodavlenniam'
						})}
						class="btn btn-ghost btn-lg">Усі з ANC</a
					>
				</div>
			</div>
		</div>
		<div class="relative mx-auto aspect-square w-full max-w-[560px]">
			<WaveRing />
			<div
				class="absolute inset-[22%] overflow-hidden rounded-full bg-white shadow-[var(--shadow-pop)]"
			>
				<enhanced:img
					src={productImage(hero.image)}
					alt={hero.alt}
					sizes="(min-width: 1024px) 310px, 56vw"
					fetchpriority="high"
					loading="eager"
					class="h-full w-full object-cover"
				/>
			</div>
			<p class="mono absolute right-0 bottom-2 text-[11px] text-graphite">4–40 000 Гц</p>
		</div>
	</div>
</section>

<!-- ───────── Категорії ───────── -->
<section class="wrap mt-16" aria-labelledby="cats-title">
	<div class="flex items-end justify-between gap-4">
		<h2 id="cats-title" class="text-2xl font-semibold tracking-tight md:text-3xl">Категорії</h2>
		<a href={resolve('/brand')} class="wave-link text-sm text-blue">Бренди →</a>
	</div>
	<ul class="mt-6 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-5">
		{#each data.cats as c, i (c.slug)}
			<li class={['bg-white', i === 0 && 'col-span-2 md:col-span-1']}>
				<a
					href={resolve('/[category=category]', { category: c.slug })}
					class="group flex h-full flex-col p-4 transition-colors hover:bg-paper"
				>
					{#if c.image}<enhanced:img
							src={productImage(c.image)}
							alt=""
							sizes="(min-width: 768px) 260px, 45vw"
							class="aspect-[4/3] w-full object-cover mix-blend-multiply"
						/>{/if}
					<span class="mt-4 flex items-center justify-between font-medium group-hover:text-blue"
						>{c.name}<ArrowRight
							size={16}
							class="transition-transform group-hover:translate-x-0.5"
						/></span
					>
					<span class="mono mt-1 text-xs text-graphite">{goods(c.count)}</span>
				</a>
			</li>
		{/each}
	</ul>
</section>

{#each [{ id: 'hits', title: 'Хіти продажів', items: data.hits }, { id: 'news', title: 'Новинки', items: data.news }] as block (block.id)}
	<section class="wrap mt-20" aria-labelledby="{block.id}-title">
		<h2 id="{block.id}-title" class="text-2xl font-semibold tracking-tight md:text-3xl">
			{block.title}
		</h2>
		<ul class="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
			{#each block.items as p (p.slug)}<li><ProductCard product={p} /></li>{/each}
		</ul>
	</section>
{/each}

<!-- ───────── Добірки ───────── -->
<section class="wrap mt-20" aria-labelledby="sets-title">
	<h2 id="sets-title" class="text-2xl font-semibold tracking-tight md:text-3xl">Добірки</h2>
	<div class="mt-4">
		<Tabs id="sets" tabs={data.sets.map((s) => ({ id: s.id, label: s.label }))} bind:active={set}>
			{#snippet panel(id)}
				<ul class="grid grid-cols-2 gap-4 lg:grid-cols-4">
					{#each data.sets.find((s) => s.id === id)?.items ?? [] as p (p.slug)}<li>
							<ProductCard product={p} />
						</li>{/each}
				</ul>
			{/snippet}
		</Tabs>
	</div>
</section>

<!-- ───────── Бренди ───────── -->
<section class="wrap mt-20" aria-labelledby="brands-title">
	<h2 id="brands-title" class="text-2xl font-semibold tracking-tight md:text-3xl">Бренди</h2>
	<ul class="mt-6 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-9">
		{#each data.brands as b (b.slug)}
			<li class="bg-white">
				<a
					href={resolve('/brand/[slug]', { slug: b.slug })}
					class="flex h-24 flex-col items-center justify-center gap-1 transition-colors hover:bg-paper hover:text-blue"
				>
					<span class="text-[17px] font-semibold tracking-tight">{b.name}</span>
					<span class="mono text-[10.5px] text-graphite">{b.country}</span>
				</a>
			</li>
		{/each}
	</ul>
</section>

<!-- ───────── Переваги ───────── -->
<section class="wrap mt-20" aria-label="Переваги магазину">
	<ul class="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
		{#each perks as p, i (p.title)}
			<li class="bg-white p-6">
				<span class="mono text-xs text-mute">0{i + 1}</span>
				<p.icon size={22} strokeWidth={1.5} class="mt-6 text-blue" />
				<p class="mt-4 font-medium">{p.title}</p>
				<p class="mt-1 text-sm text-graphite">{p.text}</p>
			</li>
		{/each}
	</ul>
</section>

<!-- ───────── Аудіо-експерт ───────── -->
<section class="wrap mt-20" aria-labelledby="expert-title">
	<div class="grid gap-8 bg-ink p-8 text-white md:grid-cols-[1fr_auto] md:items-center md:p-12">
		<div>
			<p class="eyebrow !text-white/60">Консультація безкоштовно</p>
			<h2 id="expert-title" class="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
				Не знаєте, що обрати? Спитайте аудіо-експерта
			</h2>
			<p class="mt-4 max-w-xl text-white/70">
				Наші консультанти — звукорежисери й музиканти. Підберемо навушники під ваш телефон, зберемо
				систему для вінілу, пояснимо різницю між кодеками.
			</p>
		</div>
		<div class="grid gap-2 sm:min-w-64">
			<Button size="lg" onclick={() => ((call = true), (callStatus = 'idle'))}
				><Phone size={17} /> Замовити дзвінок</Button
			>
			<a
				href={shop.telegram}
				rel="external noopener"
				target="_blank"
				class="btn btn-lg bg-white/10 text-white hover:bg-white/20"
				><MessageCircle size={17} /> Написати в Telegram</a
			>
			<p class="mono mt-1 text-center text-xs text-white/60">{shop.phone} · {shop.hours}</p>
		</div>
	</div>
</section>

<!-- ───────── Відгуки ───────── -->
<section class="wrap mt-20" aria-labelledby="rev-title">
	<h2 id="rev-title" class="text-2xl font-semibold tracking-tight md:text-3xl">
		Що кажуть покупці
	</h2>
	<ul class="mt-6 grid gap-px border border-line bg-line md:grid-cols-3">
		{#each data.reviews as r (r.id)}
			<li class="flex flex-col bg-white p-6">
				<Rating value={r.rating} showValue={false} size={13} />
				<p class="mt-4 font-medium">«{r.title}»</p>
				<p class="mt-2 text-sm text-graphite">{r.text}</p>
				<p class="mt-auto pt-5 text-xs text-graphite">
					{r.author}, {r.city} · {formatDate(r.date)} ·
					<a
						href={resolve('/product/[slug]', { slug: r.product })}
						class="wave-link text-ink hover:text-blue">{r.productName}</a
					>
				</p>
			</li>
		{/each}
	</ul>
</section>

<!-- ───────── Підписка ───────── -->
<section class="wrap mt-20" aria-labelledby="sub-title">
	<div
		class="grid gap-6 border border-line bg-white p-8 md:grid-cols-[1fr_minmax(0,440px)] md:items-center md:p-12"
	>
		<div>
			<h2 id="sub-title" class="text-2xl font-semibold tracking-tight">
				Розсилка для уважних слухачів
			</h2>
			<p class="mt-2 text-graphite">
				Огляди новинок, розбори кодеків і закриті знижки — двічі на місяць.
			</p>
		</div>
		{#if subStatus === 'done'}
			<p class="text-ok" role="status">
				Готово! Перший лист прийде у вівторок. (Це демо — адреса нікуди не надсилається.)
			</p>
		{:else}
			<form class="grid gap-1" novalidate onsubmit={subscribe}>
				<label for="sub-email" class="field-label">Email</label>
				<div class="flex gap-2">
					<input
						id="sub-email"
						type="email"
						inputmode="email"
						autocomplete="email"
						placeholder="you@example.com"
						class="field"
						bind:value={email}
						onblur={() => (subTouched = !!email)}
						aria-invalid={!!subError}
						aria-describedby={subError ? 'sub-e' : 'sub-h'}
					/>
					<Button type="submit" loading={subStatus === 'sending'}>Підписатися</Button>
				</div>
				{#if subError}<p id="sub-e" class="field-error">{subError}</p>{:else}<p
						id="sub-h"
						class="field-hint"
					>
						Демо-форма: адреса не зберігається.
					</p>{/if}
			</form>
		{/if}
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
