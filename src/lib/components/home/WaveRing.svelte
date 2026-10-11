<script lang="ts">
	import { onMount } from 'svelte';
	import { reducedMotion } from '#lib/motion.ts';

	/**
	 * Кільце-еквалайзер навколо флагмана: 72 тонкі штрихи «дихають» (сума синусоїд),
	 * а ближні до курсора — витягуються, ніби звук іде в його бік. Лише transform: scaleY.
	 * Цикл кадрів зупиняється, коли блок поза екраном; при reduced motion хвиля статична.
	 */
	const N = 72;
	const R = 172;
	const C = 220;
	let svg: SVGSVGElement;
	let bars: SVGRectElement[] = [];
	let pointer: number | null = null; // кут курсора, рад
	let energy = 0; // 0…1 — наскільки курсор близько

	const base = Array.from(
		{ length: N },
		(_, i) => 0.45 + 0.35 * Math.abs(Math.sin(i * 0.37)) + 0.2 * Math.abs(Math.sin(i * 1.13))
	);

	onMount(() => {
		const still = reducedMotion();
		const cur = new Float32Array(base);
		let raf = 0;
		let visible = true;
		const t0 = performance.now();

		const frame = (now: number) => {
			const t = (now - t0) / 1000;
			for (let i = 0; i < N; i++) {
				const a = (i / N) * Math.PI * 2;
				let target =
					base[i] * (0.75 + 0.25 * Math.sin(t * 1.3 + i * 0.42) * Math.sin(t * 0.7 + i * 0.11));
				if (pointer !== null) {
					const d = Math.abs(Math.atan2(Math.sin(a - pointer), Math.cos(a - pointer)));
					target += energy * Math.max(0, 1 - d / 0.9) * 0.9;
				}
				cur[i] += (target - cur[i]) * 0.12;
				bars[i]?.setAttribute(
					'transform',
					`rotate(${(i / N) * 360} ${C} ${C}) translate(${C - 1} ${C - R}) scale(1 ${cur[i].toFixed(3)})`
				);
			}
			if (visible) raf = requestAnimationFrame(frame);
		};

		if (still) {
			frame(t0);
			return;
		}
		const io = new IntersectionObserver(([e]) => {
			visible = e.isIntersecting;
			cancelAnimationFrame(raf);
			if (visible) raf = requestAnimationFrame(frame);
		});
		io.observe(svg);
		return () => {
			io.disconnect();
			cancelAnimationFrame(raf);
		};
	});

	function move(e: PointerEvent) {
		const r = svg.getBoundingClientRect();
		const x = e.clientX - (r.left + r.width / 2);
		const y = e.clientY - (r.top + r.height / 2);
		// кут від «12 години» за годинниковою стрілкою — як у штрихів
		pointer = Math.atan2(x, -y);
		if (pointer < 0) pointer += Math.PI * 2;
		energy = Math.max(0, 1 - Math.hypot(x, y) / (r.width * 0.9));
	}
</script>

<svelte:window onpointermove={(e) => e.pointerType === 'mouse' && move(e)} />

<svg
	bind:this={svg}
	viewBox="0 0 {C * 2} {C * 2}"
	class="pointer-events-none absolute inset-0 h-full w-full"
	aria-hidden="true"
>
	<circle cx={C} cy={C} r={R - 4} fill="none" stroke="var(--color-line)" stroke-width="1" />
	{#each base as b, i (i)}
		<!-- штрих росте від кола назовні: висота 36 при scale(1) -->
		<rect
			bind:this={bars[i]}
			x="0"
			y="-36"
			width="2"
			height="36"
			rx="1"
			fill={i % 12 === 0 ? 'var(--color-blue)' : 'var(--color-ink)'}
			transform="rotate({(i / N) * 360} {C} {C}) translate({C - 1} {C - R}) scale(1 {b.toFixed(3)})"
		/>
	{/each}
</svg>
