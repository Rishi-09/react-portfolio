import React, { useRef, useEffect } from "react";

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
  scale?: number;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 0.45,
  scale = 1.02,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const posRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    scale: 1,
    targetScale: 1,
  });
  const rafRef = useRef<number | null>(null);
  const isActiveRef = useRef(false);

  useEffect(() => {
    const animate = () => {
      const pos = posRef.current;

      const dx = pos.targetX - pos.x;
      const dy = pos.targetY - pos.y;
      const dScale = pos.targetScale - pos.scale;

      pos.x += dx * 0.15;
      pos.y += dy * 0.15;
      pos.scale += dScale * 0.18;

      if (ref.current) {
        ref.current.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`;
      }

      if (
        isActiveRef.current ||
        Math.abs(dx) > 0.01 ||
        Math.abs(dy) > 0.01 ||
        Math.abs(dScale) > 0.001
      ) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        rafRef.current = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      posRef.current.targetX = (e.clientX - centerX) * strength;
      posRef.current.targetY = (e.clientY - centerY) * strength;
      posRef.current.targetScale = scale;

      isActiveRef.current = true;

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const handleMouseLeave = () => {
      posRef.current.targetX = 0;
      posRef.current.targetY = 0;
      posRef.current.targetScale = 1;
      isActiveRef.current = false;

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const element = ref.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove, { passive: true });
      element.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [strength, scale]);

  /**
   * Strip invalid DOM props (like `jsx`) from children
   */
  const safeChild = React.cloneElement(children, {
    ...(children.props?.jsx ? { jsx: undefined } : {}),
  });

  return (
    <div
      ref={ref}
      className="magnetic-target inline-block w-full"
      style={{ willChange: "transform" }}
    >
      {safeChild}
    </div>
  );
};
