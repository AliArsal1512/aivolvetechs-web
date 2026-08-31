import React from 'react';
import { Layers, Globe2, Bot, Clock } from 'lucide-react';

export const About: React.FC = () => {
  const metrics = [
    {
      num: '01 / Portfolio',
      value: '9+',
      label: 'Core Services',
      description: 'End-to-end capabilities across engineering, AI, design, and growth.',
    },
    {
      num: '02 / Territory',
      value: '3',
      label: 'Target Markets',
      description: 'Gulf Region (UAE/GCC), Canada, and International commercial frontiers.',
    },
    {
      num: '03 / Intelligence',
      value: 'AI',
      label: 'Integrated Delivery',
      description: 'Deep machine intelligence fused into every architectural and marketing layer.',
    },
    {
      num: '04 / Continuity',
      value: '24/7',
      label: 'Long-Term Support',
      description: 'Dedicated post-launch governance, scaling support, and continuous evolution.',
    },
  ];

  return (
    <section id="about" className="py-28 relative border-b border-slate-800/80 bg-transparent overflow-hidden">
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
            01 / Agency Overview
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold font-poppins">
            Monolith Logic
          </span>
        </div>

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              An AI advertisement and software agency built for businesses that <span className="text-gold-gradient">refuse to be ordinary.</span>
            </h2>
            
            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              Aivolve Techs combines artificial intelligence, creative strategy, and cutting-edge technology to help businesses across the Gulf, Canada, and international markets grow faster, smarter, and stronger.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed font-light">
              We bridge the gap between creative marketing agencies and rigorous technical software consultancies. By uniting machine intelligence, conversion-led advertising, bespoke UI/UX, and cloud-native software engineering under one unified roof, we engineer compounding growth for modern brands.
            </p>
          </div>

          <div className="lg:col-span-5 p-8 sm:p-10 rounded-xl bg-[#0d0d14]/75 border border-[#d4af37]/25 backdrop-blur-xl space-y-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-[#d4af37]/45 hover:bg-[#12121e]/80 transition-all">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#d4af37]/15 to-transparent pointer-events-none" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block font-poppins font-semibold">
              Architectural Standard
            </span>
            <h3 className="font-poppins text-lg font-bold text-white">
              The Aivolve Standard
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Headquartered with a primary commercial focus in the <strong className="text-[#fde68a] font-semibold">UAE and GCC region</strong>, we deploy global-grade software and high-impact marketing systems customized for regional cultural resonance and international scale.
            </p>
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-slate-400 font-mono">
              <span className="font-poppins">Tagline</span>
              <span className="font-bold text-[#fcd34d] font-poppins">“Where Brands Aivolve.”</span>
            </div>
          </div>
        </div>

        {/* 4 Metric Badges in Clean Divide Grid with Translucency & Golden Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-xl overflow-hidden border border-[#d4af37]/25 divide-y sm:divide-y-0 sm:divide-x divide-[#d4af37]/20 bg-[#0d0d14]/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          {metrics.map((item, idx) => (
            <div 
              key={idx}
              id={`about-metric-${idx}`}
              className="p-8 sm:p-10 group hover:bg-[#141420]/80 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[#d4af37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="block text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-6 font-poppins">
                {item.num}
              </span>
              <div className="font-poppins text-4xl sm:text-5xl font-extrabold text-gold-gradient mb-2 tracking-tight">
                {item.value}
              </div>
              <h3 className="font-poppins text-sm font-semibold text-white mb-2">
                {item.label}
              </h3>
              <p className="text-xs leading-relaxed text-slate-400 font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
