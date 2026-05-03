import { useLayoutEffect, useRef, useState, FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Magnetic } from './Magnetic';
import { motion, useScroll, useTransform } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

export const Break = () => {
  return (
    <section className="h-[60vh] flex items-center justify-center bg-paper px-10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,black_0%,transparent_70%)]" />
      </div>
      <div className="text-center max-w-4xl relative z-10">
        <p className="text-[10px] font-sans font-black uppercase tracking-[0.6em] text-ink/20 mb-12">The Void Mantra</p>
        <span className="text-4xl md:text-7xl font-serif font-black text-ink leading-[0.8] tracking-tighter uppercase">
          Design is <br/>
          <span className="italic font-light text-accent lowercase">nothing</span> <br/>
          without intention.
        </span>
      </div>
    </section>
  );
};

export const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const steps = [
    { title: "Strategy", description: "Mapping the conceptual landscape. We define the rhythm and purpose before a single pixel is placed.", num: "01" },
    { title: "Movement", description: "Curating the kinetic energy. Choosing a dynamic flow that resonates with the core intent of the project.", num: "02" },
    { title: "Artifact", description: "Bringing the vision to life. Crafting meticulous objects and experiences that define digital space.", num: "03" }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.process-panel');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          scroller: document.body,
          start: "top top",
          end: () => `+=${steps.length * 100}%`,
          pin: true,
          scrub: 1,
        }
      });

      panels.forEach((panel, i) => {
        const bgNum = panel.querySelector('.bg-number');
        const title = panel.querySelector('h3');
        const desc = panel.querySelector('p');
        const line = panel.querySelector('.reveal-line');

        // Initial state
        gsap.set(panel, { autoAlpha: i === 0 ? 1 : 0 });
        if (i !== 0) {
          gsap.set([title, desc, line], { y: 100, opacity: 0 });
        }

        // Timeline for this specific panel
        if (i > 0) {
          tl.to(panels[i-1], { autoAlpha: 0, scale: 0.9, duration: 0.5 }, i)
            .to(panel, { autoAlpha: 1, duration: 0.5 }, i)
            .to(bgNum, { y: -50, opacity: 0.15, duration: 1 }, i)
            .to([title, desc, line], { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 }, i + 0.2);
        }

        // Exit behavior for all but last
        if (i < panels.length - 1) {
           tl.to(panel, { autoAlpha: 0, scale: 1.1, duration: 0.5 }, i + 0.8);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} className="h-screen bg-paper overflow-hidden border-t border-ink/5">
      <div ref={containerRef} className="relative h-full w-full">
        {/* Grid Background */}
        <div className="absolute inset-0">
          <div className="absolute left-[25%] top-0 w-px h-full bg-ink/[0.03]" />
          <div className="absolute left-[75%] top-0 w-px h-full bg-ink/[0.03]" />
        </div>

        <div className="absolute top-20 left-10 md:left-20 z-[100]">
           <h2 className="text-[11px] uppercase tracking-[0.7em] font-black text-ink">Methood / 001</h2>
        </div>

        {steps.map((step, i) => (
          <div 
            key={i} 
            className="process-panel absolute inset-0 flex items-center justify-center px-10 md:px-20 bg-paper invisible opacity-0"
            style={{ zIndex: steps.length - i }}
          >
            <div className="max-w-[1700px] w-full grid grid-cols-1 md:grid-cols-12 relative items-center">
               
               {/* Large Background Decorative Text */}
               <span className="bg-number absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[35vw] font-serif font-black text-ink/[0.02] pointer-events-none select-none z-0">
                 {step.num}
               </span>

               <div className="md:col-start-2 md:col-span-10 panel-content z-10 grid grid-cols-1 md:grid-cols-2 gap-20 items-end">
                  <div className="flex flex-col">
                    <span className="text-8xl md:text-[14rem] font-serif font-black text-ink tracking-tighter leading-none block border-b border-ink/10 pb-10 mb-10">
                      {step.num}
                    </span>
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-accent rotate-45" />
                       <span className="text-xs font-black uppercase tracking-[0.5em]">Phase</span>
                    </div>
                  </div>
                  
                  <div className="max-w-xl pb-20">
                    <h3 className="text-6xl md:text-9xl font-serif font-black mb-12 text-ink leading-[0.8] tracking-tighter uppercase">{step.title}</h3>
                    <p className="text-xl md:text-2xl font-sans font-medium leading-relaxed text-ink/40 max-w-sm">
                      {step.description}
                    </p>
                    <div className="reveal-line mt-12 w-full h-[2px] bg-accent origin-left" />
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <section ref={containerRef} className="py-60 px-10 md:px-20 bg-paper relative overflow-hidden border-t border-ink/5">
      {/* Decorative vertical lines */}
      <div className="absolute top-0 right-1/4 w-px h-full bg-ink/5" />
      
      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20 items-center">
          <div className="md:col-span-7">
            <span className="text-[11px] uppercase tracking-[0.6em] font-black text-ink/20 mb-16 block">Studio Dossier</span>
            <h2 className="text-7xl md:text-[9rem] font-serif font-black text-ink leading-[0.75] tracking-tighter uppercase mb-20">
              The Art of <br/>
              <span className="text-accent italic lowercase font-light">Subtraction.</span>
            </h2>
            <div className="flex items-start gap-12">
               <div className="text-4xl font-serif font-bold p-8 border border-ink/10">STUDIO</div>
               <p className="text-2xl md:text-3xl text-ink/60 leading-tight max-w-md font-medium">
                  We create spatial identities that define the next era of digital interaction.
               </p>
            </div>
          </div>
          
          <div className="md:col-span-5 relative group">
             <div className="aspect-[4/5] bg-ink/5 overflow-hidden border border-ink/5 p-4">
                <motion.img 
                   style={{ y, scale: 1.15 }}
                   whileHover={{ scale: 1.25, filter: "grayscale(0) brightness(1)", transition: { duration: 0.8 } }}
                   src="https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?q=80&w=2072&auto=format&fit=crop" 
                   className="w-full h-full object-cover grayscale brightness-125 contrast-125"
                />
             </div>
             {/* Float label */}
             <div className="absolute -bottom-10 -right-10 bg-accent text-paper p-10 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
                <span className="text-4xl font-black font-serif italic tracking-tighter whitespace-nowrap">ODEZI 2026</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message) return;
    const body = encodeURIComponent(message);
    window.location.href = `mailto:hello@studio.cc?subject=Contact%20from%20Studio%20Site&body=${body}`;
  };

  return (
    <footer className="bg-black text-white py-40 px-10 md:px-20 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col mb-40 relative">
           <h2 
             className="text-2xl md:text-[70px] font-serif font-black tracking-normal leading-[0.85] uppercase max-w-5xl"
             style={{ wordSpacing: '0.2em' }}
           >
             ENOUGH ABOUT US <br />
             LET'S TALK ABOUT <br />
             <div className="flex items-center overflow-hidden">
               <input 
                 type="text"
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
                 placeholder="YOU"
                 className="bg-transparent border-none outline-none text-white/60 placeholder:text-white/20 w-full focus:text-white transition-colors duration-300"
                 style={{ wordSpacing: '0.2em' }}
               />
             </div>
           </h2>
           
           <div className="absolute right-0 bottom-0 mb-4 md:mb-0">
              <button 
                type="submit"
                className="text-xl md:text-2xl font-serif font-black uppercase border-b border-white pb-1 hover:text-accent transition-colors cursor-pointer"
              >
                NEXT
              </button>
           </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-4 pt-20 border-t border-white/20 gap-12">
           <div className="space-y-12">
              <p className="text-sm md:text-lg font-serif font-black uppercase tracking-tight max-w-[280px] leading-tight">
                THE WORLD'S PREMIER DESIGN STUDIO DEFINING THE FUTURE OF INTERACTION
              </p>
              <div className="text-[10px] uppercase font-serif font-black tracking-widest text-white/30 space-x-4">
                <span>© 2026 STUDIO</span>
                <span>BY M&C</span>
              </div>
           </div>
           
           <div className="space-y-6">
              <span className="text-[10px] uppercase font-serif font-black tracking-widest text-white/30 block">Contact Us</span>
              <div className="space-y-4">
                <span className="block text-sm font-serif font-bold uppercase tracking-widest">04 366 3399</span>
                <a href="mailto:hello@studio.cc" className="block text-sm font-serif font-bold uppercase tracking-widest border-b border-white/20 pb-1 w-fit hover:border-white transition-colors">hello@studio.cc</a>
              </div>
           </div>

           <div className="space-y-6">
              <span className="text-[10px] uppercase font-serif font-black tracking-widest text-white/30 block">Visit Us</span>
              <p className="text-sm font-serif font-bold uppercase tracking-widest leading-relaxed opacity-60 max-w-[220px]">
                Suite 2703-2704 JBC2, <br />
                Cluster V, JLT, Dubai, <br />
                United Arab Emirates
              </p>
           </div>

           <div className="flex flex-col items-end justify-between lg:h-full gap-12">
              <span className="text-4xl font-serif font-black tracking-tighter">STUDIO</span>
              <a href="#" className="text-[10px] uppercase font-serif font-black tracking-widest text-white/30 hover:text-white transition-colors">Privacy Policy</a>
           </div>
        </div>
      </div>
    </footer>
  );
};
