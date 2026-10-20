import { useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { ProductCard } from './product-card';
import { products, labels, categories, filterProducts, type Category, type Sort, type Stock } from '@/data/products';

export function Catalogue({ category, initialQuery = '' }: { category?: Category; initialQuery?: string }) {
  const [q, setQ] = useState(initialQuery);
  const [sort, setSort] = useState<Sort>('nouveautes');
  const [stock, setStock] = useState<Stock>('tous');
  const list = filterProducts(products, { category, q, sort, stock });
  return <main id="contenu" className="catalogue-page">
    <div className="catalogue-intro page-width"><p className="eyebrow">{category ? 'COLLECTION' : 'TOUS NOS PRODUITS'}</p><h1>{category ? labels[category] : 'Catalogue'}<span className="gold-dot">.</span></h1></div>
    <div className="page-width">
      <nav className="filter-tabs" aria-label="Collections">
        <Link to="/catalogue" className={!category ? 'filter-tab selected' : 'filter-tab'}>Tous</Link>
        {categories.map(c => <Link key={c.slug} to="/collection/$slug" params={{ slug: c.slug }} className={category === c.slug ? 'filter-tab selected' : 'filter-tab'}>{c.label}</Link>)}
      </nav>
      <div className="catalogue-controls">
        <label className="catalogue-search"><Search size={17}/><input aria-label="Rechercher un produit par nom" placeholder="Rechercher un produit…" value={q} onChange={e => setQ(e.target.value)}/></label>
        <div className="search-sort">
          <label className="sort-select"><span className="sr-only">Disponibilité</span><select value={stock} onChange={e => setStock(e.target.value as Stock)}><option value="tous">Disponibilité : toutes</option><option value="en-stock">En stock</option><option value="epuise">Épuisé</option></select></label>
          <label className="sort-select"><span className="sr-only">Trier les produits</span><select value={sort} onChange={e => setSort(e.target.value as Sort)}><option value="nouveautes">Nouveautés</option><option value="croissant">Prix croissant</option><option value="decroissant">Prix décroissant</option></select></label>
        </div>
      </div>
      <p className="result-count" aria-live="polite">{list.length} produit{list.length !== 1 ? 's' : ''}</p>
      {list.length ? <div className="product-grid">{list.map(p => <ProductCard key={p.id} product={p}/>)}</div> : <p className="empty-results">Aucun produit ne correspond à votre recherche.</p>}
    </div>
  </main>;
}
