/* =============================================
   BROW BEAUTY HUB — SHOP JAVASCRIPT
   ============================================= */

// =============================================
// PRODUCT DATA — derived from full catalogue
// =============================================
const PRODUCTS = [
  // ── BROW ──────────────────────────────────
  { id: 1,  name: 'Eyebrow Gel',               cat: 'brow',    price: 30,   tag: 'Bestseller', desc: 'Professional styling gel for sculpted, defined brows all day long.' },
  { id: 2,  name: 'Brow Kit',                  cat: 'brow',    price: 30,   tag: null,         desc: 'Everything you need to shape and style your brows at home.' },
  { id: 3,  name: 'Dark Brown Powder',          cat: 'brow',    price: 20,   tag: null,         desc: 'Pigmented brow powder for bold, defined arches with a soft finish.' },
  { id: 4,  name: 'Dark Blonde Powder',         cat: 'brow',    price: 20,   tag: null,         desc: 'Natural-looking blonde brow powder for lighter brow tones.' },
  { id: 5,  name: 'Medium Brown Powder',        cat: 'brow',    price: 20,   tag: null,         desc: 'Versatile medium-brown shade to fill and define brows naturally.' },
  { id: 6,  name: 'Light Brown Powder',         cat: 'brow',    price: 20,   tag: null,         desc: 'Soft light-brown powder ideal for a natural feathered brow look.' },
  { id: 7,  name: 'Soft Black Powder',          cat: 'brow',    price: 20,   tag: null,         desc: 'Deep soft-black brow powder for dramatic, defined results.' },
  { id: 8,  name: 'Elleplex for Brow',          cat: 'brow',    price: null, tag: null,         desc: 'Professional brow treatment solution for lamination and repair.' },
  { id: 9,  name: 'Brow Lamination White Lotion', cat: 'brow',  price: null, tag: null,         desc: 'Professional white lamination lotion — step 1 for brow lamination.' },
  { id: 10, name: 'Brow Lamination Black Lotion', cat: 'brow',  price: null, tag: null,         desc: 'Professional setting lotion — step 2 for brow lamination.' },

  // ── LASH ──────────────────────────────────
  { id: 11, name: 'Lash Growth Mascara',        cat: 'lash',    price: 50,   tag: 'Bestseller', desc: 'Nourishing mascara that conditions lashes while boosting length and volume.' },
  { id: 12, name: 'FEGPLUS+ Eyelash Vitalised', cat: 'lash',    price: 65,   tag: 'New',        desc: 'Advanced lash serum clinically formulated to revitalise and enhance lash growth.' },
  { id: 13, name: 'Fake Lashes',                cat: 'lash',    price: 15,   tag: null,         desc: 'Salon-quality strip lashes for an instant glamorous effect at home.' },
  { id: 14, name: 'Fake Lash Glue',             cat: 'lash',    price: 10,   tag: null,         desc: 'Strong, gentle adhesive for strip lashes — long wear, easy removal.' },
  { id: 15, name: 'Lash Remover',               cat: 'lash',    price: null, tag: null,         desc: 'Professional grade lash extension remover for safe, clean application.' },
  { id: 16, name: 'Lash Lifting Rod',           cat: 'lash',    price: null, tag: null,         desc: 'Silicone lash lift rod kit for professional lash lifting treatments.' },
  { id: 17, name: 'Lash Lift White Lotion',     cat: 'lash',    price: null, tag: null,         desc: 'Step 1 perming lotion for lash lift treatments.' },
  { id: 18, name: 'Lash Lift Grey Lotion',      cat: 'lash',    price: null, tag: null,         desc: 'Step 2 setting lotion for lash lift treatments.' },
  { id: 19, name: 'Lash Lift Glue',             cat: 'lash',    price: null, tag: null,         desc: 'Adhesive for securing lashes to the rod during lash lift procedures.' },
  { id: 20, name: 'Lash Tint Paper',            cat: 'lash',    price: null, tag: null,         desc: 'Under-eye protection paper used during lash tinting services.' },

  // ── SKIN CARE (ASAP) ─────────────────────
  { id: 21, name: 'Simply Radiant Set',         cat: 'skin',    price: 149,  tag: 'Top Pick',   desc: 'Complete brightening kit for glowing, even-toned skin — by ASAP.' },
  { id: 22, name: 'Radiance Serum',             cat: 'skin',    price: 120,  tag: null,         desc: 'Brightening vitamin serum targeting dullness and uneven skin tone.' },
  { id: 23, name: 'Radiance Routine',           cat: 'skin',    price: 149,  tag: null,         desc: 'Full brightening routine bundle to achieve genuinely radiant skin.' },
  { id: 24, name: 'Repair + Radiance Duo',      cat: 'skin',    price: 100,  tag: null,         desc: 'Two-product duo combining deep repair and visible radiance-boosting.' },
  { id: 25, name: 'Firming Eye Lift',           cat: 'skin',    price: 109,  tag: null,         desc: 'Targeted eye treatment that lifts, firms, and reduces fine lines.' },
  { id: 26, name: 'DNA Renewal Treatment',      cat: 'skin',    price: 105,  tag: null,         desc: 'Advanced anti-ageing formula supporting cellular repair overnight.' },
  { id: 27, name: 'C Super Complex 30ml',       cat: 'skin',    price: 120,  tag: null,         desc: 'High-strength vitamin C complex for visible brightening and antioxidant protection.' },
  { id: 28, name: 'B Super Complex 30ml',       cat: 'skin',    price: 120,  tag: null,         desc: 'Niacinamide-rich B-complex serum to refine pores, balance and strengthen skin.' },
  { id: 29, name: 'A1 Super Serum 30ml',        cat: 'skin',    price: 120,  tag: 'Bestseller', desc: 'ASAP\'s iconic multi-action serum targeting ageing, pigmentation, and hydration.' },
  { id: 30, name: 'A+ Super Serum 30ml',        cat: 'skin',    price: 120,  tag: null,         desc: 'Enhanced vitamin A serum for accelerated anti-ageing and resurfacing results.' },
  { id: 31, name: 'Hydrating Night Repair+',    cat: 'skin',    price: 99,   tag: null,         desc: 'Intensive overnight moisturiser that restores and replenishes skin while you sleep.' },
  { id: 32, name: 'Hydrate + Repair Collection', cat: 'skin',   price: 100,  tag: null,         desc: 'Bundle of ASAP hydration and repair essentials for deeply nourished skin.' },
  { id: 33, name: 'Hydrating Lip Balm',         cat: 'skin',    price: 70,   tag: null,         desc: 'Intensely conditioning lip balm that softens and hydrates all day.' },
  { id: 34, name: 'Healthy Skin Essentials',    cat: 'skin',    price: null, tag: null,         desc: 'Curated ASAP starter bundle for building a healthy skin foundation.' },
  { id: 35, name: 'Platinum Collection',        cat: 'skin',    price: 100,  tag: null,         desc: 'Prestige ASAP collection featuring the brand\'s most powerful treatments.' },
  { id: 36, name: 'Post Treatment Kit',         cat: 'skin',    price: 99,   tag: null,         desc: 'Calming recovery kit recommended after facials or advanced skin treatments.' },
  { id: 37, name: 'Clear Complexion',           cat: 'skin',    price: 149,  tag: null,         desc: 'Targets blemish-prone skin — clears pores and prevents breakouts.' },
  { id: 38, name: 'Clear Complexion Gel',       cat: 'skin',    price: 65,   tag: null,         desc: 'Lightweight gel formula for ongoing blemish control between treatments.' },
  { id: 39, name: 'Cellulite + Skin Firming Treatment', cat: 'skin', price: 119, tag: null,    desc: 'Body treatment cream targeting the appearance of cellulite with firming action.' },
  { id: 40, name: 'CC Correcting Cream 75ml',   cat: 'skin',    price: 72,   tag: null,         desc: 'Tinted correcting cream offering coverage, SPF, and skin-care in one.' },
  { id: 41, name: 'Calming Gel',                cat: 'skin',    price: 20,   tag: null,         desc: 'Soothing aloe-based gel ideal after waxing, brow lamination, or facials.' },
  { id: 42, name: 'Carbon Mask',                cat: 'skin',    price: 10,   tag: null,         desc: 'Purifying charcoal mask that deep-cleanses pores and lifts surface impurities.' },
  { id: 43, name: 'Aha Bha Mask 300ml',         cat: 'skin',    price: null, tag: null,         desc: 'Professional-size exfoliating mask combining AHA and BHA acids for smooth skin.' },
  { id: 44, name: 'Seaweed Anti Ageing Mask',   cat: 'skin',    price: 10,   tag: null,         desc: 'Marine seaweed mask that plumps, firms, and targets visible ageing signs.' },
  { id: 45, name: 'Skin Care Eye Mask',         cat: 'skin',    price: null, tag: null,         desc: 'Hydrogel eye patches to brighten, depuff, and reduce fine lines around the eyes.' },
  { id: 46, name: 'Bioaqua Rice Mask',          cat: 'skin',    price: null, tag: null,         desc: 'Brightening rice extract mask for a luminous, even complexion.' },
  { id: 47, name: 'Blueberry Facial Kit',       cat: 'skin',    price: null, tag: null,         desc: 'Antioxidant-rich blueberry facial kit for glowing, revitalised skin.' },
  { id: 48, name: '50+ SPF Hydrating Defence 75ml', cat: 'skin', price: 75, tag: null,         desc: 'Daily broad-spectrum SPF50+ sunscreen with lightweight hydrating formula.' },
  { id: 49, name: 'SPF 50+ Ultimate Defence 100ml', cat: 'skin', price: 95, tag: null,         desc: 'Maximum-protection SPF 50+ oil-free defence for daily UV protection.' },
  { id: 50, name: 'Gentle Cleansing Gel 200ml', cat: 'skin',    price: 64,   tag: null,         desc: 'Mild pH-balanced cleansing gel that removes impurities without stripping moisture.' },
  { id: 51, name: 'Daily Facial Cleanser 200ml', cat: 'skin',   price: 64,   tag: null,         desc: 'Daily cleanser that gently purifies skin while maintaining the natural moisture barrier.' },
  { id: 52, name: 'Daily Exfoliating Scrub 200ml', cat: 'skin', price: 64,  tag: null,         desc: 'Fine-grain exfoliating scrub for smooth, bright skin with daily use.' },
  { id: 53, name: 'Daily Exfoliating Scrub 1 Litre', cat: 'skin', price: null, tag: null,      desc: 'Professional salon-size daily exfoliating scrub — perfect for in-treatment use.' },
  { id: 54, name: 'Cream to Oil Cleanser 200ml', cat: 'skin',   price: 79,   tag: null,         desc: 'Luxurious cream-to-oil formula that melts away makeup and impurities effortlessly.' },
  { id: 55, name: 'Advanced Hydrating Moisturiser 50ml', cat: 'skin', price: 109, tag: null,   desc: 'Rich moisturiser delivering long-lasting hydration for dry, dehydrated skin types.' },
  { id: 56, name: 'Advanced Hydrating Moisturiser 200ml', cat: 'skin', price: null, tag: null, desc: 'Salon-size version of the advanced hydrating moisturiser.' },
  { id: 57, name: 'Ultimate Hydration',         cat: 'skin',    price: 114,  tag: null,         desc: 'Intensive hydration formula designed to restore even the most dehydrated skin.' },
  { id: 58, name: 'Hydration Heroes',           cat: 'skin',    price: null, tag: null,         desc: 'ASAP hydration bundle — includes hero moisturising and serum products.' },
  { id: 59, name: 'Device – Anti Ageing & Rejuvenation', cat: 'skin', price: 70, tag: null,    desc: 'At-home rejuvenation device to enhance serum absorption and boost skin renewal.' },
  { id: 60, name: 'Dream Time Duo',             cat: 'skin',    price: 100,  tag: null,         desc: 'Night-time skin duo — repair and hydrate while you sleep for waking radiance.' },
  { id: 61, name: 'Twilight Trio ASAP x Mulgani', cat: 'skin',  price: 100,  tag: null,         desc: 'Collaboration gift set featuring three best-loved ASAP night-time essentials.' },
  { id: 62, name: 'All PMU Foam Cleanser',      cat: 'skin',    price: 15,   tag: null,         desc: 'Gentle foam cleanser formulated for cleansing after permanent makeup procedures.' },

  // Travel size
  { id: 63, name: 'Travel Size – Cream to Oil 50ml',  cat: 'skin', price: 44,   tag: null, desc: 'Miniature cream-to-oil cleanser — perfect for travel or to trial.' },
  { id: 64, name: 'Travel Size – Daily Exfoliating Scrub', cat: 'skin', price: null, tag: null, desc: 'Travel-size daily exfoliating scrub for smooth, radiant skin on the go.' },
  { id: 65, name: 'Travel Size Soothing Gel',   cat: 'skin',    price: 37.5, tag: null,         desc: 'Travel-sized soothing aloe gel — ideal for post-treatment care on the go.' },
  { id: 66, name: 'Travel Size – SPF 50+',      cat: 'skin',    price: 60,   tag: null,         desc: 'Travel-sized SPF 50+ hydrating defence sunscreen.' },
  { id: 67, name: 'Travel Size – Gentle Cleansing Gel 50ml', cat: 'skin', price: 37.5, tag: null, desc: 'Compact version of the gentle cleansing gel — great for handbags or travel.' },
  { id: 68, name: 'Travel Size – Daily Facial Cleanser 50ml', cat: 'skin', price: 37.5, tag: null, desc: 'Travel-friendly version of the daily facial cleanser.' },

  // ── WAX & TOOLS ───────────────────────────
  { id: 69, name: 'Wax Oil Full Refillable Jar', cat: 'wax',   price: null, tag: null,         desc: 'Full refillable wax oil jar — professional grade for soft, clean waxing.' },
  { id: 70, name: 'Wax Oil',                     cat: 'wax',   price: null, tag: null,         desc: 'Pre-wax and post-wax nourishing oil for smooth, comfortable waxing.' },
  { id: 71, name: 'Wax Beads',                   cat: 'wax',   price: null, tag: null,         desc: 'Low-temperature hard wax beads for professional waxing treatments.' },
  { id: 72, name: 'Strip Wax Tub',               cat: 'wax',   price: null, tag: null,         desc: 'Professional strip wax in a tub — smooth consistency for large body areas.' },
  { id: 73, name: 'Roller Wax',                  cat: 'wax',   price: null, tag: null,         desc: 'Roll-on wax cartridge system for fast, hygienic waxing treatments.' },
  { id: 74, name: 'Strips',                      cat: 'wax',   price: 0,    tag: null,         desc: 'Non-woven waxing strips compatible with strip wax applications.' },
  { id: 75, name: 'Small Wax Stick Packets',     cat: 'wax',   price: null, tag: null,         desc: 'Disposable small application sticks for precise wax placement.' },
  { id: 76, name: 'Big Wax Stick Packet',        cat: 'wax',   price: null, tag: null,         desc: 'Jumbo disposable waxing spatulas — perfect for larger body areas.' },
  { id: 77, name: 'Extra Large Sticks',          cat: 'wax',   price: null, tag: null,         desc: 'Extra-large wooden wax applicator sticks for full body waxing.' },
  { id: 78, name: 'Extension Glue',              cat: 'wax',   price: 0,    tag: null,         desc: 'Professional-grade adhesive for eyelash extension application.' },
  { id: 79, name: 'Facial Roller and Massager',  cat: 'wax',   price: null, tag: null,         desc: 'Gua sha-style facial roller for lymphatic drainage and product absorption.' },
  { id: 80, name: 'Scissor',                     cat: 'wax',   price: null, tag: null,         desc: 'Precision grooming scissors for trimming brow and lash area.' },
  { id: 81, name: 'Thread',                      cat: 'wax',   price: 0,    tag: null,         desc: 'Professional cotton threading thread for eyebrow and facial threading.' },
  { id: 82, name: 'Paper Tape',                  cat: 'wax',   price: null, tag: null,         desc: 'Skin-safe paper tape used for mapping and during lash treatments.' },
  { id: 83, name: 'Gel Patches',                 cat: 'wax',   price: 0,    tag: null,         desc: 'Gel eye pads for under-eye protection during lash services.' },
  { id: 84, name: 'Soothing Lotion / Aloe Vera Gel', cat: 'wax', price: null, tag: null,      desc: 'Post-wax soothing lotion to calm and hydrate skin after waxing.' },
  { id: 85, name: 'Gloves',                      cat: 'wax',   price: 0,    tag: null,         desc: 'Disposable nitrile gloves for hygiene during beauty treatments.' },
  { id: 86, name: 'Alcohol Wipes',               cat: 'wax',   price: 0,    tag: null,         desc: 'Sterile alcohol wipes for pre-treatment skin preparation and tool cleaning.' },
  { id: 87, name: 'Makeup Remover',              cat: 'general', price: null, tag: null,       desc: 'Gentle yet effective makeup remover for all skin types.' },

  // ── TATTOO & PMU ──────────────────────────
  { id: 88, name: 'T3 Tattoo Color',             cat: 'tattoo', price: null, tag: null,        desc: 'Professional T3 pigment for permanent makeup and cosmetic tattooing.' },
  { id: 89, name: 'T2 Tattoo Color',             cat: 'tattoo', price: null, tag: null,        desc: 'Professional T2 pigment range for precise, long-lasting PMU results.' },
  { id: 90, name: 'Vitamin D Ointment for Tattoo', cat: 'tattoo', price: 10,  tag: null,       desc: 'Healing ointment to support skin recovery and colour retention post-tattoo.' },
  { id: 91, name: 'Oxidant',                     cat: 'tattoo', price: 0,    tag: null,        desc: 'Developer oxidant for activating and mixing cosmetic tattoo pigments.' },
  { id: 92, name: 'Ph Activator',                cat: 'tattoo', price: null, tag: null,        desc: 'pH activator solution for optimising pigment uptake in PMU treatments.' },
  { id: 93, name: '10pc/Set Level 2 – Needles for Brow Tattoo', cat: 'tattoo', price: 1, tag: null, desc: 'Professional level 2 needle set for fine-line brow tattooing work.' },
  { id: 94, name: '6D 13mm Small Tray',          cat: 'tattoo', price: null, tag: null,        desc: '6D 13mm nano-needle tray for ultra-fine hairline brow stroke applications.' },
  { id: 95, name: '6D 12mm Small Tray',          cat: 'tattoo', price: null, tag: null,        desc: '6D 12mm nano-needle tray for precise microblading-style strokes.' },
  { id: 96, name: '6D 11mm',                     cat: 'tattoo', price: null, tag: null,        desc: '6D 11mm needle for delicate PMU and brow tattooing applications.' },
  { id: 97, name: '6D 10mm',                     cat: 'tattoo', price: null, tag: null,        desc: '6D 10mm micro needle for the finest detail in cosmetic tattoo work.' },
  { id: 98, name: '3D 13mm',                     cat: 'tattoo', price: null, tag: null,        desc: '3D 13mm needle for brow tattoo shading and blending.' },
  { id: 99, name: '3D 12mm',                     cat: 'tattoo', price: null, tag: null,        desc: '3D 12mm needle for precision PMU shading techniques.' },
  { id: 100, name: '3D 11mm',                    cat: 'tattoo', price: 0,    tag: null,        desc: '3D 11mm needle for versatile brow tattoo work.' },
  { id: 101, name: '3D 10mm',                    cat: 'tattoo', price: 1,    tag: null,        desc: '3D 10mm needles for the finest PMU detail and outline work.' },

  // ── GENERAL / HENNA & TINT ───────────────
  { id: 102, name: 'Natural Brown Henna',        cat: 'general', price: 0,   tag: null,        desc: 'Natural brown henna for brows — long-lasting, skin-staining brow colour.' },
  { id: 103, name: 'Light Brown Henna',          cat: 'general', price: 0,   tag: null,        desc: 'Light brown henna for subtle, natural-looking brow tinting results.' },
  { id: 104, name: 'Dark Brown Henna',           cat: 'general', price: 0,   tag: null,        desc: 'Rich dark brown henna for intense, defined brow colour and skin staining.' },
  { id: 105, name: 'Black Henna',                cat: 'general', price: 0,   tag: null,        desc: 'Deep black henna for maximum contrast, bold brow definition.' },
  { id: 106, name: 'Natural Brown Tint',         cat: 'general', price: 0,   tag: null,        desc: 'Professional natural brown brow tint for consistent, repeatable results.' },
  { id: 107, name: 'Light Brown Tint',           cat: 'general', price: 0,   tag: null,        desc: 'Light brown professional brow and lash tint.' },
  { id: 108, name: 'Black Tint',                 cat: 'general', price: 0,   tag: null,        desc: 'Professional black tint for brows and lashes — deep, rich colour.' },
  { id: 109, name: 'Blue Black Tint',            cat: 'general', price: 0,   tag: null,        desc: 'Blue-black professional tint for a cool-toned, high-contrast brow look.' },
  { id: 110, name: 'Liquid Platinum',            cat: 'general', price: 79,   tag: null,       desc: 'Platinum blonde tinting liquid for creative, lightened brow effects. 130ml.' },
];

