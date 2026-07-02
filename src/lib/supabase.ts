import { createClient } from '@supabase/supabase-js';
import { Product, Restaurant, Address, Coupon, SavingsRecord } from '../types';
import { GROCERY_PRODUCTS } from '../data/grocery';
import { BEAUTY_PRODUCTS } from '../data/beauty';
import { RESTAURANTS } from '../data/restaurants';
import { COUPONS } from '../data/coupons';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL');

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Initial Seeding Helper for Local Fallback
const initializeLocalStorageDb = () => {
  if (!localStorage.getItem('gc_seeded')) {
    // 1. Seed products (Grocery + Beauty)
    const allProducts = [...GROCERY_PRODUCTS, ...BEAUTY_PRODUCTS];
    localStorage.setItem('gc_products', JSON.stringify(allProducts));

    // 2. Seed restaurants
    const baseRestaurants = RESTAURANTS.map(r => {
      const { menu, ...rest } = r;
      return rest;
    });
    localStorage.setItem('gc_restaurants', JSON.stringify(baseRestaurants));

    // 3. Seed menus (Separate links/products for restaurants)
    const menus: Record<string, Product[]> = {};
    RESTAURANTS.forEach(r => {
      menus[r.id] = r.menu;
    });
    localStorage.setItem('gc_menus', JSON.stringify(menus));

    // 4. Seed coupons
    localStorage.setItem('gc_coupons', JSON.stringify(COUPONS));

    // 5. Seed addresses
    const defaultAddresses: Address[] = [
      {
        id: 'addr_home',
        label: 'Home',
        addressLine: 'Flat 402, Gagan Vihar Apartments, Banjara Hills, Hyderabad, Telangana 500034',
        lat: 17.4156,
        lng: 78.4347
      },
      {
        id: 'addr_work',
        label: 'Work',
        addressLine: 'DivyaSree Omega, Block B, Tech Park, Kondapur, Hyderabad, Telangana 500081',
        lat: 17.4564,
        lng: 78.3612
      }
    ];
    localStorage.setItem('gc_addresses', JSON.stringify(defaultAddresses));

    // 6. Seed orders
    localStorage.setItem('gc_orders', JSON.stringify([]));

    // 7. Seed saved_amount (History records of savings)
    localStorage.setItem('gc_saved_amount', JSON.stringify([]));

    localStorage.setItem('gc_seeded', 'true');
  }
};

// Execute initial seeding
initializeLocalStorageDb();

