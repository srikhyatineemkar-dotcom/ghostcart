import React, { useEffect, useState } from 'react';
import { ArrowRight, Trophy, ShieldCheck, Share2, Sparkles, RefreshCw, Landmark, Heart, TrendingUp, History } from 'lucide-react';
import { ExperienceType } from '../types';

interface SuccessViewProps {
  grandTotal: number;
  experience: ExperienceType;
  onReset: () => void;
  savedTotalAcrossHistory: number;
  itemsList?: string[];
}

export default function SuccessView({
  grandTotal,
  experience,
  onReset,
  savedTotalAcrossHistory,
  itemsList = []
}: SuccessViewProps) {
  const [copied, setCopied] = useState(false);
  
  // Custom tips dynamically loaded based on experience
  const getTips = () => {
    switch (experience) {
      case 'grocery':
        return [
          'Shop with a concrete shopping list written on paper before opening any app.',
          'Never grocery shop while hungry. Hunger makes snack packaging look 50% more appealing.',
          'Establish a 10-minute cooling off period for any non-essential grocery item additions.'
        ];
      case 'food':
        return [
          'Midnight cravings peak between 10pm and 12am. Prepare a healthy, easy-to-cook snack in advance.',
          'Calculate your monthly restaurant spending. Re-frame food deliveries as special weekend rewards.',
          'Delete saved card credentials from delivery apps to introduce friction during checkout.'
        ];
      case 'beauty':
        return [
          'Differentiate between "routine replacement" products and "dopamine experiment" products.',
          'Consult professional ingredient logs (like Niacinamide or Peptides) rather than relying on packaging slogans.',
          'Unsubscribe from cosmetic store marketing newsletters that push high-pressure flash sales.'
        ];
    }
  };

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate 25 colorful confetti particles
  const confettiColors = ['bg-rose-500', 'bg-emerald-500', 'bg-pink-500', 'bg-amber-400', 'bg-sky-400', 'bg-indigo-500'];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-900 text-white py-12 px-4 relative overflow-hidden" id="success-screen">
      
      {/* Dynamic Confetti Particle Drops */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => {
          const size = Math.floor(Math.random() * 8) + 6;
          const left = Math.floor(Math.random() * 100);
          const duration = Math.random() * 2 + 2;
          const delay = Math.random() * 3;
          const color = confettiColors[i % confettiColors.length];

          return (
            <div
              key={i}
              className={`absolute rounded-xs confetti ${color}`}
              style={{
                width: `${size}px`,
                height: `${size * 2}px`,
                left: `${left}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                top: '-20px'
              }}
            />
          );
        })}
      </div>

      {/* Main Container Card */}
      <div className="max-w-xl mx-auto text-center relative z-10">
        
        {/* Animated Medal Badge */}
        <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-400/30 shadow-lg animate-bounce">
          <Trophy className="w-10 h-10" />
        </div>

        {/* Brand Header */}
        <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-900/50 inline-block mb-4">
          SAVINGS TRIUMPH CONFIRMED
        </span>

        {/* Dynamic Display Typography (The Emotional Climax) */}
        <div className="space-y-4 mb-8">
          <h1 className="font-display font-black text-2xl sm:text-3xl text-emerald-400 leading-tight">
            🎉 Great choice. Instead of spending <span className="text-rose-400 line-through font-mono">₹{grandTotal}</span> You saved <span className="text-emerald-400 font-mono">₹{grandTotal}</span>.
          </h1>
        </div>

        {/* Motivational Quote banner */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 mb-8 text-left backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>FINANCIAL RESISTANCE ANALYSIS</span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            By simulation, you completed the full cycle: browsing, cart additions, payment form friction, and tracking wait-times. You satisfied your brain's evolutionary dopamine gathering loop while keeping <span className="font-semibold text-emerald-400">100% of your real money</span> in your bank account.
          </p>

          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Your Lifetime Saved Index</span>
              <div className="text-xl font-display font-extrabold text-white">
                ₹{savedTotalAcrossHistory.toLocaleString('en-IN')}
              </div>
            </div>
            <TrendingUp className="w-8 h-8 text-emerald-500" />
          </div>
        </div>

        {/* Saved Items Breakdown List */}
        {itemsList && itemsList.length > 0 && (
          <div className="bg-slate-800/60 border border-slate-700/70 rounded-3xl p-6 mb-8 text-left backdrop-blur-md">
            <h3 className="font-display font-black text-xs text-rose-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <History className="w-4 h-4" />
              AVOIDED SPENDINGS BREAKDOWN
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {itemsList.map((itemName, index) => (
                <div key={index} className="flex items-center justify-between text-xs py-2 border-b border-slate-700/40 last:border-0">
                  <span className="text-slate-200 font-medium truncate pr-4">{itemName}</span>
                  <span className="text-emerald-400 font-bold font-mono shrink-0">₹ saved</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience-specific smart defense guide */}
        <div className="bg-slate-800/40 border border-slate-800/80 rounded-3xl p-6 mb-8 text-left">
          <h3 className="font-display font-bold text-slate-300 text-sm uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            GhostCart Guard Advice for {experience} Urges
          </h3>
          <ul className="space-y-3">
            {getTips().map((tip, i) => (
              <li key={i} className="text-xs sm:text-sm text-slate-400 leading-normal flex items-start gap-2">
                <span className="text-emerald-400 font-bold font-mono mt-0.5">{i + 1}.</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Share Savings Certificate & Actions */}
        <div className="space-y-3 mb-12">
          <button
            onClick={handleShare}
            className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700 select-none shadow-xs"
          >
            <Share2 className="w-4 h-4" />
            <span>{copied ? 'Link Copied to Clipboard!' : 'Share Savings Challenge'}</span>
          </button>

          <button
            onClick={onReset}
            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer select-none shadow-md"
            id="success-restart-btn"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Explore other Storefronts</span>
          </button>
        </div>

        {/* Small Disclaimer */}
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
          © GHOSTCART SANCTUARY • ZERO DARK PATTERNS
        </span>

      </div>

    </div>
  );
}
