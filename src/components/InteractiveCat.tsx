import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Send, Check, Volume2, Utensils, Zap, Bell, Moon, Sun, Flame } from 'lucide-react';
import { userComments } from '../data/catData';
import { UserComment } from '../types';
import { useAudio } from '../contexts/AudioContext';

interface ToySpark {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export default function InteractiveCat() {
  const { sfxEnabled, sfxVolume } = useAudio();

  const [catName, setCatName] = useState<string>(() => {
    return localStorage.getItem('cat_name') || '喵酱';
  });

  // Cat persistent parameters
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

  const [activeToy, setActiveToy] = useState<'laser' | 'yarn' | 'none'>('none');
  const [catState, setCatState] = useState<'idle' | 'happy' | 'eating' | 'playing' | 'sleeping'>('idle');
  const [bubbleText, setBubbleText] = useState('喵呜~ 铲屎官好呀！点点我陪你玩，或者喂我吃金枪鱼罐头吧！🐾');
  const [sparks, setSparks] = useState<ToySpark[]>([]);
  const [laserPos, setLaserPos] = useState<{ x: number; y: number } | null>(null);
  const [isBlinking, setIsBlinking] = useState(false);

  // Form comments
  const [comments, setComments] = useState<UserComment[]>(() => {
    const saved = localStorage.getItem('cat_comments');
    return saved ? JSON.parse(saved) : userComments;
  });
  const [newCommentVal, setNewCommentVal] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [selectedAvatarIdx, setSelectedAvatarIdx] = useState(0);
  const [commentSuccess, setCommentSuccess] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const avatars = [
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=150&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=150&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=150&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574158622643-69d34d72650a?q=80&w=150&auto=format&fit=crop',
  ];

  // Natural blink loop
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  // Save changes
  useEffect(() => {
    localStorage.setItem('cat_friendship', friendshipScore.toString());
  }, [friendshipScore]);

  useEffect(() => {
    localStorage.setItem('cat_hunger', hunger.toString());
  }, [hunger]);

  useEffect(() => {
    localStorage.setItem('cat_energy', energy.toString());
  }, [energy]);

