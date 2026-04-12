"use client";
import React from "react";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Plug,
  Brain,
  BarChart3,
  Share2,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    href: "/services/website-development",
    description: "Custom websites that convert visitors into customers.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    href: "/services/mobile-apps",
    description: "Native and cross-platform apps that users love.",
  },
  {
    icon: Plug,
    title: "Custom Integrations",
    href: "/services/custom-integrations",
    description: "Connect your tools into one seamless workflow.",
  },
  {
    icon: Brain,
    title: "AI Automation",
    href: "/services/ai-automation",
    description: "Eliminate manual tasks with intelligent workflows.",
  },
  {
    icon: BarChart3,
    title: "Google Ads",
    href: "/services/google-ads",
    description: "Data-driven campaigns that maximize your ROAS.",
  },
  {
    icon: Share2,
    title: "Meta & TikTok Ads",
    href: "/services/meta-tiktok-ads",
    description: "Platform-native ads that capture attention.",
  },
];

export default function ServicesGrid() {
  return (
    <section
      id="services"
      className="py-20 md:py-24 relative"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Top gradient bleed from trustbar */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{background:"linear-gradient(to bottom, rgba(28,28,34,1), rgba(10,10,14,0.3), transparent)"}} />
      {/* Bottom gradient bleed into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{background:"linear-gradient(to top, rgba(28,28,34,1), rgba(10,10,14,0.3), transparent)"}} />

      <div className="max-w-[85vw] mx-auto px-6">
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
            What We Do
          </p>
          <h2
            className="text-3xl md:text-5xl mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text)",
            }}
          >
            Full-Stack Digital Services
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            From websites to AI automation, we handle every aspect of your
            digital presence — so you can focus on growing your business.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <a
              key={service.title}
              href={service.href}
              className="group block relative p-8 rounded-2xl cursor-pointer transition-all duration-300"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(124, 58, 237, 0.1), transparent)",
                  border: "1px solid var(--accent)",
                }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-colors"
                  style={{ backgroundColor: "var(--surface-alt)" }}
                >
                  <service.icon
                    size={36}
                    style={{ color: "var(--accent)" }}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <h3
                  className="text-xl font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--text)",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-base mb-6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {service.description}
                </p>

                {/* Arrow indicator */}
                <div className="flex items-center gap-2 text-sm font-medium transition-colors group-hover:gap-3">
                  <span style={{ color: "var(--accent)" }}>Learn more</span>
                  <ArrowRight
                    size={16}
                    style={{ color: "var(--accent)" }}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
