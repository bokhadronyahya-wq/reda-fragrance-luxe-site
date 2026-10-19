// Reçoit la réponse de GitHub et transmet le jeton au panneau /admin.
// Les codes secrets sont lus dans les variables d’environnement de l’hébergeur.
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/public/callback')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const code = url.searchParams.get('code');
        const state = url.searchParams.get('state');
        const cookie = /oauth_state=([a-f0-9]+)/.exec(request.headers.get('cookie') ?? '');

        let status = 'error';
        let content: Record<string, string> = { error: 'Connexion refusée.' };

        if (code && state && cookie && cookie[1] === state) {
          try {
            const res = await fetch('https://github.com/login/oauth/access_token', {
              method: 'POST',
              headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
              body: JSON.stringify({
                client_id: process.env['OAUTH_GITHUB_CLIENT_ID'],
                client_secret: process.env['OAUTH_GITHUB_CLIENT_SECRET'],
                code,
              }),
            });
            const data = (await res.json()) as { access_token?: string; error_description?: string };
            if (data.access_token) {
              status = 'success';
              content = { token: data.access_token, provider: 'github' };
            } else {
              content = { error: data.error_description || 'Jeton introuvable.' };
            }
          } catch {
            content = { error: 'Erreur de connexion à GitHub.' };
          }
        }

        const message = JSON.stringify(`authorization:github:${status}:${JSON.stringify(content)}`);
        const html = `<!doctype html><html lang="fr"><body><p>Connexion en cours…</p><script>
  (function () {
    function recevoir(e) {
      window.opener.postMessage(${message}, e.origin);
      window.removeEventListener('message', recevoir);
    }
    window.addEventListener('message', recevoir);
    window.opener.postMessage('authorizing:github', '*');
  })();
  </script></body></html>`;

        return new Response(html, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Set-Cookie': 'oauth_state=; Path=/; Max-Age=0',
            'Cache-Control': 'no-store',
          },
        });
      },
    },
  },
});
