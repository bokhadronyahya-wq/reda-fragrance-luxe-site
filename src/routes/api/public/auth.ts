// Démarre la connexion GitHub du panneau /admin (Decap CMS).
// Les codes secrets sont lus dans les variables d’environnement de l’hébergeur
// (OAUTH_GITHUB_CLIENT_ID), jamais dans le code.
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/public/auth')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const clientId = process.env['OAUTH_GITHUB_CLIENT_ID'];
        if (!clientId) {
          return new Response(
            "Le code d’identification GitHub est manquant dans les réglages de l’hébergeur (OAUTH_GITHUB_CLIENT_ID).",
            { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
          );
        }

        const url = new URL(request.url);
        const host = request.headers.get('x-forwarded-host') ?? url.host;
        const proto = request.headers.get('x-forwarded-proto') ?? (url.protocol === 'http:' ? 'http' : 'https');
        const state = crypto.randomUUID().replace(/-/g, '');

        const target = new URL('https://github.com/login/oauth/authorize');
        target.searchParams.set('client_id', clientId);
        target.searchParams.set('redirect_uri', `${proto}://${host}/api/public/callback`);
        target.searchParams.set('scope', 'repo,user');
        target.searchParams.set('state', state);

        return new Response(null, {
          status: 302,
          headers: {
            Location: target.toString(),
            'Set-Cookie': `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
            'Cache-Control': 'no-store',
          },
        });
      },
    },
  },
});
