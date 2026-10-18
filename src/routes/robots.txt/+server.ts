import { siteUrl } from '#lib/data/site.ts';

export const prerender = true;

// службові сторінки (кошик, checkout, порівняння, обране, пошук) закриті meta noindex,
// а не Disallow — інакше пошуковик не побачить сам noindex
export function GET() {
	return new Response(
		[
			'User-agent: *',
			'Allow: /',
			'Disallow: /uk/api/',
			'Disallow: /en/api/',
			'Disallow: /uk/order',
			'Disallow: /en/order',
			'',
			`Sitemap: ${siteUrl}/sitemap.xml`,
			''
		].join('\n'),
		{
			headers: { 'Content-Type': 'text/plain; charset=utf-8' }
		}
	);
}
