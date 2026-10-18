import { enhancedImages } from '@sveltejs/enhanced-img';
import tailwindcss from '@tailwindcss/vite';
import adapterStatic from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

/**
 * Повністю статичний сайт: усі публічні сторінки пререндеряться в HTML на збірці,
 * «бекенд» — моки в src/lib/server, які віддаються як статичні JSON-ендпоінти.
 * Для GitHub Pages: BASE_PATH=/<repo>.
 */
const base = (process.env.BASE_PATH ?? '') as '' | `/${string}`;

export default defineConfig({
	build: {
		rolldownOptions: {
			output: {
				// менше дрібних чанків: рантайм і спільний код сторінок — у кількох файлах, сторінки — окремо
				codeSplitting: {
					groups: [
						// рантайм SvelteKit має лишитися окремим чанком — його не групуємо
						{ name: 'vendor', test: /node_modules[\\/](?!@sveltejs[\\/]kit)/ },
						// спільний код; компоненти окремих сторінок (головна, товар, каталог) лишаються в чанках своїх сторінок
						{ name: 'lib', test: /src[\\/]lib[\\/](?!components[\\/](home|product|catalog)[\\/])/ }
					]
				}
			}
		}
	},
	plugins: [
		enhancedImages(),
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// усі маршрути пререндерені, тож SPA-fallback не потрібен; 404.html — пререндерена сторінка /404
			adapter: adapterStatic(),
			// абсолютні шляхи з base: інакше fallback 404.html (SPA) ламається на вкладених адресах
			paths: { base, relative: false },
			// увесь CSS (~10 КБ gzip) вбудовується в HTML: жодного блокуючого запиту перед першою відмальовкою
			inlineStyleThreshold: Infinity,
			prerender: {
				handleHttpError: 'fail',
				handleMissingId: 'fail',
				entries: [
					'*',
					'/404',
					// сторінки без посилань у HTML (кошик, оформлення, пошук, замовлення) — для обох мов
					...['uk', 'en'].flatMap((l) =>
						['', '/cart', '/checkout', '/order', '/search'].map((p) => `/${l}${p}` as const)
					)
				]
			}
		})
	]
});
