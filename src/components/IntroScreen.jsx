import React, { useState, useEffect } from "react";
import { GREETINGS } from "../data/portfolioData";
import { ArrowRight } from "lucide-react";

export default function IntroScreen({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const handleFinish = () => {
    if (isExiting) return;
    setIsExiting(true);
    try {
      sessionStorage.setItem("portfolio_intro_seen", "true");
    } catch (e) {}
    setTimeout(onComplete, 750);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExiting]);

  useEffect(() => {
    if (isExiting) return;

    if (index < GREETINGS.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 210);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        handleFinish();
      }, 1250);
      return () => clearTimeout(finishTimer);
    }
  }, [index, isExiting]);

  const isFinalName = index === GREETINGS.length - 1;
  const currentGreeting = GREETINGS[index];

  return (
    <div
      onClick={handleFinish}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting
          ? "-translate-y-full opacity-90 scale-[0.98]"
          : "translate-y-0 opacity-100 scale-100"
      }`}
      style={{ background: "#05070D" }}
    >
      {/* Cinematic Luxury Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#EAB308]/12 via-[#00F2FE]/08 to-transparent rounded-full blur-[120px]" />
        {/* Subtle Luxury Concentric Orbit Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-white/[0.04] pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-[#EAB308]/10 pointer-events-none" />
      </div>

      {/* Main Greeting Typography */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center select-none">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Minimalist Luxury Glowing Bead (NO Gemini AI Logo) */}
          <div className="relative flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EAB308] opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#EAB308] shadow-[0_0_12px_#EAB308]" />
          </div>

          <h2
            key={index}
            className={`font-display font-black tracking-tight text-white transition-all duration-200 ${
              isFinalName
                ? "text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FDE047] to-[#00F2FE] drop-shadow-[0_0_30px_rgba(234,179,8,0.3)]"
                : "text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white/95"
            }`}
          >
            {currentGreeting}
          </h2>
        </div>

        {/* Subtitle revealed when final name displays */}
        {isFinalName && (
          <p className="font-mono text-xs sm:text-sm text-[#94A3B8] uppercase tracking-[0.3em] animate-fade-in mt-1">
            Full-Stack &amp; IoT Systems Architect
          </p>
        )}
      </div>

      {/* Luxury Progress Bar at bottom */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-[2px] bg-white/[0.08] rounded-full overflow-hidden z-10">
        <div
          className="h-full bg-gradient-to-r from-[#00F2FE] via-[#EAB308] to-[#FDE047] transition-all duration-200"
          style={{ width: `${((index + 1) / GREETINGS.length) * 100}%` }}
        />
      </div>

      {/* Skip Button */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleFinish();
          }}
          className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-[#64748B] hover:text-[#EAB308] px-4 py-1.5 rounded-full border border-white/5 hover:border-[#EAB308]/30 bg-white/[0.02] transition-all flex items-center gap-1.5 group backdrop-blur-md"
        >
          <span>Skip Intro</span>
          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
