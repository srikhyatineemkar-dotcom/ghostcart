import { Product } from '../types';

export const BEAUTY_PRODUCTS: Product[] = [
  {
    id: 'b_sc_1',
    name: 'Hydrating Peptide Face Serum',
    price: 890,
    originalPrice: 1100,
    weightOrVolume: '30 ml',
    rating: 4.8,
    reviewCount: 1250,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
    category: 'Skin Care',
    experience: 'beauty',
    description: 'A revolutionary serum packed with multi-weight Hyaluronic Acid and 5 powerful peptides to deeply plump, repair skin barrier, and restore glass-like hydration.',
    deliveryTime: 'Next Day',
    brand: 'GLOW LAB',
    tags: ['Award Winner', 'Vegan', 'Cruelty Free']
  },
  {
    id: 'b_mu_1',
    name: 'Ultra Matte Liquid Lipstick (Royal Cherry)',
    price: 650,
    originalPrice: 750,
    weightOrVolume: '4.5 ml',
    rating: 4.7,
    reviewCount: 3840,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop&q=80',
    category: 'Makeup',
    experience: 'beauty',
    description: 'High-pigment, smudge-proof liquid lipstick with a luxurious weightless matte formula that stays flawless for up to 16 hours without drying your lips.',
    deliveryTime: '2 Days',
    brand: 'K-BEAUTY',
    tags: ['Best Seller', 'Waterproof']
  },
  {
    id: 'b_fr_1',
    name: 'French Lavender & Vanilla Eau De Parfum',
    price: 2450,
    originalPrice: 2950,
    weightOrVolume: '50 ml',
    rating: 4.9,
    reviewCount: 450,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=80',
    category: 'Fragrances',
    experience: 'beauty',
    description: 'An elegant Eau de Parfum blending relaxing French lavender, rich Madagascan warm vanilla, and subtle notes of musk and sandalwood.',
    deliveryTime: 'Next Day',
    brand: 'Maison Luxe',
    tags: ['Luxury', 'Long Lasting']
  },
  {
    id: 'b_hc_1',
    name: 'Keratin Damage Repair Hair Mask',
    price: 1200,
    originalPrice: 1450,
    weightOrVolume: '200 g',
    rating: 4.6,
    reviewCount: 920,
    image: 'https://images.unsplash.com/photo-1526413232644-8a40f03cc0c6?w=600&auto=format&fit=crop&q=80',
    category: 'Hair Care',
    experience: 'beauty',
    description: 'Deep conditioning salon-grade mask infused with hydrolyzed keratin proteins, argan oil, and biotin to repair dry, heat-damaged, frizzy hair in just 5 minutes.',
    deliveryTime: 'Next Day',
    brand: 'SALON PRO',
    tags: ['Pro-Choice', 'Sulfates-Free']
  },
  {
    id: 'b_sc_2',
    name: 'Vitamin C Brightening Sunscreen SPF 50',
    price: 520,
    originalPrice: 599,
    weightOrVolume: '50 g',
    rating: 4.5,
    reviewCount: 1670,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80',
    category: 'Skin Care',
    experience: 'beauty',
    description: 'Hybrid mineral sunscreen offering broad-spectrum UVA/UVB protection while active Vitamin C corrects dark spots and boosts natural complexion glow. Zero white cast!',
    deliveryTime: '1 Day',
    brand: 'SKINSHIELD',
    tags: ['Non-Greasy', 'Broad Spectrum']
  },
  {
    id: 'b_mu_2',
    name: '9-Color Nude Eyeshadow Palette',
    price: 1150,
    originalPrice: 1399,
    weightOrVolume: '15 g',
    rating: 4.8,
    reviewCount: 830,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop&q=80',
    category: 'Makeup',
    experience: 'beauty',
    description: 'Exquisite curation of 9 ultra-blendable warm neutrals, rich chocolate mattes, and intensely pigmented champagne shimmers for day-to-night versatile looks.',
    deliveryTime: '2 Days',
    brand: 'CHIC COSMETICS',
    tags: ['Highly Pigmented', 'Fall Colors']
  },
  {
    id: 'b_bb_1',
    name: 'Nourishing Coconut Body Butter',
    price: 490,
    originalPrice: 550,
    weightOrVolume: '250 g',
    rating: 4.7,
    reviewCount: 480,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop&q=80',
    category: 'Bath & Body',
    experience: 'beauty',
    description: 'Indulgent, thick whipped body cream enriched with organic cold-pressed virgin coconut oil and shea butter. Deeply moisturizes skin for up to 48 hours.',
    deliveryTime: 'Next Day',
    brand: 'NATURAL GLOW',
    tags: ['Organic', 'Eco-certified']
  }
];

const BEAUTY_CATEGORIES = [
  'Makeup', 'Skin Care', 'Hair Care', 'Fragrances', 'Bath & Body', 'Luxury Beauty'
];

const BEAUTY_BRANDS = [
  'GLOW LAB', 'K-BEAUTY', 'Maison Luxe', 'SALON PRO', 'SKINSHIELD',
  'CHIC COSMETICS', 'NATURAL GLOW', 'ESTHE-CO', 'DERMA-VITE', 'LUMINOUS',
  'BOSCIA', 'FOREST DEW', 'VELVET BLOOM', 'COSMO ART'
];

