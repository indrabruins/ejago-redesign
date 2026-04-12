"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 60, suffix: "%+", label: "Cost Reduction" },
  { value: 7, suffix: "-Day", label: "First Delivery" },
  { value: 100, prefix: "$", suffix: "K+", label: "Saved per Client" },
  { value: 240, suffix: "%", label: "Avg ROAS" },
  { value: 50, suffix: "+", label: "Projects" },
  { value: 98, suffix: "%", label: "Client Retention" },
];

function useCountUp(
  end: number,
  duration: number = 1500,
  start: number = 0,
  isInView: boolean
) {
  const [count, setCount] = useState(end); // Start at final value — no confusing zeros
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;
    setHasAnimated(true);

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // easeOutExpo
      const easeOutExpo =
        progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      // Start from 30% so there's visible movement without showing zeros
      const startVal = Math.floor(end * 0.3);
      const currentCount = Math.floor(easeOutExpo * (end - startVal) + startVal);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration, hasAnimated]);

  return count;
}

function StatCard({
  stat,
  isInView,
  index,
}: {
  stat: (typeof stats)[0];
  isInView: boolean;
  index: number;
}) {
  const count = useCountUp(stat.value, 1500, 0, isInView);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--text)",
        }}
      >
        {stat.prefix}
        {count}
        {stat.suffix}
      </div>
      <p
        className="text-sm md:text-base font-medium"
        style={{ color: "var(--text-secondary)" }}
      >
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-24 relative"
      style={{ backgroundColor: "var(--surface)" }}
    >
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none" style={{background:"linear-gradient(to bottom, rgba(28,28,34,0.9), transparent)"}} />
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{background:"linear-gradient(to top, rgba(28,28,34,0.9), transparent)"}} />
      <div className="max-w-[85vw] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              isInView={isInView}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
