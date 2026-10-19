// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Les produits, textes et photos du site vivent dans public/site-autonome/content/
// (modifiés depuis /admin). Ils sont recopiés dans src/data/ avant chaque construction,
// pour que le site en ligne affiche toujours ce que le propriétaire a publié.
const generator = new URL("./public/site-autonome/scripts/build.mjs", import.meta.url).href;

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      {
        name: "reda-contenus",
        async buildStart() {
          const mod = await import(/* @vite-ignore */ generator);
          await mod.generate();
        },
      },
    ],
  },
});