// Placeholder images by category
const CAT_IMAGES = {
  brow:    'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&q=80',
  lash:    'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=400&q=80',
  skin:    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',
  wax:     'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80',
  tattoo:  'https://images.unsplash.com/photo-1588776814546-ec7e55c5b7e7?w=400&q=80',
  general: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
};

const CAT_LABELS = {
  brow: 'Brow', lash: 'Lash', skin: 'Skin Care',
  wax: 'Wax & Tools', tattoo: 'Tattoo & PMU', general: 'General Beauty'
};

// =============================================
// CART STATE (localStorage)
// =============================================
let cart = JSON.parse(localStorage.getItem('bbh_cart') || '[]');

function saveCart() { localStorage.setItem('bbh_cart', JSON.stringify(cart)); }

function getCartItem(id) { return cart.find(i => i.id === id); }

function addToCart(id, qty = 1) {
  const p = PRODUCTS.find(p => p.id === id);
  if (!p) return;
  const existing = getCartItem(id);
  if (existing) { existing.qty += qty; }
  else { cart.push({ id, qty }); }
  saveCart();
  updateCartUI();
  showToast(`"${p.name}" added to cart!`);
}

function updateCartItemQty(id, delta) {
  const item = getCartItem(id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
  renderCartSidebar();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
  renderCartSidebar();
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
  renderCartSidebar();
}

function cartTotal() {
  return cart.reduce((sum, ci) => {
    const p = PRODUCTS.find(p => p.id === ci.id);
    return sum + (p && p.price ? p.price * ci.qty : 0);
  }, 0);
}

function cartCount() { return cart.reduce((s, i) => s + i.qty, 0); }

function fmtPrice(n) { return n === null ? 'Enquire' : n === 0 ? 'POA' : `$${n % 1 !== 0 ? n.toFixed(2) : n}.00`; }

// =============================================
// RENDER PRODUCTS
// =============================================
let activeFilter = 'all';
let activeSort   = 'default';
let searchQuery  = '';

function filteredSorted() {
  let list = [...PRODUCTS];
  if (activeFilter !== 'all') list = list.filter(p => p.cat === activeFilter);
  if (searchQuery)            list = list.filter(p => p.name.toLowerCase().includes(searchQuery));

  switch (activeSort) {
    case 'az':   list.sort((a,b) => a.name.localeCompare(b.name)); break;
    case 'za':   list.sort((a,b) => b.name.localeCompare(a.name)); break;
    case 'lohi': list.sort((a,b) => (a.price ?? 9999) - (b.price ?? 9999)); break;
    case 'hilo': list.sort((a,b) => (b.price ?? 0) - (a.price ?? 0)); break;
  }
  return list;
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const list = filteredSorted();

  document.getElementById('resultsCount').textContent =
    `Showing ${list.length} product${list.length !== 1 ? 's' : ''}`;

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <i class="fa-solid fa-magnifying-glass"></i>
        <p>No products found</p>
        <span>Try a different search or category</span>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(p => {
    const inCart = !!getCartItem(p.id);
    const hasPrice = p.price !== null;
    const freeItem  = p.price === 0;
    const label = CAT_LABELS[p.cat] || p.cat;
    const fallbackImg = CAT_IMAGES[p.cat] || CAT_IMAGES.general;
    const productImg  = `images/products/${p.id}.jpg`;

    let btnClass = 'btn-add';
    let btnText  = '<i class="fa-solid fa-bag-shopping"></i> Add to Cart';
    if (!hasPrice) { btnClass = 'btn-add enquire'; btnText = '<i class="fa-solid fa-envelope"></i> Enquire'; }
    else if (inCart) { btnClass = 'btn-add in-cart'; btnText = '<i class="fa-solid fa-check"></i> In Cart'; }

    return `
    <div class="p-card" data-id="${p.id}">
      <div class="p-card-img">
        <img src="${productImg}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImg}';" />
        ${p.tag ? `<span class="p-tag">${p.tag}</span>` : ''}
      </div>
      <div class="p-body">
        <span class="p-cat">${label}</span>
        <h3 class="p-name">${p.name}</h3>
        <p class="p-desc">${p.desc}</p>
        <div class="p-footer">
          <span class="p-price${!hasPrice || freeItem ? ' no-price' : ''}">${fmtPrice(p.price)}</span>
          <div class="p-qty">
            <button class="qty-dec" data-id="${p.id}">−</button>
            <span class="qty-val" id="qty-${p.id}">1</span>
            <button class="qty-inc" data-id="${p.id}">+</button>
          </div>
        </div>
        <button class="${btnClass}" data-id="${p.id}" ${!hasPrice ? 'style="pointer-events:auto"' : ''}>${btnText}</button>
      </div>
    </div>`;
  }).join('');

  // Attach events
  grid.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = +btn.dataset.id;
      const p  = PRODUCTS.find(p => p.id === id);
      if (!p) return;
      if (p.price === null) {
        // Enquire — scroll to contact
        window.location.href = 'index.html#contact';
        return;
      }
      const qty = parseInt(document.getElementById(`qty-${id}`)?.textContent || '1', 10);
      addToCart(id, qty);
      btn.className = 'btn-add in-cart';
      btn.innerHTML = '<i class="fa-solid fa-check"></i> In Cart';
    });
  });

  grid.querySelectorAll('.qty-inc').forEach(btn => {
    btn.addEventListener('click', () => {
      const span = document.getElementById(`qty-${btn.dataset.id}`);
      span.textContent = Math.min(parseInt(span.textContent) + 1, 99);
    });
  });
  grid.querySelectorAll('.qty-dec').forEach(btn => {
    btn.addEventListener('click', () => {
      const span = document.getElementById(`qty-${btn.dataset.id}`);
      span.textContent = Math.max(parseInt(span.textContent) - 1, 1);
    });
  });
}

