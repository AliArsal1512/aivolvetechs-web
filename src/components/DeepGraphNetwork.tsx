import React, { useEffect, useRef } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  layer: number; // 0: input, 1: hidden-1, 2: hidden-2, 3: output, 4: ambient
  glow: number;
  activation: number; // 0 to 1, pulses when signal arrives
  label?: string;
  connections: number[];
  phase: number;
}

interface SignalPacket {
  id: number;
  fromNodeId: number;
  toNodeId: number;
  progress: number; // 0 to 1
  speed: number;
  size: number;
  hue: string;
}

export const DeepGraphNetwork: React.FC<{ isIntroPlaying?: boolean }> = ({ isIntroPlaying = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    let isVisible = true;
    let isMobile = window.innerWidth < 768;

    // Mouse coordinates for subtle interactive field
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = container.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      container.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    }

    // IntersectionObserver to pause loop completely (0 CPU/GPU) when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          if (isVisible && !wasVisible) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(render);
          } else if (!isVisible && animationFrameId) {
            cancelAnimationFrame(animationFrameId);
          }
        });
      },
      { threshold: 0 }
    );
    observer.observe(container);

    // Initialize Network Topology
    let nodes: Node[] = [];
    let allEdges: Array<{ fromId: number; toId: number; midX: number; midY: number }> = [];
    let activeSignals: SignalPacket[] = [];
    let signalIdCounter = 0;

    const initNetwork = () => {
      nodes = [];
      allEdges = [];
      activeSignals = [];

      // Determine organic grid division for balanced spatial coverage without clustering
      const cols = isMobile ? 4 : 7;
      const rows = isMobile ? 6 : 5;
      const cellW = width / cols;
      const cellH = height / rows;
      const minDist = isMobile ? 55 : 85;

      const layerLabels = ['SYN-α', 'SYN-β', 'SYN-γ', 'SYN-δ', 'CORE-01', 'CORE-02', 'NODE-Ω'];
      let id = 0;

      // Stratified organic sampling: place 1 node per cell zone with non-uniform jitter
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          // Occasionally skip a corner/edge cell for natural negative space
          if ((c === 0 && r === 0 && Math.random() > 0.4) || 
              (c === cols - 1 && r === rows - 1 && Math.random() > 0.4) ||
              (Math.random() > (isMobile ? 0.88 : 0.92))) {
            continue;
          }

          // Organic jitter within cell bounds (with safe padding)
          const px = cellW * (c + 0.18 + Math.random() * 0.64);
          const py = cellH * (r + 0.18 + Math.random() * 0.64);

          // Check against existing nodes to prevent clustering
          let tooClose = false;
          for (const existing of nodes) {
            if (Math.hypot(existing.baseX - px, existing.baseY - py) < minDist) {
              tooClose = true;
              break;
            }
          }

          if (tooClose) continue;

          const isHub = Math.random() > 0.72;
          const layerVal = Math.min(3, Math.floor((c / cols) * 4));

          nodes.push({
            id: id++,
            x: px,
            y: py,
            baseX: px,
            baseY: py,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            radius: isHub ? (isMobile ? 3.2 : 4.4) : (isMobile ? 2.0 : 2.8),
            layer: layerVal,
            glow: isHub ? 0.9 : 0.35,
            activation: 0,
            label: isHub && !isMobile ? `${layerLabels[c % layerLabels.length]}` : undefined,
            connections: [],
            phase: Math.random() * Math.PI * 2,
          });
        }
      }

      // Compute synaptic interconnects: connect each node to 2-4 nearest neighbors within range
      const maxConnectDist = isMobile ? 150 : 220;

      nodes.forEach((node) => {
        // Find close candidate nodes sorted by distance
        const candidates = nodes
          .filter((n) => n.id !== node.id)
          .map((other) => ({
            other,
            dist: Math.hypot(node.baseX - other.baseX, node.baseY - other.baseY),
          }))
          .filter((c) => c.dist <= maxConnectDist)
          .sort((a, b) => a.dist - b.dist);

        // Connect to top 2-3 closest candidates
        const targetConnections = Math.min(candidates.length, isMobile ? 2 : 3);
        for (let i = 0; i < targetConnections; i++) {
          const target = candidates[i].other;
          if (!node.connections.includes(target.id)) {
            node.connections.push(target.id);
            allEdges.push({
              fromId: node.id,
              toId: target.id,
              midX: (node.baseX + target.baseX) / 2,
              midY: (node.baseY + target.baseY) / 2,
            });
          }
        }
      });
    };

    initNetwork();

    // Resize Handler
    const handleResize = () => {
      if (!canvas || !container) return;
      isMobile = window.innerWidth < 768;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
      initNetwork();
      if (isMobile) {
        cancelAnimationFrame(animationFrameId);
        render();
      } else {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Spawns a calm, smooth flow on an edge that is spatially distant from other active flows
    const trySpawnDistantFlow = () => {
      if (allEdges.length === 0) return;

      const maxSimultaneous = isMobile ? 2 : 4;
      if (activeSignals.length >= maxSimultaneous) return;

      const minSpatialDistance = isMobile ? 120 : 200;

      // Find edges whose midpoints and nodes are distant from all currently active signals
      const activeEndpoints = new Set<number>();
      const activeMidpoints: Array<{ x: number; y: number }> = [];

      activeSignals.forEach((s) => {
        activeEndpoints.add(s.fromNodeId);
        activeEndpoints.add(s.toNodeId);
        const fromN = nodes.find((n) => n.id === s.fromNodeId);
        const toN = nodes.find((n) => n.id === s.toNodeId);
        if (fromN && toN) {
          activeMidpoints.push({
            x: (fromN.x + toN.x) / 2,
            y: (fromN.y + toN.y) / 2,
          });
        }
      });

      // Filter eligible candidate edges
      const eligibleEdges = allEdges.filter((edge) => {
        // Avoid sharing immediate node endpoints
        if (activeEndpoints.has(edge.fromId) || activeEndpoints.has(edge.toId)) {
          return false;
        }

        const fromN = nodes.find((n) => n.id === edge.fromId);
        const toN = nodes.find((n) => n.id === edge.toId);
        if (!fromN || !toN) return false;

        const midX = (fromN.x + toN.x) / 2;
        const midY = (fromN.y + toN.y) / 2;

        // Verify distance from all other active signal midpoints
        for (const activeMid of activeMidpoints) {
          if (Math.hypot(midX - activeMid.x, midY - activeMid.y) < minSpatialDistance) {
            return false;
          }
        }

        return true;
      });

      if (eligibleEdges.length === 0) return;

      // Pick a random distant edge
      const chosenEdge = eligibleEdges[Math.floor(Math.random() * eligibleEdges.length)];
      const forward = Math.random() > 0.5;
      const fromId = forward ? chosenEdge.fromId : chosenEdge.toId;
      const toId = forward ? chosenEdge.toId : chosenEdge.fromId;

      // Serene, smooth cruising speed (~3.5 to 5 seconds per line)
      const speed = isMobile ? (0.0035 + Math.random() * 0.0015) : (0.0028 + Math.random() * 0.0014);

      activeSignals.push({
        id: signalIdCounter++,
        fromNodeId: fromId,
        toNodeId: toId,
        progress: 0,
        speed,
        size: isMobile ? 2.5 : 3.4,
        hue: Math.random() > 0.35 ? '#fef08a' : '#f59e0b',
      });
    };

    let tick = 0;

    // Animation Loop
    const render = () => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(render);

      tick++;

      // Smooth mouse interpolation (desktop only)
      if (!isMobile) {
        mouseX += (targetMouseX - mouseX) * 0.08;
        mouseY += (targetMouseY - mouseY) * 0.08;
      }

      ctx.clearRect(0, 0, width, height);

      // Periodically spawn spaced-apart flows to maintain gentle simultaneous signals
      const spawnInterval = isMobile ? 38 : 25;
      if (tick % spawnInterval === 0) {
        trySpawnDistantFlow();
      }

      // Update Node positions (harmonic organic drift & soft mouse push on desktop)
      nodes.forEach((node) => {
        node.phase += isMobile ? 0.008 : 0.010;
        const driftX = Math.sin(node.phase) * (isMobile ? 5 : 9);
        const driftY = Math.cos(node.phase * 0.8) * (isMobile ? 5 : 9);

        let targetX = node.baseX + driftX;
        let targetY = node.baseY + driftY;

        // Subtle interactive mouse repulsion (desktop only)
        if (!isMobile && mouseX > -500) {
          const dx = targetX - mouseX;
          const dy = targetY - mouseY;
          const dist = Math.hypot(dx, dy);
          const maxEffectDist = 180;
          if (dist < maxEffectDist) {
            const force = (1 - dist / maxEffectDist) * 28;
            targetX += (dx / dist) * force;
            targetY += (dy / dist) * force;
          }
        }

        node.x += (targetX - node.x) * 0.05;
        node.y += (targetY - node.y) * 0.05;

        // Decay activation pulse smoothly
        if (node.activation > 0) {
          node.activation *= 0.95;
          if (node.activation < 0.01) node.activation = 0;
        }
      });

      // 1. Draw Synaptic Graph Edges (Batch drawn for high performance)
      ctx.lineWidth = isMobile ? 0.75 : 0.9;

      nodes.forEach((node) => {
        node.connections.forEach((targetId) => {
          const targetNode = nodes.find((n) => n.id === targetId);
          if (!targetNode) return;

          const dx = targetNode.x - node.x;
          const dy = targetNode.y - node.y;
          const dist = Math.hypot(dx, dy);

          const maxDist = isMobile ? 150 : 220;
          const alphaBase = Math.max(0, 1 - dist / maxDist);
          if (alphaBase <= 0) return;

          const isCurrentActiveLine = activeSignals.some(
            (s) =>
              (s.fromNodeId === node.id && s.toNodeId === targetId) ||
              (s.fromNodeId === targetId && s.toNodeId === node.id)
          );

          const activeBoost = isCurrentActiveLine ? 0.35 : Math.max(node.activation, targetNode.activation) * 0.25;
          const alpha = Math.min(0.7, alphaBase * (isMobile ? 0.2 : 0.25) + activeBoost);

          ctx.strokeStyle = `rgba(212, 175, 55, ${alpha.toFixed(2)})`;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.stroke();
        });
      });

      // 2. Update & Draw the Active Flow Signals (Fast trailing photons without heavy gradients)
      for (let i = activeSignals.length - 1; i >= 0; i--) {
        const signal = activeSignals[i];
        signal.progress += signal.speed;

        const fromNode = nodes.find((n) => n.id === signal.fromNodeId);
        const toNode = nodes.find((n) => n.id === signal.toNodeId);

        if (!fromNode || !toNode || signal.progress >= 1) {
          if (toNode) {
            toNode.activation = 0.85;
          }
          activeSignals.splice(i, 1);
          continue;
        }

        const curX = fromNode.x + (toNode.x - fromNode.x) * signal.progress;
        const curY = fromNode.y + (toNode.y - fromNode.y) * signal.progress;

        const trailLength = 0.16;
        const trailStartProgress = Math.max(0, signal.progress - trailLength);
        const trailStartX = fromNode.x + (toNode.x - fromNode.x) * trailStartProgress;
        const trailStartY = fromNode.y + (toNode.y - fromNode.y) * trailStartProgress;

        // Trail Line
        ctx.strokeStyle = 'rgba(254, 240, 138, 0.7)';
        ctx.lineWidth = isMobile ? 1.5 : 2;
        ctx.beginPath();
        ctx.moveTo(trailStartX, trailStartY);
        ctx.lineTo(curX, curY);
        ctx.stroke();

        // Outer Glow Ring (GPU friendly replacement for shadowBlur)
        ctx.fillStyle = 'rgba(252, 211, 77, 0.25)';
        ctx.beginPath();
        ctx.arc(curX, curY, signal.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Glowing Signal Photon Head
        ctx.fillStyle = signal.hue;
        ctx.beginPath();
        ctx.arc(curX, curY, signal.size, 0, Math.PI * 2);
        ctx.fill();

        // Core bright center
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(curX, curY, signal.size * 0.45, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Draw Nodes (Hubs, telemetry rings, and activation ripples)
      nodes.forEach((node) => {
        const effectiveRadius = node.radius + node.activation * 3;

        // Draw activation ripple ring when triggered
        if (node.activation > 0.1) {
          const rippleRadius = node.radius + (1 - node.activation) * 20;
          ctx.strokeStyle = `rgba(254, 240, 138, ${(node.activation * 0.6).toFixed(2)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(node.x, node.y, rippleRadius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw orbital telemetry dashed ring for hub nodes on desktop
        if (node.glow > 0.7 && !isMobile) {
          ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
          ctx.lineWidth = 0.8;
          ctx.setLineDash([3, 4]);
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2.8, (tick * 0.01) + node.phase, (tick * 0.01) + node.phase + Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Soft outer ambient halo
        ctx.fillStyle = node.activation > 0.2 ? 'rgba(254, 240, 138, 0.35)' : 'rgba(212, 175, 55, 0.18)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, effectiveRadius * 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Node Core
        ctx.fillStyle = node.activation > 0.2 ? '#ffffff' : (node.glow > 0.7 ? '#fef08a' : '#d4af37');
        ctx.beginPath();
        ctx.arc(node.x, node.y, effectiveRadius, 0, Math.PI * 2);
        ctx.fill();

        // Node Gold Border
        ctx.strokeStyle = 'rgba(254, 240, 138, 0.85)';
        ctx.lineWidth = 0.75;
        ctx.stroke();

        // Telemetry Label for Hub Nodes on Desktop
        if (node.label && !isMobile) {
          ctx.font = '8px "Poppins", monospace';
          ctx.fillStyle = 'rgba(254, 240, 138, 0.55)';
          ctx.fillText(node.label, node.x + node.radius + 6, node.y + 3);
        }

        ctx.restore();
      });

      // 4. Subtle Ambient Flowing Data Coordinate Watermarks in Corners
      if (!isMobile && tick % 2 === 0) {
        ctx.save();
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(212, 175, 55, 0.18)';
        ctx.fillText(`GRAPH_EVO_SYNC // SYNAPSES: ${nodes.reduce((acc, n) => acc + n.connections.length, 0)}`, width - 260, height - 24);
        ctx.fillText(`TOPOLOGY: ADAPTIVE_GRAPH_NEURAL_NET [L_4]`, 32, height - 24);
        ctx.restore();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-1000 ${
        isIntroPlaying ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Soft Vignette Overlay so Hero typography remains 100% legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07070a]/85 via-[#07070a]/40 to-[#07070a]/75 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070a]/60 via-transparent to-[#07070a] pointer-events-none" />
    </div>
  );
};
