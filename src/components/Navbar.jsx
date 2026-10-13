import React, { useState, useEffect } from "react";
import { NAV } from "../data/portfolioData";
import { Check, Pencil, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar({
  profile,
  scrolled,
  activeSection,
  onNavigate,
  isAdminUser,
  editMode,
  onToggleEditMode,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  const initials = profile.name
    ? profile.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "DK";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "navbar-glass py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Brand Logo — 3D hover badge */}
          <button
            onClick={handleNavClick("top")}
            className="group flex items-center gap-3.5 bg-transparent border-none text-left cursor-pointer"
          >
            <div className="logo-badge w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-sm
              bg-gradient-to-br from-[#C9A84C]/20 via-[#C9A84C]/10 to-transparent
              border border-[#C9A84C]/30
              text-[#F0C96E]
              group-hover:border-[#C9A84C]/70
              group-hover:shadow-[0_0_20px_rgba(200,160,70,0.35),inset_0_0_12px_rgba(200,160,70,0.1)]
              transition-all duration-300">
              {initials}
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-sm tracking-tight text-white group-hover:text-[#F0C96E] transition-colors flex items-center gap-1.5">
                {profile.name}
                <span className="status-dot scale-75" title="Available for opportunities" />
              </span>
              <span className="font-mono text-[10px] tracking-widest text-[#475569] uppercase">
                {profile.role?.split("&")[0]?.trim() || "Software Engineer"}
              </span>
            </div>
          </button>

          {/* Desktop Nav Pill */}
          <div className="hidden md:flex items-center gap-0.5 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1.5 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            {NAV.map((n) => {
              const isActive = activeSection === n.id;
              return (
                <button
                  key={n.id}
                  onClick={handleNavClick(n.id)}
                  className={`font-mono text-xs tracking-wider uppercase px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "text-[#F0C96E] bg-[#C9A84C]/10 shadow-sm border border-[#C9A84C]/20 font-semibold"
                      : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {n.label}
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Admin Toggle */}
            {isAdminUser && (
              <button
                onClick={onToggleEditMode}
                className={`hidden sm:inline-flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
                  editMode
                    ? "bg-[#C9A84C]/20 border-[#F0C96E]/80 text-[#F0C96E] shadow-[0_0_20px_rgba(200,160,70,0.3)]"
                    : "border-white/10 text-[#94A3B8] hover:text-white hover:border-[#C9A84C]/40 bg-white/[0.03]"
                }`}
              >
                {editMode ? <Check size={13} /> : <Pencil size={13} />}
                <span>{editMode ? "Save" : "Edit Site"}</span>
              </button>
            )}

            {/* CTA Button */}
            <button
              onClick={handleNavClick("contact")}
              className="btn-gold hidden sm:inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase px-5 py-2.5 rounded-full cursor-pointer"
            >
              <span>Let's Talk</span>
              <ArrowUpRight size={14} />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-white/[0.04] text-[#EFF6FF] hover:border-[#C9A84C]/50 hover:text-[#F0C96E] hover:shadow-[0_0_15px_rgba(200,160,70,0.15)] transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Drawer — premium */}
      <div
        className={`fixed inset-0 z-40 md:hidden pt-24 px-6 flex flex-col justify-between pb-10 transition-all duration-500 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: 'rgba(3, 5, 8, 0.97)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
        }}
      >
        {/* Decorative glow in drawer */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#C9A84C]/05 rounded-full blur-3xl" />
        </div>

        <div className="flex flex-col gap-2 relative z-10">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#475569] px-3 mb-3">
            Navigation Menu
          </span>
          {NAV.map((n, i) => (
            <button
              key={n.id}
              onClick={handleNavClick(n.id)}
              className="font-display text-2xl font-light text-left py-3.5 px-4 rounded-2xl text-[#EFF6FF] hover:text-[#F0C96E] hover:bg-white/[0.04] flex items-center justify-between transition-all duration-200 border border-transparent hover:border-white/[0.06]"
              style={{ transitionDelay: mobileMenuOpen ? `${i * 40}ms` : '0ms' }}
            >
              <span>{n.label}</span>
              <ArrowUpRight size={18} className="text-[#475569]" />
            </button>
          ))}

          {isAdminUser && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onToggleEditMode();
              }}
              className="mt-4 flex items-center justify-between py-3.5 px-4 rounded-2xl border border-[#C9A84C]/30 bg-[#C9A84C]/08 text-[#F0C96E] font-mono text-xs uppercase tracking-wider"
            >
              <span>{editMode ? "Exit Edit Mode" : "Admin Edit Mode"}</span>
              {editMode ? <Check size={16} /> : <Pencil size={16} />}
            </button>
          )}
        </div>

        <div className="relative z-10 pt-6 border-t border-white/[0.06] flex flex-col gap-3">
          <button
            onClick={handleNavClick("contact")}
            className="btn-gold w-full py-4 rounded-2xl font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <span>Get In Touch</span>
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </>
  );
}
