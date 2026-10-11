<script lang="ts">
	import { resolve } from '$app/paths';
	import { X } from '@lucide/svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { toast } from '#lib/stores/toast.svelte.ts';
</script>

<div
	class="pointer-events-none fixed bottom-4 left-1/2 z-[60] grid w-[min(420px,calc(100%-32px))] -translate-x-1/2 gap-2"
	role="status"
	aria-live="polite"
>
	{#each toast.items as t (t.id)}
		<div
			class="pointer-events-auto flex items-center gap-3 bg-ink py-2.5 pr-2 pl-4 text-sm text-white shadow-[var(--shadow-pop)]"
			animate:flip={{ duration: 200 }}
			transition:fly={{ y: 16, duration: 200 }}
		>
			<span class="flex-1">{t.text}</span>
			{#if t.action}<a
					href={resolve(t.action.href as '/')}
					class="font-medium text-[#9fb0ff] hover:text-white">{t.action.label}</a
				>{/if}
			<button
				type="button"
				class="icon-btn !h-8 !w-8 text-white hover:!bg-white/10"
				aria-label="Закрити повідомлення"
				onclick={() => toast.dismiss(t.id)}><X size={15} /></button
			>
		</div>
	{/each}
</div>
