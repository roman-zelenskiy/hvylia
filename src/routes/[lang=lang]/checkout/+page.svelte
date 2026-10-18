<script lang="ts">
	import { t } from '#lib/ui.ts';
	import { goto } from '$app/navigation';
	import { lhref } from '#lib/lang.ts';
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

	const C = t.checkout;
	const NAME = /^[\p{L}][\p{L}\s'’ʼ-]*$/u;
	const errors = $derived.by(() => {
		const e: Record<string, string> = {};
		if (f.name.trim().length < 2) e.name = C.err.name;
		else if (!NAME.test(f.name.trim())) e.name = C.err.letters;
		if (f.surname.trim().length < 2) e.surname = C.err.surname;
		if (!isValidPhone(f.phone)) e.phone = f.phone ? C.err.phoneShort : C.err.phone;
		if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = C.err.email;
		if (!f.city) e.city = C.err.city;
		if (f.method !== 'courier' && !f.point)
			e.point = f.method === 'postomat' ? C.err.postomat : C.err.warehouse;
		if (f.method === 'courier') {
			if (f.street.trim().length < 3) e.street = C.err.street;
			if (!f.house.trim()) e.house = C.err.house;
		}
		if (f.pay === 'card') {
			if (!luhn(f.card)) e.card = f.card ? C.err.cardBad : C.err.card;
			if (!expiryValid(f.exp)) e.exp = f.exp ? C.err.expBad : C.err.exp;
			if (!/^\d{3}$/.test(f.cvv)) e.cvv = C.err.cvv;
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
			announce(C.err.check);
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
					method: C.methodNames[f.method],
					city: f.city!.label,
					point:
						f.method === 'courier'
							? `${f.street.trim()}, ${f.house.trim()}${f.flat.trim() ? C.flat(f.flat.trim()) : ''}`
							: `${f.point!.label}, ${f.point!.hint}`
				},
				payment: f.pay === 'parts' ? C.payNames.parts(f.parts) : C.payNames[f.pay],
				comment: f.comment.trim()
			});
			cart.clear();
			// картку не зберігаємо навіть у пам’яті сторінки
			f.card = f.exp = f.cvv = '';
			await goto(lhref(`/order?id=${encodeURIComponent(o.id)}`));
		} catch (er) {
			serverError =
				er instanceof ApiError
					? `${er.message}: ${Object.values(er.fields).join(', ')}`
					: C.err.failed;
		} finally {
			sending = false;
		}
	}

	const methods = [
		{ id: 'warehouse', ...C.methods[0], icon: Box },
		{ id: 'postomat', ...C.methods[1], icon: Package },
		{ id: 'courier', ...C.methods[2], icon: Truck }
	] as const;
	const pays = [
		{ id: 'card', ...C.pays[0], icon: CreditCard },
		{ id: 'cod', ...C.pays[1], icon: Wallet },
		{ id: 'parts', ...C.pays[2], icon: CalendarClock }
	] as const;
</script>

<Seo title={C.title} description={C.description} path="/checkout" noindex />

