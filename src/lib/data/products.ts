/**
 * products: українська або англійська версія за мовою сторінки (див. #lib/lang.ts).
 * Експорти — живі прив’язки ES-модулів: після setLang() усі імпортери бачать нову мову.
 */
import { onLang } from '#lib/lang-core.ts';
import * as uk from './products.uk.ts';
import * as en from './en/products.ts';

export let products = uk.products;
export let productBySlug = uk.productBySlug;

onLang((l) => {
	const m = l === 'en' ? en : uk;
	products = m.products;
	productBySlug = m.productBySlug;
});
