<script lang="ts">
	import { Plus } from '@lucide/svelte';

	/** Акордеон: відповіді завжди в HTML (для пошуковиків і FAQPage), закриті — hidden */
	let { items, id }: { items: { q: string; a: string }[]; id: string } = $props();
	let open = $state<number | null>(null);
</script>

<ul class="divide-y divide-line">
	{#each items as item, i (item.q)}
		<li>
			<h3>
				<button
					type="button"
					id="{id}-q{i}"
					aria-expanded={open === i}
					aria-controls="{id}-a{i}"
					class="group flex w-full items-center gap-4 py-5 text-left text-[17px] font-medium tracking-[-0.01em] transition-colors hover:text-blue"
					onclick={() => (open = open === i ? null : i)}
				>
					<span class="flex-1">{item.q}</span>
					<span
						class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-paper transition-colors group-hover:bg-blue-soft"
						aria-hidden="true"
					>
						<Plus
							size={17}
							class="transition-transform duration-300 ease-[var(--ease-out-soft)] {open === i
								? 'rotate-45'
								: ''}"
						/>
					</span>
				</button>
			</h3>
			<div
				id="{id}-a{i}"
				role="region"
				aria-labelledby="{id}-q{i}"
				hidden={open !== i}
				class="reveal pr-14 pb-6 text-graphite"
			>
				<p class="max-w-3xl">{item.a}</p>
			</div>
		</li>
	{/each}
</ul>
