import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowLeft, CreditCard, Wallet, Landmark, Phone, CheckCircle, Home, Briefcase, MapPin } from 'lucide-react';
import { ExperienceType, PageType, Address } from '../types';
import { db } from '../lib/supabase';


interface CheckoutViewProps {
  grandTotal: number;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  onBackToCart: () => void;
  onTriggerTracking: () => void;
  activeExperience: ExperienceType;
}

export default function CheckoutView({
  grandTotal,
  paymentMethod,
  setPaymentMethod,
  onBackToCart,
  onTriggerTracking,
  activeExperience
}: CheckoutViewProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [upiId, setUpiId] = useState('srikhyati19@okaxis');
  
  // Card states
  const [cardNumber, setCardNumber] = useState('4321 8765 4321 0987');
  const [cardExpiry, setCardExpiry] = useState('09/29');
  const [cardCvv, setCardCvv] = useState('000');
  const [cardHolder, setCardHolder] = useState('Sri Khyati');

  useEffect(() => {
    db.getAddresses().then((list) => {
      setAddresses(list);
      if (list.length > 0) {
        setSelectedAddressId(list[0].id);
      }
    });
  }, []);

  const getThemeColor = () => {
    switch (activeExperience) {
      case 'grocery':
        return {
          text: 'text-emerald-700',
          bg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
          border: 'border-emerald-600',
          ring: 'focus:ring-emerald-500'
        };
      case 'food':
        return {
          text: 'text-rose-600',
          bg: 'bg-rose-600 hover:bg-rose-700 text-white',
          border: 'border-rose-500',
          ring: 'focus:ring-rose-500'
        };
      case 'beauty':
        return {
          text: 'text-pink-600',
          bg: 'bg-pink-600 hover:bg-pink-700 text-white',
          border: 'border-pink-500',
          ring: 'focus:ring-pink-500'
        };
    }
  };

  const theme = getThemeColor();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6" id="checkout-page">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBackToCart}
          className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-semibold transition-colors cursor-pointer select-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Basket Review</span>
        </button>
        <span className="text-xs text-slate-400 font-mono font-bold">
          Secure Payment Terminal
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns: Address & Payment */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Delivery Destination */}
          <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-xs">
            <h3 className="font-display font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-slate-400" />
              Delivery Destination
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div 
                  key={addr.id}
                  onClick={() => setSelectedAddressId(addr.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    selectedAddressId === addr.id 
                      ? 'border-slate-900 bg-slate-50/50' 
                      : 'border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-600 shrink-0">
                    {(addr.type || addr.label || '').toLowerCase() === 'home' ? (
                      <Home className="w-4 h-4" />
                    ) : (addr.type || addr.label || '').toLowerCase() === 'work' ? (
                      <Briefcase className="w-4 h-4" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 capitalize">
                      {(addr.type || addr.label || 'Other')} Delivery Address
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-normal mt-1 break-words">
                      {addr.street 
                        ? `${addr.street}${addr.landmark ? `, ${addr.landmark}` : ''}, ${addr.city || ''}, ${addr.state || ''} - ${addr.postalCode || ''}`
                        : addr.addressLine}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Payment Selector */}
          <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-xs" id="checkout-payments-selector">
            <h3 className="font-display font-bold text-slate-900 text-base mb-4">
              Select Payment Method
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {/* UPI Option */}
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold cursor-pointer ${
                  paymentMethod === 'upi' 
                    ? 'border-slate-900 bg-slate-50/50' 
                    : 'border-slate-100 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Landmark className="w-5 h-5 text-blue-600" />
                <span>UPI Pay</span>
              </button>

              {/* Cards Option */}
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold cursor-pointer ${
                  paymentMethod === 'card' 
                    ? 'border-slate-900 bg-slate-50/50' 
                    : 'border-slate-100 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <CreditCard className="w-5 h-5 text-purple-600" />
                <span>Credit/Debit</span>
              </button>

              {/* Wallet Option */}
              <button
                onClick={() => setPaymentMethod('wallet')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold cursor-pointer ${
                  paymentMethod === 'wallet' 
                    ? 'border-slate-900 bg-slate-50/50' 
                    : 'border-slate-100 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Wallet className="w-5 h-5 text-amber-500" />
                <span>Wallets</span>
              </button>

              {/* COD Option */}
              <button
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold cursor-pointer ${
                  paymentMethod === 'cod' 
                    ? 'border-slate-900 bg-slate-50/50' 
                    : 'border-slate-100 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Phone className="w-5 h-5 text-emerald-600" />
                <span>Cash on Delivery</span>
              </button>
            </div>

            {/* Dynamic Content based on selection */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 min-h-[160px]">
              {paymentMethod === 'upi' && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="text-xs font-bold text-slate-700">UPI Payment Option</h4>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100">GPay</button>
                      <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100">PhonePe</button>
                      <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100">Paytm UPI</button>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Enter Custom UPI ID</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="username@okaxis"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:ring-1 focus:ring-slate-400 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
                  {/* Digital Credit Card Visual Drawing */}
                  <div className="bg-linear-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-md relative overflow-hidden flex flex-col justify-between h-36 border border-slate-700 font-mono">
                    <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-white/5 rounded-full" />
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] tracking-widest text-white/55 font-bold">PREMIUM CLUB</span>
                      <CreditCard className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <div className="text-sm tracking-wider text-white mb-2">{cardNumber || '•••• •••• •••• ••••'}</div>
                      <div className="flex justify-between items-center text-[10px] text-white/60">
                        <div>
                          <span className="block text-[8px] text-white/40 uppercase">Card Holder</span>
                          <span className="font-bold tracking-wide uppercase text-white">{cardHolder || 'Sri Khyati'}</span>
                        </div>
                        <div className="text-right">
                          <span className="block text-[8px] text-white/40 uppercase">Expires</span>
                          <span className="font-bold">{cardExpiry || 'MM/YY'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card input details */}
                  <div className="space-y-2">
                    <div>
                      <label className="text-[9px] uppercase font-mono font-bold text-slate-400 block">Card Number</label>
                      <input 
                        type="text" 
                        value={cardNumber} 
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs font-mono" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[9px] uppercase font-mono font-bold text-slate-400 block">Expiry</label>
                        <input 
                          type="text" 
                          value={cardExpiry} 
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs font-mono" 
                        />
                      </div>
                      <div>
                        <label className="text-[9px] uppercase font-mono font-bold text-slate-400 block">CVV</label>
                        <input 
                          type="password" 
                          value={cardCvv} 
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs font-mono" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[9px] uppercase font-mono font-bold text-slate-400 block">Cardholder Name</label>
                      <input 
                        type="text" 
                        value={cardHolder} 
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs font-mono" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'wallet' && (
                <div className="space-y-3 animate-fade-in">
                  <h4 className="text-xs font-bold text-slate-700">Digital Wallet Checkout</h4>
                  <div className="space-y-2">
                    <button className="w-full text-left p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors flex items-center justify-between text-xs font-semibold">
                      <span>Paytm Secure Wallet (₹2,450.00 balance)</span>
                      <CheckCircle className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                    </button>
                    <button className="w-full text-left p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors flex items-center justify-between text-xs font-semibold">
                      <span>PhonePe Wallet (₹480.00 balance)</span>
                      <span className="w-4 h-4 border rounded-full border-slate-300" />
                    </button>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="space-y-2 animate-fade-in">
                  <h4 className="text-xs font-bold text-slate-800">Cash on Delivery (COD)</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    Pay via cash, UPI scan, or card to the delivery executive when they reach your selected address. No advanced payment necessary.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Checkout Billing Review */}
        <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-xs h-fit" id="checkout-summary-sidebar">
          <h3 className="font-display font-bold text-slate-900 text-sm uppercase tracking-wider mb-4">
            Billing Review
          </h3>

          <div className="space-y-3 text-xs pb-4 mb-4 border-b border-slate-100">
            <div className="flex justify-between text-slate-500">
              <span>Order Total</span>
              <span className="font-mono">₹{grandTotal}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Secure SSL Connection</span>
              <span className="font-mono text-emerald-600 font-bold uppercase tracking-wide">Active</span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-bold text-slate-800">Grand Total</span>
            <div className="text-right">
              <span className="text-lg font-mono font-extrabold text-slate-950 block">₹{grandTotal}</span>
              <span className="text-[8px] text-emerald-600 font-mono font-bold uppercase">all taxes included</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200/50 rounded-xl mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-[10px] text-slate-500 leading-snug">
              Secure payments powered by PCI-DSS certified gateway. Your data is encrypted.
            </span>
          </div>

          {/* Secure Button */}
          <button
            onClick={onTriggerTracking}
            className="w-full py-3.5 bg-[#FFE100] text-slate-950 hover:bg-yellow-400 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer shadow-xs active:scale-98 border border-slate-900/10"
            id="simulate-payment-btn"
          >
            <span>Pay & Place Order - ₹{grandTotal}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
