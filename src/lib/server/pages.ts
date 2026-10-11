import { emptyFilters, runQuery, type FilterKey, type QueryResult } from '#lib/catalog/query.ts';
import { brandNames, summaries } from './catalog.ts';
import { products } from '#lib/data/products.ts';
import type { Product } from '#lib/data/types.ts';

export type Crumb = { href?: string; label: string };

export type CatalogPage = {
	/** slug-и товарів розділу — клієнт фільтрує лише в їхніх межах */
	scope: string[];
	/** Результат без фільтрів — рендериться на сервері (повний HTML для пошуковиків) */
	initial: QueryResult;
	/** Які фільтри показувати в розділі */
	filters: FilterKey[];
};

export function catalogPage(match: (p: Product) => boolean): CatalogPage {
	const scope = products.filter(match).map((p) => p.slug);
	const set = new Set(scope);
	const items = summaries.filter((s) => set.has(s.slug));
	const initial = runQuery(items, emptyFilters, brandNames);
	const filters: CatalogPage['filters'] = ['price', 'brand'];
	if (initial.facets.type.length > 1) filters.push('type');
	if (initial.facets.conn.length > 1) filters.push('conn');
	if (initial.facets.anc > 0 && initial.facets.anc < items.length) filters.push('anc');
	if (initial.facets.color.length > 1) filters.push('color');
	filters.push('stock', 'rating');
	return { scope, initial, filters };
}
