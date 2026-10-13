import React, { useState } from "react";
import { Terminal as TerminalIcon, Cpu, Activity, Copy, Check, Play } from "lucide-react";

export default function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState("terminal");
  const [copied, setCopied] = useState(false);
  const [activeCommand, setActiveCommand] = useState("whoami");

  const commands = {
    whoami: {
      output: `Dhiraj Kumar — Full-Stack Engineer & IoT Specialist
Focus: Distributed Cloud Architectures, Low-Latency Real-Time APIs & Edge Hardware.
Status: Ready to engineer scalable systems for world-class teams.`,
    },
    skills: {
      output: `[Frontend]  React 19, TypeScript, Tailwind CSS, Next.js
[Backend]   Node.js, Express, Go, Python, REST & WebSockets
[Database]  PostgreSQL, Firebase Firestore, TimescaleDB, Redis
[Systems]   Docker, AWS Lambda, ESP32, MQTT, C++ / Embedded`,
    },
    "tech-stack": {
      output: `{
  "frameworks": ["React", "Node.js", "Express", "TailwindCSS"],
  "cloud": ["Firebase", "AWS Lambda", "Docker"],
  "iot_hardware": ["ESP32", "Arduino", "MQTT Mesh", "Sensors"],
  "methodology": ["CI/CD", "Clean Architecture", "TDD"]
}`,
    },
    status: {
      output: `⚡ ALL SYSTEMS OPERATIONAL
● API Health: 100% OK
● Deployment Status: Verified Production Build
● Availability: Open to High-Impact Engineering Roles`,
    },
  };

  const copyContent = () => {
    const text = `Dhiraj Kumar — Full-Stack & IoT Engineer\nEmail: dhidna9090@gmail.com\nGitHub: https://github.com/dhirajkumar-09/My-Portfolio`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-[#070B16] shadow-2xl shadow-black/80 font-mono text-xs text-left">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0B1020] border-b border-white/[0.08] select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
          <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
          <span className="w-3 h-3 rounded-full bg-[#10B981]" />
          <span className="ml-2 text-[#94A3B8] text-[11px] font-medium hidden sm:inline">
            dhiraj@engineer: ~/portfolio
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-lg border border-white/[0.06]">
          <button
            onClick={() => setActiveTab("terminal")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer text-[11px] ${
              activeTab === "terminal"
                ? "bg-[#00F2FE]/15 text-[#00F2FE] font-semibold border border-[#00F2FE]/30"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <TerminalIcon size={12} />
            <span>Terminal</span>
          </button>

          <button
            onClick={() => setActiveTab("architecture")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer text-[11px] ${
              activeTab === "architecture"
                ? "bg-[#00F2FE]/15 text-[#00F2FE] font-semibold border border-[#00F2FE]/30"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <Cpu size={12} />
            <span>Architecture</span>
          </button>

          <button
            onClick={() => setActiveTab("metrics")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer text-[11px] ${
              activeTab === "metrics"
                ? "bg-[#00F2FE]/15 text-[#00F2FE] font-semibold border border-[#00F2FE]/30"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <Activity size={12} />
            <span>Metrics</span>
          </button>
        </div>

        {/* Copy button */}
        <button
          onClick={copyContent}
          title="Copy profile info"
          className="p-1.5 rounded-md hover:bg-white/10 text-[#94A3B8] hover:text-[#00F2FE] transition-colors"
        >
          {copied ? <Check size={14} className="text-[#10B981]" /> : <Copy size={14} />}
        </button>
      </div>

      {/* Tab 1: Terminal */}
      {activeTab === "terminal" && (
        <div className="p-5 md:p-6 space-y-4 min-h-[300px] flex flex-col justify-between">
          <div className="space-y-3">
            {/* Command prompt line */}
            <div className="flex items-center gap-2 text-xs flex-wrap">
              <span className="text-[#10B981] font-semibold">dhiraj@portfolio</span>
              <span className="text-[#00F2FE]">:~</span>
              <span className="text-[#EAB308]">$</span>
              <span className="text-white font-bold">{activeCommand}</span>
              <span className="w-2 h-4 bg-[#00F2FE] inline-block animate-pulse" />
            </div>

            {/* Command Output */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-[#CBD5E1] whitespace-pre-wrap leading-relaxed text-xs">
              {commands[activeCommand]?.output}
            </div>
          </div>

          {/* Quick command buttons */}
          <div className="pt-3 border-t border-white/[0.06]">
            <span className="text-[10px] uppercase tracking-wider text-[#64748B] block mb-2">
              Execute Command:
            </span>
            <div className="flex flex-wrap gap-2">
              {Object.keys(commands).map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => setActiveCommand(cmd)}
                  className={`px-3 py-1.5 rounded-lg border text-[11px] flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeCommand === cmd
                      ? "bg-[#00F2FE]/15 border-[#00F2FE]/40 text-[#00F2FE] font-bold"
                      : "bg-white/[0.03] border-white/10 text-[#94A3B8] hover:text-white hover:border-white/20"
                  }`}
                >
                  <Play size={10} className={activeCommand === cmd ? "text-[#00F2FE]" : "text-[#64748B]"} />
                  <span>{cmd}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Architecture */}
      {activeTab === "architecture" && (
        <div className="p-5 md:p-6 space-y-4 min-h-[300px]">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[11px] text-[#94A3B8]">
            <span>System Pipeline Architecture</span>
            <span className="text-[#10B981] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              Live Grid
            </span>
          </div>

          <div className="space-y-3 pt-2">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-[#00F2FE]/20 flex items-center justify-between">
              <div>
                <span className="text-white font-semibold block text-xs">Client Presentation Tier</span>
                <span className="text-[#64748B] text-[10px]">React 19 · Tailwind CSS · 3D GPU Layer</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-[#00F2FE]/10 text-[#00F2FE] font-mono">Edge CDN</span>
            </div>

            <div className="flex justify-center text-[#00F2FE]">
              ↓ ↕ <span className="text-[10px] text-[#64748B] ml-2 font-mono">WebSockets &amp; JSON APIs</span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-[#EAB308]/20 flex items-center justify-between">
              <div>
                <span className="text-white font-semibold block text-xs">Cloud &amp; Distributed Backend</span>
                <span className="text-[#64748B] text-[10px]">Node.js · Go Microservices · Firebase Auth/Sync</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-[#EAB308]/10 text-[#EAB308] font-mono">&lt; 35ms Latency</span>
            </div>

            <div className="flex justify-center text-[#EAB308]">
              ↓ ↕ <span className="text-[10px] text-[#64748B] ml-2 font-mono">MQTT Telemetry &amp; TLS</span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-[#10B981]/20 flex items-center justify-between">
              <div>
                <span className="text-white font-semibold block text-xs">IoT Edge &amp; Storage Tier</span>
                <span className="text-[#64748B] text-[10px]">ESP32 Mesh Nodes · PostgreSQL · TimescaleDB</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-[#10B981]/10 text-[#10B981] font-mono">Encrypted</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Metrics */}
      {activeTab === "metrics" && (
        <div className="p-5 md:p-6 space-y-4 min-h-[300px]">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-[#64748B] block uppercase tracking-wider">System Availability</span>
              <span className="text-xl font-bold text-[#10B981]">99.98%</span>
              <span className="text-[10px] text-[#94A3B8] block mt-1">High Availability SLA</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-[#64748B] block uppercase tracking-wider">API Response Time</span>
              <span className="text-xl font-bold text-[#00F2FE]">~24ms</span>
              <span className="text-[10px] text-[#94A3B8] block mt-1">Global Edge Routing</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-[#64748B] block uppercase tracking-wider">DSA Solved</span>
              <span className="text-xl font-bold text-[#EAB308]">300+</span>
              <span className="text-[10px] text-[#94A3B8] block mt-1">Algorithmic Mastery</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-[#64748B] block uppercase tracking-wider">Projects Shipped</span>
              <span className="text-xl font-bold text-white">18+</span>
              <span className="text-[10px] text-[#94A3B8] block mt-1">Full-Stack &amp; Embedded</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-[#94A3B8] flex items-center justify-between">
            <span>Environment Status:</span>
            <span className="text-[#10B981] font-semibold">● Production Ready (React 19 + Vite 8)</span>
          </div>
        </div>
      )}
    </div>
  );
}
