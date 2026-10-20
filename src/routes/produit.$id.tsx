import { useState } from 'react';
import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ProductImage, OrderButton } from '@/components/fragrance/product-card';
import { products, labels, price, isAvailable } from '@/data/products';
import { SITE_URL } from '@/data/config';

export const Route = createFileRoute('/produit/$id')({
  loader: ({ params }) => { const p = products.find(x => x.id === params.id); if (!p) throw notFound(); return { nom: p.nom, description: p.description, image: p.image }; },
  head: ({ params, loaderData }) => {
    const t = `${loaderData?.nom ?? 'Produit'} — Reda Fragrances`;
    const d = loaderData?.description ?? 'Produit Reda Fragrances.';
    const img = loaderData ? `${SITE_URL}/${loaderData.image}` : undefined;
    return { meta: [{ title: t }, { name: 'description', content: d }, { property: 'og:title', content: t }, { property: 'og:description', content: d }, { property: 'og:type', content: 'product' }, { name: 'twitter:card', content: 'summary_large_image' }, { property: 'og:url', content: `${SITE_URL}/produit/${params.id}` }, ...(img ? [{ property: 'og:image', content: img }, { name: 'twitter:image', content: img }] : [])] };
  },
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  const p = products.find(x => x.id === id)!;
  const photos = [p.image, ...(p.galerie ?? [])].filter(Boolean);
  const [current, setCurrent] = useState(0);
  const available = isAvailable(p);
  return <main id="contenu" className="product-page page-width">
    <nav className="breadcrumb" aria-label="Fil d’Ariane"><Link to="/">Accueil</Link> / <Link to="/collection/$slug" params={{ slug: p.categorie }}>{labels[p.categorie]}</Link> / <span>{p.nom}</span></nav>
    <div className="product-layout">
      <div className="product-gallery">
        <div className={available ? 'gallery-main' : 'gallery-main sold-out'}><ProductImage key={photos[current]} src={photos[current]} alt={`${p.nom}, ${p.taille}`} eager/></div>
        {photos.length > 1 && <div className="gallery-thumbs">{photos.map((src, i) => <button key={src + i} className={i === current ? 'selected' : ''} onClick={() => setCurrent(i)} aria-label={`Photo ${i + 1}`}><ProductImage src={src} alt=""/></button>)}</div>}
      </div>
      <div className="product-details">
        <p className="eyebrow">{labels[p.categorie]}</p>
        <h1>{p.nom}</h1>
        <p className="dialog-price">{price(p.prix)} <span>/ {p.taille}</span></p>
        <span className={available ? 'inline-stock' : 'inline-stock unavailable'}>{available ? 'En stock' : 'Épuisé'}</span>
        <p className="product-description">{p.description}</p>
        {p.notesOlfactives && <div className="notes"><h3>Notes olfactives</h3><p>{p.notesOlfactives}</p></div>}
        <OrderButton product={p} large/>
      </div>
    </div>
  </main>;
}
