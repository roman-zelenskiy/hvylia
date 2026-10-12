<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import { freqs, fmtDb, fmtHz, pathOf, xOf, yOf } from '#lib/audio/fr.ts';
	import { reducedMotion } from '#lib/motion.ts';

	/**
	 * Графік АЧХ. Кілька кривих; активна — ультрамарин, решта — приглушені.
	 * sweep: під час появи «вимірювальний свіп» 20 Гц → 20 кГц — точка біжить кривою і проявляє її.
	 * probe: курсор — вимірювальний зонд з показами частоти й рівня.
	 */
	type Curve = { id: string; label: string; values: number[] };
	let {
		curves,
		active,
		sweep = false,
		probe = true,
		tone = 'light',
		label,
		height = 360,
		axes = true
	}: {
		curves: Curve[];
		active: string;
		sweep?: boolean;
		probe?: boolean;
		tone?: 'light' | 'dark';
		label: string;
		height?: number;
		axes?: boolean;
	} = $props();

	const W = 1000;
	const H = $derived(height);
	const current = $derived(curves.find((c) => c.id === active) ?? curves[0]);

	let svg: SVGSVGElement;
	let path = $state<SVGPathElement>();
	// режим свіпу задається один раз при монтуванні
	let progress = $state(untrack(() => (sweep ? 0 : 1)));
	let dot = $state<{ x: number; y: number } | null>(null);
	let hover = $state<number | null>(null);

	onMount(() => {
		if (!sweep) return;
		if (reducedMotion()) {
			progress = 1;
			return;
		}
		let raf = 0;
		let start = 0;
		const io = new IntersectionObserver(([e]) => {
			if (!e.isIntersecting || start) return;
			start = performance.now();
			const D = 2600;
			const tick = (now: number) => {
				const t = Math.min(1, (now - start) / D);
				// ease-in-out: свіп повільно стартує і м’яко завершується
				progress = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
				if (path) {
					const len = path.getTotalLength();
					const pt = path.getPointAtLength(len * progress);
					dot = { x: pt.x, y: pt.y };
				}
				if (t < 1) raf = requestAnimationFrame(tick);
				else dot = null;
			};
			raf = requestAnimationFrame(tick);
		});
		io.observe(svg);
		return () => {
			io.disconnect();
			cancelAnimationFrame(raf);
		};
	});

	function move(e: PointerEvent) {
		if (!probe || progress < 1) return;
		const r = svg.getBoundingClientRect();
		const x = ((e.clientX - r.left) / r.width) * W;
		let best = 0;
		for (let i = 1; i < freqs.length; i++)
			if (Math.abs(xOf(freqs[i], W) - x) < Math.abs(xOf(freqs[best], W) - x)) best = i;
		hover = best;
	}

	const gridF = [50, 100, 200, 500, 1000, 2000, 5000, 10000];
	const labelsF = [20, 100, 1000, 10000, 20000];
	const hx = $derived(hover !== null ? xOf(freqs[hover], W) : 0);
	const hy = $derived(hover !== null ? yOf(current.values[hover], H) : 0);
	const sweepF = $derived(
		freqs[Math.min(freqs.length - 1, Math.round(progress * (freqs.length - 1)))]
	);
</script>

