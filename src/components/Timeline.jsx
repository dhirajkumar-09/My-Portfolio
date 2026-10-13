import React from "react";
import { Calendar, Plus, Trash2, Zap } from "lucide-react";
import { Editable } from "./Editable";
import { emptyLog } from "../data/portfolioData";

export default function Timeline({ activityLogs, setActivityLogs, editMode }) {
  const updateLog = (idx, patch) => {
    setActivityLogs((prev) => prev.map((l, i) => (i === idx ? { ...l, ...patch } : l)));
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="activity" className="py-28 relative">
      <div className="section-line absolute top-0 left-0 right-0" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="section-eyebrow font-mono text-xs uppercase tracking-[0.25em] text-[#C9A84C] mb-4">
            <span className="section-eyebrow-line" />
            <span>Trajectory &amp; Impact</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Activity &amp;{" "}
            <span className="text-gradient-gold">Milestones</span>
          </h2>
        </div>
        <p className="font-mono text-xs text-[#94A3B8] max-w-sm leading-relaxed border-l-2 border-[#C9A84C]/30 pl-4">
          A continuous timeline documenting project releases, technical achievements, and architectural breakthroughs.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-7 md:pl-12">
        {/* Animated timeline spine */}
        <div className="absolute left-[10px] md:left-[15px] top-2 bottom-2 w-px">
          <div className="h-full w-full bg-gradient-to-b from-[#C9A84C] via-[#C9A84C]/20 to-transparent" />
          {/* Scanning light */}
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: '30%',
              background: 'linear-gradient(180deg, transparent 0%, rgba(200,160,70,0.6) 50%, transparent 100%)',
              animation: 'particle-rise 4s ease-in-out infinite',
            }}
          />
        </div>

        <div className="space-y-8">
          {activityLogs.map((log, i) => (
            <div key={i} className="relative group">
              {/* Timeline Dot — premium glow */}
              <div className="absolute -left-[27px] md:-left-[36px] top-6">
                <div className="w-5 h-5 rounded-full bg-[#030508] border-2 border-[#C9A84C] timeline-dot-glow group-hover:bg-[#F0C96E] group-hover:scale-125 transition-all duration-300 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] group-hover:bg-[#030508] transition-colors" />
                </div>
              </div>

              {/* Card */}
              <div
                onMouseMove={handleMouseMove}
                className="spotlight-card group-hover:translate-x-2 p-6 sm:p-8 relative transition-transform duration-300"
              >
                {editMode && (
                  <button
                    type="button"
                    onClick={() => setActivityLogs((prev) => prev.filter((_, idx) => idx !== i))}
                    className="absolute top-4 right-4 text-red-400 hover:text-red-300 p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all z-20 cursor-pointer"
                    title="Delete milestone"
                  >
                    <Trash2 size={14} />
                  </button>
                )}

                <div className="spotlight-content">
                  <div className="flex items-center gap-2.5 font-mono text-xs text-[#C9A84C] mb-3">
                    <Calendar size={12} />
                    <Editable
                      value={log.date}
                      onChange={(v) => updateLog(i, { date: v })}
                      editMode={editMode}
                      placeholder="e.g. October 2026"
                    />
                    {/* Milestone badge */}
                    <span className="ml-auto flex items-center gap-1 text-[10px] text-[#475569] bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded-full">
                      <Zap size={10} className="text-[#F59E0B]" />
                      Milestone
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-[#F0C96E] transition-colors duration-300 mb-3">
                    <Editable
                      value={log.title}
                      onChange={(v) => updateLog(i, { title: v })}
                      editMode={editMode}
                      placeholder="Milestone title"
                    />
                  </h3>

                  <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-normal">
                    <Editable
                      value={log.desc}
                      onChange={(v) => updateLog(i, { desc: v })}
                      editMode={editMode}
                      tag="span"
                      placeholder="Describe what was accomplished..."
                    />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Entry */}
        {editMode && (
          <div className="pt-8 pl-0">
            <button
              type="button"
              onClick={() => setActivityLogs((prev) => [...prev, emptyLog()])}
              className="py-3.5 px-6 rounded-xl border border-dashed border-[#C9A84C]/40 bg-[#C9A84C]/05 hover:bg-[#C9A84C]/10 text-[#F0C96E] font-mono text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
            >
              <Plus size={15} />
              <span>Add New Timeline Milestone</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