// =============================================
// CART SIDEBAR
// =============================================
function renderCartSidebar() {
  const container = document.getElementById('cartItems');
  const emptyEl   = document.getElementById('cartEmpty');
  const footer    = document.getElementById('cartFooter');
  const subtotal  = document.getElementById('cartSubtotal');

  if (cart.length === 0) {
    emptyEl.style.display = '';
    footer.style.display  = 'none';
    container.innerHTML   = '';
    container.appendChild(emptyEl);
    return;
  }

  emptyEl.style.display = 'none';
  footer.style.display  = '';
  subtotal.textContent  = `$${cartTotal().toFixed(2)}`;

  container.innerHTML = cart.map(ci => {
    const p = PRODUCTS.find(p => p.id === ci.id);
    if (!p) return '';
    const img = CAT_IMAGES[p.cat] || CAT_IMAGES.general;
    return `
    <div class="ci-row" data-ci-id="${p.id}">
      <img class="ci-img" src="${img}" alt="${p.name}" loading="lazy" />
      <div class="ci-info">
        <p class="ci-name">${p.name}</p>
        <p class="ci-price">${p.price ? `$${(p.price * ci.qty).toFixed(2)}` : 'POA'}</p>
      </div>
      <div class="ci-qty-wrap">
        <div class="ci-qty">
          <button class="ci-minus" data-cid="${p.id}">−</button>
          <span>${ci.qty}</span>
          <button class="ci-plus" data-cid="${p.id}">+</button>
        </div>
        <button class="ci-remove" data-cid="${p.id}">Remove</button>
      </div>
    </div>`;
  }).join('');

  container.querySelectorAll('.ci-minus').forEach(b =>
    b.addEventListener('click', () => updateCartItemQty(+b.dataset.cid, -1)));
  container.querySelectorAll('.ci-plus').forEach(b =>
    b.addEventListener('click', () => updateCartItemQty(+b.dataset.cid, 1)));
  container.querySelectorAll('.ci-remove').forEach(b =>
    b.addEventListener('click', () => removeFromCart(+b.dataset.cid)));
}

