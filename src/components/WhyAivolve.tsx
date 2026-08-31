import React from 'react';
import { differentiators } from '../data';
import { Layers, Bot, Sparkles, TrendingUp, Zap, Shield } from 'lucide-react';

export const WhyAivolve: React.FC = () => {
  const getIcon = (index: number) => {
    switch (index) {
      case 0: return <Layers className="w-5 h-5" />;
      case 1: return <Bot className="w-5 h-5" />;
      case 2: return <Sparkles className="w-5 h-5" />;
      case 3: return <Shield className="w-5 h-5" />;
      case 4: return <Zap className="w-5 h-5" />;
      default: return <TrendingUp className="w-5 h-5" />;
    }
  };

  return (
    <section id="why-aivolve" className="py-28 relative border-b border-slate-800/80 bg-transparent overflow-hidden">
      {/* Single Gradient Ball from bottom corner of the screen */}
      <div 
        className="absolute -bottom-20 -left-16 sm:-bottom-28 sm:-left-24 w-[480px] sm:w-[640px] lg:w-[760px] h-[480px] sm:h-[640px] lg:h-[760px] pointer-events-none rounded-full blur-2xl sm:blur-3xl"
        style={{
          background: 'radial-gradient(circle at 25% 75%, rgba(254,240,138,0.38) 0%, rgba(234,179,8,0.22) 28%, rgba(212,175,55,0.08) 55%, transparent 75%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Minimalist Section Header */}
        <div className="flex items-center justify-between mb-16 pb-6 border-b border-slate-800">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold font-poppins">
            05 / Competitive Edge
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold font-poppins">
            Key Differentiators
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-16 space-y-4">
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Why visionary brands <span className="text-gold-gradient">choose Aivolve.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            We operate at the convergence of machine intelligence and creative engineering — where technical rigor meets revenue-driven outcomes.
          </p>
        </div>

        {/* 6 Key Differentiators Grid with Translucent Glass Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-xl overflow-hidden border-t border-l border-[#d4af37]/25 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {differentiators.map((diff, idx) => (
            <div
              key={idx}
              id={`diff-card-${idx}`}
              className="p-8 sm:p-10 border-r border-b border-[#d4af37]/25 bg-[#0d0d14]/70 backdrop-blur-xl hover:bg-[#141422]/85 hover:border-[#d4af37]/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#d4af37]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-mono text-[#d4af37]">
                    0{idx + 1} // ADVANTAGE
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#181828]/80 border border-[#d4af37]/25 text-[#fcd34d] flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.15)] group-hover:bg-[#d4af37] group-hover:text-[#08080a] transition-all">
                    {getIcon(idx)}
                  </div>
                </div>

                <h3 className="font-poppins text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-[#fef08a] transition-colors">
                  {diff.title}
                </h3>

                <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                  {diff.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_6px_#d4af37]" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-300 font-poppins">
                  Unfair Advantage
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Banner: UAE/GCC Focus with Translucent Glass */}
        <div className="mt-16 p-8 sm:p-12 rounded-xl bg-[#0d0d14]/75 border border-[#d4af37]/35 backdrop-blur-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-[0_8px_36px_rgba(0,0,0,0.6)] relative overflow-hidden group hover:border-[#d4af37]/55 transition-all">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#d4af37]/15 to-transparent pointer-events-none" />
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold font-poppins">
              Regional Commercial Leadership
            </span>
            <h3 className="font-poppins text-xl sm:text-2xl font-bold text-white">
              Deeply Rooted in the Gulf, Scaled for the World.
            </h3>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              We understand the nuances of GCC business culture, bilingual requirements (Arabic / English), regional compliance, and high consumer expectations in Dubai, Riyadh, Doha, and beyond.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 w-full lg:w-auto">
            <div className="p-4 rounded-lg bg-[#141422]/90 border border-slate-800/90 text-center sm:text-left">
              <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 block font-poppins">Bilingual Delivery</span>
              <span className="text-xs font-bold text-[#fef08a] font-poppins">Arabic &amp; English First</span>
            </div>
            <div className="p-4 rounded-lg bg-[#141422]/90 border border-slate-800/90 text-center sm:text-left">
              <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 block font-poppins">Response Window</span>
              <span className="text-xs font-bold text-[#fef08a] font-poppins">&lt; 2 Hours Priority</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
