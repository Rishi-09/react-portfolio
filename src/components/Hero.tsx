import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, ImportIcon } from 'lucide-react';
import { Magnetic } from './Magnetic';
import photo from '../assets/pfp.png'
import file from '../assets/RishiKumar.pdf'

const words = ["full stack developer", "passionate debugger"];

export const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [subText, setSubText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(120);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = words[index % words.length];
      setSubText(
        isDeleting
          ? fullText.substring(0, subText.length - 1)
          : fullText.substring(0, subText.length + 1)
      );

      if (!isDeleting && subText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
        setSpeed(80);
      } else if (isDeleting && subText === "") {
        setIsDeleting(false);
        setIndex((prev) => prev + 1);
        setSpeed(120);
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [subText, isDeleting, index, speed]);

  return (
    <div className="flex w-full items-center justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(109,124,255,0.05)_0%,transparent_70%)]" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 order-2 lg:order-1 text-center lg:text-left">
          <div className="reveal-child inline-flex items-center gap-3 rounded-full border border-[var(--border-color)] bg-[var(--surface-color)]/80 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--accent-color)]">
            <span className="flex h-2 w-2 rounded-full bg-[var(--accent-color)] animate-pulse"></span>
            Available for Internships
          </div>
          
          <div className="space-y-4">
            <h1 className="reveal-child text-5xl sm:text-7xl lg:text-[8rem] font-bold text-[var(--text-color)] leading-[1.1] lg:leading-[0.9] tracking-tighter">
              Rishi <br className="hidden lg:block" /> Kumar
            </h1>
            <div className="reveal-child h-8 md:h-12 flex justify-center lg:justify-start">
              <p className="text-xl md:text-3xl font-medium text-[var(--accent-color)] uppercase tracking-widest flex items-center">
                {subText}
                <span className="ml-2 w-1 h-8 bg-[var(--accent-color)] animate-pulse" />
              </p>
            </div>
            <p className="reveal-child max-w-md mx-auto lg:mx-0 text-base md:text-lg text-[var(--text-secondary)] font-normal leading-relaxed">
              Engineering <span className="text-[var(--text-color)] font-medium">resilient backends</span> and <span className="text-[var(--accent-color)] font-medium">cinematic interfaces</span>.
            </p>
          </div>

          <div className="reveal-child flex w-40 flex-wrap justify-center lg:justify-start gap-4 pt-2 h-40">
            <Magnetic>
              <a href="#projects" className="flex  items-center gap-3 rounded-full bg-[var(--text-color)] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--bg-color)] transition-transform active:scale-95 shadow-lg">
                Projects <ArrowRight className="h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={file} target="_blank" download={file} className="flex shadow-gray-400 shadow-sm items-center gap-3 rounded-full border border-[var(--border-color)] bg-[var(--surface-color)]/60 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-color)] transition-all hover:bg-[var(--surface-color)]/80">
                <ImportIcon size={20} /> Resume
              </a>
            </Magnetic>
          </div>
        </div>

        <div className=" relative order-1 lg:order-2 flex flex-col items-center justify-center">
          <div className=" reveal-child relative">
            <div className=" shadow-black shadow-2xl h-64 w-64 sm:h-72 sm:w-72 lg:h-96 lg:w-96 overflow-hidden rounded-full hover:scale-105 transition duration-500 ease-in border border-[var(--border-color)] bg-[var(--surface-color)] p-2 ">
              <img 
                src={photo} 
                alt="Rishi Kumar" 
                className="h-full w-full object-cover left-12 rounded-full grayscale opacity-100 rotate-3 hover:grayscale-0 hover:scale-90 transition duration-500 ease-out "
              />
            </div>
            
            <div className=" shadow-slate-800 shadow-sm absolute -bottom-2 -right-2 flex items-center gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--surface-color)]/95 px-4 py-2">
              <MapPin className="h-3 w-3 text-[var(--accent-color)]" />
              <span className="text-[9px] font-bold text-[var(--text-color)] uppercase tracking-widest">Noida</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};