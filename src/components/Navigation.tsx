import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Magnetic } from './Magnetic';

interface NavLinkProps {
  label: string;
  index: number;
}

const NavLink = ({ label, index }: { label: string; index: number; key?: string | number }) => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      transition={{ 
        delay: 0.05 * index + 0.4, 
        type: "spring",
        damping: 15,
        stiffness: 100
      }}
      className="group relative cursor-pointer"
    >
      <Magnetic strength={0.15}>
        <div className="flex items-center gap-6 group-hover:scale-105 transition-transform duration-700">
          <span className="text-xs font-bold tracking-widest text-accent font-mono">0{index + 1}</span>
          <h2 className="text-6xl md:text-8xl font-serif font-black uppercase tracking-tighter leading-none group-hover:italic transition-all duration-500">
            {label}
          </h2>
        </div>
      </Magnetic>
      <div className="h-px bg-paper opacity-10 group-hover:opacity-100 group-hover:scale-x-110 transition-all duration-700 mt-4 origin-left" />
    </motion.div>
  );
};

export const Navigation = () => {
  const [isActive, setIsActive] = useState(false);

  // Lock scroll when menu is active
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isActive]);

  const menuVariants = {
    initial: {
      x: "-100%",
    },
    enter: {
      x: "0%",
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      x: "-100%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const curveVariants = {
    initial: {
      d: "M0 0 L0 1000 Q100 500 0 0"
    },
    enter: {
      d: "M0 0 L0 1000 Q0 500 0 0",
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: "M0 0 L0 1000 Q100 500 0 0",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const links = ["Gallery", "Manifesto", "Services", "Archive", "Identity"];

  return (
    <>
      {/* Fixed Sandwich Icon on the Right (Aligned with Nav Logo) */}
      <div className="fixed top-0 right-0 h-24 px-10 md:px-20 z-[2001] flex items-center">
        <Magnetic>
          <div className="relative p-2">
            {!isActive && (
              <button 
                onClick={() => setIsActive(!isActive)}
                className="group relative flex flex-col items-center justify-center cursor-pointer overflow-hidden w-20 h-8"
                aria-label="Toggle Menu"
              >
                {/* Long Elegant Sandwich Lines */}
                <div className="space-y-3">
                    <motion.div 
                      animate={{ 
                        rotate: isActive ? 45 : 0, 
                        y: isActive ? 10 : 0,
                        width: isActive ? 40 : 60,
                        backgroundColor: isActive ? "#ffffff" : "#0c0c0c",
                        scaleX: !isActive ? [1, 1.1, 1] : 1
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 20,
                        scaleX: !isActive ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : {}
                      }}
                      className="h-[1px] origin-center group-hover:w-[75px] transition-all duration-300" 
                    />
                    <motion.div 
                      animate={{ 
                        rotate: isActive ? -45 : 0, 
                        y: isActive ? -10 : 0,
                        width: isActive ? 40 : 80,
                        backgroundColor: isActive ? "#ffffff" : "#0c0c0c",
                        scaleX: !isActive ? [1, 1.05, 1] : 1
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 20,
                        scaleX: !isActive ? { repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.3 } : {}
                      }}
                      className="h-[1px] origin-center group-hover:w-[65px] transition-all duration-300" 
                    />
                </div>
              </button>
            )}
          </div>
        </Magnetic>
      </div>

      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="fixed inset-0 bg-[#0c0c0c] z-[2000] flex items-center justify-center text-paper px-10 md:px-40 overflow-hidden"
          >
             {/* Liquid SVG Background Curve */}
             <div className="absolute top-0 right-0 h-full w-[100px] pointer-events-none translate-x-[99%]">
                <svg className="h-full w-full fill-[#0c0c0c] stroke-none">
                    <motion.path 
                      variants={curveVariants}
                      initial="initial"
                      animate="enter"
                      exit="exit"
                    />
                </svg>
             </div>

            <div className="w-full max-w-6xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-20 relative z-10">
               <nav className="flex flex-col gap-6 md:gap-4">
                  {links.map((link, i) => (
                    <NavLink key={link} label={link} index={i} />
                  ))}
               </nav>

               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                 className="hidden lg:flex flex-col gap-12 text-paper/80"
               >
                  <div className="space-y-4">
                    <h3 className="text-[10px] uppercase tracking-[0.5em] font-bold text-accent">Contact</h3>
                    <p className="text-lg font-serif">studio@hullabaloo.art</p>
                    <p className="text-lg font-serif">+34 972 501 024</p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-[10px] uppercase tracking-[0.5em] font-bold text-accent">Social</h3>
                    <div className="flex flex-col gap-2 uppercase text-[11px] tracking-widest font-bold">
                       <span className="hover:text-accent cursor-pointer transition-colors">Instagram</span>
                       <span className="hover:text-accent cursor-pointer transition-colors">Behance</span>
                       <span className="hover:text-accent cursor-pointer transition-colors">Vimeo</span>
                    </div>
                  </div>
                  <div className="pt-20">
                     <p className="text-[9px] uppercase tracking-[0.8em]">Chronicle Anthology © 2026</p>
                  </div>
               </motion.div>
            </div>

            {/* Close Overlay helper */}
            <div 
              className="absolute inset-0 z-[5] cursor-close-menu" 
              onClick={() => setIsActive(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
