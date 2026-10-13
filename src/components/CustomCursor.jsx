import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop devices with fine pointer (mouse/trackpad)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    let ticking = false;

    const handleMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setPosition({ x: e.clientX, y: e.clientY });
          if (!visible) setVisible(true);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [visible]);

  // If not visible or on mobile/touch, render nothing (no double pointer, zero lag)
  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden lg:block overflow-hidden"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Sleek subtle ambient spotlight that illuminates cards and elements under the native cursor */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 500,
          height: 500,
          transform: `translate3d(${position.x - 250}px, ${position.y - 250}px, 0)`,
          background: "radial-gradient(circle, rgba(0, 242, 254, 0.05) 0%, rgba(234, 179, 8, 0.02) 40%, transparent 70%)",
          filter: "blur(20px)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
