<script lang="ts">
	import { formatNumber } from '#lib/catalog/format.ts';

	/**
	 * Слайдер діапазону з двома ручками (role="slider") і полями вводу.
	 * Клавіатура: ←/→ — крок, PageUp/PageDown — ×10, Home/End — межі. Зміни віддаються після відпускання.
	 */
	let {
		min,
		max,
		low,
		high,
		step = 100,
		label = 'Ціна',
		onchange
	}: {
		min: number;
		max: number;
		low: number;
		high: number;
		step?: number;
		label?: string;
		onchange: (low: number, high: number) => void;
	} = $props();

	let lo = $state(0);
	let hi = $state(0);
	$effect.pre(() => {
		lo = low;
		hi = high;
	});

	let track: HTMLDivElement;
	let dragging = $state<'lo' | 'hi' | null>(null);
	const span = $derived(Math.max(1, max - min));
	const pct = (v: number) => ((v - min) / span) * 100;
	const snap = (v: number) => Math.min(max, Math.max(min, Math.round(v / step) * step));

	function fromPointer(clientX: number) {
		const r = track.getBoundingClientRect();
		return snap(min + ((clientX - r.left) / r.width) * span);
	}
	function move(which: 'lo' | 'hi', v: number) {
		if (which === 'lo') lo = Math.min(v, hi);
		else hi = Math.max(v, lo);
	}
	const commit = () => onchange(lo, hi);

	function key(which: 'lo' | 'hi', e: KeyboardEvent) {
		const cur = which === 'lo' ? lo : hi;
		const map: Record<string, number> = {
			ArrowLeft: cur - step,
			ArrowDown: cur - step,
			ArrowRight: cur + step,
			ArrowUp: cur + step,
			PageDown: cur - step * 10,
			PageUp: cur + step * 10,
			Home: min,
			End: max
		};
		if (!(e.key in map)) return;
		e.preventDefault();
		move(which, snap(map[e.key]));
		commit();
	}
</script>

<div class="select-none">
	<div
		class="relative mx-2 h-8 touch-none"
		bind:this={track}
		onpointerdown={(e) => {
			const v = fromPointer(e.clientX);
			dragging = Math.abs(v - lo) <= Math.abs(v - hi) ? 'lo' : 'hi';
			move(dragging, v);
			(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		}}
		onpointermove={(e) => dragging && move(dragging, fromPointer(e.clientX))}
		onpointerup={() => {
			if (dragging) commit();
			dragging = null;
		}}
		role="presentation"
	>
		<div class="absolute top-1/2 right-0 left-0 h-[2px] -translate-y-1/2 bg-line"></div>
		<div
			class="absolute top-1/2 h-[2px] -translate-y-1/2 bg-blue"
			style:left="{pct(lo)}%"
			style:right="{100 - pct(hi)}%"
		></div>
		{#each [['lo', lo, 'Мінімальна'], ['hi', hi, 'Максимальна']] as const as [which, v, name] (which)}
			<span
				role="slider"
				tabindex="0"
				aria-label="{label}: {name.toLowerCase()}"
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={v}
				aria-valuetext="{formatNumber(v)} грн"
				class={['thumb', dragging === which && 'is-drag']}
				style:left="{pct(v)}%"
				onkeydown={(e) => key(which, e)}
			></span>
		{/each}
	</div>
	<div class="mt-2 grid grid-cols-2 gap-2">
		{#each [['lo', 'Від'], ['hi', 'До']] as const as [which, text] (which)}
			<label class="relative">
				<span class="sr-only">{label} {text.toLowerCase()}</span>
				<span
					class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-xs text-mute"
					aria-hidden="true">{text}</span
				>
				<input
					class="field mono !h-9 pl-9 text-sm"
					inputmode="numeric"
					value={formatNumber(which === 'lo' ? lo : hi)}
					onchange={(e) => {
						const v = snap(
							Number(e.currentTarget.value.replace(/\D/g, '')) || (which === 'lo' ? min : max)
						);
						move(which, v);
						e.currentTarget.value = formatNumber(which === 'lo' ? lo : hi);
						commit();
					}}
				/>
			</label>
		{/each}
	</div>
</div>

<style>
	.thumb {
		position: absolute;
		top: 50%;
		width: 18px;
		height: 18px;
		margin-left: -9px;
		margin-top: -9px;
		border-radius: 999px;
		background: var(--color-white);
		box-shadow:
			0 0 0 2px var(--color-blue),
			0 2px 6px rgb(11 12 14 / 0.2);
		cursor: grab;
		transition: transform 0.12s var(--ease-precise);
	}
	.thumb:hover,
	.thumb.is-drag {
		transform: scale(1.15);
	}
	.thumb.is-drag {
		cursor: grabbing;
	}
	.thumb:focus-visible {
		outline: 2px solid var(--color-blue);
		outline-offset: 3px;
	}
</style>
