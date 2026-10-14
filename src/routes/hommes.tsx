import { createFileRoute } from '@tanstack/react-router';
import { Catalogue } from '@/components/fragrance/catalogue';
export const Route = createFileRoute('/hommes')({
  head: () => ({ meta: [{ title: 'Parfums Hommes — Reda Fragrance' }, { name: 'description', content: 'Découvrez les parfums pour hommes de Reda Fragrance. Trouvez votre signature et échangez sur WhatsApp.' }, { property: 'og:title', content: 'Parfums Hommes — Reda Fragrance' }, { property: 'og:description', content: 'Des fragrances masculines pour chaque personnalité.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: () => <Catalogue category="hommes"/>,
});