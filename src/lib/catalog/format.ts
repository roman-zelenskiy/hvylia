/** Детерміноване форматування (однаково на сервері й у браузері — без розбіжностей гідратації) */
export const formatNumber = (n: number) =>
	Math.round(n)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f');
export const formatPrice = (n: number) => `${formatNumber(n)}\u00a0₴`;

export function plural(n: number, [one, few, many]: readonly [string, string, string]) {
	const m10 = n % 10;
	const m100 = n % 100;
	if (m10 === 1 && m100 !== 11) return one;
	if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
	return many;
}

export const goods = (n: number) => `${n} ${plural(n, ['товар', 'товари', 'товарів'])}`;

export const discount = (price: number, old?: number) =>
	old && old > price ? Math.round((1 - price / old) * 100) : 0;

const months = [
	'січня',
	'лютого',
	'березня',
	'квітня',
	'травня',
	'червня',
	'липня',
	'серпня',
	'вересня',
	'жовтня',
	'листопада',
	'грудня'
];
export function formatDate(iso: string) {
	const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
	return `${d} ${months[m - 1]} ${y}`;
}
