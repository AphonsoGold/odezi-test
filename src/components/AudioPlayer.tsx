import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Magnetic } from './Magnetic';

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // A chilled Bossa Lounge & Bass track
  const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Audio play blocked", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-12 left-6 z-50 flex items-center h-10 w-[240px] pointer-events-none">
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        loop
      />
      
      {/* State Toggle: ● → ○ */}
      <Magnetic strength={0.2}>
        <button 
          onClick={togglePlay}
          className="pointer-events-auto relative w-10 h-10 flex items-center justify-center cursor-none z-10 cursor-audio"
          aria-label={isPlaying ? "Mute" : "Unmute"}
        >
          <motion.div 
            animate={{ 
              scale: isPlaying ? [1, 1.25, 1] : 1,
              opacity: isPlaying ? 1 : 0.2
            }}
            transition={{ 
              repeat: isPlaying ? Infinity : 0, 
              duration: 3,
              ease: "easeInOut"
            }}
            className={`w-2.5 h-2.5 rounded-full border border-ink transition-colors duration-1000 ${isPlaying ? 'bg-ink' : 'bg-transparent'}`}
          />
          
          <div className="absolute left-10 overflow-hidden whitespace-nowrap">
             <span className="text-[7px] font-black uppercase tracking-[0.5em] text-ink/20 group-hover:text-ink/60 block translate-y-px">
               {isPlaying ? 'Bossa Lounge & Bass' : 'System Muted'}
             </span>
          </div>
        </button>
      </Magnetic>

      {/* Discrete Analog Slider Container */}
      <Magnetic strength={0.1}>
        <div className="pointer-events-auto flex items-center origin-left -rotate-90 md:rotate-0 md:ml-24 opacity-0 hover:opacity-100 transition-all duration-[1s] ease-out cursor-audio">
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-[3px] bg-ink/[0.05] flex items-center">
              {/* Volume Ticks */}
              <div className="absolute inset-0 flex justify-between px-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-[1px] h-full bg-ink/10" />
                ))}
              </div>
              
              <motion.div 
                className="absolute top-0 left-0 h-full bg-accent mix-blend-multiply"
                style={{ width: `${volume * 100}%` }}
              />
              
              <input 
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-none"
              />
            </div>
            
            <div className="flex flex-col">
              <span className="text-[6px] font-bold text-ink/30 uppercase tracking-[0.2em] leading-none mb-1">Gain</span>
              <span className="text-[8px] font-mono font-bold text-ink/60 leading-none">{(volume * 10).toFixed(1)} db</span>
            </div>
          </div>
        </div>
      </Magnetic>

      {/* Side Decorative Line */}
      <div className="absolute bottom-0 left-10 w-[200px] h-px bg-ink/[0.03] origin-left -rotate-0 pointer-events-none" />
    </div>
  );
};
