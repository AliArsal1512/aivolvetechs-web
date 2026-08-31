import React, { useEffect, useState, useRef } from 'react';

// Section identifiers matching page layout
const SECTIONS = [
  'hero',
  'about',
  'mission-vision',
  'services',
  'markets',
  'why-aivolve',
  'team',
  'contact',
];

interface FigureState {
  top: string;
  left?: string;
  right?: string;
  scale: number;
  rotate: number;
  opacity: number;
  width: string;
  height: string;
  isPrimary: boolean;
}

// 6 Distinct Geometric Figures Configuration per Section
// Exactly 2 active per section on Desktop (1 Large Primary, 1 Small Secondary)
const DESKTOP_FIGURE_STATES: Record<string, Record<number, FigureState>> = {
  hero: {
    0: { top: '10%', right: '-20%', scale: 0.6, rotate: 0, opacity: 0, width: '310px', height: '310px', isPrimary: false },
    1: { top: '65%', left: '-20%', scale: 0.6, rotate: 20, opacity: 0, width: '170px', height: '170px', isPrimary: false },
    2: { top: '30%', left: '-20%', scale: 0.6, rotate: 45, opacity: 0, width: '160px', height: '160px', isPrimary: false },
    3: { top: '80%', right: '-20%', scale: 0.6, rotate: 60, opacity: 0, width: '290px', height: '290px', isPrimary: false },
    4: { top: '5%', left: '-20%', scale: 0.6, rotate: 90, opacity: 0, width: '280px', height: '280px', isPrimary: false },
    5: { top: '90%', left: '-20%', scale: 0.6, rotate: 120, opacity: 0, width: '160px', height: '160px', isPrimary: false },
  },
  about: {
    3: { top: '46%', left: '3%', scale: 1.0, rotate: 60, opacity: 0.80, width: '290px', height: '290px', isPrimary: true },
    2: { top: '12%', right: '5%', scale: 0.9, rotate: 45, opacity: 0.65, width: '160px', height: '160px', isPrimary: false },
    0: { top: '5%', right: '-15%', scale: 0.6, rotate: 30, opacity: 0, width: '310px', height: '310px', isPrimary: false },
    1: { top: '85%', left: '-15%', scale: 0.6, rotate: 75, opacity: 0, width: '170px', height: '170px', isPrimary: false },
    4: { top: '20%', left: '-15%', scale: 0.6, rotate: 110, opacity: 0, width: '280px', height: '280px', isPrimary: false },
    5: { top: '75%', right: '-15%', scale: 0.6, rotate: 140, opacity: 0, width: '160px', height: '160px', isPrimary: false },
  },
  'mission-vision': {
    4: { top: '12%', right: '5%', scale: 1.0, rotate: 120, opacity: 0.80, width: '280px', height: '280px', isPrimary: true },
    5: { top: '66%', left: '4%', scale: 0.9, rotate: 100, opacity: 0.65, width: '160px', height: '160px', isPrimary: false },
    0: { top: '40%', right: '-15%', scale: 0.6, rotate: 90, opacity: 0, width: '310px', height: '310px', isPrimary: false },
    1: { top: '15%', left: '-15%', scale: 0.6, rotate: 135, opacity: 0, width: '170px', height: '170px', isPrimary: false },
    2: { top: '80%', right: '-15%', scale: 0.6, rotate: 100, opacity: 0, width: '160px', height: '160px', isPrimary: false },
    3: { top: '60%', left: '-15%', scale: 0.6, rotate: 120, opacity: 0, width: '290px', height: '290px', isPrimary: false },
  },
  services: {
    1: { top: '60%', left: '3%', scale: 1.0, rotate: 180, opacity: 0.80, width: '290px', height: '290px', isPrimary: true },
    0: { top: '14%', right: '4%', scale: 0.9, rotate: 160, opacity: 0.65, width: '170px', height: '170px', isPrimary: false },
    2: { top: '50%', left: '-15%', scale: 0.6, rotate: 190, opacity: 0, width: '160px', height: '160px', isPrimary: false },
    3: { top: '85%', right: '-15%', scale: 0.6, rotate: 210, opacity: 0, width: '290px', height: '290px', isPrimary: false },
    4: { top: '10%', right: '-15%', scale: 0.6, rotate: 180, opacity: 0, width: '280px', height: '280px', isPrimary: false },
    5: { top: '75%', left: '-15%', scale: 0.6, rotate: 160, opacity: 0, width: '160px', height: '160px', isPrimary: false },
  },
  markets: {
    5: { top: '12%', left: '4%', scale: 1.0, rotate: 240, opacity: 0.80, width: '290px', height: '290px', isPrimary: true },
    3: { top: '64%', right: '5%', scale: 0.9, rotate: 210, opacity: 0.65, width: '170px', height: '170px', isPrimary: false },
    0: { top: '70%', left: '-15%', scale: 0.6, rotate: 230, opacity: 0, width: '170px', height: '170px', isPrimary: false },
    1: { top: '80%', left: '-15%', scale: 0.6, rotate: 240, opacity: 0, width: '290px', height: '290px', isPrimary: false },
    2: { top: '20%', right: '-15%', scale: 0.6, rotate: 260, opacity: 0, width: '160px', height: '160px', isPrimary: false },
    4: { top: '85%', right: '-15%', scale: 0.6, rotate: 240, opacity: 0, width: '280px', height: '280px', isPrimary: false },
  },
  'why-aivolve': {
    2: { top: '50%', right: '4%', scale: 1.0, rotate: 300, opacity: 0.80, width: '280px', height: '280px', isPrimary: true },
    4: { top: '14%', left: '4%', scale: 0.9, rotate: 270, opacity: 0.65, width: '160px', height: '160px', isPrimary: false },
    0: { top: '15%', right: '-15%', scale: 0.6, rotate: 300, opacity: 0, width: '170px', height: '170px', isPrimary: false },
    1: { top: '75%', right: '-15%', scale: 0.6, rotate: 310, opacity: 0, width: '290px', height: '290px', isPrimary: false },
    3: { top: '85%', left: '-15%', scale: 0.6, rotate: 290, opacity: 0, width: '170px', height: '170px', isPrimary: false },
    5: { top: '25%', left: '-15%', scale: 0.6, rotate: 320, opacity: 0, width: '290px', height: '290px', isPrimary: false },
  },
  team: {
    0: { top: '16%', left: '3%', scale: 1.0, rotate: 360, opacity: 0.80, width: '310px', height: '310px', isPrimary: true },
    5: { top: '64%', right: '5%', scale: 0.9, rotate: 330, opacity: 0.65, width: '160px', height: '160px', isPrimary: false },
    1: { top: '20%', right: '-15%', scale: 0.6, rotate: 370, opacity: 0, width: '170px', height: '170px', isPrimary: false },
    2: { top: '75%', right: '-15%', scale: 0.6, rotate: 360, opacity: 0, width: '280px', height: '280px', isPrimary: false },
    3: { top: '35%', left: '-15%', scale: 0.6, rotate: 350, opacity: 0, width: '170px', height: '170px', isPrimary: false },
    4: { top: '80%', left: '-15%', scale: 0.6, rotate: 340, opacity: 0, width: '160px', height: '160px', isPrimary: false },
  },
  contact: {
    3: { top: '28%', right: '4%', scale: 1.0, rotate: 420, opacity: 0.80, width: '300px', height: '300px', isPrimary: true },
    1: { top: '66%', left: '4%', scale: 0.9, rotate: 400, opacity: 0.65, width: '170px', height: '170px', isPrimary: false },
    0: { top: '15%', left: '-15%', scale: 0.6, rotate: 410, opacity: 0, width: '310px', height: '310px', isPrimary: false },
    2: { top: '80%', left: '-15%', scale: 0.6, rotate: 430, opacity: 0, width: '160px', height: '160px', isPrimary: false },
    4: { top: '20%', right: '-15%', scale: 0.6, rotate: 400, opacity: 0, width: '160px', height: '160px', isPrimary: false },
    5: { top: '85%', right: '-15%', scale: 0.6, rotate: 390, opacity: 0, width: '160px', height: '160px', isPrimary: false },
  },
};

