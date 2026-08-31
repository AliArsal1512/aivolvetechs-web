import React from 'react';
import { teamDepartments } from '../data';

export const TeamStructure: React.FC = () => {
  return (
    <section id="team" className="py-28 relative border-b border-slate-800/80 bg-transparent overflow-hidden">
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
            06 / Organization
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold font-poppins">
            Operational Squads
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-16 space-y-4">
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Specialized squads built for <span className="text-gold-gradient">flawless execution.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            Our interdisciplinary squad structure pairs senior architects and engineers directly with your core product roadmap and marketing targets.
          </p>
        </div>

        {/* Team Departments Grid with Translucent Glass Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 rounded-xl overflow-hidden border border-[#d4af37]/25 divide-y md:divide-y-0 md:divide-x divide-[#d4af37]/20 bg-[#0d0d14]/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {teamDepartments.map((dept, idx) => (
            <div
              key={idx}
              id={`team-squad-${idx}`}
              className="p-8 flex flex-col justify-between hover:bg-[#141422]/85 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#d4af37]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#d4af37] font-mono">
                    Squad 0{idx + 1}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#fcd34d]" />
                </div>

                <h3 className="font-poppins text-base font-bold text-white mb-2 leading-snug group-hover:text-[#fef08a] transition-colors">
                  {dept.name}
                </h3>

                <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                  {dept.description}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800/80 space-y-2">
                <span className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-semibold block font-poppins">
                  Key Disciplines
                </span>
                <div className="space-y-1">
                  {dept.roles.map((role, rIdx) => (
                    <div key={rIdx} className="text-xs text-slate-200 font-light flex items-center gap-1.5">
                      <span className="text-[#d4af37] font-mono text-[10px]">›</span>
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Culture Statement */}
        <div className="mt-16 text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold font-poppins">
            Delivery Protocol
          </span>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            No bloated account management layers. Clients work directly with lead engineers, AI researchers, and senior creative directors.
          </p>
        </div>
      </div>
    </section>
  );
};
