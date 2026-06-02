import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Flame, Sparkles, Award } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';

interface PopularCatItem {
  id: string;
  rank: string;
  name: string;
  engName: string;
  tagline: string;
  image: string;
  bgTone: string;
  charmTraits: string[];
  charmScore: number;
  initialVotes: number;
  description: string;
}

export default function PopularSection() {
  const { playSfx } = useAudio();
  
  // High-end curated cat profiles for the "Popular Cats" section
  const [cats, setCats] = useState<PopularCatItem[]>([
    {
      id: 'ragdoll',
      rank: '01',
      name: '布偶猫',
      engName: 'Ragdoll',
      tagline: '静谧的蔚蓝星眸 · 贴心温顺的云朵化身',
      image: 'https://cdn.phototourl.com/free/2026-05-26-9629ddc7-52b4-43d5-9918-524674637ee6.webp',
      bgTone: 'bg-stone-100/50',
      charmTraits: ['温顺沉静', '蓝眼仙女', '体贴黏人'],
      charmScore: 98,
      initialVotes: 2439,
      description: '因抱起来温顺如布娃娃而得名。它们拥有深邃如晴空蓝宝石的水灵猫眼及极蓬松丰厚的银白毛发，是行走在室内的温柔诗篇。'
    },
    {
      id: 'british-shorthair',
      rank: '02',
      name: '英国短毛猫',
      engName: 'British Shorthair',
      tagline: '圆润大气的温暖伴侣 · 随和不扰的默默陪伴',
      image: 'https://cdn.phototourl.com/free/2026-06-01-e9311a6a-2311-4d11-bddd-a085bcdd9223.jpg',
      bgTone: 'bg-slate-100/40',
      charmTraits: ['低声陪伴', '圆融大脸', '随遇而安'],
      charmScore: 94,
      initialVotes: 1894,
      description: '矮胖而健实的“五短”身材。它们的大脸盘与呆萌金黄色圆眼极具治愈感，内心随和沉静，从不黏人过载，是喧嚣都市里最好的精神减压阀。'
    },
    {
      id: 'maine-coon',
      rank: '03',
      name: '缅因猫',
      engName: 'Maine Coon',
      tagline: '荒野风骨的温柔巨人 · 极具反差的轻柔鸣叫',
      image: 'https://cdn.phototourl.com/free/2026-05-27-35da7e96-85a2-4c57-ab4c-fbf05994858f.jpg',
      bgTone: 'bg-zinc-100/50',
      charmTraits: ['英挺野性', '智商可驯', '体贴大度'],
      charmScore: 96,
      initialVotes: 2045,
      description: '身躯浩大，尾拂如锦。虽然外表带着雄狮般的荒野野性，内心却极其体贴顺从、宽广包容，对人类孩童如同沉稳的长辈般可靠。'
    }
  ]);

  const [votedStates, setVotedStates] = useState<Record<string, boolean>>({});

  const handleVote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const isAlreadyVoted = votedStates[id];
    setVotedStates(prev => ({ ...prev, [id]: !isAlreadyVoted }));
    
    setCats(prevList => prevList.map(cat => {
      if (cat.id === id) {
        return {
          ...cat,
          initialVotes: isAlreadyVoted ? cat.initialVotes - 1 : cat.initialVotes + 1
        };
      }
      return cat;
    }));

    // Play tactile premium audio response
    if (!isAlreadyVoted) {
      playSfx('meow');
    } else {
      playSfx('click');
    }
  };

  return (
    <section id="popular" className="py-24 bg-[#FAF6F0] border-b border-orange-100/40">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header with Premium Monospaced Typo & Airy Space */}
        <div className="max-w-3xl mb-16 text-left">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange-500/80 font-bold mb-3">
            01 / PORTRAIT COLLECTION
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#4A3E3D] tracking-tight leading-tight">
            热门猫咪 <span className="font-light text-stone-400">/ Curated Portraits</span>
          </h2>
          <p className="text-[#8C7A6B] font-normal text-sm sm:text-base mt-4 max-w-xl leading-relaxed">
            为您呈现本期鉴赏评选最高人气的三个猫咪品类。弱化一切繁杂斑斓装饰，用最素雅的镜头色调捕捉生命的静美张力，给感官最温润的守护与治愈。
          </p>
        </div>

        {/* Curator-Style Card Layout list */}
        <div className="space-y-12">
          {cats.map((cat, idx) => {
            const hasVoted = votedStates[cat.id];
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative bg-white/75 backdrop-blur-xs rounded-[32px] overflow-hidden border border-orange-100/60 flex flex-col lg:flex-row shadow-xs hover:shadow-xl hover:border-orange-200/80 hover:-translate-y-1.5 hover:scale-[1.015] transition-all duration-500"
              >
                {/* 1. Large Visual Showcase Area */}
                <div className="lg:w-5/12 relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-orange-50/30 shrink-0">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.08] transition-transform duration-700 ease-out"
                  />
                  
                  {/* Elegant Top Rank Badge */}
                  <div className="absolute top-6 left-6 z-10 font-mono text-2xl font-semibold text-[#4A3E3D] bg-[#FAF6F0]/90 backdrop-blur-md px-4 py-1.5 rounded-2xl shadow-3xs border border-orange-100/40">
                    No.{cat.rank}
                  </div>
                </div>

                {/* 2. Text / Metadata Descriptions Partition */}
                <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between space-y-8 bg-transparent">
                  <div>
                    {/* Title with eng subtitle */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-orange-100/40 pb-5">
                      <div>
                        <h3 className="text-2xl font-bold text-[#4A3E3D] leading-none">
                          {cat.name}
                          <span className="font-mono text-xs text-orange-400 font-medium ml-3 bg-orange-50 px-2.5 py-1 rounded-md">
                            {cat.engName}
                          </span>
                        </h3>
                        <p className="text-orange-850/70 font-medium text-xs mt-3 flex items-center gap-1.5">
                          <span className="bg-orange-100/40 px-2.5 py-0.5 rounded-full text-[10px] text-orange-600">本期推荐</span>
                          <span className="text-[#8C7A6B]">{cat.tagline}</span>
                        </p>
                      </div>

                      {/* Score Indicator */}
                      <span className="text-xs font-mono font-medium text-[#8C7A6B] bg-[#FAF6F0] border border-orange-100 px-3 py-1 rounded-full mt-2 sm:mt-0 shrink-0">
                        美誉度: <span className="text-[#4A3E3D] font-bold">{cat.charmScore}%</span>
                      </span>
                    </div>

                    <p className="text-[#8C7A6B] text-xs sm:text-sm leading-relaxed font-normal mt-6 max-w-xl">
                      {cat.description}
                    </p>

                    {/* Low-saturation Minimalist Charm traits list */}
                    <div className="flex flex-wrap gap-2 mt-6">
                      {cat.charmTraits.map(trait => (
                        <span
                          key={trait}
                          className="font-semibold text-2xs text-[#8C7A6B] bg-[#FAF6F0] px-3.5 py-1 rounded-full border border-orange-100/50 hover:bg-orange-50 transition-colors"
                        >
                          # {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 3. Interactive Zone */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-orange-100/40">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                      <span className="text-2xs text-stone-400 font-mono">
                        本期评选热度: <span className="text-[#4A3E3D] font-semibold font-sans ml-1">{cat.initialVotes.toLocaleString()}</span> 人支持
                      </span>
                    </div>

                    {/* Responsive Vote Toggler Button */}
                    <button
                      onClick={(e) => handleVote(cat.id, e)}
                      className={`px-5 py-2.5 rounded-full hover:scale-102 font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer focus:outline-none border select-none ${
                        hasVoted
                          ? 'bg-orange-400 border-orange-450 text-white shadow-md shadow-orange-300/15'
                          : 'bg-white border-orange-100 text-[#5E503F] hover:bg-orange-50/50 hover:text-orange-600'
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 transition-all duration-300 ${
                          hasVoted ? 'fill-rose-200 text-rose-200 scale-110' : 'text-stone-400 group-hover:text-stone-600'
                        }`}
                      />
                      <span>{hasVoted ? '已送出小花' : '送一朵小花'}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
