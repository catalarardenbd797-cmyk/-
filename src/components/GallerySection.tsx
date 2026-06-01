import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Bookmark, Eye, X, ChevronLeft, ChevronRight, Share2, Sparkles } from 'lucide-react';
import { galleryImages } from '../data/catData';

export default function GallerySection() {
  const [filter, setFilter] = useState<'all' | 'cute' | 'funny' | 'sleeping' | 'kitten'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  // Custom user interactions for Likes & Saves
  const [likesData, setLikesData] = useState<Record<string, { count: number; liked: boolean }>>(() => {
    return galleryImages.reduce((acc, img) => {
      acc[img.id] = { count: img.likes, liked: false };
      return acc;
    }, {} as Record<string, { count: number; liked: boolean }>);
  });

  const [savesData, setSavesData] = useState<Record<string, { count: number; saved: boolean }>>(() => {
    return galleryImages.reduce((acc, img) => {
      acc[img.id] = { count: img.saves, saved: false };
      return acc;
    }, {} as Record<string, { count: number; saved: boolean }>);
  });

  const [shareSuccess, setShareSuccess] = useState(false);

  // Muted, high-end translations for tabs
  const filterTabs = [
    { key: 'all' as const, label: '全部' },
    { key: 'cute' as const, label: '温存毛球' },
    { key: 'funny' as const, label: '静默萌态' },
    { key: 'sleeping' as const, label: '梦呓惬意' },
    { key: 'kitten' as const, label: '细沙奶幼' },
  ];

  const filteredImages = galleryImages.filter(img => filter === 'all' || img.category === filter);

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikesData(prev => {
      const current = prev[id] || { count: 120, liked: false };
      return {
        ...prev,
        [id]: {
          count: current.liked ? current.count - 1 : current.count + 1,
          liked: !current.liked
        }
      };
    });
  };

  const toggleSave = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavesData(prev => {
      const current = prev[id] || { count: 35, saved: false };
      return {
        ...prev,
        [id]: {
          count: current.saved ? current.count - 1 : current.count + 1,
          saved: !current.saved
        }
      };
    });
  };

  const handleShare = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const imgObj = galleryImages.find(img => img.id === id);
    if (imgObj) {
      navigator.clipboard.writeText(imgObj.url).catch(() => {});
    }
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2000);
  };

  const handleNextLightbox = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex === null) return;
    const targetLength = filteredImages.length;
    setLightboxIndex(prev => (prev !== null && prev === targetLength - 1 ? 0 : (prev as number) + 1));
  };

  const handlePrevLightbox = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex === null) return;
    const targetLength = filteredImages.length;
    setLightboxIndex(prev => (prev !== null && prev === 0 ? targetLength - 1 : (prev as number) - 1));
  };

  return (
    <section id="gallery" className="py-24 bg-[#FAF6F0]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange-500/80 font-bold mb-3">
            03 / DIGITAL PORTRAITS
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#4A3E3D] tracking-tight leading-tight">
            精选图集 <span className="font-light text-stone-400">/ Curated Gallery</span>
          </h2>
          <p className="text-[#8C7A6B] font-normal text-sm sm:text-base mt-4 max-w-xl leading-relaxed">
            捕捉温暖光影斑驳下的极致治愈。弱化冗余条框，让您的视线聚焦于生灵眼神里的晶莹世界，双击或轻触体验极速沉浸感。
          </p>
        </div>

        {/* Categories Tab Controllers - Minimal Rounded Pills */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {filterTabs.map((tab) => (
            <button
               key={tab.key}
               onClick={() => setFilter(tab.key)}
               className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer focus:outline-none border ${
                 filter === tab.key
                   ? 'bg-orange-400 border-orange-450 text-white shadow-sm'
                   : 'bg-white text-[#5E503F] border-orange-100 hover:bg-orange-50 hover:border-orange-200'
               }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery grid layouts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, index) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxIndex(index)}
                className="group relative bg-white rounded-2xl overflow-hidden border border-orange-100/60 hover:shadow-xl hover:border-orange-200/85 hover:scale-[1.045] hover:-translate-y-2.5 transition-all duration-300 cursor-zoom-in aspect-square flex flex-col justify-end"
              >
                {/* Main image */}
                <img
                  src={img.url}
                  alt={img.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.10] transition-transform duration-500"
                />

                {/* Subtle soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                {/* Overlayer Actions bottom left (always neat, very understated) */}
                <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <button
                    onClick={(e) => toggleLike(img.id, e)}
                    className={`p-2 rounded-full cursor-pointer backdrop-blur-md transition-all focus:outline-none ${
                      likesData[img.id]?.liked
                        ? 'bg-white text-rose-500 scale-105'
                        : 'bg-stone-950/30 text-white hover:bg-stone-900/60'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </button>
                  <button
                    onClick={(e) => toggleSave(img.id, e)}
                    className={`p-2 rounded-full cursor-pointer backdrop-blur-md transition-all focus:outline-none ${
                      savesData[img.id]?.saved
                        ? 'bg-white text-stone-900 scale-105'
                        : 'bg-stone-950/30 text-white hover:bg-stone-900/60'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

                {/* Bottom detail text panel triggered on hover hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-left">
                  <span className="text-[9px] font-mono tracking-wider bg-white/20 select-none backdrop-blur-md px-2 py-0.5 rounded border border-white/10 mb-2 inline-block">
                    {img.breed}
                  </span>
                  <h4 className="text-xs font-semibold truncate tracking-wide">
                    {img.title}
                  </h4>
                  <p className="text-[10px] text-stone-200 mt-1 line-clamp-1 leading-relaxed">
                    {img.description}
                  </p>
                  
                  {/* Footer details */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-2.5 mt-2.5 text-[9px] text-white/85">
                    <span className="flex items-center gap-1 font-mono">
                      <Heart className="w-2.5 h-2.5 fill-current" />
                      吸猫人气: {likesData[img.id]?.count || img.likes}
                    </span>
                    <span className="flex items-center gap-0.5 opacity-80">
                      <Eye className="w-3 h-3" /> 放大细节
                    </span>
                  </div>
                </div>

                {/* Default under-stated caption for standard state */}
                <div className="absolute bottom-3 left-3 z-15 bg-stone-950/20 backdrop-blur-md px-3 py-1 rounded-lg text-white text-3xs font-light tracking-wide border border-white/10 opacity-100 group-hover:opacity-0 transition-opacity duration-200 text-left">
                  {img.title}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox Modal Carousel */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-stone-950/98 select-none p-4">
              
              {/* Outer Overlay to trigger close */}
              <div 
                className="absolute inset-0" 
                onClick={() => setLightboxIndex(null)} 
              />

              {/* Share Success Hint Toast */}
              {shareSuccess && (
                <div className="absolute top-20 z-55 bg-white text-stone-900 text-xs px-4 py-2 rounded-full font-light border border-stone-200 shadow-md flex items-center gap-1.5 animate-bounce-slow">
                  <span>图片地址：已复制。快向其他猫奴展示吧！</span>
                </div>
              )}

              {/* Top Navigation Bar inside lightbox */}
              <div className="absolute top-5 left-0 right-0 px-6 flex items-center justify-between z-30 text-white bg-gradient-to-b from-black/20 to-transparent pb-10">
                <div className="flex items-center gap-2 text-left">
                  <span className="font-light text-sm tracking-wide">
                    {filteredImages[lightboxIndex].title}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono font-bold bg-white/5 px-2 py-0.5 rounded">
                    {lightboxIndex + 1} / {filteredImages.length}
                  </span>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white p-2.5 rounded-full hover:scale-102 transition-all cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Main lightbox screen element */}
              <div className="relative max-w-4xl w-full h-[65vh] md:h-[75vh] z-10 flex items-center justify-center">
                
                {/* Left arrow trigger */}
                <button
                  onClick={handlePrevLightbox}
                  className="absolute left-0 bg-white/5 border border-white/10 hover:bg-white/10 text-white p-3 rounded-full hover:scale-105 transition-all z-20 cursor-pointer focus:outline-none"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Image layout container */}
                <motion.div
                  key={filteredImages[lightboxIndex].id}
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-full h-full flex items-center justify-center"
                >
                  <img
                    src={filteredImages[lightboxIndex].url}
                    alt={filteredImages[lightboxIndex].title}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/5"
                  />
                </motion.div>

                {/* Right arrow trigger */}
                <button
                  onClick={handleNextLightbox}
                  className="absolute right-0 bg-white/5 border border-white/10 hover:bg-white/10 text-white p-3 rounded-full hover:scale-105 transition-all z-20 cursor-pointer focus:outline-none"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom detail text bar inside lightbox */}
              <div className="absolute bottom-5 left-0 right-0 px-6 z-20 flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto text-white bg-stone-900/90 rounded-2xl p-5 border border-stone-800">
                <div className="text-left w-full md:w-2/3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded shrink-0">
                      品种: {filteredImages[lightboxIndex].breed}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      Curated Works
                    </span>
                  </div>
                  <h5 className="text-xs text-stone-300 leading-relaxed font-light">
                    {filteredImages[lightboxIndex].description}
                  </h5>
                </div>

                {/* Interactive controller inside lightbox bottom */}
                <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 justify-end">
                  <button
                    onClick={() => toggleLike(filteredImages[lightboxIndex].id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.8 rounded-xl cursor-pointer text-xs font-medium focus:outline-none transition-all ${
                      likesData[filteredImages[lightboxIndex].id]?.liked
                        ? 'bg-rose-500 text-white border-rose-500'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span className="font-mono">{likesData[filteredImages[lightboxIndex].id]?.count || filteredImages[lightboxIndex].likes}</span>
                  </button>

                  <button
                    onClick={() => toggleSave(filteredImages[lightboxIndex].id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.8 rounded-xl cursor-pointer text-xs font-medium focus:outline-none transition-all ${
                      savesData[filteredImages[lightboxIndex].id]?.saved
                        ? 'bg-stone-50 border-stone-50 text-stone-900'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                    <span>{savesData[filteredImages[lightboxIndex].id]?.saved ? '已存' : '收藏'}</span>
                  </button>

                  <button
                    onClick={() => handleShare(filteredImages[lightboxIndex].id)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white cursor-pointer"
                  >
                    <Share2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
