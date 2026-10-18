import { onLang } from '#lib/lang-core.ts';
/**
 * Каталожний «рушій»: фільтри, фасети з лічильниками, сортування, пагінація.
 * Чистий модуль — однаково працює під час пререндеру (сервер) і в браузері (фільтри з URL).
 */

export type Summary = {
	slug: string;
	name: string;
	brand: string;
	brandName: string;
	category: string;
	sub: string;
	price: number;
	oldPrice?: number;
	stock: 'in' | 'low' | 'out';
	badges: ('hit' | 'new')[];
	image: string;
	alt: string;
	short: string;
	highlights: string[];
	colors: { id: string; name: string; hex: string }[];
	type: string;
	connection: string[];
	anc: boolean;
	rating: number;
	reviews: number;
	popularity: number;
	createdAt: string;
};

export type SortId = 'popular' | 'cheap' | 'expensive' | 'new' | 'rating';

const sortsUk: { id: SortId; label: string }[] = [
	{ id: 'popular', label: 'Популярні' },
	{ id: 'cheap', label: 'Спершу дешевші' },
	{ id: 'expensive', label: 'Спершу дорожчі' },
	{ id: 'new', label: 'Новинки' },
	{ id: 'rating', label: 'За рейтингом' }
];

const typeUk: Record<string, string> = {
	tws: 'TWS',
	'on-ear': 'Накладні',
	'over-ear': 'Повнорозмірні',
	'in-ear': 'Внутрішньоканальні',
	gaming: 'Ігрова гарнітура',
	portable: 'Портативна',
	bookshelf: 'Полична',
	soundbar: 'Саундбар',
	smart: 'Розумна',
	turntable: 'Програвач',
	record: 'Платівка',
	care: 'Догляд',
	amplifier: 'Підсилювач',
	dac: 'ЦАП',
	cable: 'Кабель',
	pads: 'Амбушури',
	stand: 'Підставка'
};

const connUk: Record<string, string> = {
	bluetooth: 'Bluetooth',
	wired: 'Дротове',
	wifi: 'Wi-Fi',
	usb: 'USB',
	radio: 'Радіо 2,4 ГГц'
};

const sortsEn: { id: SortId; label: string }[] = [
	{ id: 'popular', label: 'Popular' },
	{ id: 'cheap', label: 'Price: low to high' },
	{ id: 'expensive', label: 'Price: high to low' },
	{ id: 'new', label: 'Newest' },
	{ id: 'rating', label: 'Top rated' }
];
const typeEn: Record<string, string> = {
	tws: 'TWS',
	'on-ear': 'On-ear',
	'over-ear': 'Over-ear',
	'in-ear': 'In-ear',
	gaming: 'Gaming headset',
	portable: 'Portable',
	bookshelf: 'Bookshelf',
	soundbar: 'Soundbar',
	smart: 'Smart',
	turntable: 'Turntable',
	record: 'Record',
	care: 'Care',
	amplifier: 'Amplifier',
	dac: 'DAC',
	cable: 'Cable',
	pads: 'Ear pads',
	stand: 'Stand'
};
const connEn: Record<string, string> = {
	bluetooth: 'Bluetooth',
	wired: 'Wired',
	wifi: 'Wi-Fi',
	usb: 'USB',
	radio: '2.4 GHz radio'
};

/** Підписи мовою сторінки (живі прив’язки, див. #lib/lang.ts) */
export let sorts = sortsUk;
export let typeLabel = typeUk;
export let connectionLabel = connUk;
onLang((l) => {
	sorts = l === 'en' ? sortsEn : sortsUk;
	typeLabel = l === 'en' ? typeEn : typeUk;
	connectionLabel = l === 'en' ? connEn : connUk;
});

export type Filters = {
	q: string;
	priceMin: number | null;
	priceMax: number | null;
	brand: string[];
	type: string[];
	conn: string[];
	anc: boolean;
	color: string[];
	inStock: boolean;
	rating: number;
	sort: SortId;
	page: number;
	/** Скільки сторінок показано через «Показати ще» (1 — лише поточна) */
	more: number;
};

