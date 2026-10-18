/**
 * nova-poshta: українська або англійська версія за мовою сторінки (див. #lib/lang.ts).
 * Експорти — живі прив’язки ES-модулів: після setLang() усі імпортери бачать нову мову.
 */
import { onLang } from '#lib/lang-core.ts';
import * as uk from './nova-poshta.uk.ts';
import * as en from './en/nova-poshta.ts';
export type { NpCity, NpPoint } from './nova-poshta.uk.ts';

export let npCities = uk.npCities;

onLang((l) => {
	const m = l === 'en' ? en : uk;
	npCities = m.npCities;
});
