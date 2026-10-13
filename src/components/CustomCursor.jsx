import React, { useState, useEffect, useRef } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [delayedPos, setDelayedPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const mousePosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setEnabled(true);

    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.tagName?.toLowerCase() === "button" ||
        target.tagName?.toLowerCase() === "a" ||
        target.tagName?.toLowerCase() === "input" ||
        target.tagName?.toLowerCase() === "textarea" ||
        target.tagName?.toLowerCase() === "label" ||
        target.closest?.("button") ||
        target.closest?.("a") ||
        target.getAttribute?.("role") === "button";
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp   = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup",   handleMouseUp);

    let animId;
    const updateFollower = () => {
      setDelayedPos((prev) => {
        const dx = mousePosRef.current.x - prev.x;
        const dy = mousePosRef.current.y - prev.y;
        return { x: prev.x + dx * 0.18, y: prev.y + dy * 0.18 };
      });
      animId = requestAnimationFrame(updateFollower);
    };
    animId = requestAnimationFrame(updateFollower);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup",   handleMouseUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Primary dot */}
      <div
        className="cursor-main fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          width:  isHovering ? 0 : 8,
          height: isHovering ? 0 : 8,
          transform: `translate3d(${mousePos.x - 4}px, ${mousePos.y - 4}px, 0) scale(${isClicking ? 0.5 : 1})`,
          transition: "transform 0.08s ease-out, width 0.2s ease, height 0.2s ease",
          background: 'radial-gradient(circle, #FFD97D 0%, #C9A84C 60%, transparent 100%)',
          boxShadow: '0 0 12px #FFD97D, 0 0 25px rgba(200,160,70,0.5)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Outer magnetic ring */}
      <div
        className="cursor-ring fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          width:  isHovering ? 50 : 36,
          height: isHovering ? 50 : 36,
          transform: `translate3d(${delayedPos.x - (isHovering ? 25 : 18)}px, ${delayedPos.y - (isHovering ? 25 : 18)}px, 0) scale(${isClicking ? 0.8 : 1})`,
          border:           isHovering ? '1.5px solid rgba(200,160,70,0.9)' : '1.5px solid rgba(200,160,70,0.45)',
          backgroundColor:  isHovering ? 'rgba(200,160,70,0.10)' : 'transparent',
          boxShadow:        isHovering ? '0 0 20px rgba(200,160,70,0.25), inset 0 0 10px rgba(200,160,70,0.1)' : 'none',
          transition: "transform 0.06s linear, width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease, border-radius 0.25s ease",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Inner dot on hover */}
        <div
          style={{
            width: isHovering ? 4 : 0,
            height: isHovering ? 4 : 0,
            borderRadius: '50%',
            background: '#F0C96E',
            transition: 'all 0.25s ease',
          }}
        />
      </div>
    </div>
  );
}
