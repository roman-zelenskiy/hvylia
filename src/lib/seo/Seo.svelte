<script lang="ts">
	import { siteUrl, shop } from '#lib/data/site.ts';

	/**
	 * Мета-теги сторінки. canonical завжди без query (фільтри й пагінація вказують на основну сторінку),
	 * службові сторінки — noindex. JSON-LD серіалізуємо безпечно (без закриття script зсередини).
	 */
	let {
		title,
		description,
		path,
		noindex = false,
		image = '/og-image.jpg',
		type = 'website',
		jsonld = []
	}: {
		title: string;
		description: string;
		path: string;
		noindex?: boolean;
		image?: string;
		type?: string;
		jsonld?: object[];
	} = $props();

	const canonical = $derived(`${siteUrl}${path === '/' ? '/' : path}`);
	const img = $derived(image.startsWith('http') ? image : `${siteUrl}${image}`);
	const ld = $derived(
		jsonld.length
			? '<script type="application/ld+json">' +
					JSON.stringify(
						jsonld.length === 1 ? jsonld[0] : { '@context': 'https://schema.org', '@graph': jsonld }
					).replace(/</g, '\\u003c') +
					'</' +
					'script>'
			: ''
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#if noindex}<meta name="robots" content="noindex, follow" />{/if}
	<meta property="og:type" content={type} />
	<meta property="og:locale" content="uk_UA" />
	<meta property="og:site_name" content="«{shop.name}» — аудіотехніка" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={img} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={img} />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html ld}
</svelte:head>