<figure class={['fr', tone === 'dark' && 'is-dark']}>
	<svg
		bind:this={svg}
		viewBox="0 0 {W} {H}"
		class="block h-auto w-full touch-pan-y overflow-visible"
		role="img"
		aria-label={label}
		onpointermove={move}
		onpointerleave={() => (hover = null)}
	>
		<defs>
			<mask id="fr-reveal-{active}">
				<!-- маска розкривається масштабом (лише transform) -->
				<rect
					x="0"
					y="-40"
					width={W}
					height={H + 80}
					fill="#fff"
					style:transform="scaleX({progress})"
					style:transform-origin="0 0"
				/>
			</mask>
			<linearGradient id="fr-fill" x1="0" x2="0" y1="0" y2="1">
				<stop offset="0" stop-color="var(--color-blue)" stop-opacity=".16" />
				<stop offset="1" stop-color="var(--color-blue)" stop-opacity="0" />
			</linearGradient>
		</defs>

		{#if axes}
			{#each gridF as f (f)}<line x1={xOf(f, W)} x2={xOf(f, W)} y1="0" y2={H} class="grid" />{/each}
			<line x1="0" x2={W} y1={yOf(0, H)} y2={yOf(0, H)} class="zero" />
		{/if}

		<g mask="url(#fr-reveal-{active})">
			{#each curves as c (c.id)}
				{#if c.id !== current.id}<path d={pathOf(c.values, W, H)} class="curve muted" />{/if}
			{/each}
			<path
				d="{pathOf(current.values, W, H)} L{W} {H} L0 {H} Z"
				fill="url(#fr-fill)"
				class="area"
			/>
			<path bind:this={path} d={pathOf(current.values, W, H)} class="curve main" />
		</g>

		{#if dot}
			<g style:transform="translate({dot.x}px, {dot.y}px)">
				<circle r="9" class="dot-halo" />
				<circle r="4.5" class="dot" />
			</g>
		{/if}
		{#if hover !== null}
			<line x1={hx} x2={hx} y1="0" y2={H} class="probe" />
			<g style:transform="translate({hx}px, {hy}px)">
				<circle r="9" class="dot-halo" />
				<circle r="4.5" class="dot" />
			</g>
		{/if}
	</svg>
	{#if axes}
		<!-- підписи в HTML, щоб не зменшувались разом із SVG на телефоні -->
		<div class="ticks" aria-hidden="true">
			{#each labelsF as f (f)}
				<span style:left="{xOf(f, 100)}%" class={[f === 20 && 'first', f === 20000 && 'last']}
					>{fmtHz(f)}</span
				>
			{/each}
		</div>
	{/if}
	<figcaption class="readout" aria-hidden="true">
		{#if hover !== null}
			<span>{fmtHz(freqs[hover])}</span><span class="val">{fmtDb(current.values[hover])}</span>
		{:else if progress < 1}
			<span>{fmtHz(sweepF)}</span><span class="val">вимірюємо</span>
		{:else}
			<span>{current.label}</span><span class="val">20 Гц – 20 кГц</span>
		{/if}
	</figcaption>
</figure>

<style>
	.fr {
		position: relative;
		margin: 0;
		padding-bottom: 34px;
		--fr-grid: rgb(10 12 18 / 0.07);
		--fr-text: var(--color-graphite);
	}
	.fr.is-dark {
		--fr-grid: rgb(255 255 255 / 0.08);
		--fr-text: rgb(255 255 255 / 0.6);
	}
	.grid {
		stroke: var(--fr-grid);
		stroke-width: 1;
	}
	.zero {
		stroke: var(--fr-grid);
		stroke-width: 1.5;
		stroke-dasharray: 4 6;
	}
	.curve {
		fill: none;
		stroke-linecap: round;
		stroke-linejoin: round;
		transition: opacity 0.4s var(--ease-precise);
	}
	.main {
		stroke: var(--color-blue);
		stroke-width: 4;
	}
	.is-dark .main {
		stroke: #7f8cff;
	}
	.muted {
		stroke: var(--fr-text);
		stroke-width: 2;
		opacity: 0.35;
	}
	.area {
		transition: opacity 0.4s;
	}
	.dot {
		fill: var(--color-blue);
		stroke: #fff;
		stroke-width: 2;
	}
	.dot-halo {
		fill: var(--color-blue);
		opacity: 0.18;
	}
	.probe {
		stroke: var(--color-blue);
		stroke-width: 1;
		opacity: 0.5;
	}
	.ticks {
		position: absolute;
		inset: auto 0 0;
		height: 20px;
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--fr-text);
	}
	.ticks span {
		position: absolute;
		transform: translateX(-50%);
		white-space: nowrap;
	}
	.ticks .first {
		transform: none;
	}
	.ticks .last {
		transform: translateX(-100%);
	}
	@media (max-width: 640px) {
		/* на вузькому екрані лишаємо крайні та 1 кГц */
		.ticks span:nth-child(2),
		.ticks span:nth-child(4) {
			display: none;
		}
	}
	.readout {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		gap: 10px;
		font-family: var(--font-mono);
		font-size: 13px;
		color: var(--fr-text);
	}
	.readout .val {
		color: var(--color-blue);
	}
	.is-dark .readout .val {
		color: #9aa5ff;
	}
</style>
