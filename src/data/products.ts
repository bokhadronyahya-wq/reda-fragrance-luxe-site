import './stock.js';

export type Category = 'hommes' | 'femmes' | 'cosmetiques';
export type Product = {
  id: string; nom: string; marque: string; categorie: Category; sousCategorie?: string;
  taille: string; prix: number; enStock: boolean; quantite: number; vedette: boolean;
  nouveau: boolean; description: string; notesOlfactives?: string; image: string;
};
declare global { var PRODUCTS: Product[]; }
export const products: Product[] = globalThis.PRODUCTS ?? [];
export const labels: Record<Category, string> = { hommes: 'Hommes', femmes: 'Femmes', cosmetiques: 'Cosmétiques & Maquillage' };
export const whatsapp = (product?: Product) => `https://wa.me/212714103589${product ? '?text=' + encodeURIComponent(`Bonjour Reda Fragrance, je suis intéressé(e) par : ${product.nom}`) : ''}`;
export const instagram = 'https://www.instagram.com/reda_fragrences';
export const price = (value: number) => `${new Intl.NumberFormat('fr-MA').format(value)} DH`;