<script lang="ts">
	import { t } from '#lib/ui.ts';
	let {
		value,
		count,
		size = 14,
		showValue = true
	}: { value: number; count?: number; size?: number; showValue?: boolean } = $props();
	const pct = $derived(Math.max(0, Math.min(100, (value / 5) * 100)));
</script>

<span
	class="inline-flex items-center gap-1.5"
	role="img"
	aria-label={t.rating(value.toFixed(1), count)}
>
	<span
		class="relative inline-block leading-none"
		style:width="{size * 5}px"
		style:height="{size}px"
		aria-hidden="true"
	>
		<svg class="absolute inset-0 text-line-2" width={size * 5} height={size} viewBox="0 0 100 20"
			>{#each [0, 1, 2, 3, 4] as i (i)}<path
					transform="translate({i * 20} 0)"
					d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.8z"
					fill="currentColor"
				/>{/each}</svg
		>
		<span class="absolute inset-y-0 left-0 overflow-hidden" style:width="{pct}%">
			<svg class="text-ink" width={size * 5} height={size} viewBox="0 0 100 20"
				>{#each [0, 1, 2, 3, 4] as i (i)}<path
						transform="translate({i * 20} 0)"
						d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.8z"
						fill="currentColor"
					/>{/each}</svg
			>
		</span>
	</span>
	{#if showValue}<span class="mono text-xs" aria-hidden="true"
			>{value.toFixed(1)}{#if count !== undefined}<span class="text-mute">
					· {count}</span
				>{/if}</span
		>{/if}
</span>
