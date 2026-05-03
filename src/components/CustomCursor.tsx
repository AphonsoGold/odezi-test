import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const follower = followerRef.current;
    const label = labelRef.current;

    if (!dot || !follower) return;

    // Set initial positions
    gsap.set([dot, follower], { xPercent: -50, yPercent: -50, force3D: true });

    // Premium performance cursor movement
    const xDotTo = gsap.quickTo(dot, "x", { duration: 0.08, ease: "none" });
    const yDotTo = gsap.quickTo(dot, "y", { duration: 0.08, ease: "none" });
    
    const xFollowerTo = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power2.out" });
    const yFollowerTo = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power2.out" });

    const moveCursor = (e: MouseEvent) => {
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xFollowerTo(e.clientX);
      yFollowerTo(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const lenis = (window as any).lenis;
      
      // Reset states
      let scale = 1;
      let labelText = '';
      let isLarge = false;
      let isView = false;
      let isInteraction = false;

      // Detect interaction type
      if (target.closest('.project-card')) {
        scale = 2.5;
        labelText = 'VIEW';
        isLarge = true;
        isView = true;
        isInteraction = true;
      } 
      else if (target.closest('a, button, [role="button"], .cursor-prev, .cursor-next, .cursor-close, .cursor-audio, .cursor-close-menu')) {
        scale = 2;
        isLarge = true;
        isInteraction = true;
        if (target.closest('.cursor-prev')) labelText = '←';
        if (target.closest('.cursor-next')) labelText = '→';
        if (target.closest('.cursor-close')) labelText = '✕';
        if (target.closest('.cursor-close-menu')) labelText = '✕';
      }
      else if (target.closest('h1, h2, h3, h4')) {
        scale = 1.3;
        isInteraction = true;
      }

      // 4. HOVER-BASED SCROLL DECELERATION
      if (isInteraction && lenis) {
        // Slow down scroll on interaction
        gsap.to(lenis.options, {
          lerp: 0.02, // ultra smooth / slow
          duration: 0.5,
          ease: "power2.out"
        });
      } else if (lenis) {
        // Revert to normal speed
        gsap.to(lenis.options, {
          lerp: 0.08, // original
          duration: 0.5,
          ease: "power2.out"
        });
      }

      // Apply follower changes
      gsap.to(follower, {
        scale: scale,
        backgroundColor: isLarge ? 'white' : 'transparent',
        borderWidth: isLarge ? 0 : 1,
        duration: 0.4,
        ease: 'power3.out',
      });

      // Apply label changes
      if (label) {
        label.innerText = labelText;
        gsap.to(label, {
          opacity: isLarge && labelText ? 1 : 0,
          scale: labelText ? 0.8 : 0,
          duration: 0.3,
        });
      }

      // Dot behavior on hover
      gsap.to(dot, {
        opacity: isLarge ? 0.3 : 1,
        duration: 0.2,
      });
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white mix-blend-difference rounded-full pointer-events-none z-[10000]"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-12 h-12 border border-white/40 mix-blend-difference rounded-full pointer-events-none z-[9999] flex items-center justify-center overflow-hidden"
      >
        <span 
          ref={labelRef}
          className="text-lg font-sans font-bold tracking-widest text-ink opacity-0 pointer-events-none"
        >
          VIEW
        </span>
        <div className="absolute inset-0 flex items-center justify-center gap-[2px] pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="spectrum-bar w-[2px] h-4 bg-white scale-y-0" />
          ))}
        </div>
      </div>
    </>
  );
};
