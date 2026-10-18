<script lang="ts">
	import { t } from '#lib/ui.ts';
	/** Логотип: хвиля з дев’яти штрихів різної висоти + назва */
	const bars = [5, 9, 14, 20, 24, 20, 14, 9, 5];
</script>

<span class="inline-flex items-center gap-2.5">
	<svg width="30" height="26" viewBox="0 0 30 26" aria-hidden="true">
		{#each bars as h, i (i)}
			<rect
				x={i * 3.3}
				y={(26 - h) / 2}
				width="1.6"
				height={h}
				rx="0.8"
				fill={i === 4 ? 'var(--color-blue)' : 'currentColor'}
			/>
		{/each}
	</svg>
	<span class="text-[19px] font-semibold tracking-[-0.03em]">{t.brand}</span>
</span>
