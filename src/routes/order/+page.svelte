<script lang="ts">
	import { resolve } from '$app/paths';
	import { browser } from '$app/env';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { CircleCheck, Info } from '@lucide/svelte';
	import { getOrder } from '#lib/api/client.ts';
	import { formatPrice } from '#lib/catalog/format.ts';
	import { productImage } from '#lib/images.ts';
	import Seo from '#lib/seo/Seo.svelte';

	// номер замовлення — у query (?id=HV-…): сторінка пререндерена, тож працює на статичному хостингу
	let ready = $state(false);
	onMount(() => (ready = true));
	const id = $derived(ready && browser ? (page.url.searchParams.get('id') ?? '') : '');
	const order = $derived(id ? getOrder(id) : null);
</script>

<Seo
	title="Замовлення {id} | Хвиля"
	description="Підтвердження замовлення в магазині «Хвиля»."
	path="/order"
	noindex
/>

<div class="wrap max-w-3xl pt-12">
	{#if !ready}
		<div class="skeleton h-40" aria-hidden="true"></div>
	{:else if order}
		<CircleCheck size={44} strokeWidth={1.4} class="text-ok" />
		<h1 class="h-display mt-5 text-[clamp(2rem,4.4vw,3rem)]">Дякуємо, замовлення прийнято</h1>
		<p class="mt-3 text-graphite">
			Номер замовлення <span class="mono font-medium text-ink">{order.id}</span>. Ми надішлемо ТТН у
			SMS на {order.contact.phone}.
		</p>
		<p class="mt-6 flex gap-2 bg-signal/60 px-4 py-3 text-sm">
			<Info size={17} class="mt-0.5 shrink-0" /> Це демо-замовлення: воно не обробляється, гроші не списано,
			товари не будуть відправлені.
		</p>

		<section class="mt-10 bg-white p-6 ring-1 ring-line" aria-labelledby="ord-items">
			<h2 id="ord-items" class="text-lg font-semibold">Склад замовлення</h2>
			<ul class="mt-4 divide-y divide-line">
				{#each order.lines as l (l.slug + l.color)}
					<li class="flex items-center gap-4 py-3">
						<enhanced:img
							src={productImage(l.image)}
							alt=""
							sizes="56px"
							class="h-14 w-14 bg-paper object-cover"
						/>
						<span class="min-w-0 flex-1"
							><span class="block">{l.name}</span><span class="text-sm text-graphite"
								>{l.color} · {l.qty} шт.</span
							></span
						>
						<span class="mono">{formatPrice(l.price * l.qty)}</span>
					</li>
				{/each}
			</ul>
			<dl class="mt-4 grid gap-2 border-t border-line pt-4 text-sm">
				{#if order.discount}<div class="flex justify-between text-blue">
						<dt>Знижка</dt>
						<dd class="mono">−{formatPrice(order.discount)}</dd>
					</div>{/if}
				<div class="flex justify-between text-base font-medium">
					<dt>Разом</dt>
					<dd class="mono">{formatPrice(order.total)}</dd>
				</div>
			</dl>
		</section>

		<dl class="mt-6 grid gap-4 text-sm sm:grid-cols-2">
			<div class="bg-white p-5 ring-1 ring-line">
				<dt class="eyebrow">Отримувач</dt>
				<dd class="mt-2">{order.contact.name}<br />{order.contact.phone}</dd>
			</div>
			<div class="bg-white p-5 ring-1 ring-line">
				<dt class="eyebrow">Доставка</dt>
				<dd class="mt-2">
					{order.delivery.method}<br />{order.delivery.city}, {order.delivery.point}
				</dd>
			</div>
			<div class="bg-white p-5 ring-1 ring-line sm:col-span-2">
				<dt class="eyebrow">Оплата</dt>
				<dd class="mt-2">{order.payment}</dd>
			</div>
		</dl>
		<a href={resolve('/')} class="btn btn-primary btn-lg mt-10">Повернутися до покупок</a>
	{:else}
		<h1 class="h-display text-[clamp(2rem,4.4vw,3rem)]">Замовлення не знайдено</h1>
		<p class="mt-3 text-graphite">
			Демо-замовлення зберігаються лише в цьому браузері. Можливо, ви відкрили посилання на іншому
			пристрої.
		</p>
		<a href={resolve('/')} class="btn btn-primary btn-md mt-8">На головну</a>
	{/if}
</div>
