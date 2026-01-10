import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../constants';
const FILTERS = ['All', 'Web App', 'AI', 'Game'];
const ProjectCard = React.memo(({ project }) => {
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
    return (_jsxs(motion.div, { ref: cardRef, onMouseMove: handleMouseMove, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "project-card group relative flex flex-col rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/30 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] h-full", style: {
            willChange: isHovered ? 'border-color, box-shadow' : 'auto'
        }, children: [_jsx("div", { className: "project-spotlight pointer-events-none absolute -inset-px rounded-[2rem] z-0" }), _jsxs("div", { className: "relative aspect-[16/10] overflow-hidden m-4 rounded-[1.5rem] bg-[var(--bg-color)] shadow-inner", children: [_jsx("img", { src: project.imageUrl, alt: project.title, loading: "lazy", decoding: "async", className: "project-image h-full w-full object-cover grayscale opacity-40" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] via-transparent to-transparent opacity-60" }), _jsxs("div", { className: "project-actions absolute inset-0 flex items-center justify-center gap-4 opacity-0", children: [project.github && (_jsx("a", { href: project.github, target: "_blank", rel: "noopener noreferrer", className: "project-action-btn p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl", children: _jsx(Github, { className: "h-5 w-5" }) })), _jsx("a", { href: project.link, target: "_blank", rel: "noopener noreferrer", className: "project-action-btn p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl", children: _jsx(ExternalLink, { className: "h-5 w-5" }) })] })] }), _jsxs("div", { className: "p-8 pt-2 flex flex-col flex-grow relative z-10", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("span", { className: "project-divider h-px w-8 bg-[var(--border-color)]" }), _jsx("p", { className: "text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--accent-color)]/70", children: project.category })] }), _jsx("h3", { className: "project-title text-3xl font-bold text-[var(--text-color)] mb-4 tracking-tight", children: project.title }), _jsx("p", { className: "project-description text-sm text-[var(--text-secondary)] leading-relaxed font-medium mb-8 line-clamp-2 opacity-70", children: project.description }), _jsx("div", { className: "mt-auto flex flex-wrap gap-2", children: project.tags.map((tag) => (_jsx("span", { className: "project-tag text-[8px] font-bold uppercase tracking-widest text-[var(--text-secondary)]/40 px-3 py-1.5 rounded-full border border-[var(--border-color)] shadow-sm", children: tag }, tag))) })] }), _jsx("style", { children: `
        .project-card {
          --mouse-x: 50%;
          --mouse-y: 50%;
          transition: border-color 0.5s ease, box-shadow 0.5s ease;
        }

        .project-card:hover {
          border-color: rgba(109, 124, 255, 0.3);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.6);
        }

        .project-spotlight {
          opacity: 0;
          background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            rgba(109, 124, 255, 0.08),
            transparent 80%
          );
          transition: opacity 0.3s ease;
        }

        .project-card:hover .project-spotlight {
          opacity: 1;
        }

        .project-image {
          transition: filter 0.7s ease, transform 0.7s ease, opacity 0.7s ease;
        }

        .project-card:hover .project-image {
          filter: grayscale(0);
          transform: scale(1.05);
          opacity: 1;
        }

        .project-actions {
          transition: opacity 0.3s ease;
        }

        .project-card:hover .project-actions {
          opacity: 1;
        }

        .project-action-btn {
          transition: all 0.3s ease;
        }

        .project-action-btn:hover {
          background-color: var(--accent-color);
          border-color: transparent;
          transform: scale(1.1);
        }

        .project-action-btn:active {
          transform: scale(0.9);
        }

        .project-divider {
          transition: background-color 0.5s ease;
        }

        .project-card:hover .project-divider {
          background-color: rgba(109, 124, 255, 0.5);
        }

        .project-title {
          transition: color 0.5s ease;
        }

        .project-card:hover .project-title {
          color: var(--accent-color);
        }

        .project-description {
          transition: opacity 0.5s ease;
        }

        .project-card:hover .project-description {
          opacity: 1;
        }

        .project-tag {
          transition: border-color 0.5s ease;
        }

        .project-card:hover .project-tag {
          border-color: rgba(109, 124, 255, 0.2);
        }

        @media (prefers-reduced-motion: reduce) {
          .project-card,
          .project-spotlight,
          .project-image,
          .project-actions,
          .project-action-btn,
          .project-divider,
          .project-title,
          .project-description,
          .project-tag {
            transition: none;
          }
          .project-card:hover .project-image {
            transform: none;
          }
          .project-action-btn:hover,
          .project-action-btn:active {
            transform: none;
          }
        }
      ` })] }));
});
ProjectCard.displayName = 'ProjectCard';
const FilterButton = React.memo(({ filter, isActive, onClick }) => {
    return (_jsxs("button", { onClick: onClick, className: `filter-btn px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] ${isActive ? 'active' : ''}`, children: [filter, _jsx("style", { children: `
        .filter-btn {
          transition: all 0.3s ease;
          background-color: rgba(var(--surface-color-rgb), 0.4);
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .filter-btn.active {
          background-color: var(--accent-color);
          color: white;
          border-color: transparent;
          box-shadow: 0 10px 30px rgba(109, 124, 255, 0.4);
        }

        .filter-btn:not(.active):hover {
          border-color: rgba(109, 124, 255, 0.3);
          color: var(--text-color);
        }

        @media (prefers-reduced-motion: reduce) {
          .filter-btn {
            transition: none;
          }
        }
      ` })] }));
});
FilterButton.displayName = 'FilterButton';
export const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const filteredProjects = useMemo(() => activeFilter === 'All'
        ? PROJECTS
        : PROJECTS.filter(p => p.category === activeFilter), [activeFilter]);
    return (_jsx("div", { className: "flex w-full flex-col justify-center px-6 md:px-12 lg:px-24", children: _jsxs("div", { className: "max-w-7xl w-full mx-auto space-y-20", children: [_jsxs("div", { className: "reveal-child flex flex-col md:flex-row md:items-end justify-between gap-12", children: [_jsxs("div", { className: "space-y-6", children: [_jsx("h2", { className: "text-[10px] font-bold text-[var(--accent-color)] uppercase tracking-[0.5em]", children: "Curated Portfolio" }), _jsx("p", { className: "text-6xl md:text-8xl font-semibold text-[var(--text-color)] tracking-tighter leading-none", children: "Selected Works" })] }), _jsx("div", { className: "flex flex-wrap gap-3", children: FILTERS.map((filter) => (_jsx(FilterButton, { filter: filter, isActive: activeFilter === filter, onClick: () => setActiveFilter(filter) }, filter))) })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10 min-h-[500px]", children: _jsx(AnimatePresence, { mode: "popLayout", children: filteredProjects.map((project) => (_jsx(motion.div, { layout: true, initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] }, className: "h-full", children: _jsx(ProjectCard, { project: project }) }, project.id))) }) })] }) }));
};
