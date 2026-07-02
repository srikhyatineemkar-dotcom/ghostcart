export type ExperienceType = 'grocery' | 'food' | 'beauty';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  weightOrVolume?: string;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  experience: ExperienceType;
  description: string;
  deliveryTime: string;
  brand?: string;
  tags?: string[];
  isVeg?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  costForTwo: number;
  image: string;
  distance: string; // e.g. "2.4 km"
  featuredOffer?: string; // e.g. "Flat 20% OFF"
  menu: Product[];
  promoted?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customizations?: string;
}

export interface Coupon {
  code: string;
  discount: number; // percentage or absolute
  type: 'percentage' | 'flat';
  minOrder: number;
  description: string;
}

export type PageType = 
  | 'landing'
  | 'home'
  | 'search'
  | 'category'
  | 'restaurant-list'
  | 'restaurant'
  | 'product-details'
  | 'cart'
  | 'checkout'
  | 'order-tracking'
  | 'success';

export interface TrackingStep {
  id: number;
  label: string;
  description: string;
  duration: number; // milliseconds for simulation step
  icon: string;
}

export interface SavingsRecord {
  id: string;
  timestamp: string;
  experience: ExperienceType;
  itemsCount: number;
  amountSaved: number;
  itemsList: string[];
}

export interface Address {
  id: string;
  label: string; // 'Home' | 'Work' | 'Other' etc.
  type?: string; // 'home' | 'work' | 'other' etc.
  addressLine: string;
  lat: number;
  lng: number;
  houseNumber?: string;
  street?: string;
  area?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  landmark?: string;
}

