export type Stock = 'in' | 'low' | 'out';
export type Badge = 'hit' | 'new';
export type HeadphoneType = 'tws' | 'on-ear' | 'over-ear' | 'in-ear' | 'gaming';
export type Connection = 'bluetooth' | 'wired' | 'wifi' | 'usb' | 'radio';

export type Color = { id: string; name: string; hex: string };

export type SpecRow = { label: string; value: string };
export type SpecGroup = { title: string; rows: SpecRow[] };

export type Product = {
	id: string;
	slug: string;
	name: string;
	brand: string;
	category: string;
	sub: string;
	price: number;
	oldPrice?: number;
	stock: Stock;
	badges: Badge[];
	colors: Color[];
	/** Імена файлів у src/lib/assets/products (3 кадри) */
	images: [string, string, string];
	alt: string;
	short: string;
	description: string[];
	highlights: string[];
	/** Поля для фільтрів */
	facets: {
		type: string;
		connection: Connection[];
		anc: boolean;
		codecs?: string[];
		batteryH?: number;
		waterproof?: string;
	};
	specs: SpecGroup[];
	popularity: number;
	createdAt: string;
	/** «З цим купують» */
	together: string[];
	warrantyMonths: number;
};

export type Brand = {
	slug: string;
	name: string;
	country: string;
	founded: number;
	tagline: string;
	about: string[];
};

export type Sub = { slug: string; name: string; h1: string; lead: string };

export type Category = {
	slug: string;
	name: string;
	h1: string;
	lead: string;
	subs: Sub[];
	seoTitle: string;
	seoDescription: string;
	seoText: { title: string; paragraphs: string[] }[];
	faq: { q: string; a: string }[];
};

export type Review = {
	id: string;
	product: string;
	author: string;
	city: string;
	rating: 1 | 2 | 3 | 4 | 5;
	date: string;
	title: string;
	text: string;
	pros?: string;
	cons?: string;
	verified: boolean;
};

export type Question = {
	id: string;
	product: string;
	author: string;
	date: string;
	q: string;
	a: string;
};

export type Landing = {
	category: string;
	slug: string;
	h1: string;
	title: string;
	description: string;
	lead: string;
	text: { title: string; paragraphs: string[] }[];
	/** Пресет фільтра: які товари потрапляють на сторінку */
	match: (p: Product) => boolean;
	faq: { q: string; a: string }[];
};
