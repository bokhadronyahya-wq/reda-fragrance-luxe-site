import hero from '@/assets/hero.jpg';
import hommes from '@/assets/collection-hommes.jpg';
import femmes from '@/assets/collection-femmes.jpg';
import cosmetiques from '@/assets/collection-cosmetiques.jpg';
import { reglages } from '@/data/products';

// Les photos sont choisies depuis /admin (Réglages du site → Textes, liens et images).
// Sans choix du propriétaire, on garde les visuels de démonstration livrés avec le site.
const url = (path?: string) => (path ? '/' + String(path).replace(/^\/+/, '') : '');

export const images = {
  hero: url(reglages.image_hero) || hero,
  hommes: url(reglages.image_hommes) || hommes,
  femmes: url(reglages.image_femmes) || femmes,
  cosmetiques: url(reglages.image_cosmetiques) || cosmetiques,
  about: url(reglages.image_apropos) || femmes,
  logo: '/images/logo.png',
};
