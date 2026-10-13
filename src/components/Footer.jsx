import React from "react";
import { ArrowUp, LogIn, LogOut } from "lucide-react";

export default function Footer({
  profile,
  user,
  onLogin,
  onLogout,
  onScrollToTop,
}) {
  return (
    <footer className="mt-20 border-t border-white/[0.08] relative z-10 py-10 bg-[#05070D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-[#94A3B8]">
        {/* Left: Copyright & Engineering */}
        <div className="flex items-center gap-2 text-center md:text-left flex-wrap justify-center md:justify-start">
          <span>© {new Date().getFullYear()} <strong className="text-white">{profile.name}</strong></span>
          <span className="w-1 h-1 rounded-full bg-[#00F2FE]" />
          <span>React 19 · Tailwind CSS · Cloud Systems</span>
        </div>

        {/* Center: Live status beacon */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]">
          <span className="status-beacon" />
          <span className="text-[11px] text-[#E2E8F0]">Production Ready</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
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
              className="flex items-center gap-1.5 hover:text-[#00F2FE] transition-colors cursor-pointer"
              title="Admin Authentication"
            >
              <LogIn size={13} />
              <span>Admin Portal</span>
            </button>
          )}

          <button
            onClick={onScrollToTop}
            className="flex items-center gap-1.5 hover:text-[#00F2FE] transition-colors cursor-pointer group"
          >
            <span>Back to Top</span>
            <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
