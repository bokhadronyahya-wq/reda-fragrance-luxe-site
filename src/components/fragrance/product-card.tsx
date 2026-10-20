import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Product, price, whatsapp, isAvailable } from '@/data/products';

export function ProductImage({ src, alt, eager = false }: { src: string; alt: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  return failed ? <div className="image-placeholder"><span className="placeholder-monogram">RF</span><span>Image à venir</span></div> : <img src={'/' + src.replace(/^\/+/, '')} alt={alt} loading={eager ? 'eager' : 'lazy'} onError={() => setFailed(true)}/>;
}

export function OrderButton({ product, large = false }: { product: Product; large?: boolean }) {
  return <Button asChild className={large ? 'product-order large-button' : 'product-order'}><a href={whatsapp(product)} target="_blank" rel="noopener noreferrer"><MessageCircle size={large ? 17 : 14}/>Commander sur WhatsApp</a></Button>;
}

export function ProductCard({ product }: { product: Product }) {
  const available = isAvailable(product);
  return <article className={available ? 'product-card' : 'product-card sold-out'}>
    <Link to="/produit/$id" params={{ id: product.id }} className="product-photo" aria-label={`Voir ${product.nom}`}><ProductImage src={product.image} alt={`${product.nom}, ${product.taille}`}/><span className={`stock-badge ${available ? '' : 'unavailable'}`}>{available ? 'En stock' : 'Épuisé'}</span>{product.nouveau && <span className="new-badge">Nouveau</span>}</Link>
    <div className="product-info"><Link to="/produit/$id" params={{ id: product.id }} className="product-name">{product.nom}</Link><div className="product-meta"><span>{product.taille}</span><strong>{price(product.prix)}</strong></div><OrderButton product={product}/></div>
  </article>;
}
