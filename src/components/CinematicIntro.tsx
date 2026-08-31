import React, { useState, useEffect, useRef } from 'react';
import { RobotHeadO } from './RobotHeadO';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  // Phase sequence:
  // 0: Initial boot (0ms)
  // 1: Sequential Letters A -> I -> V -> L -> V -> E (250ms - 1600ms)
  // 2: Robotic O appears floating above (2100ms)
  // 3: Robotic O descends and docks, forming A I V [O] L V E (2850ms)
  // 4: Lockup pause & golden beam / subtitle (3800ms)
  // 5: Letters shrink and slide smoothly into the center behind O (4800ms)
  // 6: Robotic O glides & scales smoothly to exact hero position with 100% SOLID OPACITY (NO FADING) (5800ms)
  // 7: Exact stacked landing -> unmount intro & cascade page elements (7000ms)
  const [phase, setPhase] = useState<number>(0);
  const [visibleLetters, setVisibleLetters] = useState<number>(0); // 0 to 6
  const [targetRect, setTargetRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [introORect, setIntroORect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [isFlyingToHero, setIsFlyingToHero] = useState<boolean>(false);
  const introORef = useRef<HTMLDivElement | null>(null);
  const completedRef = useRef<boolean>(false);

  const lettersLeft = ['A', 'I', 'V'];
  const lettersRight = ['L', 'V', 'E'];

  const finishIntro = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  };

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      finishIntro();
      return;
    }

    const timers: NodeJS.Timeout[] = [];

    // Step 1: Start letter sequence
    timers.push(setTimeout(() => setPhase(1), 150));

    // Staggered letters A -> I -> V -> L -> V -> E (~270ms intervals)
    const letterIntervals = [250, 520, 790, 1060, 1330, 1600];
    letterIntervals.forEach((time, index) => {
      timers.push(setTimeout(() => {
        setVisibleLetters(index + 1);
      }, time));
    });

    // Step 2: Robotic O appears floating above
    timers.push(setTimeout(() => {
      setPhase(2);
    }, 2100));

    // Step 3: Robotic O descends and docks into logo lockup
    timers.push(setTimeout(() => {
      setPhase(3);
    }, 2850));

    // Step 4: Full logo lockup confirmation
    timers.push(setTimeout(() => {
      setPhase(4);
    }, 3800));

    // Step 5: Letters shrink down and slide directly into the center behind 'O'
    timers.push(setTimeout(() => {
      setPhase(5);
    }, 4800));

    // Step 6: Robotic O travels from intro center to Hero target slot (100% solid opacity, ZERO fade)
    timers.push(setTimeout(() => {
      const heroSlot = document.getElementById('hero-robot-o-target');
      if (heroSlot && introORef.current) {
        const hRect = heroSlot.getBoundingClientRect();
        const iRect = introORef.current.getBoundingClientRect();
        setTargetRect({
          x: hRect.left,
          y: hRect.top,
          width: hRect.width,
          height: hRect.height,
        });
        setIntroORect({
          x: iRect.left,
          y: iRect.top,
          width: iRect.width,
          height: iRect.height,
        });
      }
      setIsFlyingToHero(true);
      setPhase(6);
    }, 5800));

    // Step 7: At exact landing moment, instantly hand off to Hero and unmount intro
    timers.push(setTimeout(() => {
      finishIntro();
    }, 7000));

    // Keyboard shortcut to skip intro
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        finishIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Compute flight transform for the Robotic O to match exact position and size of hero O
  // CRITICAL: Opacity is strictly 100% (NO FADING). Only physical translation and scale transform are applied!
  let flightStyle: React.CSSProperties = {};
  if (isFlyingToHero && targetRect && introORect) {
    const deltaX = targetRect.x + targetRect.width / 2 - (introORect.x + introORect.width / 2);
    const deltaY = targetRect.y + targetRect.height / 2 - (introORect.y + introORect.height / 2);
    const scaleFactor = targetRect.width / Math.max(introORect.width, 1);

    flightStyle = {
      transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scaleFactor})`,
      transition: 'transform 1150ms cubic-bezier(0.16, 1, 0.3, 1)',
      willChange: 'transform',
      zIndex: 9999,
      opacity: 1, // Strictly solid
    };
  }

  // Left letters (A, I, V): in Phase 5, shrink and move into the center behind O
  const getLeftLetterStyle = (index: number) => {
    const isVisible = visibleLetters > index;
    if (phase >= 5) {
      const distances = [220, 150, 75];
      const shiftX = distances[index] || 80;
      return {
        transform: `translate3d(${shiftX}px, 0, 0) scale(0.02)`,
        opacity: 0,
        transition: `transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 40}ms, opacity 550ms ease-out ${index * 40}ms, scale 700ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 40}ms`,
        zIndex: 5 + index,
      };
    }
    return {
      transform: phase >= 3 ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(-20px, 0, 0) scale(1)',
      opacity: isVisible ? 1 : 0,
      transition: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease-out',
      zIndex: 5 + index,
    };
  };

  // Right letters (L, V, E): in Phase 5, shrink and move into the center behind O
  const getRightLetterStyle = (index: number) => {
    const isVisible = visibleLetters > (index + 3);
    if (phase >= 5) {
      const distances = [-75, -150, -220];
      const shiftX = distances[index] || -80;
      return {
        transform: `translate3d(${shiftX}px, 0, 0) scale(0.02)`,
        opacity: 0,
        transition: `transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${(2 - index) * 40}ms, opacity 550ms ease-out ${(2 - index) * 40}ms, scale 700ms cubic-bezier(0.16, 1, 0.3, 1) ${(2 - index) * 40}ms`,
        zIndex: 5 + (2 - index),
      };
    }
    return {
      transform: phase >= 3 ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(20px, 0, 0) scale(1)',
      opacity: isVisible ? 1 : 0,
      transition: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease-out',
      zIndex: 5 + (2 - index),
    };
  };

  return (
    <div 
      id="cinematic-intro-overlay"
      className={`fixed inset-0 z-[100] flex flex-col justify-between items-center p-6 sm:p-10 select-none overflow-hidden ${
        isFlyingToHero ? 'pointer-events-none' : ''
      }`}
    >
      {/* Background Architectural Grid - Fades smoothly on flight to reveal the underlying page */}
      <div 
        className={`absolute inset-0 bg-[#08080a] pointer-events-none transition-opacity duration-1000 ${
          isFlyingToHero ? 'opacity-0' : 'opacity-100'
        }`} 
      />
      
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          isFlyingToHero ? 'opacity-0' : 'opacity-[0.08]'
        }`} 
        style={{
          backgroundImage: `linear-gradient(to right, #d4af37 1px, transparent 1px), linear-gradient(to bottom, #d4af37 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
        }} 
      />

      {/* Radiant Central Gold Glow (Hardware-accelerated zero-blur radial gradient) */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full pointer-events-none transition-opacity duration-1000 ${
          isFlyingToHero ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background: phase >= 3 && phase < 5
            ? 'radial-gradient(circle, rgba(254,240,138,0.22) 0%, rgba(212,175,55,0.12) 35%, rgba(212,175,55,0.02) 60%, transparent 70%)'
            : 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.03) 45%, transparent 65%)',
          transform: phase >= 3 ? 'translate(-50%, -50%) scale(1.1)' : 'translate(-50%, -50%) scale(0.9)',
        }}
      />

      {/* Top Bar: Telemetry & Skip Button */}
      <div 
        className={`w-full max-w-7xl mx-auto flex items-center justify-between z-10 pt-2 transition-opacity duration-500 ${
          isFlyingToHero ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-[#d4af37] shadow-[0_0_10px_#fcd34d] animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#fcd34d] font-semibold">
            SYSTEM BOOT // PROTOCOL 4.0.1
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
            UAE · GCC · CANADA
          </span>
          <button
            onClick={finishIntro}
            className="text-[10px] uppercase tracking-[0.25em] font-semibold font-poppins px-3.5 py-1.5 border border-[#d4af37]/30 bg-[#0d0d14]/80 text-slate-300 hover:text-[#fef08a] hover:border-[#d4af37] transition-all cursor-pointer rounded-sm"
          >
            Skip Intro [ESC]
          </button>
        </div>
      </div>

      {/* Center Cinematic Stage: Letters & Docking Robotic O */}
      <div className="relative my-auto flex flex-col items-center justify-center z-10 w-full">
        {/* Telemetry coordinate header appearing before letters */}
        <div 
          className={`mb-6 transition-all duration-600 ${
            phase >= 1 && phase < 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-slate-400 font-poppins text-center block">
            INTELLIGENT COMPUTATION &amp; ADVERTISEMENT
          </span>
        </div>

        {/* Main Monolith Brand Lockup Formation */}
        <div className="flex items-center justify-center text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold font-poppins tracking-wider relative min-h-[140px] sm:min-h-[180px]">
          
          {/* Left Letters: A, I, V */}
          <div className="flex items-center relative">
            {lettersLeft.map((char, index) => (
              <span
                key={`left-${char}-${index}`}
                style={getLeftLetterStyle(index)}
                className="inline-block text-gold-metallic filter drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] select-none"
              >
                {char}
              </span>
            ))}
          </div>

          {/* Center Slot: Robotic O Container (100% Solid Opacity During Flight, ZERO FADING) */}
          <div 
            ref={introORef}
            className="relative flex items-center justify-center mx-1 sm:mx-2 shrink-0 transition-all duration-700 z-30 translate-y-[0.05em]"
            style={{
              width: phase >= 3 ? '1.1em' : '1.3em',
              ...flightStyle,
            }}
          >
            {/* Floating Entry from Top with Radiant Aura */}
            <div 
              className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col items-center justify-center relative ${
                phase >= 2 
                  ? phase >= 3 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-100 -translate-y-12 scale-110 drop-shadow-[0_0_30px_rgba(254,240,138,0.8)]' 
                  : 'opacity-0 -translate-y-24 scale-50'
              }`}
            >
              {/* Telemetry micro-tag when emerging separately */}
              {phase === 2 && (
                <span className="absolute -top-7 whitespace-nowrap text-[9px] font-mono uppercase tracking-[0.25em] text-[#fef08a] bg-[#0d0d14]/90 px-2 py-0.5 border border-[#d4af37]/40 shadow-[0_0_10px_rgba(212,175,55,0.4)] animate-pulse">
                  NEURAL CORE // ACTIVE
                </span>
              )}

              {/* The Pure Robotic O Component with 100% Solid Opacity */}
              <RobotHeadO 
                className="inline-flex" 
                sizeClassName="w-[0.82em] h-[0.82em]" 
                forceAnimate={true}
              />
            </div>
          </div>

          {/* Right Letters: L, V, E */}
          <div className="flex items-center relative">
            {lettersRight.map((char, index) => (
              <span
                key={`right-${char}-${index}`}
                style={getRightLetterStyle(index)}
                className="inline-block text-gold-metallic filter drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] select-none"
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Golden Lockup Soundwave Line & Subtitle */}
        <div 
          className={`mt-6 flex flex-col items-center gap-3 transition-all duration-600 ${
            phase >= 4 && phase < 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <div className="w-36 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent shadow-[0_0_8px_#fcd34d]" />
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] font-medium text-slate-300 font-poppins text-center">
            AIVOLVE TECHNOLOGIES
          </p>
        </div>
      </div>

      {/* Bottom Footer Progress Bar */}
      <div 
        className={`w-full max-w-md mx-auto z-10 pb-4 transition-opacity duration-500 ${
          isFlyingToHero ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-slate-500 mb-2">
          <span>INITIALIZING</span>
          <span className="text-[#fcd34d]">
            {phase === 0 && '0%'}
            {phase === 1 && `${Math.round((visibleLetters / 6) * 50)}%`}
            {phase === 2 && '65%'}
            {phase === 3 && '85%'}
            {phase >= 4 && '100%'}
          </span>
        </div>
        <div className="w-full h-1 bg-[#161622] rounded-full overflow-hidden border border-[#d4af37]/20">
          <div 
            className="h-full bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#fcd34d] transition-all duration-500 ease-out shadow-[0_0_8px_#fcd34d]"
            style={{
              width: phase === 0 ? '5%' : phase === 1 ? `${20 + visibleLetters * 8}%` : phase === 2 ? '70%' : phase === 3 ? '88%' : '100%',
            }}
          />
        </div>
      </div>
    </div>
  );
};
