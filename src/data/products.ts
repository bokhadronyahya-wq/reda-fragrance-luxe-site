// Données du site. Ces deux fichiers sont générés depuis
// public/site-autonome/content/ (modifié via /admin) — ne pas les éditer à la main.
import './stock.js';
import './reglages.js';

export type Category = 'hommes' | 'femmes' | 'cosmetiques';
export type Product = {
  id: string; nom: string; marque: string; categorie: Category; sousCategorie?: string;
  taille: string; prix: number; enStock: boolean; quantite: number; vedette: boolean;
  nouveau: boolean; description: string; notesOlfactives?: string; image: string;
};
export type Reglages = {
  hero_titre: string; hero_sous_titre: string; hero_description: string;
  apropos_titre: string; apropos_texte: string; cosmetiques_intro: string;
  whatsapp: string; instagram: string;
  image_hero: string; image_hommes: string; image_femmes: string;
  image_cosmetiques: string; image_apropos: string;
};

declare global { var PRODUCTS: Product[] | undefined; var REGLAGES: Reglages | undefined; }

export const products: Product[] = globalThis.PRODUCTS ?? [];
export const reglages: Reglages = globalThis.REGLAGES ?? ({} as Reglages);
export const labels: Record<Category, string> = { hommes: 'Hommes', femmes: 'Femmes', cosmetiques: 'Cosmétiques & Maquillage' };

// Le numéro s’écrit au format international, chiffres uniquement (réglé depuis /admin).
const numeroWhatsApp = /^\d{9,15}$/.test(String(reglages.whatsapp ?? '')) ? String(reglages.whatsapp) : '212714103589';
export const whatsapp = (product?: Product) => `https://wa.me/${numeroWhatsApp}${product ? '?text=' + encodeURIComponent(`Bonjour Reda Fragrance, je suis intéressé(e) par : ${product.nom}`) : ''}`;
export const instagram = String(reglages.instagram || 'https://www.instagram.com/reda_fragrences');
export const price = (value: number) => `${new Intl.NumberFormat('fr-MA').format(value)} DH`;
