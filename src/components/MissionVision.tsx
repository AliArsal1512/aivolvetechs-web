import React from 'react';
import { Target, Compass, Sparkles } from 'lucide-react';

export const MissionVision: React.FC = () => {
  return (
    <section id="mission-vision" className="py-28 relative border-b border-slate-800/80 bg-transparent overflow-hidden">
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
            02 / Purpose &amp; Horizon
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold font-poppins">
            Core Trajectory
          </span>
        </div>

        {/* 2-Column Split: Mission & Vision with Translucency */}
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-xl overflow-hidden border border-[#d4af37]/25 divide-y lg:divide-y-0 lg:divide-x divide-[#d4af37]/20 bg-[#0d0d14]/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {/* Mission */}
          <div className="p-10 sm:p-16 flex flex-col justify-between hover:bg-[#141420]/80 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#d4af37]/15 to-transparent pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500 font-poppins">
                  Section // 01
                </span>
                <div className="w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
              </div>

              <h2 className="font-poppins text-2xl sm:text-3xl font-bold text-white mb-6">
                Our Mission
              </h2>

              <p className="text-base text-slate-300 font-light leading-relaxed mb-8">
                To empower businesses through intelligent technology and creative excellence — delivering bespoke AI solutions, powerful software products, and data-driven marketing that produce tangible, measurable growth.
              </p>
            </div>

            <div className="pt-8 border-t border-slate-800/80 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#d4af37] block font-poppins">
                Pillars of Execution
              </span>
              <ul className="space-y-2 text-xs text-slate-300 font-light font-poppins">
                <li className="flex items-center gap-2">
                  <span className="text-[#d4af37] font-mono">—</span> Precision Artificial Intelligence
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#d4af37] font-mono">—</span> Resilient Software Architecture
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#d4af37] font-mono">—</span> Measurable Growth &amp; ROI
                </li>
              </ul>
            </div>
          </div>

          {/* Vision */}
          <div className="p-10 sm:p-16 flex flex-col justify-between hover:bg-[#141420]/80 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#fcd34d]/15 to-transparent pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500 font-poppins">
                  Section // 02
                </span>
                <div className="w-2 h-2 rounded-full bg-[#fcd34d] shadow-[0_0_8px_#fcd34d]" />
              </div>

              <h2 className="font-poppins text-2xl sm:text-3xl font-bold text-white mb-6">
                Our Vision
              </h2>

              <p className="text-base text-slate-300 font-light leading-relaxed mb-8">
                To be the leading AI advertising and software agency in the UAE, GCC, and globally — known for transforming brands into market leaders through intelligent automation, creative mastery, and architectural reliability.
              </p>
            </div>

            <div className="pt-8 border-t border-slate-800/80 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#d4af37] block font-poppins">
                Targeted Outcomes
              </span>
              <ul className="space-y-2 text-xs text-slate-300 font-light font-poppins">
                <li className="flex items-center gap-2">
                  <span className="text-[#d4af37] font-mono">—</span> Dominant UAE &amp; Gulf presence
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#d4af37] font-mono">—</span> Next-Gen AI autonomous pipelines
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#d4af37] font-mono">—</span> Global enterprise partnership standard
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
