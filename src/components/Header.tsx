import { useState, useEffect } from 'react';
import { Cat, Menu, X, Heart, Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  currentTab: 'exhibition' | 'popular' | 'breeds' | 'gallery' | 'education' | 'interactive';
  onTabChange: (tabId: 'exhibition' | 'popular' | 'breeds' | 'gallery' | 'education' | 'interactive') => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ currentTab, onTabChange, activeSection, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (tabId: 'exhibition' | 'popular' | 'breeds' | 'gallery' | 'education' | 'interactive') => {
    setIsMobileMenuOpen(false);
    onTabChange(tabId);
  };

  const handleAnchorClick = (anchorId: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(anchorId);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF6F0]/90 backdrop-blur-md shadow-sm border-b border-orange-100/40 py-3'
          : 'bg-gradient-to-b from-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          
          {/* Logo with Cozy font pairing & Warm theme */}
          <button
            onClick={() => handleTabClick('exhibition')}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
              isScrolled 
                ? 'bg-orange-400 text-white shadow-xs' 
                : 'bg-white/20 backdrop-blur-md text-white border border-white/25'
            }`}>
              <Cat className="w-4.5 h-4.5 group-hover:rotate-12 transition-transform" />
            </div>
            <div className="text-left font-sans">
              <span className={`block text-md font-semibold tracking-wide leading-tight ${
                isScrolled ? 'text-[#4A3E3D]' : 'text-white'
              }`}>
                猫咪雅苑 <span className="font-light text-xs opacity-75">/ Meow portraits</span>
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            
            {/* Category: Home */}
            <button
              onClick={() => handleTabClick('exhibition')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer focus:outline-none ${
                currentTab === 'exhibition'
                  ? isScrolled
                    ? 'bg-orange-100/60 text-orange-850'
                    : 'bg-white/20 text-white backdrop-blur-xs'
                  : isScrolled
                  ? 'text-[#5E503F] hover:text-orange-500'
                  : 'text-stone-200 hover:text-white'
              }`}
            >
              首页
            </button>

            {/* Category: Popular */}
            <button
              onClick={() => handleTabClick('popular')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer focus:outline-none ${
                currentTab === 'popular'
                  ? isScrolled
                    ? 'bg-orange-100/60 text-orange-850'
                    : 'bg-white/20 text-white backdrop-blur-xs'
                  : isScrolled
                  ? 'text-[#5E503F] hover:text-orange-500'
                  : 'text-stone-200 hover:text-white'
              }`}
            >
              热门推荐
            </button>

            {/* Category: Breeds */}
            <button
              onClick={() => handleTabClick('breeds')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer focus:outline-none ${
                currentTab === 'breeds'
                  ? isScrolled
                    ? 'bg-orange-100/60 text-orange-850'
                    : 'bg-white/20 text-white backdrop-blur-xs'
                  : isScrolled
                  ? 'text-[#5E503F] hover:text-orange-500'
                  : 'text-stone-200 hover:text-white'
              }`}
            >
              品种百科
            </button>

            {/* Category: Gallery */}
            <button
              onClick={() => handleTabClick('gallery')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer focus:outline-none ${
                currentTab === 'gallery'
                  ? isScrolled
                    ? 'bg-orange-100/60 text-orange-850'
                    : 'bg-white/20 text-white backdrop-blur-xs'
                  : isScrolled
                  ? 'text-[#5E503F] hover:text-orange-500'
                  : 'text-stone-200 hover:text-white'
              }`}
            >
              精选相册
            </button>

            {/* Category: Science care column */}
            <button
              onClick={() => handleTabClick('education')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer focus:outline-none flex items-center gap-1 ${
                currentTab === 'education'
                  ? isScrolled
                    ? 'bg-orange-100/60 text-orange-850'
                    : 'bg-white/20 text-white backdrop-blur-xs'
                  : isScrolled
                  ? 'text-[#5E503F] hover:text-orange-500'
                  : 'text-stone-200 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 opacity-80" />
              <span>科普专栏</span>
            </button>

            {/* Category: Virtual Pet cabin */}
            <button
              onClick={() => handleTabClick('interactive')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer focus:outline-none flex items-center gap-1 ${
                currentTab === 'interactive'
                  ? isScrolled
                    ? 'bg-orange-100/60 text-orange-850 shadow-3xs'
                    : 'bg-white/20 text-white backdrop-blur-xs'
                  : isScrolled
                  ? 'text-[#5E503F] hover:text-orange-500'
                  : 'text-stone-200 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-400 opacity-95" />
              <span>治愈陪伴乐园</span>
            </button>

          </div>

          {/* Mobile menu hamburger toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-1.5 rounded-lg focus:outline-none cursor-pointer ${
                isScrolled ? 'text-[#4A3E3D] hover:bg-orange-50' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-5.5 h-5.5" />
              ) : (
                <Menu className="w-5.5 h-5.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#FAF6F0]/98 backdrop-blur-xl border-b border-orange-100/60 shadow-lg py-5 px-8 animate-fade-in text-left">
          <div className="flex flex-col space-y-4">
            
            {/* View Switching tabs */}
            <p className="text-[10px] font-bold text-orange-400/80 uppercase tracking-widest border-b border-orange-100/50 pb-1">
              核心互动区
            </p>
            
            <button
              onClick={() => handleTabClick('exhibition')}
              className={`text-left text-xs tracking-wider py-1.5 font-bold cursor-pointer ${
                currentTab === 'exhibition' ? 'text-orange-650' : 'text-[#5E503F]'
              }`}
            >
              🏠 雅苑品相首面
            </button>

            <button
              onClick={() => handleTabClick('popular')}
              className={`text-left text-xs tracking-wider py-1.5 font-bold cursor-pointer ${
                currentTab === 'popular' ? 'text-orange-650' : 'text-[#5E503F]'
              }`}
            >
              🔥 热门猫咪推荐
            </button>

            <button
              onClick={() => handleTabClick('breeds')}
              className={`text-left text-xs tracking-wider py-1.5 font-bold cursor-pointer ${
                currentTab === 'breeds' ? 'text-orange-650' : 'text-[#5E503F]'
              }`}
            >
              📖 精选品种百科
            </button>

            <button
              onClick={() => handleTabClick('gallery')}
              className={`text-left text-xs tracking-wider py-1.5 font-bold cursor-pointer ${
                currentTab === 'gallery' ? 'text-orange-650' : 'text-[#5E503F]'
              }`}
            >
              🖼️ 独家美学相册
            </button>

            <button
              onClick={() => handleTabClick('education')}
              className={`text-left text-xs tracking-wider py-1.5 font-bold cursor-pointer ${
                currentTab === 'education' ? 'text-orange-650' : 'text-[#5E503F]'
              }`}
            >
              📚 科学养猫健康专栏
            </button>

            <button
              onClick={() => handleTabClick('interactive')}
              className={`text-left text-xs tracking-wider py-1.5 font-bold cursor-pointer ${
                currentTab === 'interactive' ? 'text-orange-650' : 'text-[#5E503F]'
              }`}
            >
              💖 治愈陪伴萌宠乐园
            </button>

          </div>
        </div>
      )}
    </nav>
  );
}
