<script lang="ts">
	import { discount, formatPrice } from '#lib/catalog/format.ts';

	let {
		price,
		old,
		size = 'md'
	}: { price: number; old?: number; size?: 'sm' | 'md' | 'lg' } = $props();
	const off = $derived(discount(price, old));
	const cls = { sm: 'text-[15px]', md: 'text-lg', lg: 'text-[32px] tracking-tight' };
</script>

<span class="inline-flex flex-wrap items-baseline gap-x-2">
	<span class="mono font-medium {cls[size]} {off ? 'text-blue' : ''}">
		{#if off}<span class="sr-only">Ціна зі знижкою: </span>{/if}{formatPrice(price)}
	</span>
	{#if off}
		<s class="mono text-[13px] text-mute"
			><span class="sr-only">Стара ціна: </span>{formatPrice(old!)}</s
		>
	{/if}
</span>
