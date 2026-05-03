import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

export const Manifesto = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current) return;
      
      const lines = textRef.current.querySelectorAll('.manifesto-line');
      
      lines.forEach((line) => {
        gsap.fromTo(line, 
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              scroller: document.body,
              start: "top 85%",
              end: "bottom 70%",
              scrub: 1,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-10 md:px-20 bg-paper relative overflow-hidden border-y border-ink/5">
      {/* Structural Lines */}
      <div className="absolute top-0 left-1/2 w-px h-full bg-ink/[0.03]" />
      
      <div ref={textRef} className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-12">
           <h2 className="mb-12 font-sans uppercase font-black text-[11px] tracking-[0.7em] text-ink/20 block">Manifesto / STUDIO</h2>
        </div>
        
        <div className="md:col-span-8 flex flex-col space-y-2 md:space-y-3">
          <p className="manifesto-line text-6xl md:text-[10rem] font-serif font-black leading-[0.75] tracking-tighter text-ink uppercase will-change-transform">
            Form is <br/>
            <span className="text-accent underline decoration-8 underline-offset-[-10px] decoration-accent/20">Silence.</span>
          </p>
          <p className="manifesto-line text-4xl md:text-7xl font-serif leading-[0.9] tracking-tighter italic text-ink/40 lowercase will-change-transform">
            Architecture of the void.
          </p>
          <p className="manifesto-line text-6xl md:text-[10rem] font-serif font-black leading-[0.75] tracking-tighter text-ink uppercase will-change-transform">
            We curate<br/>
            the <span className="opacity-10 italic font-light">Permanent.</span>
          </p>
        </div>

        <div ref={scrollRef} className="md:col-span-4 flex flex-col justify-end pb-10">
           <div className="flex flex-col gap-4 items-start">
              <motion.p 
                style={{ y }}
                className="text-sm font-medium leading-relaxed text-ink/60 uppercase tracking-widest max-w-[200px]"
              >
                 Defining substance through the intentional removal of the unnecessary.
              </motion.p>
              <div className="w-full h-px bg-ink/10" />
           </div>
        </div>
      </div>
      
      {/* Side Decorative Numbers */}
      <div className="absolute bottom-20 right-10 opacity-5 hidden lg:block">
      </div>
    </section>
  );
};
