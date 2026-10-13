import React from "react";
import { Layout, Server, Database, Cpu, Code2, Plus, Trash2 } from "lucide-react";
import { Editable, TagEditor } from "./Editable";

const getCategoryIcon = (label = "") => {
  const l = label.toLowerCase();
  if (l.includes("front") || l.includes("ui")) return <Layout size={20} className="text-[#00F2FE]" />;
  if (l.includes("back") || l.includes("api") || l.includes("server")) return <Server size={20} className="text-[#10B981]" />;
  if (l.includes("data") || l.includes("cloud") || l.includes("db")) return <Database size={20} className="text-[#EAB308]" />;
  if (l.includes("iot") || l.includes("embed") || l.includes("hard")) return <Cpu size={20} className="text-[#EC4899]" />;
  return <Code2 size={20} className="text-[#00F2FE]" />;
};

export default function Skills({ skillGroups, setSkillGroups, editMode }) {
  return (
    <section id="skills" className="py-24 relative">
      <div className="tech-divider mb-16" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#00F2FE] mb-3 flex items-center gap-2.5">
            <span className="w-5 h-[2px] bg-[#00F2FE]" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Toolkit &amp; <span className="text-cyan-gold">Tech Stack</span>
          </h2>
        </div>
        <p className="font-mono text-xs text-[#94A3B8] max-w-md leading-relaxed">
          Comprehensive breakdown of engineering disciplines, backend microservices, real-time protocols, and edge IoT stacks.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillGroups.map((group, gi) => (
          <div
            key={gi}
            className="tech-card-3d p-6 sm:p-7 flex flex-col justify-between relative"
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

            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                  {getCategoryIcon(group.label)}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white hover:text-[#00F2FE] transition-colors">
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
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#64748B]">
                    {group.category || "Domain Matrix"}
                  </span>
                </div>
              </div>

              <div className="pt-2">
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

            <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
              <span>Proficiency Verified</span>
              <span className="text-[#00F2FE] font-bold">{group.items?.length || 0} technologies</span>
            </div>
          </div>
        ))}

        {/* Add Skill Group in Edit Mode */}
        {editMode && (
          <button
            type="button"
            onClick={() =>
              setSkillGroups((prev) => [
                ...prev,
                { label: "New Category", category: "Custom Domain", items: ["Tech 1", "Tech 2"] },
              ])
            }
            className="p-8 rounded-2xl border-2 border-dashed border-white/10 hover:border-[#00F2FE]/40 bg-white/[0.02] flex flex-col items-center justify-center gap-3 text-[#94A3B8] hover:text-[#00F2FE] transition-all cursor-pointer min-h-[220px]"
          >
            <Plus size={22} />
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">
              Add Skill Category
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
