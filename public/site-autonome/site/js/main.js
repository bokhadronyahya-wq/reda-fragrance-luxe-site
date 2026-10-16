/* REDA FRAGRANCE — Script principal du site.
 * Les textes, liens et images de présentation viennent de reglages.js,
 * et les produits de stock.js. Ces deux fichiers sont générés automatiquement
 * depuis le panneau d’administration (/admin) : ne les modifiez pas à la main.
 */
const R = Object.assign({
  hero_titre: 'Reda Fragrance', whatsapp: '212714103589', instagram: 'https://www.instagram.com/reda_fragrences',
  cosmetiques_intro: 'Soins délicats, essentiels de maquillage et accessoires : découvrez une autre facette de votre beauté.',
  image_hero: 'images/hero.jpg', image_hommes: 'images/collection-hommes.jpg', image_femmes: 'images/collection-femmes.jpg',
  image_cosmetiques: 'images/collection-cosmetiques.jpg', image_apropos: 'images/about.jpg'
}, globalThis.REGLAGES || {});
const CONFIG = {
  hero: R.image_hero, hommes: R.image_hommes, femmes: R.image_femmes,
  cosmetiques: R.image_cosmetiques, about: R.image_apropos, logo: 'images/logo.png'
};
const PRODUCTS = globalThis.PRODUCTS;
const LABELS = { hommes: 'Hommes', femmes: 'Femmes', cosmetiques: 'Cosmétiques & Maquillage' };
const WA = 'https://wa.me/' + String(R.whatsapp).replace(/\D/g, '');
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const waLink = product => WA + '?text=' + encodeURIComponent('Bonjour Reda Fragrance, je suis intéressé(e) par : ' + product.nom);
const money = value => new Intl.NumberFormat('fr-MA').format(value) + ' DH';
const icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/></svg>';
const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
function photo(p) { return '<img src="' + escapeHTML(p.image) + '" alt="' + escapeHTML(p.nom + ', ' + p.taille) + '" loading="lazy">'; }
function card(p) {
  const available = p.enStock && p.quantite > 0;
  return `<article class="product-card ${available ? '' : 'sold-out'}"><button class="product-photo" data-detail="${escapeHTML(p.id)}" aria-label="Voir ${escapeHTML(p.nom)}">${photo(p)}<span class="stock-badge ${available ? '' : 'unavailable'}">${available ? 'En stock' : 'Épuisé'}</span>${p.nouveau ? '<span class="new-badge">Nouveau</span>' : ''}<span class="detail-icon">+</span></button><div class="product-info"><p class="product-brand">${escapeHTML(p.marque)}</p><button class="product-name" data-detail="${escapeHTML(p.id)}">${escapeHTML(p.nom)}</button><div class="product-meta"><span>${escapeHTML(p.taille)}</span><strong>${money(p.prix)}</strong></div><a class="product-order btn rf-gold" href="${waLink(p)}" target="_blank" rel="noopener noreferrer">${icon}Contactez-nous sur WhatsApp</a></div></article>`;
}
function bindImages() {
 document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
   const tile=document.createElement('div');tile.className='image-placeholder';tile.innerHTML='<span class="placeholder-monogram">RF</span><span>Image à venir</span>';tile.setAttribute('role','img');tile.setAttribute('aria-label',img.alt || 'Image à venir');img.replaceWith(tile);
  }, { once:true });
 });
}
// Textes modifiables depuis l’administration.
const setText = (key, html) => document.querySelectorAll('[data-text="' + key + '"]').forEach(el => { el.innerHTML = html; });
if (globalThis.REGLAGES) {
 const t = String(R.hero_titre || '').trim().split(/\s+/);
 setText('hero_titre', escapeHTML(t[0] || '') + (t.length > 1 ? '<br><em>' + escapeHTML(t.slice(1).join(' ')) + '</em>' : '') + '<span class="hero-dot">.</span>');
 ['hero_sous_titre', 'hero_description', 'apropos_titre'].forEach(k => R[k] && setText(k, escapeHTML(R[k])));
 if (R.apropos_texte) setText('apropos_texte', String(R.apropos_texte).split(/\n\s*\n/).map(p => '<p>' + escapeHTML(p.trim()) + '</p>').join(''));
}
document.querySelectorAll('a[href*="wa.me/"]').forEach(a => { const q = a.href.split('?')[1]; a.href = WA + (q ? '?' + q : ''); });
document.querySelectorAll('a[href*="instagram.com"]').forEach(a => { a.href = R.instagram; });
document.querySelectorAll('[data-image]').forEach(img => { img.src=CONFIG[img.dataset.image]; });
// Si votre logo.png existe, il remplace automatiquement le nom en texte.
const logo=new Image();
logo.onload=()=>{const mark=document.querySelector('.wordmark');logo.alt='Reda Fragrance';logo.loading='lazy';mark.replaceChildren(logo);};
logo.src=CONFIG.logo;
const page=document.body.dataset.page;
const nav=document.querySelector('.main-nav');
document.querySelector('.menu-toggle').addEventListener('click',e=>{
 const open=nav.classList.toggle('is-open');e.currentTarget.setAttribute('aria-expanded',String(open));e.currentTarget.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');
});
document.querySelectorAll('.nav-link').forEach(link=>{ if(link.getAttribute('href')===page+'.html')link.classList.add('active'); });
const searchButton=document.querySelector('[aria-label="Rechercher un produit"]');
searchButton.addEventListener('click',()=>{
 let form=document.querySelector('.header-search');
 if(form){form.remove();return;}
 form=document.createElement('form');form.className='header-search';form.action='catalogue.html';form.innerHTML='<input name="q" aria-label="Rechercher par nom" placeholder="Rechercher un parfum, un soin…"><button class="rf-gold" type="submit">Rechercher</button>';
 document.querySelector('.site-header').append(form);form.querySelector('input').focus();
});
if(page==='index')document.querySelector('.featured-section .product-grid').innerHTML=PRODUCTS.filter(p=>p.vedette).slice(0,8).map(card).join('');
let filter=LABELS[page]?page:'tous',query=new URLSearchParams(location.search).get('q')||'',sort='nouveautes',sub='Tous';
function renderCatalogue() {
 const area=document.getElementById('catalogue');if(!area)return;
 area.innerHTML=`<div class="catalogue-intro page-width"><p class="eyebrow">L’UNIVERS REDA FRAGRANCE</p><h1>${LABELS[page]||'Notre catalogue'}<span class="gold-dot">.</span></h1><p>${page==='cosmetiques'?'Des essentiels beauté pour sublimer vos rituels du quotidien.':'Découvrez la fragrance qui deviendra votre signature.'}</p></div><div class="page-width"><div class="catalogue-controls"><div class="filter-tabs" role="group" aria-label="Filtrer par collection">${['tous','hommes','femmes','cosmetiques'].map(c=>`<button class="filter-tab ${filter===c?'selected':''}" data-filter="${c}">${LABELS[c]||'Tous'}</button>`).join('')}</div><div class="search-sort"><label class="catalogue-search"><span aria-hidden="true">⌕</span><input aria-label="Rechercher un produit par nom" placeholder="Rechercher un produit…" value="${escapeHTML(query)}"></label><label class="sort-select"><span class="sr-only">Trier les produits</span><select><option value="nouveautes">Nouveautés</option><option value="croissant">Prix croissant</option><option value="decroissant">Prix décroissant</option></select></label></div></div><p id="result-count" class="result-count" aria-live="polite"></p><div id="catalogue-sections"></div></div>`;
 area.querySelector('select').value=sort;
 area.querySelector('input').addEventListener('input',e=>{query=e.target.value;renderProducts();});
 area.querySelector('select').addEventListener('change',e=>{sort=e.target.value;renderProducts();});
 renderProducts();
}
function renderProducts() {
 const list=PRODUCTS.filter(p=>(filter==='tous'||p.categorie===filter)&&normalize(p.nom).includes(normalize(query.trim()))&&(p.categorie!=='cosmetiques'||sub==='Tous'||p.sousCategorie===sub)).sort((a,b)=>sort==='croissant'?a.prix-b.prix:sort==='decroissant'?b.prix-a.prix:Number(b.nouveau)-Number(a.nouveau));
 document.getElementById('result-count').textContent=list.length+' produit'+(list.length!==1?'s':'');
 document.getElementById('catalogue-sections').innerHTML=['hommes','femmes','cosmetiques'].filter(c=>filter==='tous'||filter===c).map(c=>{
  const rows=list.filter(p=>p.categorie===c);
  const heading=c==='cosmetiques'?`<div class="cosmetics-banner"><img src="${CONFIG.cosmetiques}" alt="Essentiels de maquillage noir et or" loading="lazy"><div><p class="eyebrow">LE RITUEL BEAUTÉ</p><h2>Cosmétiques & Maquillage</h2><p>${escapeHTML(R.cosmetiques_intro)}</p></div></div><div class="subcategory-tabs" role="group" aria-label="Sous-catégories beauté">${['Tous','Soins visage','Maquillage','Soins corps','Accessoires'].map(s=>`<button class="btn ${s===sub?'selected':''}" data-sub="${s}">${s}</button>`).join('')}</div>`:`<div class="catalogue-section-title"><h2>${LABELS[c]}</h2><span>${rows.length} produits</span></div>`;
  return '<section class="catalogue-section">'+heading+(rows.length?'<div class="product-grid">'+rows.map(card).join('')+'</div>':'<p class="empty-results">Aucun produit ne correspond à votre recherche.</p>')+'</section>';
 }).join('');bindImages();
}
if(page!=='index')renderCatalogue();
const dialog=document.getElementById('product-dialog');
let lastTrigger;
document.addEventListener('click',e=>{
 const f=e.target.closest('[data-filter]');if(f){filter=f.dataset.filter;sub='Tous';renderCatalogue();return;}
 const s=e.target.closest('[data-sub]');if(s){sub=s.dataset.sub;renderProducts();return;}
 const trigger=e.target.closest('[data-detail]');if(!trigger)return;
 const p=PRODUCTS.find(p=>p.id===trigger.dataset.detail);if(!p)return;
 lastTrigger=trigger;
 document.getElementById('detail-body').innerHTML=`<div class="dialog-photo">${photo(p)}</div><div class="dialog-info"><p class="eyebrow">${escapeHTML(p.marque)}</p><h2 id="dialog-title">${escapeHTML(p.nom)}</h2><p class="dialog-price">${money(p.prix)} <span>/ ${escapeHTML(p.taille)}</span></p><span class="inline-stock">${p.enStock&&p.quantite>0?'En stock':'Épuisé'}</span><p class="dialog-description">${escapeHTML(p.description)}</p>${p.notesOlfactives?'<div class="notes"><h3>Notes olfactives</h3><p>'+escapeHTML(p.notesOlfactives)+'</p></div>':''}<a class="large-button btn rf-gold" href="${waLink(p)}" target="_blank" rel="noopener noreferrer">${icon}Contactez-nous sur WhatsApp</a></div>`;
 dialog.setAttribute('aria-labelledby','dialog-title');dialog.showModal();bindImages();
});
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>lastTrigger?.focus());
bindImages();
