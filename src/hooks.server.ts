import type { Handle } from '@sveltejs/kit/hooks';
import { langFromPath, setLang } from '#lib/lang.ts';

/** Мова — з адреси, ще до load і рендера; <html lang> — за нею ж */
export const handle: Handle = ({ event, resolve }) => {
	const l = langFromPath(event.url.pathname);
	setLang(l);
	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', l) });
};
