<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import {
		Box,
		CreditCard,
		Info,
		Truck,
		User,
		Wallet,
		CalendarClock,
		Package
	} from '@lucide/svelte';
	import { ApiError, createOrder, npBranches, npCitiesSearch } from '#lib/api/client.ts';
	import { expiryValid, formatCardNumber, formatExpiry, luhn } from '#lib/card.ts';
	import { cartView } from '#lib/catalog/cart.ts';
	import type { Summary } from '#lib/catalog/query.ts';
	import { formatPrice, goods } from '#lib/catalog/format.ts';
	import { isValidPhone } from '#lib/phone.ts';
	import { productImage } from '#lib/images.ts';
	import { announce, cart } from '#lib/stores/shop.svelte.ts';
	import Seo from '#lib/seo/Seo.svelte';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Combobox, { type ComboOption } from '#lib/components/ui/Combobox.svelte';
	import PhoneInput from '#lib/components/ui/PhoneInput.svelte';
	import Select from '#lib/components/ui/Select.svelte';
	import FreeShipping from '#lib/components/shop/FreeShipping.svelte';

	const view = $derived(cartView(cart.lines, page.data.catalog as Summary[], cart.promo));

	type Method = 'warehouse' | 'postomat' | 'courier';
	type Pay = 'card' | 'cod' | 'parts';
	let f = $state({
		name: '',
		surname: '',
		phone: '',
		email: '',
		method: 'warehouse' as Method,
		city: null as ComboOption | null,
		point: null as ComboOption | null,
		street: '',
		house: '',
		flat: '',
		pay: 'card' as Pay,
		card: '',
		exp: '',
		cvv: '',
		parts: '4',
		comment: ''
	});
	let submitted = $state(false);
	let touched = $state<Record<string, boolean>>({});
	let sending = $state(false);
	let serverError = $state('');

	const NAME = /^[\p{L}][\p{L}\s'’ʼ-]*$/u;
	const errors = $derived.by(() => {
		const e: Record<string, string> = {};
		if (f.name.trim().length < 2) e.name = 'Вкажіть ім’я';
		else if (!NAME.test(f.name.trim())) e.name = 'Лише літери';
		if (f.surname.trim().length < 2)
			e.surname = 'Вкажіть прізвище — як у документі для Нової Пошти';
		if (!isValidPhone(f.phone))
			e.phone = f.phone
				? 'Номер неповний: +380 (XX) XXX-XX-XX'
				: 'Вкажіть телефон — на нього прийде ТТН';
		if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))
			e.email = 'Перевірте адресу email';
		if (!f.city) e.city = 'Оберіть місто зі списку';
		if (f.method !== 'courier' && !f.point)
			e.point = f.method === 'postomat' ? 'Оберіть поштомат' : 'Оберіть відділення';
		if (f.method === 'courier') {
			if (f.street.trim().length < 3) e.street = 'Вкажіть вулицю';
			if (!f.house.trim()) e.house = 'Вкажіть будинок';
		}
		if (f.pay === 'card') {
			if (!luhn(f.card))
				e.card = f.card
					? 'Некоректний номер (для демо: 4242 4242 4242 4242)'
					: 'Вкажіть номер картки';
			if (!expiryValid(f.exp)) e.exp = f.exp ? 'Строк минув або невірний' : 'ММ/РР';
			if (!/^\d{3}$/.test(f.cvv)) e.cvv = '3 цифри';
		}
		return e;
	});
	const err = (k: string) => ((submitted || touched[k]) && errors[k]) || '';
	const blur = (k: string) => () => (touched[k] = true);

	const order = [
		'name',
		'surname',
		'phone',
		'email',
		'city',
		'point',
		'street',
		'house',
		'card',
		'exp',
		'cvv'
	];

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		submitted = true;
		serverError = '';
		const first = order.find((k) => errors[k]);
		if (first) {
			document.getElementById(`co-${first}`)?.focus();
			announce('Перевірте виділені поля');
			return;
		}
		sending = true;
		try {
			const o = await createOrder({
				lines: view.rows.map((r) => ({
					slug: r.slug,
					name: r.product.name,
					color: r.colorName,
					qty: r.qty,
					price: r.product.price,
					image: r.product.image
				})),
				subtotal: view.subtotal,
				discount: view.discount,
				shipping: 0,
				total: view.total,
				contact: {
					name: `${f.name.trim()} ${f.surname.trim()}`,
					phone: f.phone,
					email: f.email.trim()
				},
				delivery: {
					method: {
						warehouse: 'Відділення Нової Пошти',
						postomat: 'Поштомат Нової Пошти',
						courier: 'Кур’єр Нової Пошти'
					}[f.method],
					city: f.city!.label,
					point:
						f.method === 'courier'
							? `${f.street.trim()}, ${f.house.trim()}${f.flat.trim() ? `, кв. ${f.flat.trim()}` : ''}`
							: `${f.point!.label}, ${f.point!.hint}`
				},
				payment: {
					card: 'Карткою онлайн (демо)',
					cod: 'При отриманні',
					parts: `Оплата частинами на ${f.parts} платежі (демо)`
				}[f.pay],
				comment: f.comment.trim()
			});
			cart.clear();
			// картку не зберігаємо навіть у пам’яті сторінки
			f.card = f.exp = f.cvv = '';
			await goto(resolve(`/order?id=${encodeURIComponent(o.id)}`));
		} catch (er) {
			serverError =
				er instanceof ApiError
					? `${er.message}: ${Object.values(er.fields).join(', ')}`
					: 'Не вдалося оформити замовлення. Спробуйте ще раз.';
		} finally {
			sending = false;
		}
	}

	const methods = [
		{ id: 'warehouse', label: 'Відділення', hint: 'від 70 ₴, 1–3 дні', icon: Box },
		{ id: 'postomat', label: 'Поштомат', hint: 'від 60 ₴, до 30 кг', icon: Package },
		{ id: 'courier', label: 'Кур’єр', hint: 'від 110 ₴, до дверей', icon: Truck }
	] as const;
	const pays = [
		{ id: 'card', label: 'Карткою онлайн', hint: 'Visa, Mastercard — демо', icon: CreditCard },
		{ id: 'cod', label: 'При отриманні', hint: 'Комісія НП 20 ₴ + 2%', icon: Wallet },
		{ id: 'parts', label: 'Оплата частинами', hint: 'Без переплат — демо', icon: CalendarClock }
	] as const;
