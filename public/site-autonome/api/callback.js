// Vercel : reçoit la réponse de GitHub et transmet le jeton au panneau /admin.
module.exports = async (req, res) => {
  const url = new URL(req.url, 'https://x');
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookie = (req.headers.cookie || '').match(/oauth_state=([a-f0-9]+)/);
  let status = 'error', content = { error: 'Connexion refusée.' };

  if (code && state && cookie && cookie[1] === state) {
    try {
      const r = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: process.env.OAUTH_GITHUB_CLIENT_ID,
          client_secret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
          code,
        }),
      });
      const data = await r.json();
      if (data.access_token) { status = 'success'; content = { token: data.access_token, provider: 'github' }; }
      else content = { error: data.error_description || 'Jeton introuvable.' };
    } catch (e) { content = { error: 'Erreur de connexion à GitHub.' }; }
  }

  const message = JSON.stringify(`authorization:github:${status}:${JSON.stringify(content)}`);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Set-Cookie', 'oauth_state=; Path=/api; Max-Age=0');
  res.end(`<!doctype html><html lang="fr"><body><p>Connexion en cours…</p><script>
  (function () {
    function recevoir(e) {
      window.opener.postMessage(${message}, e.origin);
      window.removeEventListener('message', recevoir);
    }
    window.addEventListener('message', recevoir);
    window.opener.postMessage('authorizing:github', '*');
  })();
  </script></body></html>`);
};
