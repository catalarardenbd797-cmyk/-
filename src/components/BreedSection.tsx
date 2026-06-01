import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, Globe, Heart, X, Search, ChevronRight } from 'lucide-react';
import { catBreeds } from '../data/catData';
import { CatBreed } from '../types';

export default function BreedSection() {
  const [selectedBreed, setSelectedBreed] = useState<CatBreed | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState('全部');

  // Continents list for responsive filtration
  const regions = ['全部', '亚洲', '欧洲', '美洲', '非洲'];

  // Map each cat's origin to a continent
  const getRegionOfOrigin = (origin: string): string => {
    const orig = origin.toLowerCase();
    if (orig.includes('中国') || orig.includes('日本') || orig.includes('泰国') || orig.includes('伊朗') || orig.includes('阿富汗')) {
      return '亚洲';
    }
    if (orig.includes('英国') || orig.includes('挪威') || orig.includes('俄罗斯')) {
      return '欧洲';
    }
    if (orig.includes('美国') || orig.includes('加拿大')) {
      return '美洲';
    }
    if (orig.includes('埃塞俄比亚') || orig.includes('埃及')) {
      return '非洲';
    }
    return '其他';
  };

  // Filtered dataset based on search inputs & region clicks
  const filteredBreeds = catBreeds.filter((breed) => {
    const matchesSearch = 
      breed.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breed.engName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breed.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breed.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeRegion === '全部') return matchesSearch;
    return matchesSearch && getRegionOfOrigin(breed.origin) === activeRegion;
  });

  // Minimalist orange rating stars for warm high-end feel
  const renderStars = (score: number) => {
    return (
      <div className="flex items-center gap-0.5 text-orange-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= score ? 'fill-orange-400 text-orange-400' : 'text-orange-200'
            }`}
          />
        ))}
        <span className="text-2xs font-mono text-orange-500/80 ml-1.5">{score}.0</span>
      </div>
    );
  };

  return (
    <section id="breeds" className="py-24 bg-white border-b border-orange-100/40">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange-500/80 font-bold mb-3">
            02 / SPECIES ENCYCLOPEDIA
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#4A3E3D] tracking-tight leading-tight">
            品种图鉴 <span className="font-light text-stone-400">/ Breed Directory</span>
          </h2>
          <p className="text-[#8C7A6B] font-normal text-sm sm:text-base mt-4 max-w-xl leading-relaxed">
            由专业测评总结的经典猫咪品相和性格名录。支持地理板块快速筛选与关键词即时搜索，带您深度读懂每个温柔生灵的科学档案。
          </p>
        </div>

        {/* Search and Filters Segment - Warm and Inviting */}
        <div className="mb-12 space-y-6">
          {/* Search Box */}
          <div className="relative bg-[#FAF6F0] rounded-2xl border border-orange-100/70 p-1 flex items-center max-w-2xl transition-all duration-300 focus-within:border-orange-300 focus-within:bg-white focus-within:shadow-md">
            <div className="pl-4 text-orange-400">
              <Search className="w-4.5 h-4.5" />
            </div>
            <input
              type="text"
              placeholder="搜索品类名称、英文名、来源地或原产背景..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-3 text-sm text-[#4A3E3D] bg-transparent focus:outline-none placeholder-orange-300/80"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-2 text-orange-350 hover:text-orange-500 transition-colors mr-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap gap-2 pt-2">
            {regions.map((region) => {
              const count = catBreeds.filter(b => region === '全部' || getRegionOfOrigin(b.origin) === region).length;
              return (
                <button
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 border ${
                    activeRegion === region
                      ? 'bg-orange-400 border-orange-450 text-white shadow-sm'
                      : 'bg-white text-[#5E503F] hover:bg-orange-50/50 border-orange-100 hover:border-orange-200'
                  }`}
                >
                  <span>{region}</span>
                  <span className={`text-[10px] px-2 py-0.2 rounded-full font-mono font-medium ${
                    activeRegion === region ? 'bg-orange-500 text-orange-50' : 'bg-[#FAF6F0] text-orange-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Breed Cards Grid (Sleek Warm Cards) */}
        {filteredBreeds.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredBreeds.map((breed) => (
                <motion.div
                  key={breed.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-[28px] overflow-hidden border border-orange-100/60 flex flex-col justify-between group h-full hover:-translate-y-2.5 hover:scale-[1.03] hover:shadow-xl hover:border-orange-200/80 transition-all duration-400"
                >
                  {/* Image with overlay and zoom */}
                  <div className="relative h-60 overflow-hidden bg-orange-50/20">
                    <img
                      src={breed.image}
                      alt={breed.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 z-10 flex gap-1.5">
                      <span className="bg-[#FAF6F0]/90 backdrop-blur-md text-[#4A3E3D] text-[10px] font-bold px-2.5 py-1 rounded-lg border border-orange-100/30 flex items-center gap-1 shadow-3xs">
                        <Globe className="w-3 h-3 text-orange-400" />
                        <span>{breed.origin}</span>
                      </span>
                    </div>
                    {breed.priceRange && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="bg-amber-500/90 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg shadow-2xs flex items-center gap-0.5">
                          <span>{breed.priceRange}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Detail Summary */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-lg font-bold text-[#4A3E3D] flex items-baseline gap-1.5 truncate">
                          <span>{breed.name}</span>
                          <span className="text-2xs font-medium text-orange-400 font-mono truncate">
                            {breed.engName}
                          </span>
                        </h3>
                        <div className="flex flex-col items-end gap-1 font-mono shrink-0">
                          <span className="text-3xs text-orange-500 bg-orange-50 border border-orange-100/40 px-2 py-0.5 rounded">
                            {breed.lifeSpan}
                          </span>
                          {breed.priceRange && (
                            <span className="text-3xs text-stone-500 bg-stone-50 border border-stone-100/60 px-2 py-0.5 rounded font-sans font-medium">
                              参考: {breed.priceRange}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-[#8C7A6B] text-2xs leading-relaxed line-clamp-2">
                        {breed.description}
                      </p>

                      {/* Character Highlight */}
                      <div className="text-orange-900 bg-orange-50/50 p-3 rounded-2xl border border-orange-100/30 text-3xs leading-relaxed">
                        <span className="text-orange-700 font-bold">性格特征:</span> {breed.character}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Category Tags */}
                      <div className="flex flex-wrap gap-1">
                        {breed.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-3xs font-bold text-[#8C7A6B] bg-[#FAF6F0] border border-orange-100/35 px-2.5 py-1 rounded-full text-[10px]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Trigger Detail Modal */}
                      <button
                        onClick={() => setSelectedBreed(breed)}
                        className="w-full py-2.5 bg-[#FAF6F0] hover:bg-orange-400 border border-orange-100 text-[#5E503F] hover:text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer active:scale-98"
                      >
                        <span>身世档案</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-24 bg-[#FAF6F0]/50 rounded-3xl border border-orange-100/30">
            <div className="text-3xl mb-3">🐾</div>
            <h3 className="text-sm font-bold text-[#4A3E3D]">没有查找到匹配的品种</h3>
            <p className="text-2xs text-[#8C7A6B] mt-1">您可以试着调整搜索词或选择不同的地区选项</p>
          </div>
        )}

        {/* Detailed Breed Modal (AnimatePresence Framer Motion) */}
        <AnimatePresence>
          {selectedBreed && (
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
              {/* Blur backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedBreed(null)}
                className="fixed inset-0 bg-[#4A3E3D]/40 backdrop-blur-xs"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ scale: 0.98, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.98, y: 15, opacity: 0 }}
                transition={{ type: 'spring', damping: 28, stiffness: 380 }}
                className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-orange-100 max-h-[90vh] flex flex-col justify-between shadow-2xl z-10"
              >
                {/* Header Image Part */}
                <div className="relative h-60 sm:h-64 w-full shrink-0">
                  <img
                    src={selectedBreed.image}
                    alt={selectedBreed.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Subtle warm bottom gradient mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-950/80 via-transparent to-transparent" />
                  
                  {/* Close btn */}
                  <button
                    onClick={() => setSelectedBreed(null)}
                    className="absolute top-5 right-5 z-20 bg-orange-950/30 hover:bg-orange-500 text-white p-2 rounded-full backdrop-blur-md transition-colors duration-250 focus:outline-none cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Bottom title inside cover */}
                  <div className="absolute bottom-5 left-6 right-6 text-white text-left">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[10px] bg-white/20 select-none backdrop-blur-md font-mono font-bold px-2.5 py-0.5 rounded-md border border-white/10">
                        {selectedBreed.origin}
                      </span>
                      <span className="text-[10px] bg-white/20 select-none backdrop-blur-md font-mono font-bold px-2.5 py-0.5 rounded-md border border-white/10">
                        寿命: {selectedBreed.lifeSpan}
                      </span>
                      {selectedBreed.priceRange && (
                        <span className="text-[10px] bg-[#E06D53] text-[#FAF6F0] font-bold px-2.5 py-0.5 rounded-md shadow-3xs">
                          价格参考: {selectedBreed.priceRange}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xl font-bold flex items-baseline gap-1">
                      {selectedBreed.name}
                      <span className="text-xs font-normal text-stone-300 font-mono ml-2">
                        ({selectedBreed.engName})
                      </span>
                    </h4>
                  </div>
                </div>

                {/* Body Details Part Scrollable */}
                <div className="p-6 overflow-y-auto space-y-6 flex-1 text-left">
                  {/* Long Description and highlights */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-orange-400">
                      品种自白 / INTRO
                    </h5>
                    <p className="text-xs text-[#8C7A6B] leading-relaxed font-normal bg-[#FAF6F0] p-4 rounded-2xl border border-orange-100/30">
                      {selectedBreed.description}
                    </p>
                  </div>

                  {/* Physical & character list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#FAF6F0]/50 p-4.5 rounded-2xl border border-orange-100/30 space-y-1.5">
                      <h5 className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
                        体外品相特征
                      </h5>
                      <p className="text-3xs text-[#8C7A6B] leading-relaxed font-normal">
                        {selectedBreed.physical}
                      </p>
                    </div>

                    <div className="bg-[#FAF6F0]/50 p-4.5 rounded-2xl border border-orange-100/30 space-y-1.5">
                      <h5 className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
                        生命性格共鸣
                      </h5>
                      <p className="text-3xs text-[#8C7A6B] leading-relaxed font-normal">
                        {selectedBreed.character}
                      </p>
                    </div>
                  </div>

                  {/* Attribute ratings */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-orange-400">
                      科学养育数值模型 / MATRICES
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Affection */}
                      <div className="flex items-center justify-between bg-[#FAF6F0]/40 p-3 rounded-xl border border-orange-100/30">
                        <span className="text-3xs font-semibold text-[#5E503F]">
                          粘人程度
                        </span>
                        {renderStars(selectedBreed.ratings.affection)}
                      </div>

                      {/* Energy */}
                      <div className="flex items-center justify-between bg-[#FAF6F0]/40 p-3 rounded-xl border border-orange-100/30">
                        <span className="text-3xs font-semibold text-[#5E503F]">
                          活泼程度
                        </span>
                        {renderStars(selectedBreed.ratings.energy)}
                      </div>

                      {/* Grooming */}
                      <div className="flex items-center justify-between bg-[#FAF6F0]/40 p-3 rounded-xl border border-orange-100/30">
                        <span className="text-3xs font-semibold text-[#5E503F]">
                          美毛护理频度
                        </span>
                        {renderStars(selectedBreed.ratings.grooming)}
                      </div>

                      {/* Intelligence */}
                      <div className="flex items-center justify-between bg-[#FAF6F0]/40 p-3 rounded-xl border border-orange-100/30">
                        <span className="text-3xs font-semibold text-[#5E503F]">
                          可训智商水平
                        </span>
                        {renderStars(selectedBreed.ratings.intelligence)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Modal Info */}
                <div className="p-5 border-t border-orange-100 bg-[#FAF6F0]/50 shrink-0 text-center flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-[10px] text-orange-400 font-mono">
                    * 数值模型评分仅供参考，实际表现因个体生活习性而异。
                  </span>
                  <button
                    onClick={() => setSelectedBreed(null)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-orange-400 hover:bg-orange-500 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    关闭档案
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
