import React, { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Certificates } from './components/Certificates';
import { Contact } from './components/Contact';
import { GitHubHeatmap } from './components/GitHubHeatmap';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    
    if (!(document as any).startViewTransition) {
      setTheme(nextTheme);
      document.documentElement.classList.toggle('light', nextTheme === 'light');
      return;
    }

    (document as any).startViewTransition(() => {
      setTheme(nextTheme);
      document.documentElement.classList.toggle('light', nextTheme === 'light');
    });
  };

  useEffect(() => {
    // Ultra-efficient reveal with hardware acceleration hints
    const children = document.querySelectorAll('.reveal-child');
    
    children.forEach((child) => {
      (child as HTMLElement).style.willChange = 'transform, opacity';
      
      gsap.fromTo(
        child,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: child,
            start: "top 95%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, []);

  return (
    <div className={`relative bg-[var(--bg-color)] text-[var(--text-color)] selection:bg-[var(--selection-color)] transition-colors duration-500`}>
      <CustomCursor />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main className="main-content">
        <section id="hero" className="min-h-[80vh] flex items-center pt-24 md:pt-32">
          <Hero />
        </section>
        
        <section id="about" className="flex items-center py-16 md:py-24">
          <About />
        </section>
        
        <section id="skills" className="flex items-center py-16 md:py-24">
          <Skills />
        </section>
        
        <section id="projects" className="flex items-center py-16 md:py-24">
          <Projects />
        </section>

        <section id="contributions" className="py-16 md:py-24">
          <GitHubHeatmap />
        </section>
        
        <section id="experience" className="flex items-center py-16 md:py-24">
          <Experience />
        </section>

        <section id="certificates" className="flex items-center py-16 md:py-24">
          <Certificates />
        </section>
        
        <section id="achievements" className="flex items-center py-16 md:py-24">
          <Achievements />
        </section>
        
        <section id="contact" className="flex items-center py-16 md:py-24">
          <Contact />
        </section>
      </main>

      <footer className="relative z-10 py-12 text-center text-[10px] font-bold uppercase tracking-[0.5em] text-[var(--text-secondary)] opacity-40 border-t border-[var(--border-color)]">
        &copy; {new Date().getFullYear()} Rishi Kumar — Engineered for Performance
      </footer>
    </div>
  );
};

export default App;