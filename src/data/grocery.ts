import { Product } from '../types';

// Structured, high-fidelity real grocery items categorized perfectly
export const GROCERY_PRODUCTS: Product[] = [
  // Fruits & Vegetables
  {
    id: 'g_fv_1',
    name: 'Fresh Organic Cavendish Bananas',
    price: 65,
    originalPrice: 80,
    weightOrVolume: '1 kg (approx. 5-6 pcs)',
    rating: 4.8,
    reviewCount: 1420,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80',
    category: 'Fruits & Vegetables',
    experience: 'grocery',
    description: 'Perfectly ripe, pesticide-free organic Cavendish bananas sourced directly from certified orchards in Maharashtra.',
    deliveryTime: '10 mins',
    brand: 'Organic India',
    tags: ['Organic', 'Fresh', 'Bestseller']
  },
  {
    id: 'g_fv_2',
    name: 'Alphonso Mangoes (Devgad)',
    price: 549,
    originalPrice: 699,
    weightOrVolume: '6 pcs (approx. 1.5kg)',
    rating: 4.9,
    reviewCount: 3120,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80',
    category: 'Fruits & Vegetables',
    experience: 'grocery',
    description: 'The King of Mangoes. Sourced directly from Devgad orchards, known for their golden skin, rich aroma, and fiberless sweet pulp.',
    deliveryTime: '12 mins',
    brand: 'Devgad Agro',
    tags: ['Seasonal', 'Sweet', 'Premium']
  },
  {
    id: 'g_fv_3',
    name: 'Fresh Fuji Apples',
    price: 180,
    originalPrice: 220,
    weightOrVolume: '4 pcs (approx. 800g)',
    rating: 4.7,
    reviewCount: 940,
    image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=600&auto=format&fit=crop&q=80',
    category: 'Fruits & Vegetables',
    experience: 'grocery',
    description: 'Crisp and exceptionally sweet imported Fuji apples with a perfect rosy blush. Great for snacking or salad bowls.',
    deliveryTime: '10 mins',
    brand: 'Fuji Farms',
    tags: ['Fresh', 'Imported']
  },
  {
    id: 'g_fv_4',
    name: 'Organic Hass Avocados',
    price: 299,
    originalPrice: 349,
    weightOrVolume: '2 pcs (approx. 400g)',
    rating: 4.6,
    reviewCount: 650,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80',
    category: 'Fruits & Vegetables',
    experience: 'grocery',
    description: 'Buttery and rich Hass avocados imported from Mexico. Excellent source of healthy monounsaturated fats. Perfect for guacamole.',
    deliveryTime: '10 mins',
    brand: 'Haas Select',
    tags: ['Imported', 'Superfood']
  },
  {
    id: 'g_fv_5',
    name: 'Exotic Blueberries',
    price: 199,
    originalPrice: 249,
    weightOrVolume: '125 g',
    rating: 4.8,
    reviewCount: 480,
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=600&auto=format&fit=crop&q=80',
    category: 'Fruits & Vegetables',
    experience: 'grocery',
    description: 'Plump, sweet and juicy premium quality blueberries. Packed with antioxidants. Hand-sorted for supreme quality.',
    deliveryTime: '11 mins',
    brand: 'Zespri',
    tags: ['Exotic', 'Antioxidant']
  },
  {
    id: 'g_fv_6',
    name: 'Hydroponic Cherry Tomatoes',
    price: 95,
    originalPrice: 120,
    weightOrVolume: '250 g',
    rating: 4.7,
    reviewCount: 390,
    image: 'https://images.unsplash.com/photo-1561131248-c52d88624236?w=600&auto=format&fit=crop&q=80',
    category: 'Fruits & Vegetables',
    experience: 'grocery',
    description: 'Sweet and juicy cherry tomatoes grown in controlled hydroponic environments without soil. Absolute premium taste.',
    deliveryTime: '10 mins',
    brand: 'HydroFresh',
    tags: ['Hydroponic', 'Sweet']
  },
  {
    id: 'g_fv_7',
    name: 'Organic Broccoli Crowns',
    price: 85,
    originalPrice: 99,
    weightOrVolume: '1 pc (approx. 300g)',
    rating: 4.5,
    reviewCount: 870,
    image: 'https://images.unsplash.com/photo-1515595966-27a4379768f2?w=600&auto=format&fit=crop&q=80',
    category: 'Fruits & Vegetables',
    experience: 'grocery',
    description: 'Crunchy, dense green organic broccoli crowns packed with vitamins C and K. Handpicked with care.',
    deliveryTime: '10 mins',
    brand: 'FARM FRESH',
    tags: ['Organic', 'Fresh']
  },
  {
    id: 'g_fv_8',
    name: 'Fresh English Cucumber',
    price: 45,
    originalPrice: 55,
    weightOrVolume: '1 pc (approx. 250g)',
    rating: 4.4,
    reviewCount: 1120,
    image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=600&auto=format&fit=crop&q=80',
    category: 'Fruits & Vegetables',
    experience: 'grocery',
    description: 'Seedless, crisp, and refreshing English cucumber with a deep green rind. Perfect for cold salads and detox juices.',
    deliveryTime: '10 mins',
    brand: 'FARM FRESH',
    tags: ['Fresh', 'Salad Core']
  },
  {
    id: 'g_fv_9',
    name: 'Organic Red Onions',
    price: 55,
    originalPrice: 65,
    weightOrVolume: '1 kg',
    rating: 4.6,
    reviewCount: 4320,
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=600&auto=format&fit=crop&q=80',
    category: 'Fruits & Vegetables',
    experience: 'grocery',
    description: 'Pungent, flavorful organic red onions. Sourced from Nashik farmers. Ideal as the culinary base of Indian curries.',
    deliveryTime: '10 mins',
    brand: 'Nashik Valley',
    tags: ['Staple', 'Organic']
  },
  {
    id: 'g_fv_10',
    name: 'Fresh Russet Baking Potatoes',
    price: 75,
    originalPrice: 90,
    weightOrVolume: '2 kg',
    rating: 4.7,
    reviewCount: 2540,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
    category: 'Fruits & Vegetables',
    experience: 'grocery',
    description: 'Starchy and premium quality russet potatoes. Excellent for baking, mashing, or deep frying into classic golden chips.',
    deliveryTime: '10 mins',
    brand: 'Valley Fresh',
    tags: ['Staple', 'Kitchen Essentials']
  },

  // Dairy, Bread & Eggs
  {
    id: 'g_db_1',
    name: 'Amul Taaza Fresh Milk',
    price: 54,
    originalPrice: 56,
    weightOrVolume: '1 L (UHT Pack)',
    rating: 4.8,
    reviewCount: 8900,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop&q=80',
    category: 'Dairy, Bread & Eggs',
    experience: 'grocery',
    description: 'Homogenized toned milk with a long shelf life. Creamy taste, high-quality purity guaranteed by Amul.',
    deliveryTime: '10 mins',
    brand: 'Amul',
    tags: ['Bestseller', 'Daily Need']
  },
  {
    id: 'g_db_2',
    name: 'Amul Pasteurised Salted Butter',
    price: 275,
    originalPrice: 285,
    weightOrVolume: '500 g',
    rating: 4.9,
    reviewCount: 12450,
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=80',
    category: 'Dairy, Bread & Eggs',
    experience: 'grocery',
    description: 'The iconic salted yellow butter. Rich, creamy, and spreading joy across breakfast toasts for decades.',
    deliveryTime: '10 mins',
    brand: 'Amul',
    tags: ['Bestseller', 'Kitchen Core']
  },
  {
    id: 'g_db_3',
    name: 'Premium Sourdough Sliced Loaf',
    price: 125,
    originalPrice: 150,
    weightOrVolume: '400 g',
    rating: 4.7,
    reviewCount: 540,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    category: 'Dairy, Bread & Eggs',
    experience: 'grocery',
    description: 'Artisanal sourdough bread made using a traditional slow-fermentation process. Crusty exterior with an airy, soft, and sour crumb inside.',
    deliveryTime: '8 mins',
    brand: 'The Daily Knead',
    tags: ['Freshly Baked', 'Artisanal']
  },
  {
    id: 'g_db_4',
    name: 'Farm Fresh Organic Eggs',
    price: 95,
    originalPrice: 110,
    weightOrVolume: '6 pcs',
    rating: 4.6,
    reviewCount: 812,
    image: 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?w=600&auto=format&fit=crop&q=80',
    category: 'Dairy, Bread & Eggs',
    experience: 'grocery',
    description: 'Naturally laid eggs from free-range pasture-raised hens fed a premium non-GMO organic diet. High in Omega-3 and rich yolk flavor.',
    deliveryTime: '9 mins',
    brand: 'Eggo Farms',
    tags: ['High Protein', 'Free Range']
  },
  {
    id: 'g_db_5',
    name: 'Premium Fresh Paneer Block',
    price: 90,
    originalPrice: 100,
    weightOrVolume: '200 g',
    rating: 4.8,
    reviewCount: 4120,
    image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=600&auto=format&fit=crop&q=80',
    category: 'Dairy, Bread & Eggs',
    experience: 'grocery',
    description: 'Incredibly soft and melt-in-the-mouth cottage cheese block. High-protein dairy block prepared under hygienic standards.',
    deliveryTime: '10 mins',
    brand: 'Amul',
    tags: ['Fresh', 'High Protein']
  },
  {
    id: 'g_db_6',
    name: 'Epigamia Greek Yogurt (Plain)',
    price: 70,
    originalPrice: 80,
    weightOrVolume: '120 g',
    rating: 4.7,
    reviewCount: 930,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80',
    category: 'Dairy, Bread & Eggs',
    experience: 'grocery',
    description: 'Thick, creamy strained Greek yogurt packed with twice the protein. Contains active live cultures for gut wellness.',
    deliveryTime: '10 mins',
    brand: 'Epigamia',
    tags: ['Gut Health', 'High Protein']
  },

  // Munchies & Snacks
  {
    id: 'g_sn_1',
    name: "Lay's Classic Salted Chips",
    price: 30,
    originalPrice: 30,
    weightOrVolume: '90 g',
    rating: 4.6,
    reviewCount: 15800,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80',
    category: 'Munchies & Snacks',
    experience: 'grocery',
    description: 'Crispy golden potato chips sprinkled with mineral salt. The universal party favorite snack.',
    deliveryTime: '10 mins',
    brand: "Lay's",
    tags: ['Bestseller', 'Party Favorite']
  },
  {
    id: 'g_sn_2',
    name: 'Gourmet Cheese Corn Nachos',
    price: 85,
    originalPrice: 100,
    weightOrVolume: '150 g',
    rating: 4.5,
    reviewCount: 1240,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
    category: 'Munchies & Snacks',
    experience: 'grocery',
    description: 'Stone-ground golden yellow corn tortilla chips seasoned with rich cheddar cheese powder and real herbs.',
    deliveryTime: '10 mins',
    brand: 'Cornitos',
    tags: ['Gluten Free', 'Crunchy']
  },
  {
    id: 'g_sn_3',
    name: 'Slow Roasted Salted Cashews',
    price: 249,
    originalPrice: 299,
    weightOrVolume: '200 g',
    rating: 4.7,
    reviewCount: 1150,
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600&auto=format&fit=crop&q=80',
    category: 'Munchies & Snacks',
    experience: 'grocery',
    description: 'Extra-bold, roasted cashews, lightly seasoned with premium pink salt. Packed with vitamins and healthy fats.',
    deliveryTime: '10 mins',
    brand: 'Ghost Nuts',
    tags: ['Premium', 'Healthy Snack']
  },

  // Instant & Frozen Food
  {
    id: 'g_in_1',
    name: 'Korean Spicy Ramen (Double Fire)',
    price: 135,
    originalPrice: 145,
    weightOrVolume: '140 g',
    rating: 4.4,
    reviewCount: 5430,
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=600&auto=format&fit=crop&q=80',
    category: 'Instant & Frozen Food',
    experience: 'grocery',
    description: 'Super spicy instant ramen noodles. Thick chewy noodles coated in an intensely hot chili-infused broth. Not for the faint-hearted!',
    deliveryTime: '11 mins',
    brand: 'Samyang',
    tags: ['Spicy', 'Trending']
  },
  {
    id: 'g_in_2',
    name: 'McCain Golden French Fries',
    price: 160,
    originalPrice: 180,
    weightOrVolume: '750 g',
    rating: 4.7,
    reviewCount: 4210,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&auto=format&fit=crop&q=80',
    category: 'Instant & Frozen Food',
    experience: 'grocery',
    description: 'Crisp, premium quality potatoes cut into thin strips and flash-frozen. Bake or deep fry for restaurant-grade french fries.',
    deliveryTime: '12 mins',
    brand: 'McCain',
    tags: ['Frozen', 'Bestseller']
  },

  // Cold Drinks & Juices
  {
    id: 'g_cd_1',
    name: 'Coca-Cola Zero Sugar (Can)',
    price: 40,
    originalPrice: 40,
    weightOrVolume: '330 ml',
    rating: 4.8,
    reviewCount: 16400,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80',
    category: 'Cold Drinks & Juices',
    experience: 'grocery',
    description: 'The great refreshing taste of Coca-Cola, with zero sugar and zero calories. Best served chilled.',
    deliveryTime: '10 mins',
    brand: 'Coca-Cola',
    tags: ['Zero Sugar', 'Bestseller']
  },
  {
    id: 'g_cd_2',
    name: 'Raw Cold-Pressed Orange Juice',
    price: 120,
    originalPrice: 140,
    weightOrVolume: '250 ml',
    rating: 4.6,
    reviewCount: 1840,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&auto=format&fit=crop&q=80',
    category: 'Cold Drinks & Juices',
    experience: 'grocery',
    description: '100% natural, cold-pressed orange juice without added sugar, preservatives, or water. Rich in Vitamin C.',
    deliveryTime: '10 mins',
    brand: 'Raw Pressery',
    tags: ['Cold Pressed', 'Healthy']
  },

  // Tea, Coffee & Health Drinks
  {
    id: 'g_tc_1',
    name: 'Nescafé Gold Premium Coffee',
    price: 499,
    originalPrice: 550,
    weightOrVolume: '100 g',
    rating: 4.9,
    reviewCount: 6540,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    category: 'Tea, Coffee & Health Drinks',
    experience: 'grocery',
    description: 'Artfully crafted blend of mountain-grown Arabica and Robusta beans, golden-roasted to produce a rich and smooth aroma.',
    deliveryTime: '10 mins',
    brand: 'Nescafé',
    tags: ['Premium Coffee', 'Bestseller']
  },
  {
    id: 'g_tc_2',
    name: 'Organic Matcha Green Tea Powder',
    price: 799,
    originalPrice: 999,
    weightOrVolume: '50 g',
    rating: 4.8,
    reviewCount: 840,
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&auto=format&fit=crop&q=80',
    category: 'Tea, Coffee & Health Drinks',
    experience: 'grocery',
    description: 'Pure ceremonial-grade organic Japanese Uji Matcha powder. Loaded with antioxidants to boost metabolism and focused energy.',
    deliveryTime: '12 mins',
    brand: 'Matcha Ritual',
    tags: ['Superfood', 'Organic']
  },

  // Atta, Rice & Dal
  {
    id: 'g_ard_1',
    name: 'Royal Sharbati Wheat Atta',
    price: 299,
    originalPrice: 350,
    weightOrVolume: '5 kg',
    rating: 4.8,
    reviewCount: 4120,
    image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=600&auto=format&fit=crop&q=80',
    category: 'Atta, Rice & Dal',
    experience: 'grocery',
    description: 'Premium quality stone-ground Sharbati whole wheat flour. Makes incredibly soft, nutrient-packed rotis and phulkas.',
    deliveryTime: '12 mins',
    brand: 'Aashirvaad',
    tags: ['Staple', 'Premium']
  },
  {
    id: 'g_ard_2',
    name: 'Royal Basmati Rice (Aged)',
    price: 185,
    originalPrice: 220,
    weightOrVolume: '1 kg',
    rating: 4.9,
    reviewCount: 5240,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    category: 'Atta, Rice & Dal',
    experience: 'grocery',
    description: 'Super long grain, aged basmati rice with a magnificent pearly white color and rich buttery fragrance. Perfect for biryanis.',
    deliveryTime: '12 mins',
    brand: 'India Gate',
    tags: ['Aged Basmati', 'Premium']
  },

  // Oil, Ghee & Masalas
  {
    id: 'g_ogm_1',
    name: 'Pure Desi Cow Ghee Jar',
    price: 699,
    originalPrice: 750,
    weightOrVolume: '1 L',
    rating: 4.9,
    reviewCount: 3840,
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=80',
    category: 'Oil, Ghee & Masalas',
    experience: 'grocery',
    description: 'Prepared using the traditional Vedic bilona method from organic cow milk. Rich granulate texture with a soulful golden aroma.',
    deliveryTime: '10 mins',
    brand: 'Aashirvaad Svasti',
    tags: ['Desi Ghee', 'Pure']
  },

  // Cleaning Essentials
  {
    id: 'g_cle_1',
    name: 'Citrus Floor Cleaner Sanitizer',
    price: 145,
    originalPrice: 175,
    weightOrVolume: '1 L',
    rating: 4.7,
    reviewCount: 2900,
    image: 'https://images.unsplash.com/photo-1585421514738-ee1af2ec4140?w=600&auto=format&fit=crop&q=80',
    category: 'Cleaning Essentials',
    experience: 'grocery',
    description: 'Kills 99.9% of germs on floor surfaces. Releases a refreshing citrus fragrance that deodorizes and deep-cleans.',
    deliveryTime: '10 mins',
    brand: 'Lizol',
    tags: ['Household', 'Sanitizer']
  },

  // Baby Care
  {
    id: 'g_bc_1',
    name: 'Gentle Tear-Free Baby Wash',
    price: 340,
    originalPrice: 390,
    weightOrVolume: '400 ml',
    rating: 4.8,
    reviewCount: 1650,
    image: 'https://images.unsplash.com/photo-1515488042361-404e9250afef?w=600&auto=format&fit=crop&q=80',
    category: 'Baby Care',
    experience: 'grocery',
    description: 'Formulated with oatmeal extract and rich emollients to gently cleanse baby skin without dryness or eye irritation.',
    deliveryTime: '10 mins',
    brand: "Johnson's",
    tags: ['Tear Free', 'Pediatric Approved']
  },

  // Pet Care
  {
    id: 'g_pc_1',
    name: 'Puppy Chicken Dry Kibbles',
    price: 499,
    originalPrice: 550,
    weightOrVolume: '1.2 kg',
    rating: 4.8,
    reviewCount: 2450,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
    category: 'Pet Care',
    experience: 'grocery',
    description: 'Complete nutritional food for puppies. Packed with calcium for bone development and DHA for brain intelligence.',
    deliveryTime: '11 mins',
    brand: 'Pedigree',
    tags: ['Dog Food', 'Bestseller']
  },

  // Personal Care
  {
    id: 'g_per_1',
    name: 'Spearmint Deep Clean Toothpaste',
    price: 110,
    originalPrice: 130,
    weightOrVolume: '150 g',
    rating: 4.5,
    reviewCount: 3840,
    image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&auto=format&fit=crop&q=80',
    category: 'Personal Care',
    experience: 'grocery',
    description: 'Fights cavities, freshens breath with real spearmint extracts, and whitens teeth enamel with continuous usage.',
    deliveryTime: '10 mins',
    brand: 'Colgate',
    tags: ['Dental Care', 'Bestseller']
  },

  // Home Needs
  {
    id: 'g_hn_1',
    name: 'Absorbent Kitchen Towel Rolls',
    price: 120,
    originalPrice: 150,
    weightOrVolume: '2 Rolls (Pack)',
    rating: 4.6,
    reviewCount: 1120,
    image: 'https://images.unsplash.com/photo-1610348725531-843dff14a9ea?w=600&auto=format&fit=crop&q=80',
    category: 'Home Needs',
    experience: 'grocery',
    description: 'Thick, ultra-absorbent kitchen tissue rolls. Ideal for wiping spills, cleaning grease, or draining fried foods.',
    deliveryTime: '10 mins',
    brand: 'Origami',
    tags: ['Paper Essentials', 'Household']
  },

  // Sweet Tooth & Ice Cream
  {
    id: 'g_st_1',
    name: 'Belgian Dark Chocolate Fudge Tub',
    price: 349,
    originalPrice: 399,
    weightOrVolume: '450 ml',
    rating: 4.9,
    reviewCount: 3120,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80',
    category: 'Sweet Tooth & Ice Cream',
    experience: 'grocery',
    description: 'Decadent real Belgian dark chocolate ice cream folded with velvety soft chocolate fudge brownies.',
    deliveryTime: '10 mins',
    brand: 'Baskin Robbins',
    tags: ['Gourmet Sweet', 'Bestseller']
  },

  // Biscuits & Cookies
  {
    id: 'g_bc_2',
    name: 'Triple Chocolate Chip Cookies',
    price: 90,
    originalPrice: 120,
    weightOrVolume: '200 g',
    rating: 4.8,
    reviewCount: 1940,
    image: 'https://images.unsplash.com/photo-1558961312-50346c099379?w=600&auto=format&fit=crop&q=80',
    category: 'Biscuits & Cookies',
    experience: 'grocery',
    description: 'Crisp buttery cookies loaded with premium dark, milk and white chocolate chips in every bite.',
    deliveryTime: '10 mins',
    brand: 'Good Day',
    tags: ['Cookies', 'Freshly Packed']
  }
];

