import React, { useEffect, useRef, useState } from 'react';

interface RobotHeadOProps {
  className?: string;
  sizeClassName?: string;
  animate?: boolean;
  forceAnimate?: boolean;
}

export const RobotHeadO: React.FC<RobotHeadOProps> = ({ 
  className = '',
  sizeClassName = 'w-[0.82em] h-[0.82em]',
  animate = true,
  forceAnimate = false
}) => {
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '20px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Smooth GPU-accelerated keyframe animation active when in viewport
  const shouldAnimate = (forceAnimate || animate) && isInView;

  return (
    <span 
      ref={rootRef}
      aria-label="o"
      role="img"
      className={`inline-flex items-center justify-center align-middle select-none mx-[0.04em] relative ${className}`}
    >
      {/* Ground Floor Shadow & Golden Aura that responds dynamically to jumps */}
      <span 
        className={`absolute -bottom-1 inset-x-0 h-2 rounded-full bg-[#d4af37]/35 blur-sm pointer-events-none ${
          shouldAnimate ? 'animate-robot-shadow' : 'opacity-40'
        }`} 
      />

      {/* Jumping & Landing Container */}
      <span className={`relative ${sizeClassName} shrink-0 ${shouldAnimate ? 'animate-robot-jump' : ''}`}>
        {/* Continuous 360 Spin Container without rotation breaks */}
        <span className={`w-full h-full inline-flex items-center justify-center ${shouldAnimate ? 'animate-robot-spin' : ''}`}>
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] overflow-visible"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Rich Metallic Golden Gradients */}
              <linearGradient id="goldHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fffbeb" />
                <stop offset="25%" stopColor="#fcd34d" />
                <stop offset="60%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#854d0e" />
              </linearGradient>

              <linearGradient id="goldInnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e1b18" />
                <stop offset="100%" stopColor="#08080a" />
              </linearGradient>

              <linearGradient id="goldAccentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>

              <radialGradient id="eyeGlowRadial" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#fde047" />
                <stop offset="85%" stopColor="#d4af37" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Left Ear / Bolt */}
            <rect x="4" y="40" width="8" height="20" rx="3" fill="url(#goldAccentGrad)" stroke="#111" strokeWidth="1" />
            <line x1="8" y1="45" x2="8" y2="55" stroke="#08080a" strokeWidth="1.5" />

            {/* Right Ear / Bolt */}
            <rect x="88" y="40" width="8" height="20" rx="3" fill="url(#goldAccentGrad)" stroke="#111" strokeWidth="1" />
            <line x1="92" y1="45" x2="92" y2="55" stroke="#08080a" strokeWidth="1.5" />

            {/* Top Antenna with Pulsing Beacon */}
            <rect x="47" y="3" width="6" height="12" rx="2" fill="url(#goldAccentGrad)" />
            <g className={shouldAnimate ? 'animate-robot-antenna' : ''} style={{ transformOrigin: '50px 4px' }}>
              <circle cx="50" cy="4" r="5" fill="#fef08a" stroke="#d4af37" strokeWidth="1.5" />
              <circle cx="50" cy="4" r="2" fill="#ffffff" />
            </g>

            {/* Main Circular Robot Head Helmet - Outer Ring reads as 'O' */}
            <circle 
              cx="50" 
              cy="50" 
              r="38" 
              fill="url(#goldInnerGrad)" 
              stroke="url(#goldHeadGrad)" 
              strokeWidth="7" 
            />

            {/* Inner Accent Ring */}
            <circle 
              cx="50" 
              cy="50" 
              r="30" 
              fill="#0c0c10" 
              stroke="#3a3528" 
              strokeWidth="1.5" 
              strokeDasharray="4 2" 
            />

            {/* Robot Visor / Eyes Area Screen */}
            <rect x="26" y="38" width="48" height="18" rx="7" fill="#18181f" stroke="url(#goldAccentGrad)" strokeWidth="1.5" />

            {/* Animated Glowing Robot Eyes (Blinking during pause) */}
            <g className={shouldAnimate ? 'animate-robot-blink' : ''} style={{ transformOrigin: '50px 47px' }}>
              {/* Left Eye */}
              <circle cx="38" cy="47" r="5" fill="url(#eyeGlowRadial)" />
              <circle cx="38" cy="47" r="2.5" fill="#ffffff" />
              <circle cx="38" cy="47" r="7" stroke="#d4af37" strokeWidth="0.75" strokeDasharray="2 2" fill="none" />

              {/* Right Eye */}
              <circle cx="62" cy="47" r="5" fill="url(#eyeGlowRadial)" />
              <circle cx="62" cy="47" r="2.5" fill="#ffffff" />
              <circle cx="62" cy="47" r="7" stroke="#d4af37" strokeWidth="0.75" strokeDasharray="2 2" fill="none" />
            </g>

            {/* Robotic Mouth Grille / Audio Wave Lines */}
            <line x1="36" y1="64" x2="64" y2="64" stroke="url(#goldAccentGrad)" strokeWidth="2" strokeLinecap="round" />
            <line x1="42" y1="69" x2="58" y2="69" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="46" y1="73" x2="54" y2="73" stroke="#854d0e" strokeWidth="1" strokeLinecap="round" />

            {/* Subtle Cyber Corner Marks */}
            <path d="M 22 28 L 22 22 L 28 22" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 78 28 L 78 22 L 72 22" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 22 72 L 22 78 L 28 78" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 78 72 L 78 78 L 72 78" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </span>
    </span>
  );
};
