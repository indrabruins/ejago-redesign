"use client";

import { motion } from "framer-motion";
import { Wrench, Cpu, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Wrench,
    title: "Build",
    description:
      "We engineer your digital product — websites, apps, or custom integrations built to scale.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Automate",
    description:
      "We layer in AI workflows that eliminate manual bottlenecks and free up your time.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Scale",
    description:
      "We drive targeted traffic via Google, Meta, and TikTok — optimized continuously by the data AI collects.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 md:py-32"
      style={{ backgroundColor: "var(--surface-alt)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: "var(--accent)" }}
          >
            Our Process
          </p>
          <h2
            className="text-3xl md:text-5xl mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text)",
            }}
          >
            How It Works
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Three steps. One seamless system. No handoffs, no confusion.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="hidden lg:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-violet-500 via-amber-500 to-emerald-500" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                {/* Number badge */}
                <div className="relative inline-flex mb-8">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--surface)" }}
                  >
                    <step.icon
                      size={36}
                      style={{ color: "var(--accent)" }}
                      strokeWidth={1.5}
                    />
                  </div>
                  <span
                    className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      backgroundColor: "var(--accent)",
                      color: "white",
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text)",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-base max-w-sm mx-auto"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {step.description}
                </p>

                {/* Arrow between steps - desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-4 transform translate-x-1/2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{ color: "var(--accent)" }}
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
