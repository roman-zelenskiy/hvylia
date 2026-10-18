<script lang="ts">
	import { t } from '#lib/ui.ts';
	import { onMount } from 'svelte';

	/**
	 * Інфографіка для SEO-сторінок: кожна пояснює головне питання свого запиту.
	 * Усі значення підписані прямо на графіку (без кольору як єдиного носія сенсу).
	 * Поява — лише transform/opacity, коли блок потрапляє в екран; reduced motion — одразу фінальний стан.
	 */
	let { id }: { id: string } = $props();

	let el: HTMLElement;
	let on = $state(false);
	let armed = $state(false);
	let chainW = $state(0);
	onMount(() => {
		// ховаємо графік до появи лише з JS — без скриптів він видимий одразу
		armed = true;
		const io = new IntersectionObserver(
			([e]) => e.isIntersecting && ((on = true), io.disconnect()),
			{
				threshold: 0.3
			}
		);
		io.observe(el);
		return () => io.disconnect();
	});

	const L = t.landing;
	const anc = [
		{ place: L.places[0], off: 85, on: 57 },
		{ place: L.places[1], off: 80, on: 52 },
		{ place: L.places[2], off: 62, on: 40 }
	];
	const ip = ['IPX4', 'IPX5', 'IP55', 'IPX7'].map((code, i) => ({ code, ...L.ip[i] }));
	const battery = [
		{ name: 'TWS', buds: 6, extra: 24, extraLabel: L.withCase },
		{ name: L.onEar, buds: 45, extra: 0, extraLabel: '' }
	];
	const portable = [
		{ size: L.sizes[0], w: 5, h: 12 },
		{ size: L.sizes[1], w: 20, h: 16 },
		{ size: L.sizes[2], w: 40, h: 20 }
	];
	const ohm = [
		{ v: 16, label: '16' },
		{ v: 32, label: '32' },
		{ v: 80, label: '80' },
		{ v: 250, label: '250' },
		{ v: 300, label: '300' }
	];
	// логарифмічна висота: 16 Ом — найнижчий, 300 Ом — повна висота
	const ohmH = (v: number) => 0.18 + (0.82 * Math.log(v / 16)) / Math.log(300 / 16);
	const chain = L.chain;
</script>

