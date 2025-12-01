import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { Calendar, Users } from 'lucide-react';
import gdgIcon from '../assets/idUP-XWcuo_logos.jpeg'

const Experience: React.FC<{ id: string }> = ({ id }) => {
  const experiences = [
    {
      role: "Core Member",
      org: "Google Developer Groups , MGMCoET , Noida",
      date: "Oct 2025- Present",
      desc: "Conducted workshops on basic to Advance Javascript for students, mentoring them through their web dev journey.",
      icon: <img id="gdgIcon" src={gdgIcon} className='rounded-2xl'/>
    },
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience</h2>
          <div className="h-1 w-20 bg-linear-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard className="p-8 md:p-10 flex flex-col md:flex-row gap-6 hover:bg-white/10 transition-colors group" hoverEffect={true}>
                {/* Icon Column */}
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900/50 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {exp.icon}
                  </div>
                </div>

                {/* Content Column */}
                <div className="grow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                        <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                        <p className="text-cyan-400 font-medium">{exp.org}</p>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm bg-white/5 px-3 py-1 rounded-full w-fit">
                      <Calendar size={14} />
                      <span>{exp.date}</span>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;