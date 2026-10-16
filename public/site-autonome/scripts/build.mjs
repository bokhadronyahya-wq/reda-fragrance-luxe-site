// REDA FRAGRANCE — Génération des données du site.
// Lit content/produits/*.json et content/reglages.json (modifiés via /admin)
// puis écrit site/stock.js et site/reglages.js, lus par toutes les pages.
// Lancé automatiquement par Netlify à chaque modification ; aucune dépendance.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'content', 'produits');
const clean = (path) => String(path || '').replace(/^\/+/, ''); // chemins relatifs : le site s’ouvre aussi hors ligne
const CATEGORIES = ['hommes', 'femmes', 'cosmetiques'];

const products = readdirSync(dir)
  .filter((f) => f.endsWith('.json'))
  .sort()
  .map((file) => {
    const p = JSON.parse(readFileSync(join(dir, file), 'utf8'));
    return {
      id: file.replace(/\.json$/, ''),
      nom: p.nom || 'Produit',
      marque: p.marque || 'Reda Fragrance',
      categorie: CATEGORIES.includes(p.categorie) ? p.categorie : 'hommes',
      sousCategorie: p.sous_categorie || '',
      taille: p.taille || '',
      prix: Number(p.prix) || 0,
      enStock: p.en_stock !== false,
      quantite: Number(p.quantite) || 0,
      vedette: !!p.vedette,
      nouveau: !!p.nouveau,
      visible: p.visible !== false,
      description: p.description || '',
      notesOlfactives: p.notes_olfactives || '',
      image: clean(p.image),
    };
  })
  .filter((p) => p.visible)
  .map(({ visible, ...p }) => p);

const reglages = JSON.parse(readFileSync(join(root, 'content', 'reglages.json'), 'utf8'));
for (const key of Object.keys(reglages)) if (key.startsWith('image_')) reglages[key] = clean(reglages[key]);

const header = '/* FICHIER GÉNÉRÉ AUTOMATIQUEMENT — ne pas modifier.\n * Modifiez les produits et textes depuis /admin. */\n';
writeFileSync(join(root, 'site', 'stock.js'), header + 'globalThis.PRODUCTS = ' + JSON.stringify(products, null, 1) + ';\n');
writeFileSync(join(root, 'site', 'reglages.js'), header + 'globalThis.REGLAGES = ' + JSON.stringify(reglages, null, 1) + ';\n');
console.log(`Reda Fragrance : ${products.length} produits publiés.`);
