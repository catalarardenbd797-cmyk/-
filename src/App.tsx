import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import PopularSection from './components/PopularSection';
import BreedSection from './components/BreedSection';
import GallerySection from './components/GallerySection';
import HomePortalSection from './components/HomePortalSection';
import CareSection from './components/CareSection';
import InteractiveCat from './components/InteractiveCat';
import Footer from './components/Footer';
import AudioControlPanel from './components/AudioControlPanel';
import LiveVibeOverlay from './components/LiveVibeOverlay';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'exhibition' | 'popular' | 'breeds' | 'gallery' | 'education' | 'interactive'>('exhibition');
  const [activeSection, setActiveSection] = useState('hero');

  // Monitor scroller to highlight headers (only applies in exhibition tab)
  useEffect(() => {
    if (currentTab !== 'exhibition') {
      setActiveSection(currentTab);
      return;
    }

    const handleScroll = () => {
      const sections = ['hero', 'home-portals'];
      const scrollPosition = window.scrollY + 250; // offset for nav heights

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentTab]);

  // Global click interceptor for hashes to route to respective tabs smoothly
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          handleNavigate(targetId);
        }
      }
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [currentTab]);

  const handleTabChange = (tabId: 'exhibition' | 'popular' | 'breeds' | 'gallery' | 'education' | 'interactive') => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection(tabId);
  };

  const handleNavigate = (sectionId: string) => {
    // Intercept scroll links and route to their standalone views
    if (sectionId === 'popular') {
      handleTabChange('popular');
    } else if (sectionId === 'breeds') {
      handleTabChange('breeds');
    } else if (sectionId === 'breeds-info') {
      handleTabChange('breeds');
    } else if (sectionId === 'gallery') {
      handleTabChange('gallery');
    } else if (sectionId === 'education') {
      handleTabChange('education');
    } else if (sectionId === 'interactive') {
      handleTabChange('interactive');
    } else if (sectionId === 'hero') {
      handleTabChange('exhibition');
    } else if (sectionId === 'home-portals') {
      handleTabChange('exhibition');
      setTimeout(() => {
        const element = document.getElementById('home-portals');
        if (element) {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Fallback for standard element anchors or generic sections
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="font-sans antialiased text-[#5E503F] bg-[#FAF6F0] min-h-screen selection:bg-orange-200 selection:text-orange-950">
      
      {/* Top Floating Header */}
      <Header 
        currentTab={currentTab}
        onTabChange={handleTabChange}
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
      />

      {/* Main Container */}
      <main className="w-full">
        <AnimatePresence mode="wait">
          {currentTab === 'exhibition' && (
            <motion.div
              key="exhibition"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              {/* Hero Section */}
              <HeroCarousel />

              {/* 科普与云养猫互动 (Science Portal & Cloud Cat Game) Section */}
              <HomePortalSection onTabChange={handleTabChange} />
            </motion.div>
          )}

          {currentTab === 'popular' && (
            <motion.div
              key="popular"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="pt-16 sm:pt-20"
            >
              {/* 1. 热门猫咪 (Popular Cats) - Standalone Page */}
              <PopularSection />
            </motion.div>
          )}

          {currentTab === 'breeds' && (
            <motion.div
              key="breeds"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="pt-16 sm:pt-20"
            >
              {/* 2. 品种图鉴 (Breed Encyclopedia) - Standalone Page */}
              <BreedSection />
            </motion.div>
          )}

          {currentTab === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="pt-16 sm:pt-20"
            >
              {/* 3. 精选图集 (Curated Gallery) - Standalone Page */}
              <GallerySection />
            </motion.div>
          )}

          {currentTab === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="pt-16 sm:pt-20"
            >
              {/* 养猫科普专栏 Section */}
              <CareSection />
            </motion.div>
          )}

          {currentTab === 'interactive' && (
            <motion.div
              key="interactive"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="pt-16 sm:pt-20"
            >
              {/* 喵酱超能互动空间 Section */}
              <InteractiveCat />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Info & Feedback Section */}
      <Footer />

      {/* Persistent floating audio control panel */}
      <AudioControlPanel />

      {/* Floating magical atmospheric pawprints particle & cursor trail theme */}
      <LiveVibeOverlay />

    </div>
  );
}
