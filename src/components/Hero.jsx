import React, { useEffect, useRef } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import InteractiveTerminal from "./InteractiveTerminal";
import { Editable } from "./Editable";

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Hero({ profile, setProfile, editMode, onNavigate }) {
  const terminalRef = useRef(null);

  // Subtle 3D tilt on the terminal panel following mouse — CSS vars, no heavy computation
  useEffect(() => {
    const el = terminalRef.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const rx = -dy * 8;   // Max ±8 deg tilt
      const ry =  dx * 8;

      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(4px)`;
    };

    const handleLeave = () => {
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
    };

    // Attach to parent section
    const section = el.closest('section');
    section?.addEventListener('mousemove', handleMove, { passive: true });
    section?.addEventListener('mouseleave', handleLeave);
    return () => {
      section?.removeEventListener('mousemove', handleMove);
      section?.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <section id="top" className="min-h-[92vh] pt-32 pb-16 flex flex-col justify-center relative overflow-hidden">
      {/* Hero background — layered depth */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[60vw] max-w-[900px] max-h-[600px] bg-gradient-to-br from-[#C9A84C]/08 via-[#22D3EE]/04 to-transparent rounded-full blur-[100px]" />
        {/* Top-right accent */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-gradient-to-bl from-[#8B5CF6]/05 to-transparent rounded-full blur-[80px]" />

        {/* Floating CSS-only particles in hero */}
        <div className="particles-container">
          <div className="particle particle-gold p1" style={{ bottom: '10%' }} />
          <div className="particle particle-cyan  p2" style={{ bottom: '20%' }} />
          <div className="particle particle-gold p3" style={{ bottom: '5%'  }} />
          <div className="particle particle-gold p4" style={{ bottom: '15%' }} />
          <div className="particle particle-cyan  p5" style={{ bottom: '8%'  }} />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* ── Left Column: Bio & CTAs ── */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">

          {/* Status Badge — premium glass */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl mb-7 animate-fade-in-up shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <span className="status-dot" />
            <span className="font-mono text-xs text-[#CBD5E1] tracking-wide">
              <Editable
                value={profile.status || "Available for Opportunities"}
                onChange={(v) => setProfile((p) => ({ ...p, status: v }))}
                editMode={editMode}
              />
            </span>
          </div>

          {/* Role Eyebrow — with animated line */}
          <div className="section-eyebrow font-mono text-xs uppercase tracking-[0.3em] text-[#C9A84C] mb-5 animate-fade-in-up delay-100">
            <span className="section-eyebrow-line" />
            <Editable
              value={profile.role}
              onChange={(v) => setProfile((p) => ({ ...p, role: v }))}
              editMode={editMode}
            />
          </div>

          {/* Main Headline — 3D entrance */}
          <h1 className="hero-title-3d font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[70px] leading-[1.05] tracking-tight text-white mb-6">
            <Editable
              value={profile.headline}
              onChange={(v) => setProfile((p) => ({ ...p, headline: v }))}
              editMode={editMode}
              className="block"
            />
            <span className="text-shimmer block mt-1">
              <Editable
                value={profile.headlineAccent}
                onChange={(v) => setProfile((p) => ({ ...p, headlineAccent: v }))}
                editMode={editMode}
              />
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-xl font-normal mb-10 animate-fade-in-up delay-300">
            <Editable
              value={profile.intro}
              onChange={(v) => setProfile((p) => ({ ...p, intro: v }))}
              editMode={editMode}
              tag="span"
            />
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto animate-fade-in-up delay-400">
            <button
              onClick={() => onNavigate("work")}
              className="btn-gold btn-glow-pulse font-mono text-xs uppercase tracking-widest px-7 py-3.5 rounded-full flex items-center justify-center gap-2.5 cursor-pointer w-full sm:w-auto"
            >
              <span>Explore Work</span>
              <ArrowUpRight size={15} />
            </button>

            <button
              onClick={() => onNavigate("contact")}
              className="btn-ghost font-mono text-xs uppercase tracking-widest px-7 py-3.5 rounded-full flex items-center justify-center gap-2.5 cursor-pointer w-full sm:w-auto"
            >
              <span>Get In Touch</span>
              <Mail size={15} />
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 ml-0 sm:ml-2 pt-2 sm:pt-0">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="w-11 h-11 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-[#94A3B8] hover:text-[#F0C96E] hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/08 hover:shadow-[0_0_20px_rgba(200,160,70,0.2)] transition-all duration-300"
              >
                <GithubIcon size={18} />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="w-11 h-11 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-[#94A3B8] hover:text-[#F0C96E] hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/08 hover:shadow-[0_0_20px_rgba(200,160,70,0.2)] transition-all duration-300"
              >
                <LinkedinIcon size={17} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Right Column: Terminal with 3D tilt ── */}
        <div className="lg:col-span-5 w-full animate-fade-in-up delay-500">
          <div className="terminal-wrapper">
            <div
              ref={terminalRef}
              className="terminal-3d"
              style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)', willChange: 'transform' }}
            >
              <InteractiveTerminal />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar — 3D hover cards */}
      <div className="mt-20 pt-10 relative z-10">
        <div className="section-line mb-10" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {profile.stats.map((s, idx) => (
            <div
              key={idx}
              className="stat-card spotlight-card group p-5 sm:p-6 rounded-2xl skill-card-3d cursor-default"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="font-display font-black text-3xl sm:text-4xl text-[#F0C96E] mb-1 group-hover:scale-110 transition-transform duration-300 origin-left">
                <Editable
                  value={s.v}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      stats: p.stats.map((item, i) => (i === idx ? { ...item, v } : item)),
                    }))
                  }
                  editMode={editMode}
                />
              </div>
              <div className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#475569] group-hover:text-[#94A3B8] transition-colors">
                <Editable
                  value={s.k}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      stats: p.stats.map((item, i) => (i === idx ? { ...item, k: v } : item)),
                    }))
                  }
                  editMode={editMode}
                />
              </div>
              {/* Bottom accent line */}
              <div className="mt-4 h-px bg-gradient-to-r from-[#C9A84C]/0 via-[#C9A84C]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
