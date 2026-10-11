/**
 * localStorage, що не падає: у приватному режимі чи з вимкненим сховищем
 * дані живуть у пам’яті до перезавантаження сторінки.
 */
const memory = new Map<string, string>();

function local(): Storage | null {
	try {
		const s = window.localStorage;
		s.setItem('__hv__', '1');
		s.removeItem('__hv__');
		return s;
	} catch {
		return null;
	}
}

export const storage = {
	read<T>(key: string, fallback: T): T {
		try {
			const raw = local()?.getItem(key) ?? memory.get(key);
			return raw ? (JSON.parse(raw) as T) : fallback;
		} catch {
			return fallback;
		}
	},
	write(key: string, value: unknown) {
		const raw = JSON.stringify(value);
		memory.set(key, raw);
		try {
			local()?.setItem(key, raw);
		} catch {
			// переповнене або заборонене сховище — лишається копія в пам’яті
		}
	}
};
