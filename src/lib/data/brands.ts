/**
 * brands: українська або англійська версія за мовою сторінки (див. #lib/lang.ts).
 * Експорти — живі прив’язки ES-модулів: після setLang() усі імпортери бачать нову мову.
 */
import { onLang } from '#lib/lang-core.ts';
import * as uk from './brands.uk.ts';
import * as en from './en/brands.ts';

export let brands = uk.brands;
export let brandBySlug = uk.brandBySlug;

onLang((l) => {
	const m = l === 'en' ? en : uk;
	brands = m.brands;
	brandBySlug = m.brandBySlug;
});
