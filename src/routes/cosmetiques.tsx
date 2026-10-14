import { createFileRoute } from '@tanstack/react-router';
import { Catalogue } from '@/components/fragrance/catalogue';
export const Route = createFileRoute('/cosmetiques')({
  head: () => ({ meta: [{ title: 'Cosmétiques & Maquillage — Reda Fragrance' }, { name: 'description', content: 'Explorez les soins visage, soins corps, maquillage et accessoires Reda Fragrance. Découvrez vos essentiels beauté.' }, { property: 'og:title', content: 'Cosmétiques & Maquillage — Reda Fragrance' }, { property: 'og:description', content: 'Les essentiels de votre rituel beauté, chez Reda Fragrance.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: () => <Catalogue category="cosmetiques"/>,
});