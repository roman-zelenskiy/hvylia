<script lang="ts">
	import { t } from '#lib/ui.ts';
	import type { Snippet } from 'svelte';

	/** Таби: стрілки/Home/End, roving tabindex; лінія-індикатор переїжджає через transform */
	let {
		tabs,
		active = $bindable(),
		id,
		panel
	}: {
		tabs: { id: string; label: string; count?: number }[];
		active: string;
		id: string;
		panel: Snippet<[string]>;
	} = $props();

	let buttons: HTMLButtonElement[] = $state([]);
	let bar = $state({ x: 0, w: 0 });

	$effect(() => {
		const i = tabs.findIndex((t) => t.id === active);
		const el = buttons[i];
		if (el) bar = { x: el.offsetLeft, w: el.offsetWidth };
	});

	function key(e: KeyboardEvent, i: number) {
		const last = tabs.length - 1;
		const next = {
			ArrowRight: i === last ? 0 : i + 1,
			ArrowLeft: i === 0 ? last : i - 1,
			Home: 0,
			End: last
		}[e.key];
		if (next === undefined) return;
		e.preventDefault();
		active = tabs[next].id;
		buttons[next]?.focus();
	}
</script>

<div class="relative border-b border-line">
	<div role="tablist" aria-label={t.productInfo} class="no-scrollbar flex gap-1 overflow-x-auto">
		{#each tabs as t, i (t.id)}
			<button
				bind:this={buttons[i]}
				role="tab"
				type="button"
				id="{id}-tab-{t.id}"
				aria-selected={active === t.id}
				aria-controls="{id}-panel-{t.id}"
				tabindex={active === t.id ? 0 : -1}
				class={[
					'relative h-12 shrink-0 px-4 text-[15px] transition-colors',
					active === t.id ? 'text-ink' : 'text-graphite hover:text-ink'
				]}
				onclick={() => (active = t.id)}
				onkeydown={(e) => key(e, i)}
			>
				{t.label}{#if t.count !== undefined}<span class="mono ml-1.5 text-xs text-mute"
						>{t.count}</span
					>{/if}
			</button>
		{/each}
	</div>
	<span
		class="absolute bottom-[-1px] left-0 h-[2px] w-px origin-left bg-blue transition-transform duration-300 ease-[var(--ease-precise)]"
		style:transform="translateX({bar.x}px) scaleX({bar.w})"
		aria-hidden="true"
	></span>
</div>
{#each tabs as t (t.id)}
	<div
		role="tabpanel"
		id="{id}-panel-{t.id}"
		aria-labelledby="{id}-tab-{t.id}"
		hidden={active !== t.id}
		tabindex="0"
		class="tab-panel pt-8 outline-none"
	>
		{@render panel(t.id)}
	</div>
{/each}
