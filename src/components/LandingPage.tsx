import React from 'react';
import { ShoppingBag, ArrowRight, ShieldCheck, HeartCrack, Award, Clock, Sparkles, TrendingUp, History, RefreshCw } from 'lucide-react';
import { ExperienceType, SavingsRecord } from '../types';

interface LandingPageProps {
  onSelectExperience: (experience: ExperienceType) => void;
  savingsRecords: SavingsRecord[];
  onClearHistory?: () => void;
}

export default function LandingPage({
  onSelectExperience,
  savingsRecords,
  onClearHistory
}: LandingPageProps) {
  
  // Calculate total saved so far across all attempts
  const totalSaved = savingsRecords.reduce((acc, rec) => acc + rec.amountSaved, 0);
  const totalItemsAvoided = savingsRecords.reduce((acc, rec) => acc + rec.itemsCount, 0);
  const totalAttempts = savingsRecords.length;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between" id="landing-page" style={{ backgroundColor: '#f5ec39' }}>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-center flex-1 flex flex-col justify-center">
        
        {/* Brand/Slogan Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold tracking-wide uppercase mb-6 mx-auto shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>The Premium Impulse Resistance Tool</span>
        </div>

        {/* Display Typography Header */}
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight mb-6">
          Satisfy the urge to shop.<br />
          <span className="bg-linear-to-r from-emerald-600 via-rose-500 to-pink-500 bg-clip-text text-transparent">
            Keep 100% of your money.
          </span>
        </h1>

        <p className="text-slate-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-10">
          GhostCart is a high-fidelity shopping simulator modeled after India's favorite commerce apps. Add premium organic foods, gourmet meals, and skincare products to your cart. Complete checkout, track delivery, and feel the emotional triumph of saving instead of spending.
        </p>

        {/* Live Savings Counter Widget */}
        {totalSaved > 0 && (
          <div className="mb-12 max-w-xl mx-auto bg-white border border-emerald-100 rounded-2xl p-6 shadow-xs flex items-center justify-between gap-4 animate-fade-in">
            <div className="text-left">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-mono font-bold block mb-1">
                Your Financial Shield Active
              </span>
              <div className="text-3xl font-display font-extrabold text-emerald-600">
                ₹{totalSaved.toLocaleString('en-IN')}
              </div>
              <span className="text-xs text-slate-500">
                Saved across {totalAttempts} simulated impulse buys
              </span>
            </div>
            <div className="h-12 w-px bg-slate-100" />
            <div className="text-right">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-mono font-bold block mb-1">
                Avoided Items
              </span>
              <div className="text-3xl font-display font-extrabold text-slate-800">
                {totalItemsAvoided}
              </div>
              <span className="text-xs text-slate-500">
                Unnecessary products averted
              </span>
            </div>
          </div>
        )}

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16" id="landing-experience-grid">
          
          {/* Experience 1: Grocery (Emerald Theme) */}
          <div 
            onClick={() => onSelectExperience('grocery')}
            className="group relative border border-slate-200/60 rounded-3xl p-6 text-left cursor-pointer transition-all hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1"
            style={{ backgroundColor: '#fbfff4' }}
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-xs">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-2 flex items-center gap-2" style={{ fontFamily: 'system-ui' }}>
              Grocery Hub
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full font-mono">
                10 MINS
              </span>
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Simulate high-density quick commerce order. Buy organic Devgad mangoes, premium sourdough bread, and gourmet truffle snacks.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <span>Start Shopping</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Experience 2: Food (Rose Theme) */}
          <div 
            onClick={() => onSelectExperience('food')}
            className="group relative bg-white border border-slate-200/60 rounded-3xl p-6 text-left cursor-pointer transition-all hover:shadow-xl hover:border-rose-300 hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-5 group-hover:bg-rose-600 group-hover:text-white transition-colors shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2 flex items-center gap-2">
              Gourmet Food
              <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full font-mono">
                RESTAURANTS
              </span>
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Craving fancy midnight eats? Browse gourmet restaurants, select garlic naan, butter chicken, woodfired pizzas, and rich waffles.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600">
              <span>Browse Diners</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Experience 3: Beauty (Pink Theme) */}
          <div 
            onClick={() => onSelectExperience('beauty')}
            className="group relative border border-slate-200/60 rounded-3xl p-6 text-left cursor-pointer transition-all hover:shadow-xl hover:border-pink-300 hover:-translate-y-1"
            style={{ backgroundColor: '#ffffff' }}
          >
            <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mb-5 group-hover:bg-pink-600 group-hover:text-white transition-colors shadow-xs">
              <Award className="w-6 h-6" style={{ color: '#0066e6' }} />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2 flex items-center gap-2">
              Luxury Beauty
              <span className="text-[10px] bg-pink-100 font-bold px-2 py-0.5 rounded-full font-mono" style={{ color: '#0026a3' }}>
                PREMIUM
              </span>
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Indulge in cosmetic dopamine. Try active peptide facial serums, French lavender perfumes, matte lipsticks, and hydration masks.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-pink-600">
              <span style={{ color: '#0036e6' }}>Explore Beauty</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" style={{ color: '#0005e6' }} />
            </div>
          </div>

        </div>

        {/* Educational Psychology Info Section */}
        <div className="border-t border-slate-200/80 pt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-16">
          <div className="flex gap-4">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 h-fit">
              <HeartCrack className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">Dopamine Mocking</h4>
              <p className="text-slate-500 text-xs leading-normal">
                Adding items to a cart stimulates the exact same brain center as real shopping. GhostCart satisfies the trigger without the debt.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 h-fit">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">The 10-Minute Rule</h4>
              <p className="text-slate-500 text-xs leading-normal">
                Putting a delay between desire and purchase reduces impulse buys by 85%. Our delivery simulation fulfills that critical cooling-off block.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="p-2 rounded-lg bg-pink-50 text-pink-600 h-fit">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">Emotional Accounting</h4>
              <p className="text-slate-500 text-xs leading-normal">
                By presenting savings as a giant physical milestone victory, we reward your self-control and build a permanent defense ledger.
              </p>
            </div>
          </div>
        </div>

        {/* History / Recent Savings Ledger */}
        {savingsRecords.length > 0 && (
          <div className="max-w-4xl mx-auto text-left border border-slate-200/60 bg-white rounded-3xl p-6 shadow-xs mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg text-slate-800 flex items-center gap-2">
                <History className="w-5 h-5 text-slate-400" />
                Your Savings Journey Ledger
              </h3>
              {onClearHistory && (
                <button
                  onClick={onClearHistory}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  Clear History
                </button>
              )}
            </div>
            <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
              {savingsRecords.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl hover:bg-slate-100/60 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-md ${
                      record.experience === 'grocery' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : record.experience === 'food' 
                        ? 'bg-rose-100 text-rose-800' 
                        : 'bg-pink-100 text-pink-800'
                    }`}>
                      {record.experience}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-slate-800 truncate max-w-[280px] sm:max-w-[450px]">
                        Saved {record.itemsCount} items ({record.itemsList.join(', ')})
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {new Date(record.timestamp).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-mono font-bold text-emerald-600 block">
                      +₹{record.amountSaved}
                    </span>
                    <span className="text-[9px] text-slate-400">
                      Successfully Saved
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Trust Footer */}
      <footer className="bg-white border-t border-slate-100 py-6 text-center text-xs text-slate-400">
        <p>© 2026 GhostCart Simulator. Designed with zero dark-patterns to protect your bank account. No real purchases made.</p>
      </footer>
    </div>
  );
}
