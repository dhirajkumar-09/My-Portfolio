import React, { useState, useEffect } from "react";
import { GREETINGS } from "../data/portfolioData";
import { Sparkles, ArrowRight } from "lucide-react";

export default function IntroScreen({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleFinish = () => {
    if (isExiting) return;
    setIsExiting(true);
    try { sessionStorage.setItem("portfolio_intro_seen", "true"); } catch (e) {}
    setTimeout(onComplete, 800);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") handleFinish();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExiting, onComplete]);

  useEffect(() => {
    if (isExiting) return;
    if (index < GREETINGS.length - 1) {
      const timer = setTimeout(() => setIndex((prev) => prev + 1), 190);
      return () => clearTimeout(timer);
    } else {
      const t1 = setTimeout(() => setShowHint(true), 400);
      const t2 = setTimeout(handleFinish, 1400);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [index, isExiting]);

  const isFinalName = index === GREETINGS.length - 1;

  return (
    <div
      onClick={handleFinish}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center cursor-pointer transition-all duration-800 ${
        isExiting
          ? "-translate-y-full opacity-0 scale-[0.97]"
          : "translate-y-0 opacity-100 scale-100"
      }`}
      style={{
        background: '#030508',
        transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
        transitionDuration: '0.8s',
      }}
    >
      {/* Intro background — deep space glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,160,70,0.12)_0%,_transparent_65%)]" />
        {/* Animated ring */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#C9A84C]/10"
          style={{ animation: 'spin 20s linear infinite' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#22D3EE]/05"
          style={{ animation: 'spin 15s linear infinite reverse' }}
        />
      </div>

      {/* Greeting Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center select-none">
        <div
          key={index}
          className="flex items-center gap-4 md:gap-6"
          style={{ animation: 'scale-in 0.25s cubic-bezier(0.16,1,0.3,1) both' }}
        >
          {!isFinalName ? (
            <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#F0C96E] animate-ping flex-shrink-0" />
          ) : (
            <Sparkles className="w-7 h-7 md:w-10 md:h-10 text-[#F0C96E] animate-spin flex-shrink-0" style={{ animationDuration: '3s' }} />
          )}

          <h2
            className={`font-display font-black tracking-tighter text-white transition-all duration-300 ${
              isFinalName
                ? "text-shimmer text-4xl sm:text-6xl md:text-8xl"
                : "text-3xl sm:text-5xl md:text-7xl opacity-90"
            }`}
          >
            {GREETINGS[index]}
          </h2>
        </div>

        {/* Subtitle on final frame */}
        {isFinalName && (
          <p
            className="font-mono text-xs sm:text-sm text-[#475569] uppercase tracking-[0.3em] mt-2"
            style={{ animation: 'fade-in 0.5s ease both' }}
          >
            Portfolio Loading...
          </p>
        )}
      </div>

      {/* Skip Hint */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-10 transition-all duration-500 ${showHint ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <button
          onClick={(e) => { e.stopPropagation(); handleFinish(); }}
          className="font-mono text-xs tracking-widest uppercase text-[#475569] hover:text-[#F0C96E] border border-white/08 hover:border-[#C9A84C]/40 bg-white/[0.03] hover:bg-[#C9A84C]/08 px-5 py-2.5 rounded-full transition-all flex items-center gap-2 group backdrop-blur-md"
        >
          <span>Skip Intro</span>
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
