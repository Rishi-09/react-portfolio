import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LiquidBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Refs for animation state to avoid closure staleness and re-renders
  const state = useRef({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    orbs: [] as { x: number; y: number; vx: number; vy: number; radius: number; color: string }[],
    clickEffect: { x: 0, y: 0, radius: 0, active: false }
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: false }); // alpha: false for performance since we draw a bg
    if (!ctx) return;

    // Initialize Canvas & State
    const init = () => {
      state.current.width = window.innerWidth;
      state.current.height = window.innerHeight;
      canvas.width = state.current.width;
      canvas.height = state.current.height;

      // Create Floating Orbs (The "Liquid")
      const colors = ['#06b6d4', '#8b5cf6', '#3b82f6', '#ec4899']; // Cyan, Violet, Blue, Pink
      state.current.orbs = Array.from({ length: 5 }).map(() => ({
        x: Math.random() * state.current.width,
        y: Math.random() * state.current.height,
        vx: (Math.random() - 0.5) * 0.8, // Smooth, slow drift velocity
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 300 + 200, // Large soft shapes
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
    };
    
    init();
    window.addEventListener('resize', init);

    // Mouse Tracking (Direct update for zero lag)
    const onMouseMove = (e: MouseEvent) => {
      state.current.mouseX = e.clientX;
      state.current.mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Click Interaction (Pulse)
    const onClick = (e: MouseEvent) => {
        state.current.clickEffect = {
            x: e.clientX,
            y: e.clientY,
            radius: 0,
            active: true
        };
        
        // Animate the pulse radius directly
        gsap.to(state.current.clickEffect, {
            radius: 600,
            duration: 1.2,
            ease: "power2.out",
            onComplete: () => { state.current.clickEffect.active = false; }
        });
    };
    window.addEventListener('click', onClick);

    // Main Animation Loop
    const render = () => {
      const { width, height, orbs, mouseX, mouseY, clickEffect } = state.current;
      
      // 1. Clear with base color
      ctx.fillStyle = '#020617'; // Slate-950 (Darker Theme)
      ctx.fillRect(0, 0, width, height);
      
      // 2. Set Blur for "Liquid" effect
      // High blur simulates the fluid gradient look efficiently on Canvas
      ctx.filter = 'blur(80px)';
      ctx.globalCompositeOperation = 'screen'; // Blends colors nicely

      // 3. Draw Floating Orbs
      orbs.forEach(orb => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce off edges to keep them on screen
        if (orb.x < -orb.radius) orb.vx = Math.abs(orb.vx);
        if (orb.x > width + orb.radius) orb.vx = -Math.abs(orb.vx);
        if (orb.y < -orb.radius) orb.vy = Math.abs(orb.vy);
        if (orb.y > height + orb.radius) orb.vy = -Math.abs(orb.vy);

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = orb.color;
        ctx.globalAlpha = 0.4; // Soft transparency
        ctx.fill();
        ctx.closePath();
      });

      // 4. Draw Mouse Spotlight
      // A brighter, more focused orb following the mouse
      if (mouseX !== 0 && mouseY !== 0) {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 180, 0, Math.PI * 2);
        ctx.fillStyle = '#22d3ee'; // Cyan highlight
        ctx.globalAlpha = 0.25;
        ctx.fill();
        ctx.closePath();
      }

      // 5. Draw Click Ripple
      if (clickEffect.active) {
          ctx.beginPath();
          ctx.arc(clickEffect.x, clickEffect.y, clickEffect.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          // Fade out as it expands
          ctx.globalAlpha = 0.15 * (1 - clickEffect.radius / 600); 
          ctx.fill();
          ctx.closePath();
      }

      // Reset Context settings for next frame
      ctx.globalAlpha = 1;
      ctx.filter = 'none';
      ctx.globalCompositeOperation = 'source-over';
    };

    // Use GSAP Ticker for efficient rAF loop
    gsap.ticker.add(render);

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      gsap.ticker.remove(render);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-slate-950">
      <canvas ref={canvasRef} className="block w-full h-full" />
      {/* Texture Overlay for that premium grainy look */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
    </div>
  );
};

export default LiquidBackground;