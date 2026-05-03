import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { Project } from './ArtworkCard';

interface ProjectModalProps {
  project: Project | null;
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ 
  project, 
  index, 
  onClose, 
  onNext, 
  onPrev 
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-10"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-ink/95 backdrop-blur-md cursor-zoom-out"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 40 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="relative w-full max-w-[1500px] h-[85vh] md:h-[75vh] bg-paper overflow-hidden shadow-[0_100px_200px_-50px_rgba(0,0,0,0.8)] z-10 pointer-events-auto flex flex-col md:flex-row rounded-lg"
        >
          {/* Main Image Area */}
          <motion.div 
            layoutId={`image-${index}`}
            className="relative flex-1 h-full overflow-hidden group bg-zinc-50"
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />

            {/* Internal Navigation Overlays (Transparent click zones) */}
            <div 
              className="absolute inset-y-0 left-0 w-1/2 cursor-prev z-20"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
            />
            
            <div 
              className="absolute inset-y-0 right-0 w-1/2 cursor-next z-20"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
            />

            {/* Image Counter Overlay */}
            <div className="absolute bottom-10 left-10 text-paper font-bold tracking-[0.2em] text-[10px] bg-ink/30 backdrop-blur-md px-4 py-2 rounded-full">
               SHOT / 0{index + 1} OF 04
            </div>
          </motion.div>

          {/* Project Details Panel (White Editorial Version) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-[42%] h-full bg-paper text-ink p-8 md:p-20 flex flex-col justify-between relative border-l border-ink/5 overflow-y-auto md:overflow-hidden cursor-close"
            onClick={onClose}
          >
            <div className="space-y-12 md:space-y-16">
              <div className="space-y-6 md:space-y-8 pt-10 md:pt-0">
                <div className="flex items-center gap-4">
                   <div className="w-8 md:w-10 h-px bg-accent" />
                   <span style={{ marginLeft: '-56px' }} className="text-accent font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] text-[9px] md:text-[10px]">Story Archive — {project.year}</span>
                </div>
                <h3 className="text-5xl md:text-[6.5rem] font-serif font-black uppercase leading-[0.8] md:leading-[0.75] tracking-tighter text-ink mb-2">
                   {project.title.split(' ').map((word, i) => (
                     <span key={i} className={`block last:opacity-30 ${i === 1 ? 'pt-[7px]' : ''}`}>{word}</span>
                   ))}
                </h3>
              </div>

              <div className="space-y-8 md:space-y-12">
                <div className="space-y-4 md:space-y-6">
                   <h4 className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-ink/30 font-bold">Artistic Direction</h4>
                   <p className="text-lg md:text-2xl leading-tight text-ink/80 font-medium font-serif italic max-w-sm mt-0 pt-0">
                      "Exploring the silent dialogue between architecture and the ephemeral nature of Catalan light."
                   </p>
                </div>

                <div className="grid grid-cols-2 gap-8 md:gap-12 border-t border-ink/10 pt-8 md:pt-12">
                   <div className="space-y-3 md:space-y-4">
                      <h4 className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-ink/30 font-bold">Category</h4>
                      <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em]">{project.category}</p>
                   </div>
                   <div className="space-y-3 md:space-y-4">
                      <h4 className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-ink/30 font-bold">Heritage</h4>
                      <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em]">Figueres / Empordà</p>
                   </div>
                </div>
              </div>
            </div>

            <div className="pt-12 md:pt-16 mt-12 md:mt-0 flex items-center justify-between border-t border-ink/10">
               <div className="flex flex-col gap-1 md:gap-2">
                  <span className="text-[9px] md:text-[10px] text-ink/30 uppercase tracking-[0.4em] md:tracking-[0.5em] font-bold">Index Row</span>
                  <div className="flex items-baseline gap-1">
                     <span className="text-3xl md:text-4xl font-serif font-black">0{index + 1}</span>
                     <span className="text-[10px] md:text-xs font-bold text-ink/20">/ 04</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
