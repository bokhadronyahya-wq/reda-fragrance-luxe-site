# Reda Fragrance Luxe Site

Build a complete, professional website for a perfume business called "Reda Fragrance". The entire website must be in French (all text, buttons, labels, menus, placeholder content, meta tags). Use clean, modern, responsive code (mobile-first) with HTML, CSS and vanilla JavaScript only, no frameworks needed.

═══════════════════════════════
1. ABOUT THE BUSINESS
═══════════════════════════════
Reda Fragrance est une entreprise spécialisée dans l’univers de la parfumerie, invitant ses clients à découvrir des fragrances adaptées à leurs goûts et à leur style. La marque propose un univers dédié aux parfums, permettant à chacun de trouver une fragrance qui correspond à sa personnalité et qui accompagne chaque occasion. L’objectif du site web est de présenter les parfums disponibles, de faciliter leur découverte et d’offrir une expérience de navigation élégante et agréable. Avec pour slogan « Redécouvrez l’art du parfum », Reda Fragrance souhaite mettre en valeur l’univers de la parfumerie. Les informations concernant l’ancienneté de l’entreprise, sa localisation, ses valeurs spécifiques et ses zones de livraison restent à confirmer.

═══════════════════════════════
2. DESIGN & INSPIRATION
═══════════════════════════════
Take inspiration from the layout and feel of https://twinfragrance.shop:
- Simple header with the brand name/logo centered or left, and a navigation menu
- Large hero banner image at the top of the home page
- A "Collections" section made of big, image-based category cards with the category name underneath/overlaid
- A featured product section
- Clean product grids with large photos
- Minimal footer with social links and legal links

Differences from that site (IMPORTANT):
- NO contact page and NO "Contact" menu item
- NO shopping cart, NO checkout, NO payment system, NO payment-method icons, NO quantity selectors
- NO ads, NO promo banners, NO popups, NO announcement bars, NO third-party tracking scripts

