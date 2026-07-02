import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, Tag, Ticket, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem, Coupon, ExperienceType, PageType } from '../types';
import { db } from '../lib/supabase';

interface CartViewProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (coupon: Coupon | null) => void;
  onBackToStore: () => void;
  onProceedToCheckout: () => void;
  activeExperience: ExperienceType;
}

export default function CartView({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  appliedCoupon,
  onApplyCoupon,
  onBackToStore,
  onProceedToCheckout,
  activeExperience
}: CartViewProps) {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    db.getCoupons().then(list => setCoupons(list));
  }, []);

  const getThemeColor = () => {
    switch (activeExperience) {
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

  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Realistic fee structures
  const deliveryFee = cartSubtotal > 400 ? 0 : 30;
  const platformFee = 5;

  // Coupon calculation
  const getCouponDiscount = () => {
    if (!appliedCoupon) return 0;
    if (cartSubtotal < appliedCoupon.minOrder) return 0;

    if (appliedCoupon.type === 'percentage') {
      const discount = (cartSubtotal * appliedCoupon.discount) / 100;
      // Cap percentage discount at ₹200 for high-fidelity caps
      return Math.min(discount, 200);
    } else {
      return appliedCoupon.discount;
    }
  };

  const discountAmount = getCouponDiscount();
  const grandTotal = Math.max(0, cartSubtotal + deliveryFee + platformFee - discountAmount);

  // Apply Coupon code
  const handleApplyCoupon = (code: string) => {
    const coupon = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!coupon) {
      setCouponError('Invalid Coupon Code! Try GHOST50 or SAVE100');
      return;
    }
    if (cartSubtotal < coupon.minOrder) {
      setCouponError(`Min order requirement for ${coupon.code} is ₹${coupon.minOrder}`);
      return;
    }
    onApplyCoupon(coupon);
    setCouponError('');
  };

  const handleRemoveCoupon = () => {
    onApplyCoupon(null);
    setCouponInput('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center" id="empty-cart-state">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="font-display font-black text-2xl text-slate-900 mb-2">
          Your Cart is empty
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          Add fresh groceries, gourmet foods, or luxurious skincare items. Fill your basket and get ready for instant delivery!
        </p>
        <button
          onClick={onBackToStore}
          className="px-6 py-3 bg-[#FFE100] text-slate-950 hover:bg-yellow-400 border border-slate-900/10 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-xs"
        >
          Explore Storefronts
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6" id="cart-page">
      {/* Back Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBackToStore}
          className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-semibold transition-colors cursor-pointer select-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Keep Shopping</span>
        </button>
        <span className="text-xs text-slate-400 font-mono font-bold">
          Review Item Basket
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Items List */}
        <div className="lg:col-span-2 space-y-4" id="cart-items-list">
          <h2 className="font-display font-black text-xl text-slate-900 mb-4">
            Basket Items
          </h2>

          {cart.map((item) => (
            <div 
              key={item.product.id}
              className="bg-white border border-slate-200/60 rounded-2xl p-4 sm:p-5 flex gap-4 hover:shadow-xs transition-shadow"
            >
              {/* Product Thumbnail */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </div>

              {/* Item Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 line-clamp-1">
                    {item.product.name}
                  </h3>
                  {item.product.weightOrVolume && (
                    <span className="text-xs text-slate-400 font-mono">
                      {item.product.weightOrVolume}
                    </span>
                  )}
                  <div className="text-xs font-mono font-bold text-slate-600 mt-1">
                    ₹{item.product.price} each
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  className="text-xs text-slate-400 hover:text-red-500 font-semibold inline-flex items-center gap-1 mt-2 w-fit transition-colors select-none cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>

              {/* Counter / Actions Column */}
              <div className="flex flex-col items-end justify-between min-w-[100px]">
                <span className="text-sm font-mono font-bold text-slate-900">
                  ₹{item.product.price * item.quantity}
                </span>

                {/* Counter control */}
                <div className="flex items-center border border-slate-200 rounded-lg p-1 bg-slate-50 gap-2 shrink-0">
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200/55 rounded-md transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-mono font-bold text-slate-800 w-5 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200/55 rounded-md transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Right Column: Checkout Breakdown */}
        <div className="space-y-6">
          {/* Coupon Code Section */}
          <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-xs" id="cart-coupons-box">
            <h3 className="font-display font-bold text-slate-900 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <Ticket className="w-4 h-4 text-slate-500" />
              Apply Savings Coupon
            </h3>

            {appliedCoupon ? (
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between gap-3 animate-fade-in">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-800 block">{appliedCoupon.code}</span>
                    <span className="text-[10px] text-emerald-600 leading-none">Coupon successfully active!</span>
                  </div>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-950 underline shrink-0 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter GHOST50, SAVE100"
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs uppercase placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-slate-300 focus:border-slate-300 font-mono"
                  />
                  <button
                    onClick={() => handleApplyCoupon(couponInput)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-90 select-none cursor-pointer ${theme.bg}`}
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[10px] text-red-500 font-semibold mt-1.5">{couponError}</p>
                )}
              </div>
            )}

            {/* Quick List of coupons */}
            {!appliedCoupon && (
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Available Codes</span>
                {coupons.map((cp) => (
                  <button
                    key={cp.code}
                    onClick={() => {
                      setCouponInput(cp.code);
                      handleApplyCoupon(cp.code);
                    }}
                    className="w-full text-left p-2.5 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-colors flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-mono font-bold text-slate-700 block">{cp.code}</span>
                      <span className="text-[9px] text-slate-400 line-clamp-1">{cp.description}</span>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 shrink-0">Use Code</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pricing Ledger */}
          <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-xs" id="cart-summary-box">
            <h3 className="font-display font-bold text-slate-900 text-sm uppercase tracking-wider mb-4">
              Detailed Bill Summary
            </h3>

            <div className="space-y-2.5 text-xs pb-4 border-b border-slate-100">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-mono">₹{cartSubtotal}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Delivery Charge</span>
                <span className="font-mono">
                  {deliveryFee === 0 ? <span className="text-emerald-600 font-semibold uppercase">Free</span> : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Convenience / Platform Fee</span>
                <span className="font-mono">₹{platformFee}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600 font-semibold animate-fade-in">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    Coupon Discount ({appliedCoupon.code})
                  </span>
                  <span className="font-mono">-₹{discountAmount}</span>
                </div>
              )}
            </div>

             {/* Grand Total */}
            <div className="flex justify-between items-center pt-4 mb-6">
              <span className="text-sm font-bold text-slate-900">Grand Total</span>
              <div className="text-right">
                <span className="text-xl font-mono font-extrabold text-slate-950 block">₹{grandTotal}</span>
                <span className="text-[8px] text-emerald-600 font-mono font-bold uppercase">all taxes included</span>
              </div>
            </div>

            {/* Check/Safety badge */}
            <div className="p-3 bg-slate-50 border border-slate-200/50 rounded-xl mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-[10px] text-slate-500 leading-snug font-medium">
                100% Secure SSL Payment Gateway. Secure checkout guaranteed.
              </span>
            </div>

            {/* Proceed Action Button */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 bg-[#FFE100] text-slate-950 hover:bg-yellow-400 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98 border border-slate-900/10"
              id="proceed-to-checkout-btn"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
