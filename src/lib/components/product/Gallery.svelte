<script lang="ts">
	import { ChevronLeft, ChevronRight, Expand } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import { productImage } from '#lib/images.ts';
	import { reducedMotion } from '#lib/motion.ts';
	import Overlay from '#lib/components/ui/Overlay.svelte';

	/** Галерея: мініатюри, «лупа» при наведенні, повноекранний перегляд зі свайпом і стрілками */
	let { images, alt, name }: { images: string[]; alt: string; name: string } = $props();

	let index = $state(0);
	let zoom = $state(false);
	let origin = $state('50% 50%');
	let full = $state(false);
	let startX = 0;

	const go = (d: number) => (index = (index + d + images.length) % images.length);
	const altFor = (i: number) => (i === 0 ? alt : `${name} — фото ${i + 1} з ${images.length}`);
	const fine = () => matchMedia('(hover: hover) and (pointer: fine)').matches;

	function swipeStart(e: PointerEvent) {
		startX = e.clientX;
	}
	function swipeEnd(e: PointerEvent) {
		const dx = e.clientX - startX;
		if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
	}
</script>

<div class="grid gap-3 md:grid-cols-[72px_1fr]">
	<ul
		class="no-scrollbar order-2 flex gap-2 overflow-x-auto md:order-1 md:flex-col"
		aria-label="Фото товару"
	>
		{#each images as img, i (img)}
			<li>
				<button
					type="button"
					class={[
						'thumb block h-[72px] w-[72px] shrink-0 overflow-hidden bg-white',
						i === index && 'is-current'
					]}
					aria-label="Фото {i + 1} з {images.length}"
					aria-current={i === index ? 'true' : undefined}
					onclick={() => (index = i)}
				>
					<enhanced:img
						src={productImage(img)}
						alt=""
						sizes="72px"
						class="h-full w-full object-cover"
					/>
				</button>
			</li>
		{/each}
	</ul>

	<div class="relative order-1 aspect-square overflow-hidden bg-white md:order-2">
		<button
			type="button"
			class="group absolute inset-0 block h-full w-full cursor-zoom-in overflow-hidden"
			aria-label="Відкрити фото на весь екран"
			onclick={() => (full = true)}
			onpointerenter={() => fine() && (zoom = true)}
			onpointerleave={() => (zoom = false)}
			onpointermove={(e) => {
				const r = e.currentTarget.getBoundingClientRect();
				origin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
			}}
			onpointerdown={swipeStart}
			onpointerup={(e) => e.pointerType !== 'mouse' && swipeEnd(e)}
		>
			{#key index}
				<span class="absolute inset-0" in:fade={{ duration: reducedMotion() ? 0 : 200 }}>
					<enhanced:img
						src={productImage(images[index])}
						alt={altFor(index)}
						sizes="(min-width: 1024px) 640px, 100vw"
						fetchpriority={index === 0 ? 'high' : undefined}
						loading="eager"
						class="h-full w-full object-cover transition-transform duration-300 ease-[var(--ease-precise)]"
						style="transform-origin: {origin}; transform: scale({zoom ? 1.9 : 1})"
					/>
				</span>
			{/key}
			<span
				class="icon-btn pointer-events-none absolute right-3 bottom-3 bg-white/90"
				aria-hidden="true"><Expand size={17} /></span
			>
		</button>
		<p
			class="mono pointer-events-none absolute bottom-3 left-3 bg-white/90 px-2 py-1 text-xs"
			aria-hidden="true"
		>
			{index + 1} / {images.length}
		</p>
	</div>
</div>

<svelte:window
	onkeydown={(e) => {
		if (!full) return;
		if (e.key === 'ArrowRight') go(1);
		if (e.key === 'ArrowLeft') go(-1);
	}}
/>

<Overlay
	bind:open={full}
	labelledby="gallery-title"
	width="max-w-[min(92vw,1100px)]"
	closeLabel="Закрити перегляд"
>
	<h2 id="gallery-title" class="sr-only">{name}: фото {index + 1} з {images.length}</h2>
	<div
		class="relative aspect-square max-h-[86svh] w-full touch-pan-y bg-white"
		role="group"
		aria-roledescription="галерея"
		onpointerdown={swipeStart}
		onpointerup={swipeEnd}
	>
		{#key index}
			<span class="absolute inset-0" in:fade={{ duration: reducedMotion() ? 0 : 200 }}>
				<enhanced:img
					src={productImage(images[index])}
					alt={altFor(index)}
					sizes="92vw"
					class="h-full w-full object-contain"
				/>
			</span>
		{/key}
		<button
			type="button"
			class="icon-btn absolute top-1/2 left-3 -translate-y-1/2 bg-white shadow-[var(--shadow-pop)]"
			aria-label="Попереднє фото"
			onclick={() => go(-1)}
			data-autofocus
		>
			<ChevronLeft size={20} />
		</button>
		<button
			type="button"
			class="icon-btn absolute top-1/2 right-3 -translate-y-1/2 bg-white shadow-[var(--shadow-pop)]"
			aria-label="Наступне фото"
			onclick={() => go(1)}
		>
			<ChevronRight size={20} />
		</button>
	</div>
</Overlay>

<style>
	.thumb {
		box-shadow: inset 0 0 0 1px var(--color-line);
		transition: box-shadow 0.15s;
	}
	.thumb:hover {
		box-shadow: inset 0 0 0 1px var(--color-ink);
	}
	.thumb.is-current {
		box-shadow: inset 0 0 0 2px var(--color-blue);
	}
</style>
