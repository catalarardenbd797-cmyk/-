import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Search, Clock, Eye, AlertCircle, ChevronDown, ChevronUp, User, Share, ArrowRight } from 'lucide-react';
import { careTips } from '../data/catData';
import { CareTip } from '../types';

export default function CareSection() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'diet' | 'health' | 'behavior' | 'daily'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTipId, setExpandedTipId] = useState<string | null>(null);

  const [savedTipId, setSavedTipId] = useState<string | null>(null);

  const categories = [
    { key: 'all' as const, label: '全部知识' },
    { key: 'diet' as const, label: '科学饮食' },
    { key: 'health' as const, label: '医学健康' },
    { key: 'behavior' as const, label: '行为语言' },
    { key: 'daily' as const, label: '日常化容' },
  ];

  const handleCategoryChange = (key: typeof activeCategory) => {
    setActiveCategory(key);
    setExpandedTipId(null);
  };

  const filteredTips = careTips.filter((tip) => {
    const matchesCategory = activeCategory === 'all' || tip.category === activeCategory;
    const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tip.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tip.content.some(line => line.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'diet':
        return { bg: 'bg-emerald-50 text-emerald-600 border-emerald-100', dot: 'bg-emerald-400', label: '饮食科学' };
      case 'health':
        return { bg: 'bg-red-50 text-red-600 border-red-100', dot: 'bg-red-400', label: '医学健康' };
      case 'behavior':
        return { bg: 'bg-blue-50 text-blue-600 border-blue-100', dot: 'bg-blue-400', label: '行为解密' };
      case 'daily':
        return { bg: 'bg-purple-50 text-purple-600 border-purple-100', dot: 'bg-purple-400', label: '环境丰容' };
      default:
        return { bg: 'bg-slate-50 text-slate-600 border-slate-100', dot: 'bg-slate-400', label: '基础常识' };
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedTipId(prev => (prev === id ? null : id));
  };

  return (
    <section id="care" className="py-24 bg-[#FAF6F0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 rounded-full text-orange-600 text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>科学猫咪科普</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#4A3E3D] tracking-tight sm:text-4xl">
            科学养猫科普专栏
          </h2>
          <div className="w-16 h-1 bg-orange-400 mx-auto my-3.5 rounded-full" />
          <p className="text-[#8C7A6B] text-sm sm:text-base">
            杜绝伪科普，精选前沿动物行为学与临床诊断意见，带你走近高能铲屎官的世界。
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white/80 backdrop-blur-xs rounded-[32px] p-6 shadow-xs border border-orange-100/65 mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-6">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer focus:outline-none ${
                  activeCategory === cat.key
                    ? 'bg-orange-400 text-white shadow-sm'
                    : 'bg-slate-50 hover:bg-orange-50 text-slate-600 hover:text-orange-500'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar Input */}
          <div className="relative w-full md:max-w-xs">
            <input
              type="text"
              placeholder="搜索饮食、口炎、呼噜噜等常识..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-100 focus:border-orange-300 focus:bg-white text-slate-700 pl-9 pr-4 py-2.5 rounded-2xl focus:outline-none transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

        </div>

        {/* Tips list accordion */}
        <div className="space-y-5">
          {filteredTips.length > 0 ? (
            filteredTips.map((tip) => {
              const theme = getCategoryTheme(tip.category);
              const isExpanded = expandedTipId === tip.id;

              return (
                <div
                  key={tip.id}
                  className={`bg-white rounded-3xl border border-orange-100/50 transition-all duration-300 overflow-hidden ${
                    isExpanded ? 'shadow-lg border-orange-200/80 ring-2 ring-orange-100/35' : 'shadow-2xs hover:shadow-md hover:-translate-y-1 hover:scale-[1.015]'
                  }`}
                >
                  {/* Article main summary card tab */}
                  <div
                    onClick={() => toggleExpand(tip.id)}
                    className="p-6 md:p-8 flex items-start gap-4 md:gap-5 cursor-pointer selection:bg-transparent"
                  >
                    {/* Number block or category block indicator */}
                    <div className="hidden sm:flex flex-col items-center justify-center w-14 h-14 bg-orange-50/80 text-orange-500 rounded-2xl shrink-0 font-bold border border-orange-100/40 font-mono">
                      <span className="text-2xs uppercase tracking-widest text-orange-400/80">Care</span>
                      <span className="text-lg -mt-1">{tip.id.replace('tip', '0')}</span>
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] sm:text-2xs font-bold px-2.5 py-0.5 rounded-full border ${theme.bg}`}>
                          {theme.label}
                        </span>
                        
                        <span className="text-3xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          阅读需要约 {tip.readTime}
                        </span>

                        <span className="text-3xs text-slate-400 flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {tip.views} 铲屎官点阅过
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-800 hover:text-orange-500 transition-colors duration-200 leading-snug">
                        {tip.title}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed font-normal">
                        {tip.summary}
                      </p>
                    </div>

                    {/* Expand arrow icons */}
                    <button
                      className="p-2 bg-slate-50 hover:bg-orange-100 text-slate-400 hover:text-orange-500 rounded-full transition-colors shrink-0 cursor-pointer self-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(tip.id);
                      }}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Scientific long detail drop down content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-slate-50 bg-slate-50/30"
                      >
                        <div className="px-6 pb-8 pt-4 md:px-8 space-y-5">
                          {/* Inner warnings/guideline lists rendered nicely */}
                          <div className="space-y-4">
                            {tip.content.map((point, index) => {
                              const isDanger = point.includes('禁止') || point.includes('危险') || point.includes('杜绝') || point.includes('警告');
                              return (
                                <div
                                  key={index}
                                  className={`p-4 rounded-2xl border text-xs leading-relaxed font-normal ${
                                    isDanger
                                      ? 'bg-rose-50/30 border-rose-100 text-rose-800'
                                      : 'bg-white border-slate-100 text-slate-700'
                                  }`}
                                >
                                  {isDanger && (
                                    <div className="flex items-center gap-1.5 text-rose-500 font-bold mb-1.5 shrink-0 text-xs">
                                      <AlertCircle className="w-4 h-4" />
                                      <span>安全警醒通知</span>
                                    </div>
                                  )}
                                  <p>{point}</p>
                                </div>
                              );
                            })}
                          </div>

                          {/* Detail metadata footer inside tip */}
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 text-2xs text-slate-400">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <User className="w-3.5 h-3.5" />
                                主讲人：<strong className="text-slate-600">{tip.author}</strong>
                              </span>
                            </div>
                            
                             <div className="flex items-center gap-2">
                               {savedTipId === tip.id ? (
                                 <span className="text-3xs text-[#8C7A6B] bg-[#FAF6F0] px-3 py-1.5 rounded-xl border border-orange-100 flex items-center gap-1 animate-fade-in font-medium">
                                   <span>已存入看猫备忘录 🐾</span>
                                 </span>
                               ) : (
                                 <button
                                   onClick={() => {
                                     setSavedTipId(tip.id);
                                     setTimeout(() => {
                                       setSavedTipId(null);
                                     }, 2500);
                                   }}
                                   className="px-4 py-1.5 bg-orange-400 hover:bg-orange-500 hover:shadow-xs text-white font-semibold rounded-xl text-3xs flex items-center gap-1 cursor-pointer transition-all whitespace-nowrap outline-none"
                                 >
                                   <span>存为看猫备忘录</span>
                                   <ArrowRight className="w-3 h-3" />
                                 </button>
                               )}
                             </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-[32px] p-12 text-center border border-orange-100/60 shadow-2xs">
              <AlertCircle className="w-10 h-10 text-orange-400 mx-auto mb-4 animate-bounce-slow" />
              <h4 className="text-base font-bold text-slate-700 mb-1">未找到相关养猫科普常识</h4>
              <p className="text-xs text-slate-400">试试模糊搜索其他的关键词（如：饮食、饮水、疫苗）</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
