import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import TextReveal from '../ui/TextReveal';
import Magnetic from '../ui/Magnetic';
import Typewriter from '../ui/Typewriter';
import photo from '../assets/photo.jpeg';
import resume from '../assets/RishiKumar.pdf'

const Hero: React.FC<{ id: string }> = ({ id }) => {

  const downloadFile = (fileUrl: string): void => {
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = fileUrl.split("/").pop() ?? "download";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  return (
    <section id={id} className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="order-2 md:order-1"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-3 py-1 mb-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold tracking-wide"
          >
            hello,
          </motion.div>
          
          <div className="mb-6">
             <TextReveal 
               text="I am Rishi" 
               className="text-5xl md:text-7xl font-bold text-white leading-tight" 
               delay={0.3}
             />
             <div className="text-5xl md:text-7xl font-bold leading-tight text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500">
                <TextReveal text="liquid experiences" delay={0.9} />
             </div>
          </div>
          
          <div className="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed h-16 md:h-20">
            <Typewriter 
              sentences={[
                "I am a creative full stack developer, specialized in backend.",
                "I am exploring and diving into Artificial Intelligence and Machine Learning.",
              ]}
              typingSpeed={50}
              deletingSpeed={30}
              className="block"
            />
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Magnetic>
                <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 py-3 rounded-full bg-white text-slate-900 font-semibold flex items-center gap-2 overflow-hidden"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth'})}
                >
                <div className='flex gap-2' >
                  <span className="relative z-10">View Projects</span>
                <ArrowRight size={18} className="relative z-10 top-0.5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-linear-to-r from-cyan-300 to-cyan-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                </motion.button>
            </Magnetic>
            
            <Magnetic>
                <motion.button
                onClick={()=>downloadFile(resume)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-semibold flex items-center gap-2 hover:bg-white/10 transition-colors backdrop-blur-sm"
                >
                <div className='flex gap-2 ' >
                  <span>Resume</span>
                <Download size={18} />
                </div>
                </motion.button>
            </Magnetic>
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-1 md:order-2 flex justify-center relative"
        >
            <div className="relative w-72 h-72 md:w-96 md:h-96 hover:scale-105 transition-transform duration-500 ease-out">
                
                
                {/* Profile / Abstract Image */}
                <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl bg-slate-900">
                    <img 
                        src={photo}
                        alt="Profile" 
                        className="w-full h-full object-cover opacity-80 scale-440 translate-x-[-25px] translate-y-[-50px] rotate-2 hover:scale-300 hover:-translate-x-4 transition-transform duration-700"
                    />
                </div>
                
                {/* Floating Badge */}
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-4 -right-4 bg-slate-950/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm font-medium text-white">Offline</span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
      >
        <span className="text-xs uppercase tracking-widest mb-2 block text-center">Scroll</span>
        <div className="w-px h-12 bg-linear-to-b from-slate-500 to-transparent mx-auto"></div>
      </motion.div>
    </section>
  );
};

export default Hero;