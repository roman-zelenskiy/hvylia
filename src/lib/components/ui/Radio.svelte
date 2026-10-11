<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		group = $bindable(),
		value,
		name,
		disabled = false,
		children
	}: {
		group: string;
		value: string;
		name: string;
		disabled?: boolean;
		children: Snippet;
	} = $props();
</script>

<label class="check">
	<input type="radio" class="sr-only" {name} {value} {disabled} bind:group />
	<span class="check-box is-radio" aria-hidden="true"></span>
	<span class="min-w-0 flex-1">{@render children()}</span>
</label>
