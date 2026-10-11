<script lang="ts">
	import { X } from '@lucide/svelte';
	import { promoCodes } from '#lib/data/site.ts';
	import { announce, cart } from '#lib/stores/shop.svelte.ts';

	let code = $state('');
	let error = $state('');
	function apply(e: SubmitEvent) {
		e.preventDefault();
		if (!code.trim()) return (error = 'Введіть промокод');
		if (!cart.applyPromo(code)) return (error = 'Такого промокоду немає. Спробуйте HVYLIA10');
		error = '';
		code = '';
		announce('Промокод застосовано');
	}
</script>

{#if cart.promo}
	<div class="flex items-center justify-between gap-2 bg-blue-soft px-3 py-2 text-sm">
		<span
			><span class="mono font-medium text-blue">{cart.promo}</span> — {promoCodes[cart.promo]
				.label}</span
		>
		<button
			type="button"
			class="icon-btn !h-8 !w-8"
			aria-label="Прибрати промокод"
			onclick={() => cart.clearPromo()}><X size={15} /></button
		>
	</div>
{:else}
	<form class="grid gap-1" novalidate onsubmit={apply}>
		<label for="promo" class="field-label">Промокод</label>
		<div class="flex gap-2">
			<input
				id="promo"
				class="field mono uppercase"
				placeholder="HVYLIA10"
				autocomplete="off"
				bind:value={code}
				oninput={() => (error = '')}
				aria-invalid={!!error}
				aria-describedby={error ? 'promo-e' : undefined}
			/>
			<button type="submit" class="btn btn-secondary btn-md shrink-0">Застосувати</button>
		</div>
		{#if error}<p id="promo-e" class="field-error" role="alert">{error}</p>{/if}
	</form>
{/if}
