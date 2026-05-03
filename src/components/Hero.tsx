import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

const IMAGES = {
  ODEZI: [
    'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800',
  ],
  STUDIO: [
    'https://images.unsplash.com/photo-1635776062127-d3eb8af34965?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800',
  ]
};

interface LetterProps {
  char: string;
  image: string;
  onHover: (image: string | null) => void;
  key?: string | number;
}

const Letter = ({ char, image, onHover }: LetterProps) => {
  return (
    <span 
      onMouseEnter={() => onHover(image)}
      onMouseLeave={() => onHover(null)}
      className="relative inline-block cursor-pointer select-none"
    >
      {char}
    </span>
  );
};

export const Hero = () => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const globalMouseX = useMotionValue(0);
  const globalMouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const imgX = useSpring(globalMouseX, { damping: 30, stiffness: 100 });
  const imgY = useSpring(globalMouseY, { damping: 30, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      // Convert viewport mouse to container-relative coordinate for absolute child
      globalMouseX.set(clientX);
      globalMouseY.set(clientY);
      
      const moveX = (clientX / window.innerWidth) - 0.5;
      const moveY = (clientY / window.innerHeight) - 0.5;
      mouseX.set(moveX * 40);
      mouseY.set(moveY * 40);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen w-full relative bg-paper overflow-visible text-ink selection:bg-zinc-900 selection:text-paper flex flex-col justify-center">
      
      <div className="relative w-full max-w-[90vw] mx-auto flex flex-col z-10 select-none py-20">
        
        {/* ROW 1: ODEZI (Top Left) */}
        <div className="relative flex items-end justify-between">
          <motion.h1 
            style={{ x: springX, y: springY }}
            className="text-[20vw] font-serif font-medium leading-[0.8] tracking-[-0.02em] whitespace-nowrap pt-4"
          >
            {"ODEZI".split('').map((char, i) => (
              <Letter 
                key={i} 
                char={char} 
                image={IMAGES.ODEZI[i % IMAGES.ODEZI.length]} 
                onHover={setHoveredImage}
              />
            ))}
          </motion.h1>
          
          <div className="hidden md:block mb-[2vw]">
            <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed text-right md:text-left">
              Digital Experience Design<br />
              <span className="opacity-50">Creative Direction</span>
            </p>
          </div>
        </div>

        {/* ROW 2: STUDIO (Middle Right) */}
        <div className="relative flex items-center gap-12 -mt-[2vw]">
          <div className="hidden md:block flex-shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed opacity-80 text-right">
              Product Strategy
            </p>
          </div>
          
          <motion.div 
            style={{ 
              x: springX, 
              y: springY 
            }}
            className="text-[22vw] font-serif font-medium leading-[0.8] tracking-[-0.02em] whitespace-nowrap ml-[10%] pt-4"
          >
            {"STUDIO".split('').map((char, i) => (
              <Letter 
                key={i} 
                char={char} 
                image={IMAGES.STUDIO[i % IMAGES.STUDIO.length]} 
                onHover={setHoveredImage}
              />
            ))}
          </motion.div>
        </div>

        {/* ROW 3: Info (Bottom Left) */}
        <div className="relative flex items-start gap-12 -mt-[2vw]">
          <div className="ml-[10vw] mt-10">
            <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">
              2026 Portfolio<br />
              <span className="opacity-50">Available for Projects</span>
            </p>
            <p className="text-[9px] mt-4 max-w-[180px] leading-relaxed uppercase opacity-40 font-medium">
              Elegance in digital motion. Crafting seamless user interfaces and meaningful experiences.
            </p>
          </div>
        </div>

      </div>


      {/* Very Subtle Decorative "ODEZI" */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] font-serif text-[28vw] font-medium tracking-tight pointer-events-none italic">
        Odezi
      </div>

      {/* Global Image Portal - Uses fixed positioning relative to Hero's parent coordinate system when transformed */}
      <AnimatePresence>
        {hoveredImage && (
          <motion.div
            key={hoveredImage}
            initial={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%', rotate: -5 }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%', rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%', rotate: 5 }}
            transition={{ type: 'spring', damping: 25, stiffness: 150 }}
            style={{
              position: 'fixed',
              left: imgX,
              top: imgY,
              pointerEvents: 'none',
              zIndex: 1000, // No need for millions
            }}
            className="w-[28vw] h-[35vw] max-w-[450px] max-h-[550px] overflow-hidden rounded-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] border border-white/5 hidden md:block"
          >
            <motion.img 
              initial={{ scale: 1.2 }}
              animate={{ scale: 1.05 }}
              src={hoveredImage} 
              alt="" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};


