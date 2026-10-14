import { useState } from 'react';
import { MessageCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { type Product, price, whatsapp } from '@/data/products';

export function ProductImage({ product }: { product: Product }) {
  const [failed, setFailed] = useState(false);
  return failed ? <div className="image-placeholder"><span className="placeholder-monogram">RF</span><span>Image à venir</span></div> : <img src={'/' + product.image} alt={`${product.nom}, ${product.taille}`} loading="lazy" onError={() => setFailed(true)}/>;
}
export function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const available = product.enStock && product.quantite > 0;
  return <><article className={available ? 'product-card' : 'product-card sold-out'}>
    <Button variant="ghost" className="product-photo" onClick={() => setOpen(true)} aria-label={`Voir ${product.nom}`}><ProductImage product={product}/><span className={`stock-badge ${available ? '' : 'unavailable'}`}>{available ? 'En stock' : 'Épuisé'}</span>{product.nouveau && <span className="new-badge">Nouveau</span>}<span className="detail-icon"><Plus size={18}/></span></Button>
    <div className="product-info"><p className="product-brand">{product.marque}</p><Button variant="link" className="product-name" onClick={() => setOpen(true)}>{product.nom}</Button><div className="product-meta"><span>{product.taille}</span><strong>{price(product.prix)}</strong></div><Button asChild className="product-order" variant="outline"><a href={whatsapp(product)} target="_blank" rel="noopener noreferrer"><MessageCircle size={14}/>Contactez-nous sur WhatsApp</a></Button></div>
  </article><Dialog open={open} onOpenChange={setOpen}><DialogContent className="product-dialog"><div className="dialog-photo"><ProductImage product={product}/></div><div className="dialog-info"><p className="eyebrow">{product.marque}</p><DialogTitle>{product.nom}</DialogTitle><p className="dialog-price">{price(product.prix)} <span> / {product.taille}</span></p><span className="inline-stock">{available ? 'En stock' : 'Épuisé'}</span><DialogDescription>{product.description}</DialogDescription>{product.notesOlfactives && <div className="notes"><h3>Notes olfactives</h3><p>{product.notesOlfactives}</p></div>}<Button asChild className="large-button"><a href={whatsapp(product)} target="_blank" rel="noopener noreferrer"><MessageCircle size={17}/>Contactez-nous sur WhatsApp</a></Button></div></DialogContent></Dialog></>;
}