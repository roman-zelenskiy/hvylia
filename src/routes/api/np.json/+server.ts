import { json } from '@sveltejs/kit';
import { npCities } from '#lib/data/nova-poshta.ts';

export const prerender = true;

export function GET() {
	return json(npCities);
}
