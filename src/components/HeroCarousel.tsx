import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles } from 'lucide-react';
import { carouselItems } from '../data/catData';
import { useAudio } from '../contexts/AudioContext';

export default function HeroCarousel() {
  const { playSfx } = useAudio();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const length = carouselItems.length;

  const nextSlide = () => {
    playSfx('click');
    setCurrentIndex((prev) => (prev === length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    playSfx('click');
    setCurrentIndex((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  // Slideshow auto-advance simulation
  useEffect(() => {
    if (isPlaying && !isHovered) {
      autoplayRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev === length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => {
      if (autoplayRef.current) {
        clearTimeout(autoplayRef.current);
      }
    };
  }, [currentIndex, isPlaying, isHovered, length]);

  const handleTogglePlay = () => {
    playSfx('click');
    setIsPlaying(!isPlaying);
  };

  return (
    <section 
      id="hero"
      className="relative h-[480px] sm:h-[580px] md:h-[650px] w-full overflow-hidden bg-[#2C221E] font-sans"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Slideshow Render Area with high-vibe dramatic warm shadows */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`slide-${currentIndex}`}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Cinematic Overlay gradient layers to emphasize visual depth & cozy aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2C221E]/90 via-[#2C221E]/45 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C221E]/95 via-transparent to-[#2C221E]/10 z-10" />
            
            <img
              src={carouselItems[currentIndex].image}
              alt={carouselItems[currentIndex].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center brightness-[0.85] contrast-[1.03] saturate-[0.95]"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Copywriting Typography Overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-start max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-xl text-stone-100 text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentIndex}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="space-y-4 md:space-y-6"
            >
              {/* Top Pill Emblem */}
              <div className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md text-orange-200 px-4 py-1.5 rounded-full text-[10px] tracking-[0.18em] uppercase font-bold shadow-sm select-none">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>
                  {carouselItems[currentIndex].tagline}
                </span>
                <span className="text-[9px] bg-orange-400/20 text-orange-350 px-2 py-0.5 rounded font-mono">
                  光影氛围阁
                </span>
              </div>

              {/* Display Header */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-white drop-shadow-sm">
                {carouselItems[currentIndex].title}
              </h1>

              {/* Exquisite soft descriptive text */}
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-normal font-sans max-w-lg">
                {carouselItems[currentIndex].subtitle}
              </p>
              
              {/* Action and Control buttons on the warm interface */}
              <div className="pt-3 flex flex-wrap gap-3.5 items-center">
                <a
                  href="#popular"
                  onClick={() => playSfx('click')}
                  className="px-6 py-2.5 bg-orange-400 hover:bg-orange-500 text-white font-bold tracking-wider uppercase rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm text-3xs"
                >
                  探索雅致美学展馆 🐾
                </a>
                <a
                  href="#breeds"
                  onClick={() => playSfx('click')}
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-stone-100 border border-white/20 backdrop-blur-md font-bold tracking-wider uppercase rounded-full transition-all duration-300 transform hover:-translate-y-0.5 text-3xs"
                >
                  解锁品种秘密档案 📚
                </a>

                {/* Slideshow Active Play/Pause Switch */}
                <button
                  onClick={handleTogglePlay}
                  className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white rounded-full backdrop-blur-md transition-all duration-200 shadow-3xs cursor-pointer"
                  title={isPlaying ? '暂停幻灯片' : '自动播放'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-white text-white" />
                  ) : (
                    <Play className="w-4 h-4 fill-white text-white" />
                  )}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Navigator Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/10 border border-white/20 text-white/95 hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/10 border border-white/20 text-white/95 hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Navigation Dot Indicators on Bottom of Hero */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center space-x-2.5 select-none">
        {carouselItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              playSfx('click');
              setCurrentIndex(idx);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
              currentIndex === idx
                ? 'w-6.5 bg-orange-400'
                : 'w-1.5 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
