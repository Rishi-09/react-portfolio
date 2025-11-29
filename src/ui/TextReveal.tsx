import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const TextReveal: React.FC<TextRevealProps> = ({ text, className = '', delay = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Select all word spans
      const words = containerRef.current?.querySelectorAll('.word');
      
      if (words) {
        gsap.fromTo(words, 
          { 
            y: 50, 
            opacity: 0, 
            rotationX: -45,
            filter: "blur(10px)"
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.1,
            delay: delay,
            ease: "power3.out"
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [text, delay]);

  // Split text into words
  const words = text.split(' ');

  return (
    <div ref={containerRef} className={`flex flex-wrap gap-x-3 gap-y-1 ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden perspective-1000">
           {/* Add a non-breaking space for layout but animate the word wrapper */}
           <span className="word inline-block transform-style-3d will-change-transform">
             {word}
           </span>
        </span>
      ))}
    </div>
  );
};

export default TextReveal;