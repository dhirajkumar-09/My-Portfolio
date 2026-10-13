import React, { useState } from "react";
import { Mail, Send, Copy, Check, MessageSquare, ArrowUpRight, Sparkles } from "lucide-react";
import { Editable } from "./Editable";

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Contact({ profile, setProfile, editMode, onSubmitMessage, sendingMsg, showToast }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    showToast(`Copied ${profile.email} to clipboard!`);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitMessage(form, () => setForm({ name: "", email: "", message: "" }));
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="contact" className="py-28 relative">
      <div className="section-line absolute top-0 left-0 right-0" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="section-eyebrow font-mono text-xs uppercase tracking-[0.25em] text-[#C9A84C] mb-4 justify-center">
          <span className="section-eyebrow-line" />
          <span>Initiate Contact</span>
          <span className="section-eyebrow-line" style={{ transform: 'scaleX(-1)' }} />
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight mb-4">
          Let's build something{" "}
          <span className="text-shimmer">extraordinary.</span>
        </h2>
        <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
          Whether you have a technical opportunity, a prospective project, or want to explore ideas — I'm always eager to connect.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Direct Info */}
        <div
          onMouseMove={handleMouseMove}
          className="lg:col-span-5 spotlight-card p-8 sm:p-10 rounded-3xl relative overflow-hidden"
        >
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A84C]/08 to-transparent rounded-bl-[80px] pointer-events-none" />

          <div className="spotlight-content">
            <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C9A84C]/20 to-[#C9A84C]/05 border border-[#C9A84C]/25 flex items-center justify-center text-[#F0C96E] mb-7 shadow-[0_0_25px_rgba(200,160,70,0.15)]">
              <Mail size={22} />
            </div>

            <p className="text-sm text-[#94A3B8] leading-relaxed mb-8">
              Whether you have a technical opportunity, a prospective project, or want to explore ideas in full-stack web and IoT systems, I'm always eager to connect.
            </p>

            {/* Copyable Email Box */}
            <div className="mb-8 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.07] flex items-center justify-between gap-3 group/email hover:border-[#C9A84C]/30 transition-all">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-[#F0C96E]" />
                </div>
                <span className="font-mono text-xs text-white truncate">
                  <Editable
                    value={profile.email}
                    onChange={(v) => setProfile((p) => ({ ...p, email: v }))}
                    editMode={editMode}
                  />
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-white/[0.04] hover:bg-[#C9A84C]/15 text-[#94A3B8] hover:text-[#F0C96E] transition-all shrink-0 cursor-pointer border border-white/[0.06] hover:border-[#C9A84C]/30"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check size={14} className="text-[#10B981]" /> : <Copy size={14} />}
              </button>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-white/[0.04] flex items-center gap-3 flex-wrap">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost px-4 py-2.5 rounded-full border border-white/[0.08] flex items-center gap-2 font-mono text-xs transition-all"
              >
                <GithubIcon size={15} />
                <span>GitHub</span>
                <ArrowUpRight size={11} />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost px-4 py-2.5 rounded-full border border-white/[0.08] flex items-center gap-2 font-mono text-xs transition-all"
              >
                <LinkedinIcon size={15} />
                <span>LinkedIn</span>
                <ArrowUpRight size={11} />
              </a>
            </div>

            {/* Edit Mode URL Inputs */}
            {editMode && (
              <div className="mt-6 pt-6 border-t border-white/[0.06] space-y-3">
                <input
                  type="text"
                  value={profile.linkedin || ""}
                  onChange={(e) => setProfile((p) => ({ ...p, linkedin: e.target.value }))}
                  placeholder="LinkedIn URL"
                  className="premium-input w-full font-mono text-xs rounded-xl px-4 py-2.5 text-white"
                />
                <input
                  type="text"
                  value={profile.github || ""}
                  onChange={(e) => setProfile((p) => ({ ...p, github: e.target.value }))}
                  placeholder="GitHub URL"
                  className="premium-input w-full font-mono text-xs rounded-xl px-4 py-2.5 text-white"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right: Message Form */}
        <div
          onMouseMove={handleMouseMove}
          className="lg:col-span-7 spotlight-card p-8 sm:p-10 rounded-3xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/20 flex items-center justify-center">
              <MessageSquare size={18} className="text-[#22D3EE]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-white">Send a Direct Message</h3>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#475569]">Encrypted & Delivered Instantly</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className={`block font-mono text-[11px] uppercase tracking-wider mb-2 transition-colors ${focusedField === 'name' ? 'text-[#C9A84C]' : 'text-[#475569]'}`}>
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                placeholder="e.g. Sarah Connor"
                className="premium-input w-full font-mono text-sm text-white placeholder-[#475569] rounded-xl px-4 py-3.5"
              />
            </div>

            {/* Email */}
            <div>
              <label className={`block font-mono text-[11px] uppercase tracking-wider mb-2 transition-colors ${focusedField === 'email' ? 'text-[#C9A84C]' : 'text-[#475569]'}`}>
                Your Email Address
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="e.g. sarah@company.com"
                className="premium-input w-full font-mono text-sm text-white placeholder-[#475569] rounded-xl px-4 py-3.5"
              />
            </div>

            {/* Message */}
            <div>
              <label className={`block font-mono text-[11px] uppercase tracking-wider mb-2 transition-colors ${focusedField === 'message' ? 'text-[#C9A84C]' : 'text-[#475569]'}`}>
                Message &amp; Project Scope
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                placeholder="Hello Dhiraj, I would love to connect regarding an engineering role or technical collaboration..."
                className="premium-input w-full font-mono text-sm text-white placeholder-[#475569] rounded-xl px-4 py-3.5 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sendingMsg}
              className="btn-gold w-full font-mono text-xs uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sendingMsg ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#030508] border-t-transparent rounded-full animate-spin" />
                  <span>Transmitting Message...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span>Send Message</span>
                  <Send size={13} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