</script>

<Seo
	title="Оформлення замовлення | Хвиля"
	description="Оформлення замовлення в магазині «Хвиля»."
	path="/checkout"
	noindex
/>

<div class="wrap pt-6">
	<Breadcrumbs
		items={[
			{ href: '/', label: 'Головна' },
			{ href: '/cart', label: 'Кошик' },
			{ label: 'Оформлення' }
		]}
	/>
	<h1 class="h-display mt-6 border-b border-line pb-8 text-[clamp(2rem,4.4vw,3.5rem)]">
		Оформлення замовлення
	</h1>

	{#if cart.ready && !view.rows.length}
		<div class="mt-10 border border-dashed border-line-2 px-6 py-16 text-center">
			<p class="text-lg font-medium">Кошик порожній — немає що оформлювати</p>
			<a href={resolve('/')} class="btn btn-primary btn-md mt-6">До покупок</a>
		</div>
	{:else}
		<form
			class="mt-8 grid items-start gap-10 lg:grid-cols-[1fr_400px]"
			novalidate
			onsubmit={submit}
		>
			<div class="grid gap-12">
				<fieldset class="grid gap-4 sm:grid-cols-2">
					<legend class="mb-4 flex items-center gap-2 text-lg font-semibold"
						><User size={19} class="text-blue" /> 1. Контакти</legend
					>
					{#each [['name', 'Ім’я', 'given-name'], ['surname', 'Прізвище', 'family-name']] as const as [k, label, ac] (k)}
						<div>
							<label for="co-{k}" class="field-label">{label}</label>
							<input
								id="co-{k}"
								class={['field', !errors[k] && f[k] && 'is-valid']}
								autocomplete={ac}
								bind:value={f[k]}
								onblur={blur(k)}
								aria-invalid={!!err(k)}
								aria-describedby={err(k) ? `co-${k}-e` : undefined}
							/>
							{#if err(k)}<p id="co-{k}-e" class="field-error">{err(k)}</p>{/if}
						</div>
					{/each}
					<div onfocusout={blur('phone')}>
						<PhoneInput id="co-phone" bind:value={f.phone} error={err('phone')} />
					</div>
					<div>
						<label for="co-email" class="field-label"
							>Email <span class="font-normal text-graphite">(для чека, необов’язково)</span></label
						>
						<input
							id="co-email"
							type="email"
							inputmode="email"
							autocomplete="email"
							class="field"
							bind:value={f.email}
							onblur={blur('email')}
							aria-invalid={!!err('email')}
							aria-describedby={err('email') ? 'co-email-e' : undefined}
						/>
						{#if err('email')}<p id="co-email-e" class="field-error">{err('email')}</p>{/if}
					</div>
				</fieldset>

				<fieldset>
					<legend class="mb-4 flex items-center gap-2 text-lg font-semibold"
						><Truck size={19} class="text-blue" /> 2. Доставка Новою Поштою</legend
					>
					<div class="grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Спосіб доставки">
						{#each methods as m (m.id)}
							<label class="opt-card">
								<input
									type="radio"
									class="sr-only"
									name="method"
									value={m.id}
									bind:group={f.method}
									onchange={() => (f.point = null)}
								/>
								<m.icon size={18} />
								<span class="font-medium">{m.label}</span>
								<span class="text-xs text-graphite">{m.hint}</span>
							</label>
						{/each}
					</div>
					<div class="mt-5 grid gap-4">
						<Combobox
							id="co-city"
							label="Місто"
							placeholder="Почніть вводити: Київ, Львів…"
							bind:value={f.city}
							load={async (q) =>
								(await npCitiesSearch(q)).map((c) => ({ id: c.id, label: c.name, hint: c.region }))}
							onselect={() => (f.point = null)}
							error={err('city')}
							empty="Такого міста немає в демо-довіднику"
						/>
						{#if f.method === 'courier'}
							<div class="grid gap-4 sm:grid-cols-[1fr_120px_120px]">
								{#each [['street', 'Вулиця', 'address-line1'], ['house', 'Будинок', 'off'], ['flat', 'Квартира', 'off']] as const as [k, label, ac] (k)}
									<div>
										<label for="co-{k}" class="field-label">{label}</label>
										<input
											id="co-{k}"
											class="field"
											autocomplete={ac}
											bind:value={f[k]}
											onblur={blur(k)}
											aria-invalid={!!err(k)}
											aria-describedby={err(k) ? `co-${k}-e` : undefined}
										/>
										{#if err(k)}<p id="co-{k}-e" class="field-error">{err(k)}</p>{/if}
									</div>
								{/each}
							</div>
						{:else}
							{#key `${f.city?.id}-${f.method}`}
								<Combobox
									id="co-point"
									label={f.method === 'postomat' ? 'Поштомат' : 'Відділення'}
									placeholder={f.city ? 'Номер або вулиця' : 'Спершу оберіть місто'}
									disabled={!f.city}
									bind:value={f.point}
									load={async (q) =>
										(
											await npBranches(
												f.city?.id ?? '',
												f.method === 'postomat' ? 'postomat' : 'warehouse',
												q
											)
										).map((p) => ({
											id: p.id,
											label: `${f.method === 'postomat' ? 'Поштомат' : 'Відділення'} №${p.number}`,
											hint: p.address
										}))}
									error={err('point')}
									empty={f.method === 'postomat'
										? 'У цьому місті немає поштоматів у демо-довіднику'
										: 'Нічого не знайдено'}
								/>
							{/key}
						{/if}
					</div>
				</fieldset>

				<fieldset>
					<legend class="mb-4 flex items-center gap-2 text-lg font-semibold"
						><CreditCard size={19} class="text-blue" /> 3. Оплата</legend
					>
					<p class="mb-4 flex gap-2 bg-signal/60 px-3 py-2.5 text-sm">
						<Info size={17} class="mt-0.5 shrink-0" /> Це демо-магазин: оплата не списується, дані картки
						нікуди не надсилаються і не зберігаються. Не вводьте справжню картку — спробуйте 4242 4242
						4242 4242.
					</p>
					<div class="grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Спосіб оплати">
						{#each pays as m (m.id)}
							<label class="opt-card">
								<input type="radio" class="sr-only" name="pay" value={m.id} bind:group={f.pay} />
								<m.icon size={18} />
								<span class="font-medium">{m.label}</span>
								<span class="text-xs text-graphite">{m.hint}</span>
							</label>
						{/each}
					</div>
					{#if f.pay === 'card'}
						<div class="reveal mt-5 grid gap-4 bg-paper p-4 sm:grid-cols-[1fr_110px_90px]">
							<div>
								<label for="co-card" class="field-label">Номер картки</label>
								<input
									id="co-card"
									class="field mono"
									inputmode="numeric"
									autocomplete="off"
									placeholder="0000 0000 0000 0000"
									value={f.card}
									oninput={(e) =>
										(f.card = e.currentTarget.value = formatCardNumber(e.currentTarget.value))}
									onblur={blur('card')}
									aria-invalid={!!err('card')}
									aria-describedby={err('card') ? 'co-card-e' : undefined}
								/>
								{#if err('card')}<p id="co-card-e" class="field-error">{err('card')}</p>{/if}
							</div>
							<div>
								<label for="co-exp" class="field-label">Строк</label>
								<input
									id="co-exp"
									class="field mono"
									inputmode="numeric"
									autocomplete="off"
									placeholder="ММ/РР"
									value={f.exp}
									oninput={(e) =>
										(f.exp = e.currentTarget.value = formatExpiry(e.currentTarget.value))}
									onblur={blur('exp')}
									aria-invalid={!!err('exp')}
									aria-describedby={err('exp') ? 'co-exp-e' : undefined}
								/>
								{#if err('exp')}<p id="co-exp-e" class="field-error">{err('exp')}</p>{/if}
							</div>
							<div>
								<label for="co-cvv" class="field-label">CVV</label>
								<input
									id="co-cvv"
									type="password"
									class="field mono"
									inputmode="numeric"
									autocomplete="off"
									maxlength="3"
									value={f.cvv}
									oninput={(e) =>
										(f.cvv = e.currentTarget.value =
											e.currentTarget.value.replace(/\D/g, '').slice(0, 3))}
									onblur={blur('cvv')}
									aria-invalid={!!err('cvv')}
									aria-describedby={err('cvv') ? 'co-cvv-e' : undefined}
								/>
								{#if err('cvv')}<p id="co-cvv-e" class="field-error">{err('cvv')}</p>{/if}
							</div>
						</div>
					{:else if f.pay === 'parts'}
						<div class="reveal mt-5 max-w-xs">
							<Select
								id="co-parts"
								label="Кількість платежів"
								bind:value={f.parts}
								options={['3', '4', '6', '10'].map((n) => ({
									value: n,
									label: `${n} платежі${n === '6' || n === '10' ? 'в' : ''} по ${formatPrice(Math.ceil(view.total / Number(n)))}`
								}))}
							/>
						</div>
					{/if}
				</fieldset>

				<div>
					<label for="co-comment" class="field-label">Коментар до замовлення</label>
					<textarea
						id="co-comment"
						class="field"
						placeholder="Наприклад: зателефонуйте за годину до доставки"
						bind:value={f.comment}></textarea>
				</div>
			</div>

			<aside
				class="grid gap-5 bg-white p-6 ring-1 ring-line lg:sticky lg:top-[150px]"
				aria-labelledby="co-sum"
			>
				<h2 id="co-sum" class="text-lg font-semibold">
					Ваше замовлення <span class="mono text-sm font-normal text-graphite"
						>· {goods(view.count)}</span
					>
				</h2>
				<ul class="grid max-h-64 gap-3 overflow-y-auto">
					{#each view.rows as r (r.key)}
						<li class="flex items-center gap-3 text-sm">
							<enhanced:img
								src={productImage(r.product.image)}
								alt=""
								sizes="48px"
								class="h-12 w-12 shrink-0 bg-paper object-cover"
							/>
							<span class="min-w-0 flex-1"
								><span class="block truncate">{r.product.name}</span><span
									class="text-xs text-graphite">{r.colorName} · {r.qty} шт.</span
								></span
							>
							<span class="mono">{formatPrice(r.sum)}</span>
						</li>
					{/each}
				</ul>
				<FreeShipping total={view.total} />
				<dl class="grid gap-2 text-sm">
					<div class="flex justify-between">
						<dt class="text-graphite">Товари</dt>
						<dd class="mono">{formatPrice(view.subtotal)}</dd>
					</div>
					{#if view.discount}<div class="flex justify-between text-blue">
							<dt>Знижка {cart.promo}</dt>
							<dd class="mono">−{formatPrice(view.discount)}</dd>
						</div>{/if}
					<div class="flex justify-between">
						<dt class="text-graphite">Доставка</dt>
						<dd>{view.freeShipping ? 'безкоштовно' : 'за тарифами НП'}</dd>
					</div>
					<div class="flex items-baseline justify-between border-t border-line pt-3">
						<dt class="font-medium">До сплати</dt>
						<dd class="mono text-2xl font-medium">{formatPrice(view.total)}</dd>
					</div>
				</dl>
				{#if serverError}<p class="bg-alert-soft p-3 text-sm text-alert" role="alert">
						{serverError}
					</p>{/if}
				<Button type="submit" size="lg" full loading={sending}>Підтвердити замовлення</Button>
				<p class="mono text-center text-xs text-graphite">
					Демо: замовлення не обробляється, гроші не списуються.
				</p>
			</aside>
		</form>
	{/if}
</div>

<style>
	.opt-card {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 14px;
		border-radius: var(--radius-sm);
		background: var(--color-white);
		box-shadow: inset 0 0 0 1px var(--color-line-2);
		transition: box-shadow 0.15s;
	}
	.opt-card:hover {
		box-shadow: inset 0 0 0 1px var(--color-ink);
	}
	.opt-card:has(input:checked) {
		box-shadow: inset 0 0 0 2px var(--color-blue);
		color: var(--color-ink);
	}
	.opt-card:has(input:checked) :global(svg) {
		color: var(--color-blue);
	}
	.opt-card:has(input:focus-visible) {
		outline: 2px solid var(--color-blue);
		outline-offset: 2px;
	}
</style>
