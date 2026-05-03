/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CustomCursor } from './components/CustomCursor';
import { Nav } from './components/Nav';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { HorizontalCarousel } from './components/HorizontalCarousel';
import { Break, Process, About, Footer } from './components/Sections';
import { AudioPlayer } from './components/AudioPlayer';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { useSmoothScroll } from './hooks/useSmoothScroll';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollRef, spacerRef } = useSmoothScroll({ ease: 0.12 });

  useEffect(() => {
    // Global performance optimization
    gsap.ticker.lagSmoothing(1000, 16);
    
    // Force scroll to top on refresh
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    
    const timer = setTimeout(() => setIsLoaded(true), 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="relative selection:bg-accent selection:text-paper"
      >
        <CustomCursor />
        <Nav />
        <Navigation />
        <AudioPlayer />

        {/* Smooth Scroll Implementation */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div 
            ref={scrollRef} 
            className="w-full pointer-events-auto will-change-transform"
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <Hero />
            <Manifesto />
            
            {/* Horizontal storytelling section */}
            <HorizontalCarousel />
            
            <Break />
            <Process />
            <About />
            <Footer />
          </div>
        </div>

        {/* Spacer for native scrollbar */}
        <div ref={spacerRef} className="w-full pointer-events-none" />

        {/* Global Structural Accents (Fixed or moved to scroll wrapper?) */}
        {/* Keeping these fixed as they are decorative borders */}
        <div className="fixed top-0 left-[10%] w-px h-full bg-ink/[0.02] pointer-events-none z-0" />
        <div className="fixed top-0 left-[90%] w-px h-full bg-ink/[0.02] pointer-events-none z-0" />

        {/* Grid Overlay for subtle texture */}
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] mix-blend-multiply">
          <div className="w-full h-full bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>
      </motion.main>
    </AnimatePresence>
  );
}
