"use client";
import React from "react";

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

export default function BigFooterCTA() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "var(--accent)" }}
    >
      {/* Decorative glow blobs */}
      <div
        className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full stitch-blob-1"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full stitch-blob-2"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-px stitch-shimmer"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl md:text-5xl lg:text-6xl mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "white",
            }}
          >
            Ready for Compounding Growth?
          </h2>
          <p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            style={{ color: "rgba(255, 255, 255, 0.8)" }}
          >
            No pitch deck. No vague promises. Just a real conversation about
            your growth.
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-xl font-semibold text-lg transition-all stitch-spring-btn"
            style={{
              backgroundColor: "white",
              color: "var(--accent)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            }}
          >
            <Calendar size={24} />
            Book Your Free Strategy Call
            <ArrowRight
              size={24}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </motion.div>
      </div>

      {/* Bottom shimmer line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px stitch-shimmer"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
        }}
      />
    </section>
  );
}
