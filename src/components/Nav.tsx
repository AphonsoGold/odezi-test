import { motion } from 'motion/react';
import { Magnetic } from './Magnetic';

export const Nav = () => {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full h-24 px-10 md:px-20 flex justify-between items-center z-[1000] pointer-events-none"
    >
      <div className="flex items-center gap-16 pointer-events-auto group">
        <Magnetic>
          <div className="cursor-pointer">
            <span className="text-2xl font-serif text-ink tracking-tighter font-black group-hover:text-accent transition-colors duration-500 uppercase">ODEZI</span>
          </div>
        </Magnetic>
      </div>
    </motion.nav>
  );
};
