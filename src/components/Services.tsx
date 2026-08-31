import React, { useState } from 'react';
import { services } from '../data';
import { ServiceItem } from '../types';
import { 
  ArrowUpRight, 
  X, 
  Check, 
  Globe, 
  Bot, 
  Cpu, 
  Sparkles, 
  Smartphone, 
  Search, 
  Share2, 
  Palette, 
  Wrench, 
  Layers 
} from 'lucide-react';

interface ServicesProps {
  onSelectServiceForContact?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForContact }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Capabilities (9)' },
    { id: 'dev', label: 'Engineering & Apps' },
    { id: 'ai', label: 'AI & Intelligence' },
    { id: 'marketing', label: 'Growth & Marketing' },
    { id: 'design', label: 'Design & Support' },
  ];

  const getCategoryFilter = (service: ServiceItem): string => {
    const id = service.id;
    if (['web-development', 'mobile-apps'].includes(id)) return 'dev';
    if (['ai-integration', 'ai-agents', 'automation'].includes(id)) return 'ai';
    if (['digital-marketing', 'seo'].includes(id)) return 'marketing';
    return 'design';
  };

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(s => getCategoryFilter(s) === activeCategory);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      case 'Bot': return <Bot className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Share2': return <Share2 className="w-5 h-5" />;
      case 'Search': return <Search className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-28 relative border-b border-slate-800/80 bg-transparent overflow-hidden">
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
            03 / Capabilities
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold font-poppins">
            9 Core Disciplines
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-16 space-y-4">
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            End-to-end technology and <span className="text-gold-gradient">marketing engineering.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            From bespoke web systems and enterprise mobile applications to autonomous AI agents, SEO, and long-term software governance.
          </p>
        </div>

        {/* Category Filters with Translucency */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-slate-800 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`service-cat-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-[10px] uppercase tracking-[0.2em] font-semibold font-poppins transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#f59e0b] text-[#08080a] shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                  : 'bg-[#0d0d14]/70 backdrop-blur-md text-slate-400 hover:text-white hover:bg-[#141420]/80 border border-[#d4af37]/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid (Translucent Obsidian Glass Matrix) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-xl overflow-hidden border-t border-l border-[#d4af37]/25 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {filteredServices.map((service, idx) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              onClick={() => setSelectedService(service)}
              className="group p-8 sm:p-10 border-r border-b border-[#d4af37]/25 bg-[#0d0d14]/70 backdrop-blur-xl hover:bg-[#141422]/85 hover:border-[#d4af37]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle top-right ambient gold corner glow on hover */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#d4af37]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-mono">
                    0{idx + 1} //
                  </span>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[#d4af37] bg-[#1a1a26]/80 backdrop-blur-sm border border-[#d4af37]/25 group-hover:bg-[#d4af37] group-hover:text-[#08080a] group-hover:shadow-[0_0_12px_#d4af37] transition-all">
                    {getServiceIcon(service.icon)}
                  </div>
                </div>

                <h3 className="font-poppins text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-[#fef08a] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                  {service.tagline}
                </p>
              </div>

              <div>
                <div className="space-y-1.5 mb-6 pt-4 border-t border-slate-800/80">
                  {service.features.slice(0, 3).map((feat, fIdx) => (
                    <div key={fIdx} className="text-[11px] text-slate-300 font-light flex items-center gap-2">
                      <span className="text-[#d4af37] font-mono">—</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-[10px] uppercase tracking-[0.2em] font-bold text-[#fcd34d] font-poppins group-hover:translate-x-1 transition-transform">
                  <span>View Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal with High-Depth Translucent Obsidian Backing */}
      {selectedService && (
        <div 
          id="service-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn"
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="bg-[#0b0b12]/95 border border-[#d4af37]/45 rounded-xl max-w-2xl w-full p-8 sm:p-12 shadow-[0_0_60px_rgba(212,175,55,0.2)] relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner Gold Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#d4af37]/20 to-transparent pointer-events-none" />

            <div className="flex items-start justify-between mb-8 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1a1a28] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.2)]">
                  {getServiceIcon(selectedService.icon)}
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#d4af37] block">
                    Service Specification
                  </span>
                  <h3 className="font-poppins text-2xl font-bold text-white">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              <button
                id="close-service-modal-btn"
                onClick={() => setSelectedService(null)}
                className="w-8 h-8 rounded-lg border border-slate-800 hover:border-[#d4af37] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-light mb-8">
              {selectedService.fullDescription}
            </p>

            <div className="space-y-6 mb-8">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#d4af37] mb-3 font-poppins">
                  Key Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedService.features.map((feat, fIdx) => (
                    <div key={fIdx} className="p-3 rounded-lg bg-[#11111a]/80 border border-slate-800 text-xs text-slate-200 flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedService.deliverable && (
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#d4af37] mb-3 font-poppins">
                    Standard Deliverables
                  </h4>
                  <p className="text-xs bg-[#171724]/90 border border-[#d4af37]/20 text-[#fef08a] px-4 py-3 font-light rounded-md leading-relaxed">
                    {selectedService.deliverable}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <button
                id="modal-inquire-btn"
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  if (onSelectServiceForContact) {
                    onSelectServiceForContact(title);
                  } else {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="gold-btn-primary w-full sm:w-auto text-center"
              >
                Inquire About {selectedService.title}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
