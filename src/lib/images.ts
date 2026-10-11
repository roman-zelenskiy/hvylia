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
