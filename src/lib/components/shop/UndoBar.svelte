<script lang="ts">
	import { t } from '#lib/ui.ts';
	import { Undo2 } from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import { announce, cart } from '#lib/stores/shop.svelte.ts';

	/** «Скасувати» після видалення з кошика — 6 секунд */
	let visible = $state(false);
	let last = $state<typeof cart.removed>(null);
	$effect(() => {
		if (cart.removed === last) return;
		last = cart.removed;
		visible = !!cart.removed;
		if (!visible) return;
		const t = setTimeout(() => (visible = false), 6000);
		return () => clearTimeout(t);
	});
</script>

{#if visible && cart.removed}
	<div
		class="flex items-center gap-3 bg-ink px-4 py-3 text-sm text-white"
		role="status"
		transition:fly={{ y: 12, duration: 180 }}
	>
		<span class="flex-1">{t.undo.removed}</span>
		<button
			type="button"
			class="btn btn-sm bg-white text-ink hover:bg-paper"
			onclick={() => {
				cart.undo();
				visible = false;
				announce(t.undo.restored);
			}}
		>
			<Undo2 size={15} />
			{t.undo.undo}
		</button>
	</div>
{/if}
