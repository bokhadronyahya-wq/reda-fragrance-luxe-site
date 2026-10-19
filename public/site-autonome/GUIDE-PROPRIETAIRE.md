# Guide du propriétaire — Reda Fragrance

Votre site se gère depuis **redafragrance.netlify.app/admin**. Les visiteurs ne voient jamais de bouton de modification : seul un compte que vous avez autorisé peut entrer dans l’administration.

La connexion passe par **GitHub** (le service qui garde les fichiers du site). Vous choisissez vous-même votre mot de passe en créant votre compte GitHub ; il n’est écrit nulle part dans le site.

## 1. Mettre le site sur GitHub et le relier à Netlify

1. Créez un compte gratuit sur https://github.com (activez la double authentification dans *Settings → Password and authentication*, recommandé).
2. Cliquez sur **New repository**, nommez-le `reda-fragrance`, choisissez **Private**, puis **Create repository**.
3. Cliquez sur **uploading an existing file** et déposez **tout le contenu** de ce dossier (`content`, `scripts`, `site`, `netlify.toml`, ce guide). Validez avec **Commit changes**.
4. Ouvrez `site/admin/config.yml` sur GitHub (icône crayon) et remplacez `VOTRE-COMPTE-GITHUB/reda-fragrance` par votre nom d’utilisateur GitHub suivi de `/reda-fragrance`. Enregistrez.
5. Sur https://app.netlify.com : **Add new project → Import an existing project → GitHub**, choisissez `reda-fragrance`. Les réglages se remplissent seuls grâce à `netlify.toml` (commande `node scripts/build.mjs`, dossier `site`). Cliquez sur **Deploy**.
6. Dans *Project configuration → General → Project name*, choisissez `redafragrance` pour obtenir l’adresse redafragrance.netlify.app.

## 2. Activer la connexion à l’administration

1. Sur GitHub : photo de profil → **Settings → Developer settings → OAuth Apps → New OAuth App**.
   - Application name : `Reda Fragrance Admin`
   - Homepage URL : `https://redafragrance.netlify.app`
   - Authorization callback URL : `https://api.netlify.com/auth/done`
2. Cliquez sur **Register application**, puis **Generate a new client secret**. Gardez cette page ouverte.
3. Sur Netlify : *Project configuration → Access & security → OAuth → Install provider*, choisissez **GitHub** et collez le *Client ID* et le *Client secret*. Enregistrez.
   Ces codes restent uniquement dans Netlify : ne les copiez jamais dans un fichier du site.
4. Allez sur redafragrance.netlify.app/admin et cliquez sur **Se connecter avec GitHub**.

## 3. Donner l’accès à une autre personne (adresse e-mail)

Seuls les comptes GitHub ayant accès au dépôt peuvent se connecter.
- Sur GitHub, dans le dépôt : **Settings → Collaborators → Add people**, saisissez l’e-mail du propriétaire (ou de la personne autorisée).
- Elle reçoit une invitation par e-mail, crée son propre compte et son mot de passe, puis accepte l’invitation.
- Pour retirer un accès : même page, **Remove**.

## 4. Gérer le site au quotidien

Après chaque **Publier**, le site se met à jour en 1 à 2 minutes.

**Ajouter un produit** : *Produits → Nouveau Produit*, remplissez les champs (nom, catégorie, taille, prix en DH…), ajoutez une photo, puis **Publier**.

**Modifier un produit** (prix, stock, description) : *Produits* → cliquez sur le produit → modifiez → **Publier**. Pour le marquer épuisé, décochez **En stock** : il reste visible, grisé.

**Masquer un produit** sans le supprimer : décochez **Visible sur le site** → **Publier**. **Supprimer** définitivement : ouvrez le produit → **Supprimer l’entrée**.

**Changer les textes** (bannière, À propos, introduction Cosmétiques, WhatsApp, Instagram) : *Réglages du site → Textes, liens et images* → **Publier**. Le numéro WhatsApp s’écrit au format international sans le 0 : `212714103589`.

**Remplacer les images principales** : même page, cliquez sur l’image (bannière, collections, À propos) → **Choisir une image** → importez votre photo → **Publier**. Conseil : photos horizontales d’environ 1920 × 1000 px pour la bannière, carrées d’environ 1200 px pour le reste.

Les 24 produits actuels sont des exemples : remplacez-les ou masquez-les au fur et à mesure.

## 5. Utiliser /admin sur Vercel (au lieu de Netlify)

1. Dans Vercel, réglages du projet : **Root Directory** = le dossier qui contient `vercel.json`, `api/`, `site/`. Le fichier `vercel.json` règle le reste.
2. Sur GitHub : **Settings → Developer settings → OAuth Apps → New OAuth App**
   - Homepage URL : `https://reda-fragrance.vercel.app`
   - Authorization callback URL : `https://reda-fragrance.vercel.app/api/callback`
   Puis **Generate a new client secret**.
3. Dans Vercel : *Settings → Environment Variables*, ajoutez
   - `OAUTH_GITHUB_CLIENT_ID` = le Client ID
   - `OAUTH_GITHUB_CLIENT_SECRET` = le Client secret
4. Dans `site/admin/config.yml`, remplacez `https://reda-fragrance.vercel.app` par votre vraie adresse Vercel, et vérifiez que `repo:` correspond à `RedaMohidi45/<nom-du-dépôt>`.
5. Redéployez, puis ouvrez `https://reda-fragrance.vercel.app/admin/` et cliquez sur **Se connecter avec GitHub**.
