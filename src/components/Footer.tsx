import React, { useState } from 'react';
import { Cat, Send, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showSubResult, setShowSubResult] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !feedback.trim()) return;
    
    setShowSubResult(true);
    setEmail('');
    setFeedback('');
    setTimeout(() => {
      setShowSubResult(false);
    }, 4000);
  };

  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-stone-900 py-20 relative overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-left">
          
          {/* Col 1 Brand column (5 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 bg-stone-900 text-stone-200 border border-stone-800 rounded-full flex items-center justify-center">
                <Cat className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-md font-light tracking-wide">猫咪鉴赏</span>
                <span className="block text-[8px] uppercase tracking-[0.2em] text-stone-500 font-mono font-semibold">PORTRAITS</span>
              </div>
            </div>

            <p className="text-stone-500 text-2xs leading-relaxed font-light">
              致力于用静谧极简的美学视角，记录和科普猫咪这一温柔生命之美。探秘品种本源，珍存自然光影。
            </p>

            <div className="text-3xs text-stone-550 space-y-1 pt-2 font-mono uppercase tracking-wider">
              <p>EMAIL: contacts@miaoportraits.com</p>
              <p>PHONE: +86 (010) 8888 6426</p>
            </div>
          </div>

          {/* Col 2 Quick links column (3 cols) */}
          <div className="md:col-span-3 space-y-4 md:pl-6">
            <h4 className="text-stone-300 text-2xs uppercase tracking-[0.18em] font-semibold">
              快速导航 / NAVIGATION
            </h4>
            <ul className="space-y-3 text-3xs font-light uppercase tracking-wider">
              <li>
                <a href="#hero" className="text-stone-450 hover:text-white transition-colors duration-200">
                  首 页 / Index
                </a>
              </li>
              <li>
                <a href="#popular" className="text-stone-450 hover:text-white transition-colors duration-200">
                  热门猫咪 / Portraits
                </a>
              </li>
              <li>
                <a href="#breeds" className="text-stone-450 hover:text-white transition-colors duration-200">
                  品种图鉴 / Encyclopedia
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-stone-450 hover:text-white transition-colors duration-200">
                  精选图集 / Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 Interactive feedback form (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="text-stone-300 text-2xs uppercase tracking-[0.18em] font-semibold">
              反馈与订阅 / FEEDBACK
            </h4>
            <p className="text-stone-550 text-2xs leading-relaxed font-light">
              输入您的邮箱，我们将定期向您寄出光影画册简报及最新猫咪考证论述。
            </p>

            <form onSubmit={handleSubmit} className="space-y-2.5">
              <input
                type="email"
                required
                placeholder="您的邮箱地址 (Email)..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs bg-stone-900 border border-stone-850 rounded-xl px-4 py-2.5 text-stone-200 placeholder-stone-600 focus:outline-none focus:border-stone-700 transition-colors"
              />
              <textarea
                required
                rows={2}
                placeholder="您的改版见解或留言..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full text-xs bg-stone-900 border border-stone-850 rounded-xl px-4 py-2.5 text-stone-200 placeholder-stone-600 focus:outline-none focus:border-stone-700 transition-colors resize-none leading-relaxed"
              />
              
              <div className="flex items-center justify-between gap-3 pt-1">
                {showSubResult ? (
                  <span className="text-3xs text-emerald-450 font-normal flex items-center gap-1.5 animate-fade-in">
                    <Check className="w-3.5 h-3.5 rounded-full bg-emerald-900/10 p-0.5 shrink-0" />
                    建议投递成功。十分感谢。
                  </span>
                ) : (
                  <span className="text-[10px] text-stone-600 font-normal font-mono">
                    * PORTRAITS EST. 2026
                  </span>
                )}
                
                <button
                  type="submit"
                  className="px-4.5 py-2 bg-stone-50 hover:bg-stone-200 text-stone-950 font-medium text-2xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-all duration-200 shrink-0 select-none focus:outline-none"
                >
                  <Send className="w-3 h-3" />
                  <span>提交反馈</span>
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Global Bottom Credits */}
        <div className="border-t border-stone-900 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between text-stone-600 text-3xs font-light gap-4 leading-relaxed uppercase tracking-wider">
          <div>
            <p>© 2026 Miau Portraits. All Rights Reserved.</p>
            <p className="mt-0.5 text-stone-700">Adhering to minimal elegance and high visual composition standards.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
