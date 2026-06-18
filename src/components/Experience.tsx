import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../constants';
import { Calendar, MapPin, Briefcase, ChevronRight } from 'lucide-react';

const ExperienceCard: React.FC<{ item: any; idx: number; isLast: boolean }> = ({ item, idx, isLast }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-5 sm:gap-8"
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <div className="relative z-10 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[var(--accent-color)] ring-4 ring-[var(--bg-color)] shadow-[0_0_12px_rgba(109,124,255,0.6)]" />
        {!isLast && (
          <div className="flex-1 w-px bg-gradient-to-b from-[var(--accent-color)]/40 to-transparent mt-2 min-h-12" />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 pb-10 sm:pb-14">
        <div
          className="experience-card group relative rounded-2xl border border-[var(--border-color)] bg-[var(--surface-color)]/40 p-5 sm:p-7 md:p-9 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ willChange: isHovered ? 'border-color, background-color' : 'auto' }}
        >
          <div className="experience-bar absolute top-0 left-0 w-1 h-full bg-[var(--accent-color)]/20 rounded-l-2xl" />

          <div className="space-y-4 sm:space-y-5">
            {/* Badge + title + org */}
            <div className="flex flex-col gap-2.5">
              {item.type && (
                <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.3em] text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-3 py-1 rounded-full w-fit">
                  <Briefcase className="h-2.5 w-2.5" />
                  {item.type}
                </span>
              )}
              <h3 className="experience-title text-xl sm:text-2xl md:text-4xl font-bold text-[var(--text-color)] tracking-tight leading-tight">
                {item.role}
              </h3>
              <p className="text-sm sm:text-base md:text-lg font-semibold text-[var(--text-secondary)]">
                {item.organization}
              </p>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap gap-3 sm:gap-5 text-[var(--text-secondary)]/60">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em]">{item.period}</span>
              </div>
              {item.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em]">{item.location}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <ul className="space-y-2.5 sm:space-y-3 pt-1">
              {item.description.map((desc: string, dIdx: number) => (
                <li key={dIdx} className="experience-item flex gap-3 text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
                  <ChevronRight className="experience-chevron h-3.5 w-3.5 text-[var(--accent-color)] mt-0.5 flex-shrink-0 opacity-50" />
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Experience: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center px-4 sm:px-8 md:px-12 lg:px-24">
      <div className="max-w-3xl w-full mx-auto space-y-12 sm:space-y-16">
        {/* Heading */}
        <div className="space-y-4 text-center lg:text-left">
          <h2 className="text-[10px] font-bold text-[var(--accent-color)] uppercase tracking-[0.5em]">Career Timeline</h2>
          <p className="text-4xl sm:text-5xl md:text-7xl font-semibold text-[var(--text-color)] tracking-tighter">
            Work Experience
          </p>
        </div>

        {/* Timeline */}
        <div>
          {EXPERIENCE.map((item, idx) => (
            <ExperienceCard
              key={`${item.organization}-${idx}`}
              item={item}
              idx={idx}
              isLast={idx === EXPERIENCE.length - 1}
            />
          ))}
        </div>
      </div>

      <style>{`
        .experience-card {
          transition: background-color 0.5s ease, border-color 0.5s ease;
        }
        .experience-card:hover {
          background-color: rgba(var(--surface-color-rgb), 0.8);
          border-color: rgba(109, 124, 255, 0.35);
        }
        .experience-bar {
          transition: background-color 0.5s ease;
        }
        .experience-card:hover .experience-bar {
          background-color: var(--accent-color);
        }
        .experience-title {
          transition: color 0.4s ease;
        }
        .experience-card:hover .experience-title {
          color: var(--accent-color);
        }
        .experience-item {
          transition: color 0.4s ease;
        }
        .experience-card:hover .experience-item {
          color: rgba(var(--text-color-rgb), 0.9);
        }
        .experience-chevron {
          transition: opacity 0.4s ease;
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
      `}</style>
    </div>
  );
};
