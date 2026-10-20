// Données du site. Ces deux fichiers sont générés depuis
// public/site-autonome/content/ (modifié via /admin) — ne pas les éditer à la main.
import './stock.js';
import './reglages.js';

export const categories = [
  { slug: 'parfums-femme', label: 'Parfums Femme' },
  { slug: 'parfums-homme', label: 'Parfums Homme' },
  { slug: '10ml-femme', label: '10 ML Femme' },
  { slug: '10ml-homme', label: '10 ML Homme' },
  { slug: 'cosmetiques', label: 'Cosmétiques' },
  { slug: 'maquillage', label: 'Maquillage' },
] as const;
export type Category = (typeof categories)[number]['slug'];

export type Product = {
  id: string; nom: string; marque: string; categorie: Category;
  taille: string; prix: number; enStock: boolean; quantite: number; vedette: boolean;
  nouveau: boolean; description: string; notesOlfactives?: string; image: string; galerie?: string[];
};
export type Reglages = Record<string, string | undefined> & {
  apropos_titre?: string; apropos_texte?: string; cosmetiques_intro?: string;
  whatsapp?: string; instagram?: string; image_hero?: string; image_apropos?: string;
};

declare global { var PRODUCTS: Product[] | undefined; var REGLAGES: Reglages | undefined; }

export const products: Product[] = globalThis.PRODUCTS ?? [];
export const reglages: Reglages = globalThis.REGLAGES ?? {};
export const labels = Object.fromEntries(categories.map((c) => [c.slug, c.label])) as Record<Category, string>;
export const isCategory = (s: string): s is Category => categories.some((c) => c.slug === s);
export const isAvailable = (p: Product) => p.enStock && p.quantite > 0;

export type Sort = 'nouveautes' | 'croissant' | 'decroissant';
export type Stock = 'tous' | 'en-stock' | 'epuise';
const norm = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
export function filterProducts(list: Product[], o: { category?: Category; q?: string; stock?: Stock; sort?: Sort }) {
  const q = norm(o.q ?? '');
  return list
    .filter((p) => !o.category || p.categorie === o.category)
    .filter((p) => norm(p.nom).includes(q))
    .filter((p) => !o.stock || o.stock === 'tous' || (o.stock === 'en-stock' ? isAvailable(p) : !isAvailable(p)))
    .sort((a, b) => o.sort === 'croissant' ? a.prix - b.prix : o.sort === 'decroissant' ? b.prix - a.prix : Number(b.nouveau) - Number(a.nouveau));
}

// Le numéro s’écrit au format international, chiffres uniquement (réglé depuis /admin).
const numeroWhatsApp = /^\d{9,15}$/.test(String(reglages.whatsapp ?? '')) ? String(reglages.whatsapp) : '212714103589';
export const whatsapp = (product?: Product) => `https://wa.me/${numeroWhatsApp}${product ? '?text=' + encodeURIComponent(`Bonjour Reda Fragrances, je souhaite commander : ${product.nom} (${product.taille}).`) : ''}`;
export const instagram = String(reglages.instagram || 'https://www.instagram.com/reda_fragrences');
export const instagramHandle = '@' + (instagram.replace(/\/+$/, '').split('/').pop() || 'reda_fragrences');
export const price = (value: number) => `${new Intl.NumberFormat('fr-MA').format(value)} DH`;
