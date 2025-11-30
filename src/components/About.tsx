import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { Code, Palette} from 'lucide-react';

const About: React.FC<{ id: string }> = ({ id }) => {
  const stats = [
    { label: 'Years Experience', value: 'Fresher' },
    { label: 'Projects Completed', value: '3' },
  ];

  const features = [
    { icon: <Code size={24} />, title: "Clean Code", desc: "Maintainable, scalable, and efficient architecture." },
    { icon: <Palette size={24} />, title: "Ai Enthusiast", desc: "Wish to explore and dive deeper Into field of Ai" },
  ];

  return (
    <section id={id} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
          <div className="h-1 w-20 bg-linear-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio Side */}
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Turning complex problems into <span className="text-cyan-400">simple, beautiful solutions.</span>
            </h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              I am a passionate Full Stack Developer with a keen eye for design. I bridge the gap between engineering and creativity, ensuring every product isn't just functional but also delightful to use.
            </p>
            <p className="text-slate-300 leading-relaxed mb-8">
              My journey began in graphic design, which naturally evolved into frontend development. This background allows me to understand both the aesthetic and technical requirements of a project deeply.
            </p>

            <div className="flex gap-8 mb-8">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <h4 className="text-3xl font-bold text-white mb-1">{stat.value}</h4>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Features Grid Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <GlassCard className="p-6 h-full hover:bg-white/10 transition-colors" hoverEffect={true}>
                  <div className="w-12 h-12 rounded-lg bg-linear-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-purple-500/20">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-sm text-slate-300">{feature.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;