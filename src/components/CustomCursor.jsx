import React, { useState, useEffect, useRef } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [delayedPos, setDelayedPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const mousePosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable custom cursor if device has fine pointer (mouse/trackpad, not touch)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setEnabled(true);

    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName?.toLowerCase() === "button" ||
        target.tagName?.toLowerCase() === "a" ||
        target.tagName?.toLowerCase() === "input" ||
        target.tagName?.toLowerCase() === "textarea" ||
        target.closest?.("button") ||
        target.closest?.("a") ||
        target.getAttribute?.("role") === "button"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    let animationFrameId;
    const updateFollower = () => {
      setDelayedPos((prev) => {
        const dx = mousePosRef.current.x - prev.x;
        const dy = mousePosRef.current.y - prev.y;
        return { x: prev.x + dx * 0.22, y: prev.y + dy * 0.22 };
      });
      animationFrameId = requestAnimationFrame(updateFollower);
    };

    animationFrameId = requestAnimationFrame(updateFollower);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Primary pinpoint dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-[#F3D082] rounded-full pointer-events-none mix-blend-screen shadow-[0_0_10px_#F3D082]"
        style={{
          transform: `translate3d(${mousePos.x - 4}px, ${mousePos.y - 4}px, 0) scale(${isHovering ? 0 : 1})`,
          transition: "transform 0.1s ease-out, opacity 0.2s ease",
        }}
      />
      {/* Magnetic smooth outer ring */}
      <div
        className="fixed top-0 left-0 w-9 h-9 border border-[#D4AF6A]/50 rounded-full pointer-events-none flex items-center justify-center backdrop-blur-[1px]"
        style={{
          transform: `translate3d(${delayedPos.x - 18}px, ${delayedPos.y - 18}px, 0) scale(${isHovering ? 1.5 : 1})`,
          backgroundColor: isHovering ? "rgba(212, 175, 106, 0.12)" : "transparent",
          borderColor: isHovering ? "rgba(243, 208, 130, 0.8)" : "rgba(212, 175, 106, 0.35)",
          boxShadow: isHovering ? "0 0 20px rgba(212, 175, 106, 0.2)" : "none",
          transition: "transform 0.08s linear, background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
        }}
      >
        <div
          className={`w-1 h-1 bg-[#F3D082] rounded-full transition-opacity duration-300 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
