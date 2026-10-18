<script lang="ts">
	import { t } from '#lib/ui.ts';
	import { formatPrice } from '#lib/catalog/format.ts';
	import { FREE_SHIPPING_FROM } from '#lib/data/site.ts';

	/** Прогрес до безкоштовної доставки: тонка шкала з поділками, заповнення — scaleX */
	let { total }: { total: number } = $props();
	const left = $derived(Math.max(0, FREE_SHIPPING_FROM - total));
	const progress = $derived(Math.min(1, total / FREE_SHIPPING_FROM));
</script>

<div class="bg-paper p-3">
	<p class="text-[13px]">
		{#if left > 0}
			{t.ship.more} <b class="mono font-medium">{formatPrice(left)}</b> {t.ship.left}
		{:else}
			<b class="font-medium text-ok">{t.ship.free}</b>
		{/if}
	</p>
	<div
		class="relative mt-2 h-1.5 overflow-hidden bg-line"
		role="progressbar"
		aria-label={t.ship.aria}
		aria-valuemin={0}
		aria-valuemax={FREE_SHIPPING_FROM}
		aria-valuenow={Math.min(total, FREE_SHIPPING_FROM)}
		aria-valuetext={left > 0 ? t.ship.leftText(formatPrice(left)) : t.ship.freeText}
	>
		<div
			class="absolute inset-0 origin-left bg-blue transition-transform duration-500 ease-[var(--ease-precise)]"
			style:transform="scaleX({progress})"
		></div>
		<div class="absolute inset-0 flex justify-between px-[25%]" aria-hidden="true">
			{#each [0, 1, 2] as i (i)}<span class="h-full w-px bg-white"></span>{/each}
		</div>
	</div>
</div>
