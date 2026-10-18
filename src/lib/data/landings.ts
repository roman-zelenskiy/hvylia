/**
 * landings: українська або англійська версія за мовою сторінки (див. #lib/lang.ts).
 * Експорти — живі прив’язки ES-модулів: після setLang() усі імпортери бачать нову мову.
 */
import { onLang } from '#lib/lang-core.ts';
import * as uk from './landings.uk.ts';
import * as en from './en/landings.ts';

export let landings = uk.landings;
export let landingFor = uk.landingFor;

onLang((l) => {
	const m = l === 'en' ? en : uk;
	landings = m.landings;
	landingFor = m.landingFor;
});