// Section Gradient Color & Position Presets for dynamic atmospheric transitions
interface SectionGradientTheme {
  primaryBg: string;
  primaryTop: string;
  primaryRight: string;
  primaryScale: string;
  secondaryBg: string;
  secondaryBottom: string;
  secondaryLeft: string;
  secondaryScale: string;
}

const SECTION_GRADIENT_THEMES: Record<string, SectionGradientTheme> = {
  hero: {
    primaryBg: 'radial-gradient(ellipse at center, rgba(254,240,138,0.22) 0%, rgba(212,175,55,0.08) 45%, transparent 70%)',
    primaryTop: '0%',
    primaryRight: '-5%',
    primaryScale: 'scale-95',
    secondaryBg: 'radial-gradient(ellipse at center, rgba(245,158,11,0.18) 0%, rgba(180,83,9,0.06) 45%, transparent 70%)',
    secondaryBottom: '0%',
    secondaryLeft: '-8%',
    secondaryScale: 'scale-95',
  },
  about: {
    primaryBg: 'radial-gradient(ellipse at center, rgba(254,240,138,0.60) 0%, rgba(217,119,6,0.32) 35%, rgba(217,119,6,0.08) 60%, transparent 75%)',
    primaryTop: '6%',
    primaryRight: '15%',
    primaryScale: 'scale-110',
    secondaryBg: 'radial-gradient(ellipse at center, rgba(212,175,55,0.50) 0%, rgba(146,64,14,0.26) 35%, rgba(146,64,14,0.06) 60%, transparent 75%)',
    secondaryBottom: '12%',
    secondaryLeft: '8%',
    secondaryScale: 'scale-105',
  },
  'mission-vision': {
    primaryBg: 'radial-gradient(ellipse at center, rgba(251,191,36,0.55) 0%, rgba(212,175,55,0.28) 35%, rgba(212,175,55,0.08) 60%, transparent 75%)',
    primaryTop: '8%',
    primaryRight: '-2%',
    primaryScale: 'scale-105',
    secondaryBg: 'radial-gradient(ellipse at center, rgba(180,83,9,0.50) 0%, rgba(245,158,11,0.26) 35%, rgba(245,158,11,0.06) 60%, transparent 75%)',
    secondaryBottom: '8%',
    secondaryLeft: '-4%',
    secondaryScale: 'scale-110',
  },
  services: {
    primaryBg: 'radial-gradient(ellipse at center, rgba(254,240,138,0.62) 0%, rgba(234,179,8,0.35) 35%, rgba(234,179,8,0.09) 60%, transparent 75%)',
    primaryTop: '30%',
    primaryRight: '25%',
    primaryScale: 'scale-115',
    secondaryBg: 'radial-gradient(ellipse at center, rgba(245,158,11,0.54) 0%, rgba(217,119,6,0.28) 35%, rgba(217,119,6,0.07) 60%, transparent 75%)',
    secondaryBottom: '4%',
    secondaryLeft: '18%',
    secondaryScale: 'scale-105',
  },
  markets: {
    primaryBg: 'radial-gradient(ellipse at center, rgba(202,138,4,0.55) 0%, rgba(254,240,138,0.28) 35%, rgba(254,240,138,0.08) 60%, transparent 75%)',
    primaryTop: '12%',
    primaryRight: '-8%',
    primaryScale: 'scale-105',
    secondaryBg: 'radial-gradient(ellipse at center, rgba(254,240,138,0.50) 0%, rgba(180,83,9,0.25) 35%, rgba(180,83,9,0.06) 60%, transparent 75%)',
    secondaryBottom: '16%',
    secondaryLeft: '5%',
    secondaryScale: 'scale-110',
  },
  'why-aivolve': {
    primaryBg: 'radial-gradient(ellipse at center, rgba(254,240,138,0.58) 0%, rgba(245,158,11,0.32) 35%, rgba(245,158,11,0.08) 60%, transparent 75%)',
    primaryTop: '22%',
    primaryRight: '10%',
    primaryScale: 'scale-110',
    secondaryBg: 'radial-gradient(ellipse at center, rgba(146,64,14,0.52) 0%, rgba(212,175,55,0.26) 35%, rgba(212,175,55,0.06) 60%, transparent 75%)',
    secondaryBottom: '10%',
    secondaryLeft: '-6%',
    secondaryScale: 'scale-105',
  },
  team: {
    primaryBg: 'radial-gradient(ellipse at center, rgba(251,191,36,0.56) 0%, rgba(212,175,55,0.28) 35%, rgba(212,175,55,0.08) 60%, transparent 75%)',
    primaryTop: '15%',
    primaryRight: '22%',
    primaryScale: 'scale-105',
    secondaryBg: 'radial-gradient(ellipse at center, rgba(254,240,138,0.50) 0%, rgba(180,83,9,0.25) 35%, rgba(180,83,9,0.06) 60%, transparent 75%)',
    secondaryBottom: '6%',
    secondaryLeft: '10%',
    secondaryScale: 'scale-110',
  },
  contact: {
    primaryBg: 'radial-gradient(ellipse at center, rgba(245,158,11,0.62) 0%, rgba(254,240,138,0.35) 35%, rgba(254,240,138,0.09) 60%, transparent 75%)',
    primaryTop: '10%',
    primaryRight: '5%',
    primaryScale: 'scale-115',
    secondaryBg: 'radial-gradient(ellipse at center, rgba(212,175,55,0.54) 0%, rgba(180,83,9,0.28) 35%, rgba(180,83,9,0.07) 60%, transparent 75%)',
    secondaryBottom: '0%',
    secondaryLeft: '-4%',
    secondaryScale: 'scale-110',
  },
};

