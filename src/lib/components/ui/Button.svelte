<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Common = {
		variant?: 'primary' | 'secondary' | 'ghost' | 'dark';
		size?: 'sm' | 'md' | 'lg';
		loading?: boolean;
		full?: boolean;
		children: Snippet;
	};
	type Props = Common &
		((HTMLButtonAttributes & { href?: undefined }) | (HTMLAnchorAttributes & { href: string }));

	let {
		variant = 'primary',
		size = 'md',
		loading = false,
		full = false,
		children,
		class: cls = '',
		...rest
	}: Props = $props();

	const classes = $derived([
		'btn',
		`btn-${variant}`,
		`btn-${size}`,
		full && 'w-full',
		loading && 'is-loading',
		cls
	]);
</script>

{#if rest.href !== undefined}
	<a class={classes} {...rest as HTMLAnchorAttributes}>{@render children()}</a>
{:else}
	<button
		class={classes}
		type="button"
		{...rest as HTMLButtonAttributes}
		disabled={(rest as HTMLButtonAttributes).disabled || loading}
		aria-busy={loading || undefined}
	>
		{#if loading}<span class="spinner" aria-hidden="true"></span>{/if}
		<span class="contents" class:invisible={loading}>{@render children()}</span>
	</button>
{/if}
