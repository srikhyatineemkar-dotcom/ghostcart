import React, { useState } from 'react';
import { Star, Clock, MapPin, ArrowLeft, Plus, Check, BadgeAlert } from 'lucide-react';
import { Restaurant, Product } from '../types';

interface RestaurantViewProps {
  restaurant: Restaurant;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  cartItemsIds: string[];
}

export default function RestaurantView({
  restaurant,
  onBack,
  onAddToCart,
  cartItemsIds
}: RestaurantViewProps) {
  const [filterVegOnly, setFilterVegOnly] = useState(false);

  const getFilteredMenu = () => {
    if (filterVegOnly) {
      return restaurant.menu.filter(item => item.isVeg);
    }
    return restaurant.menu;
  };

  const filteredMenu = getFilteredMenu();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6" id="restaurant-view-page">
      {/* Back to Diner List */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-semibold mb-6 transition-colors cursor-pointer select-none"
        id="restaurant-back-btn"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Restaurant List</span>
      </button>

      {/* Restaurant Header Banner */}
      <div className="relative rounded-3xl overflow-hidden h-64 mb-8 border border-slate-100 shadow-xs">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-rose-600 text-white text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-sm">
              GOURMET EXPERT
            </span>
            <span className="text-white/60 text-xs font-semibold">•</span>
            <span className="text-white/80 text-xs font-mono font-semibold">{restaurant.distance} away</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tight mb-2">
            {restaurant.name}
          </h1>

          <p className="text-white/70 text-xs sm:text-sm max-w-xl font-light mb-4">
            {restaurant.cuisine.join(', ')} • Delicious slow cooked hand-crafted gourmet selections.
          </p>

          <div className="flex items-center gap-6 text-xs font-mono">
            <div className="flex items-center gap-1 bg-green-600/90 text-white font-bold px-2 py-1 rounded-md">
              <span>{restaurant.rating}</span>
              <Star className="w-3.5 h-3.5 fill-white text-white" />
            </div>
            <span className="text-white/30">|</span>
            <div className="flex items-center gap-1 text-white/80">
              <Clock className="w-3.5 h-3.5" />
              <span>{restaurant.deliveryTime} (Simulated Fast Lane)</span>
            </div>
            <span className="text-white/30">|</span>
            <span className="text-white/80">₹{restaurant.costForTwo} for two</span>
          </div>
        </div>
      </div>

      {/* Promotional Callout */}
      {restaurant.featuredOffer && (
        <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center text-white font-bold text-xs font-mono shrink-0">
            %
          </div>
          <div>
            <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wide">EXCLUSIVE DINER BENEFIT</h4>
            <p className="text-xs text-rose-800 leading-normal">
              {restaurant.featuredOffer}. This offer is automatically integrated into your simulation.
            </p>
          </div>
        </div>
      )}

      {/* Interactive Veg/Non-Veg Filter switch */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
        <h2 className="font-display font-black text-xl text-slate-800">
          Restaurant Menu
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Veg Only</span>
          <button
            onClick={() => setFilterVegOnly(!filterVegOnly)}
            className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${
              filterVegOnly ? 'bg-green-600' : 'bg-slate-200'
            }`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${
              filterVegOnly ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>

      {/* Food Menu Items List */}
      <div className="space-y-6" id="menu-items-list">
        {filteredMenu.map((item) => {
          const isAdded = cartItemsIds.includes(item.id);

          return (
            <div 
              key={item.id}
              className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-xs transition-shadow flex gap-5"
            >
              {/* Left Column: Veg Indicator, Name, Description */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Veg/Non-Veg Visual Indicator Box */}
                  <div className="mb-2">
                    {item.isVeg ? (
                      <div className="w-4.5 h-4.5 border border-green-600 flex items-center justify-center rounded-sm shrink-0">
                        <div className="w-2 h-2 rounded-full bg-green-600" />
                      </div>
                    ) : (
                      <div className="w-4.5 h-4.5 border border-red-600 flex items-center justify-center rounded-sm shrink-0">
                        <div className="w-2 h-2 rounded-full bg-red-600" />
                      </div>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-lg text-slate-900 leading-tight mb-1">
                    {item.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-base font-mono font-bold text-slate-800">₹{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-xs font-mono text-slate-400 line-through">₹{item.originalPrice}</span>
                    )}
                  </div>

                  <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="text-[10px] text-slate-400 mt-4 flex items-center gap-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Prep time: ~15-20 mins</span>
                </div>
              </div>

              {/* Right Column: Menu Image & Action */}
              <div className="w-28 sm:w-32 shrink-0 flex flex-col items-center gap-3">
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <button
                  onClick={() => onAddToCart(item)}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-xs ${
                    isAdded 
                      ? 'bg-slate-100 text-slate-500 border border-slate-200' 
                      : 'bg-rose-600 hover:bg-rose-700 text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}

        {filteredMenu.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-3xl block mb-2">🥗</span>
            <h4 className="font-bold text-slate-700">No vegetarian dishes available</h4>
            <p className="text-xs text-slate-400">Please turn off the "Veg Only" switch to view other delicious recipes.</p>
          </div>
        )}
      </div>

    </div>
  );
}
