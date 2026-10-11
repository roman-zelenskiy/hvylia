import { catalogPage } from '#lib/server/pages.ts';

export function load() {
	return catalogPage(() => true);
}
