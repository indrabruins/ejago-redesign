"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 cursor-pointer"
      style={{
        backgroundColor: "var(--accent)",
        color: "white",
        boxShadow: "0 4px 20px rgba(124, 58, 237, 0.4)",
      }}
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
