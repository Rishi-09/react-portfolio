import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { ACHIEVEMENTS } from '../constants';

const AchievementCard: React.FC<{ item: any; idx: number }> = ({ item, idx }) => {
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
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="achievement-card group relative flex gap-10 p-10 md:p-14 rounded-[2.5rem] border border-[#242833] bg-[#15171C]/30 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
      style={{
        willChange: isHovered ? 'transform' : 'auto',
        // @ts-ignore
        '--mouse-x': '50%',
        '--mouse-y': '50%'
      }}
    >
      {/* Glare Hover Effect - Pure CSS */}
      <div className="achievement-glare pointer-events-none absolute -inset-px rounded-[2.5rem]" />

      <div className="relative z-10 flex gap-10">
        <div className="flex-shrink-0">
          <div className="achievement-icon relative h-20 w-20 rounded-3xl bg-[#1B1E24] border border-[#242833] flex items-center justify-center overflow-hidden">
            <div className="achievement-icon-bg absolute inset-0 bg-[#6D7CFF]" />
            <Trophy className="achievement-trophy relative h-8 w-8 text-[#9AA0AA]" />
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-[#6D7CFF] uppercase tracking-[0.3em]">{item.date}</span>
              <span className="h-px w-6 bg-[#242833]" />
              <span className="text-[10px] font-bold text-[#9AA0AA]/60 uppercase tracking-[0.3em]">{item.organization}</span>
            </div>
            <h3 className="achievement-title text-3xl font-bold text-[#E6E7EB] tracking-tight">{item.title}</h3>
          </div>
          <p className="achievement-description text-base text-[#9AA0AA] leading-relaxed font-medium opacity-80">
            {item.description}
          </p>
        </div>
      </div>

      <style>{`
        .achievement-card {
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.7s ease,
                      box-shadow 0.7s ease;
        }

        .achievement-card:hover {
          transform: translateY(-8px);
          border-color: rgba(109, 124, 255, 0.3);
          box-shadow: 0 25px 80px rgba(109, 124, 255, 0.1);
        }

        .achievement-glare {
          opacity: 0;
          background: radial-gradient(
            500px circle at var(--mouse-x) var(--mouse-y),
            rgba(109, 124, 255, 0.1),
            transparent 80%
          );
          transition: opacity 0.3s ease;
        }

        .achievement-card:hover .achievement-glare {
          opacity: 1;
        }

        .achievement-icon {
          transition: border-color 0.7s ease, box-shadow 0.7s ease;
        }

        .achievement-card:hover .achievement-icon {
          border-color: rgba(109, 124, 255, 0.4);
          box-shadow: 0 0 30px rgba(109, 124, 255, 0.1);
        }

        .achievement-icon-bg {
          opacity: 0;
          transition: opacity 0.7s ease;
          animation: achievement-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .achievement-card:hover .achievement-icon-bg {
          opacity: 0.05;
        }

        @keyframes achievement-pulse {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 0.08;
          }
        }

        .achievement-trophy {
          transition: color 0.5s ease;
        }

        .achievement-card:hover .achievement-trophy {
          color: #6D7CFF;
        }

        .achievement-title {
          transition: color 0.5s ease;
        }

        .achievement-card:hover .achievement-title {
          color: #6D7CFF;
        }

        .achievement-description {
          transition: opacity 0.5s ease;
        }

        .achievement-card:hover .achievement-description {
          opacity: 1;
        }

        @media (prefers-reduced-motion: reduce) {
          .achievement-card,
          .achievement-icon,
          .achievement-icon-bg,
          .achievement-trophy,
          .achievement-title,
          .achievement-description {
            transition: none;
            animation: none;
          }
          .achievement-card:hover {
            transform: none;
          }
        }
      `}</style>
    </motion.div>
  );
};

export const Achievements: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl w-full mx-auto space-y-24">
        <div className="text-center space-y-6">
          <h2 className="text-[10px] font-bold text-[#6D7CFF] uppercase tracking-[0.5em]">Recognition</h2>
          <p className="text-5xl md:text-7xl font-semibold text-[var(--text-color)]] tracking-tighter">Honors & Awards</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-10">
          {ACHIEVEMENTS.map((item, idx) => (
            <AchievementCard key={item.title} item={item} idx={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};