// DB interfaces wrapping either Supabase or LocalStorage
export const db = {
  // PRODUCTS
  async getProducts(filters?: { experience?: string; category?: string; query?: string; brand?: string }): Promise<Product[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('products').select('*');
        if (filters?.experience) query = query.eq('experience', filters.experience);
        if (filters?.category) query = query.eq('category', filters.category);
        if (filters?.brand) query = query.eq('brand', filters.brand);
        if (filters?.query) {
          query = query.or(`name.ilike.%${filters.query}%,description.ilike.%${filters.query}%,brand.ilike.%${filters.query}%`);
        }
        const { data, error } = await query;
        if (error) throw error;
        return data as Product[];
      } catch (err) {
        console.error('Supabase getProducts failed, falling back to local', err);
      }
    }

    // Fallback
    const products: Product[] = JSON.parse(localStorage.getItem('gc_products') || '[]');
    return products.filter(p => {
      if (filters?.experience && p.experience !== filters.experience) return false;
      if (filters?.category && p.category.toLowerCase() !== filters.category.toLowerCase()) return false;
      if (filters?.brand && p.brand !== filters.brand) return false;
      if (filters?.query) {
        const q = filters.query.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesBrand = p.brand?.toLowerCase().includes(q) || false;
        const matchesCategory = p.category.toLowerCase().includes(q);
        return matchesName || matchesDesc || matchesBrand || matchesCategory;
      }
      return true;
    });
  },

  // RESTAURANTS
  async getRestaurants(filters?: { city?: string; cuisine?: string; query?: string }): Promise<Restaurant[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('restaurants').select('*');
        const { data: resData, error } = await query;
        if (error) throw error;

        // Populate with menu counts/or menu items separately if needed
        const restaurants = resData as Restaurant[];
        
        // Filter in JS or Query
        return restaurants.filter(res => {
          if (filters?.city) {
            // Check if city name is mentioned in name, id, or address (or match by distance prefix)
            const cityMatch = res.name.toLowerCase().includes(filters.city.toLowerCase()) || 
                              res.id.includes(`_${filters.city.toLowerCase().substring(0,3)}_`);
            if (!cityMatch) return false;
          }
          if (filters?.cuisine && filters.cuisine !== 'All') {
            if (!res.cuisine.includes(filters.cuisine)) return false;
          }
          if (filters?.query) {
            const q = filters.query.toLowerCase();
            const nameMatch = res.name.toLowerCase().includes(q);
            const cuisineMatch = res.cuisine.some(c => c.toLowerCase().includes(q));
            return nameMatch || cuisineMatch;
          }
          return true;
        });
      } catch (err) {
        console.error('Supabase getRestaurants failed, falling back to local', err);
      }
    }

    // Fallback
    const baseList: Omit<Restaurant, 'menu'>[] = JSON.parse(localStorage.getItem('gc_restaurants') || '[]');
    const menus: Record<string, Product[]> = JSON.parse(localStorage.getItem('gc_menus') || '{}');

    const result: Restaurant[] = baseList.map(res => ({
      ...res,
      menu: menus[res.id] || []
    }));

    return result.filter(res => {
      if (filters?.city) {
        const cityPrefixMap: Record<string, string> = {
          'hyderabad': 'hyd',
          'bengaluru': 'blr',
          'chennai': 'chn',
          'mumbai': 'mum',
          'delhi': 'del',
          'pune': 'pun',
          'kolkata': 'kol'
        };
        const prefix = cityPrefixMap[filters.city.toLowerCase()] || 'hyd';
        if (!res.id.includes(`_${prefix}_`)) return false;
      }
      if (filters?.cuisine && filters.cuisine !== 'All') {
        if (!res.cuisine.includes(filters.cuisine)) return false;
      }
      if (filters?.query) {
        const q = filters.query.toLowerCase();
        const nameMatch = res.name.toLowerCase().includes(q);
        const cuisineMatch = res.cuisine.some(c => c.toLowerCase().includes(q));
        const dishMatch = res.menu?.some(dish => dish.name.toLowerCase().includes(q)) || false;
        return nameMatch || cuisineMatch || dishMatch;
      }
      return true;
    });
  },

  async getRestaurantDetails(id: string): Promise<Restaurant | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: resData, error: resErr } = await supabase.from('restaurants').select('*').eq('id', id).single();
        if (resErr) throw resErr;

        const { data: menuData, error: menuErr } = await supabase.from('menus').select('*').eq('restaurant_id', id);
        if (menuErr) throw menuErr;

        return {
          ...resData,
          menu: menuData as Product[]
        } as Restaurant;
      } catch (err) {
        console.error(`Supabase getRestaurantDetails for ${id} failed, falling back to local`, err);
      }
    }

    // Fallback
    const baseList: Omit<Restaurant, 'menu'>[] = JSON.parse(localStorage.getItem('gc_restaurants') || '[]');
    const menus: Record<string, Product[]> = JSON.parse(localStorage.getItem('gc_menus') || '{}');

    const found = baseList.find(r => r.id === id);
    if (!found) return null;

    return {
      ...found,
      menu: menus[id] || []
    };
  },

  // ADDRESSES
  async getAddresses(): Promise<Address[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('addresses').select('*');
        if (error) throw error;
        return data as Address[];
      } catch (err) {
        console.error('Supabase getAddresses failed, falling back to local', err);
      }
    }

    return JSON.parse(localStorage.getItem('gc_addresses') || '[]');
  },

  async saveAddress(address: Omit<Address, 'id'> & { id?: string }): Promise<Address> {
    const finalAddress: Address = {
      ...address,
      id: address.id || `addr_${Date.now()}`
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('addresses').upsert(finalAddress).select().single();
        if (error) throw error;
        return data as Address;
      } catch (err) {
        console.error('Supabase saveAddress failed, falling back to local', err);
      }
    }

    const addresses: Address[] = JSON.parse(localStorage.getItem('gc_addresses') || '[]');
    const existingIndex = addresses.findIndex(a => a.id === finalAddress.id);
    if (existingIndex > -1) {
      addresses[existingIndex] = finalAddress;
    } else {
      addresses.push(finalAddress);
    }
    localStorage.setItem('gc_addresses', JSON.stringify(addresses));
    return finalAddress;
  },

  async deleteAddress(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('addresses').delete().eq('id', id);
        if (error) throw error;
        return true;
      } catch (err) {
        console.error('Supabase deleteAddress failed, falling back to local', err);
      }
    }

    const addresses: Address[] = JSON.parse(localStorage.getItem('gc_addresses') || '[]');
    const filtered = addresses.filter(a => a.id !== id);
    localStorage.setItem('gc_addresses', JSON.stringify(filtered));
    return true;
  },

  // ORDERS
  async getOrders(): Promise<any[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data;
      } catch (err) {
        console.error('Supabase getOrders failed, falling back to local', err);
      }
    }

    return JSON.parse(localStorage.getItem('gc_orders') || '[]');
  },

  async createOrder(order: any): Promise<any> {
    const newOrder = {
      ...order,
      id: order.id || `order_${Date.now()}`,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('orders').insert(newOrder).select().single();
        if (error) throw error;
        return data;
      } catch (err) {
        console.error('Supabase createOrder failed, falling back to local', err);
      }
    }

    const orders = JSON.parse(localStorage.getItem('gc_orders') || '[]');
    orders.unshift(newOrder);
    localStorage.setItem('gc_orders', JSON.stringify(orders));
    return newOrder;
  },

  // COUPONS
  async getCoupons(): Promise<Coupon[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('coupons').select('*');
        if (error) throw error;
        return data as Coupon[];
      } catch (err) {
        console.error('Supabase getCoupons failed, falling back to local', err);
      }
    }

    return JSON.parse(localStorage.getItem('gc_coupons') || '[]');
  },

  // SAVED AMOUNT (GHOSTCART REFLECTION HISTORY)
  async getSavingsHistory(): Promise<SavingsRecord[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('saved_amount').select('*').order('timestamp', { ascending: false });
        if (error) throw error;
        return data as SavingsRecord[];
      } catch (err) {
        console.error('Supabase getSavingsHistory failed, falling back to local', err);
      }
    }

    return JSON.parse(localStorage.getItem('gc_saved_amount') || '[]');
  },

  async saveSavingsRecord(record: Omit<SavingsRecord, 'id'>): Promise<SavingsRecord> {
    const newRecord: SavingsRecord = {
      ...record,
      id: `save_${Date.now()}`
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('saved_amount').insert(newRecord).select().single();
        if (error) throw error;
        return data as SavingsRecord;
      } catch (err) {
        console.error('Supabase saveSavingsRecord failed, falling back to local', err);
      }
    }

    const list: SavingsRecord[] = JSON.parse(localStorage.getItem('gc_saved_amount') || '[]');
    list.unshift(newRecord);
    localStorage.setItem('gc_saved_amount', JSON.stringify(list));
    return newRecord;
  }
};
