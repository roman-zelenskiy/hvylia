/** English info pages. Slugs are shared with ../info.uk.ts */
import type { InfoPage } from '../info.uk.ts';

export type { InfoPage } from '../info.uk.ts';

export const info: Record<string, InfoPage> = {
	'dostavka-i-oplata': {
		slug: 'dostavka-i-oplata',
		h1: 'Delivery and payment',
		title: 'Delivery and payment — Nova Poshta across Ukraine | Hvylia',
		description:
			'Audio gear delivered by Nova Poshta in 1–3 days, free from 3,000 UAH. Pay by card, cash on delivery or in instalments.',
		lead: 'We ship every day until 18:00. Free delivery from 3,000 UAH.',
		sections: [
			{
				title: 'Nova Poshta',
				paragraphs: [
					'Orders placed before 18:00 ship the same day. Delivery takes 1–3 days anywhere in Ukraine.'
				],
				list: [
					'Branch — from 70 UAH',
					'Parcel locker — from 60 UAH, for parcels up to 30 kg',
					'Courier — from 110 UAH',
					'From 3,000 UAH — free by any method'
				]
			},
			{
				title: 'Payment',
				paragraphs: [
					'Pay the way you like: by card online, cash on delivery at the branch, or in interest-free instalments.'
				],
				list: [
					'Visa or Mastercard, Apple Pay, Google Pay',
					'Cash on delivery — Nova Poshta fee of 20 UAH + 2%',
					'3–10 instalments for orders from 3,000 UAH'
				]
			},
			{
				title: 'Checking your parcel',
				paragraphs: [
					'Inspect the parcel at the branch. If the box is damaged, file a report with the operator and we’ll replace the item at our expense.'
				]
			}
		]
	},
	'harantiia-ta-povernennia': {
		slug: 'harantiia-ta-povernennia',
		h1: 'Warranty and returns',
		title: 'Up to a 3-year warranty and 30-day returns | Hvylia',
		description:
			'Official manufacturer warranty of up to 3 years and 30-day returns with no questions asked. How to return or exchange an item.',
		lead: 'Official warranty of up to 36 months and 30-day returns.',
		sections: [
			{
				title: 'Warranty',
				paragraphs: [
					'All equipment comes with an official manufacturer warranty of 12 to 36 months — the exact period is on the product page. Warranty repairs are done by authorised service centres, and we pay for shipping to the service.'
				]
			},
			{
				title: '30-day returns',
				paragraphs: ['If an item doesn’t suit you, return it within 30 days — no questions asked.'],
				list: [
					'Keep the box contents, packaging and condition intact',
					'In-ear headphones are accepted only sealed (hygiene requirements)',
					'We refund to your card within 3 working days'
				]
			},
			{
				title: 'How to arrange it',
				paragraphs: [
					'Write to hello@hvylia.com.ua or call 0 800 33 41 77. We’ll send you a return waybill — you don’t pay for shipping.'
				]
			}
		]
	},
	'pro-nas': {
		slug: 'pro-nas',
		h1: 'About Hvylia',
		title: 'About us — Hvylia audio store',
		description:
			'Hvylia is a Kyiv audio store with a showroom and audio experts. We only sell what we’ve listened to ourselves.',
		lead: 'Audio gear for people who listen closely.',
		sections: [
			{
				title: 'Who we are',
				paragraphs: [
					'Hvylia started in 2019 as a showroom on Velyka Vasylkivska St where you could take your time listening to headphones before buying. Today we ship across Ukraine, but the principle hasn’t changed: we only sell what we’ve listened to ourselves.'
				]
			},
			{
				title: 'Audio experts',
				paragraphs: [
					'Our advisers are sound engineers and musicians. They’ll help you choose headphones for your phone, put together a first vinyl system or set up an equaliser.'
				]
			},
			{
				title: 'Official',
				paragraphs: [
					'We work directly with manufacturers, so we give an official warranty and stock spare parts: ear pads, cables, styli.'
				]
			}
		]
	},
	kontakty: {
		slug: 'kontakty',
		h1: 'Contacts',
		title: 'Contacts — showroom and audio expert | Hvylia',
		description:
			'Hvylia’s showroom in Kyiv, audio expert line 0 800 33 41 77, Telegram and email. Open daily 9:00–21:00.',
		lead: 'An audio expert is available daily from 9:00 to 21:00.',
		sections: [
			{
				title: 'Phone and messengers',
				paragraphs: [
					'0 800 33 41 77 — free within Ukraine.',
					'Telegram: @hvylia_audio · Email: hello@hvylia.com.ua'
				]
			},
			{
				title: 'Showroom',
				paragraphs: [
					'Kyiv, 72 Velyka Vasylkivska St (5 minutes from Olimpiiska metro).',
					'Daily 10:00–20:00. You can listen to any model — bring your phone and favourite tracks.'
				]
			},
			{
				title: 'Company details',
				paragraphs: ['Hvylia Audio LLC. Demo details for a portfolio project.']
			}
		]
	},
	faq: {
		slug: 'faq',
		h1: 'Questions and answers',
		title: 'Questions and answers — FAQ | Hvylia',
		description:
			'Answers to common questions about delivery, payment, warranty, returns and choosing audio gear at Hvylia.',
		lead: 'Didn’t find an answer? Call an audio expert.',
		sections: [],
		faq: [
			{
				q: 'How long does delivery take?',
				a: '1–3 days by Nova Poshta. Orders placed before 18:00 ship the same day.'
			},
			{
				q: 'Can I listen before buying?',
				a: 'Yes, in our Kyiv showroom. And if you bought online and don’t like it, you have 30 days to return it.'
			},
			{
				q: 'Is the warranty official?',
				a: 'Yes, all equipment has an official manufacturer warranty of 12 to 36 months.'
			},
			{
				q: 'How does a promo code work?',
				a: 'Enter the code in the cart or at checkout. For the demo, HVYLIA10 works — −10% on your order.'
			},
			{
				q: 'Can I pay in instalments?',
				a: 'Yes, for orders from 3,000 UAH — 3–10 payments with no overpayment.'
			},
			{
				q: 'Do the wireless headphones work with iPhone and Android?',
				a: 'Yes, all our wireless models work with both platforms. On Android, the extra LDAC and aptX codecs are available.'
			}
		]
	},
	'polityka-konfidentsiinosti': {
		slug: 'polityka-konfidentsiinosti',
		h1: 'Privacy policy',
		title: 'Privacy policy | Hvylia',
		description:
			'How Hvylia handles data: the demo store keeps your cart, wishlist and comparison only in your browser.',
		lead: 'This is a demo project: your data isn’t sent anywhere.',
		sections: [
			{
				title: 'What is stored',
				paragraphs: [
					'Your cart, wishlist, comparison, recently viewed products and recent searches are kept in your browser’s localStorage. We have no access to them.'
				]
			},
			{
				title: 'Orders and forms',
				paragraphs: [
					'Checkout, reviews, “Buy in 1 click” and the newsletter work in demo mode: no data is sent to a server. Your card number isn’t stored even in the browser.'
				]
			},
			{
				title: 'Cookies and analytics',
				paragraphs: ['The site uses no advertising cookies or analytics.']
			}
		]
	}
};
