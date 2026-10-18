import { brands } from '#lib/data/brands.ts';
import { categories } from '#lib/data/categories.ts';
import { info } from '#lib/data/info.ts';
import { landings } from '#lib/data/landings.ts';
import { products } from '#lib/data/products.ts';
import { siteUrl } from '#lib/data/site.ts';

export const prerender = true;

export function GET() {
	const today = '2026-10-18';
	const urls: { loc: string; lastmod: string; priority: string }[] = [
		{ loc: '/', lastmod: today, priority: '1.0' },
		...categories.flatMap((c) => [
			{ loc: `/${c.slug}`, lastmod: today, priority: '0.9' },
			...c.subs.map((s) => ({ loc: `/${c.slug}/${s.slug}`, lastmod: today, priority: '0.8' }))
		]),
		...landings.map((l) => ({ loc: `/${l.category}/${l.slug}`, lastmod: today, priority: '0.8' })),
		...products.map((p) => ({ loc: `/product/${p.slug}`, lastmod: p.createdAt, priority: '0.7' })),
		{ loc: '/brand', lastmod: today, priority: '0.5' },
		...brands.map((b) => ({ loc: `/brand/${b.slug}`, lastmod: today, priority: '0.5' })),
		...Object.keys(info).map((slug) => ({ loc: `/${slug}`, lastmod: today, priority: '0.3' }))
	];
	// кожна сторінка — у двох мовних версіях з посиланнями одна на одну (hreflang)
	const at = (l: string, loc: string) => `${siteUrl}/${l}${loc === '/' ? '' : loc}`;
	const alt = (loc: string) =>
		['uk', 'en', 'x-default']
			.map(
				(l) =>
					`<xhtml:link rel="alternate" hreflang="${l}" href="${at(l === 'x-default' ? 'uk' : l, loc)}"/>`
			)
			.join('');
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${['uk', 'en']
	.flatMap((l) =>
		urls.map(
			(u) =>
				`\t<url><loc>${at(l, u.loc)}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority>${alt(u.loc)}</url>`
		)
	)
	.join('\n')}
</urlset>`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
