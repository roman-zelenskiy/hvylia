<script lang="ts">
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';

	/** Справжні посилання ?page=N (для пошуковиків), клієнт перехоплює навігацію сам */
	let { page, pages, href }: { page: number; pages: number; href: (p: number) => string } =
		$props();

	const items = $derived.by(() => {
		const out: (number | '…')[] = [];
		for (let p = 1; p <= pages; p++) {
			if (p === 1 || p === pages || Math.abs(p - page) <= 1) out.push(p);
			else if (out.at(-1) !== '…') out.push('…');
		}
		return out;
	});
</script>

{#if pages > 1}
	<nav aria-label="Сторінки каталогу" class="flex items-center justify-center gap-1">
		{#if page > 1}
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- href() повертає шлях через resolve() -->
			<a class="pg" href={href(page - 1)} rel="prev" aria-label="Попередня сторінка"
				><ChevronLeft size={16} /></a
			>
		{:else}
			<span class="pg is-disabled" aria-hidden="true"><ChevronLeft size={16} /></span>
		{/if}
		{#each items as p, i (i)}
			{#if p === '…'}
				<span class="pg text-mute" aria-hidden="true">…</span>
			{:else}
				<!-- eslint-disable svelte/no-navigation-without-resolve -- href() повертає шлях через resolve() -->
				<a
					class={['pg mono', p === page && 'is-current']}
					href={href(p)}
					aria-current={p === page ? 'page' : undefined}
					aria-label="Сторінка {p}">{p}</a
				>
				<!-- eslint-enable svelte/no-navigation-without-resolve -->
			{/if}
		{/each}
		{#if page < pages}
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- href() повертає шлях через resolve() -->
			<a class="pg" href={href(page + 1)} rel="next" aria-label="Наступна сторінка"
				><ChevronRight size={16} /></a
			>
		{:else}
			<span class="pg is-disabled" aria-hidden="true"><ChevronRight size={16} /></span>
		{/if}
	</nav>
{/if}

<style>
	.pg {
		display: grid;
		place-items: center;
		min-width: 40px;
		height: 40px;
		padding: 0 6px;
		border-radius: var(--radius-sm);
		font-size: 14px;
		transition: background-color 0.15s;
	}
	a.pg:hover {
		background: var(--color-white);
		box-shadow: inset 0 0 0 1px var(--color-line-2);
	}
	.pg.is-current {
		background: var(--color-ink);
		color: #fff;
	}
	.pg.is-disabled {
		color: var(--color-line-2);
		cursor: not-allowed;
	}
</style>
