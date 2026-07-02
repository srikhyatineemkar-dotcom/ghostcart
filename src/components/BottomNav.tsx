import React from 'react';
import { Home, Search, ShoppingCart, ShieldCheck } from 'lucide-react';
import { ExperienceType, PageType, CartItem } from '../types';

interface BottomNavProps {
  activeExperience: ExperienceType;
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  cart: CartItem[];
  onOpenCart: () => void;
}

export default function BottomNav({
  activeExperience,
  currentPage,
  setCurrentPage,
  cart,
  onOpenCart
}: BottomNavProps) {
  
  if (currentPage === 'landing' || currentPage === 'success' || currentPage === 'order-tracking') {
    return null;
  }

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const getActiveColor = () => {
    switch (activeExperience) {
      case 'grocery': return 'text-emerald-600';
      case 'food': return 'text-rose-600';
      case 'beauty': return 'text-pink-600';
    }
  };

  const activeColor = getActiveColor();

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-100 z-30 lg:hidden shadow-lg" id="mobile-bottom-navigation">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        
        {/* Home */}
        <button
          onClick={() => setCurrentPage('home')}
          className={`flex flex-col items-center justify-center gap-1 flex-1 h-full select-none ${
            currentPage === 'home' ? activeColor : 'text-slate-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
        </button>

        {/* Search */}
        <button
          onClick={() => setCurrentPage('search')}
          className={`flex flex-col items-center justify-center gap-1 flex-1 h-full select-none ${
            currentPage === 'search' ? activeColor : 'text-slate-400'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Search</span>
        </button>

        {/* Cart */}
        <button
          onClick={onOpenCart}
          className={`flex flex-col items-center justify-center gap-1 flex-1 h-full select-none relative ${
            currentPage === 'cart' ? activeColor : 'text-slate-400'
          }`}
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-slate-900 text-white text-[9px] font-mono font-bold px-1.5 rounded-full ring-2 ring-white">
                {totalCartItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider">Basket</span>
        </button>

        {/* Dashboard/Onboarding */}
        <button
          onClick={() => setCurrentPage('landing')}
          className="flex flex-col items-center justify-center gap-1 flex-1 h-full select-none text-slate-400"
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Dashboard</span>
        </button>

      </div>
    </div>
  );
}
