// REDA FRAGRANCE — Génération des données du site.
// Lit content/produits/*.json et content/reglages.json (modifiés depuis /admin)
// puis écrit :
//   site/stock.js et site/reglages.js      → la version autonome (fichiers hors ligne)
//   src/data/stock.js et src/data/reglages.js → l’aperçu et le site en ligne
// Les photos importées depuis /admin sont copiées dans site/images/uploads.
// Lancé automatiquement par l’hébergeur à chaque modification ; aucune dépendance.
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'content', 'produits');
const appData = join(root, '..', '..', 'src', 'data');
const uploads = join(root, '..', '..', 'public', 'images', 'uploads');

const clean = (path) => String(path || '').replace(/^\/+/, ''); // chemins relatifs : le site s’ouvre aussi hors ligne
const CATEGORIES = ['parfums-femme', 'parfums-homme', '10ml-femme', '10ml-homme', 'cosmetiques', 'maquillage'];
const ANCIENNES = { hommes: 'parfums-homme', femmes: 'parfums-femme' };

export function generate() {
  const products = readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((file) => {
      const p = JSON.parse(readFileSync(join(dir, file), 'utf8'));
      return {
        id: file.replace(/\.json$/, ''),
        nom: p.nom || 'Produit',
        marque: p.marque || 'Reda Fragrance',
        categorie: CATEGORIES.includes(p.categorie) ? p.categorie : ANCIENNES[p.categorie] || 'parfums-femme',
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
        galerie: (Array.isArray(p.galerie) ? p.galerie : []).map((g) => clean(typeof g === 'string' ? g : g?.image)).filter(Boolean),
      };
    })
    .filter((p) => p.visible)
    .map(({ visible, ...p }) => p);

  const reglages = JSON.parse(readFileSync(join(root, 'content', 'reglages.json'), 'utf8'));
  for (const key of Object.keys(reglages)) if (key.startsWith('image_') || key.startsWith('tuile_')) reglages[key] = clean(reglages[key]);

  const header = '/* FICHIER GÉNÉRÉ AUTOMATIQUEMENT — ne pas modifier.\n * Modifiez les produits et textes depuis /admin. */\n';
  const stock = header + 'globalThis.PRODUCTS = ' + JSON.stringify(products, null, 1) + ';\n';
  const reglagesJs = header + 'globalThis.REGLAGES = ' + JSON.stringify(reglages, null, 1) + ';\n';

  writeFileSync(join(root, 'site', 'stock.js'), stock);
  writeFileSync(join(root, 'site', 'reglages.js'), reglagesJs);
  writeFileSync(join(appData, 'stock.js'), stock);
  writeFileSync(join(appData, 'reglages.js'), reglagesJs);

  // Les photos importées depuis /admin doivent aussi exister dans la version autonome.
  if (existsSync(uploads)) {
    const dest = join(root, 'site', 'images', 'uploads');
    mkdirSync(dest, { recursive: true });
    for (const file of readdirSync(uploads)) {
      if (file === '.gitkeep' || file.startsWith('.')) continue;
      copyFileSync(join(uploads, file), join(dest, file));
    }
  }

  console.log(`Reda Fragrance : ${products.length} produits publiés.`);
  return products.length;
}

// Exécuté quand ce fichier est lancé directement (commande de construction de l’hébergeur).
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) generate();
