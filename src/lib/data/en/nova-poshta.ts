/** Nova Poshta demo directory in English: official transliteration of the same data */
import { npCities as uk, type NpCity } from '../nova-poshta.uk.ts';
import { translit } from '../translit.ts';

export type { NpCity, NpPoint } from '../nova-poshta.uk.ts';

/** «вул. Пирогівський шлях, 135» → «135 Pyrohivskyi shliakh St» */
const street = (a: string) => {
	const m = /^(вул\.|просп\.|пл\.|бульв\.)\s+(.+?),\s*(.+)$/.exec(a);
	if (!m) return translit(a);
	const kind = (
		{ 'вул.': 'St', 'просп.': 'Ave', 'пл.': 'Sq', 'бульв.': 'Blvd' } as Record<string, string>
	)[m[1]];
	const num = m[3].replace(/\s*\(.*\)$/, '');
	const mall = /\(ТРЦ «(.+?)»\)/.exec(m[3]);
	return `${translit(num)} ${translit(m[2])} ${kind}${mall ? ` (${translit(mall[1])} mall)` : ''}`;
};

const regions: Record<string, string> = {
	kyiv: 'Kyiv City',
	lviv: 'Lviv Oblast',
	odesa: 'Odesa Oblast',
	kharkiv: 'Kharkiv Oblast',
	dnipro: 'Dnipropetrovsk Oblast',
	vinnytsia: 'Vinnytsia Oblast',
	'ivano-frankivsk': 'Ivano-Frankivsk Oblast',
	poltava: 'Poltava Oblast',
	chernihiv: 'Chernihiv Oblast',
	uzhhorod: 'Zakarpattia Oblast',
	zaporizhzhia: 'Zaporizhzhia Oblast',
	rivne: 'Rivne Oblast'
};

export const npCities: NpCity[] = uk.map((c) => ({
	...c,
	name: translit(c.name),
	region: regions[c.id] ?? translit(c.region),
	points: c.points.map((p) => ({ ...p, address: street(p.address) }))
}));
