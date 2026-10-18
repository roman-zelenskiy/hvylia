<script lang="ts">
	import { t } from '#lib/ui.ts';
	import { formatPhone, isValidPhone } from '#lib/phone.ts';

	/** Телефон з маскою +380 (XX) XXX-XX-XX */
	let {
		value = $bindable(''),
		id,
		label = t.phone,
		error = '',
		required = true
	}: { value?: string; id: string; label?: string; error?: string; required?: boolean } = $props();
	const valid = $derived(isValidPhone(value));
</script>

<div>
	<label for={id} class="field-label">{label}</label>
	<input
		{id}
		type="tel"
		inputmode="tel"
		autocomplete="tel"
		placeholder="+380 (__) ___-__-__"
		class={['field mono', valid && !error && 'is-valid']}
		{required}
		{value}
		oninput={(e) => {
			value = formatPhone(e.currentTarget.value);
			e.currentTarget.value = value;
		}}
		aria-invalid={!!error}
		aria-describedby={error ? `${id}-e` : undefined}
	/>
	{#if error}<p id="{id}-e" class="field-error">{error}</p>{/if}
</div>
