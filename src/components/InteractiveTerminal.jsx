import React, { useState, useEffect } from "react";
import { Copy, Check, RotateCcw } from "lucide-react";

export default function InteractiveTerminal() {
  const [step, setStep] = useState(0);
  const [cmd1, setCmd1] = useState("");
  const [cmd2, setCmd2] = useState("");
  const [cmd3, setCmd3] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let t1 = "whoami";
    let i1 = 0;
    let int1;

    const startDelay = setTimeout(() => {
      int1 = setInterval(() => {
        setCmd1(t1.slice(0, i1 + 1));
        i1++;

        if (i1 === t1.length) {
          clearInterval(int1);
          setTimeout(() => setStep(1), 500);
        }
      }, 100);
    }, 800);

    return () => {
      clearTimeout(startDelay);
      clearInterval(int1);
    };
  }, []);

  useEffect(() => {
    if (step >= 1 && !cmd2) {
      let t2 = "cat profile.json";
      let i2 = 0;

      let int2 = setInterval(() => {
        setCmd2(t2.slice(0, i2 + 1));
        i2++;

        if (i2 === t2.length) {
          clearInterval(int2);
          setTimeout(() => setStep(2), 500);
        }
      }, 80);

      return () => clearInterval(int2);
    }
  }, [step]);

  useEffect(() => {
    if (step >= 2 && !cmd3) {
      let t3 = "./deploy --stack full-stack";
      let i3 = 0;

      let int3 = setInterval(() => {
        setCmd3(t3.slice(0, i3 + 1));
        i3++;

        if (i3 === t3.length) {
          clearInterval(int3);
          setTimeout(() => setStep(3), 600);
          setTimeout(() => setStep(4), 1200);
          setTimeout(() => setStep(5), 1800);
          setTimeout(() => setStep(6), 2400);
          setTimeout(() => setStep(7), 3000);
        }
      }, 70);

      return () => clearInterval(int3);
    }
  }, [step]);

  const copyTerminalContent = () => {
    const text = `dhiraj@engineer:~$ whoami\nDhiraj Kumar (Full-Stack & IoT Engineer)\ndhiraj@engineer:~$ cat profile.json\n{\n  "name": "Dhiraj Kumar",\n  "stack": ["React", "Node.js", "Python", "Go", "IoT"],\n  "status": "Available for opportunities"\n}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const rerunTerminal = () => {
    setStep(0);
    setCmd1("");
    setCmd2("");
    setCmd3("");
    setTimeout(() => {
      let t1 = "whoami";
      let i1 = 0;
      let int1 = setInterval(() => {
        setCmd1(t1.slice(0, i1 + 1));
        i1++;
        if (i1 === t1.length) {
          clearInterval(int1);
          setTimeout(() => setStep(1), 500);
        }
      }, 100);
    }, 100);
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-[#090D14]/90 backdrop-blur-xl shadow-2xl font-mono text-xs sm:text-[13px] text-left">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0D121D] border-b border-white/10 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]/90 hover:opacity-80 transition-opacity" />
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]/90 hover:opacity-80 transition-opacity" />
          <div className="w-3 h-3 rounded-full bg-[#10B981]/90 hover:opacity-80 transition-opacity" />
          <span className="ml-2 text-[#64748B] text-[11px] font-mono hidden sm:inline">
            dhiraj@workstation:~
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={rerunTerminal}
            title="Replay commands"
            className="p-1.5 rounded-md hover:bg-white/10 text-[#64748B] hover:text-[#F3D082] transition-colors"
          >
            <RotateCcw size={13} />
          </button>
          <button
            onClick={copyTerminalContent}
            title="Copy snippet"
            className="p-1.5 rounded-md hover:bg-white/10 text-[#64748B] hover:text-[#F3D082] transition-colors"
          >
            {copied ? <Check size={13} className="text-[#10B981]" /> : <Copy size={13} />}
          </button>
        </div>
      </div>

      {/* Terminal Content Body */}
      <div className="p-5 md:p-6 space-y-3.5 text-[#E2E8F0] leading-relaxed max-h-[460px] overflow-y-auto">
        {/* CMD 1 */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[#10B981] font-semibold">dhiraj@engineer</span>
            <span className="text-[#38BDF8]">:~</span>
            <span className="text-[#94A3B8]">$</span>
            <span className="text-white">{cmd1}</span>
            {step === 0 && (
              <span className="w-2 h-4 bg-[#F3D082] inline-block animate-pulse align-middle" />
            )}
          </div>

          {step >= 1 && (
            <div className="mt-1.5 pl-3 border-l-2 border-[#10B981]/40 text-[#94A3B8]">
              Dhiraj Kumar — Full-Stack Engineer &amp; IoT Specialist
            </div>
          )}
        </div>

        {/* CMD 2 */}
        {step >= 1 && (
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[#10B981] font-semibold">dhiraj@engineer</span>
              <span className="text-[#38BDF8]">:~</span>
              <span className="text-[#94A3B8]">$</span>
              <span className="text-white">{cmd2}</span>
              {step === 1 && (
                <span className="w-2 h-4 bg-[#F3D082] inline-block animate-pulse align-middle" />
              )}
            </div>

            {step >= 2 && (
              <div className="mt-1.5 p-3 rounded-lg bg-black/40 border border-white/5 text-[#E2E8F0] space-y-1">
                <div>
                  <span className="text-[#38BDF8]">"engineer"</span>: <span className="text-[#F3D082]">"Dhiraj Kumar"</span>,
                </div>
                <div>
                  <span className="text-[#38BDF8]">"specialization"</span>: <span className="text-[#F3D082]">["Full-Stack Web", "IoT Systems", "Cloud APIs"]</span>,
                </div>
                <div>
                  <span className="text-[#38BDF8]">"core_stack"</span>: <span className="text-[#F3D082]">["React", "Node.js", "Python", "Go", "Docker", "AWS"]</span>,
                </div>
                <div>
                  <span className="text-[#38BDF8]">"status"</span>: <span className="text-[#10B981]">"Ready to innovate &amp; ship"</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CMD 3 */}
        {step >= 2 && (
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[#10B981] font-semibold">dhiraj@engineer</span>
              <span className="text-[#38BDF8]">:~</span>
              <span className="text-[#94A3B8]">$</span>
              <span className="text-white">{cmd3}</span>
              {step === 2 && (
                <span className="w-2 h-4 bg-[#F3D082] inline-block animate-pulse align-middle" />
              )}
            </div>

            <div className="mt-2 space-y-1 text-xs">
              {step >= 3 && (
                <div className="text-[#94A3B8] flex items-center gap-2">
                  <span className="text-[#10B981]">✔</span> Cloud data pipeline connected
                </div>
              )}
              {step >= 4 && (
                <div className="text-[#94A3B8] flex items-center gap-2">
                  <span className="text-[#10B981]">✔</span> Real-time telemetry streams active
                </div>
              )}
              {step >= 5 && (
                <div className="text-[#94A3B8] flex items-center gap-2">
                  <span className="text-[#10B981]">✔</span> Microservices health check passed
                </div>
              )}
              {step >= 6 && (
                <div className="text-[#10B981] font-medium flex items-center gap-2">
                  <span>🚀</span> Production ready &amp; listening on port 443
                </div>
              )}
            </div>
          </div>
        )}

        {/* Final Active Cursor */}
        {step >= 7 && (
          <div className="pt-2 flex items-center gap-2">
            <span className="text-[#10B981] font-semibold">dhiraj@engineer</span>
            <span className="text-[#38BDF8]">:~</span>
            <span className="text-[#94A3B8]">$</span>
            <span className="w-2 h-4 bg-[#E2E8F0] inline-block animate-pulse align-middle" />
          </div>
        )}
      </div>
    </div>
  );
}
