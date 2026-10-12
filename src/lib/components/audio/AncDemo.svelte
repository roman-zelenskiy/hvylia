<script lang="ts">
	import { Spring } from 'svelte/motion';
	import { reducedMotion } from '#lib/motion.ts';

	/**
	 * «Увімкніть шумозаглушення»: гул салону літака — щільна хвиля; з ANC вона стискається
	 * до тихого залишку. Анімуються лише transform (scaleY пружиною, дрейф хвилі — translateX).
	 */
	let on = $state(false);
	const amp = new Spring(1, { stiffness: 0.06, damping: 0.42 });
	$effect(() => {
		amp.set(on ? 0.1 : 1, { instant: reducedMotion() });
	});

	const W = 1200;
	const H = 220;
	// детермінований «шум»: сума синусоїд з різними частотами — період рівно W/2, щоб дрейф був безшовним
	const noisy = (() => {
		let d = '';
		for (let x = 0; x <= W * 2; x += 4) {
			const t = (x / (W / 2)) * Math.PI * 2;
			const y =
				Math.sin(t * 3) * 0.42 +
				Math.sin(t * 7 + 1.3) * 0.26 +
				Math.sin(t * 13 + 0.4) * 0.17 +
				Math.sin(t * 29 + 2.1) * 0.1 +
				Math.sin(t * 53) * 0.05;
			d += `${x ? 'L' : 'M'}${x} ${(H / 2 - y * (H / 2.3)).toFixed(1)}`;
		}
		return d;
	})();
	const db = $derived(Math.round(36 + (78 - 36) * Math.max(0, (amp.current - 0.1) / 0.9)));
</script>

<div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-center">
	<div>
		<button
			type="button"
			role="switch"
			aria-checked={on}
			aria-label="Активне шумозаглушення (ANC)"
			class="switch"
			onclick={() => (on = !on)}
		>
			<span class="knob" aria-hidden="true"></span>
			<span class="whitespace-nowrap">ANC {on ? 'увімкнено' : 'вимкнено'}</span>
		</button>
		<p class="mt-8 text-white/60">Рівень шуму в салоні літака</p>
		<p
			class="mono mt-1 text-[clamp(3rem,7vw,5.5rem)] leading-none font-medium tracking-tight text-white"
			aria-live="polite"
		>
			{db}<span class="text-[0.4em] text-white/50"> дБ</span>
		</p>
		<p class="mt-3 max-w-sm text-white/60">
			{on
				? 'Двигуни й вентиляція зникають — лишається тиха музика.'
				: 'Гул двигунів, вентиляція, розмови поруч. Увімкніть ANC.'}
		</p>
	</div>
	<div class="wave-wrap relative overflow-hidden" aria-hidden="true">
		<svg viewBox="0 0 {W} {H}" class="block h-auto w-full" preserveAspectRatio="none">
			<line
				x1="0"
				x2={W}
				y1={H / 2}
				y2={H / 2}
				stroke="rgb(255 255 255 / .12)"
				stroke-dasharray="4 8"
			/>
			<g style:transform="scaleY({amp.current})" style:transform-origin="0 {H / 2}px">
				<g class="drift">
					<path d={noisy} fill="none" stroke="#7f8cff" stroke-width="2.5" stroke-linejoin="round" />
				</g>
			</g>
		</svg>
	</div>
</div>

<style>
	.switch {
		display: inline-flex;
		align-items: center;
		gap: 14px;
		height: 52px;
		padding: 0 22px 0 8px;
		border-radius: 999px;
		background: rgb(255 255 255 / 0.08);
		color: #fff;
		font-weight: 500;
		transition: background-color 0.2s;
	}
	.switch:hover {
		background: rgb(255 255 255 / 0.14);
	}
	.knob {
		position: relative;
		width: 52px;
		height: 36px;
		border-radius: 999px;
		background: rgb(255 255 255 / 0.18);
		transition: background-color 0.3s;
	}
	.knob::after {
		content: '';
		position: absolute;
		top: 4px;
		left: 4px;
		width: 28px;
		height: 28px;
		border-radius: 999px;
		background: #fff;
		transition: transform 0.35s var(--ease-out-soft);
	}
	.switch[aria-checked='true'] .knob {
		background: var(--color-blue);
	}
	.switch[aria-checked='true'] .knob::after {
		transform: translateX(16px);
	}
	.switch:focus-visible {
		outline: 2px solid #9aa5ff;
		outline-offset: 3px;
	}
	.drift {
		animation: drift 6s linear infinite;
	}
	@keyframes drift {
		to {
			transform: translateX(-600px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.drift {
			animation: none;
		}
	}
</style>