function updateCartUI() {
  const count = cartCount();
  const badge = document.getElementById('cartBadge');
  badge.textContent = count;
  badge.classList.toggle('hidden', count === 0);
  renderProducts(); // refresh in-cart button states
}

function openCart()  {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartSidebar();
}
function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// =============================================
// CHECKOUT
// =============================================
function openCheckout() {
  closeCart();
  document.getElementById('coBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
  setCheckoutStep(1);
}
function closeCheckout() {
  document.getElementById('coBackdrop').classList.remove('open');
  document.body.style.overflow = '';
}

function setCheckoutStep(step) {
  [1,2,3].forEach(n => {
    document.getElementById(`coStep${n}`).classList.toggle('hidden', n !== step);
    const s = document.querySelector(`.co-step[data-step="${n}"]`);
    s.classList.toggle('active', n === step);
    s.classList.toggle('done',   n < step);
  });

  if (step === 2) buildReview();
  // step 3 confirmation is built by submitOrder() after the API responds
}

function buildReview() {
  const items = document.getElementById('coReviewItems');
  items.innerHTML = cart.map(ci => {
    const p   = PRODUCTS.find(p => p.id === ci.id);
    const img = CAT_IMAGES[p.cat];
    return `
    <div class="co-ri">
      <img src="${img}" alt="${p.name}" loading="lazy"/>
      <div><p class="co-ri-name">${p.name}</p><p class="co-ri-qty">Qty: ${ci.qty}</p></div>
      <span class="co-ri-price">${p.price ? `$${(p.price * ci.qty).toFixed(2)}` : 'POA'}</span>
    </div>`;
  }).join('');

  const total = cartTotal().toFixed(2);
  document.getElementById('coRevSubtotal').textContent = `$${total}`;
  document.getElementById('coRevTotal').textContent    = `$${total}`;

  const f = document.getElementById('coFirst'), l = document.getElementById('coLast');
  const a = document.getElementById('coAddress'), c = document.getElementById('coCity'), ps = document.getElementById('coPost');
  document.getElementById('coDeliverySummary').innerHTML = `
    <strong>Deliver to:</strong><br>
    ${f.value} ${l.value}<br>
    ${a.value}, ${c.value} ${ps.value}<br>
    ${document.getElementById('coEmail').value}
  `;
}

function buildConfirmation(orderNumber) {
  document.getElementById('coOrderNum').textContent = `Order reference: ${orderNumber}`;
  document.getElementById('coConfirmMsg').textContent =
    `Thank you, ${document.getElementById('coFirst').value}! We've received your order and will be in touch at ${document.getElementById('coEmail').value} to confirm.`;
  clearCart();
  renderCartSidebar();
}

function validateStep1() {
  const ids = ['coFirst','coLast','coEmail','coAddress','coCity','coPost'];
  let ok = true;
  ids.forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('error');
    if (!el.value.trim()) { el.classList.add('error'); ok = false; }
  });
  // basic email check
  const em = document.getElementById('coEmail');
  if (em.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value)) {
    em.classList.add('error'); ok = false;
  }
  return ok;
}

