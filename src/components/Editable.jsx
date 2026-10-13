import React, { useState } from "react";
import { X } from "lucide-react";

export function Editable({
  value,
  onChange,
  tag: Tag = "span",
  className = "",
  style = {},
  placeholder = "",
  editMode = false,
}) {
  return (
    <Tag
      contentEditable={editMode}
      suppressContentEditableWarning
      onBlur={(e) => {
        if (editMode) {
          onChange(e.currentTarget.textContent.trim() || placeholder);
        }
      }}
      className={`${className} ${
        editMode
          ? "outline-none rounded ring-1 ring-[#D4AF6A]/60 bg-[#D4AF6A]/10 px-1 py-0.5 cursor-text transition-all"
          : ""
      }`}
      style={style}
    >
      {value}
    </Tag>
  );
}

export function TagEditor({ items = [], onChange, editMode = false }) {
  const [draft, setDraft] = useState("");

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {items.map((tag, i) => (
        <span
          key={i}
          className="group relative font-mono text-[11px] uppercase tracking-wide px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[#94A3B8] hover:border-[#D4AF6A]/40 hover:text-[#F3D082] transition-all inline-flex items-center gap-1.5"
        >
          <span>{tag}</span>
          {editMode && (
            <button
              type="button"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="text-red-400 hover:text-red-300 ml-1 p-0.5 rounded transition-colors"
            >
              <X size={12} />
            </button>
          )}
        </span>
      ))}

      {editMode && (
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && draft.trim()) {
              e.preventDefault();
              onChange([...items, draft.trim()]);
              setDraft("");
            }
          }}
          placeholder="+ tag (Enter)"
          className="font-mono text-[11px] uppercase tracking-wide px-3 py-1 rounded-full bg-transparent border border-dashed border-[#D4AF6A]/50 text-[#F3D082] placeholder-[#64748B] outline-none w-28 focus:border-[#F3D082]"
        />
      )}
    </div>
  );
}