  useEffect(() => {
    localStorage.setItem('cat_comments', JSON.stringify(comments));
  }, [comments]);

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
  const playSynthSound = (type: 'meow' | 'purr' | 'eat' | 'play' | 'sleep' | 'bell' | 'wake') => {
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
        osc.frequency.quadraticRampToValueAtTime(780, audioCtx.currentTime + 0.12);
        osc.frequency.quadraticRampToValueAtTime(540, audioCtx.currentTime + 0.38);

        gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.38);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.38);
      } else if (type === 'purr') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(90, audioCtx.currentTime);
        for (let i = 0; i < 5; i++) {
          osc.frequency.setValueAtTime(90, audioCtx.currentTime + i * 0.08);
          osc.frequency.linearRampToValueAtTime(105, audioCtx.currentTime + i * 0.08 + 0.04);
        }
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(110, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      } else if (type === 'eat') {
        [0, 0.12, 0.24].forEach((delay) => {
          const oscE = audioCtx.createOscillator();
          const gainE = audioCtx.createGain();
          oscE.type = 'triangle';
          oscE.frequency.setValueAtTime(290, audioCtx.currentTime + delay);
          oscE.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + delay + 0.06);

          gainE.gain.setValueAtTime(0.04, audioCtx.currentTime + delay);
          gainE.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + 0.06);

          oscE.connect(gainE);
          gainE.connect(audioCtx.destination);
          oscE.start(audioCtx.currentTime + delay);
          oscE.stop(audioCtx.currentTime + delay + 0.07);
        });
      } else if (type === 'play') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.2);

        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      } else if (type === 'sleep') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(160, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(110, audioCtx.currentTime + 0.6);

        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);
      } else if (type === 'bell') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.7);

        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1174.66, audioCtx.currentTime);
        gain2.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.7);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);

        osc.start();
        osc2.start();
        osc.stop(audioCtx.currentTime + 0.7);
        osc2.stop(audioCtx.currentTime + 0.7);
      } else if (type === 'wake') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(987.77, audioCtx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      }
    } catch (e) {
      console.warn('Audio feedback initiated gesture blocked or omitted', e);
    }
  };

  const spawnSparkAt = (x: number, y: number, emoji: string) => {
    const id = Date.now() + Math.random();
    setSparks((prev) => [...prev, { id, x, y, emoji }]);
    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => s.id !== id));
    }, 900);
  };

  // Pet Head
  const handlePetCat = (e: React.MouseEvent<HTMLDivElement>) => {
    if (catState === 'sleeping') {
      setBubbleText('梦话中：唔咪... 好舒服的抚摸... 金枪鱼罐头不要跑... zZZ 💤');
      playSynthSound('purr');
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spawnSparkAt(x, y, '💖');

    setFriendshipScore((prev) => prev + 1);
    setHunger((prev) => Math.max(0, prev - 2)); // minor digestion
    setCatState('happy');
    playSynthSound('purr');

    const dialogs = [
      '呼噜呼噜... 铲屎官的力道刚刚好！耳朵后面也想要摸摸嘛~ 🥰',
      '喵呜~ 好舒服，感觉一天的烦心事通通都烟消散啦！✨',
      '喜欢你这样抚摸我，给你一个轻轻的猫爪贴贴！🐾',
      '喵~ 听说缓慢对我眨眨眼是在说我爱你，本喵也给你wink一下！',
    ];
    setBubbleText(dialogs[Math.floor(Math.random() * dialogs.length)]);

    setTimeout(() => {
      setCatState('idle');
    }, 1200);
  };

  // Feed Canned Food or Treats
  const handleFeed = (type: 'treats' | 'can') => {
    if (catState === 'sleeping') {
      setBubbleText('梦话中：吧唧吧唧... 还要一碗帝王蟹肉泥罐头... 💤');
      playSynthSound('purr');
      return;
    }

    if (hunger >= 100) {
      setBubbleText('呼呜~ 本喵已经吃饱打响饱嗝了，小肉肚皮圆滚滚，等会再喂我吧！😻');
      playSynthSound('meow');
      return;
    }

    const value = type === 'treats' ? 18 : 38;
    const bonus = type === 'treats' ? 2 : 5;

    setHunger((prev) => Math.min(100, prev + value));
    setFriendshipScore((prev) => prev + bonus);
    setCatState('eating');
    playSynthSound('eat');

    // Spawn sparks above
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      spawnSparkAt(rect.width / 2, rect.height / 2 - 20, type === 'treats' ? '🐟' : '🥫');
    }

    setBubbleText(
      type === 'treats'
        ? '吧唧吧唧！这个脱水冻干小鱼干超级酥脆！喵呜开心！🐟'
        : '（嗷呜大口吞食）天呐！这是帝王鲑鲜肉泥罐头吗？！太美味了！我要全部吃光！🥫💖'
    );

    setTimeout(() => {
      setCatState('idle');
    }, 1500);
  };

  // Play Yarn or Laser Pointer
  const handlePlayGame = (type: 'yarn' | 'laser') => {
    if (catState === 'sleeping') {
      setBubbleText('本喵睡得正香啦，去玩毛线球的梦还没有做完呢，先不要逗我啦... 💤');
      playSynthSound('purr');
      return;
    }

    if (energy < 15) {
      setBubbleText('（精疲力竭地打哈欠）小电量快用完啦！实在蹦不动了... 让我睡觉或吃鱼肉罐头充电吧。🥺');
      playSynthSound('sleep');
      return;
    }

    if (type === 'laser') {
      if (activeToy === 'laser') {
        setActiveToy('none');
        setBubbleText('呼，收起红色激光笔了，本王稍微喘口气！💨');
      } else {
        setActiveToy('laser');
        setBubbleText('🔴 哇！快看那个飞檐走壁的红点！把鼠标移到框里激起我的神游捕猎本能！✨');
        playSynthSound('wake');
      }
    } else {
      setActiveToy('none');
      setCatState('playing');
      setEnergy((prev) => Math.max(0, prev - 18));
      setFriendshipScore((prev) => prev + 3);
      playSynthSound('play');

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        spawnSparkAt(rect.width / 2, rect.height / 2 + 10, '🧶');
      }

      setBubbleText('冲呀！看我的无影闪电拍击爪！这个毛细玩偶球彻底被我拿下了！🧶😻');
      setTimeout(() => {
        setCatState('idle');
      }, 1500);
    }
  };

  // Click on stage during laser mode
  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeToy !== 'laser' || catState === 'sleeping') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    spawnSparkAt(x, y, '🔴');
    setCatState('playing');
    setEnergy((prev) => Math.max(0, prev - 12));
    setFriendshipScore((prev) => prev + 2);
    playSynthSound('play');

    const dialogs = [
      '抓到了！抓到了！休想闪过我尖尖的小爪垫！🐾',
      '嗷呜！刚才差一点点就能把这个坏红点按在爪心下了！',
      '闪电突袭！本捕猎王的手速怎么样？帅气吧！😎',
    ];
    setBubbleText(dialogs[Math.floor(Math.random() * dialogs.length)]);

    setTimeout(() => {
      setCatState('idle');
    }, 1200);
  };

  // Track cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeToy !== 'laser') return;
    const rect = e.currentTarget.getBoundingClientRect();
    setLaserPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Put to sleep or wake with bell
  const handleSleepMode = () => {
    if (catState === 'sleeping') {
      setCatState('idle');
      playSynthSound('wake');
      setBubbleText('喵呜？！本王突然精神一抖，睡了个饱足的养生大长觉，满电复活！👀✨');
    } else {
      setCatState('sleeping');
      setActiveToy('none');
      setEnergy(100);
      playSynthSound('sleep');
      setBubbleText('好困呀... 小身躯暖呼呼的。本王先退下歇息半响，不要偷偷拔我的胡子哦 zZZ 💤');
    }
  };

  const handleRingBell = () => {
    playSynthSound('bell');
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      spawnSparkAt(rect.width / 2, rect.height / 2 - 30, '🔔');
    }

    if (catState === 'sleeping') {
      setCatState('idle');
      setBubbleText('喵？！好清脆美妙的铜铃响！是不是铲屎官在摇饭盆开罐头啦？！🥺🌟');
    } else {
      setFriendshipScore((prev) => prev + 1);
      setBubbleText('叮叮当~ 听到这个清纯的铃声，心情瞬间好似春天绽放的小绒花呀！🌸');
    }
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentVal.trim() || !newNickname.trim()) return;

    const newComment: UserComment = {
      id: `custom_${Date.now()}`,
      username: newNickname.trim(),
      avatar: avatars[selectedAvatarIdx],
      content: newCommentVal.trim(),
      time: new Date().toISOString().replace('T', ' ').substring(0, 16),
      likes: 0,
    };

    setComments((prev) => [newComment, ...prev]);
    setNewCommentVal('');
    setNewNickname('');
    setCommentSuccess(true);
    playSynthSound('meow');
    setBubbleText(`哇哦！谢谢【${newNickname}】铲屎官的热情留言！本大王给你一个大大的特写么么哒~ 🐾`);

    setTimeout(() => {
      setCommentSuccess(false);
    }, 2800);
  };

  const handleLikeComment = (id: string) => {
    playSynthSound('purr');
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  // Get user friendship title
  const getRelationLevel = (score: number) => {
    const lvl = Math.floor(score / 15) + 1;
    let title = '萍水相逢';
    if (lvl === 2) title = '渐入佳境';
    if (lvl === 3) title = '心有灵犀';
    if (lvl === 4) title = '依依不舍';
    if (lvl >= 5) title = '誓死效忠';
    return { lvl, title };
  };

  const { lvl, title } = getRelationLevel(friendshipScore);

  // Pupil offsets calculated relative to laser
  const getPupilShift = (eyeX: number, eyeY: number) => {
    if (activeToy === 'laser' && laserPos) {
      const dx = laserPos.x - eyeX;
      const dy = laserPos.y - eyeY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist === 0) return { x: 0, y: 0 };
      const limit = 6; // max pixels
      const ratio = Math.min(limit, dist) / dist;
      return { x: dx * ratio, y: dy * ratio };
    }
    return { x: 0, y: 0 };
  };

  const leftPupil = getPupilShift(140, 130);
  const rightPupil = getPupilShift(220, 130);

  return (
    <section id="interactive" className="py-24 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 rounded-full text-orange-600 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>数字治愈乐园</span>
          </div>
          <h2 className="text-3xl font-bold text-[#4A3E3D] tracking-tight sm:text-4xl">
            {catName}的治愈互动空间
          </h2>
          <div className="w-16 h-1 bg-orange-400 mx-auto my-3.5 rounded-full" />
          <p className="text-[#8C7A6B] text-sm sm:text-base">
            一个拟真的数字宠物系统。和你的萌宠“{catName}”深度贴贴喂食，释放逗猫天性，或者留下您和毛孩子的专属治愈故事。
          </p>
        </div>

        {/* Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* LEFT: Virtual Digital Cat (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-orange-50/40 via-orange-100/10 to-white rounded-[40px] border border-orange-100/80 p-6 flex flex-col justify-between relative overflow-hidden shadow-sm">
            {/* Soft Ambient Radiance */}
            <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-orange-200/15 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-36 h-36 rounded-full bg-amber-200/20 blur-3xl pointer-events-none" />

            {/* Physiological Gauges Display Panel */}
            <div className="space-y-3 bg-white/70 backdrop-blur-sm p-4 rounded-3xl border border-orange-100/50 relative z-10 shadow-3xs">
              {/* Level indicator */}
              <div className="flex justify-between items-center pb-2 border-b border-orange-50/85">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1 font-sans">
                  🐾 {catName}的状态：
                  <span className="text-orange-600 text-[11px] font-bold">
                    {catState === 'sleeping' ? '熟睡中' : catState === 'playing' ? '亢奋捕猎' : catState === 'eating' ? '暴享罐头中' : '日常营业'}
                  </span>
                </span>
                <span className="text-[11px] font-bold text-orange-700 bg-orange-100/60 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-current text-rose-500 animate-pulse" />
                  <span>{title} Lv.{lvl} ({friendshipScore}点)</span>
                </span>
              </div>

              {/* Progress bars */}
              <div className="space-y-2 mt-2 font-mono text-3xs text-slate-500">
                {/* Hunger bar */}
                <div>
                  <div className="flex justify-between mb-0.5">
                    <span className="flex items-center gap-1"><Utensils className="w-3 h-3 text-orange-500" /> 饱腹感: {hunger}%</span>
                    <span>{hunger < 35 ? '饿扁成纸片喵' : hunger < 75 ? '小有肚量' : '肚子饱嘟嘟'}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-orange-500 h-full transition-all duration-500"
                      style={{ width: `${hunger}%` }}
                    />
                  </div>
                </div>

                {/* Energy bar */}
                <div>
                  <div className="flex justify-between mb-0.5">
                    <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-amber-500" /> 活力值: {energy}%</span>
                    <span>{energy < 30 ? '昏昏欲睡' : '元气满满'}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full transition-all duration-500"
                      style={{ width: `${energy}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Speech Bubble */}
            <div className="relative z-10 my-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-orange-100 text-xs text-slate-700 leading-relaxed min-h-[75px] flex items-center relative">
                <span>{bubbleText}</span>
                {/* caret bubble */}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white" />
                <div className="absolute -bottom-[12px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10.5px] border-l-transparent border-r-[10.5px] border-r-transparent border-t-[11px] border-t-orange-100 -z-10" />
              </div>
            </div>

            {/* INTERACTIVE PLAYGROUND (CAT CANVAS STAGE) */}
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onClick={handleStageClick}
              className={`relative h-64 w-full bg-slate-100/50 rounded-3xl border border-orange-50 shadow-inner flex items-center justify-center overflow-hidden transition-all duration-350 cursor-pointer ${
                activeToy === 'laser' ? 'cursor-none bg-red-50/20' : ''
              }`}
            >
              {/* Sparks emitter */}
              <AnimatePresence>
                {sparks.map((spark) => (
                  <motion.div
                    key={spark.id}
                    initial={{ scale: 0.5, opacity: 0, x: spark.x - 12, y: spark.y - 12 }}
                    animate={{ scale: 1.4, opacity: 1, y: spark.y - 65 }}
                    exit={{ opacity: 0, scale: 0.2 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="absolute text-xl pointer-events-none z-30 select-none"
                  >
                    {spark.emoji}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Laser dot follow helper */}
              {activeToy === 'laser' && laserPos && (
                <div
                  className="absolute w-3 h-3 rounded-full bg-red-500 shadow-[0_0_12px_3px_rgba(239,68,68,0.9)] pointer-events-none z-30"
                  style={{ left: laserPos.x - 6, top: laserPos.y - 6 }}
                />
              )}

              {/* MAIN GRAPHIC CAT CHARACTER FRAME */}
              <motion.div
                onClick={handlePetCat}
                animate={
                  catState === 'happy'
                    ? { y: [0, -15, 0], scale: [1, 1.05, 1], rotate: [0, 4, -4, 0] }
                    : catState === 'playing'
                    ? { x: [-10, 10, -5, 5, 0], y: [-5, 5, -5, 0] }
                    : catState === 'eating'
                    ? { scaleY: [1, 0.94, 1, 0.94, 1], x: [-1, 1, -1, 1, 0] }
                    : catState === 'sleeping'
                    ? { scaleY: [0.97, 1.01, 0.97], scaleX: [1.02, 0.98, 1.02] }
                    : { rotate: [0, 0.8, -0.8, 0] }
                }
                transition={{
                  duration: catState === 'sleeping' ? 3.2 : 0.6,
                  repeat: catState === 'sleeping' ? Infinity : 0,
                  ease: 'easeInOut',
                }}
                className={`relative group ${catState === 'sleeping' ? 'opacity-80' : ''}`}
                title={`摸一摸 ${catName} 🐾`}
              >
                {/* WAG TAIL (HTML & FRAMER MOTION PHYSICS) */}
                <motion.div
                  className="absolute -bottom-2 -left-14 origin-right -z-10 bg-amber-200 border-4 border-orange-200 h-8 w-24 rounded-full shadow-2xs"
                  animate={
                    catState === 'playing'
                      ? { rotate: [-15, 25, -15] }
                      : catState === 'sleeping'
                      ? { rotate: [3, 9, 3] }
                      : { rotate: [-5, 12, -5] }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: catState === 'playing' ? 0.3 : catState === 'sleeping' ? 2.8 : 1.4,
                    ease: 'easeInOut',
                  }}
                  style={{ transformOrigin: '90% 50%' }}
                />

                {/* Main Body/Face card */}
                <div
                  className={`w-40 h-40 rounded-full bg-amber-100 border-4 border-orange-200 shadow-md relative flex flex-col items-center justify-center transition-all ${
                    catState === 'happy' ? 'bg-amber-50' : ''
                  }`}
                >
                  {/* Left Ear */}
                  <motion.div
                    className="absolute -top-4 -left-1.5 w-12 h-12 bg-amber-200 border-4 border-orange-200 rounded-bl-[35px] rounded-tr-[8px] rounded-br-[12px] -rotate-[15deg] -z-10"
                    animate={catState === 'playing' ? { rotate: [-10, -30, -10] } : {}}
                    transition={{ duration: 0.25, repeat: catState === 'playing' ? Infinity : 0 }}
                  >
                    <div className="w-6 h-6 bg-rose-200 rounded-bl-[18px] rounded-tr-[4px] rounded-br-[4px] absolute bottom-0.5 right-0.5" />
                  </motion.div>

                  {/* Right Ear */}
                  <motion.div
                    className="absolute -top-4 -right-1.5 w-12 h-12 bg-amber-200 border-4 border-orange-200 rounded-br-[35px] rounded-tl-[8px] rounded-bl-[12px] rotate-[15deg] -z-10"
                    animate={catState === 'playing' ? { rotate: [10, 30, 10] } : {}}
                    transition={{ duration: 0.25, repeat: catState === 'playing' ? Infinity : 0 }}
                  >
                    <div className="w-6 h-6 bg-rose-200 rounded-br-[18px] rounded-tl-[4px] rounded-bl-[4px] absolute bottom-0.5 left-0.5" />
                  </motion.div>

                  {/* Dynamic Eye States */}
                  <div className="flex justify-between w-20 mb-3 px-1.5">
                    {/* Left Eye */}
                    <div className="w-4.5 h-4.5 bg-transparent flex items-center justify-center relative">
                      {isBlinking ? (
                        <div className="w-4 h-0.5 bg-orange-600 rounded-full" />
                      ) : catState === 'sleeping' ? (
                        <span className="text-sm font-semibold text-slate-400 select-none">◡</span>
                      ) : catState === 'happy' ? (
                        <span className="text-sm font-bold text-orange-600 select-none">^</span>
                      ) : catState === 'eating' ? (
                        <span className="text-xs font-extrabold text-orange-700 select-none">＞</span>
                      ) : (
                        // Pupil tracking laser pointer physics
                        <div className="w-4 h-4 rounded-full bg-sky-500 relative overflow-hidden transition-all duration-300">
                          <div
                            className="w-2.5 h-2.5 rounded-full bg-slate-900 absolute top-0.5 left-0.5"
                            style={{
                              transform: `translate(${leftPupil.x}px, ${leftPupil.y}px)`,
                            }}
                          >
                            <div className="w-1 h-1 rounded-full bg-white absolute top-0.5 left-0.5" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Eye */}
                    <div className="w-4.5 h-4.5 bg-transparent flex items-center justify-center relative">
                      {isBlinking ? (
                        <div className="w-4 h-0.5 bg-orange-600 rounded-full" />
                      ) : catState === 'sleeping' ? (
                        <span className="text-sm font-semibold text-slate-400 select-none">◡</span>
                      ) : catState === 'happy' ? (
                        <span className="text-sm font-bold text-orange-600 select-none">^</span>
                      ) : catState === 'eating' ? (
                        <span className="text-xs font-extrabold text-orange-700 select-none">＜</span>
                      ) : (
                        // Pupil tracking laser pointer physics
                        <div className="w-4 h-4 rounded-full bg-sky-500 relative overflow-hidden transition-all duration-300">
                          <div
                            className="w-2.5 h-2.5 rounded-full bg-slate-900 absolute top-0.5 left-0.5"
                            style={{
                              transform: `translate(${rightPupil.x}px, ${rightPupil.y}px)`,
                            }}
                          >
                            <div className="w-1 h-1 rounded-full bg-white absolute top-0.5 left-0.5" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Blush */}
                  <div className="flex justify-between w-28 absolute top-20 px-1">
                    <div className={`w-4.5 h-1.5 rounded-full blur-[0.8px] transition-all ${catState === 'happy' ? 'bg-rose-400/85 scale-125' : 'bg-rose-300/65'}`} />
                    <div className={`w-4.5 h-1.5 rounded-full blur-[0.8px] transition-all ${catState === 'happy' ? 'bg-rose-400/85 scale-125' : 'bg-rose-300/65'}`} />
                  </div>

                  {/* Nose and Mouth hook */}
                  <div className="flex flex-col items-center relative -mt-0.5">
                    <div className="w-2.5 h-1.5 bg-rose-400 rounded-b-sm" />
                    <div className="flex text-orange-500 font-extrabold text-xs tracking-tighter -mt-1.5 select-none">
                      {catState === 'eating' ? 'o' : catState === 'sleeping' ? 'w' : '3'}
                    </div>
                  </div>

                  {/* Whiskers */}
                  <div className="absolute left-1 w-5 h-0.5 bg-orange-200/90 top-[77px] rotate-[10deg]" />
                  <div className="absolute left-1 w-5 h-0.5 bg-orange-200/90 top-[83px]" />
                  <div className="absolute right-1 w-5 h-0.5 bg-orange-200/90 top-[77px] -rotate-[10deg]" />
                  <div className="absolute right-1 w-5 h-0.5 bg-orange-200/90 top-[83px]" />

                  {/* Golden collar bell with shadow */}
                  <div className="absolute -bottom-3 bg-gradient-to-r from-orange-400 to-orange-500 border border-orange-350 px-3 py-0.5 rounded-full flex gap-1 items-center justify-center shadow-sm">
                    <div className="w-3 h-3 bg-yellow-400 border border-yellow-200 rounded-full shrink-0 animate-bounce-slow" />
                    <span className="text-[9px] text-white font-bold select-none">喵喵铃铛</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* BENTO CONTROLLER PANEL (Bento-styled action buttons) */}
            <div className="mt-5 space-y-3 relative z-10">
              {/* Category 1: Nourish (Feed) */}
              <div className="bg-orange-50 px-3 py-2.5 rounded-2xl border border-orange-100/50">
                <p className="text-[10px] font-bold text-orange-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  🍲 科学能量补给：
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleFeed('treats')}
                    className="py-1.5 px-3 bg-white hover:bg-orange-400 border border-orange-200 text-orange-600 hover:text-white font-bold rounded-xl text-3xs transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer hover:shadow-2xs active:scale-95"
                  >
                    <span>🐟 喂小鱼干</span>
                  </button>
                  <button
                    onClick={() => handleFeed('can')}
                    className="py-1.5 px-3 bg-white hover:bg-orange-400 border border-orange-200 text-orange-600 hover:text-white font-bold rounded-xl text-3xs transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer hover:shadow-2xs active:scale-95"
                  >
                    <span>🥫 开金枪鱼罐</span>
                  </button>
                </div>
              </div>

              {/* Category 2: Activity (Play) */}
              <div className="bg-orange-50 px-3 py-2.5 rounded-2xl border border-orange-100/50">
                <p className="text-[10px] font-bold text-orange-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  🧶 运动健身玩具：
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handlePlayGame('yarn')}
                    className="py-1.5 px-3 bg-white hover:bg-orange-400 border border-orange-200 text-orange-600 hover:text-white font-bold rounded-xl text-3xs transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer hover:shadow-2xs active:scale-95"
                  >
                    <span>🧶 扔软毛线球</span>
                  </button>
                  <button
                    onClick={() => handlePlayGame('laser')}
                    className={`py-1.5 px-3 border rounded-xl text-3xs font-bold transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer hover:shadow-2xs active:scale-95 ${
                      activeToy === 'laser'
                        ? 'bg-rose-500 text-white border-rose-600'
                        : 'bg-white hover:bg-orange-400 text-orange-600 border-orange-200 hover:text-white'
                    }`}
                  >
                    <span>🔴 拿红激光笔</span>
                  </button>
                </div>
              </div>

              {/* Category 3: Rest & Care */}
              <div className="bg-orange-50 px-3 py-2.5 rounded-2xl border border-orange-100/50">
                <p className="text-[10px] font-bold text-orange-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  💤 贴心日常照料：
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleRingBell}
                    className="py-1.5 px-3 bg-white hover:bg-orange-400 border border-orange-200 text-orange-600 hover:text-white font-bold rounded-xl text-3xs transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer hover:shadow-2xs active:scale-95"
                  >
                    <Bell className="w-3 h-3 text-orange-500" />
                    <span>摇魔法铃铛</span>
                  </button>
                  <button
                    onClick={handleSleepMode}
                    className={`py-1.5 px-3 border rounded-xl text-3xs font-bold transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer hover:shadow-2xs active:scale-95 ${
                      catState === 'sleeping'
                        ? 'bg-indigo-600 text-white border-indigo-700'
                        : 'bg-white hover:bg-orange-400 text-orange-600 border-orange-200 hover:text-white'
                    }`}
                  >
                    {catState === 'sleeping' ? (
                      <>
                        <Sun className="w-3 h-3 text-yellow-300 animate-spin-slow" />
                        <span>摇摇叫醒她</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-3 h-3 text-indigo-400" />
                        <span>哄{catName}去睡觉</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 text-center mt-3 leading-tight">
              * 小知识：激光模式下，在粉色游戏框内任意移动，喵酱亮丽的眼眸会一直追随并锁定红点哦！单击红点即可触发敏快捷径飞扑。
            </p>
          </div>

          {/* RIGHT: Comment Board Columns (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-[40px] border border-orange-100/80 p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8.5 h-8.5 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 font-bold text-sm">
                    💬
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-800">猫友俱乐部写字板</h3>
                    <p className="text-3xs text-slate-400">
                      写下对小流浪的关爱意愿，或炫耀你和自家毛孩子之间的甜蜜趣闻吧。
                    </p>
                  </div>
                </div>
                <div className="text-xs text-slate-400 font-medium font-mono">
                  共计 {comments.length} 条暖心留言
                </div>
              </div>

              {/* Add Comment Form */}
              <form
                onSubmit={handleSendComment}
                className="bg-orange-50/15 border border-orange-100/40 p-5 rounded-3xl mb-6 space-y-4 shadow-3xs"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nickname input */}
                  <div>
                    <label className="block text-3xs font-bold text-slate-500 mb-1.5 pl-1">
                      铲屎官昵称 <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="例：元气满满的小橘娘"
                      value={newNickname}
                      onChange={(e) => setNewNickname(e.target.value)}
                      className="w-full text-xs font-medium bg-white border border-orange-100 focus:border-orange-300 rounded-xl px-3.5 py-2 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Avatar picker */}
                  <div>
                    <label className="block text-3xs font-bold text-slate-500 mb-1.5 pl-1">
                      分配萌猫化身头像 <span className="text-slate-400">(可选)</span>
                    </label>
                    <div className="flex gap-2">
                      {avatars.map((av, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedAvatarIdx(idx)}
                          className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                            selectedAvatarIdx === idx
                              ? 'border-orange-400 scale-110 shadow-sm ring-2 ring-orange-100'
                              : 'border-transparent hover:border-slate-200'
                          }`}
                        >
                          <img src={av} alt="avatar" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content Textarea */}
                <div>
                  <label className="block text-3xs font-bold text-slate-500 mb-1.5 pl-1">
                    写下暖心悄悄话 <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="在这里把你想对喵酱说的话写下来，喵酱都会认真对你喵呜阅读的哟..."
                    value={newCommentVal}
                    onChange={(e) => setNewCommentVal(e.target.value)}
                    className="w-full text-xs bg-white border border-orange-100 focus:border-orange-300 rounded-xl p-3 focus:outline-none transition-all resize-none leading-relaxed"
                  />
                </div>

                {/* Form Action Row */}
                <div className="flex items-center justify-between">
                  {commentSuccess ? (
                    <span className="text-3xs text-emerald-600 font-bold flex items-center gap-1">
                      <Check className="w-4 h-4 bg-emerald-100 rounded-full p-0.5" />
                      发表温暖留言成功！喵酱在仔细倾听！
                    </span>
                  ) : (
                    <span className="text-4xs text-slate-400 leading-tight">
                      * 遵守科学养宠共识，保持社区氛围温和健康。
                    </span>
                  )}

                  <button
                    type="submit"
                    className="px-5 py-2 bg-orange-400 hover:bg-orange-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md transition-all self-end"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>敲锣发表</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Scroll View for Comments */}
            <div className="max-h-[280px] overflow-y-auto space-y-4 pr-1.5">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 bg-slate-50/45 border border-slate-100 rounded-2xl flex items-start gap-3 hover:bg-orange-50/10 transition-colors"
                >
                  <img
                    src={comment.avatar}
                    alt={comment.username}
                    className="w-9 h-9 rounded-full object-cover border border-orange-100/65 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-2xs font-extrabold text-slate-700">
                        {comment.username}
                      </span>
                      <span className="text-4xs text-slate-400 font-mono">
                        {comment.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-normal font-normal">
                      {comment.content}
                    </p>

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleLikeComment(comment.id)}
                        className="flex items-center gap-1 text-3xs text-slate-400 hover:text-rose-500 focus:outline-none cursor-pointer transition-colors"
                      >
                        <Heart className="w-3 h-3 fill-slate-100 hover:fill-rose-100 text-current" />
                        <span>觉得暖</span>
                        <span className="font-semibold text-slate-500">({comment.likes})</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
