<script lang="ts">
	import { resolve } from '$app/paths';
	import { detectScript } from '#lib/lang.ts';
	import Logo from '#lib/components/ui/Logo.svelte';

	const base = resolve('/').replace(/\/$/, '');
	// тег збираємо з частин, щоб розмітка компонента не сприйняла його як свій
	const inline = '<scr' + 'ipt>' + detectScript(base) + '</scr' + 'ipt>';
</script>

<svelte:head>
	<title>Хвиля · Hvylia — аудіотехніка · audio gear</title>
	<meta name="robots" content="noindex, follow" />
	<link rel="alternate" hreflang="uk" href="{base}/uk" />
	<link rel="alternate" hreflang="en" href="{base}/en" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- власний статичний скрипт вибору мови -->
	{@html inline}
</svelte:head>

<!-- Корінь сайту: скрипт вище переводить на /uk або /en; без JS лишаються посилання -->
<main class="wrap grid min-h-[100svh] place-content-center gap-8 text-center">
	<div class="mx-auto"><Logo /></div>
	<p class="flex flex-wrap justify-center gap-3">
		<a href="{base}/uk" lang="uk" class="btn btn-primary btn-md">Українською</a>
		<a href="{base}/en" lang="en" class="btn btn-secondary btn-md">English</a>
	</p>
</main>
