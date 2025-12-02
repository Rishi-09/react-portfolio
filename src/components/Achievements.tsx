import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { Trophy, Target } from 'lucide-react';

const Achievements: React.FC<{ id: string }> = ({ id }) => {
  const achievements = [
    {
      title: "Vibe-a-thon Winner",
      description: "College level Vibe-a-thon , where our idea won with the help of a Vibe Coded prototype within 1.5 hours",
      icon: <Trophy size={24} className="text-yellow-400" />,
      date: "2025"
    },
    {
      title: "3x Hacktathon Finalist",
      description: "TechJam 2.0 at Microsoft , Hack-a-pirates NSUT Delhi, HackVriksh (online)",
      icon: <Target size={24} className="text-cyan-400" />,
      date: "2025"
    }
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Achievements</h2>
            <div className="h-1 w-20 bg-linear-to-r from-yellow-400 to-orange-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {achievements.map((item, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                >
                    <GlassCard className="p-6 flex items-start gap-4 hover:bg-white/10 transition-colors h-full" hoverEffect={true}>
                         <div className="p-3 flex justify-center gap-3 rounded-xl bg-white/5 border border-white/10 shadow-inner shrink-0">
                            {item.icon}
                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                         </div>
                         <div className="grow">
                             <div className="flex justify-between items-start mb-2">
                                 
                                 <span className="text-xs font-mono text-slate-500 border border-slate-700 px-2 py-0.5 rounded whitespace-nowrap ml-2">{item.date}</span>
                             </div>
                             <p className="text-slate-200 text-sm leading-relaxed">{item.description}</p>
                         </div>
                    </GlassCard>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;