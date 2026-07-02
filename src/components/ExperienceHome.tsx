import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Star, Clock, Flame, Tag, Plus, Check, MapPin, Eye, ChevronLeft, ChevronRight, ArrowRight, Heart, ShoppingBag, TrendingUp, Zap, HelpCircle, Utensils, Smile, ShoppingCart } from 'lucide-react';
import { Product, Restaurant, ExperienceType, PageType } from '../types';
import { GROCERY_PRODUCTS, BEAUTY_PRODUCTS, RESTAURANTS } from '../data';
import { db } from '../lib/supabase';


// Extended Custom Premium Products for categories that are not fully filled
const PREMIUM_CUSTOM_PRODUCTS: Product[] = [
  {
    id: 'fash1',
    name: 'Classic Trench Coat - Heritage Sand',
    price: 14500,
    originalPrice: 18000,
    weightOrVolume: 'Size M',
    rating: 4.9,
    reviewCount: 420,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80',
    category: 'Fashion',
    experience: 'beauty',
    description: 'A masterpiece of precision tailoring. Water-resistant cotton gabardine, heritage double-breasted details, and custom gold-finished buckle hardware.',
    deliveryTime: 'Next Day',
    brand: 'BURBERRY ST.',
    tags: ['Luxury', 'Must Have']
  },
  {
    id: 'fash2',
    name: 'Calfskin Leather Chelsea Boots',
    price: 8900,
    originalPrice: 11000,
    weightOrVolume: 'Size 9',
    rating: 4.8,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&auto=format&fit=crop&q=80',
    category: 'Fashion',
    experience: 'beauty',
    description: 'Expertly hand-crafted in Milan. Features elasticated side gussets, stacked leather soles, and a premium glove-leather lining for ultimate comfort.',
    deliveryTime: '2 Days',
    brand: 'MILANO DESIGN',
    tags: ['Premium Leather']
  },
  {
    id: 'elec1',
    name: 'Studio ANC Wireless Headphones',
    price: 19990,
    originalPrice: 24990,
    weightOrVolume: '320g',
    rating: 4.9,
    reviewCount: 1890,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    category: 'Electronics',
    experience: 'beauty',
    description: 'Industry-leading noise cancellation. Features hybrid dual-feedback microphones, customized high-resolution audio drivers, and up to 40 hours of battery life.',
    deliveryTime: 'Next Day',
    brand: 'SONY ACCENTS',
    tags: ['Best Seller', 'ANC Tech']
  },
  {
    id: 'elec2',
    name: 'Acoustic Wood bluetooth Speaker',
    price: 14500,
    originalPrice: 16900,
    weightOrVolume: 'Portable',
    rating: 4.7,
    reviewCount: 840,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80',
    category: 'Electronics',
    experience: 'beauty',
    description: 'Warm, room-filling vintage acoustic sound. Encased in beautiful handcrafted walnut wood, powered by dual 15W class-D amplifiers.',
    deliveryTime: '10 mins',
    brand: 'MARSHALL STYLE',
    tags: ['Retro design']
  },
  {
    id: 'home1',
    name: 'Minimalist Ceramic Coffee Dripper & Pot',
    price: 2450,
    originalPrice: 2990,
    weightOrVolume: '600 ml',
    rating: 4.8,
    reviewCount: 160,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    category: 'Home Essentials',
    experience: 'grocery',
    description: 'Charming textured matte ceramic set with high thermal stability. Perfect for slow brewing coffee at home.',
    deliveryTime: '10 mins',
    brand: 'ORIGAMI JAPAN',
    tags: ['Home Cafe']
  },
  {
    id: 'gift1',
    name: 'Luxury Scented Candle Gift Set',
    price: 1850,
    originalPrice: 2200,
    weightOrVolume: '3-Pack',
    rating: 4.9,
    reviewCount: 520,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=80',
    category: 'Gifts',
    experience: 'beauty',
    description: 'Contains French Lavender, Madagascan Vanilla, and Baltic Amber soy wax candles with custom cotton wicks.',
    deliveryTime: '10 mins',
    brand: 'GLOW LUXE',
    tags: ['Premium Box']
  }
];

// All available products compiled
const ALL_PRODUCTS = [
  ...GROCERY_PRODUCTS,
  ...BEAUTY_PRODUCTS,
  ...PREMIUM_CUSTOM_PRODUCTS
];

interface ExperienceHomeProps {
  activeExperience: ExperienceType;
  searchQuery: string;
  setSearchQuery?: (query: string) => void;
  activeLocation: string;
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  onSelectProduct: (product: Product) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onAddToCart: (product: Product) => void;
  cartItemsIds: string[];
}

