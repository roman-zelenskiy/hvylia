/**
 * info: українська або англійська версія за мовою сторінки (див. #lib/lang.ts).
 * Експорти — живі прив’язки ES-модулів: після setLang() усі імпортери бачать нову мову.
 */
import { onLang } from '#lib/lang-core.ts';
import * as uk from './info.uk.ts';
import * as en from './en/info.ts';
export type { InfoPage } from './info.uk.ts';

export let info = uk.info;

onLang((l) => {
	const m = l === 'en' ? en : uk;
	info = m.info;
});
