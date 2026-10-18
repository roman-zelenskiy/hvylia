import { t } from '#lib/ui.ts';
import { lang } from '#lib/lang.ts';
import { shop, siteUrl, RETURN_DAYS } from '#lib/data/site.ts';
import type { Summary } from '#lib/catalog/query.ts';
import type { Brand, Product, Review } from '#lib/data/types.ts';

const abs = (path: string) =>
	path.startsWith('http') ? path : `${siteUrl}/${lang}${path === '/' ? '' : path}`;

export const ids = { org: `${siteUrl}/#organization`, site: `${siteUrl}/#website` };

export function organization() {
	return {
		'@type': ['Organization', 'OnlineStore'],
		'@id': ids.org,
		name: `«${shop.name}»`,
		legalName: shop.legalName,
		url: `${siteUrl}/`,
		logo: `${siteUrl}/favicon.svg`,
		telephone: '+380800334177',
		email: shop.email,
		address: {
			'@type': 'PostalAddress',
			streetAddress: shop.street,
			addressLocality: shop.city,
			postalCode: shop.postalCode,
			addressCountry: 'UA'
		},
		sameAs: [shop.instagram, shop.telegram, shop.youtube],
		hasMerchantReturnPolicy: returnPolicy()
	};
}

export function website() {
	return {
		'@type': 'WebSite',
		'@id': ids.site,
		url: `${siteUrl}/`,
		name: t.seo.siteName(shop.name),
		inLanguage: t.seo.inLanguage,
		publisher: { '@id': ids.org },
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${siteUrl}/${lang}/search?q={search_term_string}`
			},
			'query-input': 'required name=search_term_string'
		}
	};
}

export function breadcrumbs(items: { href?: string; label: string }[], current: string) {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: items.map((c, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: c.label,
			item: abs(c.href ?? current)
		}))
	};
}

export function collection(name: string, description: string, path: string, items: Summary[]) {
	return {
		'@type': 'CollectionPage',
		name,
		description,
		url: abs(path),
		isPartOf: { '@id': ids.site },
		mainEntity: {
			'@type': 'ItemList',
			numberOfItems: items.length,
			itemListElement: items.map((p, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				url: abs(`/product/${p.slug}`),
				name: p.name
			}))
		}
	};
}

export function faqPage(items: readonly { q: string; a: string }[]) {
	return {
		'@type': 'FAQPage',
		mainEntity: items.map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a }
		}))
	};
}

function returnPolicy() {
	return {
		'@type': 'MerchantReturnPolicy',
		applicableCountry: 'UA',
		returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
		merchantReturnDays: RETURN_DAYS,
		returnMethod: 'https://schema.org/ReturnByMail',
		returnFees: 'https://schema.org/FreeReturn'
	};
}

const availability = { in: 'InStock', low: 'LimitedAvailability', out: 'OutOfStock' } as const;

export function product(
	p: Product,
	brand: Brand,
	images: string[],
	rating: { value: number; count: number },
	reviews: Review[]
) {
	return {
		'@type': 'Product',
		'@id': `${abs(`/product/${p.slug}`)}#product`,
		name: p.name,
		sku: p.id,
		description: p.short,
		image: images.map(abs),
		brand: { '@type': 'Brand', name: brand.name, url: abs(`/brand/${brand.slug}`) },
		color: p.colors.map((c) => c.name).join(', '),
		category: p.category,
		offers: {
			'@type': 'Offer',
			url: abs(`/product/${p.slug}`),
			price: p.price.toFixed(2),
			priceCurrency: 'UAH',
			availability: `https://schema.org/${availability[p.stock]}`,
			itemCondition: 'https://schema.org/NewCondition',
			seller: { '@id': ids.org },
			hasMerchantReturnPolicy: returnPolicy(),
			shippingDetails: {
				'@type': 'OfferShippingDetails',
				shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'UA' },
				shippingRate: {
					'@type': 'MonetaryAmount',
					value: p.price >= 3000 ? 0 : 80,
					currency: 'UAH'
				},
				deliveryTime: {
					'@type': 'ShippingDeliveryTime',
					handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
					transitTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 3, unitCode: 'DAY' }
				}
			}
		},
		...(rating.count && {
			aggregateRating: {
				'@type': 'AggregateRating',
				ratingValue: rating.value,
				reviewCount: rating.count,
				bestRating: 5,
				worstRating: 1
			},
			review: reviews.slice(0, 5).map((r) => ({
				'@type': 'Review',
				author: { '@type': 'Person', name: r.author },
				datePublished: r.date,
				name: r.title,
				reviewBody: r.text,
				reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 }
			}))
		})
	};
}

export function brandLd(b: Brand) {
	return {
		'@type': 'Brand',
		name: b.name,
		slogan: b.tagline,
		description: b.about[0],
		url: abs(`/brand/${b.slug}`)
	};
}
