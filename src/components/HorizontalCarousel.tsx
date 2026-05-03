import { useLayoutEffect, useRef, useState } from 'react';
import { ArtworkCard } from './ArtworkCard';
import { ProjectModal } from './ProjectModal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Vesper Identity",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    year: "2025"
  },
  {
    title: "Prism Modular",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2564&auto=format&fit=crop",
    year: "2024"
  },
  {
    title: "Krypton Web",
    category: "Product",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2670&auto=format&fit=crop",
    year: "2025"
  },
  {
    title: "Solstice Space",
    category: "Installation",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
    year: "2023"
  }
];

export const HorizontalCarousel = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const nextProject = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev !== null && prev < projects.length - 1 ? prev + 1 : 0));
  };

  const prevProject = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : projects.length - 1));
  };

  // Scroll Look - Disable scroll when modal is open
  useLayoutEffect(() => {
    if (selectedIdx !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIdx]);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const container = containerRef.current;
      if (!container) return;

      const scrollTween = gsap.to(container, {
        x: () => -(container.scrollWidth - window.innerWidth),
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: componentRef.current,
          scroller: document.body,
          pin: true,
          scrub: true, // Direct sync with scroll for fluid feel
          anticipatePin: 1,
          invalidateOnRefresh: true,
          end: () => `+=${container.scrollWidth - window.innerWidth}`,
        }
      });

      // Parallax and reveals for each project
      const horizontalSections = gsap.utils.toArray('.horizontal-section') as HTMLElement[];
      horizontalSections.forEach((section: HTMLElement) => {
        const image = section.querySelector('.project-image');
        const inner = section.querySelector('.project-inner');
        
        // 6. GALLERY-STYLE TRANSITIONS (Opacity + Scale)
        gsap.fromTo(section, 
          { opacity: 0.5, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              scroller: document.body,
              containerAnimation: scrollTween,
              start: "left right",
              end: "center center",
              scrub: true,
            }
          }
        );

        if (image) {
          gsap.fromTo(image, 
            { x: "8%", scale: 1.1 },
            {
              x: "-8%",
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                scroller: document.body,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: true,
              }
            }
          );
        }

        // 5. CURSOR-REACTIVE BIAS (Subtle directional displacement)
        if (inner) {
          const moveInner = (e: MouseEvent) => {
             const xBias = (e.clientX / window.innerWidth) - 0.5;
             const yBias = (e.clientY / window.innerHeight) - 0.5;
             
             gsap.to(inner, {
               x: xBias * 50,
               y: yBias * 30,
               duration: 2,
               ease: "power3.out"
             });
          };
          window.addEventListener('mousemove', moveInner);
          self.add(() => window.removeEventListener('mousemove', moveInner));
        }
      });

      // Progress bar animation
      gsap.to('.progress-bar', {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: componentRef.current,
          scroller: document.body,
          start: 'top top',
          end: () => `+=${container.scrollWidth - window.innerWidth}`,
          scrub: true,
        }
      });
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={componentRef} className="overflow-hidden bg-paper border-t border-ink/5">
      <div 
        ref={containerRef} 
        className="flex h-screen w-max relative will-change-transform"
      >
        {projects.map((project, i) => (
          <ArtworkCard 
            key={i} 
            project={project} 
            index={i} 
            onOpen={(idx) => setSelectedIdx(idx)}
          />
        ))}
      </div>
      
      <ProjectModal 
        project={selectedIdx !== null ? projects[selectedIdx] : null}
        index={selectedIdx ?? 0}
        onClose={() => setSelectedIdx(null)}
        onNext={nextProject}
        onPrev={prevProject}
      />

      {/* Scroll Indicator Rail */}
      <div className="fixed bottom-24 left-10 md:left-20 right-10 md:right-20 z-[1000] pointer-events-none">
        <div className="h-[2px] w-full bg-ink/5 relative">
           <div className="progress-bar absolute top-0 left-0 h-full bg-accent w-0" />
        </div>
      </div>
    </div>
  );
};