export const PER_PAGE = 8;

export type FilterKey = 'price' | 'brand' | 'type' | 'conn' | 'anc' | 'color' | 'stock' | 'rating';

export const emptyFilters: Filters = {
	q: '',
	priceMin: null,
	priceMax: null,
	brand: [],
	type: [],
	conn: [],
	anc: false,
	color: [],
	inStock: false,
	rating: 0,
	sort: 'popular',
	page: 1,
	more: 1
};

const list = (v: string | null) => (v ? v.split(',').filter(Boolean) : []);
const num = (v: string | null) => (v && /^\d+$/.test(v) ? Number(v) : null);

/** URL ?brand=aurel,kobza&price=1000-5000&sort=cheap&page=2 → Filters */
export function parseFilters(params: { get(name: string): string | null }): Filters {
	const [min, max] = (params.get('price') ?? '').split('-');
	const sort = params.get('sort') as SortId | null;
	return {
		q: params.get('q')?.trim().slice(0, 80) ?? '',
		priceMin: num(min ?? null),
		priceMax: num(max ?? null),
		brand: list(params.get('brand')),
		type: list(params.get('type')),
		conn: list(params.get('conn')),
		anc: params.get('anc') === '1',
		color: list(params.get('color')),
		inStock: params.get('stock') === '1',
		rating: Math.min(5, Math.max(0, num(params.get('rating')) ?? 0)),
		sort: sorts.some((s) => s.id === sort) ? (sort as SortId) : 'popular',
		page: Math.max(1, num(params.get('page')) ?? 1),
		more: Math.max(1, Math.min(10, num(params.get('more')) ?? 1))
	};
}

/** Filters → рядок query (порожні значення не пишемо — короткі «чисті» URL) */
export function serializeFilters(f: Filters): string {
	const p = new URLSearchParams();
	if (f.q) p.set('q', f.q);
	if (f.brand.length) p.set('brand', f.brand.join(','));
	if (f.type.length) p.set('type', f.type.join(','));
	if (f.conn.length) p.set('conn', f.conn.join(','));
	if (f.anc) p.set('anc', '1');
	if (f.color.length) p.set('color', f.color.join(','));
	if (f.priceMin !== null || f.priceMax !== null)
		p.set('price', `${f.priceMin ?? ''}-${f.priceMax ?? ''}`);
	if (f.inStock) p.set('stock', '1');
	if (f.rating) p.set('rating', String(f.rating));
	if (f.sort !== 'popular') p.set('sort', f.sort);
	if (f.page > 1) p.set('page', String(f.page));
	if (f.more > 1) p.set('more', String(f.more));
	const s = p.toString();
	return s ? `?${s.replace(/%2C/g, ',')}` : '';
}

/** Чи є в URL хоч один фільтр (для noindex і скидання) */
export const hasActiveFilters = (f: Filters) =>
	!!(
		f.q ||
		f.brand.length ||
		f.type.length ||
		f.conn.length ||
		f.anc ||
		f.color.length ||
		f.priceMin !== null ||
		f.priceMax !== null ||
		f.inStock ||
		f.rating
	);

