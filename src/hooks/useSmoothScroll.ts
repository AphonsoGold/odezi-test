import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollOptions {
  ease?: number;
  skewIntensity?: number;
}

export const useSmoothScroll = (options: SmoothScrollOptions = {}) => {
  const { ease = 0.12, skewIntensity = 0.5 } = options;
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  
  const data = useRef<{
    current: number;
    target: number;
    last: number;
    height: number;
    velocity: number;
    rafId: number | null;
  }>({
    current: 0,
    target: 0,
    last: 0,
    height: 0,
    velocity: 0,
    rafId: null
  });

  const setHeight = useCallback(() => {
    if (scrollRef.current && spacerRef.current) {
      const height = scrollRef.current.offsetHeight;
      if (Math.abs(data.current.height - height) > 1) {
        data.current.height = height;
        spacerRef.current.style.height = `${height}px`;
      }
    }
  }, []);

  const smoothScroll = useCallback(() => {
    const prev = data.current.current;
    
    // Interpolation (Lerp)
    data.current.current += (data.current.target - data.current.current) * ease;
    
    // Calculate velocity
    data.current.velocity = data.current.current - prev;
    
    const rounded = Math.round(data.current.current * 100) / 100;
    
    if (scrollRef.current && Math.abs(data.current.velocity) > 0.01) {
      const skew = Math.max(Math.min(data.current.velocity * skewIntensity, 10), -10);
      const scale = 1 - Math.min(Math.abs(data.current.velocity) * 0.0005, 0.02);
      
      scrollRef.current.style.transform = `translate3d(0, -${rounded}px, 0) skewY(${skew}deg) scale(${scale})`;
      data.current.last = rounded;
    }
    
    data.current.rafId = requestAnimationFrame(smoothScroll);
  }, [ease, skewIntensity]);

  useEffect(() => {
    const handleScroll = () => {
      data.current.target = window.scrollY;
    };

    const handleResize = () => {
      setHeight();
    };

    // Initial setup
    setHeight();
    data.current.rafId = requestAnimationFrame(smoothScroll);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    // Sync with ScrollTrigger
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          data.current.target = value as number;
          window.scrollTo(0, value as number);
          return;
        }
        return data.current.current;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: "transform"
    });

    ScrollTrigger.addEventListener("refresh", setHeight);
    
    const resizeObserver = new ResizeObserver(() => {
      setHeight();
      ScrollTrigger.refresh();
    });
    
    if (scrollRef.current) {
      resizeObserver.observe(scrollRef.current);
    }

    return () => {
      if (data.current.rafId) cancelAnimationFrame(data.current.rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.removeEventListener("refresh", setHeight);
      resizeObserver.disconnect();
    };
  }, [smoothScroll, setHeight]);

  return { scrollRef, spacerRef };
};
