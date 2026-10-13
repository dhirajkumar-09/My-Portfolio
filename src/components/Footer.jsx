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
    <footer className="mt-20 pt-8 pb-12 border-t border-white/[0.08] relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-[#94A3B8]">
        {/* Left: Copyright & Engineering */}
        <div className="flex items-center gap-2 text-center md:text-left flex-wrap justify-center md:justify-start">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="w-1 h-1 rounded-full bg-[#D4AF6A]" />
          <span>Crafted with React, Tailwind CSS &amp; Cloud Systems</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          {user ? (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 hover:text-[#EF4444] transition-colors cursor-pointer"
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={onLogin}
              className="flex items-center gap-1.5 hover:text-[#F3D082] transition-colors cursor-pointer"
              title="Admin Authentication"
            >
              <LogIn size={13} />
              <span>Admin Portal</span>
            </button>
          )}

          <button
            onClick={onScrollToTop}
            className="flex items-center gap-1.5 hover:text-[#F3D082] transition-colors cursor-pointer group"
          >
            <span>Back to Top</span>
            <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
