<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	import { reducedMotion } from '#lib/motion.ts';

	/** Іконка зі лічильником. pulses змінюється — від іконки розходяться кільця «звукової хвилі» */
	let {
		href,
		label,
		count,
		pulses = 0,
		onclick,
		children
	}: {
		href?: string;
		label: string;
		count: number;
		pulses?: number;
		onclick?: () => void;
		children: Snippet;
	} = $props();

	const aria = $derived(count ? `${label}: ${count}` : label);
</script>

{#snippet inner()}
	{@render children()}
	{#key pulses}
		{#if pulses && !reducedMotion()}
			<span class="ring" aria-hidden="true"></span>
			<span class="ring" style:animation-delay="0.12s" aria-hidden="true"></span>
			<span class="ring" style:animation-delay="0.24s" aria-hidden="true"></span>
		{/if}
	{/key}
	{#if count > 0}
		<span
			class="mono absolute -top-0.5 -right-0.5 grid h-[18px] min-w-[18px] place-items-center overflow-hidden rounded-full bg-blue px-1 text-[10.5px] leading-none text-white"
			aria-hidden="true"
		>
			{#key count}<span in:fly={{ y: 10, duration: reducedMotion() ? 0 : 220 }}>{count}</span>{/key}
		</span>
	{/if}
{/snippet}

{#if href}
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- href передається вже через resolve() -->
	<a {href} class="icon-btn !h-11 !w-11" aria-label={aria}>{@render inner()}</a>
{:else}
	<button type="button" class="icon-btn !h-11 !w-11" aria-label={aria} {onclick}
		>{@render inner()}</button
	>
{/if}

<style>
	.ring {
		position: absolute;
		inset: 8px;
		border-radius: 999px;
		border: 1px solid var(--color-blue);
		opacity: 0;
		pointer-events: none;
		animation: ring-out 0.75s var(--ease-precise) both;
	}
</style>
