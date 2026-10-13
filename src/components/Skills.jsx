import React from "react";
import { Layout, Server, Database, Cpu, Code2, Plus, Trash2 } from "lucide-react";
import { Editable, TagEditor } from "./Editable";

const getCategoryIcon = (label = "") => {
  const l = label.toLowerCase();
  if (l.includes("front") || l.includes("ui")) return <Layout size={20} className="text-[#22D3EE]" />;
  if (l.includes("back") || l.includes("api") || l.includes("server")) return <Server size={20} className="text-[#10B981]" />;
  if (l.includes("data") || l.includes("cloud") || l.includes("db")) return <Database size={20} className="text-[#F59E0B]" />;
  if (l.includes("iot") || l.includes("embed") || l.includes("hard")) return <Cpu size={20} className="text-[#EC4899]" />;
  return <Code2 size={20} className="text-[#F0C96E]" />;
};

const getCategoryGlow = (label = "") => {
  const l = label.toLowerCase();
  if (l.includes("front") || l.includes("ui")) return "rgba(34,211,238,0.15)";
  if (l.includes("back") || l.includes("api") || l.includes("server")) return "rgba(16,185,129,0.15)";
  if (l.includes("data") || l.includes("cloud") || l.includes("db")) return "rgba(245,158,11,0.15)";
  if (l.includes("iot") || l.includes("embed") || l.includes("hard")) return "rgba(236,72,153,0.15)";
  return "rgba(200,160,70,0.15)";
};

export default function Skills({ skillGroups, setSkillGroups, editMode }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="skills" className="py-28 relative">
      <div className="section-line absolute top-0 left-0 right-0" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="section-eyebrow font-mono text-xs uppercase tracking-[0.25em] text-[#C9A84C] mb-4">
            <span className="section-eyebrow-line" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Toolkit &{" "}
            <span className="text-gradient-gold">Tech Stack</span>
          </h2>
        </div>
        <p className="font-mono text-xs text-[#94A3B8] max-w-md leading-relaxed border-l-2 border-[#C9A84C]/30 pl-4">
          A comprehensive breakdown of technologies, frameworks, and engineering principles leveraged across full-stack and embedded systems.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillGroups.map((group, gi) => (
          <div
            key={gi}
            onMouseMove={handleMouseMove}
            className="spotlight-card cert-holographic group p-6 sm:p-7 flex flex-col justify-between relative skill-card-3d"
          >
            {editMode && (
              <button
                type="button"
                onClick={() => setSkillGroups((prev) => prev.filter((_, idx) => idx !== gi))}
                className="absolute top-4 right-4 text-red-400 hover:text-red-300 p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all z-20 cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            )}

            <div className="spotlight-content">
              <div className="flex items-center gap-3.5 mb-5">
                {/* Icon with colored glow */}
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-white/[0.08]"
                  style={{
                    background: `radial-gradient(circle at center, ${getCategoryGlow(group.label)} 0%, rgba(255,255,255,0.02) 100%)`,
                    boxShadow: `0 0 20px ${getCategoryGlow(group.label)}`,
                  }}
                >
                  {getCategoryIcon(group.label)}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-[#F0C96E] transition-colors duration-300">
                    <Editable
                      value={group.label}
                      onChange={(v) =>
                        setSkillGroups((prev) =>
                          prev.map((g, idx) => (idx === gi ? { ...g, label: v } : g))
                        )
                      }
                      editMode={editMode}
                    />
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#475569]">
                    {group.category || "Domain Matrix"}
                  </span>
                </div>
              </div>

              <div className="pt-1">
                <TagEditor
                  items={group.items || []}
                  onChange={(items) =>
                    setSkillGroups((prev) =>
                      prev.map((g, idx) => (idx === gi ? { ...g, items } : g))
                    )
                  }
                  editMode={editMode}
                />
              </div>
            </div>

            {/* Bottom row */}
            <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-[#475569]">
              <span>Proficiency Verified</span>
              <span className="text-[#C9A84C] font-bold">{group.items?.length || 0} skills</span>
            </div>
          </div>
        ))}

        {/* Add Skill Group */}
        {editMode && (
          <button
            type="button"
            onClick={() =>
              setSkillGroups((prev) => [
                ...prev,
                { label: "New Category", category: "Custom Domain", items: ["Tech 1", "Tech 2"] },
              ])
            }
            className="p-8 rounded-2xl border-2 border-dashed border-white/[0.08] hover:border-[#C9A84C]/40 bg-white/[0.01] flex flex-col items-center justify-center gap-3 text-[#94A3B8] hover:text-[#F0C96E] transition-all cursor-pointer min-h-[220px]"
          >
            <Plus size={22} />
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">Add Skill Category</span>
          </button>
        )}
      </div>
    </section>
  );
}
