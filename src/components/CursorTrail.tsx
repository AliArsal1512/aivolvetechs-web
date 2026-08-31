import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const CursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; prevX: number; prevY: number }>({
    x: -200,
    y: -200,
    prevX: -200,
    prevY: -200,
  });
  const particlesRef = useRef<Particle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const isRunningRef = useRef<boolean>(false);
  const lastEmitTimeRef = useRef<number>(0);

  // Soft subtle golden tones for desktop cursor trail
  const colors = [
    'rgba(212, 175, 55, ',  // royal gold
    'rgba(252, 211, 77, ',  // soft warm gold
    'rgba(202, 138, 4, ',   // amber gold
    'rgba(254, 240, 138, ', // pale champagne
  ];

  useEffect(() => {
    // Only run cursor trail on fine pointer devices (Desktop mice/trackpads)
    // Completely disable on mobile/touch screens to ensure 100% fluid mobile scrolling with 0 CPU overhead
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const maxParticles = 40;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Wake-on-Demand Animation Loop (0% CPU when mouse is idle)
    const startRenderLoop = () => {
      if (isRunningRef.current) return;
      isRunningRef.current = true;
      render();
    };

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      let hasActiveElements = false;

      // 1. Subtle Expanding Ring Pulse on Click
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += 0.8;
        r.alpha -= 0.015;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        hasActiveElements = true;
        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212, 175, 55, ${r.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      // 2. Soft Ambient Golden Dust
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        hasActiveElements = true;
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
        ctx.restore();
      }

      if (hasActiveElements) {
        animFrameIdRef.current = requestAnimationFrame(render);
      } else {
        isRunningRef.current = false;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    const spawnSubtleDust = (x: number, y: number, count = 1) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.2 + Math.random() * 0.5;
        const size = 1.0 + Math.random() * 1.5;
        const colorBase = colors[Math.floor(Math.random() * colors.length)];

        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.1,
          size,
          alpha: 0.22 + Math.random() * 0.15,
          decay: 0.01 + Math.random() * 0.01,
          color: colorBase,
        });
      }

      if (particlesRef.current.length > maxParticles) {
        particlesRef.current.splice(0, particlesRef.current.length - maxParticles);
      }

      startRenderLoop();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const prevX = mouseRef.current.x;
      const prevY = mouseRef.current.y;

      mouseRef.current = {
        x: clientX,
        y: clientY,
        prevX,
        prevY,
      };

      const now = performance.now();
      if (now - lastEmitTimeRef.current > 45) {
        const dist = Math.hypot(clientX - prevX, clientY - prevY);
        if (dist > 12) {
          spawnSubtleDust(clientX, clientY, 1);
          lastEmitTimeRef.current = now;
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 30,
        alpha: 0.18,
      });
      spawnSubtleDust(e.clientX, e.clientY, 2);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-10 opacity-60 hidden md:block"
    />
  );
};
