import { resolve } from '$app/paths';
import {
	emptyFilters,
	runQuery,
	type Filters,
	type QueryResult,
	type Summary
} from '#lib/catalog/query.ts';
import type { NpCity } from '#lib/data/nova-poshta.ts';
import { storage } from '#lib/stores/storage.ts';

/**
 * Фейковий бекенд у браузері. Дані — статичні JSON, пререндерені на збірці (/api/*.json),
 * а фільтрація, пошук і «замовлення» виконуються тут, зі штучною затримкою 200–600 мс,
 * щоб були видно стани завантаження.
 */
export const delay = (min = 200, max = 600) =>
	new Promise((r) => setTimeout(r, min + Math.random() * (max - min)));

type CatalogPayload = {
	products: Summary[];
	brandNames: Record<string, string>;
	categories: { slug: string; name: string; subs: { slug: string; name: string }[] }[];
};

let catalog: Promise<CatalogPayload> | null = null;
export function loadCatalog() {
	catalog ??= fetch(resolve('/api/catalog.json')).then((r) => {
		if (!r.ok) throw new Error(`Каталог недоступний (${r.status})`);
		return r.json() as Promise<CatalogPayload>;
	});
	catalog.catch(() => (catalog = null));
	return catalog;
}

/** GET /api/products?… — фільтри, фасети, сортування, пагінація в межах розділу (scope) */
export async function getProducts(scope: string[], filters: Filters): Promise<QueryResult> {
	const [data] = await Promise.all([loadCatalog(), delay()]);
	const set = new Set(scope);
	return runQuery(
		data.products.filter((p) => set.has(p.slug)),
		filters,
		data.brandNames
	);
}

export type SearchHit = {
	categories: { href: string; label: string; parent?: string }[];
	products: Summary[];
};

/** GET /api/search?q= — автокомпліт: категорії і товари */
export async function search(q: string): Promise<SearchHit> {
	const [data] = await Promise.all([loadCatalog(), delay(150, 350)]);
	const needle = q.trim().toLowerCase();
	if (needle.length < 2) return { categories: [], products: [] };
	const cats: { href: string; label: string; parent?: string }[] = data.categories.flatMap((c) => [
		{ href: `/${c.slug}`, label: c.name },
		...c.subs.map((s) => ({ href: `/${c.slug}/${s.slug}`, label: s.name, parent: c.name }))
	]);
	const words = needle.split(/\s+/);
	return {
		categories: cats
			.filter((c) => words.every((w) => `${c.label} ${c.parent ?? ''}`.toLowerCase().includes(w)))
			.slice(0, 4),
		products: runQuery(
			data.products,
			{ ...emptyFilters, q, more: 50 },
			data.brandNames
		).items.slice(0, 6)
	};
}

let np: Promise<NpCity[]> | null = null;
const loadNp = () =>
	(np ??= fetch(resolve('/api/np.json')).then((r) => r.json() as Promise<NpCity[]>));

/** GET /api/np-branches — міста і відділення з пошуком */
export async function npCitiesSearch(q: string) {
	const [cities] = await Promise.all([loadNp(), delay(150, 400)]);
	const n = q.trim().toLowerCase();
	return cities
		.filter((c) => !n || c.name.toLowerCase().startsWith(n) || c.name.toLowerCase().includes(n))
		.slice(0, 12);
}

export async function npBranches(cityId: string, type: 'warehouse' | 'postomat', q = '') {
	const [cities] = await Promise.all([loadNp(), delay(150, 400)]);
	const n = q.trim().toLowerCase().replace('№', '');
	return (cities.find((c) => c.id === cityId)?.points ?? [])
		.filter((p) => p.type === type)
		.filter((p) => !n || `${p.number} ${p.address}`.toLowerCase().includes(n));
}

export type OrderLine = {
	slug: string;
	name: string;
	color: string;
	qty: number;
	price: number;
	image: string;
};
export type Order = {
	id: string;
	createdAt: string;
	lines: OrderLine[];
	subtotal: number;
	discount: number;
	shipping: number;
	total: number;
	contact: { name: string; phone: string; email: string };
	delivery: { method: string; city: string; point: string };
	payment: string;
	comment: string;
};

export class ApiError extends Error {
	constructor(
		public status: number,
		message: string,
		public fields: Record<string, string> = {}
	) {
		super(message);
	}
}

const ORDERS = 'hvylia:orders';

/** POST /api/orders — перевіряє дані й «створює» замовлення (зберігається в localStorage) */
export async function createOrder(input: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
	await delay(500, 900);
	const fields: Record<string, string> = {};
	if (!input.lines.length) fields.lines = 'Кошик порожній';
	if (input.contact.name.trim().length < 2) fields.name = 'Вкажіть ім’я';
	if (!/^\+380 \(\d{2}\) \d{3}-\d{2}-\d{2}$/.test(input.contact.phone))
		fields.phone = 'Номер неповний';
	if (Object.keys(fields).length) throw new ApiError(422, 'Перевірте дані замовлення', fields);
	const order: Order = {
		...input,
		id: `HV-${String(Date.now()).slice(-7)}`,
		createdAt: new Date().toISOString()
	};
	const all = storage.read<Order[]>(ORDERS, []);
	storage.write(ORDERS, [order, ...all].slice(0, 10));
	return order;
}

export function getOrder(id: string): Order | null {
	return storage.read<Order[]>(ORDERS, []).find((o) => o.id === id) ?? null;
}
