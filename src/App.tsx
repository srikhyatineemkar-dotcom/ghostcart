import React, { useState, useEffect } from 'react';
import { ExperienceType, PageType, CartItem, Product, Restaurant, Coupon, SavingsRecord } from './types';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import ExperienceHome from './components/ExperienceHome';
import ProductDetailsView from './components/ProductDetailsView';
import RestaurantView from './components/RestaurantView';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import OrderTrackingView from './components/OrderTrackingView';
import SuccessView from './components/SuccessView';
import BottomNav from './components/BottomNav';

export default function App() {
  const [activeExperience, setExperience] = useState<ExperienceType>('grocery');
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLocation, setActiveLocation] = useState('Banjara Hills, Hyderabad');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  
  // Track savings history
  const [savingsRecords, setSavingsRecords] = useState<SavingsRecord[]>([]);
  const [lastSavedAmount, setLastSavedAmount] = useState(0);

  // Load savings history from local storage on launch
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ghostcart_savings_ledger');
      if (stored) {
        setSavingsRecords(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse savings history', e);
    }
  }, []);

  // Sync savings history to local storage
  const saveToHistory = (amount: number, count: number, items: string[]) => {
    const newRecord: SavingsRecord = {
      id: 'rec_' + Date.now(),
      timestamp: new Date().toISOString(),
      experience: activeExperience,
      itemsCount: count,
      amountSaved: amount,
      itemsList: items
    };

    const updated = [newRecord, ...savingsRecords];
    setSavingsRecords(updated);
    try {
      localStorage.setItem('ghostcart_savings_ledger', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to sync savings ledger', e);
    }
    setLastSavedAmount(amount);
  };

  const handleClearHistory = () => {
    setSavingsRecords([]);
    try {
      localStorage.removeItem('ghostcart_savings_ledger');
    } catch (e) {
      console.error('Failed to clear savings history', e);
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart(prev => 
      prev.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  // Derived pricing calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = cartSubtotal > 400 || cartSubtotal === 0 ? 0 : 30;
  const platformFee = cartSubtotal === 0 ? 0 : 5;
  
  const getCouponDiscount = () => {
    if (!appliedCoupon) return 0;
    if (cartSubtotal < appliedCoupon.minOrder) return 0;
    if (appliedCoupon.type === 'percentage') {
      const discount = (cartSubtotal * appliedCoupon.discount) / 100;
      return Math.min(discount, 200); // Max 200 discount cap
    }
    return appliedCoupon.discount;
  };

  const discountAmount = getCouponDiscount();
  const grandTotal = Math.max(0, cartSubtotal + deliveryFee + platformFee - discountAmount);

  // Simulated Checkout Progression triggers
  const handleTriggerTracking = () => {
    setCurrentPage('order-tracking');
  };

  const handleCompleteSimulation = () => {
    // Fulfill savings ledger calculation
    const count = cart.reduce((acc, c) => acc + c.quantity, 0);
    const names = cart.map(c => c.product.name);
    
    saveToHistory(grandTotal, count, names);
    
    // Clear Active simulation states
    setCart([]);
    setAppliedCoupon(null);
    setCurrentPage('success');
  };

  const handleResetSimulator = () => {
    setCurrentPage('home');
  };

  const [resistersCount, setResistersCount] = useState(14204);
  useEffect(() => {
    const interval = setInterval(() => {
      setResistersCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const totalSavedAcrossHistory = savingsRecords.reduce((acc, rec) => acc + rec.amountSaved, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between pb-16 lg:pb-0" id="ghostcart-root">
      
      {/* Premium Sticky Navigation */}
      <Header
        activeExperience={activeExperience}
        setExperience={setExperience}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cart={cart}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeLocation={activeLocation}
        setActiveLocation={setActiveLocation}
        onOpenCart={() => setCurrentPage('cart')}
        totalSavedAcrossHistory={totalSavedAcrossHistory}
      />

      {/* Main Experience Router Block */}
      <main className="flex-1">
        {currentPage === 'landing' && (
          <LandingPage
            onSelectExperience={(exp) => {
              setExperience(exp);
              setCurrentPage('home');
            }}
            savingsRecords={savingsRecords}
            onClearHistory={handleClearHistory}
          />
        )}

        {(currentPage === 'home' || currentPage === 'search') && (
          <ExperienceHome
            activeExperience={activeExperience}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeLocation={activeLocation}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onSelectProduct={(prod) => {
              setSelectedProduct(prod);
              setCurrentPage('product-details');
            }}
            onSelectRestaurant={(res) => {
              setSelectedRestaurant(res);
              setCurrentPage('restaurant');
            }}
            onAddToCart={handleAddToCart}
            cartItemsIds={cart.map(item => item.product.id)}
          />
        )}

        {currentPage === 'product-details' && selectedProduct && (
          <ProductDetailsView
            product={selectedProduct}
            onBack={() => setCurrentPage('home')}
            onAddToCart={handleAddToCart}
            cartItemsIds={cart.map(item => item.product.id)}
          />
        )}

        {currentPage === 'restaurant' && selectedRestaurant && (
          <RestaurantView
            restaurant={selectedRestaurant}
            onBack={() => setCurrentPage('home')}
            onAddToCart={handleAddToCart}
            cartItemsIds={cart.map(item => item.product.id)}
          />
        )}

        {currentPage === 'cart' && (
          <CartView
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            appliedCoupon={appliedCoupon}
            onApplyCoupon={setAppliedCoupon}
            onBackToStore={() => setCurrentPage('home')}
            onProceedToCheckout={() => setCurrentPage('checkout')}
            activeExperience={activeExperience}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutView
            grandTotal={grandTotal}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            onBackToCart={() => setCurrentPage('cart')}
            onTriggerTracking={handleTriggerTracking}
            activeExperience={activeExperience}
          />
        )}

        {currentPage === 'order-tracking' && (
          <OrderTrackingView
            grandTotal={grandTotal}
            onComplete={handleCompleteSimulation}
          />
        )}

        {currentPage === 'success' && (
          <SuccessView
            grandTotal={lastSavedAmount}
            experience={activeExperience}
            onReset={handleResetSimulator}
            savedTotalAcrossHistory={totalSavedAcrossHistory}
            itemsList={savingsRecords[0]?.itemsList || []}
          />
        )}
      </main>

      {/* Responsive Mobile Bottom Navigation bar */}
      <BottomNav
        activeExperience={activeExperience}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cart={cart}
        onOpenCart={() => setCurrentPage('cart')}
      />

      {/* BOTTOM NOTIFICATION: LIVE SHOPPING TICKER (Premium E-commerce) */}
      <div className="flex-none bg-slate-950 h-11 hidden lg:flex items-center px-8 text-white text-xs font-semibold justify-between select-none border-t border-slate-800 shrink-0">
        <div className="flex items-center space-x-4">
          <span className="text-[#FFE100] font-mono tracking-wider text-[10px] font-black">LIVE COMPLETED ORDERS:</span>
          <span className="flex items-center space-x-1"><span className="text-sm">🍕</span><span className="text-slate-300">Margherita Pizza delivered in Banjara Hills</span></span>
          <span className="text-slate-700">|</span>
          <span className="flex items-center space-x-1"><span className="text-sm">💄</span><span className="text-slate-300">M.A.C Liquid Foundation ordered in Jubilee Hills</span></span>
          <span className="text-slate-700">|</span>
          <span className="flex items-center space-x-1"><span className="text-sm">🥦</span><span className="text-slate-300">Organic Avocados delivered in Gachibowli</span></span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="font-mono text-[11px] text-slate-300"><strong className="text-white font-bold">{resistersCount.toLocaleString()}</strong> users currently shopping live</span>
        </div>
      </div>

    </div>
  );
}