export default function ExperienceHome({
  activeExperience,
  searchQuery,
  setSearchQuery,
  activeLocation,
  currentPage,
  setCurrentPage,
  onSelectProduct,
  onSelectRestaurant,
  onAddToCart,
  cartItemsIds
}: ExperienceHomeProps) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [selectedGridCategory, setSelectedGridCategory] = useState<string | null>(null);
  const [countdown, setCountdown] = useState({ minutes: 4, seconds: 59 });
  const [wishlistState, setWishlistState] = useState<Record<string, boolean>>({});

  // Food Experience States
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [vegOnly, setVegOnly] = useState<boolean>(false);

  // Beauty Experience States
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  // Live Database States
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [dbRestaurants, setDbRestaurants] = useState<Restaurant[]>([]);
  const [isDbLoading, setIsDbLoading] = useState(false);

  // Load browse list dynamically from database
  useEffect(() => {
    let isMounted = true;
    const loadBrowseData = async () => {
      try {
        const prods = await db.getProducts({ experience: activeExperience });
        const activeCity = ['Hyderabad', 'Bengaluru', 'Chennai', 'Mumbai', 'Delhi', 'Pune', 'Kolkata']
          .find(city => activeLocation.toLowerCase().includes(city.toLowerCase())) || 'Hyderabad';
        const rests = await db.getRestaurants({ city: activeCity });
        
        if (isMounted) {
          setAllProducts(prods);
          setAllRestaurants(rests);
        }
      } catch (err) {
        console.error('Error loading browse data from DB', err);
      }
    };
    loadBrowseData();
    return () => { isMounted = false; };
  }, [activeExperience, activeLocation]);

  // Load search data dynamically from database when query changes
  useEffect(() => {
    let isMounted = true;
    const loadSearchData = async () => {
      if (!searchQuery.trim()) {
        setDbProducts([]);
        setDbRestaurants([]);
        return;
      }
      setIsDbLoading(true);
      try {
        if (activeExperience === 'food') {
          const rests = await db.getRestaurants({ query: searchQuery });
          if (isMounted) setDbRestaurants(rests);
        } else {
          const prods = await db.getProducts({ experience: activeExperience, query: searchQuery });
          if (isMounted) setDbProducts(prods);
        }
      } catch (err) {
        console.error('Error loading search from DB', err);
      } finally {
        if (isMounted) setIsDbLoading(false);
      }
    };
    loadSearchData();
    return () => { isMounted = false; };
  }, [searchQuery, activeExperience]);


  // Scrollers refs
  const trendingRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const recommendedRef = useRef<HTMLDivElement>(null);
  const restaurantsRef = useRef<HTMLDivElement>(null);
  const groceryRef = useRef<HTMLDivElement>(null);
  const beautyRef = useRef<HTMLDivElement>(null);
  const newArrivalsRef = useRef<HTMLDivElement>(null);
  const bestSellersRef = useRef<HTMLDivElement>(null);
  const continueRef = useRef<HTMLDivElement>(null);
  const brandsRef = useRef<HTMLDivElement>(null);
  const cuisinesRef = useRef<HTMLDivElement>(null);

  // Experience-Specific Banner Definitions
  const groceryBanners = [
    {
      id: 'g-banner-1',
      title: "🥦 Weekly Mega Grocery",
      subtitle: "Flat 30% Off on Devgad Mangoes, Organic Strawberries, Avocados & exotic greens.",
      cta: "Shop Fresh Fruits",
      bg: "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white",
      badge: "FRESH DISCOUNT",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: 'g-banner-2',
      title: "🥛 Early Morning Dairy Run",
      subtitle: "Pure farm fresh milk, local bakery loaves, free range eggs delivered by 7 AM.",
      cta: "Stock Up Breakfast",
      bg: "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950",
      badge: "SUPER FRESH",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: 'g-banner-3',
      title: "🍿 Midnight Snack Attack",
      subtitle: "Korean spicy ramen, peri-peri potato chips, sugar-free cold sodas delivered in 10 mins.",
      cta: "Browse Munchies",
      bg: "bg-gradient-to-r from-slate-950 to-slate-900 text-white",
      badge: "FAST TRACK",
      image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=800&auto=format&fit=crop&q=80"
    }
  ];

  const foodBanners = [
    {
      id: 'f-banner-1',
      title: "🍕 Midnight Gourmet Bistro",
      subtitle: "Authentic woodfired Napoletana pizzas, North Indian premium thalis, juicy burgers.",
      cta: "Order Gourmet Food",
      bg: "bg-gradient-to-r from-red-600 via-rose-600 to-orange-500 text-white",
      badge: "24/7 BISTRO",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: 'f-banner-2',
      title: "🍔 Cloud Kitchen Specials",
      subtitle: "Flat 50% Off up to ₹125 on premium restaurants. Free instant simulated delivery.",
      cta: "View Offers",
      bg: "bg-gradient-to-r from-slate-950 to-slate-900 text-white",
      badge: "ELITE BITE",
      image: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?w=800&auto=format&fit=crop&q=80"
    }
  ];

  const beautyBanners = [
    {
      id: 'b-banner-1',
      title: "💄 Glass Skin Beauty Fest",
      subtitle: "Discover high active peptide serums, organic K-beauty hydration kits & velvet lips.",
      cta: "Explore Beauty Care",
      bg: "bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white",
      badge: "LUXURY BEAUTY",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: 'b-banner-2',
      title: "🌸 Radiant Skin Glow Specials",
      subtitle: "Niacinamide serums, broad spectrum sunscreen sunsticks & luxury fragrances.",
      cta: "Shop Estée & K-Glow",
      bg: "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950",
      badge: "GLASS SKIN",
      image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80"
    }
  ];

  // Get banners based on experience
  const getActiveBanners = () => {
    switch (activeExperience) {
      case 'grocery': return groceryBanners;
      case 'food': return foodBanners;
      case 'beauty': return beautyBanners;
      default: return groceryBanners;
    }
  };

  const banners = getActiveBanners();

  // Reset banner index when active experience changes
  useEffect(() => {
    setCurrentBannerIndex(0);
    setSelectedGridCategory(null);
    setSelectedBrand(null);
    setSelectedCuisine('All');
  }, [activeExperience]);

  // Auto sliding carousel
  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(bannerInterval);
  }, [banners.length]);

  // Countdown timer simulation
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds === 0) {
          if (prev.minutes === 0) {
            return { minutes: 4, seconds: 59 }; // reset
          }
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  // Category grids for each experience
  const groceryGridCategories = [
    { name: 'Fruits & Vegetables', emoji: '🥦' },
    { name: 'Dairy, Bread & Eggs', emoji: '🥛' },
    { name: 'Snacks & Munchies', emoji: '🍿' },
    { name: 'Instant Food', emoji: '🍜' },
    { name: 'Cold Drinks & Juices', emoji: '🥤' },
    { name: 'Tea, Coffee & Health Drinks', emoji: '☕' },
    { name: 'Atta, Rice & Dal', emoji: '🌾' },
    { name: 'Sweet Tooth & Ice Cream', emoji: '🍨' },
    { name: 'Oil, Ghee & Masalas', emoji: '🧈' },
    { name: 'Biscuits & Cookies', emoji: '🍪' },
    { name: 'Pet Care', emoji: '🐶' },
    { name: 'Cleaning Essentials', emoji: '🧹' }
  ];

  const beautyGridCategories = [
    { name: 'Skin Care', emoji: '🧴' },
    { name: 'Makeup', emoji: '💄' },
    { name: 'Fragrances', emoji: '✨' },
    { name: 'Hair Care', emoji: '💇‍♀️' },
    { name: 'Bath & Body', emoji: '🛁' },
    { name: 'Luxury Beauty', emoji: '💎' },
    { name: 'Gifts', emoji: '🎁' },
    { name: 'Fashion', emoji: '🧥' },
    { name: 'Electronics', emoji: '🎧' }
  ];

  const cuisinesList = [
    { name: 'All', emoji: '🍽️' },
    { name: 'North Indian', emoji: '🍛' },
    { name: 'South Indian', emoji: '🥞' },
    { name: 'Biryani', emoji: '🍗' },
    { name: 'Pizza', emoji: '🍕' },
    { name: 'Burger', emoji: '🍔' },
    { name: 'Chinese', emoji: '🍜' },
    { name: 'Fast Food', emoji: '🍟' },
    { name: 'Desserts', emoji: '🍰' },
    { name: 'Italian', emoji: '🍝' },
    { name: 'Street Food', emoji: '🌮' },
    { name: 'Healthy', emoji: '🥗' },
    { name: 'Cafe', emoji: '☕' },
    { name: 'Bakery', emoji: '🍞' },
    { name: 'Mexican', emoji: '🌯' }
  ];

  const beautyBrands = [
    'GLOW LAB', 'K-BEAUTY', 'Maison Luxe', 'SALON PRO', 'SKINSHIELD', 'CHIC COSMETICS', 'NATURAL GLOW', 'DERMA-VITE', 'VELVET BLOOM', 'LUMINOUS', 'FOREST DEW'
  ];

  // Helper for scroll buttons
  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmt = direction === 'left' ? -350 : 350;
      ref.current.scrollBy({ left: scrollAmt, behavior: 'smooth' });
    }
  };

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlistState(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Helper filters for groceries
  const getGroceryProducts = () => allProducts;
  const getGroceryFlashDeals = () => allProducts.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 10);
  const getGroceryCategoryItems = (cat: string) => allProducts.filter(p => p.category === cat).slice(0, 8);

  // Helper filters for beauty
  const getBeautyProducts = () => {
    if (selectedBrand) {
      return allProducts.filter(p => p.brand === selectedBrand);
    }
    return allProducts;
  };
  const getBeautyFlashDeals = () => allProducts.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 10);
  const getBeautyCategoryItems = (cat: string) => allProducts.filter(p => p.category === cat).slice(0, 8);

  // Helper filters for food
  const getFilteredRestaurants = () => {
    return allRestaurants.filter(res => {
      const matchCuisine = selectedCuisine === 'All' || res.cuisine.includes(selectedCuisine);
      const matchVeg = !vegOnly || res.menu?.some(item => item.isVeg) || false;
      return matchCuisine && matchVeg;
    });
  };

  // Search Mode View
  const getSearchModeView = () => {
    let matchedProducts: Product[] = [];
    let matchedRestaurants: Restaurant[] = [];
    const q = searchQuery.toLowerCase().trim();

    if (q === '') {
      const trendingTerms = activeExperience === 'grocery' 
        ? ['Alphonso Mangoes', 'Amul Taaza Milk', 'Lay\'s Magic Masala', 'Coca Cola Zero Sugar', 'Cavendish Bananas', 'Sourdough Garlic Bread', 'Fresh Green Avocados', 'Epigamia Greek Yogurt']
        : activeExperience === 'beauty'
        ? ['Hydrating Peptide Face Serum', 'Matte Liquid Lipstick', 'Vitamin C Sunscreen', 'Eyeshadow Palette', 'French Lavender Cologne', 'Biotin Growth scalp Serum', 'Keratin Repair Mask']
        : ['Hyderabadi Chicken Dum Biryani', 'Toit Artisanal Brewery & Grill', 'Medu Vada Sambar Combo', 'Paneer Lababdar Curry', 'Hot Brewed Cappuccino', 'Molten Chocolate Lava Cake'];

      const recentSearches = activeExperience === 'grocery'
        ? ['Fresh Organic Blueberries', 'Mother Dairy Paneer', 'Country Delight Milk']
        : activeExperience === 'beauty'
        ? ['CeraVe Moisturizing Lotion', 'Dior Sauvage Cologne', 'Mac Ruby Woo Lipstick']
        : ['Paradise Special Chicken Biryani', 'Margherita Sourdough Pizza', 'Butter Naan Garlic'];

      return (
        <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-in" id="search-idle-view">
          <div className="mb-8 bg-gradient-to-br from-yellow-50 to-white border border-yellow-200/60 rounded-3xl p-6 shadow-xs">
            <h3 className="text-sm font-black uppercase text-slate-800 tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-500 animate-pulse" />
              Trending {activeExperience.toUpperCase()} Searches
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {trendingTerms.map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery?.(term)}
                  className="px-4 py-2.5 bg-white hover:bg-[#FFE100] border border-slate-200 hover:border-slate-400 text-xs font-black text-slate-700 hover:text-slate-950 rounded-xl transition-all shadow-2xs active:scale-95 cursor-pointer"
                >
                  🔥 {term}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              Recent Searches
            </h3>
            <div className="space-y-2.5">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery?.(term)}
                  className="w-full text-left px-4 py-3.5 bg-white hover:bg-slate-50 border border-slate-200/50 rounded-xl text-xs font-bold text-slate-600 flex items-center justify-between group transition-colors shadow-2xs cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {term}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono group-hover:text-slate-600 transition-colors">Search →</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (isDbLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-10 h-10 border-4 border-slate-900/10 border-t-slate-900 rounded-full animate-spin mb-4" />
          <p className="text-xs font-bold text-slate-500 font-mono">Querying Database...</p>
        </div>
      );
    }

    if (activeExperience === 'grocery') {
      matchedProducts = dbProducts;
    } else if (activeExperience === 'beauty') {
      matchedProducts = dbProducts;
    } else if (activeExperience === 'food') {
      matchedRestaurants = dbRestaurants;

      // Search menu items too
      const matchedDishes: { dish: Product; restaurant: Restaurant }[] = [];
      dbRestaurants.forEach(res => {
        res.menu?.forEach(dish => {
          if (dish.name.toLowerCase().includes(q) || dish.description?.toLowerCase().includes(q)) {
            matchedDishes.push({ dish, restaurant: res });
          }
        });
      });

      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 animate-fade-in" id="search-view-food">
          <div className="mb-6">
            <h2 className="font-display font-black text-2xl text-slate-900 tracking-tight flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-slate-800" />
              Search Food Results for "{searchQuery}"
            </h2>
            <p className="text-slate-400 text-xs font-mono font-bold mt-1">
              Found {matchedRestaurants.length} restaurants and {matchedDishes.length} gourmet dishes.
            </p>
          </div>

          {matchedRestaurants.length === 0 && matchedDishes.length === 0 ? (
            <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
              <span className="text-5xl block mb-4">🍕</span>
              <h3 className="font-bold text-slate-800 text-lg mb-1">No delicacies found</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                No matching restaurants or dishes. Try searching for 'Pizza', 'Burger' or 'North Indian'.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {matchedRestaurants.length > 0 && (
                <div>
                  <h3 className="font-display font-black text-lg text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">
                    Matching Restaurants
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {matchedRestaurants.map(res => (
                      <div 
                        key={res.id}
                        className="bg-white border border-slate-200/50 rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col sm:flex-row cursor-pointer group"
                        onClick={() => onSelectRestaurant(res)}
                      >
                        <div className="relative w-full sm:w-44 h-48 sm:h-full min-h-[160px] shrink-0">
                          <img src={res.image} alt={res.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                          {res.featuredOffer && (
                            <div className="absolute bottom-3 left-3 bg-rose-600 text-white font-display text-xs font-bold px-2.5 py-1 rounded-md shadow-md">
                              {res.featuredOffer}
                            </div>
                          )}
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-display font-extrabold text-lg text-slate-900">{res.name}</h3>
                              <div className="flex items-center gap-1 bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-md text-xs font-mono">
                                <span>{res.rating}</span>
                                <Star className="w-3 h-3 fill-green-800" />
                              </div>
                            </div>
                            <p className="text-slate-500 text-xs font-semibold mb-3">{res.cuisine.join(', ')}</p>
                            <div className="flex items-center gap-3 text-xs font-mono text-slate-400 font-semibold">
                              <span>⏰ {res.deliveryTime}</span>
                              <span>•</span>
                              <span>📍 {res.distance}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-end border-t border-slate-100 pt-3 mt-3">
                            <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                              View Menu <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedDishes.length > 0 && (
                <div>
                  <h3 className="font-display font-black text-lg text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">
                    Matching Gourmet Dishes
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {matchedDishes.map(({ dish, restaurant }) => {
                      const isAdded = cartItemsIds.includes(dish.id);
                      return (
                        <div 
                          key={dish.id}
                          className="bg-white border border-slate-200/50 rounded-2xl p-4 flex gap-4 cursor-pointer hover:shadow-md transition-shadow relative group"
                          onClick={() => onSelectRestaurant(restaurant)}
                        >
                          <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                            <img src={dish.image} alt={dish.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          </div>
                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <div className="flex items-center gap-1.5 mb-1">
                                {dish.isVeg ? (
                                  <div className="w-3 h-3 border border-green-600 flex items-center justify-center rounded-xs shrink-0"><div className="w-1.5 h-1.5 rounded-full bg-green-600" /></div>
                                ) : (
                                  <div className="w-3 h-3 border border-red-600 flex items-center justify-center rounded-xs shrink-0"><div className="w-1.5 h-1.5 rounded-full bg-red-600" /></div>
                                )}
                                <span className="text-[10px] text-slate-400 font-mono truncate">{restaurant.name}</span>
                              </div>
                              <h4 className="font-bold text-xs text-slate-800 truncate mb-1">{dish.name}</h4>
                              <span className="text-xs font-mono font-black text-slate-900">₹{dish.price}</span>
                            </div>
                            <span className="text-[10px] text-rose-600 font-bold uppercase tracking-wider mt-1">Order from Restaurant →</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // Default return for grocery and beauty search results
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 animate-fade-in" id="search-view">
        <div className="mb-6">
          <h2 className="font-display font-black text-2xl text-slate-900 tracking-tight flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-slate-800" />
            Search Results for "{searchQuery}"
          </h2>
          <p className="text-slate-400 text-xs font-mono font-bold mt-1">
            Found {matchedProducts.length} matching products.
          </p>
        </div>

        {matchedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
            <span className="text-5xl block mb-4">🛒</span>
            <h3 className="font-bold text-slate-800 text-lg mb-1">No products found</h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              We couldn't find any products matching your query. Check spelling or try other keywords.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {matchedProducts.map((product) => {
              const isAdded = cartItemsIds.includes(product.id);
              const isFav = wishlistState[product.id];
              const discountPercentage = product.originalPrice 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
                : 0;

              return (
                <div 
                  key={product.id}
                  className="bg-white border border-slate-200/50 rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between group relative"
                >
                  <button 
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className="absolute top-2.5 right-2.5 p-2 bg-white/80 backdrop-blur-xs rounded-full border border-slate-200/50 hover:bg-white text-slate-400 hover:text-rose-500 transition-colors z-20"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  <div className="relative aspect-square overflow-hidden bg-slate-50 cursor-pointer" onClick={() => onSelectProduct(product)}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {discountPercentage > 0 && (
                      <span className="absolute bottom-2.5 left-2.5 bg-red-600 text-white font-mono text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm tracking-wider uppercase z-10 shadow-xs">
                        {discountPercentage}% OFF
                      </span>
                    )}
                  </div>

                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-slate-400 mb-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{product.deliveryTime}</span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-slate-800 line-clamp-2 hover:text-slate-950 cursor-pointer mb-1 leading-snug">
                        {product.name}
                      </h4>
                      {product.brand && (
                        <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block mb-2">
                          {product.brand}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 border-t border-slate-50 pt-3">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-base font-mono font-bold text-slate-900">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-xs font-mono text-slate-400 line-through">₹{product.originalPrice}</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => onAddToCart(product)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer ${
                          isAdded 
                            ? 'bg-slate-100 text-slate-400 border border-slate-200' 
                            : 'bg-[#FFE100] text-slate-950 hover:bg-yellow-400 shadow-xs border border-slate-900/5'
                        }`}
                      >
                        {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>{isAdded ? 'Added' : 'Add'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Render Product list for selected category grid category click
  const renderProductListForSelectedGridCategory = () => {
    if (!selectedGridCategory) return null;
    
    // Filter to category + current experience
    const catProducts = ALL_PRODUCTS.filter(p => 
      p.experience === activeExperience && 
      (p.category.toLowerCase().includes(selectedGridCategory.toLowerCase()) || 
       selectedGridCategory.toLowerCase().includes(p.category.toLowerCase()))
    );

    const displayProducts = catProducts.length > 0 
      ? catProducts 
      : ALL_PRODUCTS.filter(p => p.experience === activeExperience).slice(0, 12);
    
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 animate-fade-in" id="category-details-view">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSelectedGridCategory(null)}
              className="text-slate-600 hover:text-slate-950 font-bold text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer select-none border border-slate-200"
            >
              ← Back to Storefront
            </button>
            <h2 className="font-display font-black text-xl text-slate-900 tracking-tight">
              Curated {selectedGridCategory}
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono font-bold bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
            {displayProducts.length} premium essentials
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayProducts.map((product) => {
            const isAdded = cartItemsIds.includes(product.id);
            const isFav = wishlistState[product.id];
            const discountPercentage = product.originalPrice 
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
              : 0;

            return (
              <div 
                key={product.id}
                className="bg-white border border-slate-200/50 rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between group relative animate-fade-in"
              >
                <button 
                  onClick={(e) => toggleWishlist(product.id, e)}
                  className="absolute top-2.5 right-2.5 p-2 bg-white/80 backdrop-blur-xs rounded-full border border-slate-200/50 text-slate-400 hover:text-rose-500 transition-colors z-20"
                >
                  <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>

                <div className="relative aspect-square overflow-hidden bg-slate-50 cursor-pointer" onClick={() => onSelectProduct(product)}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {discountPercentage > 0 && (
                    <span className="absolute bottom-2.5 left-2.5 bg-red-600 text-white font-mono text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm tracking-wider uppercase z-10 shadow-xs">
                      {discountPercentage}% OFF
                    </span>
                  )}
                </div>

                <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-slate-400 mb-1">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{product.deliveryTime}</span>
                    </div>
                    <h4 className="font-display font-bold text-sm text-slate-800 line-clamp-2 hover:text-slate-950 cursor-pointer leading-snug mb-1">
                      {product.name}
                    </h4>
                    {product.brand && (
                      <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block mb-2">
                        {product.brand}
                      </span>
                    )}
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-mono font-bold text-slate-700">{product.rating}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({product.reviewCount})</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 border-t border-slate-50 pt-3">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-base font-mono font-bold text-slate-900">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs font-mono text-slate-400 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => onAddToCart(product)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer ${
                        isAdded 
                          ? 'bg-slate-100 text-slate-400 border border-slate-200' 
                          : 'bg-[#FFE100] text-slate-950 hover:bg-yellow-400 shadow-xs'
                      }`}
                    >
                      {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      <span>{isAdded ? 'Added' : 'Add'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Switch views based on active state / search query
  if (currentPage === 'search' || searchQuery.trim() !== '') {
    return getSearchModeView();
  }

  if (selectedGridCategory) {
    return renderProductListForSelectedGridCategory();
  }

  // Common Header Slider component
  const renderBannerCarousel = () => (
    <div className="relative rounded-3xl overflow-hidden mb-6 h-56 sm:h-72 shadow-md border border-slate-900/10 group select-none">
      <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentBannerIndex * 100}%)` }}>
        {banners.map((banner) => (
          <div key={banner.id} className="w-full h-full flex-shrink-0 flex flex-col md:flex-row items-stretch relative bg-slate-100">
            {/* Slide Info */}
            <div className={`flex-1 p-6 sm:p-10 flex flex-col justify-between z-10 relative ${banner.bg}`}>
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-black tracking-widest uppercase bg-slate-950 text-[#FFE100] px-2.5 py-1 rounded-md border border-yellow-400/20 mb-3 sm:mb-4">
                  {banner.badge}
                </span>
                <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-950 leading-none tracking-tight mb-2 uppercase drop-shadow-xs">
                  {banner.title}
                </h1>
                <p className="text-slate-900/80 text-xs sm:text-sm font-semibold max-w-sm line-clamp-2 leading-relaxed mb-4">
                  {banner.subtitle}
                </p>
              </div>
              
              <button 
                onClick={() => {
                  // Direct banner shop CTAs to filter lists
                  if (activeExperience === 'grocery') {
                    setSelectedGridCategory('Fruits & Vegetables');
                  } else if (activeExperience === 'beauty') {
                    setSelectedGridCategory('Skin Care');
                  } else {
                    setSelectedCuisine('Pizza');
                  }
                }}
                className="flex items-center gap-2 bg-slate-950 text-white hover:bg-slate-900 font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl w-fit transition-all hover:translate-x-1 shadow-md cursor-pointer select-none"
              >
                <span>{banner.cta}</span>
                <ArrowRight className="w-4 h-4 text-[#FFE100]" />
              </button>
            </div>

            {/* Slide Image */}
            <div className="hidden md:block md:w-1/2 relative bg-slate-100">
              <img 
                src={banner.image} 
                alt={banner.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Slide Dot Indicators */}
      <div className="absolute bottom-4 left-6 flex items-center gap-1.5 z-20">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentBannerIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              idx === currentBannerIndex 
                ? 'bg-slate-950 w-6' 
                : 'bg-slate-900/30 hover:bg-slate-900/50'
            }`}
          />
        ))}
      </div>
    </div>
  );

  // ==================== RENDERING COHESIVE GROCERY VIEW ====================
  if (activeExperience === 'grocery') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 select-none animate-fade-in" id="grocery-storefront">
        {renderBannerCarousel()}

        {/* 1. GROCERY GRID DEPARTMENTS */}
        <div className="mb-10 bg-white p-5 rounded-3xl shadow-xs border border-slate-200/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-black text-lg text-slate-900 uppercase tracking-tight">
                Shop Grocery Departments
              </h3>
              <p className="text-[11px] text-slate-400 font-bold tracking-wider uppercase mt-0.5">Fresh daily essentials delivered in 10 mins</p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md font-mono font-bold uppercase">
              🌿 100% Organic Quality
            </span>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
            {groceryGridCategories.map((item) => (
              <div
                key={item.name}
                onClick={() => setSelectedGridCategory(item.name)}
                className="bg-slate-50 hover:bg-emerald-50 border border-slate-200/40 rounded-2xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-xs group"
              >
                <span className="text-3xl sm:text-4xl mb-2 transition-transform group-hover:scale-110 duration-300">
                  {item.emoji}
                </span>
                <span className="font-display font-black text-[10px] sm:text-xs text-slate-800 tracking-tight leading-none text-center">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. FLASH DEALS (Groceries) */}
        <section className="mb-10 bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100/60">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-black text-lg sm:text-xl text-slate-900 flex items-center gap-1.5 uppercase tracking-tight">
                  <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                  ⚡ Daily Flash Markdown
                </h2>
                <div className="bg-slate-950 text-[#FFE100] px-2 py-0.5 rounded-md text-xs font-mono font-black border border-yellow-400/20">
                  <span>0{countdown.minutes}</span>:
                  <span>{countdown.seconds < 10 ? `0${countdown.seconds}` : countdown.seconds}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">Supercharged markdown pricing on organic staples</p>
            </div>
            <div className="flex items-center gap-1.5">
              <button onClick={() => scrollContainer(flashRef, 'left')} className="p-1.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer shadow-xs"><ChevronLeft className="w-4 h-4 text-slate-600" /></button>
              <button onClick={() => scrollContainer(flashRef, 'right')} className="p-1.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer shadow-xs"><ChevronRight className="w-4 h-4 text-slate-600" /></button>
            </div>
          </div>

          <div ref={flashRef} className="flex overflow-x-auto gap-4 pb-4 scrollbar-none scroll-smooth snap-x">
            {getGroceryFlashDeals().map((product) => {
              const isAdded = cartItemsIds.includes(product.id);
              const isFav = wishlistState[product.id];
              const discountPercentage = Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100);

              return (
                <div key={product.id} className="w-44 sm:w-52 bg-white border border-slate-200/50 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all shrink-0 snap-start flex flex-col justify-between group relative">
                  <button onClick={(e) => toggleWishlist(product.id, e)} className="absolute top-2.5 right-2.5 p-2 bg-white/85 backdrop-blur-xs rounded-full border border-slate-200/50 text-slate-400 hover:text-rose-500 transition-colors z-20">
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                  <div className="relative aspect-square overflow-hidden bg-slate-50 cursor-pointer" onClick={() => onSelectProduct(product)}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute bottom-2 left-2 bg-red-600 text-white font-mono text-[9px] font-black px-1.5 py-0.5 rounded-xs tracking-wider uppercase z-10">{discountPercentage}% OFF</span>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-bold text-xs sm:text-sm text-slate-800 line-clamp-2 hover:text-slate-950 cursor-pointer leading-snug mb-1">{product.name}</h4>
                      {product.weightOrVolume && <span className="text-[10px] text-slate-400 font-mono font-bold block mb-2">{product.weightOrVolume}</span>}
                    </div>
                    <div className="flex items-center justify-between gap-1.5 border-t border-slate-50 pt-2.5 mt-2">
                      <div>
                        <span className="text-sm font-mono font-black text-slate-950 block">₹{product.price}</span>
                        <span className="text-[10px] font-mono text-slate-400 line-through">₹{product.originalPrice}</span>
                      </div>
                      <button onClick={() => onAddToCart(product)} className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${isAdded ? 'bg-slate-100 text-slate-400 border border-slate-200' : 'bg-[#FFE100] text-slate-950 hover:bg-yellow-400'}`}>
                        {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. FRESH FRUITS & VEGGIES SECTION */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-black text-lg sm:text-xl text-slate-900 flex items-center gap-1.5 uppercase tracking-tight">
                <ShoppingBag className="w-5 h-5 text-emerald-600" />
                Fresh Fruits & Vegetables
              </h2>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Direct farm partnerships ensuring handpicked freshness</p>
            </div>
            <button 
              onClick={() => setSelectedGridCategory('Fruits & Vegetables')} 
              className="text-xs font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {getGroceryCategoryItems('Fruits & Vegetables').slice(0, 5).map((product) => {
              const isAdded = cartItemsIds.includes(product.id);
              return (
                <div key={product.id} className="bg-white border border-slate-200/50 rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between group relative">
                  <div className="relative aspect-square overflow-hidden bg-slate-50 cursor-pointer" onClick={() => onSelectProduct(product)}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-bold text-xs sm:text-sm text-slate-800 line-clamp-2 hover:text-slate-950 cursor-pointer leading-snug mb-1">{product.name}</h4>
                      {product.weightOrVolume && <span className="text-[10px] text-slate-400 font-mono font-bold block mb-2">{product.weightOrVolume}</span>}
                    </div>
                    <div className="flex items-center justify-between gap-1.5 border-t border-slate-50 pt-2.5 mt-2">
                      <span className="text-sm font-mono font-black text-slate-950">₹{product.price}</span>
                      <button onClick={() => onAddToCart(product)} className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${isAdded ? 'bg-slate-100 text-slate-400 border border-slate-200' : 'bg-[#FFE100] text-[#0f172a] hover:bg-yellow-400'}`}>
                        {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. DAILY BREAKFAST STAPLES */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-black text-lg sm:text-xl text-slate-900 flex items-center gap-1.5 uppercase tracking-tight">
                <Smile className="w-5 h-5 text-indigo-600" />
                Breakfast Dairy, Bread & Eggs
              </h2>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Morning essentials picked with supreme standards</p>
            </div>
            <button 
              onClick={() => setSelectedGridCategory('Dairy, Bread & Eggs')} 
              className="text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {getGroceryCategoryItems('Dairy, Bread & Eggs').slice(0, 5).map((product) => {
              const isAdded = cartItemsIds.includes(product.id);
              return (
                <div key={product.id} className="bg-white border border-slate-200/50 rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between group relative">
                  <div className="relative aspect-square overflow-hidden bg-slate-50 cursor-pointer" onClick={() => onSelectProduct(product)}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-bold text-xs sm:text-sm text-slate-800 line-clamp-2 hover:text-slate-950 cursor-pointer leading-snug mb-1">{product.name}</h4>
                      {product.weightOrVolume && <span className="text-[10px] text-slate-400 font-mono font-bold block mb-2">{product.weightOrVolume}</span>}
                    </div>
                    <div className="flex items-center justify-between gap-1.5 border-t border-slate-50 pt-2.5 mt-2">
                      <span className="text-sm font-mono font-black text-slate-950">₹{product.price}</span>
                      <button onClick={() => onAddToCart(product)} className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${isAdded ? 'bg-slate-100 text-slate-400 border border-slate-200' : 'bg-[#FFE100] text-[#0f172a] hover:bg-yellow-400'}`}>
                        {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  // ==================== RENDERING COHESIVE FOOD DELIVERY VIEW ====================
  if (activeExperience === 'food') {
    const matchedRestaurants = getFilteredRestaurants();

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 select-none animate-fade-in" id="food-storefront">
        {renderBannerCarousel()}

        {/* 1. CUISINES HORIZONTAL SLIDER */}
        <div className="mb-8 bg-white p-5 rounded-3xl shadow-xs border border-slate-200/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-black text-lg text-slate-900 uppercase tracking-tight">
                Explore Cuisines
              </h3>
              <p className="text-[11px] text-slate-400 font-bold tracking-wider uppercase">Filter restaurants by your specific culinary desire</p>
            </div>
            
            {/* Veg Only Toggle */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl select-none">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Veg Only</span>
              <button
                onClick={() => setVegOnly(!vegOnly)}
                className={`w-10 h-5.5 rounded-full p-0.5 transition-colors ${vegOnly ? 'bg-green-600' : 'bg-slate-200'}`}
              >
                <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform duration-300 ${vegOnly ? 'translate-x-4.5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          <div ref={cuisinesRef} className="flex overflow-x-auto gap-3 pb-2 scrollbar-none scroll-smooth">
            {cuisinesList.map(cuisine => {
              const isSelected = selectedCuisine === cuisine.name;
              return (
                <button
                  key={cuisine.name}
                  onClick={() => setSelectedCuisine(cuisine.name)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-rose-600 text-white shadow-md border-rose-600 scale-102' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/50'
                  }`}
                >
                  <span className="text-lg">{cuisine.emoji}</span>
                  <span>{cuisine.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. POPULAR RESTAURANTS SECTION */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900 flex items-center gap-1.5 uppercase tracking-tight">
                <Flame className="w-6 h-6 text-rose-500 fill-rose-500" />
                Popular Diners Near You
              </h2>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                Showing {matchedRestaurants.length} premium diners matching your active filter
              </p>
            </div>
          </div>

          {matchedRestaurants.length === 0 ? (
            <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
              <span className="text-5xl block mb-4">🍜</span>
              <h3 className="font-bold text-slate-800 text-lg mb-1">No diners found</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                No active simulated restaurants match your combination of cuisine and Vegetarian preference. Try widening your filters!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="restaurants-grid">
              {matchedRestaurants.map(res => (
                <div
                  key={res.id}
                  onClick={() => onSelectRestaurant(res)}
                  className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col group relative"
                >
                  {/* Photo Cover */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img src={res.image} alt={res.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    {res.featuredOffer && (
                      <span className="absolute bottom-3 left-3 bg-rose-600 text-white font-display text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-md">
                        {res.featuredOffer}
                      </span>
                    )}
                    <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-sm tracking-widest uppercase">
                      📍 {res.distance} away
                    </span>
                    <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-xs text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-sm tracking-widest uppercase">
                      🕒 {res.deliveryTime}
                    </span>
                  </div>

                  {/* Rest Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="font-display font-black text-lg text-slate-950 line-clamp-1 group-hover:text-rose-600 transition-colors">
                          {res.name}
                        </h3>
                        <div className="flex items-center gap-0.5 bg-green-100 text-green-800 font-extrabold px-1.5 py-0.5 rounded-md text-[11px] shrink-0 font-mono">
                          <span>{res.rating}</span>
                          <Star className="w-3 h-3 fill-green-800" />
                        </div>
                      </div>
                      <p className="text-slate-400 text-xs font-semibold truncate mb-4">{res.cuisine.join(', ')}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-mono text-slate-500 font-bold">
                      <span>COST: ₹{res.costForTwo} for two</span>
                      <span className="text-rose-600 font-black uppercase text-[10px] tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Order menu <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }

  // ==================== RENDERING COHESIVE BEAUTY STOREFRONT ====================
  if (activeExperience === 'beauty') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 select-none animate-fade-in" id="beauty-storefront">
        {renderBannerCarousel()}

        {/* 1. CHIC BRANDS FILTER SLIDER */}
        <div className="mb-8 bg-white p-5 rounded-3xl shadow-xs border border-slate-200/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-black text-lg text-slate-900 uppercase tracking-tight">
                Shop Elite Beauty Brands
              </h3>
              <p className="text-[11px] text-slate-400 font-bold tracking-wider uppercase">Authentic premium cosmetic houses with exclusive pricing</p>
            </div>
            
            {selectedBrand && (
              <button 
                onClick={() => setSelectedBrand(null)}
                className="text-xs font-black text-pink-600 hover:text-pink-700 bg-pink-50 px-2.5 py-1 rounded-md uppercase"
              >
                Clear Brand Filter
              </button>
            )}
          </div>

          <div ref={brandsRef} className="flex overflow-x-auto gap-3 pb-2 scrollbar-none scroll-smooth">
            {beautyBrands.map(brand => {
              const isSelected = selectedBrand === brand;
              return (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(isSelected ? null : brand)}
                  className={`px-4 py-2.5 rounded-2xl text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider shrink-0 transition-all cursor-pointer border ${
                    isSelected 
                      ? 'bg-slate-950 text-[#FFE100] border-slate-950 scale-102 shadow-md' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/50'
                  }`}
                >
                  💎 {brand}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. BEAUTY CATEGORIES GRID */}
        <div className="mb-10 bg-white p-5 rounded-3xl shadow-xs border border-slate-200/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-black text-lg text-slate-900 uppercase tracking-tight">
                Beauty Departments
              </h3>
              <p className="text-[11px] text-slate-400 font-bold tracking-wider uppercase">Dermatologist certified & luxury global beauty catalog</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
            {beautyGridCategories.map((item) => (
              <div
                key={item.name}
                onClick={() => setSelectedGridCategory(item.name)}
                className="bg-slate-50 hover:bg-pink-50 border border-slate-200/40 rounded-2xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-xs group"
              >
                <span className="text-3xl sm:text-4xl mb-2 transition-transform group-hover:scale-110 duration-300">
                  {item.emoji}
                </span>
                <span className="font-display font-black text-[10px] sm:text-xs text-slate-800 tracking-tight leading-none text-center">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. BEAUTY PRODUCTS DENSE SECTION */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-black text-xl text-slate-900 flex items-center gap-1.5 uppercase tracking-tight">
                <Sparkles className="w-5 h-5 text-pink-600" />
                {selectedBrand ? `${selectedBrand} Exclusives` : 'Spotlight Beauty Picks'}
              </h2>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                Glass skin glow kits & active serums with custom delivery lanes
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {getBeautyProducts().slice(0, 15).map((product) => {
              const isAdded = cartItemsIds.includes(product.id);
              const isFav = wishlistState[product.id];
              const discountPercentage = product.originalPrice 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
                : 0;

              return (
                <div key={product.id} className="bg-white border border-slate-200/50 rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between group relative animate-fade-in">
                  <button onClick={(e) => toggleWishlist(product.id, e)} className="absolute top-2.5 right-2.5 p-2 bg-white/80 backdrop-blur-xs rounded-full border border-slate-200/50 text-slate-400 hover:text-rose-500 transition-colors z-20">
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                  <div className="relative aspect-square overflow-hidden bg-slate-50 cursor-pointer" onClick={() => onSelectProduct(product)}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    {product.brand && (
                      <span className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-xs text-[#FFE100] font-mono text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase">
                        {product.brand}
                      </span>
                    )}
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-bold text-xs sm:text-sm text-slate-800 line-clamp-2 hover:text-slate-950 cursor-pointer leading-snug mb-1">{product.name}</h4>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-[10px] font-mono font-bold text-slate-700">{product.rating}</span>
                        <span className="text-[9px] text-slate-400 font-mono">({product.reviewCount})</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-1.5 border-t border-slate-50 pt-2.5 mt-2">
                      <div>
                        <span className="text-sm font-mono font-black text-slate-950 block">₹{product.price}</span>
                        {product.originalPrice && <span className="text-[10px] font-mono text-slate-400 line-through">₹{product.originalPrice}</span>}
                      </div>
                      <button onClick={() => onAddToCart(product)} className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${isAdded ? 'bg-slate-100 text-slate-400 border border-slate-200' : 'bg-[#FFE100] text-slate-950 hover:bg-yellow-400'}`}>
                        {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  return null;
}
