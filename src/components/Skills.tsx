import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassCard from '../ui/GlassCard';
import Magnetic from '../ui/Magnetic';
import github from '../assets/github-original-wordmark.svg';
import { Server, Layout, Terminal, Code2, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC<{ id: string }> = ({ id }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

const skills = [
    { 
      title: "Frontend", 
      icon: <Layout className="text-cyan-400" />, 
      tech: [
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "HTML/CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" }
      ] 
    },
    { 
      title: "Backend", 
      icon: <Server className="text-purple-400" />, 
      tech: [
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true },
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "REST APIs", iconComponent: <Globe size={18} className="text-blue-400" /> },
      ] 
    },
    { 
      title: "Languages", 
      icon: <Code2 className="text-green-400" />, 
      tech: [
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
        
      ] 
    },
    { 
      title: "Tools & DevOps", 
      icon: <Terminal className="text-orange-400" />, 
      tech: [
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "GitHub", icon: github },
        { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
        { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg", invert: true }
      ] 
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const sectionWidth = window.innerWidth;
        return -(trackWidth - sectionWidth);
      };

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`, 
          pin: true,
          scrub: 0, // Set to 0 to rely on Lenis for smoothing, preventing 'floaty' or 'laggy' feel
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div id={id} className="relative">
      <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Technical Arsenal</h2>
            <div className="h-1 w-24 bg-linear-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
          </motion.div>
        </div>

        <div className="w-full">
          <div 
            ref={trackRef}
            className="flex gap-8 w-max pl-[calc(50vw-170px)] pr-[calc(50vw-170px)] md:pl-[calc(50vw-200px)] md:pr-[calc(50vw-200px)] will-change-transform"
          >
            {skills.map((skill, idx) => (
              <div key={idx} className="w-[340px] md:w-[400px] shrink-0">
                  <GlassCard className="p-8 h-full min-h-[460px] flex flex-col" hoverEffect={false}>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-xl shadow-cyan-900/10">
                            {React.cloneElement(skill.icon as React.ReactElement<any>, { size: 28 })}
                        </div>
                        <h3 className="text-2xl font-bold text-white">{skill.title}</h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 content-start">
                          {skill.tech.map((item, i) => (
                            <Magnetic key={i}>
                              <GlassCard 
                                className="px-4 py-2.5 bg-white/5 border-white/5 hover:bg-white/10 cursor-pointer flex items-center gap-2" 
                                hoverEffect={false}
                              >
                                  {item.icon ? (
                                     <img 
                                        src={item.icon} 
                                        alt={item.name} 
                                        className={`w-5 h-5 object-contain ${item.invert ? 'invert' : ''}`}
                                        loading="lazy"
                                     />
                                  ) : (
                                     item.iconComponent
                                  )}
                                  <span className="text-slate-300 text-sm font-medium">{item.name}</span>
                              </GlassCard>
                            </Magnetic>
                          ))}
                      </div>

                        <div className="mt-auto pt-8 opacity-50">
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                  initial={{ width: 0 }}
                                  whileInView={{ width: "100%" }}
                                  transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                                  className="h-full bg-linear-to-r from-cyan-500 to-purple-600"
                              />
                          </div>
                        </div>
                  </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;