// =============================================
// ORDER SUBMISSION (POST to Node.js backend)
// =============================================
async function submitOrder() {
  const btn = document.getElementById('coNext2');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Placing order…';

  const items = cart.map(ci => {
    const p = PRODUCTS.find(p => p.id === ci.id);
    return { id: ci.id, name: p.name, qty: ci.qty, price: p.price };
  });

  const total = cartTotal();

  const payload = {
    customer: {
      firstName: document.getElementById('coFirst').value,
      lastName:  document.getElementById('coLast').value,
      email:     document.getElementById('coEmail').value,
      phone:     document.getElementById('coPhone').value,
      address:   document.getElementById('coAddress').value,
      city:      document.getElementById('coCity').value,
      postcode:  document.getElementById('coPost').value,
      notes:     document.getElementById('coNotes').value,
    },
    items,
    subtotal: total,
    total,
  };

  try {
    let res;
    try {
      res = await fetch('/api/order', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
    } catch (_) {
      throw new Error('Could not reach the server. Please make sure it is running at http://localhost:3000 and try again.');
    }

    // Safely parse the response — never throw "Unexpected end of JSON"
    let data = {};
    try {
      const text = await res.text();
      if (text.trim()) data = JSON.parse(text);
    } catch (_) {
      throw new Error(`Server returned an unreadable response (status ${res.status}). Check the server console for errors.`);
    }

    if (!res.ok) throw new Error(data.error || `Server error (${res.status}). Please try again.`);

    // Success — advance to confirmation step with the server-issued order number
    [1,2,3].forEach(n => {
      document.getElementById(`coStep${n}`).classList.toggle('hidden', n !== 3);
      const s = document.querySelector(`.co-step[data-step="${n}"]`);
      s.classList.toggle('active', n === 3);
      s.classList.toggle('done',   n < 3);
    });
    buildConfirmation(data.orderNumber);

  } catch (err) {
    // Show error inline without closing the modal
    let errEl = document.getElementById('coSubmitError');
    if (!errEl) {
      errEl = document.createElement('p');
      errEl.id = 'coSubmitError';
      errEl.style.cssText = 'color:#d9534f;font-size:.88rem;margin-top:10px;text-align:center';
      document.getElementById('coNext2').parentNode.appendChild(errEl);
    }
    errEl.textContent = err.message;
  } finally {
    btn.disabled = false;
    btn.innerHTML = 'Place Order <i class="fa-solid fa-check"></i>';
  }
}

// =============================================
// TOAST
// =============================================
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('shopToast');
  document.getElementById('shopToastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {

  renderProducts();
  updateCartUI();

  // Filter buttons
  document.getElementById('filterBar').addEventListener('click', (e) => {
    const btn = e.target.closest('.fb-btn');
    if (!btn) return;
    document.querySelectorAll('.fb-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.cat;
    renderProducts();
  });

  // Sort
  document.getElementById('sortSelect').addEventListener('change', (e) => {
    activeSort = e.target.value;
    renderProducts();
  });

  // Search
  let searchTimer;
  document.getElementById('searchInput').addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderProducts();
    }, 300);
  });

  // Cart open/close
  document.getElementById('cartToggle').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  document.getElementById('continueBtn').addEventListener('click', closeCart);

  // Checkout
  document.getElementById('checkoutBtn').addEventListener('click', openCheckout);
  document.getElementById('coClose').addEventListener('click', closeCheckout);
  document.getElementById('coBackdrop').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeCheckout();
  });

  document.getElementById('coNext1').addEventListener('click', () => {
    if (validateStep1()) setCheckoutStep(2);
    else document.querySelector('.co-field input.error')?.focus();
  });
  document.getElementById('coBack2').addEventListener('click', () => setCheckoutStep(1));
  document.getElementById('coNext2').addEventListener('click', submitOrder);
  document.getElementById('coFinish').addEventListener('click', () => {
    closeCheckout();
    renderProducts();
  });

  // Clear error on input
  document.getElementById('coForm').querySelectorAll('input').forEach(el => {
    el.addEventListener('input', () => el.classList.remove('error'));
  });
});
