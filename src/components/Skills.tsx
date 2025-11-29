import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { Database, Layout, Server, Smartphone, Terminal, Cpu } from 'lucide-react';

const Skills: React.FC<{ id: string }> = ({ id }) => {
  const technicalSkills = [
    { name: "Frontend Development", icon: <Layout />, items: ["React", "Bootstrap", "Tailwind CSS","javaScript"] },
    { name: "Backend Development", icon: <Server />, items: ["Node.js", "Express", "MongoDB"] },
    { name: "Languages", icon: <Server />, items: ["Java", "python", "HTML","c++"] },
    // { name: "Mobile & Tools", icon: <Smartphone />, items: ["React Native", "Git", "Docker", "AWS", "Figma"] },
  ];

  return (
    <section id={id} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Skills & Expertise</h2>
          <div className="h-1 w-20 bg-linear-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {technicalSkills.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <GlassCard className="h-full p-8 relative overflow-hidden group">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                  {React.cloneElement(category.icon as React.ReactElement<any>, { size: 100 })}
                </div>

                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="p-3 rounded-lg bg-linear-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 text-cyan-400">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                </div>

                <div className="space-y-4 relative z-10">
                  {category.items.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-300">{skill}</span>
                            <span className="text-slate-500">{(90 - sIdx * 5)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-700/50 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${90 - sIdx * 5}%` }}
                                transition={{ duration: 1, delay: 0.5 + (sIdx * 0.1) }}
                                className="h-full bg-linear-to-r from-cyan-400 to-purple-500 rounded-full"
                            />
                        </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Additional "Soft Skills" or "Tools" Marquee or Grid could go here */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-60">
             {[<Terminal key="1"/>, <Database key="2"/>, <Cpu key="3"/>].map((icon, i) => (
                 <motion.div 
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, delay: i, repeat: Infinity }}
                    className="p-4 rounded-full bg-white/5"
                 >
                     {React.cloneElement(icon as React.ReactElement<any>, { size: 32, className: "text-white" })}
                 </motion.div>
             ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;