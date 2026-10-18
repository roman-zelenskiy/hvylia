/** Домен для canonical, Open Graph і sitemap (заглушка — замініть на свій) */
export const siteUrl = 'https://hvylia.com.ua';

export const shop = {
	name: 'Хвиля',
	tagline: 'Аудіотехніка для тих, хто слухає уважно',
	legalName: 'ТОВ «Хвиля Аудіо»',
	phone: '0 800 33 41 77',
	phoneHref: 'tel:+380800334177',
	email: 'hello@hvylia.com.ua',
	hours: 'Щодня 9:00–21:00',
	city: 'Київ',
	street: 'вул. Велика Васильківська, 72',
	postalCode: '03150',
	telegram: 'https://t.me/hvylia_audio',
	instagram: 'https://instagram.com/hvylia.audio',
	youtube: 'https://youtube.com/@hvylia'
};

export const FREE_SHIPPING_FROM = 3000;
export const RETURN_DAYS = 30;

export const promoCodes: Record<string, { percent: number; label: string }> = {
	HVYLIA10: { percent: 10, label: '−10% на замовлення' }
};

export const perks = [
	{ icon: 'shield', title: 'Гарантія до 3 років', text: 'Офіційна гарантія виробника' },
	{ icon: 'undo', title: '30 днів на повернення', text: 'Без пояснення причин' },
	{ icon: 'truck', title: 'Безкоштовна доставка', text: 'Від 3000 грн по Україні' },
	{ icon: 'headphones', title: 'Аудіо-експерт', text: 'Підбір і налаштування' }
] as const;
