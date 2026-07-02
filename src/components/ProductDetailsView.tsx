import React, { useState } from 'react';
import { Star, ShieldAlert, ArrowLeft, ShoppingCart, Plus, Check, Sparkles, MessageSquare, Heart } from 'lucide-react';
import { Product } from '../types';
import { GROCERY_PRODUCTS, BEAUTY_PRODUCTS } from '../data';

interface ProductDetailsViewProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  cartItemsIds: string[];
}

export default function ProductDetailsView({
  product,
  onBack,
  onAddToCart,
  cartItemsIds
}: ProductDetailsViewProps) {
  const [favorite, setFavorite] = useState(false);
  const isAdded = cartItemsIds.includes(product.id);

  // Generate simulated frequently bought together items based on current item's experience
  const getBundleItems = (): Product[] => {
    const list = product.experience === 'grocery' ? GROCERY_PRODUCTS : BEAUTY_PRODUCTS;
    return list.filter(item => item.id !== product.id).slice(0, 2);
  };

  const bundleItems = getBundleItems();
  const bundleTotalPrice = product.price + bundleItems.reduce((acc, b) => acc + b.price, 0);

  const getThemeColor = () => {
    switch (product.experience) {
      case 'grocery':
        return {
          text: 'text-emerald-700',
          bg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
          accentBg: 'bg-emerald-50 text-emerald-800 border-emerald-100',
          badge: 'bg-emerald-100 text-emerald-800'
        };
      case 'food':
        return {
          text: 'text-rose-600',
          bg: 'bg-rose-600 hover:bg-rose-700 text-white',
          accentBg: 'bg-rose-50 text-rose-800 border-rose-100',
          badge: 'bg-rose-100 text-rose-800'
        };
      case 'beauty':
        return {
          text: 'text-pink-600',
          bg: 'bg-pink-600 hover:bg-pink-700 text-white',
          accentBg: 'bg-pink-50 text-pink-800 border-pink-100',
          badge: 'bg-pink-100 text-pink-800'
        };
    }
  };

  const theme = getThemeColor();

  const handleAddBundle = () => {
    onAddToCart(product);
    bundleItems.forEach(item => {
      if (!cartItemsIds.includes(item.id)) {
        onAddToCart(item);
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6" id="product-details-page">
      {/* Back navigation */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-semibold mb-6 transition-colors select-none cursor-pointer"
        id="product-back-btn"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Storefront</span>
      </button>

      {/* Main Column Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
        {/* Left Column: Premium Image Showcase */}
        <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-100 p-2 shadow-xs">
          <div className="aspect-square rounded-xl overflow-hidden relative bg-slate-50">
            <img 
              src={product.image} 
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <button 
              onClick={() => setFavorite(!favorite)}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs p-2.5 rounded-full shadow-xs text-rose-500 hover:scale-110 active:scale-90 transition-transform"
            >
              <Heart className={`w-5 h-5 ${favorite ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Right Column: Descriptions & Details */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Tag/Brand */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-sm bg-slate-900 text-[#FFE100] border border-slate-900/10">
                {product.brand || product.category}
              </span>
              <span className="text-slate-300 font-light text-xs">•</span>
              <span className="text-xs text-slate-500 font-mono font-bold">IN STOCK</span>
            </div>

            {/* Product Title */}
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight mb-4">
              {product.name}
            </h1>

            {/* Ratings and Reviews */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-md text-xs font-mono">
                <span>{product.rating}</span>
                <Star className="w-3.5 h-3.5 fill-amber-800 text-amber-800" />
              </div>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500 text-sm font-medium flex items-center gap-1">
                <MessageSquare className="w-4 h-4 text-slate-400" />
                {product.reviewCount} customer reviews
              </span>
            </div>

            {/* Pricing Section */}
            <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-5 mb-6">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-mono font-extrabold text-slate-950">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg font-mono text-slate-400 line-through">₹{product.originalPrice}</span>
                )}
              </div>
              <p className="text-xs text-green-600 font-mono font-bold">
                Free standard delivery available on this order.
              </p>
            </div>

            {/* Item Description */}
            <div className="mb-6">
              <h3 className="font-display font-bold text-slate-800 text-sm uppercase tracking-wider mb-2">
                Product Description
              </h3>
              <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Delivery Alert banner */}
            <div className="flex items-start gap-3 p-4 border border-slate-200 bg-slate-50 rounded-xl mb-6">
              <ShieldAlert className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Guaranteed Instant Fulfillment</h4>
                <p className="text-xs text-slate-500 leading-normal">
                  Our hyper-local fleet is pre-assigned. Delivery to your address in {product.deliveryTime}.
                </p>
              </div>
            </div>
          </div>

          {/* Action Trigger Row */}
          <div className="flex items-center gap-3 border-t border-slate-100 pt-6 mt-6">
            <button
              onClick={() => onAddToCart(product)}
              className={`flex-1 py-3.5 rounded-xl text-sm font-black uppercase tracking-wider transition-transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer ${
                isAdded 
                  ? 'bg-slate-100 text-slate-400 border border-slate-200' 
                  : 'bg-[#FFE100] text-slate-950 hover:bg-yellow-400 shadow-xs border border-slate-900/10'
              }`}
              id="details-add-to-cart-btn"
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Item in Cart</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together (Upselling Simulation) */}
      <div className="border-t border-slate-200/80 pt-10 mb-12" id="frequently-bought-together">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
          <h2 className="font-display font-black text-xl text-slate-900 tracking-tight uppercase">
            Frequently Bought Together
          </h2>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-xs">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Items Connection Row */}
            <div className="flex items-center justify-center gap-3 md:gap-5 flex-wrap flex-1">
              {/* Primary Item */}
              <div className="text-center w-24">
                <div className="aspect-square rounded-lg overflow-hidden border border-slate-100 bg-slate-50 mb-2">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-[11px] font-semibold text-slate-800 truncate">{product.name}</div>
                <div className="text-xs font-mono font-bold text-slate-500">₹{product.price}</div>
              </div>

              {/* Plus Sign */}
              <span className="text-slate-300 font-bold text-xl">+</span>

              {/* Bundle items */}
              {bundleItems.map((b) => (
                <React.Fragment key={b.id}>
                  <div className="text-center w-24">
                    <div className="aspect-square rounded-lg overflow-hidden border border-slate-100 bg-slate-50 mb-2">
                      <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-[11px] font-semibold text-slate-800 truncate">{b.name}</div>
                    <div className="text-xs font-mono font-bold text-slate-500">₹{b.price}</div>
                  </div>
                  {b.id !== bundleItems[bundleItems.length - 1].id && (
                    <span className="text-slate-300 font-bold text-xl">+</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Bundle Checkout Box */}
            <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-5 text-center lg:text-left min-w-[240px]">
              <span className="text-xs text-slate-400 font-semibold block mb-1">Bundle Offer Price</span>
              <div className="text-2xl font-mono font-extrabold text-slate-900 mb-2">
                ₹{bundleTotalPrice}
              </div>
              <button
                onClick={handleAddBundle}
                className="w-full py-2.5 bg-[#FFE100] text-slate-950 hover:bg-yellow-400 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xs border border-slate-900/10"
              >
                Add Complete Bundle
              </button>
              <span className="text-[10px] text-slate-400 mt-1.5 block text-center lg:text-left font-semibold">
                Get express delivery on all bundle items!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
