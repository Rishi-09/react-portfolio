import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Magnetic } from './Magnetic';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Stack', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Pulse', href: '#contributions' },
  { name: 'Involvement', href: '#experience' },
  { name: 'Certs', href: '#certificates' },
  { name: 'Awards', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const NavItem: React.FC<{ 
  item: { name: string; href: string }; 
  isActive: boolean; 
  onClick: () => void;
}> = React.memo(({ item, isActive, onClick }) => {
  return (
    <Magnetic strength={0.3}>
      <button
        onClick={onClick}
        className={`nav-item relative px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl ${
          isActive ? 'text-[var(--bg-color)]' : 'text-[var(--text-secondary)]'
        }`}
      >
        {isActive && (
          <motion.div 
            layoutId="nav-pill" 
            className="absolute inset-0 bg-[var(--text-color)] rounded-xl -z-10 shadow-lg" 
            transition={{ type: 'spring', stiffness: 400, damping: 35 }} 
          />
        )}
        <span className="relative z-10">{item.name}</span>

        <style>{`
          .nav-item {
            transition: color 0.3s ease;
          }

          .nav-item:not(.active):hover {
            color: var(--text-color);
          }
        `}</style>
      </button>
    </Magnetic>
  );
});

NavItem.displayName = 'NavItem';

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [activeItem, setActiveItem] = useState('Home');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  const scrollTo = useCallback((href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    window.scrollTo({ 
      top: el.getBoundingClientRect().top + window.scrollY - 90, 
      behavior: 'smooth' 
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          
          const triggerPoint = window.innerHeight * 0.45;
          let current = 'Home';
          
          for (let i = 0; i < navItems.length; i++) {
            const item = navItems[i];
            const el = document.querySelector(item.href);
            if (el && el.getBoundingClientRect().top <= triggerPoint) {
              current = item.name;
            }
          }
          
          setActiveItem(current);
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 md:top-8 left-0 right-0 z-[100] flex justify-center px-4 md:px-6 pointer-events-none">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`navbar pointer-events-auto flex items-center justify-between md:justify-start gap-4 w-full md:w-auto ${
          scrolled ? 'scrolled' : ''
        }`}
      >
        <Magnetic strength={0.2}>
          <button 
            onClick={() => scrollTo('#hero')} 
            className="navbar-logo text-xs font-black uppercase tracking-[0.4em] text-[var(--text-color)] md:mr-10"
          >
            Rishi.
          </button>
        </Magnetic>

        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavItem
              key={item.name}
              item={item}
              isActive={activeItem === item.name}
              onClick={() => scrollTo(item.href)}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Magnetic strength={0.4}>
            <button 
              onClick={toggleTheme} 
              className="theme-toggle flex items-center justify-center h-11 w-11 rounded-xl border border-[var(--border-color)] bg-[var(--surface-color)] text-[var(--text-color)] shadow-sm"
            >
              <AnimatePresence mode="wait">
                <motion.div 
                  key={theme} 
                  initial={{ scale: 0.5, opacity: 0, rotate: -45 }} 
                  animate={{ scale: 1, opacity: 1, rotate: 0 }} 
                  exit={{ scale: 0.5, opacity: 0, rotate: 45 }} 
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </Magnetic>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="menu-toggle lg:hidden flex items-center justify-center h-11 w-11 rounded-xl border border-[var(--border-color)] bg-[var(--surface-color)] text-[var(--text-color)]"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }} 
              className="mobile-menu absolute top-full left-0 right-0 mt-4 bg-[var(--bg-color)]/98 backdrop-blur-3xl border border-[var(--border-color)] rounded-3xl shadow-2xl p-4 flex flex-col gap-2 lg:hidden"
            >
              {navItems.map((item) => (
                <button 
                  key={item.name} 
                  onClick={() => scrollTo(item.href)} 
                  className={`mobile-menu-item px-8 py-5 text-[10px] font-bold uppercase tracking-[0.3em] rounded-2xl text-left ${
                    activeItem === item.name ? 'active' : ''
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <style>{`
        .navbar {
          transition: all 0.5s ease;
          padding: 1rem 2rem;
          border-radius: 1rem;
        }

        .navbar.scrolled {
          padding: 0.5rem 1.5rem;
          background-color: rgba(var(--bg-color-rgb), 0.85);
          backdrop-filter: blur(24px);
          border: 1px solid var(--border-color);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .navbar-logo {
          transition: transform 0.2s ease;
        }

        .navbar-logo:active {
          transform: scale(0.95);
        }

        .theme-toggle {
          transition: all 0.3s ease;
        }

        .theme-toggle:hover {
          border-color: rgba(109, 124, 255, 0.5);
        }

        .theme-toggle:active {
          transform: scale(0.9);
        }

        .menu-toggle {
          transition: transform 0.2s ease;
        }

        .menu-toggle:active {
          transform: scale(0.9);
        }

        .mobile-menu-item {
          transition: all 0.3s ease;
          color: var(--text-secondary);
        }

        .mobile-menu-item.active {
          background-color: var(--text-color);
          color: var(--bg-color);
        }

        .mobile-menu-item:not(.active):hover {
          background-color: rgba(var(--surface-color-rgb), 0.5);
        }

        @media (prefers-reduced-motion: reduce) {
          .navbar,
          .navbar-logo,
          .theme-toggle,
          .menu-toggle,
          .mobile-menu-item {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
};