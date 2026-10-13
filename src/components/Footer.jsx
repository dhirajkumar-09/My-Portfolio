import React from "react";
import { ArrowUp, LogIn, LogOut, Sparkles } from "lucide-react";

export default function Footer({ profile, user, onLogin, onLogout, onScrollToTop }) {
  return (
    <footer className="mt-20 relative z-10">
      {/* Premium footer divider */}
      <div className="footer-divider" />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Brand + copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2 font-mono text-xs text-[#94A3B8]">
              <Sparkles size={12} className="text-[#C9A84C]" />
              <span>© {new Date().getFullYear()}</span>
              <span className="text-[#C9A84C] font-semibold">{profile.name}</span>
            </div>
            <span className="font-mono text-[10px] text-[#475569] tracking-wider">
              Crafted with React · Tailwind CSS · Firebase Cloud
            </span>
          </div>

          {/* Center: Status */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] font-mono text-[11px] text-[#475569]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>All systems operational</span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-6 font-mono text-xs text-[#94A3B8]">
            {user ? (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 hover:text-red-400 transition-colors cursor-pointer"
              >
                <LogOut size={13} />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={onLogin}
                className="flex items-center gap-1.5 hover:text-[#F0C96E] transition-colors cursor-pointer"
                title="Admin Authentication"
              >
                <LogIn size={13} />
                <span>Admin Portal</span>
              </button>
            )}

            <button
              onClick={onScrollToTop}
              className="flex items-center gap-1.5 hover:text-[#F0C96E] transition-colors cursor-pointer group px-3 py-1.5 rounded-full border border-white/[0.06] hover:border-[#C9A84C]/30 hover:bg-[#C9A84C]/05"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
