/**
 * categories: українська або англійська версія за мовою сторінки (див. #lib/lang.ts).
 * Експорти — живі прив’язки ES-модулів: після setLang() усі імпортери бачать нову мову.
 */
import { onLang } from '#lib/lang-core.ts';
import * as uk from './categories.uk.ts';
import * as en from './en/categories.ts';

export let categories = uk.categories;
export let categoryBySlug = uk.categoryBySlug;
export let findSub = uk.findSub;

onLang((l) => {
	const m = l === 'en' ? en : uk;
	categories = m.categories;
	categoryBySlug = m.categoryBySlug;
	findSub = m.findSub;
});
