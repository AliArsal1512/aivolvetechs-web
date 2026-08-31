import React, { useState, useCallback, useEffect } from 'react';
import { AmbientBackground } from './components/AmbientBackground';
import { CursorTrail } from './components/CursorTrail';
import { CinematicIntro } from './components/CinematicIntro';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { MissionVision } from './components/MissionVision';
import { Services } from './components/Services';
import { MarketsClients } from './components/MarketsClients';
import { WhyAivolve } from './components/WhyAivolve';
import { TeamStructure } from './components/TeamStructure';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedServicePreset, setSelectedServicePreset] = useState<string | null>(null);

  // Intro plays on desktop only (screen >= 768px) and when motion is enabled.
  // On mobile (<768px), all elements load and appear immediately on frame 0.
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      if (typeof window === 'undefined') return false;
      if (window.innerWidth < 768) return false;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return !prefersReducedMotion;
    } catch {
      return false;
    }
  });

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  const handleReplayIntro = useCallback(() => {
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -70; // offset for fixed navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  const handleSelectServiceFromList = useCallback((serviceName: string) => {
    setSelectedServicePreset(serviceName);
    scrollToSection('contact');
  }, [scrollToSection]);

  return (
    <div className="relative min-h-screen bg-[#08080a] text-slate-100 selection:bg-[#d4af37]/30 selection:text-[#fde68a]">
      {/* Cinematic First-Visit Intro Sequence */}
      {showIntro && (
        <CinematicIntro 
          onComplete={handleIntroComplete} 
        />
      )}

      {/* Ambient Architectural Reactive Background Layer */}
      <AmbientBackground />

      {/* Interactive Golden Stardust Cursor Trail */}
      <CursorTrail />

      {/* Main Foreground Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation - Reveals smoothly once intro completes */}
        <Navbar 
          onNavigate={scrollToSection} 
          visible={!showIntro}
        />

        {/* Main Body */}
        <main className="flex-grow">
          <Hero 
            onNavigate={scrollToSection} 
            onReplayIntro={handleReplayIntro}
            animateRobotO={!showIntro}
            isIntroPlaying={showIntro}
          />
          <div className={`transition-opacity duration-300 ${showIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <About />
            <MissionVision />
            <Services onSelectServiceForContact={handleSelectServiceFromList} />
            <MarketsClients />
            <WhyAivolve />
            <TeamStructure />
            <ContactForm 
              preselectedService={selectedServicePreset} 
              onClearPreselectedService={() => setSelectedServicePreset(null)} 
            />
          </div>
        </main>

        {/* Footer */}
        <div className={`transition-opacity duration-300 ${showIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <Footer onNavigate={scrollToSection} />
        </div>
      </div>
    </div>
  );
}
