import { json } from '@sveltejs/kit';
import { langs } from '#lib/lang.ts';
import { npCities } from '#lib/data/nova-poshta.ts';

export const prerender = true;

export function GET() {
	return json(npCities);
}

export const entries = () => langs.map((lang) => ({ lang }));
