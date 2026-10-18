<script lang="ts">
	import { t } from '#lib/ui.ts';
	import { Minus, Plus } from '@lucide/svelte';

	/** Лічильник замість нативного number: кнопки −/+, введення цифр, стрілки ↑↓ */
	let {
		value = $bindable(1),
		min = 1,
		max = 10,
		label = t.qty,
		size = 'md',
		onchange
	}: {
		value?: number;
		min?: number;
		max?: number;
		label?: string;
		size?: 'sm' | 'md';
		onchange?: (v: number) => void;
	} = $props();

	const set = (v: number) => {
		const next = Math.min(max, Math.max(min, Math.round(v) || min));
		if (next !== value) {
			value = next;
			onchange?.(next);
		}
	};
	const h = $derived(size === 'sm' ? 'h-8' : 'h-11');
</script>

<div
	class="inline-flex items-stretch rounded-[var(--radius-sm)] bg-white shadow-[inset_0_0_0_1px_var(--color-line-2)] {h}"
	role="group"
	aria-label={label}
>
	<button
		type="button"
		class="stepper-btn"
		onclick={() => set(value - 1)}
		disabled={value <= min}
		aria-label={t.less}
	>
		<Minus size={14} />
	</button>
	<input
		class="mono w-9 bg-transparent text-center text-sm outline-none focus-visible:bg-blue-soft"
		inputmode="numeric"
		aria-label={label}
		{value}
		onchange={(e) => set(Number(e.currentTarget.value.replace(/\D/g, '')))}
		onkeydown={(e) => {
			if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
				e.preventDefault();
				set(value + (e.key === 'ArrowUp' ? 1 : -1));
			}
		}}
	/>
	<button
		type="button"
		class="stepper-btn"
		onclick={() => set(value + 1)}
		disabled={value >= max}
		aria-label={t.more}
	>
		<Plus size={14} />
	</button>
</div>

<style>
	.stepper-btn {
		display: grid;
		place-items: center;
		width: 36px;
		color: var(--color-ink);
		transition: background-color 0.15s;
	}
	.stepper-btn:hover:not(:disabled) {
		background: var(--color-paper);
	}
	.stepper-btn:active:not(:disabled) {
		background: var(--color-line);
	}
	.stepper-btn:disabled {
		color: var(--color-mute);
	}
</style>
