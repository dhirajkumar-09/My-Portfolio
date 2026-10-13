import React from "react";
import { BadgeCheck, ShieldCheck, ArrowUpRight, Trash2, Plus, Image as ImageIcon } from "lucide-react";
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

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="certificates" className="py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#F3D082] mb-3 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#F3D082]" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            Certifications &amp; Accreditations
          </h2>
        </div>
        <div className="font-mono text-xs text-[#94A3B8] border border-white/10 px-4 py-2 rounded-full bg-white/[0.02]">
          {certificates.length} Verified Credentials
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((c, i) => (
          <div
            key={i}
            onMouseMove={handleMouseMove}
            className="spotlight-card group p-6 sm:p-7 flex flex-col justify-between relative min-h-[300px]"
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
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg border border-[#D4AF6A]/30 text-[#F3D082] bg-[#D4AF6A]/10">
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

              <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-[#F3D082] transition-colors mb-2 leading-snug">
                <Editable
                  value={c.title}
                  onChange={(v) => updateCert(i, { title: v })}
                  editMode={editMode}
                />
              </h3>

              <div className="font-mono text-xs uppercase tracking-wider text-[#94A3B8] mb-4">
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
                  <label className="border border-dashed border-white/20 hover:border-[#D4AF6A] rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer text-xs font-mono text-[#94A3B8] hover:text-[#F3D082]">
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
                    className="w-full font-mono text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#D4AF6A]"
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
                  className="font-mono text-xs text-[#F3D082] hover:text-white flex items-center gap-1.5 transition-colors"
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
            className="p-8 rounded-2xl border-2 border-dashed border-white/10 hover:border-[#D4AF6A]/50 bg-white/[0.02] flex flex-col items-center justify-center gap-3 text-[#94A3B8] hover:text-[#F3D082] transition-all cursor-pointer min-h-[300px]"
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
