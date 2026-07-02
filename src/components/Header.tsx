import React, { useState } from 'react';
import { ShoppingCart, MapPin, Search, ChevronDown, Sparkles, ShoppingBag, Heart, Bell, User, LogIn } from 'lucide-react';
import { ExperienceType, PageType, CartItem } from '../types';
import { POPULAR_LOCATIONS } from '../data';
import LocationPickerModal from './LocationPickerModal';


interface HeaderProps {
  activeExperience: ExperienceType;
  setExperience: (exp: ExperienceType) => void;
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  cart: CartItem[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeLocation: string;
  setActiveLocation: (loc: string) => void;
  onOpenCart: () => void;
  totalSavedAcrossHistory: number;
}

export default function Header({
  activeExperience,
  setExperience,
  currentPage,
  setCurrentPage,
  cart,
  searchQuery,
  setSearchQuery,
  activeLocation,
  setActiveLocation,
  onOpenCart,
  totalSavedAcrossHistory
}: HeaderProps) {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  React.useEffect(() => {
    const firstOpenDone = localStorage.getItem('ghostcart_first_open_done');
    if (!firstOpenDone) {
      setIsLocationModalOpen(true);
    }
  }, []);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleLogoClick = () => {
    setCurrentPage('landing');
  };

  const handleTabClick = (exp: ExperienceType) => {
    setExperience(exp);
    setCurrentPage('home');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200/80 shadow-xs backdrop-blur-md bg-white/95" id="premium-sticky-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Bar */}
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-4">
          
          {/* Logo & Branding - Premium Shopping Yellow branding */}
          <div 
            onClick={handleLogoClick}
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer select-none group shrink-0"
            id="header-logo"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FFE100] flex items-center justify-center text-slate-950 font-black text-xl italic shadow-xs transition-transform group-hover:scale-105 border border-slate-900/10">
              G
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg sm:text-xl tracking-tight text-slate-900 uppercase leading-none">
                Ghost<span className="text-slate-950 bg-[#FFE100] px-1 rounded-sm ml-0.5 border border-slate-950/10">Cart</span>
              </span>
              <span className="text-[8px] font-mono font-bold text-slate-400 tracking-widest mt-0.5">PREMIUM EXPRESS</span>
            </div>
          </div>

          {/* Desktop Experience Switcher */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => handleTabClick('grocery')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeExperience === 'grocery' 
                  ? 'bg-slate-950 text-[#FFE100] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Grocery
            </button>
            <button
              onClick={() => handleTabClick('food')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeExperience === 'food' 
                  ? 'bg-slate-950 text-[#FFE100] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Food
            </button>
            <button
              onClick={() => handleTabClick('beauty')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeExperience === 'beauty' 
                  ? 'bg-slate-950 text-[#FFE100] shadow-xs' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Beauty
            </button>
          </div>

          {/* Delivery Location Selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 transition-all cursor-pointer"
              id="header-location-picker"
            >
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate max-w-[130px]">{activeLocation}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>
          </div>

          {/* Large Search Bar - Premium Shopping style */}
          <div className="flex-1 max-w-xs xl:max-w-md relative hidden sm:block" id="header-search-bar">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentPage !== 'search' && e.target.value.trim() !== '') {
                  setCurrentPage('search');
                } else if (e.target.value.trim() === '' && currentPage === 'search') {
                  setCurrentPage('home');
                }
              }}
              placeholder="Search for fresh milk, red lipsticks, pizzas..."
              className="block w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#FFE100] focus:border-slate-400 outline-none transition-all placeholder-slate-400 font-medium"
            />
          </div>

          {/* Right Actions Block */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Lifetime Savings Ledger Badge */}
            {totalSavedAcrossHistory > 0 && (
              <div 
                onClick={() => setCurrentPage('landing')}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold rounded-xl text-xs cursor-pointer transition-all select-none group"
                title="View your lifetime GhostCart savings ledger"
              >
                <span className="text-[9px] text-emerald-600 font-mono font-black uppercase tracking-wider">SAVED:</span>
                <span className="font-mono font-black text-emerald-700">₹{totalSavedAcrossHistory.toLocaleString('en-IN')}</span>
              </div>
            )}
            
            {/* Login / Sign In Button */}
            <button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                isLoggedIn 
                  ? 'bg-slate-100 text-slate-800 hover:bg-slate-200' 
                  : 'bg-[#FFE100] text-slate-950 hover:bg-yellow-400 shadow-xs'
              }`}
              id="header-login-button"
            >
              {isLoggedIn ? (
                <>
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">Sign Out</span>
                </>
              ) : (
                <>
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </>
              )}
            </button>

            {/* Wishlist Button */}
            <button 
              onClick={() => setWishlistCount(prev => prev === 0 ? 3 : 0)}
              className="p-2 text-slate-500 hover:text-rose-600 hover:bg-slate-50 rounded-xl transition-all relative cursor-pointer"
              title="Your Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-rose-500 text-[8px] font-bold text-white ring-1 ring-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Notification Button */}
            <button 
              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all relative cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 flex h-1.5 w-1.5 rounded-full bg-[#FFE100] ring-1 ring-white animate-pulse" />
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-slate-950 font-black bg-[#FFE100] hover:bg-yellow-400 text-xs shadow-xs border border-slate-900/10 transition-transform active:scale-95 cursor-pointer"
              id="header-cart-button"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950 text-[10px] font-bold text-white ring-2 ring-white">
                    {totalCartItems}
                  </span>
                )}
              </div>
              <span className="text-xs font-black hidden xs:inline uppercase tracking-wider">
                {totalCartItems > 0 ? `₹${cartTotal}` : 'Cart'}
              </span>
            </button>

            {/* Profile Avatar */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 border border-slate-200 shadow-xs flex items-center justify-center text-slate-600 font-extrabold select-none shrink-0 text-xs cursor-pointer hover:border-slate-400 transition-colors">
              JD
            </div>

          </div>

        </div>

        {/* Mobile Experience Quick-Tabs (Underneath header on mobile viewports) */}
        <div className="flex lg:hidden items-center justify-between pb-3 overflow-x-auto gap-2 scrollbar-none" id="mobile-experience-tab-bar">
          {/* Quick Mobile Location Selector */}
          <div className="block md:hidden mr-1 shrink-0">
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-1.5 rounded-lg border border-slate-200"
            >
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate max-w-[80px]">{activeLocation.split(',')[0]}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl flex-1 justify-around">
            <button
              onClick={() => handleTabClick('grocery')}
              className={`flex-1 text-center py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                activeExperience === 'grocery' 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Grocery
            </button>
            <button
              onClick={() => handleTabClick('food')}
              className={`flex-1 text-center py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                activeExperience === 'food' 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Food
            </button>
            <button
              onClick={() => handleTabClick('beauty')}
              className={`flex-1 text-center py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                activeExperience === 'beauty' 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Beauty
            </button>
          </div>
        </div>

      </div>

      <LocationPickerModal 
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        activeLocation={activeLocation}
        setActiveLocation={setActiveLocation}
      />
    </header>
  );
}
