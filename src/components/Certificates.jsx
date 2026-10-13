import React from "react";
import { BadgeCheck, ShieldCheck, ArrowUpRight, Trash2, Plus, Image as ImageIcon, Award } from "lucide-react";
import { Editable } from "./Editable";
import { emptyCert } from "../data/portfolioData";

export default function Certificates({ certificates, setCertificates, editMode, onImageUpload }) {
  const updateCert = (idx, patch) => {
    setCertificates((prev) => prev.map((c, i) => (i === idx ? { ...c, ...patch } : c)));
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="certificates" className="py-28 relative">
      <div className="section-line absolute top-0 left-0 right-0" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="section-eyebrow font-mono text-xs uppercase tracking-[0.25em] text-[#C9A84C] mb-4">
            <span className="section-eyebrow-line" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Certifications &{" "}
            <span className="text-gradient-gold">Accreditations</span>
          </h2>
        </div>
        <div className="flex items-center gap-2.5 font-mono text-xs text-[#C9A84C] border border-[#C9A84C]/25 px-5 py-2.5 rounded-full bg-[#C9A84C]/05 shadow-[0_0_20px_rgba(200,160,70,0.08)]">
          <Award size={14} />
          <span>{certificates.length} Verified Credentials</span>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {certificates.map((c, i) => (
          <div
            key={i}
            onMouseMove={handleMouseMove}
            className="spotlight-card cert-holographic group p-6 sm:p-7 flex flex-col justify-between relative min-h-[320px]"
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

            <div className="spotlight-content">
              {/* Header row */}
              <div className="flex items-start justify-between mb-5">
                <span className="font-mono text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg border border-[#C9A84C]/30 text-[#F0C96E] bg-[#C9A84C]/08 shadow-[0_0_12px_rgba(200,160,70,0.1)]">
                  <Editable
                    value={c.seal || "CERT"}
                    onChange={(v) => updateCert(i, { seal: v })}
                    editMode={editMode}
                  />
                </span>

                <div className="flex items-center gap-1.5 text-[#10B981] font-mono text-xs bg-[#10B981]/08 border border-[#10B981]/20 px-2.5 py-1 rounded-full">
                  <BadgeCheck size={14} />
                  <span>Verified</span>
                </div>
              </div>

              <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-[#F0C96E] transition-colors duration-300 mb-2 leading-snug">
                <Editable
                  value={c.title}
                  onChange={(v) => updateCert(i, { title: v })}
                  editMode={editMode}
                />
              </h3>

              <div className="font-mono text-xs uppercase tracking-wider text-[#475569] mb-4">
                <Editable
                  value={c.issuer}
                  onChange={(v) => updateCert(i, { issuer: v })}
                  editMode={editMode}
                />
              </div>

              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-5 font-normal">
                <Editable
                  value={c.desc}
                  onChange={(v) => updateCert(i, { desc: v })}
                  editMode={editMode}
                  tag="span"
                  placeholder="Describe curriculum or skill validation..."
                />
              </p>

              {/* Certificate image */}
              {c.image && (
                <div className="mb-5 rounded-xl overflow-hidden border border-white/[0.08] h-36 bg-[#030508] flex items-center justify-center">
                  <img src={c.image} alt={c.title} className="w-full h-full object-contain" />
                </div>
              )}

              {/* Edit mode inputs */}
              {editMode && (
                <div className="space-y-3 mb-4">
                  <label className="border border-dashed border-white/15 hover:border-[#C9A84C]/50 rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer text-xs font-mono text-[#94A3B8] hover:text-[#F0C96E] transition-all">
                    <ImageIcon size={14} />
                    <span>Attach Certificate Preview</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => onImageUpload(i, e)} />
                  </label>
                  <input
                    type="text"
                    value={c.verifyUrl || ""}
                    onChange={(e) => updateCert(i, { verifyUrl: e.target.value })}
                    placeholder="Verification URL"
                    className="premium-input w-full font-mono text-xs rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
              )}
            </div>

            {/* Bottom Row */}
            <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between mt-auto">
              <span className="font-mono text-xs text-[#475569]">
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
                  className="font-mono text-xs text-[#C9A84C] hover:text-[#F0C96E] flex items-center gap-1.5 transition-colors group/verify"
                >
                  <ShieldCheck size={13} className="group-hover/verify:scale-110 transition-transform" />
                  <span>Verify</span>
                  <ArrowUpRight size={11} />
                </a>
              ) : (
                <span className="font-mono text-[10px] text-[#475569]">Official Credential</span>
              )}
            </div>
          </div>
        ))}

        {/* Add Certificate */}
        {editMode && (
          <button
            type="button"
            onClick={() => setCertificates((prev) => [...prev, emptyCert()])}
            className="p-8 rounded-2xl border-2 border-dashed border-white/[0.08] hover:border-[#C9A84C]/40 bg-white/[0.01] flex flex-col items-center justify-center gap-3 text-[#94A3B8] hover:text-[#F0C96E] transition-all cursor-pointer min-h-[320px]"
          >
            <Plus size={22} />
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">Add Credential</span>
          </button>
        )}
      </div>
    </section>
  );
}
