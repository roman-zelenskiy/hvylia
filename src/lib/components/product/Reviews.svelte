<script lang="ts">
	import { t } from '#lib/ui.ts';
	import { BadgeCheck } from '@lucide/svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import { delay } from '#lib/api/client.ts';
	import { formatDate } from '#lib/catalog/format.ts';
	import type { Review } from '#lib/data/types.ts';
	import { reducedMotion } from '#lib/motion.ts';
	import Rating from '#lib/components/ui/Rating.svelte';
	import Button from '#lib/components/ui/Button.svelte';

	let {
		reviews,
		rating,
		productName
	}: { reviews: Review[]; rating: { value: number; count: number }; productName: string } =
		$props();

	let stars = $state(0);
	const shown = $derived(stars ? reviews.filter((r) => r.rating === stars) : reviews);
	const dist = $derived(
		[5, 4, 3, 2, 1].map((s) => ({ s, n: reviews.filter((r) => r.rating === s).length }))
	);

	// демо-форма відгуку
	let formOpen = $state(false);
	let form = $state({ name: '', rating: 0, text: '' });
	let touched = $state(false);
	let status = $state<'idle' | 'sending' | 'done'>('idle');
	const errors = $derived({
		name: form.name.trim().length < 2 ? t.reviews.errName : '',
		rating: form.rating ? '' : t.reviews.errRating,
		text: form.text.trim().length < 20 ? t.reviews.errText : ''
	});
	async function submit(e: SubmitEvent) {
		e.preventDefault();
		touched = true;
		const first = (Object.keys(errors) as (keyof typeof errors)[]).find((k) => errors[k]);
		if (first) return document.getElementById(`rv-${first}`)?.focus();
		status = 'sending';
		await delay(400, 700);
		status = 'done';
	}
</script>

<div class="grid gap-10 lg:grid-cols-[280px_1fr]">
	<div>
		<p class="mono text-5xl font-medium tracking-tight">{rating.value.toFixed(1)}</p>
		<div class="mt-2"><Rating value={rating.value} showValue={false} size={16} /></div>
		<p class="mt-1 text-sm text-graphite">{t.reviews.count(rating.count)}</p>
		<fieldset class="mt-6">
			<legend class="sr-only">{t.reviews.filter}</legend>
			<ul class="grid gap-1.5">
				{#each dist as d (d.s)}
					<li>
						<button
							type="button"
							class={[
								'flex w-full items-center gap-3 rounded-[var(--radius-xs)] px-1 py-1 text-sm hover:bg-paper',
								stars === d.s && 'bg-blue-soft'
							]}
							aria-pressed={stars === d.s}
							disabled={!d.n}
							onclick={() => (stars = stars === d.s ? 0 : d.s)}
						>
							<span class="mono w-3">{d.s}</span>
							<span class="relative h-1.5 flex-1 overflow-hidden bg-line">
								<span
									class="absolute inset-0 origin-left bg-ink"
									style:transform="scaleX({rating.count ? d.n / rating.count : 0})"
								></span>
							</span>
							<span class="mono w-5 text-right text-graphite">{d.n}</span>
						</button>
					</li>
				{/each}
			</ul>
		</fieldset>
		<Button
			variant="secondary"
			full
			class="mt-6"
			onclick={() => (formOpen = !formOpen)}
			aria-expanded={formOpen}
			aria-controls="review-form">{t.reviews.write}</Button
		>
	</div>

	<div>
		{#if formOpen}
			<form
				id="review-form"
				class="reveal mb-10 grid gap-4 bg-paper p-5"
				novalidate
				onsubmit={submit}
			>
				{#if status === 'done'}
					<p class="text-ok" role="status">
						{t.reviews.thanks(productName)}
					</p>
				{:else}
					<p class="font-medium">{t.reviews.yours(productName)}</p>
					<div>
						<label for="rv-name" class="field-label">{t.reviews.name}</label>
						<input
							id="rv-name"
							class="field"
							bind:value={form.name}
							aria-invalid={touched && !!errors.name}
							aria-describedby={touched && errors.name ? 'rv-name-e' : undefined}
						/>
						{#if touched && errors.name}<p id="rv-name-e" class="field-error">{errors.name}</p>{/if}
					</div>
					<fieldset>
						<legend class="field-label">{t.reviews.rating}</legend>
						<div class="flex gap-1" id="rv-rating" tabindex="-1">
							{#each [1, 2, 3, 4, 5] as s (s)}
								<label class="star">
									<input
										type="radio"
										class="sr-only"
										name="rv-rating"
										value={s}
										bind:group={form.rating}
									/>
									<svg width="26" height="26" viewBox="0 0 20 20" aria-hidden="true"
										><path
											d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.8z"
											fill={s <= form.rating ? 'var(--color-ink)' : 'var(--color-line-2)'}
										/></svg
									>
									<span class="sr-only">{t.reviews.of5(s)}</span>
								</label>
							{/each}
						</div>
						{#if touched && errors.rating}<p class="field-error">{errors.rating}</p>{/if}
					</fieldset>
					<div>
						<label for="rv-text" class="field-label">{t.reviews.text}</label>
						<textarea
							id="rv-text"
							class="field"
							bind:value={form.text}
							aria-invalid={touched && !!errors.text}
							aria-describedby={touched && errors.text ? 'rv-text-e' : undefined}></textarea>
						{#if touched && errors.text}<p id="rv-text-e" class="field-error">{errors.text}</p>{/if}
					</div>
					<div><Button type="submit" loading={status === 'sending'}>{t.reviews.send}</Button></div>
				{/if}
			</form>
		{/if}

		<ul class="divide-y divide-line border-y border-line" aria-live="polite">
			{#each shown as r (r.id)}
				<li
					class="py-6"
					animate:flip={{ duration: reducedMotion() ? 0 : 220 }}
					in:fade={{ duration: 160 }}
				>
					<div class="flex flex-wrap items-center gap-x-3 gap-y-1">
						<Rating value={r.rating} showValue={false} size={13} />
						<p class="font-medium">{r.title}</p>
					</div>
					<p class="mt-1 text-[13px] text-graphite">
						{r.author}, {r.city} · <time datetime={r.date}>{formatDate(r.date)}</time>
						{#if r.verified}<span class="ml-2 inline-flex items-center gap-1 text-ok"
								><BadgeCheck size={14} /> {t.reviews.verified}</span
							>{/if}
					</p>
					<p class="mt-3 max-w-2xl">{r.text}</p>
					{#if r.pros || r.cons}
						<dl class="mt-3 grid gap-1 text-sm">
							{#if r.pros}<div class="flex gap-2">
									<dt class="w-20 shrink-0 text-graphite">{t.reviews.pros}</dt>
									<dd>{r.pros}</dd>
								</div>{/if}
							{#if r.cons}<div class="flex gap-2">
									<dt class="w-20 shrink-0 text-graphite">{t.reviews.cons}</dt>
									<dd>{r.cons}</dd>
								</div>{/if}
						</dl>
					{/if}
				</li>
			{:else}
				<li class="py-8 text-graphite">{t.reviews.none}</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.star {
		border-radius: var(--radius-xs);
		transition: transform 0.15s var(--ease-precise);
	}
	.star:hover {
		transform: scale(1.12);
	}
	.star:has(input:focus-visible) {
		outline: 2px solid var(--color-blue);
		outline-offset: 2px;
	}
</style>
