import React from 'react';
import { motion } from 'motion/react';
import { Magnetic } from './Magnetic';

export interface Project {
  title: string;
  category: string;
  image: string;
  year: string;
}

export interface ArtworkCardProps {
  project: Project;
  index: number;
  onOpen: (index: number) => void;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ project, index, onOpen }) => {
  return (
    <section 
      className="horizontal-section project-card relative h-full w-[100vw] flex items-center justify-center px-10 md:px-20 overflow-hidden cursor-pointer bg-paper"
      onClick={() => onOpen(index)}
    >
        <div className="project-inner w-full h-full flex items-center justify-center will-change-transform">
            {/* Grid Elements */}
            <div className="absolute left-[50%] top-0 w-px h-full bg-ink/5" />
            <div className="absolute left-0 top-[35%] w-full h-px bg-ink/5" />

            <div className="max-w-[1600px] w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center relative z-10">
          
          {/* Offset Image Column */}
          <div className={`md:col-span-7 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2 md:col-start-6'} group relative`}>
            <Magnetic strength={0.05}>
              <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-ink/5">
                <motion.img 
                   layoutId={`image-${index}`}
                   src={`${project.image}&fm=webp&q=80&w=1200`} 
                   alt={project.title}
                   loading="lazy"
                   className="project-image w-full h-full object-cover grayscale brightness-110 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[1s] will-change-transform"
                   referrerPolicy="no-referrer"
                />

              </div>
            </Magnetic>
          </div>

          {/* Text Content Column */}
          <div className={`md:col-span-5 ${index % 2 === 0 ? 'md:order-2 md:pl-10 lg:pl-20' : 'md:order-1 md:pr-10 lg:pr-20'} flex flex-col items-start pt-6 md:pt-0`}>
             <div className="space-y-2 md:space-y-4 mb-8 md:mb-12">
                <span className="text-accent font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[10px]">Sector: {project.category}</span>
                <h2 className="project-text text-4xl md:text-6xl lg:text-8xl font-serif font-black text-ink leading-[0.9] md:leading-[0.85] tracking-tighter uppercase whitespace-pre-wrap max-w-sm">
                   {project.title.split(' ').join('\n')}
                </h2>
             </div>
             
             <div className="flex items-center gap-4 md:gap-6 w-full">
                <div className="h-px flex-1 bg-ink/10" />
                <span className="text-xl md:text-2xl font-bold italic font-serif whitespace-nowrap">STUDIO EDICIÓ</span>
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-ink/10 rounded-full hover:bg-accent hover:border-accent hover:text-paper transition-all duration-300">
                   <svg width="20" height="20" md:width="24" md:height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19"/>
                   </svg>
                </div>
             </div>

             <div className="mt-8 md:mt-12 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-ink/30 space-y-1">
                <p>Figueres / {project.year}</p>
                <p>Entrada Lliure</p>
             </div>
          </div>
        </div>

        {/* Decorative Side Elements */}
      </div>
    </section>
  );
};
