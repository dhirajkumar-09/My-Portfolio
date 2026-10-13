import React, { useState, useRef } from "react";
import { Cpu, Terminal, Shield, Wifi, Sparkles, Layers, Activity, ChevronRight, Copy, Check } from "lucide-react";

export default function HolographicCard({ profile }) {
  const [activeView, setActiveView] = useState("badge"); // "badge" | "console" | "iot"
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [glareStyle, setGlareStyle] = useState({});

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-10 to 10 deg)
    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);

    // Glare position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlareStyle({
      background: `radial-gradient(circle 350px at ${glareX}% ${glareY}%, rgba(0, 242, 254, 0.18), rgba(234, 179, 8, 0.10) 40%, transparent 80%)`,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlareStyle({ opacity: 0 });
  };

  const copyContact = () => {
    navigator.clipboard.writeText("dhidna9090@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-[480px] mx-auto select-none">
      {/* 3D Holographic Card Viewport */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: transformStyle,
          transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="relative rounded-3xl p-6 sm:p-7 border border-white/[0.12] bg-gradient-to-br from-[#0B1124]/95 via-[#070B18]/95 to-[#05070E]/95 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(0,242,254,0.12)] backdrop-blur-2xl overflow-hidden group cursor-pointer"
      >
        {/* Dynamic Interactive Glare Reflection */}
        <div
          style={{ ...glareStyle, transition: "opacity 0.3s ease" }}
          className="absolute inset-0 pointer-events-none rounded-3xl z-30"
        />

        {/* Ambient Top Hologram Shimmer Line */}
        <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#00F2FE]/70 to-transparent pointer-events-none" />

        {/* Card Header: Smart Chip & Hologram Watermark */}
        <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] relative z-20">
          <div className="flex items-center gap-3">
            {/* Holographic Hardware Microchip */}
            <div className="relative w-11 h-9 rounded-lg bg-gradient-to-br from-[#EAB308]/30 via-[#00F2FE]/20 to-[#0A1226] border border-[#EAB308]/50 p-1 flex flex-col justify-between shadow-[0_0_15px_rgba(234,179,8,0.25)]">
              <div className="flex justify-between">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE]" />
              </div>
              <div className="h-[2px] bg-white/30 rounded" />
              <div className="flex justify-between items-center text-[7px] font-mono text-[#FDE047] font-bold">
                <span>IOT</span>
                <span>SEC</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono text-[#00F2FE] uppercase tracking-widest block font-semibold">
                SYSTEM IDENTIFICATION
              </span>
              <span className="text-xs font-mono text-[#94A3B8]">
                ID // DK-9090-ENG
              </span>
            </div>
          </div>

          {/* Beacon Status */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-[#10B981] tracking-wider uppercase">
              ONLINE
            </span>
          </div>
        </div>

        {/* Interactive View Selector Tabs */}
        <div className="flex items-center gap-1.5 my-4 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] relative z-20">
          <button
            onClick={() => setActiveView("badge")}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono font-medium transition-all flex items-center justify-center gap-1.5 ${
              activeView === "badge"
                ? "bg-[#00F2FE]/15 text-[#00F2FE] border border-[#00F2FE]/40 shadow-sm"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <Shield size={12} />
            <span>Developer ID</span>
          </button>

          <button
            onClick={() => setActiveView("console")}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono font-medium transition-all flex items-center justify-center gap-1.5 ${
              activeView === "console"
                ? "bg-[#00F2FE]/15 text-[#00F2FE] border border-[#00F2FE]/40 shadow-sm"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <Terminal size={12} />
            <span>Terminal</span>
          </button>

          <button
            onClick={() => setActiveView("iot")}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono font-medium transition-all flex items-center justify-center gap-1.5 ${
              activeView === "iot"
                ? "bg-[#00F2FE]/15 text-[#00F2FE] border border-[#00F2FE]/40 shadow-sm"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <Wifi size={12} />
            <span>IoT Node</span>
          </button>
        </div>

        {/* VIEW 1: Holographic ID Badge */}
        {activeView === "badge" && (
          <div className="space-y-4 pt-1 relative z-20">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#64748B] block mb-1">
                ENGINEER IDENTITY
              </span>
              <h3 className="font-display font-extrabold text-2xl text-white tracking-tight flex items-center justify-between">
                <span>{profile.name || "Dhiraj Kumar"}</span>
                <span className="text-xs font-mono text-[#EAB308] px-2.5 py-1 rounded-md bg-[#EAB308]/10 border border-[#EAB308]/20">
                  FULL-STACK
                </span>
              </h3>
              <p className="font-mono text-xs text-[#00F2FE] mt-0.5">
                IoT Architect &amp; Distributed Systems Specialist
              </p>
            </div>

            {/* Core Tech Stack Badges Matrix */}
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#64748B] block mb-2">
                VERIFIED CAPABILITIES
              </span>
              <div className="flex flex-wrap gap-1.5">
                {["React 19", "Node.js", "Python", "Go", "Docker", "ESP32", "AWS"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/[0.04] border border-white/[0.08] text-[#E2E8F0] hover:border-[#00F2FE]/40 hover:text-[#00F2FE] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.06]">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-center">
                <span className="font-mono text-[9px] text-[#64748B] block uppercase">PROJECTS</span>
                <span className="font-display font-bold text-base text-white">18+</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-center">
                <span className="font-mono text-[9px] text-[#64748B] block uppercase">DSA SOLVED</span>
                <span className="font-display font-bold text-base text-[#00F2FE]">300+</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-center">
                <span className="font-mono text-[9px] text-[#64748B] block uppercase">UPTIME</span>
                <span className="font-display font-bold text-base text-[#10B981]">99.9%</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Interactive Console */}
        {activeView === "console" && (
          <div className="p-4 rounded-xl bg-black/60 border border-white/[0.08] font-mono text-[11px] text-[#CBD5E1] space-y-2 relative z-20 min-h-[190px]">
            <div className="flex items-center gap-1.5 text-xs text-[#00F2FE] border-b border-white/5 pb-2">
              <span>●</span>
              <span>dhiraj@workstation:~$ whoami</span>
            </div>
            <p className="text-white font-semibold">
              Dhiraj Kumar (Engineer &amp; Hardware Hacker)
            </p>
            <div className="space-y-1 text-[#94A3B8] text-[10px]">
              <div>&gt; Stack: React, Node, TimescaleDB, Microservices</div>
              <div>&gt; Hardware: ESP32 mesh routing, MQTT broker</div>
              <div>&gt; Focus: Scalable high-performance architectures</div>
            </div>
            <div className="pt-2 text-[#10B981] flex items-center gap-1.5 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              Ready to ship production features
            </div>
          </div>
        )}

        {/* VIEW 3: IoT Mesh Node */}
        {activeView === "iot" && (
          <div className="p-4 rounded-xl bg-black/60 border border-white/[0.08] font-mono text-[11px] text-[#CBD5E1] space-y-2.5 relative z-20 min-h-[190px]">
            <div className="flex items-center justify-between text-[10px] text-[#64748B] border-b border-white/5 pb-1.5">
              <span>EDGE TELEMETRY GRID</span>
              <span className="text-[#00F2FE]">ESP32-MESH-V2</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Node Signal (RSSI):</span>
                <span className="text-[#10B981] font-bold">-48 dBm (Strong)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Packet Transmission:</span>
                <span className="text-[#00F2FE] font-bold">120 msg/sec</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Protocol Stack:</span>
                <span className="text-[#EAB308]">MQTT over TLS</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-white/[0.03] text-[9px] text-[#64748B] flex items-center justify-between">
              <span>FAILOVER ROUTING: ENABLED</span>
              <span className="text-[#10B981]">0 DROPPED</span>
            </div>
          </div>
        )}

        {/* Card Footer: Quick Copy & Direct Action */}
        <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between relative z-20">
          <div className="flex items-center gap-2">
            <button
              onClick={copyContact}
              className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-[#00F2FE]/15 border border-white/[0.08] hover:border-[#00F2FE]/30 font-mono text-[11px] text-[#94A3B8] hover:text-[#00F2FE] flex items-center gap-1.5 transition-all"
            >
              {copied ? <Check size={12} className="text-[#10B981]" /> : <Copy size={12} />}
              <span>{copied ? "Copied Email!" : "Copy Email"}</span>
            </button>
          </div>

          <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">
            PORTFOLIO 2026 // V2
          </span>
        </div>
      </div>
    </div>
  );
}
