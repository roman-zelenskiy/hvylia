/**
 * site: українська або англійська версія за мовою сторінки (див. #lib/lang.ts).
 * Експорти — живі прив’язки ES-модулів: після setLang() усі імпортери бачать нову мову.
 */
import { onLang } from '#lib/lang-core.ts';
import * as uk from './site.uk.ts';
import * as en from './en/site.ts';

export let siteUrl = uk.siteUrl;
export let shop = uk.shop;
export let FREE_SHIPPING_FROM = uk.FREE_SHIPPING_FROM;
export let RETURN_DAYS = uk.RETURN_DAYS;
export let promoCodes = uk.promoCodes;
export let perks = uk.perks;

onLang((l) => {
	const m = l === 'en' ? en : uk;
	siteUrl = m.siteUrl;
	shop = m.shop;
	FREE_SHIPPING_FROM = m.FREE_SHIPPING_FROM;
	RETURN_DAYS = m.RETURN_DAYS;
	promoCodes = m.promoCodes;
	perks = m.perks;
});
