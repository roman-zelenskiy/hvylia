<script lang="ts">
	import { t } from '#lib/ui.ts';
	import { lhref } from '#lib/lang.ts';
	import { Trash2 } from '@lucide/svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import type { CartRow } from '#lib/catalog/cart.ts';
	import { formatPrice } from '#lib/catalog/format.ts';
	import { productCutout, productImage } from '#lib/images.ts';
	import { reducedMotion } from '#lib/motion.ts';
	import { announce, cart, MAX_QTY } from '#lib/stores/shop.svelte.ts';
	import Stepper from '#lib/components/ui/Stepper.svelte';

	let { rows, compact = false }: { rows: CartRow[]; compact?: boolean } = $props();
	const ms = () => (reducedMotion() ? 0 : 220);
</script>

<ul class="divide-y divide-line">
	{#each rows as r (r.key)}
		<li class="flex gap-4 py-4" animate:flip={{ duration: ms() }} out:fade={{ duration: ms() / 2 }}>
			<a
				href={lhref('/product/[slug]', { slug: r.slug })}
				class="stage relative shrink-0 overflow-hidden rounded-sm {compact
					? 'h-20 w-20'
					: 'h-24 w-24'}"
				tabindex="-1"
				aria-hidden="true"
			>
				{#if productCutout(r.slug)}
					<enhanced:img
						src={productCutout(r.slug)!}
						alt=""
						sizes="96px"
						class="cutout absolute inset-[12%] h-[76%] w-[76%] object-contain"
					/>
				{:else}
					<enhanced:img
						src={productImage(r.product.image)}
						alt=""
						sizes="96px"
						class="h-full w-full object-cover"
					/>
				{/if}
			</a>
			<div class="flex min-w-0 flex-1 flex-col">
				<div class="flex items-start justify-between gap-3">
					<div class="min-w-0">
						<a
							href={lhref('/product/[slug]', { slug: r.slug })}
							class="text-[15px] leading-snug font-medium hover:text-blue">{r.product.name}</a
						>
						<p class="mt-0.5 text-[13px] text-graphite">{r.colorName}</p>
					</div>
					<button
						type="button"
						class="icon-btn -mt-2 -mr-2 shrink-0 text-graphite hover:!text-alert"
						aria-label={t.cartRow.remove(r.product.name, r.colorName)}
						onclick={() => {
							cart.remove(r.key);
							announce(t.cartRow.removed(r.product.name));
						}}
					>
						<Trash2 size={17} />
					</button>
				</div>
				<div class="mt-auto flex items-center justify-between gap-3 pt-3">
					<Stepper
						size="sm"
						value={r.qty}
						max={MAX_QTY}
						label={t.cartRow.qty(r.product.name)}
						onchange={(v) => cart.setQty(r.key, v)}
					/>
					<span class="mono text-[15px] font-medium">{formatPrice(r.sum)}</span>
				</div>
			</div>
		</li>
	{/each}
</ul>
