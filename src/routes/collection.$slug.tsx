import { createFileRoute, notFound } from '@tanstack/react-router';
import { Catalogue } from '@/components/fragrance/catalogue';
import { isCategory, labels } from '@/data/products';
import { SITE_URL } from '@/data/config';

export const Route = createFileRoute('/collection/$slug')({
  loader: ({ params }) => { if (!isCategory(params.slug)) throw notFound(); return { label: labels[params.slug] }; },
  head: ({ params, loaderData }) => {
    const t = `${loaderData?.label ?? 'Collection'} — Reda Fragrances`;
    const d = `Découvrez la collection ${loaderData?.label ?? ''} de Reda Fragrances et commandez sur WhatsApp.`;
    return { meta: [{ title: t }, { name: 'description', content: d }, { property: 'og:title', content: t }, { property: 'og:description', content: d }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }, { property: 'og:url', content: `${SITE_URL}/collection/${params.slug}` }] };
  },
  component: Page,
});
function Page() { const { slug } = Route.useParams(); return isCategory(slug) ? <Catalogue key={slug} category={slug}/> : null; }
