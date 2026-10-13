import React, { useState } from "react";
import { ExternalLink, Trash2, Plus, Image as ImageIcon, Layers, CheckCircle2, ArrowUpRight, Sparkles } from "lucide-react";
import { Editable, TagEditor } from "./Editable";
import { emptyProject } from "../data/portfolioData";

const GithubIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

export default function Projects({ projects, setProjects, editMode, onImageUpload }) {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const categories = ["All", "Full-Stack", "IoT & Systems", "Cloud & DevOps"];

  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === "All") return true;
    return (
      p.category === selectedFilter ||
      p.stack?.some((s) => s.toLowerCase().includes(selectedFilter.toLowerCase()))
    );
  });

  const updateProject = (idx, patch) => {
    setProjects((prev) => prev.map((p, i) => (i === idx ? { ...p, ...patch } : p)));
  };

  return (
    <section id="work" className="py-24 relative">
      <div className="tech-divider mb-16" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#00F2FE] mb-3 flex items-center gap-2.5">
            <span className="w-5 h-[2px] bg-[#00F2FE]" />
            <span>Featured Engineering</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Selected <span className="text-cyan-gold">Bento Works</span>
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#090E1B]/90 p-1.5 rounded-full border border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`font-mono text-xs tracking-wider px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                selectedFilter === cat
                  ? "bg-[#00F2FE] text-[#05070D] font-bold shadow-md shadow-[#00F2FE]/20"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Modern Bento-Grid Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((p, originalIndex) => {
          const realIndex = projects.findIndex((item) => item.title === p.title);
          const i = realIndex !== -1 ? realIndex : originalIndex;

          // Asymmetrical Bento Layout: 1st and 4th items are wide (span 2 cols on lg)
          const isWide = originalIndex % 3 === 0;

          return (
            <div
              key={i}
              className={`tech-card-3d p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group ${
                isWide ? "lg:col-span-2" : "lg:col-span-1"
              }`}
            >
              {/* Corner Watermark Number */}
              <div className="absolute top-4 right-5 font-display font-black text-6xl text-white/[0.03] select-none pointer-events-none">
                {String(originalIndex + 1).padStart(2, "0")}
              </div>

              {/* Admin Delete Action */}
              {editMode && (
                <div className="absolute top-4 right-4 z-30">
                  <button
                    onClick={() => setProjects((prev) => prev.filter((_, idx) => idx !== i))}
                    className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 flex items-center justify-center transition-all cursor-pointer"
                    title="Delete project"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}

              {/* Card Content Top */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="font-mono text-xs tracking-widest text-[#00F2FE] font-bold">
                    {String(originalIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="w-4 h-[1px] bg-white/20" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/5">
                    <Editable
                      value={p.category || "Full-Stack"}
                      onChange={(v) => updateProject(i, { category: v })}
                      editMode={editMode}
                    />
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-[#00F2FE] transition-colors mb-1.5">
                  <Editable
                    value={p.title}
                    onChange={(v) => updateProject(i, { title: v })}
                    editMode={editMode}
                  />
                </h3>

                <div className="font-mono text-xs uppercase tracking-wider text-[#EAB308] mb-3">
                  <Editable
                    value={p.subtitle}
                    onChange={(v) => updateProject(i, { subtitle: v })}
                    editMode={editMode}
                  />
                </div>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-5 font-normal">
                  <Editable
                    value={p.desc}
                    onChange={(v) => updateProject(i, { desc: v })}
                    editMode={editMode}
                    tag="span"
                    placeholder="Project description..."
                  />
                </p>

                {/* Highlights List if wide card */}
                {isWide && p.highlights && p.highlights.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    {p.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs text-[#E2E8F0]">
                        <CheckCircle2 size={12} className="text-[#10B981] shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Area: Image & Stack */}
              <div>
                {/* Optional Project Visual */}
                {p.image ? (
                  <div className="mb-5 rounded-xl overflow-hidden border border-white/10 h-40 bg-[#070A14]">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="mb-5 p-4 rounded-xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#00F2FE]/10 flex items-center justify-center text-[#00F2FE]">
                        <Layers size={16} />
                      </div>
                      <div className="text-left">
                        <span className="text-[11px] font-mono text-white block font-medium">Architecture Verified</span>
                        <span className="text-[9px] font-mono text-[#64748B]">CI/CD Pipeline Ready</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#10B981]">● Production</span>
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div className="mb-5">
                  <TagEditor
                    items={p.stack || []}
                    onChange={(items) => updateProject(i, { stack: items })}
                    editMode={editMode}
                  />
                </div>

                {/* Links / Action Bar */}
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/[0.06]">
                  {editMode ? (
                    <div className="flex flex-col gap-2 w-full">
                      <input
                        type="text"
                        value={p.live || ""}
                        onChange={(e) => updateProject(i, { live: e.target.value })}
                        placeholder="Live URL"
                        className="font-mono text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white outline-none focus:border-[#00F2FE]"
                      />
                      <input
                        type="text"
                        value={p.source || ""}
                        onChange={(e) => updateProject(i, { source: e.target.value })}
                        placeholder="Source Code URL"
                        className="font-mono text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white outline-none focus:border-[#00F2FE]"
                      />
                    </div>
                  ) : (
                    <>
                      {p.live && p.live !== "#" && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary-tech font-mono text-xs uppercase tracking-wider px-4 py-2 flex items-center gap-1.5"
                        >
                          <span>Live Demo</span>
                          <ExternalLink size={12} />
                        </a>
                      )}

                      {p.source && p.source !== "#" && (
                        <a
                          href={p.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ghost-tech font-mono text-xs uppercase tracking-wider px-4 py-2 flex items-center gap-1.5"
                        >
                          <GithubIcon size={13} />
                          <span>Source</span>
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Project Button (in Edit Mode) */}
        {editMode && (
          <button
            onClick={() => setProjects((prev) => [...prev, emptyProject()])}
            className="w-full py-12 rounded-2xl border-2 border-dashed border-white/10 hover:border-[#00F2FE]/40 bg-white/[0.02] flex flex-col items-center justify-center gap-2 text-[#94A3B8] hover:text-[#00F2FE] transition-all cursor-pointer lg:col-span-3"
          >
            <Plus size={20} />
            <span className="font-mono text-xs uppercase tracking-widest font-semibold">
              Add New Project
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
