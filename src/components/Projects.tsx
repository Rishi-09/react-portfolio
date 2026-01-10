import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../constants';
import { type Project } from '../types';

const FILTERS = ['All', 'Web App', 'AI', 'Game'];

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="project-card group relative flex flex-col rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/30 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] h-full"
      style={{
        willChange: isHovered ? 'border-color, box-shadow' : 'auto'
      }}
    >
      {/* Dynamic Spotlight Effect */}
      <div className="project-spotlight pointer-events-none absolute -inset-px rounded-[2rem] z-0" />

      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden m-4 rounded-[1.5rem] bg-[var(--bg-color)] shadow-inner">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="project-image h-full w-full object-cover grayscale opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] via-transparent to-transparent opacity-60" />
        
        {/* Hover Overlay Actions */}
        <div className="project-actions absolute inset-0 flex items-center justify-center gap-4 opacity-0">
          {project.github && (
            <a 
              href={project.github} 
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-btn p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl"
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          <a 
            href={project.link} 
            target="_blank"
            rel="noopener noreferrer"
            className="project-action-btn p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-8 pt-2 flex flex-col flex-grow relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="project-divider h-px w-8 bg-[var(--border-color)]" />
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--accent-color)]/70">
            {project.category}
          </p>
        </div>
        
        <h3 className="project-title text-3xl font-bold text-[var(--text-color)] mb-4 tracking-tight">
          {project.title}
        </h3>

        <p className="project-description text-sm text-[var(--text-secondary)] leading-relaxed font-medium mb-8 line-clamp-2 opacity-70">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <span 
              key={tag} 
              className="project-tag text-[8px] font-bold uppercase tracking-widest text-[var(--text-secondary)]/40 px-3 py-1.5 rounded-full border border-[var(--border-color)] shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <style>{`
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
      `}</style>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

const FilterButton: React.FC<{
  filter: string;
  isActive: boolean;
  onClick: () => void;
}> = React.memo(({ filter, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`filter-btn px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] ${
        isActive ? 'active' : ''
      }`}
    >
      {filter}
      
      <style>{`
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
      `}</style>
    </button>
  );
});

FilterButton.displayName = 'FilterButton';

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(
    () => activeFilter === 'All' 
      ? PROJECTS 
      : PROJECTS.filter(p => p.category === activeFilter),
    [activeFilter]
  );

  return (
    <div className="flex w-full flex-col justify-center px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl w-full mx-auto space-y-20">
        <div className="reveal-child flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="space-y-6">
            <h2 className="text-[10px] font-bold text-[var(--accent-color)] uppercase tracking-[0.5em]">Curated Portfolio</h2>
            <p className="text-6xl md:text-8xl font-semibold text-[var(--text-color)] tracking-tighter leading-none">Selected Works</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {FILTERS.map((filter) => (
              <FilterButton
                key={filter}
                filter={filter}
                isActive={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10 min-h-[500px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};