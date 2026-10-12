import type { Picture } from 'vite-imagetools';

/** Фото товарів через enhanced-img: AVIF/WebP кількох ширин генеруються на збірці */
const modules = import.meta.glob<{ default: Picture }>('/src/lib/assets/products/*.jpg', {
	eager: true,
	query: { enhanced: true, w: '1200;800;400' }
});

export const productImages: Record<string, Picture> = Object.fromEntries(
	Object.entries(modules).map(([path, mod]) => [path.split('/').pop()!, mod.default])
);

export const productImage = (file: string) => productImages[file];

/** Вирізані фото товарів (прозорий фон) — для «сцени» в картках, hero й галереї */
const cutModules = import.meta.glob<{ default: Picture }>('/src/lib/assets/cutouts/*.png', {
	eager: true,
	query: { enhanced: true, w: '1000;640;360' }
});

export const cutouts: Record<string, Picture> = Object.fromEntries(
	Object.entries(cutModules).map(([path, mod]) => [
		path.split('/').pop()!.replace('.png', ''),
		mod.default
	])
);

/** Вирізка товару, якщо є; інакше — звичайне фото */
export const productCutout = (slug: string): Picture | undefined => cutouts[slug];
