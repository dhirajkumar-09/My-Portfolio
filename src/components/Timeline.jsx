import React from "react";
import { Calendar, Plus, Trash2 } from "lucide-react";
import { Editable } from "./Editable";
import { emptyLog } from "../data/portfolioData";

export default function Timeline({
  activityLogs,
  setActivityLogs,
  editMode,
}) {
  const updateLog = (idx, patch) => {
    setActivityLogs((prev) => prev.map((l, i) => (i === idx ? { ...l, ...patch } : l)));
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="activity" className="py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#F3D082] mb-3 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#F3D082]" />
            <span>Trajectory &amp; Impact</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            Activity &amp; Milestones
          </h2>
        </div>
        <p className="font-mono text-xs text-[#94A3B8] max-w-sm">
          A continuous timeline documenting project releases, technical achievements, and architectural breakthroughs.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 md:pl-10 before:absolute before:inset-0 before:left-[11px] md:before:left-[15px] before:w-[2px] before:bg-gradient-to-b before:from-[#D4AF6A] before:via-white/10 before:to-transparent">
        <div className="space-y-10">
          {activityLogs.map((log, i) => (
            <div key={i} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[23px] md:-left-[33px] top-4 w-4 h-4 rounded-full bg-[#05070A] border-2 border-[#D4AF6A] shadow-[0_0_12px_rgba(212,175,106,0.6)] group-hover:scale-125 group-hover:bg-[#F3D082] transition-all" />

              {/* Card */}
              <div
                onMouseMove={handleMouseMove}
                className="spotlight-card p-6 sm:p-7 relative"
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

                <div className="flex items-center gap-2 font-mono text-xs text-[#F3D082] mb-2">
                  <Calendar size={13} />
                  <Editable
                    value={log.date}
                    onChange={(v) => updateLog(i, { date: v })}
                    editMode={editMode}
                    placeholder="e.g. October 2026"
                  />
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-[#F3D082] transition-colors mb-3">
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
          ))}
        </div>

        {/* Add Entry in Edit Mode */}
        {editMode && (
          <div className="pt-8">
            <button
              type="button"
              onClick={() => setActivityLogs((prev) => [...prev, emptyLog()])}
              className="py-4 px-6 rounded-xl border border-dashed border-[#D4AF6A]/50 bg-[#D4AF6A]/5 hover:bg-[#D4AF6A]/10 text-[#F3D082] font-mono text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
            >
              <Plus size={16} />
              <span>Add New Timeline Milestone</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
