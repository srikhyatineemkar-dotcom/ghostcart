import React, { useState, useEffect } from 'react';
import { Search, PackageCheck, Soup, Package, Bike, Sparkles, CheckCircle2, Navigation, Loader2 } from 'lucide-react';
import { TrackingStep } from '../types';

interface OrderTrackingViewProps {
  onComplete: () => void;
  grandTotal: number;
}

export default function OrderTrackingView({ onComplete, grandTotal }: OrderTrackingViewProps) {
  const [currentStepId, setCurrentStepId] = useState(1);
  const [dots, setDots] = useState('');

  const steps: TrackingStep[] = [
    {
      id: 1,
      label: 'Searching Nearby Hub',
      description: 'Pinging closest micro-fulfillment store & delivery couriers...',
      duration: 3500,
      icon: 'search'
    },
    {
      id: 2,
      label: 'Auditing Store Inventory',
      description: 'Verifying stock levels & item freshness specifications...',
      duration: 3000,
      icon: 'inventory'
    },
    {
      id: 3,
      label: 'Preparing Your Order',
      description: 'Picking organic produce / preparing hot kitchen specials...',
      duration: 3500,
      icon: 'prepare'
    },
    {
      id: 4,
      label: 'Packing with Double Care',
      description: 'Sealing packages with security-taped thermal wraps...',
      duration: 3000,
      icon: 'pack'
    },
    {
      id: 5,
      label: 'Assigning Elite Courier',
      description: 'Handing over dispatch box to local delivery partner...',
      duration: 3500,
      icon: 'courier'
    },
    {
      id: 6,
      label: 'Dispatched & Confirmed!',
      description: 'Courier dispatch logged on secure local fulfillment network.',
      duration: 2000,
      icon: 'confirmed'
    }
  ];

  // Cycling animated dots
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(dotInterval);
  }, []);

  // Automated step progression
  useEffect(() => {
    const currentStepObj = steps.find(s => s.id === currentStepId);
    if (!currentStepObj) return;

    const timer = setTimeout(() => {
      if (currentStepId < steps.length) {
        setCurrentStepId(prev => prev + 1);
      } else {
        // Auto-advance to Success screen after a brief delay
        onComplete();
      }
    }, currentStepObj.duration);

    return () => clearTimeout(timer);
  }, [currentStepId]);

  // Render icons dynamically
  const renderStepIcon = (iconName: string, stepId: number) => {
    const isActive = currentStepId === stepId;
    const isCompleted = currentStepId > stepId;
    let baseColor = 'text-slate-400';
    if (isActive) baseColor = 'text-indigo-600 animate-pulse';
    if (isCompleted) baseColor = 'text-emerald-600';

    switch (iconName) {
      case 'search':
        return <Search className={`w-6 h-6 ${baseColor}`} />;
      case 'inventory':
        return <PackageCheck className={`w-6 h-6 ${baseColor}`} />;
      case 'prepare':
        return <Soup className={`w-6 h-6 ${baseColor}`} />;
      case 'pack':
        return <Package className={`w-6 h-6 ${baseColor}`} />;
      case 'courier':
        return <Bike className={`w-6 h-6 ${baseColor}`} />;
      case 'confirmed':
        return <CheckCircle2 className={`w-6 h-6 ${baseColor}`} />;
      default:
        return <Loader2 className={`w-6 h-6 ${baseColor} animate-spin`} />;
    }
  };

  const activeStep = steps.find(s => s.id === currentStepId) || steps[0];

  return (
    <div className="max-w-xl mx-auto px-4 py-12" id="order-tracking-page">
      {/* Simulation Banner */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1 bg-[#FFE100] text-slate-950 text-[10px] font-mono font-black uppercase px-3 py-1 rounded-full mb-3 shadow-xs border border-slate-900/10">
          <Navigation className="w-3.5 h-3.5 animate-bounce" />
          <span>Live GPS Logistics Engine Active</span>
        </span>
        <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
          Tracking Your Order Delivery
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mt-1 font-medium">
          Our automated dispatch hubs are coordinating with local delivery executives. Your parcel is scheduled for immediate release.
        </p>
      </div>

      {/* Main Radar Panel Visualizer */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-xs text-center mb-8 relative overflow-hidden">
        
        {/* Animated Radar Circle */}
        <div className="w-28 h-28 rounded-full border border-indigo-100 bg-indigo-50/30 flex items-center justify-center mx-auto mb-6 relative">
          <div className="absolute inset-0 rounded-full border border-indigo-400/40 radar-ring" />
          <div className="absolute inset-2 rounded-full border border-indigo-400/20 radar-ring" style={{ animationDelay: '0.6s' }} />
          <div className="absolute inset-4 rounded-full border border-indigo-400/10 radar-ring" style={{ animationDelay: '1.2s' }} />
          {renderStepIcon(activeStep.icon, activeStep.id)}
        </div>

        {/* Current status info */}
        <div className="animate-fade-in">
          <h3 className="font-display font-black text-xl text-slate-900 mb-1">
            {activeStep.label}{dots}
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed font-semibold">
            {activeStep.description}
          </p>
        </div>

        {/* Top bar loading percentage tracker */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-6 overflow-hidden">
          <div 
            className="bg-[#FFE100] h-full transition-all duration-500 ease-out rounded-full"
            style={{ width: `${(currentStepId / steps.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mt-2 font-bold">
          <span>LOGISTICS PIPELINE {currentStepId} OF {steps.length}</span>
          <span>{Math.round((currentStepId / steps.length) * 100)}% COMPLETE</span>
        </div>
      </div>

      {/* Visual Checklist Column */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-5 space-y-4 shadow-xs" id="logistics-checklist">
        <h4 className="font-display font-bold text-xs text-slate-400 uppercase tracking-wider mb-2">
          Live Dispatch Log
        </h4>

        {steps.map((step) => {
          const isActive = currentStepId === step.id;
          const isCompleted = currentStepId > step.id;

          return (
            <div 
              key={step.id} 
              className={`flex items-center justify-between p-3 rounded-xl transition-all border ${
                isActive 
                  ? 'bg-amber-50/40 border-amber-200 font-semibold' 
                  : isCompleted 
                  ? 'bg-slate-50/50 border-slate-100 opacity-70' 
                  : 'border-transparent opacity-40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                  {renderStepIcon(step.icon, step.id)}
                </div>
                <div>
                  <div className={`text-xs font-bold ${isActive ? 'text-amber-900' : isCompleted ? 'text-emerald-800' : 'text-slate-600'}`}>
                    {step.label}
                  </div>
                  <div className="text-[9px] text-slate-400 font-bold leading-none mt-0.5">
                    {isActive ? 'Processing dispatch order' : isCompleted ? 'Success' : 'Awaiting trigger'}
                  </div>
                </div>
              </div>

              {isCompleted ? (
                <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase">
                  COMPLETE
                </span>
              ) : isActive ? (
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
              ) : (
                <span className="text-[10px] font-mono text-slate-300 uppercase font-bold">
                  QUEUED
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Bypass / Fast-forward option */}
      <div className="text-center mt-6">
        <button
          onClick={onComplete}
          className="text-[11px] font-extrabold text-slate-400 hover:text-slate-600 underline select-none cursor-pointer uppercase tracking-wider"
        >
          Skip dispatch countdown and verify confirmation
        </button>
      </div>

    </div>
  );
}
