import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { Mail, MapPin, Send, LinkedinIcon, GithubIcon } from 'lucide-react';

const Contact: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="h-1 w-20 bg-linear-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Have a project in mind or just want to say hi? I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-cyan-400 border border-white/10">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="text-white font-medium">rishikm1215@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-pink-400 border border-white/10">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="text-white font-medium">Noida,India</p>
                </div>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
            <div className="flex gap-4">
              {[{ icon: GithubIcon, url: "https://github.com/rishi-09" }, { icon: LinkedinIcon, url: "https://linkedin/in/rishi215" }].map(({ icon: Icon, url }, i) => (
                <a key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <input
                      type="text"
                      className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder-slate-400"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder-slate-400"
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <input
                    type="email"
                    className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder-slate-400"
                    placeholder="your Email"
                  />
                </div>

                <div className="space-y-2">
                  <textarea
                    rows={4}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder-slate-400 resize-none"
                    placeholder="Your Message"
                  />
                </div>

                <button
                  type="button"
                  className="w-full py-3 rounded-lg bg-amber-50/10 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-10 transition-opacity shadow-lg shadow-purple-500/25"
                >
                  <span>Send Message</span>
                  <Send size={18} />
                </button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full border-t border-white/5 py-6 mt-20 bg-slate-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Rishi's Portfolio. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;