const BEAUTY_SEED_TEMPLATES: Record<string, { base: string; images: string[]; wt: string; desc: string }[]> = {
  'Makeup': [
    { base: 'Liquid Eyeliner Ultra Black', images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348'], wt: '3.5 ml', desc: 'Precision brush-tip black eyeliner pen with a quick dry, smudge-proof 24-hour formula.' },
    { base: 'Strobe Glow Liquid Primer', images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9'], wt: '30 ml', desc: 'Luminous liquid highlighting primer that blurs imperfections and creates a lit-from-within pearlescent base.' },
    { base: 'Cheek & Lip Velvet Tint', images: ['https://images.unsplash.com/photo-1586495777744-4413f21062fa'], wt: '8 g', desc: 'Bouncy whipped cream blush tint that melts seamlessly into the skin for a beautiful flush of color.' }
  ],
  'Skin Care': [
    { base: 'Active Ceramide Repair Gel', images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be'], wt: '50 g', desc: 'Lightweight gel-moisturizer enriched with three essential ceramides to repair and fortify the natural skin barrier.' },
    { base: 'Retinol Youth Restore Serum', images: ['https://images.unsplash.com/photo-1598440947619-2c35fc9aa908'], wt: '30 ml', desc: 'Gentle microencapsulated retinol serum that targets fine lines, refines skin texture, and speeds surface renewal.' },
    { base: 'Clay Detox Mud Mask', images: ['https://images.unsplash.com/photo-1608248597279-f99d160bfcbc'], wt: '100 g', desc: 'Kaolin and bentonite clay mud mask designed to draw out impurities, absorb excess sebum, and shrink pores.' }
  ],
  'Hair Care': [
    { base: 'Argan Hydration Revital Shampoo', images: ['https://images.unsplash.com/photo-1526413232644-8a40f03cc0c6'], wt: '300 ml', desc: 'Nourishing botanical hair wash infused with certified organic Moroccan argan oil to restore shine.' },
    { base: 'Biotin Growth scalp Serum', images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e'], wt: '50 ml', desc: 'Stimulating root serum with biotin and caffeine to promote thicker, fuller, and healthier hair follicles.' }
  ],
  'Fragrances': [
    { base: 'Smoky Oud Majestic Cologne', images: ['https://images.unsplash.com/photo-1541643600914-78b084683601'], wt: '100 ml', desc: 'An opulent fragrance combining aromatic cardamoms, deep incense, and rich dark agarwood oud.' },
    { base: 'Citrus Vetiver Fresh Mist', images: ['https://images.unsplash.com/photo-1594035910387-fea47794261f'], wt: '50 ml', desc: 'Bright revitalizing scent featuring Sicilian lime, cooling green vetiver, and subtle oakmoss notes.' }
  ],
  'Bath & Body': [
    { base: 'Himalayan Pink Salt Bath Scrub', images: ['https://images.unsplash.com/photo-1608248597279-f99d160bfcbc'], wt: '300 g', desc: 'Mineral rich body exfoliant infused with fine pink rock salt crystals and relaxing lavender oils.' },
    { base: 'Aloe Calming Moisture Gel', images: ['https://images.unsplash.com/photo-1526413232644-8a40f03cc0c6'], wt: '200 ml', desc: 'Soothing hydration jelly prepared with cold pressed fresh inner leaf aloe vera gel.' }
  ],
  'Luxury Beauty': [
    { base: '24K Gold Cellular Elixir', images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be'], wt: '15 ml', desc: 'Sumptuous face oil containing real 24-karat gold flakes to deliver cellular renewal and brilliant radiance.' }
  ]
};

// Generate 260 completely unique high-quality products with zero duplication
for (let i = BEAUTY_PRODUCTS.length + 1; i <= 265; i++) {
  const cat = BEAUTY_CATEGORIES[i % BEAUTY_CATEGORIES.length];
  const brand = BEAUTY_BRANDS[i % BEAUTY_BRANDS.length];
  const templates = BEAUTY_SEED_TEMPLATES[cat] || BEAUTY_SEED_TEMPLATES['Skin Care'];
  const template = templates[i % templates.length];
  
  const uniqName = `${brand} ${template.base} (Model ${i})`;
  const uniqueImg = `${template.images[0]}?w=600&auto=format&fit=crop&q=80&sig=b_${i}`;
  const price = 250 + (i * 13) % 2200;
  const originalPrice = i % 2 === 0 ? Math.round(price * 1.2) : undefined;
  const rating = parseFloat((4.1 + (i % 9) * 0.1).toFixed(1));
  const reviewCount = 80 + (i * 15) % 3200;

  BEAUTY_PRODUCTS.push({
    id: `b_gen_${i}`,
    name: uniqName,
    price,
    originalPrice,
    weightOrVolume: template.wt,
    rating: rating > 5 ? 5 : rating,
    reviewCount,
    image: uniqueImg,
    category: cat,
    experience: 'beauty',
    description: `${template.desc} Expertly formulated, dermatologically certified, cruelty-free, and proudly free of harsh chemical parabens.`,
    deliveryTime: i % 3 === 0 ? 'Next Day' : '2 Days',
    brand,
    tags: [brand, 'Luxury Quality']
  });
}
