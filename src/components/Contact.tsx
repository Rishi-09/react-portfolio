import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, ArrowUpRight } from "lucide-react";
import { Magnetic } from "./Magnetic";

export const Contact: React.FC = () => {
  const links = [
    { name: "Direct Email", icon: Mail, value: "rishikm1215@gmail.com", url: "mailto:rishikm1215@gmail.com" },
    { name: "Professional", icon: Linkedin, value: "in/rishi215", url: "https://linkedin.com/in/rishi215" },
    { name: "Repositories", icon: Github, value: "github.com/rishi-09", url: "https://github.com/rishi-09" },
    { name: "Current Location", icon: MapPin, value: "Noida", url: "#" },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
        <div className="space-y-16">
          <div className="space-y-8">
            <h2 className="text-[10px] font-bold text-[var(--accent-color)] uppercase tracking-[0.5em]">
              Inquiries
            </h2>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl md:text-8xl font-semibold leading-[0.95] tracking-tighter"
            >
              Ready to craft <br />
              <span className="gradient-text">the next standard.</span>
            </motion.h2>
          </div>

          <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed max-w-lg font-normal opacity-80">
            Currently vetting high-impact internship opportunities for Fall 2026. Let's discuss complex systems and beautiful code.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 self-center">
          {links.map((link, idx) => (
            <ContactCard key={link.name} link={link} idx={idx} />
          ))}
        </div>
      </div>

      <style>{`
        .gradient-text {
          background: linear-gradient(90deg, var(--accent-color), #8B5CF6, var(--accent-color));
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 8s ease infinite;
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .availability-dot {
          color: var(--accent-color);
          animation: pulse-dot 2s ease infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @media (prefers-reduced-motion: reduce) {
          .gradient-text,
          .availability-dot {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

const ContactCard: React.FC<{ link: any; idx: number }> = ({ link, idx }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Magnetic strength={0.2}>
      <motion.a
        href={link.url}
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="contact-card group relative flex flex-col justify-between p-10 rounded-[2.5rem] border border-[var(--border-color)] bg-[var(--surface-color)]/40 overflow-hidden h-60 shadow-sm"
        style={{ willChange: isHovered ? "transform, box-shadow" : "auto" }}
      >
        <div className="contact-arrow absolute top-0 right-0 p-8">
          <ArrowUpRight className="h-6 w-6 text-[var(--accent-color)]" />
        </div>

        <div className="contact-icon h-16 w-16 rounded-2xl bg-[var(--bg-color)] border border-[var(--border-color)] flex items-center justify-center">
          <link.icon className="h-7 w-7 text-[var(--text-secondary)]" />
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-secondary)]/40">
            {link.name}
          </p>
          <p className="text-xl font-bold text-[var(--text-color)] tracking-tight">
            {link.value}
          </p>
        </div>

        <style>{`
          .contact-card {
            transition: border-color 0.7s ease, box-shadow 0.7s ease;
          }

          .contact-card:hover {
            border-color: rgba(109,124,255,0.4);
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
          }

          .contact-arrow {
            opacity: 0;
            transform: translate(1rem, -1rem);
            transition: opacity 0.5s ease, transform 0.5s ease;
          }

          .contact-card:hover .contact-arrow {
            opacity: 1;
            transform: translate(0,0);
          }
        `}</style>
      </motion.a>
    </Magnetic>
  );
};
