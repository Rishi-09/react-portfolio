import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence,type Variants } from 'framer-motion';
import { SKILL_CATEGORIES } from '../constants';
import { ChevronDown, Code2 } from 'lucide-react';
import { Magnetic } from './Magnetic';

const skillToIcon: Record<string, string> = {
  // Frontend
  "HTML": "html5",
  "CSS": "css3",
  "React": "react",
  "Next.js": "nextdotjs",
  "TypeScript": "typescript",
  "Tailwind CSS": "tailwindcss",
  "Bootstrap": "bootstrap",

  // Backend
  "Node.js": "nodedotjs",
  "Python": "python",
  "MongoDB": "mongodb",
  "REST API": "fastapi",        // closest semantic match
  "express.js": "express",
  "JWT": "jsonwebtokens",

  // Core & Languages
  "JavaScript": "javascript",
  "Java": "java",
  "C++": "cplusplus",
  "System Design": "blueprint", // best visual metaphor

  // Tools
  "Git": "git",
  "Github": "github",
  "Vercel": "vercel",
  "Postman": "postman",
};


const INITIAL_SKILL_COUNT = 12;

const SkillCard: React.FC<{ skill: string }> = React.memo(({ skill }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Magnetic strength={0.45} scale={1.05}>
      <div className="skill-card flex flex-col items-center justify-center gap-4 p-8 rounded-[2.5rem] border border-[var(--border-color)] bg-[var(--surface-color)]/50 group cursor-default w-full h-full shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
        <div className="relative h-10 w-10 flex items-center justify-center">
          {!imageError ? (
            <img 
              src={`https://cdn.simpleicons.org/${skillToIcon[skill] || 'code'}/6D7CFF`} 
              alt={skill}
              loading="lazy"
              decoding="async"
              className="skill-icon h-full w-full grayscale opacity-40 " 
              onError={() => setImageError(true)}
            />
          ) : (
            <Code2 className="skill-fallback h-8 w-8 text-[var(--accent-color)] opacity-40" />
          )}
        </div>
        <span className="skill-name text-[10px] font-black uppercase tracking-[0.25em] text-[var(--text-secondary)] text-center">
          {skill}
        </span>

        <style>{`
          .skill-card {
            transition: border-color 0.5s ease, box-shadow 0.5s ease;
          }

          .skill-card:hover {
            border-color: rgba(109, 124, 255, 0.6);
            box-shadow: 0 0 40px rgba(109, 124, 255, 0.15);
          }

          .skill-icon,
          .skill-fallback {
            transition: all 0.7s ease;
          }

          .skill-card:hover .skill-icon,
          .skill-card:hover .skill-fallback {
            filter: grayscale(0);
            opacity: 1;
            transform: scale(1.25);
          }

          .skill-name {
            transition: color 0.5s ease;
          }

          .skill-card:hover .skill-name {
            color: var(--text-color);
          }

          @media (prefers-reduced-motion: reduce) {
            .skill-card,
            .skill-icon,
            .skill-fallback,
            .skill-name {
              transition: none;
            }
            .skill-card:hover .skill-icon,
            .skill-card:hover .skill-fallback {
              transform: none;
            }
          }
        `}</style>
      </div>
    </Magnetic>
  );
});

SkillCard.displayName = 'SkillCard';

export const Skills: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const uniqueSkills = useMemo(() => {
    const all = SKILL_CATEGORIES.flatMap(cat => cat.skills);
    return Array.from(new Set(all));
  }, []);

  const displayedSkills = useMemo(
    () => showAll ? uniqueSkills : uniqueSkills.slice(0, INITIAL_SKILL_COUNT),
    [showAll, uniqueSkills]
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: 'blur(0px)',
      transition: { 
        type: 'spring', 
        stiffness: 260, 
        damping: 25 
      } 
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 10,
      filter: 'blur(5px)',
      transition: { duration: 0.3, ease: 'circOut' }
    }
  };

  const layoutTransition = {
    type: "spring",
    stiffness: 180,
    damping: 28,
    mass: 1
  } as const;

  return (
    <div className="w-full px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl w-full mx-auto">
        <div className="reveal-child mb-16 text-center lg:text-left">
          <h2 className="text-[10px] font-bold text-[var(--accent-color)] uppercase tracking-[0.5em] mb-4">Core Competencies</h2>
          <p className="text-6xl md:text-8xl font-semibold text-[var(--text-color)] tracking-tighter">Tech Stack</p>
        </div>

        <motion.div 
          layout
          transition={layoutTransition}
          className="relative rounded-[3.5rem] border border-[var(--border-color)] bg-[var(--surface-color)]/40 p-10 md:p-16 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
        >
          <motion.div 
            layout
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {displayedSkills.map((skill) => (
                <motion.div
                  key={skill}
                  variants={itemVariants}
                  layout
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  transition={layoutTransition}
                  className="h-full"
                >
                  <SkillCard skill={skill} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {uniqueSkills.length > INITIAL_SKILL_COUNT && (
            <motion.div layout transition={layoutTransition} className="mt-16 flex justify-center">
              <button
                data-cursor-ignore
                onClick={() => setShowAll(!showAll)}
                className="expand-button group flex items-center gap-5 px-12 py-6 rounded-2xl bg-[var(--text-color)] text-[var(--bg-color)] text-[11px] font-black uppercase tracking-[0.4em] relative z-50 shadow-lg"
              >
                {showAll ? "Consolidate Stack" : "Explore More Skills"}
                <motion.div
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={layoutTransition}
                >
                  <ChevronDown size={16} />
                </motion.div>

                <style>{`
                  .expand-button {
                    transition: all 0.3s ease;
                  }

                  .expand-button:hover {
                    transform: scale(1.05);
                    box-shadow: 0 0 50px rgba(109, 124, 255, 0.2);
                  }

                  .expand-button:active {
                    transform: scale(0.95);
                  }

                  @media (prefers-reduced-motion: reduce) {
                    .expand-button {
                      transition: none;
                    }
                    .expand-button:hover,
                    .expand-button:active {
                      transform: none;
                    }
                  }
                `}</style>
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};