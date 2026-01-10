
import React, { useEffect, useRef } from 'react';

export const BackgroundBeams: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const mouse = { x: w / 2, y: h / 2, targetX: w / 2, targetY: h / 2 };
    let frame = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    interface Point {
      x: number;
      y: number;
      vx: number;
      vy: number;
    }

    class SilkLine {
      points: Point[];
      color: string;
      opacity: number;
      thickness: number;
      segmentCount: number;

      constructor(yBase: number, color: string, opacity: number, thickness: number) {
        this.color = color;
        this.opacity = opacity;
        this.thickness = thickness;
        this.segmentCount = 12; // Fewer points for smoother curves
        this.points = [];

        for (let i = 0; i < this.segmentCount; i++) {
          this.points.push({
            x: (w / (this.segmentCount - 1)) * i,
            y: yBase,
            vx: 0,
            vy: 0,
          });
        }
      }

      update() {
        // Smoothly follow the target mouse position
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        this.points.forEach((p, i) => {
          // Autonomous movement (floating)
          const time = frame * 0.005;
          const noise = Math.sin(time + i * 0.5) * 2;
          
          // Distance from mouse
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const force = Math.max(0, (400 - dist) / 400);

          // Apply forces: Noise + Mouse repulsion/attraction
          p.vy += noise * 0.01;
          p.vy += (mouse.y - p.y) * force * 0.002;
          
          // Damping and limit
          p.vx *= 0.95;
          p.vy *= 0.95;
          
          p.y += p.vy;
          
          // Edge constraints (soft)
          if (p.y < 0) p.vy += 0.1;
          if (p.y > h) p.vy -= 0.1;
        });
      }

      draw() {
        ctx!.beginPath();
        ctx!.moveTo(this.points[0].x, this.points[0].y);

        // Render using Quadratic Curves for "Silk" smoothness
        for (let i = 0; i < this.points.length - 1; i++) {
          const p1 = this.points[i];
          const p2 = this.points[i + 1];
          const xc = (p1.x + p2.x) / 2;
          const yc = (p1.y + p2.y) / 2;
          ctx!.quadraticCurveTo(p1.x, p1.y, xc, yc);
        }

        const gradient = ctx!.createLinearGradient(0, 0, w, 0);
        gradient.addColorStop(0, `rgba(${this.color}, 0)`);
        gradient.addColorStop(0.3, `rgba(${this.color}, ${this.opacity})`);
        gradient.addColorStop(0.7, `rgba(${this.color}, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(${this.color}, 0)`);

        ctx!.strokeStyle = gradient;
        ctx!.lineWidth = this.thickness;
        ctx!.lineCap = 'round';
        ctx!.stroke();
      }
    }

    const colors = [
      '109, 124, 255', // Accent Blue
      '160, 160, 160', // Silver
      '200, 200, 200', // Platinum
      '80, 80, 80',    // Slate
    ];

    const lines = Array.from({ length: 12 }, (_, i) => {
      const color = colors[i % colors.length];
      const opacity = 0.03 + Math.random() * 0.1;
      const thickness = 0.5 + Math.random() * 1.5;
      return new SilkLine(h * (0.1 + (i * 0.08)), color, opacity, thickness);
    });

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);

      // Unified ambient background glow
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, w);
      grad.addColorStop(0, 'rgba(109, 124, 255, 0.015)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      lines.forEach(line => {
        line.update();
        line.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-100"
      style={{ filter: 'blur(0.5px)' }}
    />
  );
};
