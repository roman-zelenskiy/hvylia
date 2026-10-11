<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		checked = $bindable(false),
		disabled = false,
		name,
		value,
		children,
		count,
		onchange
	}: {
		checked?: boolean;
		disabled?: boolean;
		name?: string;
		value?: string;
		children: Snippet;
		count?: number;
		onchange?: (checked: boolean) => void;
	} = $props();
</script>

<label class="check group">
	<input
		type="checkbox"
		class="sr-only"
		{name}
		{value}
		{disabled}
		bind:checked
		onchange={() => onchange?.(checked)}
	/>
	<span class="check-box" aria-hidden="true">
		<svg width="12" height="12" viewBox="0 0 12 12"
			><path
				d="M2.5 6.2 5 8.6l4.5-5"
				fill="none"
				stroke="currentColor"
				stroke-width="1.8"
				stroke-linecap="round"
				stroke-linejoin="round"
			/></svg
		>
	</span>
	<span class="min-w-0 flex-1">{@render children()}</span>
	{#if count !== undefined}<span class="mono text-xs text-mute">{count}</span>{/if}
</label>
