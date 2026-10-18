/** English store data. Same shape as ../site.uk.ts */
import * as uk from '../site.uk.ts';

export const siteUrl = uk.siteUrl;

export const shop: typeof uk.shop = {
	...uk.shop,
	name: 'Hvylia',
	tagline: 'Audio gear for people who listen closely',
	legalName: 'Hvylia Audio LLC',
	hours: 'Daily 9:00–21:00',
	city: 'Kyiv',
	street: '72 Velyka Vasylkivska St'
};

export const FREE_SHIPPING_FROM = uk.FREE_SHIPPING_FROM;
export const RETURN_DAYS = uk.RETURN_DAYS;

export const promoCodes: typeof uk.promoCodes = {
	HVYLIA10: { percent: 10, label: '−10% on your order' }
};

export const perks = [
	{ icon: 'shield', title: 'Up to 3-year warranty', text: 'Official manufacturer warranty' },
	{ icon: 'undo', title: '30-day returns', text: 'No questions asked' },
	{ icon: 'truck', title: 'Free delivery', text: 'From 3,000 UAH across Ukraine' },
	{ icon: 'headphones', title: 'Audio expert', text: 'Selection and setup help' }
] as unknown as typeof uk.perks;
