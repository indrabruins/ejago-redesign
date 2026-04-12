"use client";
import React from "react";

import { motion } from "framer-motion";
import { ArrowRight, Target, TrendingUp, Zap } from "lucide-react";

export default function CaseStudySpotlight() {
  return (
    <section
      id="case-study"
      className="py-24 md:py-32"
      style={{ backgroundColor: "var(--surface-alt)" }}
    >
      <div className="max-w-[85vw] mx-auto px-6">
        <motion.div
          className="relative overflow-hidden rounded-3xl p-12 md:p-16"
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Background decoration */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: "var(--success)" }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Left - Client info */}
            <div className="lg:col-span-1">
              <p
                className="text-sm font-semibold tracking-widest uppercase mb-4"
                style={{ color: "var(--accent)" }}
              >
                Featured Case Study
              </p>
              <h2
                className="text-4xl md:text-5xl mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--text)",
                }}
              >
                Bloom
                <br />
                Botanics
              </h2>
              <p
                className="text-lg"
                style={{ color: "var(--text-secondary)" }}
              >
                E-commerce Wellness Brand
              </p>
            </div>

            {/* Center - Challenge & Approach */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Target
                    size={24}
                    style={{ color: "var(--amber)" }}
                    strokeWidth={1.5}
                  />
                  <div>
                    <h4
                      className="font-semibold mb-2"
                      style={{ color: "var(--text)" }}
                    >
                      The Challenge
                    </h4>
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Low conversion rates and high customer acquisition costs
                      were eating into margins. Manual order processing created
                      bottlenecks during peak periods.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Zap
                    size={24}
                    style={{ color: "var(--accent)" }}
                    strokeWidth={1.5}
                  />
                  <div>
                    <h4
                      className="font-semibold mb-2"
                      style={{ color: "var(--text)" }}
                    >
                      Our Approach
                    </h4>
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Built a custom e-commerce platform with AI-powered
                      inventory management, automated email flows, and
                      precision-targeted Meta & Google campaigns.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Big metric */}
            <div className="lg:col-span-1 text-center lg:text-right">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div
                  className="inline-block px-8 py-6 rounded-2xl"
                  style={{
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid var(--success)",
                  }}
                >
                  <TrendingUp
                    size={32}
                    style={{ color: "var(--success)", marginBottom: "8px" }}
                  />
                  <div
                    className="text-6xl md:text-7xl font-bold mb-2"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--success)",
                    }}
                  >
                    +240%
                  </div>
                  <p
                    className="text-sm font-semibold uppercase tracking-wider"
                    style={{ color: "var(--success)" }}
                  >
                    ROAS in 90 Days
                  </p>
                </div>
              </motion.div>

              <a
                href="/work"
                className="inline-flex items-center gap-2 mt-6 text-sm font-medium transition-colors"
                style={{ color: "var(--accent)" }}
              >
                See All Case Studies
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