export const AmbientBackground: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Screen size detection
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    checkMobile();

    // If mobile, do not bind heavy scroll, intersection, or mousemove observers
    if (window.innerWidth < 768) {
      window.addEventListener('resize', checkMobile);
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }

    // Section Observer for scroll-reactive background reconfiguration (Desktop Only)
    const observerOptions = {
      root: null,
      rootMargin: '-15% 0px -35% 0px',
      threshold: 0.05,
    };

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (SECTIONS.includes(id)) {
            if (debounceTimer) clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
              setActiveSection(id);
            }, 50);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    SECTIONS.forEach((secId) => {
      const el = document.getElementById(secId);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      if (window.scrollY < 40 && activeSection !== 'hero') {
        setActiveSection('hero');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Desktop-only smooth mouse parallax via CSS Custom Properties (Zero React re-renders)
    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currX = 0;
    let currY = 0;

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 16;
      targetY = (e.clientY / window.innerHeight - 0.5) * 16;
    };

    if (hasFinePointer) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      const loop = () => {
        currX += (targetX - currX) * 0.04;
        currY += (targetY - currY) * 0.04;
        if (containerRef.current) {
          containerRef.current.style.setProperty('--mouse-x', `${currX.toFixed(2)}px`);
          containerRef.current.style.setProperty('--mouse-y', `${currY.toFixed(2)}px`);
        }
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    }

    window.addEventListener('resize', checkMobile);

    return () => {
      observer.disconnect();
      if (debounceTimer) clearTimeout(debounceTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
      if (hasFinePointer) {
        window.removeEventListener('mousemove', handleMouseMove);
        if (rafId) cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const currentStates = DESKTOP_FIGURE_STATES[activeSection] || DESKTOP_FIGURE_STATES['hero'];

  // Renders one of the 6 distinct geometric figures by ID with clean golden strokes
  const renderFigureSvg = (figureId: number) => {
    const shadowClass = isMobile ? '' : 'drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]';

    switch (figureId) {
      // 0: Celestial Orbital Ring
      case 0:
        return (
          <svg viewBox="0 0 100 100" className={`w-full h-full stroke-[#d4af37] fill-none ${shadowClass}`} strokeWidth="1.1">
            <circle cx="50" cy="50" r="46" strokeOpacity="0.85" />
            <circle cx="50" cy="50" r="36" strokeDasharray="6 6" strokeOpacity="0.70" />
            <circle cx="50" cy="50" r="14" strokeOpacity="0.55" />
            <circle cx="50" cy="4" r="2.2" fill="#fef08a" stroke="#d4af37" strokeWidth="0.7" />
            <circle cx="96" cy="50" r="1.8" fill="#fef08a" stroke="#d4af37" strokeWidth="0.7" />
            <circle cx="50" cy="50" r="2.2" fill="#fcd34d" />
          </svg>
        );

      // 1: Isometric Prism Matrix
      case 1:
        return (
          <svg viewBox="0 0 100 100" className={`w-full h-full stroke-[#d4af37] fill-none ${shadowClass}`} strokeWidth="1.1">
            <polygon points="50,8 90,31 90,69 50,92 10,69 10,31" strokeOpacity="0.85" />
            <line x1="50" y1="50" x2="50" y2="8" strokeOpacity="0.70" />
            <line x1="50" y1="50" x2="90" y2="69" strokeOpacity="0.70" />
            <line x1="50" y1="50" x2="10" y2="69" strokeOpacity="0.70" />
            <circle cx="50" cy="50" r="2.0" fill="#fcd34d" />
            <circle cx="50" cy="8" r="1.6" fill="#fef08a" />
            <circle cx="90" cy="31" r="1.6" fill="#fef08a" />
            <circle cx="10" cy="31" r="1.6" fill="#fef08a" />
          </svg>
        );

      // 2: Precision Reticle Target
      case 2:
        return (
          <svg viewBox="0 0 100 100" className={`w-full h-full stroke-[#d4af37] fill-none ${shadowClass}`} strokeWidth="1.1">
            <path d="M 18 32 L 18 18 L 32 18" strokeOpacity="0.80" />
            <path d="M 82 32 L 82 18 L 68 18" strokeOpacity="0.80" />
            <path d="M 18 68 L 18 82 L 32 82" strokeOpacity="0.80" />
            <path d="M 82 68 L 82 82 L 68 82" strokeOpacity="0.80" />
            <circle cx="50" cy="50" r="26" strokeDasharray="4 4" strokeOpacity="0.60" />
            <line x1="42" y1="50" x2="58" y2="50" strokeOpacity="0.80" />
            <line x1="50" y1="42" x2="50" y2="58" strokeOpacity="0.80" />
            <circle cx="50" cy="50" r="1.6" fill="#fcd34d" />
          </svg>
        );

      // 3: Global Satellite Latitude Sphere
      case 3:
        return (
          <svg viewBox="0 0 100 100" className={`w-full h-full stroke-[#d4af37] fill-none ${shadowClass}`} strokeWidth="1.1">
            <circle cx="50" cy="50" r="46" strokeOpacity="0.85" />
            <ellipse cx="50" cy="50" rx="46" ry="18" strokeOpacity="0.70" />
            <ellipse cx="50" cy="50" rx="18" ry="46" strokeDasharray="5 5" strokeOpacity="0.60" />
            <line x1="4" y1="50" x2="96" y2="50" strokeOpacity="0.55" strokeDasharray="2 4" />
            <circle cx="78" cy="38" r="2.0" fill="#fef08a" stroke="#d4af37" strokeWidth="0.7" />
            <circle cx="50" cy="50" r="2.0" fill="#fcd34d" />
          </svg>
        );

      // 4: Telemetry Diamond Beacon
      case 4:
        return (
          <svg viewBox="0 0 100 100" className={`w-full h-full stroke-[#d4af37] fill-none ${shadowClass}`} strokeWidth="1.1">
            <polygon points="50,6 94,50 50,94 6,50" strokeOpacity="0.85" />
            <polygon points="50,22 78,50 50,78 22,50" strokeDasharray="5 5" strokeOpacity="0.70" />
            <circle cx="50" cy="50" r="12" strokeOpacity="0.65" />
            <circle cx="50" cy="50" r="2.0" fill="#fef08a" />
            <circle cx="50" cy="6" r="1.6" fill="#fcd34d" />
            <circle cx="94" cy="50" r="1.6" fill="#fcd34d" />
            <circle cx="50" cy="94" r="1.6" fill="#fcd34d" />
            <circle cx="6" cy="50" r="1.6" fill="#fcd34d" />
          </svg>
        );

      // 5: Cyber Concentric Hex-Core
      case 5:
      default:
        return (
          <svg viewBox="0 0 100 100" className={`w-full h-full stroke-[#d4af37] fill-none ${shadowClass}`} strokeWidth="1.1">
            <polygon points="50,6 88,28 88,72 50,94 12,72 12,28" strokeOpacity="0.85" />
            <polygon points="50,24 72,37 72,63 50,76 28,63 28,37" strokeDasharray="4 4" strokeOpacity="0.70" />
            <line x1="50" y1="50" x2="50" y2="6" strokeOpacity="0.55" />
            <line x1="50" y1="50" x2="88" y2="72" strokeOpacity="0.55" />
            <line x1="50" y1="50" x2="12" y2="72" strokeOpacity="0.55" />
            <circle cx="50" cy="50" r="2.2" fill="#fef08a" />
            <circle cx="50" cy="6" r="1.6" fill="#fcd34d" />
            <circle cx="88" cy="28" r="1.6" fill="#fcd34d" />
            <circle cx="12" cy="28" r="1.6" fill="#fcd34d" />
          </svg>
        );
    }
  };

  const currentGradientTheme = SECTION_GRADIENT_THEMES[activeSection] || SECTION_GRADIENT_THEMES.hero;
  const isHero = activeSection === 'hero';

  // Mobile Static Alternating Gradient Circles (Dual-Shade Balls matching desktop, starting right after hero, seamlessly blended)
  if (isMobile) {
    return (
      <div 
        aria-hidden="true" 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none bg-[#08080a]"
      >
        {/* Deep Obsidian Black Base */}
        <div className="absolute inset-0 bg-[#08080a]" />

        {/* Alternating Dual-Shade Gradient Light Fields matching desktop shades */}
        {/* Starts immediately at the post-hero threshold (~6.0%) illuminating the About section tagline and editorial text */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            filter: 'blur(28px)',
            WebkitFilter: 'blur(28px)',
          }}
        >
          {/* Ball 0: Primary Champagne Gold Light Field illuminating About Tagline & Header (~6.0%) */}
          <div 
            className="absolute pointer-events-none"
            style={{
              top: '6.0%',
              left: '-12%',
              width: '680px',
              height: '1120px',
              borderRadius: '50%',
              transform: 'rotate(-10deg)',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(254,240,138,0.45) 0%, rgba(234,179,8,0.28) 22%, rgba(212,175,55,0.16) 42%, rgba(212,175,55,0.06) 65%, rgba(212,175,55,0.015) 85%, transparent 100%)',
            }}
          />

          {/* Ball 1: Right Flank Warm Amber Light Field (~10.5%) */}
          <div 
            className="absolute pointer-events-none"
            style={{
              top: '10.5%',
              right: '-16%',
              width: '640px',
              height: '1100px',
              borderRadius: '50%',
              transform: 'rotate(16deg)',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245,158,11,0.40) 0%, rgba(217,119,6,0.26) 22%, rgba(180,83,9,0.14) 42%, rgba(180,83,9,0.05) 65%, rgba(180,83,9,0.012) 85%, transparent 100%)',
            }}
          />

          {/* Ball 2: Left Flank Champagne Gold (~15.0%) */}
          <div 
            className="absolute pointer-events-none"
            style={{
              top: '15.0%',
              left: '-14%',
              width: '620px',
              height: '1060px',
              borderRadius: '50%',
              transform: 'rotate(-12deg)',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(254,240,138,0.42) 0%, rgba(234,179,8,0.27) 22%, rgba(212,175,55,0.15) 42%, rgba(212,175,55,0.05) 65%, rgba(212,175,55,0.015) 85%, transparent 100%)',
            }}
          />

          {/* Ball 3: Right Flank Warm Amber (~19.5%) */}
          <div 
            className="absolute pointer-events-none"
            style={{
              top: '19.5%',
              right: '-14%',
              width: '620px',
              height: '1060px',
              borderRadius: '50%',
              transform: 'rotate(14deg)',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245,158,11,0.38) 0%, rgba(217,119,6,0.25) 22%, rgba(180,83,9,0.13) 42%, rgba(180,83,9,0.05) 65%, rgba(180,83,9,0.012) 85%, transparent 100%)',
            }}
          />

          {/* Ball 4: Central-Left Champagne Gold (~24.0%) */}
          <div 
            className="absolute pointer-events-none"
            style={{
              top: '24.0%',
              left: '-8%',
              width: '600px',
              height: '1040px',
              borderRadius: '50%',
              transform: 'rotate(-8deg)',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(254,240,138,0.40) 0%, rgba(234,179,8,0.26) 22%, rgba(212,175,55,0.14) 42%, rgba(212,175,55,0.05) 65%, rgba(212,175,55,0.015) 85%, transparent 100%)',
            }}
          />

          {/* Ball 5: Deep Right Warm Amber (~28.8%) */}
          <div 
            className="absolute pointer-events-none"
            style={{
              top: '28.8%',
              right: '-18%',
              width: '630px',
              height: '1080px',
              borderRadius: '50%',
              transform: 'rotate(-10deg)',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(217,119,6,0.38) 0%, rgba(180,83,9,0.24) 22%, rgba(146,64,14,0.12) 42%, rgba(146,64,14,0.045) 65%, rgba(146,64,14,0.012) 85%, transparent 100%)',
            }}
          />

          {/* Ball 6: Mid Left Champagne Gold (~33.5%) */}
          <div 
            className="absolute pointer-events-none"
            style={{
              top: '33.5%',
              left: '-14%',
              width: '640px',
              height: '1100px',
              borderRadius: '50%',
              transform: 'rotate(18deg)',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(254,240,138,0.40) 0%, rgba(245,158,11,0.25) 22%, rgba(212,175,55,0.14) 42%, rgba(212,175,55,0.05) 65%, rgba(212,175,55,0.015) 85%, transparent 100%)',
            }}
          />

          {/* Ball 7: Mid Right Warm Amber (~38.2%) */}
          <div 
            className="absolute pointer-events-none"
            style={{
              top: '38.2%',
              right: '-10%',
              width: '600px',
              height: '1040px',
              borderRadius: '50%',
              transform: 'rotate(8deg)',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245,158,11,0.38) 0%, rgba(217,119,6,0.24) 22%, rgba(180,83,9,0.12) 42%, rgba(180,83,9,0.045) 65%, rgba(180,83,9,0.012) 85%, transparent 100%)',
            }}
          />

          {/* Ball 8: Outer Left Champagne Gold (~43.0%) */}
          <div 
            className="absolute pointer-events-none"
            style={{
              top: '43.0%',
              left: '-16%',
              width: '620px',
              height: '1060px',
              borderRadius: '50%',
              transform: 'rotate(-12deg)',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(254,240,138,0.42) 0%, rgba(234,179,8,0.27) 22%, rgba(212,175,55,0.15) 42%, rgba(212,175,55,0.05) 65%, rgba(212,175,55,0.015) 85%, transparent 100%)',
            }}
          />

          {/* Ball 9: Outer Right Warm Amber (~47.8%) */}
          <div 
            className="absolute pointer-events-none"
            style={{
              top: '47.8%',
              right: '-16%',
              width: '640px',
              height: '1100px',
              borderRadius: '50%',
              transform: 'rotate(-7deg)',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(217,119,6,0.38) 0%, rgba(180,83,9,0.24) 22%, rgba(146,64,14,0.12) 42%, rgba(146,64,14,0.045) 65%, rgba(146,64,14,0.012) 85%, transparent 100%)',
            }}
          />

          {/* Ball 10: Central-Left Champagne Gold (~52.5%) */}
          <div 
            className="absolute pointer-events-none"
            style={{
              top: '52.5%',
              left: '-6%',
              width: '600px',
              height: '1040px',
              borderRadius: '50%',
              transform: 'rotate(14deg)',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(254,240,138,0.40) 0%, rgba(245,158,11,0.25) 22%, rgba(212,175,55,0.13) 42%, rgba(212,175,55,0.05) 65%, rgba(212,175,55,0.015) 85%, transparent 100%)',
            }}
          />

          {/* Ball 11: Central-Right Warm Amber (~57.2%) */}
          <div 
            className="absolute pointer-events-none"
            style={{
              top: '57.2%',
              right: '-14%',
              width: '620px',
              height: '1060px',
              borderRadius: '50%',
              transform: 'rotate(11deg)',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245,158,11,0.38) 0%, rgba(217,119,6,0.24) 22%, rgba(180,83,9,0.12) 42%, rgba(180,83,9,0.045) 65%, rgba(180,83,9,0.012) 85%, transparent 100%)',
            }}
          />

          {/* Ball 12: Outer Left Champagne Gold (~62.0%) */}
          <div 
            className="absolute pointer-events-none"
            style={{
              top: '62.0%',
              left: '-16%',
              width: '640px',
              height: '1120px',
              borderRadius: '50%',
              transform: 'rotate(-9deg)',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(254,240,138,0.40) 0%, rgba(212,175,55,0.25) 22%, rgba(217,119,6,0.12) 42%, rgba(217,119,6,0.045) 65%, rgba(217,119,6,0.012) 85%, transparent 100%)',
            }}
          />

          {/* Ball 13: Central-Right Warm Amber (~66.8%) */}
          <div 
            className="absolute pointer-events-none"
            style={{
              top: '66.8%',
              right: '-8%',
              width: '610px',
              height: '1050px',
              borderRadius: '50%',
              transform: 'rotate(7deg)',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(217,119,6,0.38) 0%, rgba(180,83,9,0.23) 22%, rgba(146,64,14,0.12) 42%, rgba(146,64,14,0.045) 65%, rgba(146,64,14,0.012) 85%, transparent 100%)',
            }}
          />

          {/* Ball 14: Central-Left Champagne Gold (~71.5%) */}
          <div 
            className="absolute pointer-events-none"
            style={{
              top: '71.5%',
              left: '-6%',
              width: '600px',
              height: '1040px',
              borderRadius: '50%',
              transform: 'rotate(-11deg)',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(254,240,138,0.42) 0%, rgba(234,179,8,0.26) 22%, rgba(212,175,55,0.14) 42%, rgba(212,175,55,0.05) 65%, rgba(212,175,55,0.015) 85%, transparent 100%)',
            }}
          />

          {/* Ball 15: Deep Right Warm Amber (~76.2%) */}
          <div 
            className="absolute pointer-events-none"
            style={{
              top: '76.2%',
              right: '-16%',
              width: '630px',
              height: '1080px',
              borderRadius: '50%',
              transform: 'rotate(13deg)',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245,158,11,0.38) 0%, rgba(217,119,6,0.24) 22%, rgba(180,83,9,0.12) 42%, rgba(180,83,9,0.045) 65%, rgba(180,83,9,0.012) 85%, transparent 100%)',
            }}
          />

          {/* Ball 16: Mid Left Champagne Gold (~81.0%) */}
          <div 
            className="absolute pointer-events-none"
            style={{
              top: '81.0%',
              left: '-14%',
              width: '640px',
              height: '1120px',
              borderRadius: '50%',
              transform: 'rotate(15deg)',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(254,240,138,0.40) 0%, rgba(245,158,11,0.25) 22%, rgba(212,175,55,0.13) 42%, rgba(212,175,55,0.05) 65%, rgba(212,175,55,0.015) 85%, transparent 100%)',
            }}
          />

          {/* Ball 17: Central-Right Warm Amber (~86.0%) */}
          <div 
            className="absolute pointer-events-none"
            style={{
              top: '86.0%',
              right: '-12%',
              width: '620px',
              height: '1060px',
              borderRadius: '50%',
              transform: 'rotate(-8deg)',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(217,119,6,0.38) 0%, rgba(180,83,9,0.23) 22%, rgba(146,64,14,0.11) 42%, rgba(146,64,14,0.045) 65%, rgba(146,64,14,0.012) 85%, transparent 100%)',
            }}
          />

          {/* Ball 18: Base Footer Champagne Gold Glow (~91.5%) */}
          <div 
            className="absolute pointer-events-none"
            style={{
              top: '91.5%',
              right: '-16%',
              width: '660px',
              height: '1160px',
              borderRadius: '50%',
              transform: 'rotate(-10deg)',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(254,240,138,0.42) 0%, rgba(212,175,55,0.26) 22%, rgba(217,119,6,0.12) 42%, rgba(217,119,6,0.045) 65%, rgba(217,119,6,0.012) 85%, transparent 100%)',
            }}
          />
        </div>

        {/* Extremely Subtle Ambient Golden Grid Texture */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{
            backgroundImage: `linear-gradient(to right, rgba(212,175,55,0.028) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.028) 1px, transparent 1px)`,
            backgroundSize: '56px 56px',
          }} 
        />

        {/* Ambient Mobile Optical Diffusion Blur Layer */}
        <div 
          className="absolute inset-0 backdrop-blur-[6px] bg-black/10 pointer-events-none" 
          style={{
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#08080a]"
      style={{
        ['--mouse-x' as string]: '0px',
        ['--mouse-y' as string]: '0px',
      }}
    >
      {/* Deep Obsidian Black Base */}
      <div className="absolute inset-0 bg-[#08080a]" />
      
      {/* Subtle Soft Atmospheric Golden Grid (Desktop) */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(to right, rgba(212,175,55,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.035) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} 
      />

      {/* Atmospheric Aurora Light Field 1 (Primary Glow) */}
      <div 
        className={`absolute rounded-full pointer-events-none transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isHero ? 'w-[640px] h-[640px] opacity-20' : 'w-[820px] h-[820px] opacity-48'
        } ${currentGradientTheme.primaryScale}`}
        style={{
          top: currentGradientTheme.primaryTop,
          right: currentGradientTheme.primaryRight,
          background: currentGradientTheme.primaryBg,
          filter: isHero ? 'blur(100px)' : 'blur(120px)',
          WebkitFilter: isHero ? 'blur(100px)' : 'blur(120px)',
          transform: 'translate3d(calc(var(--mouse-x) * 0.2), calc(var(--mouse-y) * 0.2), 0)',
          willChange: 'transform, opacity, top, right, filter',
        }}
      />

      {/* Atmospheric Aurora Light Field 2 (Secondary Glow) */}
      <div 
        className={`absolute rounded-full pointer-events-none transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isHero ? 'w-[560px] h-[560px] opacity-15' : 'w-[720px] h-[720px] opacity-40'
        } ${currentGradientTheme.secondaryScale}`}
        style={{
          bottom: currentGradientTheme.secondaryBottom,
          left: currentGradientTheme.secondaryLeft,
          background: currentGradientTheme.secondaryBg,
          filter: isHero ? 'blur(100px)' : 'blur(120px)',
          WebkitFilter: isHero ? 'blur(100px)' : 'blur(120px)',
          transform: 'translate3d(calc(var(--mouse-x) * -0.15), calc(var(--mouse-y) * -0.15), 0)',
          willChange: 'transform, opacity, bottom, left, filter',
        }}
      />

      {/* ========================================================================= */}
      {/* 6 CONTINUOUS FIGURES (Desktop-Only with smooth glide & hierarchy) */}
      {/* ========================================================================= */}
      {[0, 1, 2, 3, 4, 5].map((figId) => {
        const state = currentStates[figId] || {
          top: '50%',
          left: '-20%',
          scale: 0.5,
          rotate: 0,
          opacity: 0,
          width: '160px',
          height: '160px',
          isPrimary: false,
        };

        const parallaxFactor = state.isPrimary ? 0.35 : -0.25;

        return (
          <div
            key={`fig-${figId}`}
            className="absolute transition-all duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none"
            style={{
              width: state.width,
              height: state.height,
              top: state.top,
              left: state.left,
              right: state.right,
              opacity: state.opacity,
              transform: `translate3d(calc(var(--mouse-x) * ${parallaxFactor}), calc(var(--mouse-y) * ${parallaxFactor}), 0) scale(${state.scale}) rotate(${state.rotate}deg)`,
              willChange: 'transform, opacity, top, left, right',
            }}
          >
            {renderFigureSvg(figId)}
          </div>
        );
      })}

      {/* Ambient Optical Background Diffusion Layer */}
      <div 
        className="absolute inset-0 backdrop-blur-[6px] bg-black/10 pointer-events-none" 
        style={{
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
      />
    </div>
  );
};
