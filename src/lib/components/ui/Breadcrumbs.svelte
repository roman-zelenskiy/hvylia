<script lang="ts">
	import { resolve } from '$app/paths';
	import { ChevronRight } from '@lucide/svelte';

	let { items }: { items: { href?: string; label: string }[] } = $props();
</script>

<nav aria-label="Хлібні крихти" class="no-scrollbar overflow-x-auto">
	<ol class="flex items-center gap-1.5 text-[13px] whitespace-nowrap text-graphite">
		{#each items as item, i (item.label)}
			<li class="flex items-center gap-1.5">
				{#if i > 0}<ChevronRight size={12} class="text-mute" aria-hidden="true" />{/if}
				{#if item.href && i < items.length - 1}
					<a href={resolve(item.href as '/')} class="wave-link hover:text-ink">{item.label}</a>
				{:else}
					<span aria-current="page" class="text-ink">{item.label}</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
