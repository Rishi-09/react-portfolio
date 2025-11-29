import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Updated Spring configuration: drastically increased stiffness and damping for a snappy, low-latency feel
  const springConfig = { damping: 50, stiffness: 2000, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Check for hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target is a link, button, or explicitly marked
      const isInteractable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.magnetic-trigger');

      setIsHovering(!!isInteractable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Dot (Follows immediately) */}
      <motion.div 
        className="custom-cursor fixed top-0 left-0 w-2.5 h-2.5 bg-cyan-400 rounded-full pointer-events-none z-9999 mix-blend-difference"
        style={{ 
          x: cursorX, 
          y: cursorY, 
          translateX: '-50%', 
          translateY: '-50%' 
        }}
      />
      
      {/* Ring (Follows with very tight spring physics) */}
      <motion.div 
        className="custom-cursor fixed top-0 left-0 w-8 h-8 border border-cyan-400/50 rounded-full pointer-events-none z-9998"
        style={{ 
          x: cursorXSpring, 
          y: cursorYSpring, 
          translateX: '-50%', 
          translateY: '-50%' 
        }}
        animate={{ 
          scale: isClicking ? 0.8 : isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'rgba(34, 211, 238, 0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(34, 211, 238, 0.8)' : 'rgba(34, 211, 238, 0.3)',
          mixBlendMode: isHovering ? 'screen' : 'normal'
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </>
  );
};

export default CustomCursor;