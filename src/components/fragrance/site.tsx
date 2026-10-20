import { useState } from 'react';
import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { ArrowUpRight, Instagram, Menu, Search, X, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { instagram, whatsapp } from '@/data/products';

export function WhatsAppLink({ className = '', children }: { className?: string; children?: React.ReactNode }) {
  return <Button asChild className={className}><a href={whatsapp()} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} />{children || 'Contactez-nous sur WhatsApp'}</a></Button>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const pathname = useRouterState({ select: s => s.location.pathname });
  const nav = [{ to: '/', text: 'Accueil' }, { to: '/catalogue', text: 'Catalogue' }] as const;
  function submit(e: React.FormEvent) { e.preventDefault(); navigate({ to: '/catalogue', search: { q: query } }); setOpen(false); setSearchOpen(false); }
  return <header className="site-header"><div className="header-inner">
    <Link to="/" className="wordmark" aria-label="Reda Fragrance, accueil"><span className="brand-mark">R<span>F</span></span><span>REDA<span className="wordmark-small">FRAGRANCE</span></span></Link>
    <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Navigation principale">{nav.map(n => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className={pathname === n.to ? 'nav-link active' : 'nav-link'}>{n.text}</Link>)}</nav>
    <div className="header-tools"><Button variant="ghost" size="icon" aria-label="Rechercher un produit" onClick={() => setSearchOpen(!searchOpen)}><Search /></Button><Button asChild variant="ghost" size="icon" className="instagram-header"><a href={instagram} aria-label="Instagram Reda Fragrance" target="_blank" rel="noopener noreferrer"><Instagram /></a></Button><Button variant="ghost" size="icon" className="menu-toggle" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>
  </div>{searchOpen && <form className="header-search" onSubmit={submit}><Search size={18} /><input autoFocus aria-label="Rechercher par nom" placeholder="Rechercher un parfum, un soin…" value={query} onChange={e => setQuery(e.target.value)} /><Button type="submit">Rechercher</Button></form>}</header>;
}

export function Footer() {
  return <><footer className="site-footer"><div className="footer-top page-width"><div><Link to="/" className="footer-brand">REDA FRAGRANCE</Link><p>Redécouvrez l’art du parfum.</p></div><div className="footer-links"><Link to="/">Accueil</Link><Link to="/catalogue">Catalogue</Link><a href={instagram} target="_blank" rel="noopener noreferrer"><Instagram size={16} /> Instagram <ArrowUpRight size={13}/></a></div></div><div className="footer-bottom page-width"><span>© 2026 Reda Fragrance. Tous droits réservés.</span><span>Le parfum, une signature personnelle.</span></div></footer><Button asChild size="icon" className="floating-whatsapp"><a href={whatsapp()} aria-label="Contactez-nous sur WhatsApp" title="Contactez-nous sur WhatsApp" target="_blank" rel="noopener noreferrer"><MessageCircle /></a></Button></>;
}

export function ContactBand() {
  return <section className="contact-band"><div className="page-width"><Sparkles className="contact-spark" size={25}/><p className="eyebrow">UNE ENVIE, UNE FRAGRANCE</p><h2>Votre prochaine signature<br/>commence ici.</h2><p>Un parfum vous séduit ? Échangeons ensemble sur WhatsApp.</p><WhatsAppLink className="large-button" /></div></section>;
}