<div class="wrap pt-6">
	<Breadcrumbs
		items={[{ href: '/', label: t.home }, { href: '/cart', label: C.cart }, { label: C.crumb }]}
	/>
	<h1 class="h-display head-in mt-6 pb-4 text-[clamp(2.4rem,5.6vw,4.75rem)]">
		{C.h1}
	</h1>

	{#if cart.ready && !view.rows.length}
		<div class="mt-10 rounded-lg bg-white px-6 py-20 text-center">
			<p class="text-lg font-medium">{C.empty}</p>
			<a href={lhref('/')} class="btn btn-primary btn-md mt-6">{C.shop}</a>
		</div>
	{:else}
		<form
			class="mt-8 grid items-start gap-10 lg:grid-cols-[1fr_400px]"
			novalidate
			onsubmit={submit}
		>
			<div class="grid gap-3">
				<div class="rounded-lg bg-white p-6 sm:p-8">
					<fieldset class="grid gap-4 sm:grid-cols-2">
						<legend class="mb-5 flex items-center gap-2 text-xl font-semibold tracking-[-0.02em]"
							><User size={19} class="text-blue" /> {C.contacts}</legend
						>
						{#each [['name', C.first, 'given-name'], ['surname', C.last, 'family-name']] as const as [k, label, ac] (k)}
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
								>Email <span class="font-normal text-graphite">{C.emailOpt}</span></label
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
				</div>

				<div class="rounded-lg bg-white p-6 sm:p-8">
					<fieldset>
						<legend class="mb-5 flex items-center gap-2 text-xl font-semibold tracking-[-0.02em]"
							><Truck size={19} class="text-blue" /> {C.deliveryTitle}</legend
						>
						<div class="grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label={C.method}>
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
								label={C.city}
								placeholder={C.cityPh}
								bind:value={f.city}
								load={async (q) =>
									(await npCitiesSearch(q)).map((c) => ({
										id: c.id,
										label: c.name,
										hint: c.region
									}))}
								onselect={() => (f.point = null)}
								error={err('city')}
								empty={C.noCity}
							/>
							{#if f.method === 'courier'}
								<div class="grid gap-4 sm:grid-cols-[1fr_120px_120px]">
									{#each [['street', C.street, 'address-line1'], ['house', C.house, 'off'], ['flat', C.flatLabel, 'off']] as const as [k, label, ac] (k)}
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
										label={f.method === 'postomat' ? C.postomat : C.warehouse}
										placeholder={f.city ? C.pointPh : C.pickCity}
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
												label: C.point(f.method === 'postomat', p.number),
												hint: p.address
											}))}
										error={err('point')}
										empty={f.method === 'postomat' ? C.noPostomat : t.nothing}
									/>
								{/key}
							{/if}
						</div>
					</fieldset>
				</div>

				<div class="rounded-lg bg-white p-6 sm:p-8">
					<fieldset>
						<legend class="mb-5 flex items-center gap-2 text-xl font-semibold tracking-[-0.02em]"
							><CreditCard size={19} class="text-blue" /> {C.payTitle}</legend
						>
						<p class="mb-4 flex gap-2 rounded-sm bg-blue-soft px-4 py-3 text-sm">
							<Info size={17} class="mt-0.5 shrink-0" />
							{C.payDemo}
						</p>
						<div class="grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label={C.payMethod}>
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
									<label for="co-card" class="field-label">{C.cardNumber}</label>
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
									<label for="co-exp" class="field-label">{C.expiry}</label>
									<input
										id="co-exp"
										class="field mono"
										inputmode="numeric"
										autocomplete="off"
										placeholder={C.expPh}
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
									label={C.parts}
									bind:value={f.parts}
									options={['3', '4', '6', '10'].map((n) => ({
										value: n,
										label: C.partsLine(n, formatPrice(Math.ceil(view.total / Number(n))))
									}))}
								/>
							</div>
						{/if}
					</fieldset>
				</div>

				<div>
					<label for="co-comment" class="field-label">{C.comment}</label>
					<textarea id="co-comment" class="field" placeholder={C.commentPh} bind:value={f.comment}
					></textarea>
				</div>
			</div>

			<aside
				class="grid gap-5 bg-white p-6 ring-1 ring-line lg:sticky lg:top-[150px]"
				aria-labelledby="co-sum"
			>
				<h2 id="co-sum" class="text-lg font-semibold">
					{C.yourOrder}
					<span class="mono text-sm font-normal text-graphite">· {goods(view.count)}</span>
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
									class="text-xs text-graphite">{r.colorName} · {r.qty} {t.pcs}</span
								></span
							>
							<span class="mono">{formatPrice(r.sum)}</span>
						</li>
					{/each}
				</ul>
				<FreeShipping total={view.total} />
				<dl class="grid gap-2 text-sm">
					<div class="flex justify-between">
						<dt class="text-graphite">{C.goods}</dt>
						<dd class="mono">{formatPrice(view.subtotal)}</dd>
					</div>
					{#if view.discount}<div class="flex justify-between text-blue">
							<dt>{t.discount} {cart.promo}</dt>
							<dd class="mono">−{formatPrice(view.discount)}</dd>
						</div>{/if}
					<div class="flex justify-between">
						<dt class="text-graphite">{t.delivery}</dt>
						<dd>{view.freeShipping ? t.free : t.byTariff}</dd>
					</div>
					<div class="flex items-baseline justify-between border-t border-line pt-3">
						<dt class="font-medium">{t.toPay}</dt>
						<dd class="mono text-2xl font-medium">{formatPrice(view.total)}</dd>
					</div>
				</dl>
				{#if serverError}<p class="bg-alert-soft p-3 text-sm text-alert" role="alert">
						{serverError}
					</p>{/if}
				<Button type="submit" size="lg" full loading={sending}>{C.confirm}</Button>
				<p class="mono text-center text-xs text-graphite">
					{C.demo}
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
