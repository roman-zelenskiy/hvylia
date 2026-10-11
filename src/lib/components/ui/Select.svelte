<script lang="ts" generics="T extends string">
	import { ChevronDown, Check } from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import { tick } from 'svelte';

	/** Власний select (кнопка + listbox): стрілки, Home/End, пошук за першими літерами, Enter/Esc */
	let {
		value = $bindable(),
		options,
		label,
		hideLabel = false,
		id,
		onchange
	}: {
		value: T;
		options: { value: T; label: string }[];
		label: string;
		hideLabel?: boolean;
		id: string;
		onchange?: (v: T) => void;
	} = $props();

	let open = $state(false);
	let active = $state(0);
	let root: HTMLDivElement;
	let list = $state<HTMLUListElement>();
	let typed = '';
	let typedTimer: ReturnType<typeof setTimeout>;

	const current = $derived(options.find((o) => o.value === value) ?? options[0]);

	async function show() {
		open = true;
		active = Math.max(
			0,
			options.findIndex((o) => o.value === value)
		);
		await tick();
		list?.focus();
	}
	function choose(i: number) {
		const o = options[i];
		if (!o) return;
		value = o.value;
		onchange?.(o.value);
		open = false;
		root.querySelector<HTMLButtonElement>('button')?.focus();
	}
	function onListKey(e: KeyboardEvent) {
		const last = options.length - 1;
		if (e.key === 'ArrowDown') active = Math.min(last, active + 1);
		else if (e.key === 'ArrowUp') active = Math.max(0, active - 1);
		else if (e.key === 'Home') active = 0;
		else if (e.key === 'End') active = last;
		else if (e.key === 'Enter' || e.key === ' ') choose(active);
		else if (e.key === 'Escape' || e.key === 'Tab') {
			open = false;
			if (e.key === 'Escape') root.querySelector<HTMLButtonElement>('button')?.focus();
			return;
		} else if (e.key.length === 1) {
			clearTimeout(typedTimer);
			typed += e.key.toLowerCase();
			typedTimer = setTimeout(() => (typed = ''), 600);
			const i = options.findIndex((o) => o.label.toLowerCase().startsWith(typed));
			if (i >= 0) active = i;
			return;
		} else return;
		e.preventDefault();
		list?.querySelector(`#${id}-o${active}`)?.scrollIntoView({ block: 'nearest' });
	}
</script>

<svelte:window
	onpointerdown={(e) => {
		if (open && !root.contains(e.target as Node)) open = false;
	}}
/>

<div class="relative" bind:this={root}>
	<span id="{id}-label" class={hideLabel ? 'sr-only' : 'field-label'}>{label}</span>
	<button
		type="button"
		{id}
		class="field flex items-center justify-between gap-3 text-left"
		aria-haspopup="listbox"
		aria-expanded={open}
		aria-labelledby="{id}-label {id}"
		onclick={() => (open ? (open = false) : show())}
		onkeydown={(e) => {
			if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
				e.preventDefault();
				show();
			}
		}}
	>
		<span class="truncate">{current?.label}</span>
		<ChevronDown
			size={16}
			class="shrink-0 transition-transform duration-200 {open ? 'rotate-180' : ''}"
		/>
	</button>
	{#if open}
		<ul
			bind:this={list}
			role="listbox"
			tabindex="-1"
			aria-labelledby="{id}-label"
			aria-activedescendant="{id}-o{active}"
			class="popover absolute top-full right-0 left-0 z-30 mt-1 max-h-72 min-w-max overflow-auto p-1 outline-none"
			onkeydown={onListKey}
			transition:fly={{ y: -4, duration: 140 }}
		>
			{#each options as o, i (o.value)}
				<!-- клавіатура обробляється на рівні listbox (стрілки, Enter, Esc) -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<li
					id="{id}-o{i}"
					role="option"
					aria-selected={o.value === value}
					class={['option', i === active && 'is-active']}
					onpointerenter={() => (active = i)}
					onclick={() => choose(i)}
				>
					<span class="flex-1">{o.label}</span>
					{#if o.value === value}<Check size={14} />{/if}
				</li>
			{/each}
		</ul>
	{/if}
</div>
