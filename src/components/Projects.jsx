import React, { useState } from "react";
import { ExternalLink, Trash2, Plus, Image as ImageIcon, Layers, CheckCircle2 } from "lucide-react";
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
    return p.category === selectedFilter || p.stack?.some(s => s.toLowerCase().includes(selectedFilter.toLowerCase()));
  });

  const updateProject = (idx, patch) => {
    setProjects((prev) => prev.map((p, i) => (i === idx ? { ...p, ...patch } : p)));
  };

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="work" className="py-28 relative">
      {/* Section divider */}
      <div className="section-line mb-0 absolute top-0 left-0 right-0" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <div className="section-eyebrow font-mono text-xs uppercase tracking-[0.25em] text-[#C9A84C] mb-4">
            <span className="section-eyebrow-line" />
            <span>Featured Engineering</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Selected{" "}
            <span className="text-gradient-gold">Projects</span>
          </h2>
        </div>

        {/* Filter Tabs — premium glass */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white/[0.02] p-1.5 rounded-full border border-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`font-mono text-xs tracking-wider px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                selectedFilter === cat
                  ? "bg-[#C9A84C] text-[#030508] font-bold shadow-[0_2px_12px_rgba(200,160,70,0.4)]"
                  : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 gap-10 md:gap-14">
        {filteredProjects.map((p, originalIndex) => {
          const realIndex = projects.findIndex((item) => item.title === p.title);
          const i = realIndex !== -1 ? realIndex : originalIndex;

          return (
            <div
              key={i}
              onMouseMove={handleCardMouseMove}
              className="spotlight-card group p-7 sm:p-10 md:p-12 relative overflow-hidden"
            >
              {/* Project number watermark */}
              <div className="absolute top-6 right-8 font-display font-black text-[100px] leading-none text-white/[0.02] pointer-events-none select-none z-0">
                {String(originalIndex + 1).padStart(2, "0")}
              </div>

              {/* Admin Delete */}
              {editMode && (
                <div className="absolute top-6 right-6 z-30">
                  <button
                    onClick={() => setProjects((prev) => prev.filter((_, idx) => idx !== i))}
                    className="w-9 h-9 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 flex items-center justify-center transition-all cursor-pointer"
                    title="Delete project"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
                {/* Left: Project Details */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-mono text-2xl font-black text-[#C9A84C]/30 tabular-nums select-none">
                      {String(originalIndex + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 h-px bg-white/08" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#475569] px-3 py-1 rounded-full border border-white/06 bg-white/[0.02]">
                      <Editable
                        value={p.category || "Full-Stack"}
                        onChange={(v) => updateProject(i, { category: v })}
                        editMode={editMode}
                      />
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white group-hover:text-[#F0C96E] transition-colors duration-300 mb-2 leading-tight">
                    <Editable
                      value={p.title}
                      onChange={(v) => updateProject(i, { title: v })}
                      editMode={editMode}
                    />
                  </h3>

                  <div className="font-mono text-xs uppercase tracking-wider text-[#475569] mb-6">
                    <Editable
                      value={p.subtitle}
                      onChange={(v) => updateProject(i, { subtitle: v })}
                      editMode={editMode}
                    />
                  </div>

                  <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-6 font-normal">
                    <Editable
                      value={p.desc}
                      onChange={(v) => updateProject(i, { desc: v })}
                      editMode={editMode}
                      tag="span"
                      placeholder="Project description..."
                    />
                  </p>

                  {/* Highlights */}
                  {p.highlights && p.highlights.length > 0 && (
                    <div className="space-y-2.5 mb-7 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      {p.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs text-[#CBD5E1]">
                          <CheckCircle2 size={14} className="text-[#10B981] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div className="mb-8">
                    <TagEditor
                      items={p.stack || []}
                      onChange={(items) => updateProject(i, { stack: items })}
                      editMode={editMode}
                    />
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap items-center gap-4 mt-auto">
                    {editMode ? (
                      <div className="flex flex-col gap-2 w-full">
                        <input
                          type="text"
                          value={p.live || ""}
                          onChange={(e) => updateProject(i, { live: e.target.value })}
                          placeholder="Live URL (e.g. https://...)"
                          className="premium-input font-mono text-xs rounded-xl px-4 py-2.5 text-white w-full"
                        />
                        <input
                          type="text"
                          value={p.source || ""}
                          onChange={(e) => updateProject(i, { source: e.target.value })}
                          placeholder="Source GitHub URL"
                          className="premium-input font-mono text-xs rounded-xl px-4 py-2.5 text-white w-full"
                        />
                      </div>
                    ) : (
                      <>
                        {p.live && p.live !== "#" && (
                          <a
                            href={p.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-gold font-mono text-xs uppercase tracking-wider px-6 py-2.5 rounded-full flex items-center gap-2"
                          >
                            <span>Live Demo</span>
                            <ExternalLink size={13} />
                          </a>
                        )}
                        {p.source && p.source !== "#" && (
                          <a
                            href={p.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ghost font-mono text-xs uppercase tracking-wider px-6 py-2.5 rounded-full flex items-center gap-2"
                          >
                            <GithubIcon size={14} />
                            <span>Source Code</span>
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Right: Image Panel with 3D depth */}
                <div className="lg:col-span-5 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[380px] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#060A13] flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)] project-image-wrapper group/preview">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover opacity-85 group-hover/preview:opacity-100 transition-all duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full p-6 flex flex-col justify-between select-none bg-gradient-to-br from-white/[0.03] to-transparent">
                      {/* Mock browser bar */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                        </div>
                        <div className="flex-1 mx-4 h-5 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center px-2">
                          <div className="w-2 h-2 rounded-full bg-[#10B981]/60 mr-1.5" />
                          <div className="h-1.5 w-16 rounded bg-white/10" />
                        </div>
                        <span className="font-mono text-[9px] text-[#475569] uppercase tracking-wider">
                          {p.category || "Preview"}
                        </span>
                      </div>

                      <div className="my-auto text-center space-y-3">
                        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#C9A84C]/15 to-[#C9A84C]/05 border border-[#C9A84C]/20 flex items-center justify-center text-[#F0C96E] group-hover/preview:scale-110 transition-transform duration-500">
                          <Layers size={26} />
                        </div>
                        <h4 className="font-display font-semibold text-lg text-white">{p.title}</h4>
                        <p className="font-mono text-xs text-[#475569]">
                          {p.stack?.[0]} · {p.stack?.[1]}
                        </p>
                      </div>

                      {/* Status row */}
                      <div className="flex justify-between items-center text-[10px] font-mono text-[#475569] pt-2 border-t border-white/[0.04]">
                        <span>Architecture Verified</span>
                        <span className="flex items-center gap-1 text-[#10B981]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                          Production Ready
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Edit mode upload overlay */}
                  {editMode && (
                    <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center gap-4 p-6 z-20">
                      <label className="btn-ghost px-5 py-2.5 rounded-full flex items-center gap-2 cursor-pointer text-xs font-mono uppercase tracking-wider">
                        <ImageIcon size={15} />
                        <span>Upload Visual</span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => onImageUpload(i, e)} />
                      </label>
                      {p.image && (
                        <button
                          type="button"
                          onClick={() => updateProject(i, { image: null })}
                          className="text-xs text-red-400 hover:text-red-300 font-mono"
                        >
                          Remove Image
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Project Button */}
        {editMode && (
          <button
            onClick={() => setProjects((prev) => [...prev, emptyProject()])}
            className="w-full py-14 rounded-2xl border-2 border-dashed border-white/[0.08] hover:border-[#C9A84C]/40 bg-white/[0.01] hover:bg-[#C9A84C]/[0.03] flex flex-col items-center justify-center gap-3 text-[#94A3B8] hover:text-[#F0C96E] transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center">
              <Plus size={20} />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest font-semibold">Add New Project</span>
          </button>
        )}
      </div>
    </section>
  );
}
