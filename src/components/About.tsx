import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { GraduationCap, BookOpen, Terminal ,Code } from 'lucide-react';

const About: React.FC<{ id: string }> = ({ id }) => {
  const education = [
    { label: 'Degree', value: 'B.Tech CSE' },
    { label: 'Current CGPA', value: '8.2' },
    { label: 'Semester', value: '3rd' },
  ];

  const features = [
    { icon: <GraduationCap size={24} />, title: "Education", desc: "Pursuing Computer Science & Engineering with focus on AI & Backend ." },
    { icon: <Terminal size={24} />, title: "Problem Solving", desc: "Continuously Solving DSA problems." },
    { icon: <BookOpen size={24} />, title: "Exploring", desc: "Exploring Artificial Intelligence and their application in real life" },
    { icon: <Code size={24} />, title: "Clean Code", desc: "Maintainable, scalable, and efficient architecture." },
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

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bio Side */}
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Engineering <span className="text-cyan-400">robust backends</span> & exploring <span className="text-purple-400">AI frontiers.</span>
            </h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              I am an undergraduate Computer Science student in <span className='text-cyan-400 font-bold' >Mahatma Gandhi Mission's College of Engineerin and Technology , Noida.</span>  My academic journey is defined by a consistent curiosity to understand how things work under the hood.
            </p>
            <p className="text-slate-300 leading-relaxed mb-8">
              Currently, I am focusing on mastering Data Structures and Algorithms while building scalable web applications. I actively participate in coding contests and contribute to the technical society at my college.
            </p>

            <div className="flex gap-8 mb-8">
              {education.map((item, idx) => (
                <div key={idx}>
                  <h4 className="text-2xl md:text-3xl font-bold text-white mb-1">{item.value}</h4>
                  <p className="text-sm text-slate-400">{item.label}</p>
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

