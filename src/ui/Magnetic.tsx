import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: React.ReactElement; // Restrict to single element for cloneElement
  className?: string;
}

const Magnetic: React.FC<MagneticProps> = ({ children }) => {
  const magnetic = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!magnetic.current) return;

    const xTo = gsap.quickTo(magnetic.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(magnetic.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = magnetic.current!.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * 0.35); // Strength of magnetic pull
      yTo(y * 0.35);
    };

    const mouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    magnetic.current.addEventListener("mousemove", mouseMove);
    magnetic.current.addEventListener("mouseleave", mouseLeave);

    return () => {
      if (magnetic.current) {
        magnetic.current.removeEventListener("mousemove", mouseMove);
        magnetic.current.removeEventListener("mouseleave", mouseLeave);
      }
    };
  }, []);

  // Clone the child to add the ref and class
  return React.cloneElement(children as React.ReactElement<any>, {
    ref: magnetic,
    className: `${(children.props as any).className || ''} magnetic-trigger inline-block`,
  });
};

export default Magnetic;