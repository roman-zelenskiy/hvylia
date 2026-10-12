<script lang="ts">
	import { ChevronLeft, ChevronRight, Expand } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import type { Picture } from 'vite-imagetools';
	import { productCutout, productImage } from '#lib/images.ts';
	import { reducedMotion } from '#lib/motion.ts';
	import Overlay from '#lib/components/ui/Overlay.svelte';

	/**
	 * Галерея: перший кадр — вирізка товару на «сцені» (якщо є), далі фото в інтер’єрі.
	 * Мініатюри, «лупа» при наведенні, повноекранний перегляд зі свайпом і стрілками.
	 */
	let { images, alt, name, slug }: { images: string[]; alt: string; name: string; slug: string } =
		$props();

	type Frame = { pic: Picture; cut: boolean };
	const frames = $derived.by<Frame[]>(() => {
		const cut = productCutout(slug);
		const photos = images.map((f) => ({ pic: productImage(f), cut: false }));
		return cut ? [{ pic: cut, cut: true }, ...photos] : photos;
	});

	let index = $state(0);
	let zoom = $state(false);
	let origin = $state('50% 50%');
	let full = $state(false);
	let startX = 0;

	// інший товар — галерея з першого кадру
	$effect.pre(() => {
		void slug;
		index = 0;
	});

	const frame = $derived(frames[index] ?? frames[0]);
	const go = (d: number) => (index = (index + d + frames.length) % frames.length);
	const altFor = (i: number) => (i === 0 ? alt : `${name} — фото ${i + 1} з ${frames.length}`);
	const fine = () => matchMedia('(hover: hover) and (pointer: fine)').matches;

	function swipeStart(e: PointerEvent) {
		startX = e.clientX;
	}
	function swipeEnd(e: PointerEvent) {
		const dx = e.clientX - startX;
		if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
	}
</script>

<div class="grid gap-3 md:grid-cols-[76px_1fr]">
	<ul
		class="no-scrollbar order-2 flex gap-2 overflow-x-auto p-0.5 md:order-1 md:flex-col"
		aria-label="Фото товару"
	>
		{#each frames as f, i (i)}
			<li>
				<button
					type="button"
					class={[
						'thumb relative block h-[72px] w-[72px] shrink-0 overflow-hidden rounded-sm',
						f.cut ? 'stage' : 'bg-white',
						i === index && 'is-current'
					]}
					aria-label="Фото {i + 1} з {frames.length}"
					aria-current={i === index ? 'true' : undefined}
					onclick={() => (index = i)}
				>
					<enhanced:img
						src={f.pic}
						alt=""
						sizes="72px"
						class={f.cut
							? 'cutout absolute inset-[12%] h-[76%] w-[76%] object-contain'
							: 'h-full w-full object-cover'}
					/>
				</button>
			</li>
		{/each}
	</ul>

	<div
		class={[
			'relative order-1 aspect-square overflow-hidden rounded-lg md:order-2',
			frame.cut ? 'stage' : 'bg-white'
		]}
	>
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
				<span
					class={['absolute', frame.cut ? 'inset-[10%]' : 'inset-0']}
					in:fade={{ duration: reducedMotion() ? 0 : 220 }}
				>
					<enhanced:img
						src={frame.pic}
						alt={altFor(index)}
						sizes="(min-width: 1024px) 640px, 100vw"
						fetchpriority={index === 0 ? 'high' : undefined}
						loading="eager"
						class={[
							'h-full w-full transition-transform duration-300 ease-[var(--ease-precise)]',
							frame.cut ? 'cutout object-contain' : 'object-cover'
						]}
						style="transform-origin: {origin}; transform: scale({zoom
							? frame.cut
								? 1.5
								: 1.9
							: 1}); {index === 0 ? 'view-transition-name: product-hero' : ''}"
					/>
				</span>
			{/key}
			<span
				class="icon-btn pointer-events-none absolute right-4 bottom-4 bg-white/90 shadow-sm"
				aria-hidden="true"><Expand size={17} /></span
			>
		</button>
		<p
			class="mono pointer-events-none absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs shadow-sm"
			aria-hidden="true"
		>
			{index + 1} / {frames.length}
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
	<h2 id="gallery-title" class="sr-only">{name}: фото {index + 1} з {frames.length}</h2>
	<div
		class={[
			'relative aspect-square max-h-[86svh] w-full touch-pan-y',
			frame.cut ? 'stage' : 'bg-white'
		]}
		role="group"
		aria-roledescription="галерея"
		onpointerdown={swipeStart}
		onpointerup={swipeEnd}
	>
		{#key index}
			<span
				class={['absolute', frame.cut ? 'inset-[8%]' : 'inset-0']}
				in:fade={{ duration: reducedMotion() ? 0 : 200 }}
			>
				<enhanced:img
					src={frame.pic}
					alt={altFor(index)}
					sizes="92vw"
					class={['h-full w-full object-contain', frame.cut && 'cutout']}
				/>
			</span>
		{/key}
		<button
			type="button"
			class="icon-btn absolute top-1/2 left-3 z-10 -translate-y-1/2 bg-white shadow-[var(--shadow-pop)]"
			aria-label="Попереднє фото"
			onclick={() => go(-1)}
			data-autofocus
		>
			<ChevronLeft size={20} />
		</button>
		<button
			type="button"
			class="icon-btn absolute top-1/2 right-3 z-10 -translate-y-1/2 bg-white shadow-[var(--shadow-pop)]"
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
		box-shadow: 0 0 0 2px var(--color-blue);
	}
</style>
