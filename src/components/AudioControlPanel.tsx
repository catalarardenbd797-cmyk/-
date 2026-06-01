import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Music, Settings, Sparkles, Sliders, ChevronDown, ChevronUp, Radio } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';

export default function AudioControlPanel() {
  const {
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
  } = useAudio();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Close tooltip after first interaction
  const handleTogglePlay = () => {
    if (!isPlaying) {
      startAudio();
    }
    toggleBgm();
    setShowTooltip(false);
  };

  const playClickFeedback = () => {
    playSfx('click');
  };

  return (
    <div className="fixed bottom-6 left-6 z-45 font-sans pointer-events-none">
      {/* Mini Tooltip for onboarding */}
      <AnimatePresence>
        {showTooltip && !bgmEnabled && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 left-0 w-48 bg-white border border-orange-100 rounded-2xl p-3 shadow-md relative text-3xs text-slate-755 font-medium pointer-events-auto shadow-[0_8px_20px_rgba(251,146,60,0.1)]"
          >
            <div className="flex gap-1.5 items-start">
              <div className="w-4 h-4 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-2.5 h-2.5 text-orange-500 fill-orange-300" />
              </div>
              <div className="text-left">
                <span className="block font-bold text-slate-800 text-[9px] text-orange-600 uppercase tracking-widest mb-0.5">
                  音效服务已就绪
                </span>
                <p className="leading-snug text-slate-500 text-[9px]">
                  点这里播放舒缓钢琴曲，亦可任意拖动面板哦！🎹✨
                </p>
              </div>
            </div>
            {/* Caret pointing down */}
            <div className="absolute -bottom-2 left-5 w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-6 border-t-white" />
            <div className="absolute -bottom-2.5 left-5 w-0 h-0 border-l-[6.5px] border-l-transparent border-r-[6.5px] border-r-transparent border-t-[6.5px] border-t-orange-100 -z-10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Controller widget */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.05}
        className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl border border-orange-150/60 shadow-[0_6px_20px_rgba(251,146,60,0.11)] py-1.5 pl-1.5 pr-2 flex flex-col gap-2 max-w-[280px] overflow-hidden select-none hover:shadow-[0_10px_28px_rgba(251,146,60,0.16)] hover:border-orange-200 cursor-grab active:cursor-grabbing"
        animate={{ width: isExpanded ? 230 : 'auto' }}
        style={{ touchAction: 'none' }}
      >
        {/* Toggle & Pulse Section */}
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-1.5">
            {/* Visual Drag Handle Grip dots to signify dragging capability clearly */}
            <div className="flex flex-col gap-[2px] px-1 py-1 shrink-0">
              <span className="w-[3px] h-[3px] rounded-full bg-orange-300/60" />
              <span className="w-[3px] h-[3px] rounded-full bg-orange-300/60" />
              <span className="w-[3px] h-[3px] rounded-full bg-orange-300/60" />
            </div>

            {/* Spinning/pulsing Music Icon disk */}
            <motion.button
              onClick={handleTogglePlay}
              className={`w-8.5 h-8.5 rounded-full flex items-center justify-center cursor-pointer transition-all border outline-none group shrink-0 ${
                bgmEnabled
                  ? 'bg-gradient-to-tr from-orange-400 to-amber-400 border-none shadow-[0_0_8px_2px_rgba(251,146,60,0.2)] text-white'
                  : 'bg-orange-50/70 hover:bg-orange-100/50 border-orange-200/50 text-orange-500'
              }`}
              animate={bgmEnabled ? { rotate: 360 } : { scale: 1 }}
              transition={bgmEnabled ? { repeat: Infinity, duration: 15, ease: 'linear' } : { duration: 0.3 }}
              title={bgmEnabled ? '静音背景音乐' : '播放背景钢琴曲'}
            >
              {bgmEnabled ? (
                <Music className="w-3.5 h-3.5 animate-pulse" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 group-hover:scale-110" />
              )}
            </motion.button>

            {/* Title / Mini-visualizer */}
            <div className={`overflow-hidden transition-all flex flex-col justify-center text-left select-none ${isExpanded ? 'opacity-100 w-auto' : 'w-0 opacity-0 pointer-events-none'}`}>
              <span className="text-[10px] font-bold text-slate-800 leading-none">
                {bgmEnabled ? '舒缓治愈背景乐' : '已静音'}
              </span>
              <span className="text-[8px] text-slate-400 font-mono mt-0.5 flex items-center gap-1 leading-none">
                {bgmEnabled ? (
                  <>
                    <span className="text-orange-500 font-bold">{isSynthBgm ? '水晶合成' : '舒缓钢琴'}</span>
                    <Radio className="w-2 h-2 text-orange-500 shrink-0" />
                  </>
                ) : (
                  '点击开启纯音'
                )}
              </span>
            </div>
          </div>

          {/* Expanded sound wave track visualization */}
          {!isExpanded && bgmEnabled && (
            <div className="flex items-end gap-[1.5px] h-2.5 px-1">
              <span className="w-[1.5px] bg-orange-400 animate-pulse h-2" style={{ animationDelay: '0.1s', animationDuration: '0.6s' }} />
              <span className="w-[1.5px] bg-orange-400 animate-pulse h-1" style={{ animationDelay: '0.3s', animationDuration: '0.8s' }} />
              <span className="w-[1.5px] bg-orange-400 animate-pulse h-2.5" style={{ animationDelay: '0.5s', animationDuration: '0.5s' }} />
              <span className="w-[1.5px] bg-orange-400 animate-pulse h-1.5" style={{ animationDelay: '0.2s', animationDuration: '0.7s' }} />
            </div>
          )}

          {/* Quick toggle Expand */}
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
              playClickFeedback();
              setShowTooltip(false);
            }}
            className="w-6.5 h-6.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center cursor-pointer focus:outline-none shrink-0"
            title={isExpanded ? '收起配置面板' : '展开配置面板'}
          >
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <Settings className="w-3.5 h-3.5 hover:rotate-45 transition-transform" />}
          </button>
        </div>

        {/* Expanded Panel Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2 pt-1.5 border-t border-slate-100/70"
            >
              {/* Sound Mode Switch (Procedural Synth vs MP3) */}
              <div className="bg-orange-50/40 p-1.5 rounded-xl border border-orange-100/20 text-left">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] font-bold text-slate-700 flex items-center gap-0.5 leading-none select-none">
                    ✨ 背景乐曲音源：
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => {
                      setIsSynthBgm(true);
                      playClickFeedback();
                    }}
                    className={`py-0.5 rounded-lg text-[9px] font-bold transition-all text-center shrink-0 cursor-pointer ${
                      isSynthBgm
                        ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-3xs'
                        : 'bg-white border border-orange-100 hover:bg-orange-50 text-slate-600'
                    }`}
                  >
                    <span>🔮 水晶合成</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsSynthBgm(false);
                      playClickFeedback();
                    }}
                    className={`py-0.5 rounded-lg text-[9px] font-bold transition-all text-center shrink-0 cursor-pointer ${
                      !isSynthBgm
                        ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-3xs'
                        : 'bg-white border border-orange-100 hover:bg-orange-50 text-slate-600'
                    }`}
                  >
                    <span>🎹 舒缓钢琴</span>
                  </button>
                </div>
              </div>

              {/* Volume 1: BGM Volume Control */}
              <div className="space-y-0.5 text-left">
                <div className="flex justify-between items-center text-[9px] font-bold text-slate-500 select-none">
                  <span className="flex items-center gap-1 text-slate-705">
                    <Music className="w-3 h-3 text-orange-400" />
                    背景音量 ({Math.round(bgmVolume * 100)}%)
                  </span>
                  <button
                    onClick={() => {
                      setBgmEnabled(!bgmEnabled);
                      playClickFeedback();
                    }}
                    className="text-orange-500 hover:text-orange-600 font-medium cursor-pointer"
                  >
                    {bgmEnabled ? '静音' : '开启'}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="0.8"
                    step="0.05"
                    value={bgmVolume}
                    onChange={(e) => setBgmVolume(parseFloat(e.target.value))}
                    className="w-full h-1 bg-orange-100 rounded-lg appearance-none cursor-pointer accent-orange-400 focus:outline-none"
                    disabled={!bgmEnabled}
                    style={{ opacity: bgmEnabled ? 1 : 0.4 }}
                  />
                </div>
              </div>

              {/* Volume 2: SFX Volume Control */}
              <div className="space-y-0.5 text-left">
                <div className="flex justify-between items-center text-[9px] font-bold text-slate-500 select-none">
                  <span className="flex items-center gap-1 text-slate-705">
                    <Volume2 className="w-3 h-3 text-orange-400" />
                    按键音量 ({Math.round(sfxVolume * 100)}%)
                  </span>
                  <button
                    onClick={() => {
                      setSfxEnabled(!sfxEnabled);
                      playSfx('click');
                    }}
                    className="text-orange-500 hover:text-orange-600 font-medium cursor-pointer"
                  >
                    {sfxEnabled ? '关闭' : '开启'}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="0.9"
                    step="0.05"
                    value={sfxVolume}
                    onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
                    className="w-full h-1 bg-orange-100 rounded-lg appearance-none cursor-pointer accent-orange-400 focus:outline-none"
                    disabled={!sfxEnabled}
                    style={{ opacity: sfxEnabled ? 1 : 0.4 }}
                  />
                </div>
              </div>

              {/* Active Soundwave Animation bars */}
              {bgmEnabled && (
                <div className="flex items-center justify-center gap-1 bg-amber-50/40 py-1.5 rounded-xl border border-orange-50/50">
                  <div className="flex items-end gap-0.5 h-2.5 shrink-0">
                    <span className="w-1 bg-gradient-to-t from-orange-400 to-amber-400 rounded-full animate-pulse h-1.5" style={{ animationDelay: '0.1s', animationDuration: '0.5s' }} />
                    <span className="w-1 bg-gradient-to-t from-orange-400 to-amber-400 rounded-full animate-pulse h-2.5" style={{ animationDelay: '0.3s', animationDuration: '0.7s' }} />
                    <span className="w-1 bg-gradient-to-t from-orange-400 to-amber-400 rounded-full animate-pulse h-1" style={{ animationDelay: '0.5s', animationDuration: '0.4s' }} />
                    <span className="w-1 bg-gradient-to-t from-orange-400 to-amber-400 rounded-full animate-pulse h-2" style={{ animationDelay: '0.2s', animationDuration: '0.6s' }} />
                  </div>
                  <span className="text-[8px] font-bold text-slate-500 tracking-tight leading-none select-none">
                    治愈乐谱奏鸣中...
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
