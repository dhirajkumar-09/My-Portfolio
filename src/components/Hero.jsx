import React from "react";
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
  return (
    <section id="top" className="min-h-[92vh] pt-32 pb-16 flex flex-col justify-center relative">
      {/* Background ambient center blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] bg-gradient-to-tr from-[#D4AF6A]/10 via-[#38BDF8]/5 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
        {/* Left Column: Bio & Call to Actions */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
            </span>
            <span className="font-mono text-xs text-[#E2E8F0] tracking-wide">
              <Editable
                value={profile.status || "Available for Opportunities"}
                onChange={(v) => setProfile((p) => ({ ...p, status: v }))}
                editMode={editMode}
              />
            </span>
          </div>

          {/* Role Eyebrow */}
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#F3D082] mb-4 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#F3D082]" />
            <Editable
              value={profile.role}
              onChange={(v) => setProfile((p) => ({ ...p, role: v }))}
              editMode={editMode}
            />
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] tracking-tight text-white mb-6">
            <Editable
              value={profile.headline}
              onChange={(v) => setProfile((p) => ({ ...p, headline: v }))}
              editMode={editMode}
              className="block"
            />
            <span className="text-shimmer block">
              <Editable
                value={profile.headlineAccent}
                onChange={(v) => setProfile((p) => ({ ...p, headlineAccent: v }))}
                editMode={editMode}
              />
            </span>
          </h1>

          {/* Subtext Paragraph */}
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-xl font-normal mb-10">
            <Editable
              value={profile.intro}
              onChange={(v) => setProfile((p) => ({ ...p, intro: v }))}
              editMode={editMode}
              tag="span"
            />
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => onNavigate("work")}
              className="btn-gold font-mono text-xs uppercase tracking-widest px-7 py-3.5 rounded-full flex items-center justify-center gap-2.5 cursor-pointer w-full sm:w-auto"
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

            {/* Social Icons Quick Access */}
            <div className="flex items-center gap-2.5 ml-0 sm:ml-2 pt-2 sm:pt-0">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[#94A3B8] hover:text-[#F3D082] hover:border-[#D4AF6A]/50 transition-all"
              >
                <GithubIcon size={18} />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[#94A3B8] hover:text-[#F3D082] hover:border-[#D4AF6A]/50 transition-all"
              >
                <LinkedinIcon size={17} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Terminal Dashboard */}
        <div className="lg:col-span-5 w-full">
          <InteractiveTerminal />
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 z-10">
        {profile.stats.map((s, idx) => (
          <div
            key={idx}
            className="flex flex-col p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-[#D4AF6A]/30 transition-all group"
          >
            <div className="font-display font-bold text-3xl sm:text-4xl text-[#F3D082] group-hover:scale-105 transition-transform duration-300">
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
            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#94A3B8] mt-1.5">
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
          </div>
        ))}
      </div>
    </section>
  );
}
