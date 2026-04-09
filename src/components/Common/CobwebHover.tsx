import React, { useEffect, useRef } from "react";
import { useHoverEffect } from "@/contexts/HoverEffectContext";

// A lightweight canvas overlay that spawns short-lived nodes at the mouse
// position and draws connecting lines between nearby nodes to create a "cobweb" effect.

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 0..1
  size: number;
};

const CobwebHover: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastMoveRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ vx: 0, vy: 0 });
  const { isEnabled } = useHoverEffect();

  useEffect(() => {
    if (!isEnabled) {
      // Clear particles when disabled
      particlesRef.current = [];
      return;
    }

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      // size to the viewport for lighter memory use
      canvas.width = Math.max(320, window.innerWidth) * dpr;
      canvas.height = Math.max(240, window.innerHeight) * dpr;
      canvas.style.width = `${Math.max(320, window.innerWidth)}px`;
      canvas.style.height = `${Math.max(240, window.innerHeight)}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Spawn particles based on acceleration intensity
    const spawnParticles = (x: number, y: number, intensity: number) => {
      // Scale particle count with intensity (1-8 particles)
      const baseCount = 2;
      const count = Math.min(8, Math.floor(baseCount + intensity * 6));
      
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        // Scale speed and size with intensity
        const speed = (0.3 + Math.random() * 1.1) * (0.5 + intensity * 1.5);
        const size = (0.7 + Math.random() * 1.2) * (0.8 + intensity * 0.7);
        
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          size,
        });
      }
    };

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = now - lastMoveRef.current;
      
      if (dt < 10) return; // 10ms throttle
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate velocity and acceleration
      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const currentVelocity = distance / (dt || 1);
      
      // Smooth velocity calculation
      velocityRef.current.vx = velocityRef.current.vx * 0.7 + currentVelocity * 0.3;
      
      // Normalize intensity (0 to 1, capped at reasonable speed)
      const intensity = Math.min(1, velocityRef.current.vx / 20);
      
      spawnParticles(x, y, intensity);
      
      lastPosRef.current = { x, y };
      lastMoveRef.current = now;
    };

    // touch support
    const onTouch = (e: TouchEvent) => {
      const now = performance.now();
      const dt = now - lastMoveRef.current;
      
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      if (!t) return;
      
      const x = t.clientX - rect.left;
      const y = t.clientY - rect.top;
      
      // Calculate velocity for touch
      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const currentVelocity = distance / (dt || 1);
      
      velocityRef.current.vx = velocityRef.current.vx * 0.7 + currentVelocity * 0.3;
      const intensity = Math.min(1, velocityRef.current.vx / 20);
      
      spawnParticles(x, y, intensity);
      
      lastPosRef.current = { x, y };
      lastMoveRef.current = now;
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("touchmove", onTouch, { passive: true });

    const tick = () => {
      // trails fade quickly so nothing is permanent
      // Increase fade rate so silhouettes/trails disappear in ~2 seconds
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      // update
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life -= 0.29 / 80; // ~0.0036 per frame at 80fps, gone in ~3.5s
        if (p.life <= 0) particles.splice(i, 1);
      }

      // draw connections (cobweb) - fade with life
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 1200) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / 32) * Math.min(a.life, b.life) * 0.32;
            if (alpha > 0.01) {
              ctx.strokeStyle = `rgba(120,180,255,${alpha.toFixed(3)})`;
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      // draw nodes (fade with life)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const alpha = Math.max(0, Math.min(1, p.life)) * 0.7;
        ctx.fillStyle = `rgba(120,180,255,${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("touchmove", onTouch);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isEnabled]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 40,
        mixBlendMode: "screen",
        opacity: isEnabled ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    />
  );
};

export default CobwebHover;
