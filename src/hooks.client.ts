import type { ClientInit } from '@sveltejs/kit/hooks';
import { langFromPath, setLang } from '#lib/lang.ts';

/** У браузері мова відома з адреси ще до гідратації */
export const init: ClientInit = () => {
	setLang(langFromPath(location.pathname));
};
