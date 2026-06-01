import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AudioContextType {
  bgmEnabled: boolean;
  sfxEnabled: boolean;
  bgmVolume: number;
  sfxVolume: number;
  isSynthBgm: boolean;
  isPlaying: boolean;
  setBgmEnabled: (enabled: boolean) => void;
  setSfxEnabled: (enabled: boolean) => void;
  setBgmVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
  setIsSynthBgm: (isSynth: boolean) => void;
  toggleBgm: () => void;
  toggleSfx: () => void;
  playSfx: (type: 'click' | 'meow' | 'success' | 'bell' | 'chime' | 'purr') => void;
  startAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// High-quality public-domain gentle piano back-up loops (Mixkit copyright-free links)
const GENTLE_PIANO_MP3 = 'https://assets.mixkit.co/music/preview/mixkit-peaceful-piano-510.mp3';

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bgmEnabled, setBgmEnabledState] = useState<boolean>(() => {
    const saved = localStorage.getItem('audio_bgm_enabled');
    return saved ? saved === 'true' : false; // Start off by default (or true, but browser restrictions exist)
  });
  const [sfxEnabled, setSfxEnabledState] = useState<boolean>(() => {
    const saved = localStorage.getItem('audio_sfx_enabled');
    return saved ? saved === 'true' : true;
  });
  const [bgmVolume, setBgmVolumeState] = useState<number>(() => {
    const saved = localStorage.getItem('audio_bgm_volume');
    return saved ? parseFloat(saved) : 0.25;
  });
  const [sfxVolume, setSfxVolumeState] = useState<number>(() => {
    const saved = localStorage.getItem('audio_sfx_volume');
    return saved ? parseFloat(saved) : 0.45;
  });
  const [isSynthBgm, setIsSynthBgmState] = useState<boolean>(() => {
    const saved = localStorage.getItem('audio_is_synth_bgm');
    return saved ? saved === 'true' : true; // default to ultra-cozy, 100% reliable procedural Web Audio synth
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Web Audio refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthTimerRef = useRef<number | null>(null);
  const synthNodesRef = useRef<AudioNode[]>([]);
  const delayNodeRef = useRef<DelayNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const bgmGainRef = useRef<GainNode | null>(null);

  // Audio elements for static files
  const audioElRef = useRef<HTMLAudioElement | null>(null);

  // Initialize browser AudioContext lazily on user interaction
  const initAudioCtx = () => {
    if (audioCtxRef.current) return audioCtxRef.current;

    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      // Create a gorgeous feedback delay loop for deep ambient synth reverb
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, ctx.currentTime); // Cut harsh high frequencies

      const delay = ctx.createDelay(1.5);
      delay.delayTime.setValueAtTime(0.45, ctx.currentTime); // 450ms stereo echo

      const feedback = ctx.createGain();
      feedback.gain.setValueAtTime(0.32, ctx.currentTime); // nice lingering echo trail

      const bgmGain = ctx.createGain();
      bgmGain.gain.setValueAtTime(bgmVolume, ctx.currentTime);

      // Route echo: delay -> feedback -> delay
      delay.connect(feedback);
      feedback.connect(delay);

      // Route main mixing channel: notes -> filter -> delay -> bgmGain -> dest
      // notes -> filter -> bgmGain -> dest (for direct clean mix)
      filter.connect(bgmGain);
      filter.connect(delay);
      delay.connect(bgmGain);
      bgmGain.connect(ctx.destination);

      filterNodeRef.current = filter;
      delayNodeRef.current = delay;
      bgmGainRef.current = bgmGain;

      // Handle audio element route (for MP3 loop)
      const audioEl = new Audio(GENTLE_PIANO_MP3);
      audioEl.loop = true;
      audioEl.crossOrigin = 'anonymous';
      
      // Connect MP3 loop directly to bgmGain too to enjoy the volume sliders
      const source = ctx.createMediaElementSource(audioEl);
      source.connect(bgmGain);
      audioElRef.current = audioEl;

      return ctx;
    } catch (e) {
      console.warn('Web Audio initialization error, falling back to basic audio elements', e);
      return null;
    }
  };

  const startAudio = async () => {
    const ctx = initAudioCtx();
    if (ctx && ctx.state === 'suspended') {
      await ctx.resume();
    }
    setIsPlaying(true);
  };

  // Helper: Persist and set states
  const setBgmEnabled = (enabled: boolean) => {
    setBgmEnabledState(enabled);
    localStorage.setItem('audio_bgm_enabled', String(enabled));
    if (enabled) {
      startAudio();
    }
  };

  const setSfxEnabled = (enabled: boolean) => {
    setSfxEnabledState(enabled);
    localStorage.setItem('audio_sfx_enabled', String(enabled));
    if (enabled) {
      startAudio();
    }
  };

  const setBgmVolume = (volume: number) => {
    setBgmVolumeState(volume);
    localStorage.setItem('audio_bgm_volume', String(volume));
    if (bgmGainRef.current && audioCtxRef.current) {
      bgmGainRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
    if (audioElRef.current) {
      audioElRef.current.volume = volume;
    }
  };

  const setSfxVolume = (volume: number) => {
    setSfxVolumeState(volume);
    localStorage.setItem('audio_sfx_volume', String(volume));
  };

  const setIsSynthBgm = (isSynth: boolean) => {
    setIsSynthBgmState(isSynth);
    localStorage.setItem('audio_is_synth_bgm', String(isSynth));
  };

  const toggleBgm = () => setBgmEnabled(!bgmEnabled);
  const toggleSfx = () => setSfxEnabled(!sfxEnabled);

  // SFX Synth: Cozy, cute dynamic sound synthesis
  const playSfx = (type: 'click' | 'meow' | 'success' | 'bell' | 'chime' | 'purr') => {
    if (!sfxEnabled) return;
    const ctx = initAudioCtx();
    if (!ctx) return;
    
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'click') {
        // Soft bubble pop / raindrop sound design
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(sfxVolume * 0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      } else if (type === 'chime') {
        // High sparkling bell
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, ctx.currentTime); // B5 note
        osc.frequency.linearRampToValueAtTime(1318.51, ctx.currentTime + 0.15); // E6 slide

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(sfxVolume * 0.35, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.37);
      } else if (type === 'success') {
        // Uplifting cute arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const oscSeq = ctx.createOscillator();
          const gainSeq = ctx.createGain();
          oscSeq.type = 'sine';
          oscSeq.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

          gainSeq.gain.setValueAtTime(sfxVolume * 0.2, ctx.currentTime + idx * 0.06);
          gainSeq.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.06 + 0.2);

          oscSeq.connect(gainSeq);
          gainSeq.connect(ctx.destination);
          oscSeq.start(ctx.currentTime + idx * 0.06);
          oscSeq.stop(ctx.currentTime + idx * 0.06 + 0.22);
        });
      } else if (type === 'meow') {
        // Cute dynamic cat meow
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(450, ctx.currentTime);
        osc.frequency.quadraticRampToValueAtTime(780, ctx.currentTime + 0.1);
        osc.frequency.quadraticRampToValueAtTime(520, ctx.currentTime + 0.35);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(sfxVolume * 0.45, ctx.currentTime + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.36);
      } else if (type === 'bell') {
        // Golden collar ring bell
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5

        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1174.66, ctx.currentTime); // D6

        const gain2 = ctx.createGain();

        gain.gain.setValueAtTime(sfxVolume * 0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

        gain2.gain.setValueAtTime(sfxVolume * 0.3, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

        osc.connect(gain);
        osc2.connect(gain2);
        gain.connect(ctx.destination);
        gain2.connect(ctx.destination);

        osc.start();
        osc2.start();
        osc.stop(ctx.currentTime + 0.61);
        osc2.stop(ctx.currentTime + 0.61);
      } else if (type === 'purr') {
        // Cat purring sound frequency
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(85, ctx.currentTime);
        for (let i = 0; i < 4; i++) {
          osc.frequency.setValueAtTime(85, ctx.currentTime + i * 0.1);
          osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + i * 0.1 + 0.05);
        }
        
        const biquad = ctx.createBiquadFilter();
        biquad.type = 'lowpass';
        biquad.frequency.setValueAtTime(105, ctx.currentTime);

        gain.gain.setValueAtTime(sfxVolume * 0.6, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

        osc.connect(biquad);
        biquad.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.41);
      }
    } catch (e) {
      console.warn('SFX player error:', e);
    }
  };

  // Background Ambient Procedural Piano Player Setup
  // Synthesizes a beautiful healing space-progression piano chord loop
  const triggerProceduralNote = (ctx: AudioContext, filterNode: BiquadFilterNode) => {
    // Beautiful healing chord roots (pentatonic & lush chords in C major / F major / G major)
    const chordProgressions = [
      // C Maj9 (C3, E3, G3, B3, D4)
      [130.81, 164.81, 196.00, 246.94, 293.66],
      // F Maj9 (F3, A3, C4, E4, G4)
      [174.61, 220.00, 261.63, 329.63, 392.00],
      // G6/9 (G3, B3, D4, E4, A4)
      [196.00, 246.94, 293.66, 329.63, 440.00],
      // A min9 (A2, C3, E3, G3, B3, C4)
      [110.00, 130.81, 164.81, 196.00, 246.94]
    ];

    // Pick a progression based on time
    const timeIndex = Math.floor(Date.now() / 15000) % chordProgressions.length;
    const activeChord = chordProgressions[timeIndex];

    // Harmonious melody notes dynamically chosen (Frequencies corresponding to relaxing sparkles)
    const melodyNotes = [
      261.63, // C4
      293.66, // D4
      329.63, // E4
      392.00, // G4
      440.00, // A4
      523.25, // C5
      587.33, // D5
      659.25, // E5
      783.99, // G5
      880.00, // A5
      1046.50 // C6
    ];

    try {
      // 1. Play baseline chord roots dynamically (low frequency pads)
      const baseNote = activeChord[Math.floor(Math.random() * 2)]; // pick C3/E3, F3/A3 etc
      const oscBase = ctx.createOscillator();
      const gainBase = ctx.createGain();

      oscBase.type = 'sine';
      oscBase.frequency.setValueAtTime(baseNote, ctx.currentTime);

      gainBase.gain.setValueAtTime(0, ctx.currentTime);
      gainBase.gain.linearRampToValueAtTime(bgmVolume * 0.11, ctx.currentTime + 1.2); // slow warm attack
      gainBase.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 5.0); // long release

      oscBase.connect(gainBase);
      gainBase.connect(filterNode);
      oscBase.start();
      oscBase.stop(ctx.currentTime + 5.2);

      // 2. Play 1 or 2 high sparkling piano bell notes, slightly delayed
      const playsMelody = Math.random() < 0.82;
      if (playsMelody) {
        const playCount = Math.random() < 0.4 ? 2 : 1;
        for (let i = 0; i < playCount; i++) {
          const delayTime = i * (0.3 + Math.random() * 0.6); // slightly staggered
          const melodyFreq = melodyNotes[Math.floor(Math.random() * melodyNotes.length)];
          const oscMelody = ctx.createOscillator();
          const oscMelodyHar = ctx.createOscillator(); // smooth high overtone for piano timbre
          const gainMelody = ctx.createGain();

          oscMelody.type = 'sine';
          oscMelodyHar.type = 'triangle';

          oscMelody.frequency.setValueAtTime(melodyFreq, ctx.currentTime + delayTime);
          oscMelodyHar.frequency.setValueAtTime(melodyFreq * 2, ctx.currentTime + delayTime); // octave harmonic

          // Beautiful retro digital electric-piano envelope (pluck)
          gainMelody.gain.setValueAtTime(0, ctx.currentTime + delayTime);
          gainMelody.gain.linearRampToValueAtTime(bgmVolume * 0.16, ctx.currentTime + delayTime + 0.02); // quick soft pluck attack
          gainMelody.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delayTime + 2.4); // soft ringing release

          oscMelody.connect(gainMelody);
          oscMelodyHar.connect(gainMelody);
          gainMelody.connect(filterNode);

          oscMelody.start(ctx.currentTime + delayTime);
          oscMelodyHar.start(ctx.currentTime + delayTime);
          oscMelody.stop(ctx.currentTime + delayTime + 2.5);
          oscMelodyHar.stop(ctx.currentTime + delayTime + 2.5);
        }
      }
    } catch (e) {
      console.warn('Note playing error:', e);
    }
  };

  // Manage loops and background track updates based on configurations
  useEffect(() => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (bgmEnabled && isPlaying) {
      if (isSynthBgm) {
        // Stop MP3 if it's playing
        if (audioElRef.current) {
          audioElRef.current.pause();
        }

        // Run procedural synthesizer timer loops (plays a beautiful soft note progression every 3.2s)
        if (!synthTimerRef.current) {
          const runSynthLoop = () => {
            if (audioCtxRef.current && filterNodeRef.current && bgmEnabled) {
              triggerProceduralNote(audioCtxRef.current, filterNodeRef.current);
            }
            synthTimerRef.current = window.setTimeout(runSynthLoop, 2800 + Math.random() * 1400);
          };
          runSynthLoop();
        }
      } else {
        // Stop Synth timer
        if (synthTimerRef.current) {
          clearTimeout(synthTimerRef.current);
          synthTimerRef.current = null;
        }

        // Play Mixkit background MP3 stream
        if (audioElRef.current) {
          audioElRef.current.volume = bgmVolume;
          audioElRef.current.play().catch((err) => {
            console.warn('MP3 play gesture block, falling back to synth BGM mode', err);
            setIsSynthBgmState(true); // fall back seamlessly to synth
          });
        }
      }
    } else {
      // BGM is disabled: shut down timers and pause elements
      if (synthTimerRef.current) {
        clearTimeout(synthTimerRef.current);
        synthTimerRef.current = null;
      }
      if (audioElRef.current) {
        audioElRef.current.pause();
      }
    }

    return () => {
      if (synthTimerRef.current) {
        clearTimeout(synthTimerRef.current);
        synthTimerRef.current = null;
      }
    };
  }, [bgmEnabled, isSynthBgm, isPlaying, bgmVolume]);

  // Global click-capture interceptor so that ALL buttons/links trigger soft chimes automatically!
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (!sfxEnabled) return;

      // Find if clicking an interactive element (buttons, anchor keys, toggle bars, cards, inputs)
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer');
      if (clickable) {
        // Prevent doubling or annoying continuous taps for slider inputs
        if (clickable.tagName === 'INPUT' && (clickable as HTMLInputElement).type === 'range') {
          return;
        }

        // Avoid playing standard tap sound for specific special interactions (they have their own bespoke sound effect!)
        const isBespokeSoundElement = clickable.closest('#interactive') !== null;
        
        if (isBespokeSoundElement) {
          // Inside the virtual kitty box, let it proceed with its own meow/purr sounds, but plays standard tick on comments likes
          const isCommentsLikesOrSubmit = target.closest('formBtn, .heartLikeBtn, [type="submit"]');
          if (isCommentsLikesOrSubmit) {
            playSfx('click');
          }
        } else {
          // Play a delightful, light raindrop bubble chime
          playSfx('click');
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [sfxEnabled, sfxVolume]);

  return (
    <AudioContext.Provider
      value={{
        bgmEnabled,
        sfxEnabled,
        bgmVolume,
        sfxVolume,
        isSynthBgm,
        isPlaying,
        setBgmEnabled,
        setSfxEnabled,
        setBgmVolume,
        setSfxVolume,
        setIsSynthBgm,
        toggleBgm,
        toggleSfx,
        playSfx,
        startAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