<figure bind:this={el} class={['lg-card', armed && !on && 'off']}>
	{#if id === 'z-shumopodavlenniam'}
		<figcaption class="cap">{L.noiseCap}</figcaption>
		<ul class="legend" aria-hidden="true">
			<li><i class="sw a"></i>{L.noAnc}</li>
			<li><i class="sw b"></i>{L.withAnc}</li>
		</ul>
		<div class="sr-only">
			<table>
				<caption>{L.noiseTable}</caption>
				<thead><tr><th>{L.place}</th><th>{L.noAnc}</th><th>{L.withAnc}</th></tr></thead>
				<tbody>
					{#each anc as r (r.place)}<tr><th>{r.place}</th><td>{r.off}</td><td>{r.on}</td></tr
						>{/each}
				</tbody>
			</table>
		</div>
		<div class="mt-5 grid gap-5" aria-hidden="true">
			{#each anc as r, i (r.place)}
				<div>
					<p class="text-sm font-medium">{r.place}</p>
					<div class="mt-2 grid gap-[2px]">
						<div class="hrow">
							<span class="hbar a" style:--w={r.off / 90} style:--d="{i * 90}ms"></span>
							<span class="val">{r.off}</span>
						</div>
						<div class="hrow">
							<span class="hbar b" style:--w={r.on / 90} style:--d="{i * 90 + 200}ms"></span>
							<span class="val">{r.on}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<p class="note">{L.noiseNote}</p>
	{:else if id === 'dlia-sportu'}
		<figcaption class="cap">{L.ipCap}</figcaption>
		<ol class="mt-6 grid grid-cols-4 items-start gap-2">
			{#each ip as s, i (s.code)}
				<li class="min-w-0">
					<span class="flex h-40 flex-col justify-end" aria-hidden="true">
						<span class="vbar" style:--h={(i + 1) / 4} style:--d="{i * 110}ms">
							<span class="mono text-sm font-medium text-white">{s.code}</span>
						</span>
					</span>
					<span class="mt-3 block text-sm font-medium"
						><span class="sr-only">{s.code}: </span>{s.text}</span
					>
					<span class="block text-xs text-graphite">{s.use}</span>
				</li>
			{/each}
		</ol>
		<p class="note">{L.ipNote}</p>
	{:else if id === 'do-3000-hrn'}
		<figcaption class="cap">{L.hoursCap}</figcaption>
		<ul class="legend" aria-hidden="true">
			<li><i class="sw b"></i>{L.oneCharge}</li>
			<li><i class="sw a"></i>{L.fromCase}</li>
		</ul>
		<div class="mt-6 grid gap-5">
			{#each battery as b, i (b.name)}
				<div>
					<p class="text-sm font-medium">
						{b.name}
						<span class="sr-only">{L.hoursLine(b.buds, b.extra, b.extraLabel)}</span>
					</p>
					<div class="mt-2 flex items-center gap-3" aria-hidden="true">
						<div class="flex flex-1 gap-[2px]">
							<span class="hbar b" style:--w={1} style:flex={b.buds} style:--d="{i * 150}ms"></span>
							{#if b.extra}<span
									class="hbar a"
									style:--w={1}
									style:flex={b.extra}
									style:--d="{i * 150 + 220}ms"
								></span>{/if}
							<span style:flex={50 - b.buds - b.extra}></span>
						</div>
						<span class="val">{b.buds + b.extra}</span>
					</div>
				</div>
			{/each}
		</div>
		<p class="note">{L.budgetNote}</p>
	{:else if id === 'dlia-domu'}
		<figcaption class="cap">{L.stereoCap}</figcaption>
		<svg viewBox="0 0 320 250" class="mt-4 w-full" role="img" aria-label={L.stereoAria}>
			<g class="tri">
				<path
					d="M70 50 L250 50 L160 206 Z"
					fill="var(--color-blue-soft)"
					stroke="var(--color-blue)"
					stroke-width="2"
					stroke-dasharray="5 6"
				/>
			</g>
			{#each [70, 250] as x, i (x)}
				<g transform="translate({x} 50)">
					{#each [0, 1, 2] as k (k)}
						<circle r="16" class="ring" style:--d="{k * 0.8 + i * 0.4}s" />
					{/each}
					<rect
						x="-14"
						y="-18"
						width="28"
						height="36"
						rx="6"
						fill="var(--color-ink)"
						transform="rotate({i ? -30 : 30})"
					/>
					<circle
						r="6"
						fill="#fff"
						opacity=".85"
						transform="rotate({i ? -30 : 30}) translate(0 5)"
					/>
				</g>
			{/each}
			<g transform="translate(160 206)">
				<circle r="14" fill="var(--color-blue)" />
				<circle r="5" fill="#fff" />
			</g>
			<text x="160" y="38" text-anchor="middle" class="svgt">{L.m25}</text>
			<text x="98" y="140" text-anchor="end" class="svgt">{L.m25}</text>
			<text x="222" y="140" class="svgt">{L.m25}</text>
			<text x="160" y="104" text-anchor="middle" class="svgt mute">60°</text>
			<text x="160" y="240" text-anchor="middle" class="svgt mute">{L.you}</text>
		</svg>
		<p class="note">{L.stereoNote}</p>
	{:else if id === 'portatyvni-do-5000-hrn'}
		<figcaption class="cap">{L.sizeCap}</figcaption>
		<div class="sr-only">
			<table>
				<caption>{L.sizeTable}</caption>
				<thead><tr><th>{L.size}</th><th>{L.power}</th><th>{L.battery}</th></tr></thead>
				<tbody>
					{#each portable as r (r.size)}<tr><th>{r.size}</th><td>{r.w}</td><td>{r.h}</td></tr
						>{/each}
				</tbody>
			</table>
		</div>
		<div class="mt-6 grid grid-cols-2 gap-6" aria-hidden="true">
			{#each [{ key: 'w', title: L.power, max: 40 }, { key: 'h', title: L.battery, max: 20 }] as m, mi (m.key)}
				<div>
					<p class="text-sm text-graphite">{m.title}</p>
					<div class="mt-3 grid gap-3">
						{#each portable as r, i (r.size)}
							{@const v = m.key === 'w' ? r.w : r.h}
							<div>
								<p class="text-xs text-graphite">{r.size}</p>
								<div class="hrow mt-1">
									<span class="hbar b" style:--w={v / m.max} style:--d="{mi * 200 + i * 90}ms"
									></span>
									<span class="val">{v}</span>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
		<p class="note">{L.sizeNote}</p>
	{:else if id === 'dlia-pochatkivtsiv'}
		<figcaption class="cap">{L.chainCap}</figcaption>
		<ol
			class="chain mt-6 text-[13px] sm:text-sm"
			bind:clientWidth={chainW}
			style:--travel="{chainW * 0.75}px"
		>
			{#each chain as step, i (step)}
				<li style:--d="{i * 120}ms">
					<span class="node">{i + 1}</span>
					<span class="mt-2 block font-medium break-words hyphens-auto">{step}</span>
					{#if i === 1}<span class="block text-xs text-graphite">{L.builtIn}</span>{/if}
				</li>
			{/each}
			<span class="pulse" aria-hidden="true"></span>
		</ol>
		<p class="note">
			{L.chainNote}
		</p>
	{:else if id === 'dlia-navushnykiv'}
		<figcaption class="cap">{L.ohmCap}</figcaption>
		<div class="relative mt-6">
			<ol class="grid h-52 grid-cols-5 items-end gap-2">
				{#each ohm as o, i (o.v)}
					<li class="flex h-full flex-col justify-end">
						<span class="vbar" style:--h={ohmH(o.v)} style:--d="{i * 100}ms" aria-hidden="true"
						></span>
						<span class="mono mt-2 block text-center text-sm"
							>{o.label}<span class="sr-only">{L.ohm}</span></span
						>
					</li>
				{/each}
			</ol>
			<div class="mt-4 grid grid-cols-5 gap-2 text-xs">
				<p class="bracket col-span-2">{L.ohmLow}</p>
				<p class="bracket col-span-1">{L.ohmMid}</p>
				<p class="bracket col-span-2">{L.ohmHigh}</p>
			</div>
		</div>
		<p class="note">{L.ohmNote}</p>
	{/if}
</figure>

<style>
	.lg-card {
		margin: 0;
		padding: 28px;
		border-radius: var(--radius-lg);
		background: #fff;
		box-shadow: 0 0 0 1px rgb(8 9 12 / 0.04);
	}
	.cap {
		font-size: 17px;
		font-weight: 600;
		letter-spacing: -0.01em;
	}
	.note {
		margin-top: 22px;
		font-size: 14px;
		color: var(--color-graphite);
	}
	.legend {
		display: flex;
		gap: 18px;
		margin-top: 10px;
		font-size: 13px;
		color: var(--color-graphite);
	}
	.legend li {
		display: flex;
		align-items: center;
		gap: 7px;
	}
	.sw {
		width: 12px;
		height: 12px;
		border-radius: 4px;
	}
	.a {
		background: #8e9bff;
	}
	.b {
		background: #1a2fd0;
	}
	.hrow {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.hbar {
		display: block;
		height: 14px;
		width: calc(var(--w) * 100%);
		max-width: calc(100% - 34px);
		border-radius: 0 4px 4px 0;
		transform-origin: left;
		transition: transform 0.9s var(--ease-out-soft) var(--d, 0ms);
	}
	.flex .hbar {
		max-width: none;
	}
	.val {
		font-family: var(--font-mono);
		font-size: 13px;
		min-width: 24px;
	}
	.vbar {
		display: grid;
		align-items: start;
		justify-items: center;
		padding-top: 10px;
		height: calc(var(--h) * 100%);
		border-radius: 6px 6px 0 0;
		background: var(--color-blue);
		transform-origin: bottom;
		transition: transform 0.9s var(--ease-out-soft) var(--d, 0ms);
	}
	.off .hbar {
		transform: scaleX(0);
	}
	.off .vbar {
		transform: scaleY(0);
	}
	.bracket {
		padding-top: 8px;
		border-top: 2px solid var(--color-line-2);
		color: var(--color-graphite);
	}
	.bracket:last-child {
		border-color: var(--color-blue);
		color: var(--color-ink);
	}

	.svgt {
		font-size: 13px;
		font-family: var(--font-mono);
		fill: var(--color-ink);
	}
	.svgt.mute {
		fill: var(--color-graphite);
	}
	.tri {
		transform-origin: 160px 100px;
		transition:
			transform 0.9s var(--ease-out-soft),
			opacity 0.5s;
	}
	.off .tri {
		transform: scale(0.6);
		opacity: 0;
	}
	.ring {
		fill: none;
		stroke: var(--color-blue);
		stroke-width: 1.5;
		opacity: 0;
		transform-box: fill-box;
		transform-origin: center;
	}
	.lg-card:not(.off) .ring {
		animation: ring 2.4s var(--ease-out-soft) var(--d) infinite;
	}
	@keyframes ring {
		from {
			transform: scale(1);
			opacity: 0.6;
		}
		to {
			transform: scale(3.2);
			opacity: 0;
		}
	}

	.chain {
		position: relative;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 8px;
	}
	.chain::before {
		content: '';
		position: absolute;
		top: 21px;
		left: 12.5%;
		right: 12.5%;
		height: 2px;
		background: var(--color-line-2);
	}
	.chain li {
		position: relative;
		text-align: center;
		transition:
			opacity 0.5s var(--d),
			transform 0.7s var(--ease-out-soft) var(--d);
	}
	.off .chain li {
		opacity: 0;
		transform: translateY(10px);
	}
	.node {
		position: relative;
		display: inline-grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: 999px;
		background: var(--color-ink);
		color: #fff;
		font-family: var(--font-mono);
		font-size: 14px;
	}
	.pulse {
		position: absolute;
		top: 16px;
		left: 12.5%;
		width: 12px;
		height: 12px;
		margin-left: -6px;
		border-radius: 999px;
		background: var(--color-blue);
		box-shadow: 0 0 0 4px rgb(36 64 255 / 0.2);
		opacity: 0;
	}
	.lg-card:not(.off) .pulse {
		animation: travel 3.2s cubic-bezier(0.6, 0, 0.4, 1) 0.6s infinite;
	}
	@keyframes travel {
		0% {
			transform: translateX(0);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		100% {
			/* 75% ширини ряду — від першого вузла до останнього */
			transform: translateX(var(--travel, 0));
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hbar,
		.vbar,
		.tri,
		.chain li {
			transition: none;
		}
		.ring,
		.pulse {
			animation: none;
		}
	}
</style>
