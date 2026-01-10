import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../constants';
import { Calendar, Briefcase, ChevronRight } from 'lucide-react';
import { Magnetic } from './Magnetic';
const ExperienceCard = ({ item, idx }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-100px" }, transition: { duration: 1.2, delay: idx * 0.2, ease: [0.22, 1, 0.36, 1] }, className: `relative flex flex-col md:flex-row items-center gap-12 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`, children: [_jsx("div", { className: "timeline-dot absolute left-[20px] md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--accent-color)] z-20 hidden md:block" }), _jsx("div", { className: "w-full md:w-[45%]", children: _jsx(Magnetic, { strength: 0.15, children: _jsxs("div", { className: "experience-card group relative rounded-[3rem] border border-[var(--border-color)] bg-[var(--surface-color)]/40 p-10 md:p-14 shadow-[0_30px_70px_rgba(0,0,0,0.5)] overflow-hidden", onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), style: {
                            willChange: isHovered ? 'transform, background-color, border-color' : 'auto'
                        }, children: [_jsx("div", { className: "experience-bar absolute top-0 left-0 w-2 h-full bg-[var(--accent-color)]/20" }), _jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs("div", { className: "flex items-center gap-3 text-[var(--accent-color)]", children: [_jsx(Briefcase, { className: "h-5 w-5" }), _jsx("span", { className: "text-[11px] font-black uppercase tracking-[0.3em]", children: item.role })] }), _jsx("h3", { className: "experience-title text-3xl md:text-5xl font-bold text-[var(--text-color)] tracking-tight leading-none", children: item.organization }), _jsxs("div", { className: "flex items-center gap-3 text-[var(--text-secondary)]/50 mt-2", children: [_jsx(Calendar, { className: "h-4 w-4" }), _jsx("span", { className: "text-xs font-bold uppercase tracking-[0.2em]", children: item.period })] })] }), _jsx("ul", { className: "space-y-5", children: item.description.map((desc, dIdx) => (_jsxs("li", { className: "experience-item flex gap-4 text-base text-[var(--text-secondary)] leading-relaxed", children: [_jsx(ChevronRight, { className: "experience-chevron h-4 w-4 text-[var(--accent-color)] mt-1.5 flex-shrink-0 opacity-40" }), desc] }, dIdx))) })] }), _jsx("style", { children: `
              .timeline-dot {
                box-shadow: 0 0 15px rgba(109, 124, 255, 0.5);
              }

              .experience-card {
                transition: background-color 0.7s ease,
                           border-color 0.7s ease;
              }

              .experience-card:hover {
                background-color: rgba(var(--surface-color-rgb), 0.8);
                border-color: rgba(109, 124, 255, 0.4);
              }

              .experience-bar {
                transition: background-color 0.7s ease;
              }

              .experience-card:hover .experience-bar {
                background-color: var(--accent-color);
              }

              .experience-title {
                transition: color 0.5s ease;
              }

              .experience-card:hover .experience-title {
                color: var(--accent-color);
              }

              .experience-item {
                transition: color 0.5s ease;
              }

              .experience-card:hover .experience-item {
                color: rgba(var(--text-color-rgb), 0.9);
              }

              .experience-chevron {
                transition: opacity 0.5s ease;
              }

              .experience-card:hover .experience-chevron {
                opacity: 1;
              }

              @media (prefers-reduced-motion: reduce) {
                .experience-card,
                .experience-bar,
                .experience-title,
                .experience-item,
                .experience-chevron {
                  transition: none;
                }
              }
            ` })] }) }) }), _jsx("div", { className: "hidden md:block md:w-[45%]" })] }));
};
export const Experience = () => {
    return (_jsxs("div", { className: "flex h-full w-full items-center justify-center px-6 md:px-12 lg:px-24", children: [_jsxs("div", { className: "max-w-6xl w-full mx-auto space-y-24", children: [_jsxs("div", { className: "space-y-6 text-center lg:text-left", children: [_jsx("h2", { className: "text-[10px] font-bold text-[var(--accent-color)] uppercase tracking-[0.5em]", children: "Career Narrative" }), _jsx("p", { className: "text-6xl md:text-8xl font-semibold text-[var(--text-color)] tracking-tighter", children: "Involvement" })] }), _jsxs("div", { className: "relative space-y-12", children: [_jsx("div", { className: "timeline-line absolute left-[20px] lg:left-1/2 top-0 bottom-0 w-px hidden md:block" }), EXPERIENCE.map((item, idx) => (_jsx(ExperienceCard, { item: item, idx: idx }, item.organization)))] })] }), _jsx("style", { children: `
        .timeline-line {
          background: linear-gradient(
            to bottom,
            transparent,
            var(--border-color),
            transparent
          );
        }
      ` })] }));
};
