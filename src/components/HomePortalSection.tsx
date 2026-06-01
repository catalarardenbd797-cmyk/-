import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Heart, 
  Zap, 
  BookOpen, 
  ArrowRight, 
  Utensils, 
  User, 
  Flame, 
  Trophy, 
  PenLine, 
  Check, 
  RotateCcw,
  Volume2
} from 'lucide-react';
import { careTips } from '../data/catData';
import { useAudio } from '../contexts/AudioContext';

interface HomePortalSectionProps {
  onTabChange: (tabId: 'exhibition' | 'popular' | 'breeds' | 'gallery' | 'education' | 'interactive') => void;
}

export default function HomePortalSection({ onTabChange }: HomePortalSectionProps) {
  const { playSfx, sfxEnabled } = useAudio();

  // 1. Cloud Cat Stats
  const [catName, setCatName] = useState<string>(() => {
    return localStorage.getItem('cat_name') || '喵酱';
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(catName);

  const [friendshipScore, setFriendshipScore] = useState<number>(() => {
    const saved = localStorage.getItem('cat_friendship');
    return saved ? parseInt(saved, 10) : 15;
  });
  const [hunger, setHunger] = useState<number>(() => {
    const saved = localStorage.getItem('cat_hunger');
    return saved ? parseInt(saved, 10) : 75; // 0 = starving, 100 = full
  });
  const [energy, setEnergy] = useState<number>(() => {
    const saved = localStorage.getItem('cat_energy');
    return saved ? parseInt(saved, 10) : 80; // 0 = tired, 100 = high
  });

  const [catState, setCatState] = useState<'idle' | 'happy' | 'eating' | 'playing' | 'sleeping'>('idle');
  const [bubbleText, setBubbleText] = useState('喵呜~ 铲屎官，在这里也可以拍拍我、科学投喂或逗我玩哦！💕');
  const [feedbackEmoji, setFeedbackEmoji] = useState<string | null>(null);

  // Sync state with localStorage and dispatch custom event to keep InteractiveCat synced if they switch tabs
  useEffect(() => {
    localStorage.setItem('cat_name', catName);
  }, [catName]);

  useEffect(() => {
    localStorage.setItem('cat_friendship', friendshipScore.toString());
    // Dispatch scroll/state update event
    window.dispatchEvent(new Event('storage'));
  }, [friendshipScore]);

  useEffect(() => {
    localStorage.setItem('cat_hunger', hunger.toString());
    window.dispatchEvent(new Event('storage'));
  }, [hunger]);

  useEffect(() => {
    localStorage.setItem('cat_energy', energy.toString());
    window.dispatchEvent(new Event('storage'));
  }, [energy]);

  // Synchronizer with external modifications
  useEffect(() => {
    const handleStorageChange = () => {
      const savedFriendship = localStorage.getItem('cat_friendship');
      if (savedFriendship) setFriendshipScore(parseInt(savedFriendship, 10));
      const savedHunger = localStorage.getItem('cat_hunger');
      if (savedHunger) setHunger(parseInt(savedHunger, 10));
      const savedEnergy = localStorage.getItem('cat_energy');
      if (savedEnergy) setEnergy(parseInt(savedEnergy, 10));
      const savedName = localStorage.getItem('cat_name');
      if (savedName) setCatName(savedName);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Web Audio Synthesizer: Cute custom waveforms
  const playLocalSynth = (type: 'meow' | 'purr' | 'eat' | 'play' | 'bell') => {
    if (!sfxEnabled) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;
      const audioCtx = new AudioCtxClass();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      if (type === 'meow') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(450, audioCtx.currentTime);
        osc.frequency.quadraticRampToValueAtTime(750, audioCtx.currentTime + 0.1);
        osc.frequency.quadraticRampToValueAtTime(550, audioCtx.currentTime + 0.3);

        gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } else if (type === 'purr') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(85, audioCtx.currentTime);
        for (let i = 0; i < 4; i++) {
          osc.frequency.setValueAtTime(85, audioCtx.currentTime + i * 0.08);
          osc.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + i * 0.08 + 0.04);
        }
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(100, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } else if (type === 'eat') {
        [0, 0.1].forEach((delay) => {
          const oscE = audioCtx.createOscillator();
          const gainE = audioCtx.createGain();
          oscE.type = 'triangle';
          oscE.frequency.setValueAtTime(280, audioCtx.currentTime + delay);
          oscE.frequency.exponentialRampToValueAtTime(85, audioCtx.currentTime + delay + 0.05);

          gainE.gain.setValueAtTime(0.03, audioCtx.currentTime + delay);
          gainE.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + 0.05);

          oscE.connect(gainE);
          gainE.connect(audioCtx.destination);
          oscE.start(audioCtx.currentTime + delay);
          oscE.stop(audioCtx.currentTime + delay + 0.06);
        });
      } else if (type === 'play') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1100, audioCtx.currentTime + 0.18);

        gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.18);
      } else if (type === 'bell') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(980, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
      }
    } catch (e) {
      // Ignored browser gesture block safely
    }
  };

  const showEmojiFeedback = (emoji: string) => {
    setFeedbackEmoji(emoji);
    setTimeout(() => {
      setFeedbackEmoji(null);
    }, 1200);
  };

  // Pet cat logic
  const handlePetCat = () => {
    playLocalSynth('purr');
    showEmojiFeedback('💖');
    setFriendshipScore(prev => prev + 1);
    setHunger(prev => Math.max(0, prev - 1));
    setCatState('happy');
    const pets = [
      `呼噜呼噜... ${catName}舒服极了，小尾巴正在轻轻画圈！✨`,
      `喵呜~ 被温暖的大手抚摸，本喵的心灵彻底被治愈了~ 🥰`,
      `贴贴你！今天也是爱你的一天，要常常来摸摸我的耳朵根哦。🐾`
    ];
    setBubbleText(pets[Math.floor(Math.random() * pets.length)]);
    setTimeout(() => setCatState('idle'), 1200);
  };

  // Feed Canned Food logic
  const handleFeedCat = () => {
    if (hunger >= 100) {
      playLocalSynth('meow');
      setBubbleText(`嗝~ ${catName}的小肚皮已经像气球一样圆啦！等等再喂我吧 😻`);
      return;
    }
    playLocalSynth('eat');
    showEmojiFeedback('🥫');
    setHunger(prev => Math.min(100, prev + 25));
    setFriendshipScore(prev => prev + 4);
    setCatState('eating');
    setBubbleText(`哇啊！是鲜美无比的金枪鱼肉泥罐头！【${catName}】正在大口暴食中！🐟🥫`);
    setTimeout(() => setCatState('idle'), 1200);
  };

  // Play Play logic
  const handlePlayCat = () => {
    if (energy < 15) {
      playLocalSynth('meow');
      setCatState('sleeping');
      setBubbleText(`（累趴下打瞌睡）小能量耗尽啦，我要先呼呼大睡或者吃点零食补充元气... 💤`);
      setTimeout(() => setCatState('idle'), 3000);
      return;
    }
    playLocalSynth('play');
    showEmojiFeedback('🧶');
    setEnergy(prev => Math.max(0, prev - 15));
    setFriendshipScore(prev => prev + 3);
    setCatState('playing');
    setBubbleText(`看我的无影闪电利爪！这个彩色毛线球完全逃不出我的手掌心！🧶⚡`);
    setTimeout(() => setCatState('idle'), 1200);
  };

  // Rename action
  const handleSaveName = () => {
    if (!nameInput.trim()) return;
    setCatName(nameInput.trim());
    setIsEditingName(false);
    playLocalSynth('bell');
    setBubbleText(`好开心！以后我就叫【${nameInput.trim()}】啦！听到这个帅气的名字本喵精神百倍！🐾`);
  };

  const getRelationLevel = (score: number) => {
    const lvl = Math.floor(score / 15) + 1;
    let title = '萍水相逢';
    if (lvl === 2) title = '渐入佳境';
    if (lvl === 3) title = '心有灵犀';
    if (lvl === 4) title = '依依不舍';
    if (lvl >= 5) title = '生死相随';
    return { lvl, title };
  };

  const { lvl, title: relTitle } = getRelationLevel(friendshipScore);

  const getCatEmoji = () => {
    if (catState === 'sleeping') return '💤 🐱';
    if (catState === 'happy') return '🥰 🐱';
    if (catState === 'eating') return '🥫 😸';
    if (catState === 'playing') return '⚡ 😼';
    return '🐱';
  };

  // Pick top two curated scientific articles
  const previewTips = careTips.slice(0, 2);

  return (
    <section id="home-portals" className="py-24 bg-[#FAF6F0] border-b border-orange-100/40">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange-500/80 font-bold mb-3">
            04 / INTERACTIVE PORTALS
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#4A3E3D] tracking-tight leading-tight">
            云端相伴 · 科学养育 <span className="font-light text-stone-400">/ Interactions & Columns</span>
          </h2>
          <p className="text-[#8C7A6B] font-normal text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
            科学与爱的灵感迸发。既可一键潜入科学养猫硬核科普殿堂，又能即刻在线开启“云养猫”萌宠治愈陪伴！
          </p>
        </div>

        {/* Dual Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: 科普专栏 Highlights Portal (6 Cols) */}
          <div className="lg:col-span-6 bg-white rounded-[32px] border border-orange-100/50 p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl hover:scale-[1.015] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-orange-100/10 blur-2xl pointer-events-none group-hover:scale-110 transition-transform" />
            
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-orange-50 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-orange-50 text-orange-550 rounded-xl flex items-center justify-center border border-orange-100/35">
                    <BookOpen className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-md font-bold text-[#4A3E3D] leading-tight">科学养育科普专栏</h3>
                    <p className="text-3xs text-[#8C7A6B] font-mono tracking-wider">EDUCATION COLUMN</p>
                  </div>
                </div>
                <span className="text-[10px] text-orange-500 bg-orange-50 border border-orange-100/30 px-2.5 py-0.5 rounded-full font-bold">
                  权威硬核知识库
                </span>
              </div>

              {/* Tips Teasers */}
              <div className="space-y-4">
                {previewTips.map((tip, idx) => (
                  <div 
                    key={tip.id}
                    onClick={() => {
                      playSfx('click');
                      onTabChange('education');
                    }}
                    className="p-4 rounded-2xl bg-[#FAF6F0]/40 hover:bg-[#FAF6F0] border border-orange-100/20 hover:border-orange-200/50 cursor-pointer transition-all duration-200 text-left space-y-1.5 group/item"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-orange-500 px-2 py-0.2 bg-orange-50 rounded-md">
                        {tip.category === 'diet' ? '饮食科学' : '健康诊籍'}
                      </span>
                      <span className="text-3xs text-stone-400">
                        {tip.readTime}阅读
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#4A3E3D] group-hover/item:text-orange-500 transition-colors line-clamp-1">
                      {tip.title}
                    </h4>
                    <p className="text-3xs text-[#8C7A6B] leading-relaxed line-clamp-2">
                      {tip.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation CTA Button */}
            <div className="pt-6 mt-6 border-t border-orange-50 flex items-center justify-between">
              <p className="text-3xs text-[#8C7A6B] leading-relaxed max-w-xs">
                * 拒绝非理智、伪常识。精选前沿猫咪行为学与临床医护常识。
              </p>
              <button
                onClick={() => {
                  playSfx('click');
                  onTabChange('education');
                }}
                className="px-5 py-2.5 bg-[#FAF6F0] hover:bg-orange-500 text-[#5E503F] hover:text-white font-bold text-xs rounded-2xl flex items-center gap-1.5 transition-all duration-200 shadow-3xs cursor-pointer hover:-translate-y-0.5"
              >
                <span>探索全部专栏</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT: 云养猫 Live Mini-Game Portal (6 Cols) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-orange-50/40 via-orange-100/10 to-white rounded-[32px] border border-orange-150/70 p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl hover:scale-[1.015] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            {/* Absolute Particle Flow background */}
            <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-amber-100/15 blur-3xl pointer-events-none" />
            
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-orange-50 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-orange-400 text-white rounded-xl flex items-center justify-center border border-orange-200 shadow-3xs">
                    <Sparkles className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-md font-bold text-[#4A3E3D] leading-tight">云养猫互动小游戏</h3>
                    <p className="text-3xs text-[#8C7A6B] font-mono tracking-wider">CLOUD CAT CORNER</p>
                  </div>
                </div>

                {/* Rel Level and point count */}
                <span className="text-[10px] font-bold text-orange-700 bg-orange-100/70 px-2.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <Heart className="w-3 h-3 fill-rose-500 text-rose-500 animate-pulse" />
                  <span>{relTitle} Lv.{lvl}</span>
                </span>
              </div>

              {/* Naming Section */}
              <div className="flex items-center gap-2 text-left">
                <span className="text-xs text-[#8C7A6B] font-semibold">小猫昵称: </span>
                {isEditingName ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      maxLength={10}
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="px-2 py-1 bg-white border border-orange-200 text-xs text-[#4A3E3D] rounded-lg focus:outline-none focus:border-orange-400 w-28"
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-1 px-2.5 bg-orange-400 hover:bg-orange-500 text-white rounded-lg text-3xs font-bold cursor-pointer"
                    >
                      保存
                    </button>
                    <button
                      onClick={() => {
                        setNameInput(catName);
                        setIsEditingName(false);
                      }}
                      className="p-1 text-stone-400 text-3xs font-semibold hover:text-[#4A3E3D] cursor-pointer"
                    >
                      取消
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 group/name">
                    <span className="text-xs font-bold text-orange-550 border-b border-dashed border-orange-300">
                      {catName}
                    </span>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="p-1 text-stone-400 hover:text-orange-500 transition-colors opacity-0 group-hover/name:opacity-100 focus:opacity-100 cursor-pointer"
                      title="重命名你的小猫"
                    >
                      <PenLine className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Dynamic Pet Render Widget (Very polished interactive element) */}
              <div className="relative bg-white/70 backdrop-blur-md rounded-2xl border border-orange-100/50 p-4.5 flex items-center gap-5 shadow-3xs overflow-hidden leading-relaxed">
                {/* Float Emoji Feedback */}
                <AnimatePresence>
                  {feedbackEmoji && (
                    <motion.div
                      initial={{ y: 20, scale: 0.5, opacity: 0 }}
                      animate={{ y: -30, scale: 1.2, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute left-10 top-1/2 text-2xl z-30 pointer-events-none select-none font-mono"
                    >
                      {feedbackEmoji}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Animated Cat Sphere avatar in SVG/CSS */}
                <div 
                  onClick={handlePetCat}
                  className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-gradient-to-[#FFE8D6] from-orange-150 rounded-full flex items-center justify-center border-2 border-orange-200/60 cursor-pointer hover:scale-105 active:scale-95 transition-all relative overflow-hidden select-none"
                  title={`点击抚摸 ${catName}`}
                >
                  <div className="text-3xl sm:text-4xl filter drop-shadow-3xs translate-y-0.5 select-none font-mono">
                    {getCatEmoji().split(' ')[1] || '🐱'}
                  </div>
                  {/* Sleeping bubble */}
                  {catState === 'sleeping' && (
                    <span className="absolute top-1 right-1 text-2xs animate-bounce font-mono">💤</span>
                  )}
                </div>

                {/* Speech Bubble */}
                <div className="flex-1 text-left space-y-1 relative">
                  <div className="absolute top-1.5 -left-1.5 w-2 h-2 bg-amber-50 border-l border-b border-orange-100 rotate-45" />
                  <p className="text-3xs text-[#8C7A6B] bg-[#FAF6F0] p-3 rounded-xl border border-orange-100/35 relative z-10 leading-normal">
                    {bubbleText}
                  </p>
                </div>
              </div>

              {/* Live Gauges */}
              <div className="grid grid-cols-3 gap-2.5 font-mono text-[10px] text-stone-500 text-left">
                {/* Gauge 1: Hunger */}
                <div className="bg-white/50 backdrop-blur-3xs p-2 rounded-xl border border-orange-100/20">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-orange-500">饱腹 🥫</span>
                    <span>{hunger}%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-1 rounded-full overflow-hidden">
                    <div className="bg-orange-400 h-full transition-all duration-300" style={{ width: `${hunger}%` }} />
                  </div>
                </div>

                {/* Gauge 2: Energy */}
                <div className="bg-white/50 backdrop-blur-3xs p-2 rounded-xl border border-orange-100/20">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-amber-500">元气 ⚡</span>
                    <span>{energy}%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-1 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full transition-all duration-300" style={{ width: `${energy}%` }} />
                  </div>
                </div>

                {/* Gauge 3: Friendship */}
                <div className="bg-white/50 backdrop-blur-3xs p-2 rounded-xl border border-orange-100/20">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-rose-500">亲密 💓</span>
                    <span>{friendshipScore}</span>
                  </div>
                  <div className="w-full bg-stone-100 h-1 rounded-full overflow-hidden">
                    <div className="bg-rose-400 h-full transition-all duration-305" style={{ width: `${Math.min(100, friendshipScore)}%` }} />
                  </div>
                </div>
              </div>

              {/* Interaction Buttons Grid */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={handlePetCat}
                  className="py-2 bg-orange-50 hover:bg-orange-100 border border-orange-100 text-orange-850 hover:text-orange-950 text-3xs font-bold rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 shadow-3xs"
                >
                  <span>摸摸它 🥰</span>
                </button>
                <button
                  onClick={handleFeedCat}
                  className="py-2 bg-orange-50 hover:bg-orange-100 border border-orange-100 text-orange-850 hover:text-orange-950 text-3xs font-bold rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 shadow-3xs"
                >
                  <span>喂大餐 🥫</span>
                </button>
                <button
                  onClick={handlePlayCat}
                  className="py-2 bg-orange-50 hover:bg-orange-100 border border-orange-100 text-orange-850 hover:text-orange-950 text-3xs font-bold rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 shadow-3xs"
                >
                  <span>毛线球 🧶</span>
                </button>
              </div>
            </div>

            {/* Portal Action CTA */}
            <div className="pt-6 mt-6 border-t border-orange-50 flex items-center justify-between">
              <span className="text-[10px] text-stone-400 font-mono">
                * 喂食/爱抚数值完美同步专属大猫舍，安全免丢。
              </span>
              <button
                onClick={() => {
                  playSfx('click');
                  onTabChange('interactive');
                }}
                className="px-5 py-2.5 bg-orange-400 hover:bg-orange-500 text-white font-bold text-xs rounded-2xl flex items-center gap-1.5 transition-all duration-200 shadow-sm cursor-pointer hover:-translate-y-0.5"
              >
                <span>进入豪华猫舍</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
