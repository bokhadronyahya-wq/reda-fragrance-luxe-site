import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppLink } from '@/components/fragrance/site';
import { images, tileImage, SITE_URL } from '@/data/config';
import { categories, instagram, instagramHandle } from '@/data/products';

const TITLE = 'Reda Fragrances – Parfums, Cosmétiques & Maquillage';
const DESC = 'Parfums femme et homme, formats 10 ml, cosmétiques et maquillage. Découvrez la boutique Reda Fragrances et commandez sur WhatsApp.';

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: TITLE }, { name: 'description', content: DESC },
    { property: 'og:title', content: TITLE }, { property: 'og:description', content: DESC },
    { property: 'og:type', content: 'website' }, { property: 'og:url', content: SITE_URL },
    { property: 'og:image', content: images.partage }, { property: 'og:image:width', content: '1200' }, { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' }, { name: 'twitter:image', content: images.partage },
  ] }),
  component: Index,
});

function Index() {
  return <main id="contenu">
    <section className="banner"><img src={images.hero} alt="Reda Fragrances — Parfums, Cosmétiques, Maquillage" width="2214" height="600"/></section>
    <section className="tiles page-width" aria-label="Nos catégories">
      {categories.map(c => <Link key={c.slug} to="/collection/$slug" params={{ slug: c.slug }} className="tile" aria-label={c.label}><img src={tileImage(c.slug)} alt={c.label} loading="lazy"/></Link>)}
    </section>
    <section className="social-bar page-width">
      <Button asChild variant="outline"><a href={instagram} target="_blank" rel="noopener noreferrer"><Instagram size={17}/>{instagramHandle}</a></Button>
      <WhatsAppLink/>
    </section>
  </main>;
}
