import React from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type {HTMLMotionProps} from 'framer-motion'
interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(({ children, className = '', hoverEffect = false, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      whileHover={hoverEffect ? { y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" } : {}}
      className={`
        relative overflow-hidden
        bg-white/5 
        backdrop-blur-lg 
        border border-white/10 
        shadow-xl
        rounded-2xl
        ${className}
      `}
      {...props}
    >
      {/* Subtle sheen gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;