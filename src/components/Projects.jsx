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
            Selected <span className="text-cyan-gold">Projects</span>
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

      {/* Projects List */}
      <div className="grid grid-cols-1 gap-10 md:gap-12">
        {filteredProjects.map((p, originalIndex) => {
          const realIndex = projects.findIndex((item) => item.title === p.title);
          const i = realIndex !== -1 ? realIndex : originalIndex;

          return (
            <div
              key={i}
              className="tech-card-3d p-6 sm:p-8 md:p-10 relative overflow-hidden"
            >
              {/* Watermark project index */}
              <div className="absolute top-4 right-6 font-display font-black text-7xl sm:text-8xl text-white/[0.03] select-none pointer-events-none">
                {String(originalIndex + 1).padStart(2, "0")}
              </div>

              {/* Admin Delete Action */}
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

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                {/* Left Col: Details */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-sm tracking-widest text-[#00F2FE] font-bold">
                      {String(originalIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="w-6 h-[1px] bg-white/20" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/5">
                      <Editable
                        value={p.category || "Full-Stack"}
                        onChange={(v) => updateProject(i, { category: v })}
                        editMode={editMode}
                      />
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white hover:text-[#00F2FE] transition-colors mb-2">
                    <Editable
                      value={p.title}
                      onChange={(v) => updateProject(i, { title: v })}
                      editMode={editMode}
                    />
                  </h3>

                  <div className="font-mono text-xs uppercase tracking-wider text-[#EAB308] mb-4">
                    <Editable
                      value={p.subtitle}
                      onChange={(v) => updateProject(i, { subtitle: v })}
                      editMode={editMode}
                    />
                  </div>

                  <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-5 font-normal">
                    <Editable
                      value={p.desc}
                      onChange={(v) => updateProject(i, { desc: v })}
                      editMode={editMode}
                      tag="span"
                      placeholder="Project description..."
                    />
                  </p>

                  {/* Highlights Bullet List */}
                  {p.highlights && p.highlights.length > 0 && (
                    <div className="space-y-2 mb-6 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      {p.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2.5 text-xs text-[#E2E8F0]">
                          <CheckCircle2 size={13} className="text-[#10B981] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="mb-7">
                    <TagEditor
                      items={p.stack || []}
                      onChange={(items) => updateProject(i, { stack: items })}
                      editMode={editMode}
                    />
                  </div>

                  {/* Links / Action Bar */}
                  <div className="flex flex-wrap items-center gap-3.5 mt-auto">
                    {editMode ? (
                      <div className="flex flex-col gap-2 w-full">
                        <input
                          type="text"
                          value={p.live || ""}
                          onChange={(e) => updateProject(i, { live: e.target.value })}
                          placeholder="Live URL (e.g. https://...)"
                          className="font-mono text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#00F2FE]"
                        />
                        <input
                          type="text"
                          value={p.source || ""}
                          onChange={(e) => updateProject(i, { source: e.target.value })}
                          placeholder="Source GitHub URL"
                          className="font-mono text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#00F2FE]"
                        />
                      </div>
                    ) : (
                      <>
                        {p.live && p.live !== "#" && (
                          <a
                            href={p.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary-tech font-mono text-xs uppercase tracking-wider px-5 py-2.5 flex items-center gap-2"
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
                            className="btn-ghost-tech font-mono text-xs uppercase tracking-wider px-5 py-2.5 flex items-center gap-2"
                          >
                            <GithubIcon size={14} />
                            <span>Source Code</span>
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Right Col: Image / Architecture Preview */}
                <div className="lg:col-span-5 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[340px] rounded-2xl overflow-hidden border border-white/10 bg-[#070A14] flex items-center justify-center p-3 shadow-2xl">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover rounded-xl opacity-90 hover:opacity-100 transition-opacity duration-300"
                    />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 p-6 flex flex-col justify-between select-none">
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <span className="font-mono text-[10px] text-[#00F2FE] uppercase tracking-wider">
                          {p.category || "Architecture"}
                        </span>
                      </div>

                      <div className="my-auto text-center space-y-2">
                        <div className="w-12 h-12 mx-auto rounded-xl bg-[#00F2FE]/10 border border-[#00F2FE]/20 flex items-center justify-center text-[#00F2FE]">
                          <Layers size={22} />
                        </div>
                        <h4 className="font-display font-semibold text-lg text-white">
                          {p.title}
                        </h4>
                        <p className="font-mono text-xs text-[#94A3B8]">
                          {p.stack?.[0]} • {p.stack?.[1]}
                        </p>
                      </div>

                      <div className="flex justify-between items-center text-[10px] font-mono text-[#64748B] pt-2 border-t border-white/5">
                        <span>Architecture Verified</span>
                        <span className="text-[#10B981] font-semibold">● Production Ready</span>
                      </div>
                    </div>
                  )}

                  {/* Image Upload Overlay for Edit Mode */}
                  {editMode && (
                    <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-6 z-20">
                      <label className="btn-ghost-tech px-5 py-2.5 flex items-center gap-2 cursor-pointer text-xs font-mono uppercase tracking-wider">
                        <ImageIcon size={15} />
                        <span>Upload Visual</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => onImageUpload(i, e)}
                        />
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

        {/* Add Project Button (in Edit Mode) */}
        {editMode && (
          <button
            onClick={() => setProjects((prev) => [...prev, emptyProject()])}
            className="w-full py-12 rounded-2xl border-2 border-dashed border-white/10 hover:border-[#00F2FE]/40 bg-white/[0.02] flex flex-col items-center justify-center gap-3 text-[#94A3B8] hover:text-[#00F2FE] transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center">
              <Plus size={20} />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest font-semibold">
              Add New Project
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