// Add programmatic items with strictly guaranteed unique attributes to hit 310 total
const BASE_CATEGORIES = [
  'Fruits & Vegetables', 'Dairy, Bread & Eggs', 'Munchies & Snacks', 'Instant & Frozen Food',
  'Cold Drinks & Juices', 'Tea, Coffee & Health Drinks', 'Atta, Rice & Dal', 'Oil, Ghee & Masalas',
  'Cleaning Essentials', 'Baby Care', 'Pet Care', 'Personal Care', 'Home Needs', 'Sweet Tooth & Ice Cream',
  'Biscuits & Cookies'
];

const BRANDS_POOL = ['ORGANIC HARVEST', 'GHOST FARMS', 'SOCIETY SELECT', 'FARM FRESH', 'NATURAL BITE', 'ECO KITCHEN', 'PREMIUM GRAIN', 'PURE HARMONY'];

const ADJECTIVES = ['Premium', 'Organic', 'Select', 'Gourmet', 'Artisanal', 'Exotic', 'Pure', 'Natural', 'Healthy', 'Super', 'Himalayan', 'Vedic'];

const SEED_DATA: Record<string, { base: string; images: string[]; wt: string; desc: string }[]> = {
  'Fruits & Vegetables': [
    { base: 'Grapefruit', images: ['https://images.unsplash.com/photo-1550258987-190a2d41a8ba'], wt: '500g', desc: 'Tangy and sweet pink grapefruits loaded with rich fiber and vitamin nutrients.' },
    { base: 'Pomegranate', images: ['https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2'], wt: '3 pcs', desc: 'Deep red seeds, wonderfully sweet and bursting with antioxidants.' },
    { base: 'Cherry Tomato', images: ['https://images.unsplash.com/photo-1561131248-c52d88624236'], wt: '250g', desc: 'Mini vine-sweetened tomatoes perfect for roasting or tossing in olive salads.' },
    { base: 'Kiwi Fruit', images: ['https://images.unsplash.com/photo-1585059895524-72359e061381'], wt: '3 pcs', desc: 'Zesty green kiwis packed with natural bromelain and enzymes.' },
    { base: 'Organic Spinach', images: ['https://images.unsplash.com/photo-1576045057995-568f588f82fb'], wt: '200g', desc: 'Crisp green broad spinach leaves harvested clean and hydro-washed.' }
  ],
  'Dairy, Bread & Eggs': [
    { base: 'Cheddar Block', images: ['https://images.unsplash.com/photo-1486299267070-83823f5448dd'], wt: '200g', desc: 'Naturally aged sharp cheddar cheese block.' },
    { base: 'Butter Croissants', images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a'], wt: '2 pack', desc: 'Flaky French-style laminated pastries baked to a golden crust.' },
    { base: 'Quail Eggs', images: ['https://images.unsplash.com/photo-1516448620398-c5f44bf9f441'], wt: '12 pcs', desc: 'Dainty spotted quail eggs with a rich, creamy yolk structure.' }
  ],
  'Munchies & Snacks': [
    { base: 'Potato Ridges', images: ['https://images.unsplash.com/photo-1566478989037-eec170784d0b'], wt: '120g', desc: 'Extra thick potato ridges coated with smoked hickory seasonings.' },
    { base: 'Pita Crisps', images: ['https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd'], wt: '150g', desc: 'Baked sourdough pita bread triangles seasoned with sea salt.' }
  ],
  'Instant & Frozen Food': [
    { base: 'Spring Rolls', images: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8'], wt: '6 pack', desc: 'Stuffed vegetable puff pastries ready for quick air frying.' },
    { base: 'Corn Pizza', images: ['https://images.unsplash.com/photo-1513104890138-7c749659a591'], wt: '350g', desc: 'Stone-baked thin crust pizza with loaded baby corn and herb.' }
  ],
  'Cold Drinks & Juices': [
    { base: 'Blood Orange Soda', images: ['https://images.unsplash.com/photo-1621506289937-a8e4df240d0b'], wt: '330ml', desc: 'Fizzy carbonated drink infused with pure Sicilian blood orange essence.' },
    { base: 'Ginger Kombucha', images: ['https://images.unsplash.com/photo-1595981267035-7b04ca84a82d'], wt: '350ml', desc: 'Naturally fermented sparkling tea with warm root ginger extract.' }
  ]
};

// Generate highly realistic, unique products dynamically
for (let i = GROCERY_PRODUCTS.length + 1; i <= 315; i++) {
  const cat = BASE_CATEGORIES[i % BASE_CATEGORIES.length];
  const adj = ADJECTIVES[i % ADJECTIVES.length];
  const brand = BRANDS_POOL[i % BRANDS_POOL.length];
  
  // Choose seed template or generic base
  const seeds = SEED_DATA[cat] || [
    { base: 'Grain Mix', images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c'], wt: '500g', desc: 'Premium selected high quality wholesome pantry product.' },
    { base: 'Herbal Blend', images: ['https://images.unsplash.com/photo-1597481499750-3e6b22637e12'], wt: '100g', desc: 'Finest hand-selected organic botanical formulation.' }
  ];
  const template = seeds[i % seeds.length];
  const uniqName = `${adj} ${brand} ${template.base} (Batch ${i})`;
  
  // Use unique image parameter to force browser to load a unique, non-cached instance
  const uniqueImg = `${template.images[0]}?w=600&auto=format&fit=crop&q=80&sig=${i}`;
  const price = 50 + (i * 7) % 450;
  const originalPrice = i % 3 === 0 ? Math.round(price * 1.25) : undefined;
  const rating = parseFloat((4.0 + (i % 10) * 0.1).toFixed(1));
  const reviewCount = 50 + (i * 12) % 1800;

  GROCERY_PRODUCTS.push({
    id: `g_gen_${i}`,
    name: uniqName,
    price,
    originalPrice,
    weightOrVolume: template.wt,
    rating: rating > 5 ? 5 : rating,
    reviewCount,
    image: uniqueImg,
    category: cat,
    experience: 'grocery',
    description: `${template.desc} Meticulously packed under sanitary facilities to preserve rich organic nutrients.`,
    deliveryTime: i % 4 === 0 ? '8 mins' : '10 mins',
    brand,
    tags: [adj, 'Fresh Delivery']
  });
}
