import React from "react";
import { BadgeCheck, ShieldCheck, ArrowUpRight, Trash2, Plus, Image as ImageIcon, Award } from "lucide-react";
import { Editable } from "./Editable";
import { emptyCert } from "../data/portfolioData";

export default function Certificates({
  certificates,
  setCertificates,
  editMode,
  onImageUpload,
}) {
  const updateCert = (idx, patch) => {
    setCertificates((prev) => prev.map((c, i) => (i === idx ? { ...c, ...patch } : c)));
  };

  return (
    <section id="certificates" className="py-24 relative">
      <div className="tech-divider mb-16" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#00F2FE] mb-3 flex items-center gap-2.5">
            <span className="w-5 h-[2px] bg-[#00F2FE]" />
            <span>Accreditations</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Certifications &amp; <span className="text-cyan-gold">Credentials</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-[#00F2FE] border border-[#00F2FE]/20 px-4 py-2 rounded-full bg-[#00F2FE]/05">
          <Award size={14} />
          <span>{certificates.length} Verified Accreditations</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {certificates.map((c, i) => (
          <div
            key={i}
            className="tech-card-3d p-6 sm:p-7 flex flex-col justify-between relative min-h-[300px]"
          >
            {editMode && (
              <button
                type="button"
                onClick={() => setCertificates((prev) => prev.filter((_, idx) => idx !== i))}
                className="absolute top-4 right-4 text-red-400 hover:text-red-300 p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all z-20 cursor-pointer"
                title="Delete credential"
              >
                <Trash2 size={14} />
              </button>
            )}

            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-lg border border-[#00F2FE]/30 text-[#00F2FE] bg-[#00F2FE]/10">
                  <Editable
                    value={c.seal || "CERT"}
                    onChange={(v) => updateCert(i, { seal: v })}
                    editMode={editMode}
                  />
                </span>

                <div className="flex items-center gap-1 text-[#10B981] font-mono text-xs">
                  <BadgeCheck size={16} />
                  <span>Verified</span>
                </div>
              </div>

              <h3 className="font-display font-bold text-lg text-white hover:text-[#00F2FE] transition-colors mb-2 leading-snug">
                <Editable
                  value={c.title}
                  onChange={(v) => updateCert(i, { title: v })}
                  editMode={editMode}
                />
              </h3>

              <div className="font-mono text-xs uppercase tracking-wider text-[#EAB308] mb-4">
                <Editable
                  value={c.issuer}
                  onChange={(v) => updateCert(i, { issuer: v })}
                  editMode={editMode}
                />
              </div>

              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-6 font-normal">
                <Editable
                  value={c.desc}
                  onChange={(v) => updateCert(i, { desc: v })}
                  editMode={editMode}
                  tag="span"
                  placeholder="Describe curriculum or skill validation..."
                />
              </p>

              {/* Optional Certificate Visual */}
              {c.image && (
                <div className="mb-6 rounded-xl overflow-hidden border border-white/10 h-36 bg-[#030508] p-1 flex items-center justify-center">
                  <img src={c.image} alt={c.title} className="w-full h-full object-contain rounded-lg" />
                </div>
              )}

              {/* Edit Mode Inputs */}
              {editMode && (
                <div className="space-y-3 mb-4">
                  <label className="border border-dashed border-white/20 hover:border-[#00F2FE] rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer text-xs font-mono text-[#94A3B8] hover:text-[#00F2FE]">
                    <ImageIcon size={14} />
                    <span>Attach Certificate Preview</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => onImageUpload(i, e)}
                    />
                  </label>
                  <input
                    type="text"
                    value={c.verifyUrl || ""}
                    onChange={(e) => updateCert(i, { verifyUrl: e.target.value })}
                    placeholder="Verification URL"
                    className="w-full font-mono text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#00F2FE]"
                  />
                </div>
              )}
            </div>

            {/* Bottom Row */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between mt-auto">
              <span className="font-mono text-xs text-[#64748B]">
                <Editable
                  value={c.date}
                  onChange={(v) => updateCert(i, { date: v })}
                  editMode={editMode}
                />
              </span>

              {!editMode && c.verifyUrl && c.verifyUrl !== "#" ? (
                <a
                  href={c.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#00F2FE] hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ShieldCheck size={14} />
                  <span>Verify</span>
                  <ArrowUpRight size={12} />
                </a>
              ) : (
                <span className="font-mono text-[11px] text-[#64748B]">Official Credential</span>
              )}
            </div>
          </div>
        ))}

        {/* Add Certificate in Edit Mode */}
        {editMode && (
          <button
            type="button"
            onClick={() => setCertificates((prev) => [...prev, emptyCert()])}
            className="p-8 rounded-2xl border-2 border-dashed border-white/10 hover:border-[#00F2FE]/40 bg-white/[0.02] flex flex-col items-center justify-center gap-3 text-[#94A3B8] hover:text-[#00F2FE] transition-all cursor-pointer min-h-[300px]"
          >
            <Plus size={22} />
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">
              Add Credential
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