Color palette: BLACK and GOLD only (plus white/off-white for text where needed).
- Background: deep black (#0a0a0a / #111111)
- Accent: elegant gold (#C9A227 / #D4AF37, with a lighter gold #E6C75A for hovers)
- Text: white / soft ivory on dark, black on gold buttons
- Use thin gold borders, subtle gold gradients, and soft hover transitions
Typography: an elegant serif for titles (e.g. Playfair Display or Cinzel) and a clean sans-serif for body text (e.g. Montserrat or Lato), loaded from Google Fonts.
The overall feel: luxury, refined, minimal, lots of breathing room.

═══════════════════════════════
3. PAGES & STRUCTURE
═══════════════════════════════
Navigation menu (header): Accueil | Catalogue | Hommes | Femmes | Cosmétiques & Maquillage
Include a simple search bar that filters products by name. The menu must collapse into a hamburger menu on mobile.

HOME PAGE (Accueil):
1. Hero banner (image + title "Reda Fragrance" + short tagline + button "Découvrir le catalogue")
2. Collections: 3 large image cards → "Parfums Hommes", "Parfums Femmes", "Cosmétiques & Maquillage"
3. Featured products: a selection of 4 to 8 products flagged as "featured" in the stock file
4. À propos (from the business description above)
5. A large call-to-action block with the WhatsApp button (see section 5)

CATALOGUE PAGE:
- Shows all products in a responsive grid, with filter tabs: Tous | Hommes | Femmes | Cosmétiques & Maquillage
- Sorting options: Nouveautés, Prix croissant, Prix décroissant
- The catalogue must be clearly divided into these sections:
  • Section "Hommes" (men's perfumes)
  • Section "Femmes" (women's perfumes)
  • A special, visually distinct section "Cosmétiques & Maquillage" with its own heading, its own intro text, a gold-framed banner, and its own subcategories (e.g. Soins visage, Maquillage, Soins corps, Accessoires)

PRODUCT CARD (same everywhere):
- Product photo (large, square or 4:5 ratio, hover zoom)
- Brand/name, size (e.g. 100 ml), price in "DH" (e.g. "450 DH")
- Availability badge: "En stock" or "Épuisé" (sold-out products stay visible but greyed out)
- A button "Commander sur WhatsApp" that opens WhatsApp with a pre-filled message (see section 5)
Optional: clicking a card opens a detail modal with a bigger image, description, notes olfactives (for perfumes) and the WhatsApp button.

FOOTER:
- Brand name + short tagline
- Social link: Instagram → https://www.instagram.com/reda_fragrences
- Short links: Accueil, Catalogue
- "© 2026 Reda Fragrance. Tous droits réservés."
(No contact form, no payment icons.)

═══════════════════════════════
4. STOCK MANAGEMENT (OWNER ONLY, NO LOGIN)
═══════════════════════════════
- NO login system, NO user accounts, NO public admin page, NO edit buttons visible to visitors. Visitors must only be able to VIEW products.
- All products live in ONE single, well-commented data file (for example `stock.js` exposing a `PRODUCTS` array, so the site also works when opened without a server). The owner edits stock ONLY by editing this file.
- Each product has these fields:
  id, nom, marque, categorie ("hommes" | "femmes" | "cosmetiques"), sousCategorie (optional, for cosmetics), taille (e.g. "100 ml"), prix (number, in DH), enStock (true/false), quantite (number), vedette (true/false, shown on home page), nouveau (true/false), description, notesOlfactives (optional), image (path to the image)
- The site reads this file and builds all pages automatically. Adding, removing, changing a price, or marking a product "Épuisé" = editing one line in this file, nothing else.
- For now, fill the file with PLACEHOLDER products: about 8 for men, 8 for women, and 8 for cosmetics/makeup, with fake names like "Parfum Homme 01", "Parfum Femme 01", "Rouge à lèvres 01", placeholder prices, and placeholder images (see below). Mix in some "Épuisé" and "vedette" items so I can see how they look.
- Include a short "README" at the top of the stock file in French explaining to the owner how to add/modify a product.

═══════════════════════════════
5. WHATSAPP & INSTAGRAM (REPLACES THE ENTIRE BUYING SYSTEM)
═══════════════════════════════
There is no online purchase. Every "buy" action is a WhatsApp button:
- Button text: "Contactez-nous sur WhatsApp"
- WhatsApp number: 0714103589 (Morocco). Use the international format in the link: https://wa.me/212714103589
- On product cards and modals, the link pre-fills a French message with the product name, e.g.:
  https://wa.me/212714103589?text=Bonjour%20Reda%20Fragrance%2C%20je%20suis%20int%C3%A9ress%C3%A9(e)%20par%20%3A%20[NOM%20DU%20PRODUIT]
- Make the WhatsApp button gold with black text, prominent, and also add a floating WhatsApp button fixed at the bottom-right of every page.
- Instagram: "reda_fragrences" → https://www.instagram.com/reda_fragrences (header or footer icon + a "Suivez-nous sur Instagram" button on the home page).

═══════════════════════════════
6. IMAGES
═══════════════════════════════
I will provide my own images. Use a clear `images/` folder structure and put obvious placeholders in the meantime (e.g. a gold-bordered dark placeholder tile with the text "Image à venir"). Reference images through one place only (the stock file for products, and a small config block at the top of the main script for hero/collection/about images) so that I can swap them easily:
- images/hero.jpg
- images/collection-hommes.jpg
- images/collection-femmes.jpg
- images/collection-cosmetiques.jpg
- images/about.jpg
- images/logo.png (if no logo is provided, use the text "REDA FRAGRANCE" in gold serif lettering)
- images/products/<product-id>.jpg
Add `alt` text in French and lazy loading on all images.

[I WILL ATTACH / PASTE MY IMAGES HERE]

═══════════════════════════════
7. QUALITY REQUIREMENTS
═══════════════════════════════
- Fully responsive (mobile, tablet, desktop), fast loading, accessible (contrast, alt text, keyboard navigation)
- SEO basics in French: title, meta description, Open Graph tags, `lang="fr"`
- Smooth but subtle animations (fade-in on scroll, hover effects), nothing flashy
- Clean, well-commented code, organized files (index.html, catalogue.html, css/style.css, js/main.js, stock.js, images/)
- Deliver everything ready to run: I should be able to open index.html and see the full site working

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/01919d87-e72d-4112-a6b4-1c283137ac49).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
