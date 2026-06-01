import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  emoji: string;
  color: string;
  angle?: number;
}

interface FloatingBubble {
  id: number;
  x: number; // percentage width
  delay: number;
  size: number;
  duration: number;
  type: string;
}

export default function LiveVibeOverlay() {
  const { playSfx, sfxEnabled } = useAudio();
  const [trails, setTrails] = useState<Particle[]>([]);
  const [floaterList, setFloaterList] = useState<FloatingBubble[]>([]);
  const [isActive, setIsActive] = useState(true);

  // Generate stable, low-saturation background particles
  useEffect(() => {
    const list: FloatingBubble[] = [];
    for (let i = 0; i < 12; i++) {
      list.push({
        id: Math.random(),
        x: Math.random() * 92 + 4, // keep inside boundaries
        delay: Math.random() * 8,
        size: Math.random() * 15 + 10,
        duration: Math.random() * 15 + 12,
        type: ['🐾', '🌾', '✨', '🫧', '⚪'][Math.floor(Math.random() * 5)]
      });
    }
    setFloaterList(list);
  }, []);

  // Track cursor movement for elegant graphite trailing dust
  useEffect(() => {
    if (!isActive) return;

    let lastTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 50) return; // limit emission rates
      lastTime = now;

      setTrails((prev) => {
        const next = [...prev];
        if (next.length > 12) next.shift(); // keep DOM clean
        
        const emojis = ['✨', '🐾', '🫧', '⚪', '◇'];
        const colors = [
          'text-stone-300',
          'text-stone-400',
          'text-stone-500',
          'text-stone-200',
          'text-stone-650'
        ];

        next.push({
          id: Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 8 + 8,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          color: colors[Math.floor(Math.random() * colors.length)]
        });
        return next;
      });
    };

    // Burst tiny elements upon mouse clicking
    const handleMouseClick = (e: MouseEvent) => {
      const bursts: Particle[] = [];
      const burstEmojis = ['🐾', '✨', '⚪', '◇', '▪️'];
      
      for (let i = 0; i < 6; i++) {
        const rad = (i * Math.PI) / 3;
        bursts.push({
          id: Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 10 + 10,
          emoji: burstEmojis[i % burstEmojis.length],
          color: 'text-stone-400',
          angle: rad
        });
      }

      setTrails((prev) => [...prev, ...bursts]);
      setTimeout(() => {
        setTrails((prev) => prev.filter((p) => !bursts.includes(p)));
      }, 700);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
    };
  }, [isActive]);

  // Clean active trailing particles
  useEffect(() => {
    if (trails.length === 0) return;
    const timer = setTimeout(() => {
      setTrails((prev) => {
        if (prev.length === 0) return prev;
        const next = [...prev];
        next.shift();
        return next;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [trails]);

  return (
    <>
      {isActive && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
          {/* Continuous slow rising atmospheric elements */}
          {floaterList.map((bubble) => (
            <div
              key={bubble.id}
              className="absolute bottom-[-55px] animate-float opacity-20 text-stone-300"
              style={{
                left: `${bubble.x}%`,
                fontSize: `${bubble.size}px`,
                animationDelay: `${bubble.delay}s`,
                animationDuration: `${bubble.duration}s`,
              }}
            >
              {bubble.type}
            </div>
          ))}

          {/* Mouse active particles */}
          <AnimatePresence>
            {trails.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{
                  opacity: 0.85,
                  scale: 0.8,
                  x: particle.x - particle.size / 2,
                  y: particle.y - particle.size / 2,
                }}
                animate={{
                  opacity: 0,
                  scale: particle.angle ? 1.6 : 0.3,
                  x: particle.angle 
                    ? particle.x - particle.size / 2 + Math.cos(particle.angle) * 60
                    : particle.x - particle.size / 2 + (Math.random() - 0.5) * 20,
                  y: particle.angle 
                    ? particle.y - particle.size / 2 + Math.sin(particle.angle) * 60
                    : particle.y - particle.size / 2 - 45, // drift slowly up
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: particle.angle ? 0.6 : 0.9, ease: 'easeOut' }}
                className={`absolute pointer-events-none drop-shadow-sm font-semibold opacity-70 ${particle.color}`}
                style={{ fontSize: `${particle.size}px` }}
              >
                {particle.emoji}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Floating Toggle Pill Widget */}
      <div className="fixed bottom-24 right-6 z-40">
        <button
          onClick={() => {
            playSfx('click');
            setIsActive(!isActive);
          }}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-2xs font-medium shadow-sm transition-all duration-300 backdrop-blur-md cursor-pointer ${
            isActive
              ? 'bg-stone-900 border-stone-850 text-stone-50 hover:bg-stone-800 scale-102'
              : 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50 hover:text-stone-700'
          }`}
          title={isActive ? '关闭足迹特效' : '开启足迹特效'}
        >
          {isActive ? (
            <>
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="text-2xs"
              >
                🐾
              </motion.span>
              <span>足迹: 启</span>
            </>
          ) : (
            <>
              <span>💤</span>
              <span>足迹: 静</span>
            </>
          )}
        </button>
      </div>

      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.25;
          }
          90% {
            opacity: 0.25;
          }
          100% {
            transform: translateY(-105vh) rotate(360deg) translateX(35px);
            opacity: 0;
          }
        }
        .animate-float {
          will-change: transform, opacity;
          animation-name: float;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
      `}</style>
    </>
  );
}
