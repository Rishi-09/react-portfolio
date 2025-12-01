import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import type { Project } from '../types';
import { ExternalLink, Github } from 'lucide-react';
import Magnetic from '../ui/Magnetic';
import roomora from '../assets/roomora.png';
import portfolio from '../assets/portfolio.png';
import game from '../assets/ssg.png';
import syranx from '../assets/chatbot.png';

const projectsData: Project[] = [
  {
    id: 1,
    title: "roomora",
    category: "Web App",
    description: "A web-based platform to streamline the management and monitoring of bookings, occupancy, and resources for travel and vacation planning.",
    image: roomora,
    tech: ["node.js", "express.js", "MongoDB", "Bootstrap"],
    github:"https://github.com/rishi-09/roomora",
    externalLink:"https://roomora-sm0v.onrender.com"
  },

  {
    id: 2,
    title: "AI ChatBot",
    category: "AI Tool",
    description: "A ai chabot wokring on dynamic ai models.currently not deployed so please visit github",
    image: syranx,
    tech: ["React", "Groq API", "node.js", "Gemini API"],
    github:"https://github.com/rishi-09/syranx",
    externalLink:"#"
  },
  {
    id: 3,
    title: "Simon Says",
    category: "Game",
    description: "A memory bossting game",
    image: game,
    tech: ["HTML", "CSS", "JS"],
    github:"https://github.com/rishi-09/simon_says_game",
    externalLink:"https://simon-says-game-khaki-two.vercel.app"
  },
  {
    id: 4,
    title: "Portfolio Website",
    category: "Web App",
    description: "My porfolio website",
    image: portfolio,
    tech: ["Google Ai Studio", "typeScript", "react"],
    github:"https://github.com/rishi-09/roomora",
    externalLink:"#"
  },

];

const categories = ["All", "Web App", "AI Tool", "Game"];

const Projects: React.FC<{ id: string }> = ({ id }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <section id={id} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <div className="h-1 w-20 bg-linear-to-r from-cyan-400 to-purple-500 mx-auto rounded-full mb-8" />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Magnetic key={cat}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                    ? 'bg-amber-50/30 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                >
                  {cat}
                </button>
              </Magnetic>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="h-full group hover:border-cyan-500/30 transition-colors" hoverEffect={true}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                      <button className="p-2 bg-white rounded-full text-slate-900 hover:scale-110 transition-transform">
                        <a target="blank" href={project.github}>
                          <Github size={20} />
                        </a>
                      </button>
                      <button className="p-2 bg-white rounded-full text-slate-900 hover:scale-110 transition-transform">
                       <a target="blank" href={project.externalLink} >
                         <ExternalLink size={20} />
                       </a>
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">{project.category}</span>
                    <h3 className="text-xl font-bold text-white mt-2 mb-3">{project.title}</h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-3">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;