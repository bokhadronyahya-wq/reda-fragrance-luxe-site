import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactBand } from '@/components/fragrance/site';
import { ProductCard } from '@/components/fragrance/product-card';
import { images } from '@/data/config';
import { products, instagram, reglages } from '@/data/products';

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: 'Reda Fragrance — Redécouvrez l’art du parfum' },
    { name: 'description', content: 'Découvrez l’univers Reda Fragrance : parfums pour hommes et femmes, cosmétiques et maquillage. Échangez et commandez sur WhatsApp.' },
    { property: 'og:title', content: 'Reda Fragrance — Redécouvrez l’art du parfum' },
    { property: 'og:description', content: 'Une fragrance pour chaque personnalité. Explorez nos collections de parfums et de beauté.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

function Index() {
  // Textes de la bannière et de la section « À propos » : réglés depuis /admin.
  const titre = String(reglages.hero_titre || 'Reda Fragrance');
  const parties = titre.split(' ');
  const titreDebut = parties[0] ?? titre;
  const titreSuite = parties.slice(1).join(' ');
  const aproposTitre = String(reglages.apropos_titre || 'Plus qu’un parfum, une expression de soi.');
  const virgule = aproposTitre.indexOf(', ');
  const aproposDebut = virgule > 0 ? aproposTitre.slice(0, virgule) : aproposTitre;
  const aproposSuite = virgule > 0 ? aproposTitre.slice(virgule + 2) : '';
  const aproposParagraphes = String(reglages.apropos_texte || '').split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  const collections = [
    { to: '/hommes', title: 'Parfums Hommes', subtitle: 'Le caractère, en toute élégance', image: images.hommes, number: '01' },
    { to: '/femmes', title: 'Parfums Femmes', subtitle: 'L’essence de votre singularité', image: images.femmes, number: '02' },
    { to: '/cosmetiques', title: 'Cosmétiques & Maquillage', subtitle: 'La beauté dans chaque détail', image: images.cosmetiques, number: '03' },
  ] as const;
  return <main id="contenu">
    <section className="hero"><img className="hero-image" src={images.hero} alt="Flacons de parfum dorés sur un socle de marbre noir" loading="lazy" width="1920" height="1024"/><div className="hero-shade"/><div className="hero-inner page-width"><p className="eyebrow hero-eyebrow"><span/> L’ESSENCE DE VOTRE SINGULARITÉ</p><h1>{titreDebut}{titreSuite ? <><br/><em>{titreSuite}</em></> : null}<span className="hero-dot">.</span></h1><p className="hero-tagline">{String(reglages.hero_sous_titre || 'Redécouvrez l’art du parfum.')}</p><p className="hero-description">{String(reglages.hero_description || 'Des fragrances qui vous ressemblent. Une signature qui ne ressemble qu’à vous.')}</p><Button asChild className="large-button"><Link to="/catalogue">Découvrir le catalogue <ArrowRight size={17}/></Link></Button></div><div className="hero-bottom page-width"><span>PARFUMS & BEAUTÉ</span><a href="#collections">Explorez notre univers <span>↓</span></a><span>REDA FRAGRANCE</span></div></section>
    <section id="collections" className="section page-width"><div className="section-heading"><div><p className="eyebrow">TROIS UNIVERS, UNE MÊME PASSION</p><h2>Nos collections<span className="gold-dot">.</span></h2></div><p>À chaque personnalité, son univers.</p></div><div className="collection-grid">{collections.map(c => <Link to={c.to} key={c.to} className="collection-card"><div className="collection-photo"><img src={c.image} alt={c.title} loading="lazy" width="1024" height="1024"/><span className="collection-number">{c.number}</span><span className="collection-arrow"><ArrowUpRight size={23}/></span></div><h3>{c.title}</h3><p>{c.subtitle}</p></Link>)}</div></section>
    <section className="featured-section"><div className="section page-width"><div className="section-heading"><div><p className="eyebrow">LA SÉLECTION REDA FRAGRANCE</p><h2>À découvrir<span className="gold-dot">.</span></h2></div><Button asChild variant="link"><Link to="/catalogue">Voir tout le catalogue <ArrowRight size={16}/></Link></Button></div><div className="product-grid">{products.filter(p => p.vedette).slice(0,8).map(p => <ProductCard key={p.id} product={p}/>)}</div></div></section>
    <section className="about-section page-width"><div className="about-photo"><img src={images.about} alt="Un flacon de parfum aux reflets dorés" loading="lazy" width="1024" height="1024"/><span className="about-image-label">L’art du parfum.</span></div><div className="about-copy"><p className="eyebrow">L’UNIVERS REDA FRAGRANCE</p><h2>{aproposDebut}{aproposSuite ? <>,<br/><em>{aproposSuite}</em></> : null}</h2>{aproposParagraphes.length ? aproposParagraphes.map((p, i) => <p key={i}>{p}</p>) : <><p>Un parfum révèle une personnalité, évoque un souvenir et accompagne les moments qui comptent.</p><p>Reda Fragrance vous invite à découvrir des fragrances adaptées à vos goûts et à votre style. Explorez un univers dédié à la parfumerie, où chacun peut trouver la fragrance qui lui ressemble et qui accompagne chaque occasion.</p></>}<div className="about-signature">{String(reglages.hero_sous_titre || 'Redécouvrez l’art du parfum.')}</div><Button asChild variant="outline" className="large-button"><a href={instagram} target="_blank" rel="noopener noreferrer"><Instagram size={17}/>Suivez-nous sur Instagram <ArrowUpRight size={16}/></a></Button></div></section>
    <ContactBand/>
  </main>;
}
