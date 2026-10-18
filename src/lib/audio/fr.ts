import { lang } from '#lib/lang-core.ts';
/**
 * Частотні характеристики (АЧХ) для графіків. Дані демонстраційні, але правдоподібні:
 * побудовані з типових для кожного класу пристроїв рис — підйом басу, вушний резонанс близько 3 кГц,
 * спад на верхах — плюс детермінована «індивідуальність» кожної моделі (без Math.random).
 */

export const F_MIN = 20;
export const F_MAX = 20000;
export const DB_MIN = -15;
export const DB_MAX = 15;

/** Частоти на логарифмічній шкалі: 96 точок від 20 Гц до 20 кГц */
export const freqs = Array.from({ length: 96 }, (_, i) => F_MIN * Math.pow(F_MAX / F_MIN, i / 95));

const bell = (f: number, f0: number, q: number, gain: number) =>
	gain * Math.exp(-Math.pow(Math.log2(f / f0) * q, 2));
const shelf = (f: number, f0: number, gain: number, low = true) =>
	gain / (1 + Math.pow(low ? f / f0 : f0 / f, 2));

/** Детермінований «шум» моделі: дрібні нерівності, однакові на сервері й у браузері */
function wobble(seed: string, f: number) {
	let h = 0;
	for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
	const x = Math.log2(f);
	return (
		0.9 * Math.sin(x * 2.3 + (h % 97)) +
		0.6 * Math.sin(x * 5.1 + (h % 13)) +
		0.35 * Math.sin(x * 9.7 + (h % 7))
	);
}

type Profile = {
	bass: number;
	bassF: number;
	mid: number;
	ear: number;
	earF: number;
	treble: number;
	air: number;
};

const profiles: Record<string, Profile> = {
	tws: { bass: 6, bassF: 110, mid: -0.5, ear: 7, earF: 3000, treble: -2, air: -6 },
	'on-ear': { bass: 5, bassF: 120, mid: 0, ear: 6, earF: 2800, treble: -1, air: -5 },
	'over-ear': { bass: 4.5, bassF: 105, mid: 0, ear: 8, earF: 3100, treble: -1.5, air: -4 },
	'in-ear': { bass: 3, bassF: 140, mid: 0.5, ear: 9, earF: 2700, treble: 1, air: -3 },
	gaming: { bass: 7, bassF: 90, mid: -1.5, ear: 6, earF: 3400, treble: 1.5, air: -6 },
	studio: { bass: 1, bassF: 100, mid: 0, ear: 5, earF: 3000, treble: 0.5, air: -2 },
	portable: { bass: -6, bassF: 120, mid: 1, ear: 2, earF: 2500, treble: -1, air: -8 },
	bookshelf: { bass: -4, bassF: 60, mid: 0, ear: 0.5, earF: 2500, treble: 0.5, air: -2 },
	soundbar: { bass: -3, bassF: 80, mid: 1.5, ear: 2.5, earF: 2200, treble: -0.5, air: -6 },
	smart: { bass: -5, bassF: 110, mid: 1, ear: 1.5, earF: 2400, treble: -1.5, air: -7 }
};

export function profileFor(type: string, slug: string) {
	if (slug.includes('studio') && type === 'over-ear' && slug.startsWith('kobza'))
		return profiles.studio;
	return profiles[type] ?? null;
}

/** Відгук у дБ на кожній частоті з freqs */
export function curve(type: string, slug: string): number[] | null {
	const p = profileFor(type, slug);
	if (!p) return null;
	return freqs.map((f) => {
		const v =
			shelf(f, p.bassF, p.bass) +
			p.mid +
			bell(f, p.earF, 1.1, p.ear) +
			bell(f, 7000, 1.4, p.treble) +
			shelf(f, 12000, p.air, false) +
			wobble(slug, f) * (p === profiles.studio ? 0.4 : 1);
		return Math.max(DB_MIN + 1, Math.min(DB_MAX - 1, v));
	});
}

export const hasCurve = (type: string) => type in profiles;

/** Шкала для SVG: x — логарифм частоти, y — дБ */
export const xOf = (f: number, w: number) => (Math.log(f / F_MIN) / Math.log(F_MAX / F_MIN)) * w;
export const yOf = (db: number, h: number) => ((DB_MAX - db) / (DB_MAX - DB_MIN)) * h;

/** Плавна крива (Catmull-Rom → кубічні Безьє) */
export function pathOf(values: number[], w: number, h: number) {
	const pts = values.map((v, i) => [xOf(freqs[i], w), yOf(v, h)] as const);
	let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
	for (let i = 0; i < pts.length - 1; i++) {
		const [x0, y0] = pts[i - 1] ?? pts[i];
		const [x1, y1] = pts[i];
		const [x2, y2] = pts[i + 1];
		const [x3, y3] = pts[i + 2] ?? pts[i + 1];
		const c1 = [x1 + (x2 - x0) / 6, y1 + (y2 - y0) / 6];
		const c2 = [x2 - (x3 - x1) / 6, y2 - (y3 - y1) / 6];
		d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
	}
	return d;
}

const en = () => lang === 'en';
/** Десятковий розділювач і одиниці мовою сторінки: «1,5 кГц» / «1.5 kHz» */
const dec = (s: string) => (en() ? s : s.replace('.', ','));
export const fmtHz = (f: number) =>
	f >= 1000
		? `${dec((f / 1000).toFixed(f >= 10000 ? 0 : 1))} ${en() ? 'kHz' : 'кГц'}`
		: `${Math.round(f)} ${en() ? 'Hz' : 'Гц'}`;
export const fmtDb = (db: number) =>
	`${db >= 0 ? '+' : '−'}${dec(Math.abs(db).toFixed(1))} ${en() ? 'dB' : 'дБ'}`;
