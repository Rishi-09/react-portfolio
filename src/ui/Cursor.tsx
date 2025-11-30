import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Initial position outside screen to prevent jump
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    gsap.set(followerRef.current, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const moveCursor = (e: MouseEvent) => {
      // Direct update for the dot (instant)
      gsap.set(cursorRef.current, { x: e.clientX, y: e.clientY });
      
      // Smooth lag for the follower circle
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power3.out"
      });
    };

    const onHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.magnetic-trigger')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', onHoverStart);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', onHoverStart);
    };
  }, []);

  useEffect(() => {
    // Animate scale based on hover state
    if (isHovering) {
      gsap.to(followerRef.current, { scale: 3, opacity: 0.2, backgroundColor: '#22d3ee', duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 0, duration: 0.3 });
    } else {
      gsap.to(followerRef.current, { scale: 1, opacity: 1, backgroundColor: 'transparent', duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
    }
  }, [isHovering]);

  return (
    <>
      {/* Small Dot */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-9999 mix-blend-exclusion"
      />
      {/* Lagging Ring */}
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-cyan-400/50 rounded-full pointer-events-none z-9998"
      />
    </>
  );
};

export default Cursor;