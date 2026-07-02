-- GhostCart Supabase Setup Script
-- Paste this script into the Supabase SQL Editor to create all required tables with optimal indexes.

-- 1. Create PRODUCTS Table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    originalPrice NUMERIC,
    weightOrVolume TEXT,
    rating NUMERIC NOT NULL DEFAULT 4.5,
    reviewCount INTEGER NOT NULL DEFAULT 100,
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    experience TEXT NOT NULL, -- 'grocery' | 'food' | 'beauty'
    description TEXT NOT NULL,
    deliveryTime TEXT NOT NULL,
    brand TEXT,
    tags TEXT[],
    isVeg BOOLEAN DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_products_experience ON public.products(experience);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);

-- 2. Create RESTAURANTS Table
CREATE TABLE IF NOT EXISTS public.restaurants (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    cuisine TEXT[] NOT NULL,
    rating NUMERIC NOT NULL DEFAULT 4.5,
    reviewCount INTEGER NOT NULL DEFAULT 200,
    deliveryTime TEXT NOT NULL,
    costForTwo INTEGER NOT NULL,
    image TEXT NOT NULL,
    distance TEXT NOT NULL,
    featuredOffer TEXT,
    promoted BOOLEAN DEFAULT false
);

-- 3. Create MENUS Table (Linking restaurants to products as separate menu items)
CREATE TABLE IF NOT EXISTS public.menus (
    id TEXT PRIMARY KEY,
    restaurant_id TEXT REFERENCES public.restaurants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    originalPrice NUMERIC,
    rating NUMERIC DEFAULT 4.5,
    reviewCount INTEGER DEFAULT 50,
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    experience TEXT NOT NULL DEFAULT 'food',
    description TEXT,
    deliveryTime TEXT,
    isVeg BOOLEAN DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_menus_restaurant ON public.menus(restaurant_id);

-- 4. Create ADDRESSES Table
CREATE TABLE IF NOT EXISTS public.addresses (
    id TEXT PRIMARY KEY,
    label TEXT NOT NULL, -- 'Home', 'Work', 'Other'
    addressLine TEXT NOT NULL,
    lat NUMERIC NOT NULL,
    lng NUMERIC NOT NULL
);

-- 5. Create COUPONS Table
CREATE TABLE IF NOT EXISTS public.coupons (
    code TEXT PRIMARY KEY,
    discount NUMERIC NOT NULL,
    type TEXT NOT NULL, -- 'percentage' | 'flat'
    minOrder NUMERIC NOT NULL,
    description TEXT NOT NULL
);

-- 6. Create ORDERS Table
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    experience TEXT NOT NULL,
    items JSONB NOT NULL,
    total_amount NUMERIC NOT NULL,
    savings_amount NUMERIC NOT NULL,
    address_id TEXT,
    status TEXT NOT NULL DEFAULT 'Placed'
);

-- 7. Create SAVED_AMOUNT Table (GhostCart custom history tracking)
CREATE TABLE IF NOT EXISTS public.saved_amount (
    id TEXT PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    experience TEXT NOT NULL,
    itemsCount INTEGER NOT NULL,
    amountSaved NUMERIC NOT NULL,
    itemsList TEXT[] NOT NULL
);

-- Enable Row Level Security (RLS) but allow anonymous access for ease of developer setup
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_amount ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read on products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read on restaurants" ON public.restaurants FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read on menus" ON public.menus FOR SELECT USING (true);
CREATE POLICY "Allow anonymous all on addresses" ON public.addresses FOR ALL USING (true);
CREATE POLICY "Allow anonymous read on coupons" ON public.coupons FOR SELECT USING (true);
CREATE POLICY "Allow anonymous all on orders" ON public.orders FOR ALL USING (true);
CREATE POLICY "Allow anonymous all on saved_amount" ON public.saved_amount FOR ALL USING (true);
