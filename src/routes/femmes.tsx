import { createFileRoute } from '@tanstack/react-router';
import { Catalogue } from '@/components/fragrance/catalogue';
export const Route = createFileRoute('/femmes')({
  head: () => ({ meta: [{ title: 'Parfums Femmes — Reda Fragrance' }, { name: 'description', content: 'Découvrez les parfums pour femmes de Reda Fragrance. Une fragrance pour votre style et chaque occasion.' }, { property: 'og:title', content: 'Parfums Femmes — Reda Fragrance' }, { property: 'og:description', content: 'Explorez notre collection de parfums féminins.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: () => <Catalogue category="femmes"/>,
});