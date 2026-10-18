<script lang="ts">
	import { resolve } from '$app/paths';
	import { tEn, tUk } from '#lib/ui.ts';

	const base = resolve('/').replace(/\/$/, '');
	// «зламана» хвиля: штрихи обриваються посередині — тиша на місці сторінки
	const bars = Array.from({ length: 48 }, (_, i) =>
		Math.round(8 + 34 * Math.abs(Math.sin(i * 0.45)) * (i > 18 && i < 30 ? 0.06 : 1))
	);
	/** Мову обирає крихітний скрипт за адресою; обидві версії тексту вже в HTML */
	const pickLangSrc = `(function(){var en=/\\/en(\\/|$)/.test(location.pathname);document.documentElement.lang=en?'en':'uk';document.documentElement.dataset.nf=en?'en':'uk'})()`;
	const inline =
		'<scr' +
		'ipt>' +
		pickLangSrc +
		'</scr' +
		'ipt><style>html[data-nf=en] [data-nf-lang=uk],html:not([data-nf=en]) [data-nf-lang=en]{display:none}</style>';
</script>

<svelte:head>
	<title>404 — Хвиля · Hvylia</title>
	<meta name="robots" content="noindex" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- власний статичний скрипт -->
	{@html inline}
</svelte:head>

<!-- пререндериться у 404.html: статичний хостинг (GitHub Pages) віддає його з кодом 404 для будь-якої невідомої адреси -->
<main id="main" class="wrap max-w-3xl pt-24 pb-16 text-center">
	<svg
		class="mx-auto h-16 w-full max-w-md"
		viewBox="0 0 {48 * 8} 64"
		preserveAspectRatio="none"
		aria-hidden="true"
	>
		{#each bars as h, i (i)}<rect
				x={i * 8 + 2}
				y={(64 - h) / 2}
				width="2"
				height={h}
				rx="1"
				fill={i > 18 && i < 30 ? 'var(--color-line-2)' : 'var(--color-ink)'}
			/>{/each}
	</svg>
	<p class="mono mt-8 text-sm text-blue">404</p>
	{#each [['uk', tUk], ['en', tEn]] as const as [l, t] (l)}
		<div data-nf-lang={l}>
			<h1 class="h-display mt-3 text-[clamp(2rem,5vw,3.5rem)]">{t.nf.title}</h1>
			<p class="mx-auto mt-4 max-w-md text-graphite">{t.nf.textShort}</p>
			<a href="{base}/{l}" class="btn btn-primary btn-md mt-10">{t.nf.home}</a>
		</div>
	{/each}
</main>
