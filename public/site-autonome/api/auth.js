// Vercel : démarre la connexion GitHub pour /admin (Decap CMS).
// Les codes secrets sont lus dans les variables d'environnement Vercel, jamais dans le code.
const crypto = require('crypto');

module.exports = (req, res) => {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) { res.statusCode = 500; return res.end('OAUTH_GITHUB_CLIENT_ID manquant dans Vercel.'); }
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const state = crypto.randomBytes(16).toString('hex');
  const url = 'https://github.com/login/oauth/authorize?' + new URLSearchParams({
    client_id: clientId,
    redirect_uri: `https://${host}/api/callback`,
    scope: 'repo,user',
    state,
  });
  res.setHeader('Set-Cookie', `oauth_state=${state}; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);
  res.statusCode = 302;
  res.setHeader('Location', url);
  res.end();
};
