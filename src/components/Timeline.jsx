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

  return (
    <section id="activity" className="py-24 relative">
      <div className="tech-divider mb-16" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#00F2FE] mb-3 flex items-center gap-2.5">
            <span className="w-5 h-[2px] bg-[#00F2FE]" />
            <span>Trajectory &amp; Impact</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Activity &amp; <span className="text-cyan-gold">Milestones</span>
          </h2>
        </div>
        <p className="font-mono text-xs text-[#94A3B8] max-w-sm leading-relaxed">
          Continuous record of technical releases, architectural breakthroughs, and engineering milestones.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 md:pl-10 before:absolute before:inset-0 before:left-[11px] md:before:left-[15px] before:w-[2px] before:bg-gradient-to-b before:from-[#00F2FE] before:via-[#00F2FE]/20 before:to-transparent">
        <div className="space-y-8">
          {activityLogs.map((log, i) => (
            <div key={i} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[23px] md:-left-[33px] top-4 w-4 h-4 rounded-full bg-[#05070D] border-2 border-[#00F2FE] shadow-[0_0_10px_rgba(0,242,254,0.6)] group-hover:scale-125 group-hover:bg-[#00F2FE] transition-all" />

              {/* Card */}
              <div className="tech-card-3d p-6 sm:p-7 relative">
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

                <div className="flex items-center gap-2 font-mono text-xs text-[#00F2FE] mb-2">
                  <Calendar size={13} />
                  <Editable
                    value={log.date}
                    onChange={(v) => updateLog(i, { date: v })}
                    editMode={editMode}
                    placeholder="e.g. October 2026"
                  />
                </div>

                <h3 className="font-display font-bold text-xl text-white group-hover:text-[#00F2FE] transition-colors mb-2.5">
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
              className="py-4 px-6 rounded-xl border border-dashed border-[#00F2FE]/40 bg-[#00F2FE]/05 hover:bg-[#00F2FE]/10 text-[#00F2FE] font-mono text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
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
