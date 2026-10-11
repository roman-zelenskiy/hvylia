<script lang="ts">
	import { Plus } from '@lucide/svelte';

	/** Акордеон: відповіді завжди в HTML (для пошуковиків і FAQPage), закриті — hidden */
	let { items, id }: { items: { q: string; a: string }[]; id: string } = $props();
	let open = $state<number | null>(null);
</script>

<ul class="divide-y divide-line border-y border-line">
	{#each items as item, i (item.q)}
		<li>
			<h3>
				<button
					type="button"
					id="{id}-q{i}"
					aria-expanded={open === i}
					aria-controls="{id}-a{i}"
					class="group flex w-full items-center gap-4 py-4 text-left text-[15px] font-medium transition-colors hover:text-blue"
					onclick={() => (open = open === i ? null : i)}
				>
					<span class="flex-1">{item.q}</span>
					<Plus
						size={18}
						class="shrink-0 transition-transform duration-300 {open === i ? 'rotate-45' : ''}"
					/>
				</button>
			</h3>
			<div
				id="{id}-a{i}"
				role="region"
				aria-labelledby="{id}-q{i}"
				hidden={open !== i}
				class="reveal pb-5 text-graphite"
			>
				<p class="max-w-3xl">{item.a}</p>
			</div>
		</li>
	{/each}
</ul>
