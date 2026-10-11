<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';
	import { fly } from 'svelte/transition';

	export type ComboOption = { id: string; label: string; hint?: string };

	/** Поле з пошуком по асинхронному джерелу (місто, відділення): debounce, стан завантаження, стрілки, Enter/Esc */
	let {
		id,
		label,
		value = $bindable(null),
		load,
		placeholder = '',
		error = '',
		disabled = false,
		empty = 'Нічого не знайдено',
		onselect
	}: {
		id: string;
		label: string;
		value?: ComboOption | null;
		load: (q: string) => Promise<ComboOption[]>;
		placeholder?: string;
		error?: string;
		disabled?: boolean;
		empty?: string;
		onselect?: (o: ComboOption | null) => void;
	} = $props();

	let q = $state('');
	let open = $state(false);
	let loading = $state(false);
	let options = $state<ComboOption[]>([]);
	let active = $state(0);
	let root: HTMLDivElement;
	let timer: ReturnType<typeof setTimeout>;
	let seq = 0;

	// значення вибрали ззовні — показуємо його назву (скидання робить батько через {#key})
	let lastId: string | null = null;
	$effect.pre(() => {
		const id = value?.id ?? null;
		if (id === lastId) return;
		lastId = id;
		if (value) q = value.label;
	});

	function fetchOptions(query: string) {
		clearTimeout(timer);
		loading = true;
		const my = ++seq;
		timer = setTimeout(async () => {
			const res = await load(query);
			if (my !== seq) return;
			options = res;
			active = 0;
			loading = false;
		}, 200);
	}
	function pick(o: ComboOption) {
		value = o;
		q = o.label;
		open = false;
		onselect?.(o);
	}
</script>

<svelte:window
	onpointerdown={(e) => {
		if (open && !root.contains(e.target as Node)) open = false;
	}}
/>

<div class="relative" bind:this={root}>
	<label for={id} class="field-label">{label}</label>
	<div class="relative">
		<input
			{id}
			type="text"
			role="combobox"
			aria-expanded={open}
			aria-controls="{id}-list"
			aria-autocomplete="list"
			aria-activedescendant={open && options[active] ? `${id}-o${active}` : undefined}
			aria-invalid={!!error}
			aria-describedby={error ? `${id}-e` : undefined}
			autocomplete="off"
			{disabled}
			{placeholder}
			class={['field pr-10', value && !error && 'is-valid']}
			bind:value={q}
			oninput={() => {
				open = true;
				if (value) {
					value = null;
					onselect?.(null);
				}
				fetchOptions(q);
			}}
			onfocus={() => {
				open = true;
				fetchOptions(value ? '' : q);
			}}
			onkeydown={(e) => {
				if (e.key === 'ArrowDown') {
					e.preventDefault();
					open = true;
					active = Math.min(options.length - 1, active + 1);
				} else if (e.key === 'ArrowUp') {
					e.preventDefault();
					active = Math.max(0, active - 1);
				} else if (e.key === 'Enter' && open && options[active]) {
					e.preventDefault();
					pick(options[active]);
				} else if (e.key === 'Escape' && open) {
					e.preventDefault();
					e.stopPropagation();
					open = false;
				}
			}}
		/>
		{#if loading}
			<span class="spinner absolute top-1/2 right-3.5 -mt-2 text-graphite" aria-hidden="true"
			></span>
		{:else}
			<ChevronDown
				size={16}
				class="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-graphite"
			/>
		{/if}
	</div>
	{#if open && !disabled}
		<ul
			id="{id}-list"
			role="listbox"
			aria-label={label}
			aria-busy={loading}
			class="popover absolute top-full right-0 left-0 z-30 mt-1 max-h-64 overflow-auto p-1"
			transition:fly={{ y: -4, duration: 140 }}
		>
			{#if !loading && !options.length}
				<li class="px-3 py-3 text-sm text-graphite" role="presentation">{empty}</li>
			{/if}
			{#each options as o, i (o.id)}
				<!-- клавіатура обробляється в полі вводу (стрілки, Enter, Esc) -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<li
					id="{id}-o{i}"
					role="option"
					aria-selected={value?.id === o.id}
					class={[
						'option !min-h-11 flex-col !items-start !justify-center !gap-0',
						i === active && 'is-active'
					]}
					onpointerenter={() => (active = i)}
					onpointerdown={(e) => e.preventDefault()}
					onclick={() => pick(o)}
				>
					<span>{o.label}</span>
					{#if o.hint}<span class="text-xs text-graphite">{o.hint}</span>{/if}
				</li>
			{/each}
		</ul>
	{/if}
	{#if error}<p id="{id}-e" class="field-error">{error}</p>{/if}
</div>
