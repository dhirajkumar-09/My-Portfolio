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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#05070D]/90 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl shadow-black/80"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={handleNavClick("top")}
            className="group flex items-center gap-3 bg-transparent border-none text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-sm bg-gradient-to-br from-[#00F2FE]/20 via-[#00F2FE]/05 to-transparent border border-[#00F2FE]/30 text-[#00F2FE] group-hover:border-[#00F2FE] group-hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all">
              {initials}
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-sm tracking-tight text-white group-hover:text-[#00F2FE] transition-colors flex items-center gap-1.5">
                {profile.name}
                <span className="status-beacon" title="Available for opportunities" />
              </span>
              <span className="font-mono text-[10px] tracking-widest text-[#64748B] uppercase">
                {profile.role?.split("&")[0]?.trim() || "Software Engineer"}
              </span>
            </div>
          </button>

          {/* Desktop Nav Pills */}
          <div className="hidden md:flex items-center gap-1 bg-[#090E1B]/80 border border-white/[0.08] rounded-full px-3 py-1.5 backdrop-blur-md shadow-inner">
            {NAV.map((n) => {
              const isActive = activeSection === n.id;
              return (
                <button
                  key={n.id}
                  onClick={handleNavClick(n.id)}
                  className={`font-mono text-xs tracking-wider uppercase px-4 py-2 rounded-full transition-all cursor-pointer ${
                    isActive
                      ? "text-[#00F2FE] bg-[#00F2FE]/10 shadow-sm font-semibold border border-[#00F2FE]/25"
                      : "text-[#94A3B8] hover:text-white hover:bg-white/[0.03]"
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
                className={`hidden sm:inline-flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase px-4 py-2 rounded-full border transition-all cursor-pointer ${
                  editMode
                    ? "bg-[#00F2FE]/20 border-[#00F2FE] text-[#00F2FE] shadow-[0_0_15px_rgba(0,242,254,0.3)]"
                    : "border-white/10 text-[#94A3B8] hover:text-white hover:border-[#00F2FE]/40 bg-white/5"
                }`}
              >
                {editMode ? <Check size={13} /> : <Pencil size={13} />}
                <span>{editMode ? "Save" : "Edit Site"}</span>
              </button>
            )}

            {/* Let's Talk CTA */}
            <button
              onClick={handleNavClick("contact")}
              className="btn-primary-tech hidden sm:inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase px-5 py-2.5 cursor-pointer"
            >
              <span>Let's Talk</span>
              <ArrowUpRight size={14} />
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 text-[#F8FAFC] hover:border-[#00F2FE]/50 hover:text-[#00F2FE] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#05070D]/98 backdrop-blur-2xl md:hidden pt-24 px-6 flex flex-col justify-between pb-10 transition-all duration-300">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#64748B] px-3 mb-2">
              Navigation Menu
            </span>
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={handleNavClick(n.id)}
                className="font-display text-xl font-light text-left py-3.5 px-4 rounded-xl text-[#F8FAFC] hover:text-[#00F2FE] hover:bg-white/5 flex items-center justify-between transition-all"
              >
                <span>{n.label}</span>
                <ArrowUpRight size={18} className="text-[#64748B]" />
              </button>
            ))}

            {isAdminUser && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onToggleEditMode();
                }}
                className="mt-4 flex items-center justify-between py-3.5 px-4 rounded-xl border border-[#00F2FE]/30 bg-[#00F2FE]/10 text-[#00F2FE] font-mono text-xs uppercase tracking-wider"
              >
                <span>{editMode ? "Exit Edit Mode" : "Admin Edit Mode"}</span>
                {editMode ? <Check size={16} /> : <Pencil size={16} />}
              </button>
            )}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={handleNavClick("contact")}
              className="btn-primary-tech w-full py-3.5 rounded-xl font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <span>Get In Touch</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
