"use client";
import React from "react";

import { motion } from "framer-motion";
import { Shield, Award, Clock, Users, Star, Zap } from "lucide-react";

const trustItems = [
  { icon: Shield, label: "60+ Projects Delivered" },
  { icon: Award, label: "LA-Based Agency" },
  { icon: Star, label: "4.9★ on Clutch" },
  { icon: Users, label: "500+ Happy Clients" },
  { icon: Clock, label: "24/7 Support" },
  { icon: Zap, label: "7-Day Fast Delivery" },
];

export default function TrustBar() {
  return (
    <section
      id="trust-bar"
      className="py-12 overflow-hidden relative"
      style={{ backgroundColor: "var(--surface-alt)" }}
    >
      {/* Gradient fade at top — blends from hero dark */}
      <div
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none trust-gradient-top"
        style={{
          background: "linear-gradient(to bottom, var(--gradient-overlay, transparent), transparent)",
        }}
      />
      {/* Gradient fade at bottom — blends into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none trust-gradient-bottom"
        style={{
          background: "linear-gradient(to top, var(--gradient-overlay, transparent), transparent)",
        }}
      />

      <div className="relative">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{
            background: "linear-gradient(to right, var(--surface-alt), transparent)",
          }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{
            background: "linear-gradient(to left, var(--surface-alt), transparent)",
          }}
        />

        {/* Marquee content */}
        <div className="flex stitch-marquee">
          {[...trustItems, ...trustItems].map((item, index) => (
            <div
              key={index}
              aria-hidden={index >= trustItems.length}
              className="flex items-center gap-3 px-8 whitespace-nowrap trust-item"
            >
              <item.icon
                size={24}
                style={{ color: "var(--accent)" }}
                strokeWidth={1.5}
              />
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--text)" }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
