import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import Magnetic from '../ui/Magnetic';
import { Mail, MapPin, Linkedin, Github, ArrowUpRight } from 'lucide-react';

const Contact: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id} className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-4 block">Get in Touch</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Let's work <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500">together.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            
            {/* Email Card */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-md"
            >
                <Magnetic>
                    <a href="mailto:rishikm1215@gmail.com" className="block group">
                        <GlassCard className="p-8 h-full flex flex-col  hover:bg-white/10 transition-colors" hoverEffect={true}>
                            <div className='flex justify-center' >
                                <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex flex-col items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                                <Mail size={32} />
                            </div>
                            </div>
                            <h3 className="text-2xl text-center font-bold text-white mb-2">Email Me</h3>
                            <p className="text-slate-400 mb-6">rishikm1215@gmail.com</p>
                            <span className="inline-flex  items-center gap-2 text-cyan-400 font-medium group-hover:gap-4 transition-all">
                                Say Hello <ArrowUpRight size={18} />
                            </span>
                        </GlassCard>
                    </a>
                </Magnetic>
            </motion.div>

            {/* Socials & Info */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-md flex flex-col gap-6"
            >
                 <GlassCard className="p-8 flex items-center gap-6" hoverEffect={false}>
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Location</p>
                        <p className="text-xl font-bold text-white">Noida, India</p>
                    </div>
                 </GlassCard>

                 <div className="grid grid-cols-2 gap-6">
                    <Magnetic>
                        <a href="https://github.com/rishi-09" target="_blank" rel="noopener noreferrer" className="block">
                            <GlassCard className="p-6 flex flex-col items-center justify-center gap-4 hover:bg-white/10 transition-colors" hoverEffect={true}>
                                <Github size={32} className="text-white" />
                                <span className="text-slate-300 font-medium">Github</span>
                            </GlassCard>
                        </a>
                    </Magnetic>

                    <Magnetic>
                        <a href="https://linkedin.com/in/rishi215" target="_blank" rel="noopener noreferrer" className="block">
                            <GlassCard className="p-6 flex flex-col items-center justify-center gap-4 hover:bg-white/10 transition-colors" hoverEffect={true}>
                                <Linkedin size={32} className="text-blue-400" />
                                <span className="text-slate-300 font-medium">LinkedIn</span>
                            </GlassCard>
                        </a>
                    </Magnetic>
                 </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;