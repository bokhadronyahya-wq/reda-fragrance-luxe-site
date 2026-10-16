<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Keep TanStack file routes for the live preview, with a shared header/footer and reusable catalogue and product components; this preserves the platform runtime and consistent navigation.
- Product and site-text source of truth is `public/site-autonome/content/` (JSON edited via Decap CMS at `/admin`, GitHub backend with Netlify OAuth); `scripts/build.mjs` generates `site/stock.js` and `site/reglages.js`, and the generated `stock.js` is copied to `src/data/stock.js` for the preview; this gives the owner an authenticated editor with no secrets in code.
- `public/site-autonome` is the Netlify repository root (publish dir `site/`); generated JS is committed so `site/*.html` still opens via file URLs without a build step.
- Store theme colors and visual styles in the global design system; this keeps the preview and autonomous version visually consistent.
