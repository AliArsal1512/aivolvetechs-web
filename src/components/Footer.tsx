import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (id: string) => {
    onNavigate(id);
  };

  return (
    <footer 
      id="main-footer" 
      className="relative z-10 bg-[#040407]/90 backdrop-blur-xl text-white border-t border-[#d4af37]/25 pt-20 pb-12 shadow-[0_-20px_50px_rgba(0,0,0,0.85)]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Top Footer Monolith Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800/80 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="/av_logo.png" 
                alt="Aivolve Techs" 
                className="w-12 h-auto object-fill rounded-lg transition-all duration-300" 
              />
              <span className="font-poppins text-xl tracking-tight font-extrabold uppercase text-white">
                AIVOLVE <span className="font-light text-[#d4af37]">TECHS</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm font-light leading-relaxed">
              AI Advertisement &amp; Software Agency. Developing artificial intelligence architectures, bespoke software systems, and data-driven marketing for brands worldwide.
            </p>

            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold font-poppins block mb-1">
                Official Tagline
              </span>
              <p className="font-poppins text-lg font-bold text-[#fef08a]">
                “Where Brands Aivolve.”
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Quick Navigation */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-semibold font-poppins block">
                Index
              </span>
              <ul className="space-y-2.5 text-xs text-slate-400 font-light font-poppins">
                <li>
                  <button onClick={() => handleNav('about')} className="hover:text-[#fef08a] transition-colors cursor-pointer">
                    About Agency
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('mission-vision')} className="hover:text-[#fef08a] transition-colors cursor-pointer">
                    Mission &amp; Vision
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('services')} className="hover:text-[#fef08a] transition-colors cursor-pointer">
                    Capabilities (9)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('markets')} className="hover:text-[#fef08a] transition-colors cursor-pointer">
                    Markets &amp; Clients
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('why-aivolve')} className="hover:text-[#fef08a] transition-colors cursor-pointer">
                    Why Aivolve
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('team')} className="hover:text-[#fef08a] transition-colors cursor-pointer">
                    Team Squads
                  </button>
                </li>
              </ul>
            </div>

            {/* Core Capabilities */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-semibold font-poppins block">
                Disciplines
              </span>
              <ul className="space-y-2.5 text-xs text-slate-400 font-light font-poppins">
                <li>
                  <button onClick={() => handleNav('services')} className="hover:text-white transition-colors cursor-pointer">
                    Web Development
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('services')} className="hover:text-white transition-colors cursor-pointer">
                    Mobile App Dev
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('services')} className="hover:text-white transition-colors cursor-pointer">
                    AI Integration &amp; Agents
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('services')} className="hover:text-white transition-colors cursor-pointer">
                    AI Ads &amp; Marketing
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('services')} className="hover:text-white transition-colors cursor-pointer">
                    SEO &amp; Growth
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('services')} className="hover:text-white transition-colors cursor-pointer">
                    24/7 Governance
                  </button>
                </li>
              </ul>
            </div>

            {/* Key Hubs */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-semibold font-poppins block">
                Hubs &amp; Territory
              </span>
              <ul className="space-y-2 text-xs text-slate-400 font-light font-poppins">
                <li className="text-white font-medium">UAE (Primary Hub)</li>
                <li>Dubai / Abu Dhabi</li>
                <li>Saudi Arabia (Riyadh)</li>
                <li>GCC Region</li>
                <li>Canada &amp; Global</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Baseline Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 font-light">
          <div className="flex items-center gap-4">
            <span className="font-poppins">© {currentYear} Aivolve Techs. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="text-[#fcd34d] font-poppins font-semibold">Where Brands Aivolve.</span>
          </div>

          <div className="flex items-center gap-6 font-poppins">
            <span className="text-slate-400">Enterprise AI Grade</span>
            <span className="text-slate-400">24/7 SLA Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
