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
- The sole product source is `src/data/stock.js`, a commented classic JavaScript global array imported by the preview and copied unchanged into the autonomous delivery; this lets the owner edit one file without authentication or a server.
- Maintain a standalone vanilla HTML/CSS/JavaScript delivery under `public/site-autonome`, packaged from clean source files, so the requested site also opens via file URLs without a build step.
- Store theme colors and visual styles in the global design system; this keeps the preview and autonomous version visually consistent.
