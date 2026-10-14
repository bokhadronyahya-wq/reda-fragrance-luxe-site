import { createFileRoute } from '@tanstack/react-router';
import { Catalogue } from '@/components/fragrance/catalogue';

export const Route = createFileRoute('/catalogue')({
  validateSearch: (search: Record<string, unknown>): { q?: string } => typeof search['q'] === 'string' ? { q: search['q'] } : {},
  head: () => ({ meta: [{ title: 'Catalogue de parfums et beauté — Reda Fragrance' }, { name: 'description', content: 'Explorez les parfums hommes et femmes, cosmétiques et maquillage Reda Fragrance. Filtrez votre sélection et commandez sur WhatsApp.' }, { property: 'og:title', content: 'Le catalogue Reda Fragrance' }, { property: 'og:description', content: 'Parfums et essentiels beauté à découvrir dans notre catalogue.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: Page,
});
function Page() { const { q } = Route.useSearch(); return <Catalogue key={q || ''} initialQuery={q || ''}/>; }