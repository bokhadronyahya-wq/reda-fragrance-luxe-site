import { reglages, type Category } from '@/data/products';

// Les photos sont choisies depuis /admin (Réglages du site → Textes, liens et images).
const url = (path?: string, fallback = '') => (path ? '/' + String(path).replace(/^\/+/, '') : fallback);

export const SITE_URL = 'https://reda-fragrance.vercel.app';
export const images = {
  hero: url(reglages.image_hero, '/images/accueil/banniere.jpg'),
  about: url(reglages.image_apropos, '/images/accueil/parfums-femme.jpg'),
  partage: SITE_URL + '/images/accueil/partage.jpg',
};
export const tileImage = (slug: Category) => url(reglages['tuile_' + slug.replace(/-/g, '_')], `/images/accueil/${slug}.jpg`);
