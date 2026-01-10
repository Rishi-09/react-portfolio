import React, { useEffect, useState, useRef } from "react";
import { ExternalLink } from "lucide-react";

interface CardItem {
  title: string;
  organization: string;
  imageUrl: string;
  link?: string;
  date: string;
  description: string;
}

interface InfiniteMovingCardsProps {
  items: CardItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

const Card: React.FC<{ item: CardItem; index: number }> = React.memo(({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className="certificate-card w-[300px] md:w-[400px] flex-shrink-0 rounded-3xl border border-[var(--border-color)] bg-[var(--surface-color)]/95 px-6 py-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        willChange: isHovered ? 'border-color, box-shadow' : 'auto'
      }}
    >
      <div className="certificate-image-wrapper aspect-video w-full rounded-xl overflow-hidden mb-6 border border-[var(--border-color)] bg-[var(--bg-color)] shadow-inner">
        <img 
          src={item.imageUrl} 
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="certificate-image w-full h-full object-cover opacity-60 grayscale" 
        />
      </div>
      
      <div className="space-y-3">
        <p className="text-[9px] font-bold text-[var(--accent-color)] uppercase tracking-[0.2em]">{item.organization}</p>
        <h3 className="text-xl font-bold text-[var(--text-color)] leading-tight tracking-tight">{item.title}</h3>
        <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 opacity-80">{item.description}</p>
      </div>

      <div className="mt-8 flex justify-between items-center text-[8px] font-bold text-[var(--text-secondary)]/40 uppercase tracking-[0.3em] pt-4 border-t border-[var(--border-color)]">
        <span>{item.date}</span>
        {item.link && <a href={item.link} > <ExternalLink size={20} className="text-[var(--accent-color)]" /></a> }
        
      </div>

      <style >{`
        .certificate-card {
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .certificate-card:hover {
          border-color: rgba(109, 124, 255, 0.3);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
        }

        .certificate-image {
          transition: filter 0.5s ease;
        }

        .certificate-card:hover .certificate-image {
          filter: grayscale(0);
        }
      `}</style>
    </li>
  );
});

Card.displayName = 'Card';

export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    
    if (!container || !scroller) return;

    // Clone items for seamless loop
    const scrollerContent = Array.from(scroller.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = (item as HTMLElement).cloneNode(true);
      scroller.appendChild(duplicatedItem);
    });

    // Set animation properties
    const animationDirection = direction === "left" ? "forwards" : "reverse";
    const duration = speed === "fast" ? "12s" : speed === "normal" ? "25s" : "45s";
    
    container.style.setProperty("--animation-direction", animationDirection);
    container.style.setProperty("--animation-duration", duration);
    
    setStart(true);
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={`scroller relative z-20 max-w-full overflow-hidden ${className}`}
    >
      <ul
        ref={scrollerRef}
        className={`flex min-w-full shrink-0 gap-6 py-8 w-max flex-nowrap ${
          start ? "animate-scroll" : ""
        } ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
      >
        {items.map((item, idx) => (
          <Card key={`${item.title}-${idx}`} item={item} index={idx} />
        ))}
      </ul>

      <style >{`
        .scroller {
          mask-image: linear-gradient(
            to right,
            transparent,
            white 15%,
            white 85%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            white 15%,
            white 85%,
            transparent
          );
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50%));
          }
        }

        .animate-scroll {
          animation: scroll var(--animation-duration) linear infinite;
          animation-direction: var(--animation-direction);
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-scroll {
            animation: none;
            will-change: auto;
          }
        }
      `}</style>
    </div>
  );
};