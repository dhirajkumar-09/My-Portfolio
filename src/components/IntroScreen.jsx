import React, { useState, useEffect } from "react";
import { GREETINGS } from "../data/portfolioData";
import { Sparkles, ArrowRight } from "lucide-react";

export default function IntroScreen({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const handleFinish = () => {
    if (isExiting) return;
    setIsExiting(true);
    try {
      sessionStorage.setItem("portfolio_intro_seen", "true");
    } catch (e) {}
    setTimeout(onComplete, 700);
  };

  useEffect(() => {
    // Allow keyboard skip with Escape or Space
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExiting, onComplete]);

  useEffect(() => {
    if (isExiting) return;

    if (index < GREETINGS.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 190);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        handleFinish();
      }, 1100);
      return () => clearTimeout(finishTimer);
    }
  }, [index, isExiting, onComplete]);

  const isFinalName = index === GREETINGS.length - 1;

  return (
    <div
      onClick={handleFinish}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#05070A] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting
          ? "-translate-y-full opacity-90 scale-[0.98]"
          : "translate-y-0 opacity-100 scale-100"
      }`}
    >
      {/* Background glow during intro */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,106,0.15)_0%,_transparent_60%)] pointer-events-none" />

      {/* Greeting Content */}
      <div className="relative z-10 flex items-center gap-3 md:gap-5 px-6 text-center select-none">
        {!isFinalName ? (
          <span className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-[#F3D082] animate-ping" />
        ) : (
          <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-[#F3D082] animate-bounce" />
        )}

        <h2
          className={`font-display font-bold tracking-tight text-white text-3xl sm:text-5xl md:text-7xl transition-all duration-200 ${
            isFinalName
              ? "text-shimmer scale-105"
              : "opacity-90"
          }`}
        >
          {GREETINGS[index]}
        </h2>
      </div>

      {/* Skip button & helper prompt */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleFinish();
          }}
          className="font-mono text-xs tracking-widest uppercase text-[#94A3B8] hover:text-[#F3D082] border border-white/10 hover:border-[#D4AF6A]/50 bg-white/5 hover:bg-[#D4AF6A]/10 px-4 py-2 rounded-full transition-all flex items-center gap-2 group backdrop-blur-md"
        >
          <span>Skip Intro</span>
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
