import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../constants';
import { Calendar, Briefcase, ChevronRight } from 'lucide-react';
import { Magnetic } from './Magnetic';

const ExperienceCard: React.FC<{ item: any; idx: number }> = ({ item, idx }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, delay: idx * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col md:flex-row items-center gap-12 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Timeline Dot */}
      <div className="timeline-dot absolute left-[20px] md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--accent-color)] z-20 hidden md:block" />

      <div className="w-full md:w-[45%]">
        <Magnetic strength={0.15}>
          <div 
            className="experience-card group relative rounded-[3rem] border border-[var(--border-color)] bg-[var(--surface-color)]/40 p-10 md:p-14 shadow-[0_30px_70px_rgba(0,0,0,0.5)] overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              willChange: isHovered ? 'transform, background-color, border-color' : 'auto'
            }}
          >
            <div className="experience-bar absolute top-0 left-0 w-2 h-full bg-[var(--accent-color)]/20" />
            
            <div className="space-y-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-[var(--accent-color)]">
                  <Briefcase className="h-5 w-5" />
                  <span className="text-[11px] font-black uppercase tracking-[0.3em]">{item.role}</span>
                </div>
                <h3 className="experience-title text-3xl md:text-5xl font-bold text-[var(--text-color)] tracking-tight leading-none">
                  {item.organization}
                </h3>
                <div className="flex items-center gap-3 text-[var(--text-secondary)]/50 mt-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em]">{item.period}</span>
                </div>
              </div>

              <ul className="space-y-5">
                {item.description.map((desc: string, dIdx: number) => (
                  <li key={dIdx} className="experience-item flex gap-4 text-base text-[var(--text-secondary)] leading-relaxed">
                    <ChevronRight className="experience-chevron h-4 w-4 text-[var(--accent-color)] mt-1.5 flex-shrink-0 opacity-40" />
                    {desc}
                  </li>
                ))}
              </ul>
            </div>

            <style >{`
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
            `}</style>
          </div>
        </Magnetic>
      </div>

      {/* Spacer for other side of timeline */}
      <div className="hidden md:block md:w-[45%]" />
    </motion.div>
  );
};

export const Experience: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl w-full mx-auto space-y-24">
        <div className="space-y-6 text-center lg:text-left">
          <h2 className="text-[10px] font-bold text-[var(--accent-color)] uppercase tracking-[0.5em]">Career Narrative</h2>
          <p className="text-6xl md:text-8xl font-semibold text-[var(--text-color)] tracking-tighter">Involvement</p>
        </div>

        <div className="relative space-y-12">
          {/* Vertical Center Line */}
          <div className="timeline-line absolute left-[20px] lg:left-1/2 top-0 bottom-0 w-px hidden md:block" />

          {EXPERIENCE.map((item, idx) => (
            <ExperienceCard key={item.organization} item={item} idx={idx} />
          ))}
        </div>
      </div>

      <style >{`
        .timeline-line {
          background: linear-gradient(
            to bottom,
            transparent,
            var(--border-color),
            transparent
          );
        }
      `}</style>
    </div>
  );
};