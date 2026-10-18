import { resolve } from '$app/paths';
import { lang, type Lang } from './lang-core.ts';

export * from './lang-core.ts';

/** Мова з адреси: /hvylia/en/… → en */
export const langFromPath = (path: string): Lang => {
	const base = resolve('/').replace(/\/$/, '');
	const rest = path.startsWith(base) ? path.slice(base.length) : path;
	return /^\/en(\/|$)/.test(rest) ? 'en' : 'uk';
};

/**
 * Адреса всередині мовної версії: lhref('/product/[slug]', { slug }) → /base/en/product/slug.
 * Повторює підстановку параметрів resolve(), але додає мовний префікс.
 */
export function lhref(route: string, params: Record<string, string> = {}, l: Lang = lang) {
	const [path, rest = ''] = route.split(/(?=[?#])/);
	const filled = path.replace(/\[(?:\.\.\.)?(\w+)(?:=\w+)?\]/g, (_, k: string) => params[k] ?? '');
	const base = resolve('/').replace(/\/$/, '');
	return `${base}/${l}${filled === '/' ? '' : filled}${rest}`;
}

/** Та сама сторінка іншою мовою */
export function switchHref(pathname: string, to: Lang) {
	const base = resolve('/').replace(/\/$/, '');
	const rest = (pathname.startsWith(base) ? pathname.slice(base.length) : pathname).replace(
		/^\/(uk|en)(?=\/|$)/,
		''
	);
	return `${base}/${to}${rest}`;
}

export function rememberLang(l: Lang) {
	try {
		localStorage.setItem('lang', l);
	} catch {
		// сховище недоступне — вибір просто не запам’ятається
	}
}

/** Корінь сайту: ручний вибір (localStorage), далі часовий пояс України → українська, решта → англійська */
export const detectScript = (base: string) =>
	`(function(){var l='uk';try{var s=localStorage.getItem('lang');if(s==='uk'||s==='en'){l=s}else{var tz=(Intl.DateTimeFormat().resolvedOptions().timeZone||'');l=/^Europe\\/(Kyiv|Kiev|Uzhgorod|Zaporozhye|Simferopol)$/.test(tz)?'uk':'en'}}catch(e){}location.replace('${base}/'+l+location.search+location.hash)})()`;
