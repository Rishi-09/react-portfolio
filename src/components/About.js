import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ABOUT_FEATURES } from '../constants';
const FeatureCard = ({ feature, variants }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    function handleMouseMove(e) {
        if (!cardRef.current)
            return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        cardRef.current.style.setProperty('--mouse-x', `${x}%`);
        cardRef.current.style.setProperty('--mouse-y', `${y}%`);
    }
    return (_jsxs(motion.div, { ref: cardRef, variants: variants, onMouseMove: handleMouseMove, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), className: "feature-card group relative rounded-3xl border border-[var(--border-color)] bg-[var(--surface-color)]/40 p-10 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3)]", style: {
            willChange: isHovered ? 'transform' : 'auto'
        }, children: [_jsx("div", { className: "feature-card-glare pointer-events-none absolute -inset-px rounded-3xl" }), _jsxs("div", { className: "relative z-10", children: [_jsx("h3", { className: "text-sm font-bold text-[var(--text-color)] mb-4 tracking-tight uppercase group-hover:text-[var(--accent-color)] transition-colors duration-300", children: feature.title }), _jsx("p", { className: "text-xs text-[var(--text-secondary)] leading-relaxed font-medium", children: feature.description })] }), _jsx("style", { children: `
        .feature-card {
          --mouse-x: 50%;
          --mouse-y: 50%;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                      border-color 0.5s ease,
                      background-color 0.5s ease,
                      box-shadow 0.3s ease;
        }

        .feature-card:hover {
          transform: scale(1.05) translateY(-10px);
          border-color: rgba(109, 124, 255, 0.3);
          background-color: rgba(var(--surface-color-rgb), 0.8);
          box-shadow: 0 20px 50px rgba(109, 124, 255, 0.1);
        }

        .feature-card-glare {
          opacity: 0;
          background: radial-gradient(
            350px circle at var(--mouse-x) var(--mouse-y),
            rgba(109, 124, 255, 0.1),
            transparent 80%
          );
          transition: opacity 0.3s ease;
        }

        .feature-card:hover .feature-card-glare {
          opacity: 1;
        }

        @media (prefers-reduced-motion: reduce) {
          .feature-card {
            transition: none;
          }
          .feature-card:hover {
            transform: none;
          }
        }
      ` })] }));
};
export const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };
    return (_jsx("div", { className: "flex w-full items-center justify-center px-6 md:px-12 lg:px-24", children: _jsxs("div", { className: "max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32", children: [_jsxs(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-100px" }, className: "space-y-16", children: [_jsxs(motion.div, { variants: itemVariants, className: "space-y-8", children: [_jsx("h2", { className: "text-[10px] font-bold text-[var(--accent-color)] uppercase tracking-[0.5em]", children: "Philosophy" }), _jsxs("p", { className: "text-4xl md:text-6xl font-semibold text-[var(--text-color)] leading-[1.05] tracking-tighter heading-glow", children: ["Systems that scale, ", _jsx("br", {}), _jsx("span", { className: "text-[var(--text-secondary)]", children: "Code that speaks." })] })] }), _jsxs(motion.div, { variants: itemVariants, className: "space-y-8 text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed max-w-xl", children: [_jsx("p", { children: "I bridge the gap between high-performance backends and intuitive user interfaces. My approach is defined by engineering maturity\u2014prioritizing clean code, security, and exceptional product taste." }), _jsxs("div", { className: "grid grid-cols-2 gap-12 pt-6 border-t border-[var(--border-color)]", children: [_jsxs("div", { children: [_jsx("p", { className: "text-4xl font-bold text-[var(--text-color)] tracking-tighter", children: "8.2" }), _jsx("p", { className: "text-[9px] uppercase tracking-[0.3em] font-bold text-[var(--accent-color)] mt-2", children: "CGPA Overall" })] }), _jsxs("div", { children: [_jsx("p", { className: "text-4xl font-bold text-[var(--text-color)] tracking-tighter", children: "3rd Sem" }), _jsx("p", { className: "text-[9px] uppercase tracking-[0.3em] font-bold text-[var(--accent-color)] mt-2", children: "B.Tech Cse" })] })] })] })] }), _jsx(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-100px" }, className: "grid grid-cols-1 md:grid-cols-2 gap-5 h-fit self-center", children: ABOUT_FEATURES.map((feature) => (_jsx(FeatureCard, { feature: feature, variants: itemVariants }, feature.title))) })] }) }));
};
