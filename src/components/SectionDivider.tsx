/**
 * SectionDivider - Full-width gradient bridge between sections
 * Creates visual connection instead of void gaps
 */
export default function SectionDivider({ variant = "bridge" }: { variant?: "bridge" | "line" | "fade" }) {
  if (variant === "line") {
    return (
      <div
        className="w-full h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.15) 20%, rgba(124,58,237,0.15) 80%, transparent)",
        }}
      />
    );
  }

  if (variant === "fade") {
    return (
      <div
        className="w-full h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3) 50%, transparent)",
        }}
      />
    );
  }

  // bridge: full gradient section connecting two dark sections
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "120px", marginTop: "-60px", marginBottom: "-60px", zIndex: 5 }}
    >
      {/* Center glow orb */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[120px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)",
        }}
      />
      {/* Subtle top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 5%, rgba(124,58,237,0.2) 30%, rgba(124,58,237,0.2) 70%, transparent 95%)",
        }}
      />
      {/* Subtle bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 5%, rgba(124,58,237,0.1) 30%, rgba(124,58,237,0.1) 70%, transparent 95%)",
        }}
      />
    </div>
  );
}