const norm = (s: string) =>
	s
		.toLowerCase()
		.replace(/[’ʼ'`«»"]/g, '')
		.replace(/ё/g, 'е');

export function matchesText(p: Summary, q: string) {
	const hay = norm(`${p.name} ${p.brandName} ${p.short} ${typeLabel[p.type] ?? ''}`);
	return norm(q)
		.split(/\s+/)
		.filter(Boolean)
		.every((w) => hay.includes(w));
}

type Facet = 'brand' | 'type' | 'conn' | 'color' | 'price' | 'anc' | 'stock' | 'rating';

function pass(p: Summary, f: Filters, skip?: Facet) {
	if (f.q && !matchesText(p, f.q)) return false;
	if (skip !== 'brand' && f.brand.length && !f.brand.includes(p.brand)) return false;
	if (skip !== 'type' && f.type.length && !f.type.includes(p.type)) return false;
	if (skip !== 'conn' && f.conn.length && !f.conn.some((c) => p.connection.includes(c)))
		return false;
	if (skip !== 'color' && f.color.length && !p.colors.some((c) => f.color.includes(c.id)))
		return false;
	if (skip !== 'anc' && f.anc && !p.anc) return false;
	if (skip !== 'stock' && f.inStock && p.stock === 'out') return false;
	if (skip !== 'rating' && f.rating && p.rating < f.rating) return false;
	if (skip !== 'price') {
		if (f.priceMin !== null && p.price < f.priceMin) return false;
		if (f.priceMax !== null && p.price > f.priceMax) return false;
	}
	return true;
}

const sorters: Record<SortId, (a: Summary, b: Summary) => number> = {
	popular: (a, b) => b.popularity - a.popularity,
	cheap: (a, b) => a.price - b.price,
	expensive: (a, b) => b.price - a.price,
	new: (a, b) => b.createdAt.localeCompare(a.createdAt),
	rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews
};

export type FacetValue = { value: string; label: string; count: number; hex?: string };

export type QueryResult = {
	items: Summary[];
	total: number;
	page: number;
	pages: number;
	/** Діапазон цін у межах розділу (для слайдера) */
	priceBounds: { min: number; max: number };
	facets: {
		brand: FacetValue[];
		type: FacetValue[];
		conn: FacetValue[];
		color: FacetValue[];
		anc: number;
		inStock: number;
		rating: { value: number; count: number }[];
	};
};

function count<T extends string>(
	items: Summary[],
	key: (p: Summary) => T[],
	label: (v: T) => string,
	extra?: (v: T, p: Summary) => string | undefined
) {
	const m = new Map<T, FacetValue>();
	for (const p of items)
		for (const v of key(p)) {
			const cur = m.get(v) ?? { value: v, label: label(v), count: 0, hex: extra?.(v, p) };
			cur.count += 1;
			m.set(v, cur);
		}
	return [...m.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'uk'));
}

/** scope — товари розділу (категорія, підкатегорія, бренд, SEO-добірка чи весь каталог) */
export function runQuery(
	scope: Summary[],
	f: Filters,
	brandNames: Record<string, string>
): QueryResult {
	const filtered = scope
		.filter((p) => pass(p, f))
		.sort((a, b) => Number(a.stock === 'out') - Number(b.stock === 'out') || sorters[f.sort](a, b));
	const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
	const page = Math.min(f.page, pages);
	const start = (page - 1) * PER_PAGE;
	const end = Math.min(filtered.length, start + PER_PAGE * f.more);
	const prices = scope.map((p) => p.price);

	return {
		items: filtered.slice(start, end),
		total: filtered.length,
		page,
		pages,
		priceBounds: {
			min: prices.length ? Math.min(...prices) : 0,
			max: prices.length ? Math.max(...prices) : 0
		},
		facets: {
			brand: count(
				scope.filter((p) => pass(p, f, 'brand')),
				(p) => [p.brand],
				(v) => brandNames[v] ?? v
			),
			type: count(
				scope.filter((p) => pass(p, f, 'type')),
				(p) => [p.type],
				(v) => typeLabel[v] ?? v
			),
			conn: count(
				scope.filter((p) => pass(p, f, 'conn')),
				(p) => p.connection,
				(v) => connectionLabel[v] ?? v
			),
			color: count(
				scope.filter((p) => pass(p, f, 'color')),
				(p) => p.colors.map((c) => c.id),
				(v) => scope.flatMap((p) => p.colors).find((c) => c.id === v)?.name ?? v,
				(v, p) => p.colors.find((c) => c.id === v)?.hex
			),
			anc: scope.filter((p) => pass(p, f, 'anc') && p.anc).length,
			inStock: scope.filter((p) => pass(p, f, 'stock') && p.stock !== 'out').length,
			rating: [4.5, 4].map((value) => ({
				value,
				count: scope.filter((p) => pass(p, f, 'rating') && p.rating >= value).length
			}))
		}
	};
}
