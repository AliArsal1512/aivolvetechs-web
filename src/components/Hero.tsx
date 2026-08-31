import React from 'react';
import { ArrowRight, Globe, Cpu, Sparkles } from 'lucide-react';
import { RobotHeadO } from './RobotHeadO';
import { DeepGraphNetwork } from './DeepGraphNetwork';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onReplayIntro?: () => void;
  animateRobotO?: boolean;
  isIntroPlaying?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ 
  onNavigate, 
  onReplayIntro, 
  animateRobotO = true,
  isIntroPlaying = false 
}) => {
  return (
    <section 
      id="hero" 
      className="relative min-h-[88vh] lg:min-h-[92vh] pt-24 sm:pt-32 lg:pt-36 pb-12 sm:pb-20 flex flex-col justify-between overflow-hidden"
    >
      {/* Deep Graph Network Neural Evolution Flowing Background */}
      <DeepGraphNetwork isIntroPlaying={isIntroPlaying} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full my-auto">
        {/* Top Editorial Eyebrow & Coordinates Bar */}
        <div 
          className={`flex flex-wrap items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-10 lg:mb-12 transition-all duration-300 ${
            isIntroPlaying ? 'opacity-0 translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#fcd34d] font-poppins">
              AI ADVERTISEMENT &amp; SOFTWARE AGENCY
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-8 text-[10px] uppercase tracking-[0.3em] text-slate-400 font-poppins">
            <div className="flex flex-col text-right">
              <span className="text-slate-500">Primary Hub</span>
              <span className="text-[#fef08a] font-semibold">UAE / GCC</span>
            </div>
            <div className="w-px h-6 bg-[#d4af37]/20" />
            <div className="flex flex-col text-right">
              <span className="text-slate-500">Global Reach</span>
              <span className="text-[#fef08a] font-semibold">Canada · International</span>
            </div>
          </div>
        </div>

        {/* Minimalist Structural Gold Rule */}
        <div 
          className={`w-12 h-px bg-gradient-to-r from-[#d4af37] to-transparent mb-6 sm:mb-10 transition-all duration-300 ${
            isIntroPlaying ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
          }`} 
        />

        {/* Main Editorial Statement & Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          {/* Left Column: Bold Headline with Rotating Robot Head 'O' in Aivolve & Narrative */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            <h1 
              className={`font-poppins text-4xl sm:text-7xl lg:text-[90px] font-extrabold tracking-tight text-white leading-[0.96] sm:leading-[0.94] transition-all duration-300 ${
                isIntroPlaying ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}
            >
              Where Brands <br />
              <span className="text-gold-gradient inline-flex items-center flex-wrap">
                <span>Aiv</span>
                {/* Robot Head representing the letter 'o' rotating with precision target ID for cinematic intro */}
                <span 
                  id="hero-robot-o-target" 
                  className="inline-flex mx-0.5 translate-y-[0.06em]"
                >
                  <RobotHeadO 
                    className="inline-flex" 
                    sizeClassName="w-[0.76em] h-[0.76em]" 
                    animate={animateRobotO}
                  />
                </span>
                <span>lve.</span>
              </span>
            </h1>

            <p 
              className={`text-base sm:text-xl text-slate-300 max-w-xl font-light leading-relaxed transition-all duration-300 ${
                isIntroPlaying ? 'opacity-0 translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'
              }`}
            >
              We build technology and creative systems that help businesses evolve. Fusing artificial intelligence, software engineering, performance marketing, and bespoke design into unfair market advantages across the Gulf, Canada, and global frontiers.
            </p>

            {/* Action Buttons */}
            <div 
              className={`flex flex-wrap items-center gap-4 pt-2 sm:pt-4 transition-all duration-300 ${
                isIntroPlaying ? 'opacity-0 translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'
              }`}
            >
              <button
                id="hero-start-project-btn"
                onClick={() => onNavigate('contact')}
                className="gold-btn-primary group cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                id="hero-explore-btn"
                onClick={() => onNavigate('services')}
                className="gold-btn-secondary cursor-pointer"
              >
                <span>Explore Capabilities</span>
                <span className="text-[#d4af37] ml-2">→</span>
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Metadata Card with Translucent Glass Effect */}
          <div 
            className={`lg:col-span-4 transition-all duration-300 ${
              isIntroPlaying ? 'opacity-0 translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'
            }`}
          >
            <div className="p-6 sm:p-8 rounded-xl bg-[#0d0d14]/75 border border-[#d4af37]/30 backdrop-blur-xl relative overflow-hidden group hover:border-[#d4af37]/50 hover:bg-[#12121e]/80 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
              {/* Corner Gold Ambient Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#d4af37]/20 to-transparent pointer-events-none" />

              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#fcd34d] font-poppins">
                      System Logic
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37]">
                    MMXXVI
                  </span>
                </div>

                <div className="space-y-3.5 sm:space-y-4 text-xs">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-1 font-poppins">Architecture</span>
                    <span className="font-semibold text-slate-200">AI-First Full-Stack Systems</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-1 font-poppins">Primary Market</span>
                    <span className="font-semibold text-slate-200">UAE · GCC · Canada</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-1 font-poppins">Service SLA</span>
                    <span className="font-semibold text-[#fde68a]">24/7 Long-Term Support</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 font-poppins">
                  <span>Standard 4.0.1</span>
                  {onReplayIntro ? (
                    <button
                      onClick={onReplayIntro}
                      className="text-[#d4af37] hover:text-[#fef08a] transition-colors cursor-pointer flex items-center gap-1.5"
                      title="Replay cinematic brand sequence"
                    >
                      <Sparkles className="w-3 h-3 text-[#fcd34d]" />
                      <span>Replay Intro</span>
                    </button>
                  ) : (
                    <span className="text-[#d4af37]">Verified</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Minimalist Ticker Bar with Translucency */}
      <div 
        className={`mt-10 sm:mt-16 border-y border-[#d4af37]/20 bg-[#0b0b12]/75 py-3.5 sm:py-4 backdrop-blur-md transition-all duration-700 delay-350 ${
          isIntroPlaying ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-slate-400">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#fcd34d] font-poppins">
            Target Markets:
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-wider text-slate-300 font-poppins">
            <span className="text-[#fef08a] font-bold">UAE (Primary)</span>
            <span className="text-slate-700">/</span>
            <span>Saudi Arabia</span>
            <span className="text-slate-700">/</span>
            <span>Qatar</span>
            <span className="text-slate-700">/</span>
            <span>Kuwait</span>
            <span className="text-slate-700">/</span>
            <span>Canada (Global North)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
