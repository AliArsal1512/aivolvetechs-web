import React from 'react';
import { targetMarkets, targetClients } from '../data';
import { Globe, Building2, Laptop, Store, ShoppingBag, RefreshCw } from 'lucide-react';

export const MarketsClients: React.FC = () => {
  const getClientIcon = (index: number) => {
    switch (index) {
      case 0: return <Laptop className="w-5 h-5" />;
      case 1: return <Store className="w-5 h-5" />;
      case 2: return <Building2 className="w-5 h-5" />;
      case 3: return <ShoppingBag className="w-5 h-5" />;
      default: return <RefreshCw className="w-5 h-5" />;
    }
  };

  return (
    <section id="markets" className="py-28 relative border-b border-slate-800/80 bg-transparent overflow-hidden">
      {/* Single Gradient Ball from bottom corner of the screen */}
      <div 
        className="absolute -bottom-20 -right-16 sm:-bottom-28 sm:-right-24 w-[480px] sm:w-[640px] lg:w-[760px] h-[480px] sm:h-[640px] lg:h-[760px] pointer-events-none rounded-full blur-2xl sm:blur-3xl"
        style={{
          background: 'radial-gradient(circle at 75% 75%, rgba(254,240,138,0.36) 0%, rgba(234,179,8,0.20) 28%, rgba(212,175,55,0.07) 55%, transparent 75%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Minimalist Section Header */}
        <div className="flex items-center justify-between mb-16 pb-6 border-b border-slate-800">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold font-poppins">
            04 / Territory &amp; Clientele
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold font-poppins">
            Global Footprint
          </span>
        </div>

        {/* Part 1: Target Markets with Translucency */}
        <div className="mb-24">
          <div className="max-w-3xl mb-12 space-y-4">
            <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Commercial territories with <span className="text-gold-gradient">deep regional alignment.</span>
            </h2>
            <p className="text-slate-400 text-base font-light leading-relaxed">
              We specialize in high-growth commercial hubs across the Gulf, North America, and international markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 rounded-xl overflow-hidden border border-[#d4af37]/25 divide-y md:divide-y-0 md:divide-x divide-[#d4af37]/20 bg-[#0d0d14]/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            {targetMarkets.map((market, idx) => (
              <div 
                key={idx}
                id={`market-card-${idx}`}
                className="p-8 sm:p-10 flex flex-col justify-between hover:bg-[#141422]/85 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#d4af37]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#fcd34d] bg-[#1a1a28]/80 border border-[#d4af37]/30 px-2.5 py-1 font-poppins rounded-md">
                      {market.isPrimary ? 'Primary Focus' : 'Expansion Hub'}
                    </span>
                    <Globe className="w-4 h-4 text-[#d4af37]" />
                  </div>

                  <h3 className="font-poppins text-xl font-bold text-white mb-2">
                    {market.region}
                  </h3>

                  <p className="text-xs font-mono text-[#d4af37] mb-6">
                    {market.countries.join(' · ')}
                  </p>

                  <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                    {market.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-800/80 space-y-2">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-semibold block font-poppins">
                    Regional Footprint
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {market.countries.map((c, i) => (
                      <span key={i} className="text-[10px] text-slate-300 bg-[#161624]/80 border border-slate-800/80 px-2 py-0.5 font-light rounded-md">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: Target Clients with Translucency */}
        <div>
          <div className="max-w-3xl mb-12 space-y-4">
            <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Engineered for ambitious businesses <span className="text-gold-gradient">at every lifecycle stage.</span>
            </h2>
            <p className="text-slate-400 text-base font-light leading-relaxed">
              From early-stage high-growth scaleups to established enterprise groups seeking aggressive digital and AI evolution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-xl overflow-hidden border border-[#d4af37]/25 divide-y sm:divide-y-0 sm:divide-x divide-[#d4af37]/20 bg-[#0d0d14]/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            {targetClients.map((client, idx) => (
              <div 
                key={idx}
                id={`client-card-${idx}`}
                className="p-8 flex flex-col justify-between hover:bg-[#141422]/85 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#d4af37]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#181828]/80 border border-[#d4af37]/25 flex items-center justify-center text-[#d4af37] mb-6 shadow-[0_0_10px_rgba(212,175,55,0.15)] group-hover:bg-[#d4af37] group-hover:text-[#08080a] transition-all">
                    {getClientIcon(idx)}
                  </div>

                  <h3 className="font-poppins text-base font-bold text-white mb-2">
                    {client.title}
                  </h3>

                  <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                    {client.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#d4af37] block font-mono mb-1">
                    Value Proposition
                  </span>
                  <span className="text-xs font-semibold text-slate-200">
                    {client.solution}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
