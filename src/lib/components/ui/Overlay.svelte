<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { X } from '@lucide/svelte';
	import { reducedMotion } from '#lib/motion.ts';

	/**
	 * Основа модалок і висувних панелей: переноситься в body, тримає фокус усередині,
	 * Esc закриває, після закриття фокус повертається. Решта сторінки — inert, прокрутка заблокована
	 * без «стрибка» (місце під скролбар зарезервоване через scrollbar-gutter).
	 */
	let {
		open = $bindable(false),
		labelledby,
		side = 'center',
		width = 'max-w-lg',
		closeLabel = 'Закрити',
		children
	}: {
		open?: boolean;
		labelledby: string;
		side?: 'center' | 'right' | 'left';
		width?: string;
		closeLabel?: string;
		children: Snippet;
	} = $props();

	let panel = $state<HTMLDivElement>();
	let openCount = 0;

	const FOCUSABLE =
		'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

	function portal(node: HTMLElement) {
		document.body.appendChild(node);
		return { destroy: () => node.remove() };
	}

	$effect(() => {
		if (!open) return;
		const returnTo = document.activeElement as HTMLElement | null;
		const page = document.getElementById('page');
		openCount = Number(document.documentElement.dataset.overlays ?? 0) + 1;
		document.documentElement.dataset.overlays = String(openCount);
		page?.setAttribute('inert', '');
		document.documentElement.classList.add('scroll-lock');
		requestAnimationFrame(() =>
			(panel?.querySelector<HTMLElement>('[data-autofocus]') ?? panel)?.focus()
		);

		const onKey = (e: KeyboardEvent) => {
			if (!panel) return;
			const top = [...document.querySelectorAll('[data-overlay]')].at(-1);
			if (top !== panel) return;
			if (e.key === 'Escape') {
				e.preventDefault();
				open = false;
			} else if (e.key === 'Tab') {
				const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
					(el) => el.offsetParent !== null
				);
				if (!items.length) return e.preventDefault();
				const first = items[0];
				const last = items[items.length - 1];
				if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
					e.preventDefault();
					last.focus();
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		};
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('keydown', onKey);
			const left = Number(document.documentElement.dataset.overlays ?? 1) - 1;
			document.documentElement.dataset.overlays = String(left);
			if (left <= 0) {
				page?.removeAttribute('inert');
				document.documentElement.classList.remove('scroll-lock');
			}
			if (returnTo?.isConnected) returnTo.focus({ preventScroll: true });
		};
	});

	const slide = (node: Element) =>
		side === 'center'
			? fly(node, { y: 16, duration: reducedMotion() ? 0 : 220, opacity: 0 })
			: fly(node, {
					x: side === 'right' ? 420 : -420,
					duration: reducedMotion() ? 0 : 280,
					opacity: 1
				});
</script>

{#if open}
	<div
		use:portal
		class="fixed inset-0 z-50 flex {side === 'center'
			? 'items-end justify-center sm:items-center sm:p-6'
			: side === 'right'
				? 'justify-end'
				: 'justify-start'}"
	>
		<button
			type="button"
			class="absolute inset-0 cursor-default bg-ink/40"
			tabindex="-1"
			aria-label={closeLabel}
			onclick={() => (open = false)}
			transition:fade={{ duration: 180 }}
		></button>
		<div
			bind:this={panel}
			data-overlay
			role="dialog"
			aria-modal="true"
			aria-labelledby={labelledby}
			tabindex="-1"
			class="relative flex max-h-full w-full flex-col bg-white outline-none {side === 'center'
				? `${width} max-h-[92svh] sm:rounded-[var(--radius-sm)]`
				: `h-full ${width}`}"
			transition:slide
		>
			<button
				type="button"
				class="icon-btn absolute top-3 right-3 z-10"
				onclick={() => (open = false)}
				aria-label={closeLabel}
			>
				<X size={18} />
			</button>
			{@render children()}
		</div>
	</div>
{/if}
