import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import type { NavItem } from '../types';
import Magnetic from '../ui/Magnetic';

const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle Scroll Appearance and Active Section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Check if we are at the bottom of the page
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
        setActiveSection('contact');
        return;
      }

      // Advanced Scroll Spy
      // We look for the section that occupies the 30% line of the viewport
      const triggerPoint = window.innerHeight * 0.3; 
      let current = '';
      
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section overlaps with the trigger point
          if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
            current = item.id;
          }
        }
      }

      // Fallback: If close to top, force Home
      if (window.scrollY < 100) {
        current = 'home';
      }

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Calculate position relative to the document
      const offset = 80; // Navbar height buffer
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
    >
      <div 
        className={`
          transition-all duration-300 ease-in-out
          flex justify-between items-center
          backdrop-blur-sm
          ${scrolled 
            ? 'mt-4 w-[95%] md:w-[85%] max-w-5xl rounded-full bg-amber-50/10 border border-white/10 shadow-2xl py-3 px-6' 
            : 'w-full bg-transparent py-6 px-6 container border border-transparent'
          }
        `}
      >
        {/* Logo */}
        <Magnetic>
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="text-xl md:text-2xl font-bold text-amber-50 cursor-pointer">
            Rishi's Portfolio
            </a>
        </Magnetic>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-1 lg:space-x-2 items-center">
          {navItems.map((item) => (
            <Magnetic key={item.id}>
                <button
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-2 text-xs lg:text-sm font-medium transition-colors hover:text-white ${
                    activeSection === item.id ? 'text-white' : 'text-slate-200'
                }`}
                >
                {item.label}
                {activeSection === item.id && (
                    <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-cyan-400 to-purple-500 rounded-full mx-auto w-1/2"
                    />
                )}
                </button>
            </Magnetic>
          ))}
          
          <div className="ml-4">
            <Magnetic>
                <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-medium transition-all backdrop-blur-sm"
                >
                Hire Me
                </motion.button>
            </Magnetic>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`
              absolute top-full left-0 right-0 z-40
              ${scrolled ? 'mt-2 w-[95%] mx-auto rounded-2xl' : 'mt-0 w-full'}
              backdrop-blur-lg border border-white/10 overflow-hidden shadow-2xl bg-amber-950/10
            `}
          >
            <div className="flex flex-col p-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-lg font-medium text-left p-2 rounded-lg hover:bg-white/5 transition-colors ${
                    activeSection === item.id ? 'text-cyan-400' : 'text-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="mt-4 w-full py-3 rounded-xl bg-amber-50/10 text-white font-semibold shadow-lg"
              >
                  Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;