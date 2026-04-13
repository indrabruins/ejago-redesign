"use client";

import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, Calendar } from "lucide-react";
import { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    // Init scroll-triggered stitch animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    document
      .querySelectorAll(
        ".stitch-fade-up,.stitch-fade-down,.stitch-fade-left,.stitch-fade-right,.stitch-scale-in"
      )
      .forEach((el) => observer.observe(el));

    // Parallax on blobs
    const blobs = document.querySelectorAll("[data-parallax]");
    const handleParallax = () => {
      const scrollY = window.scrollY;
      blobs.forEach((blob) => {
        const speed = parseFloat(blob.dataset.parallax || "0.3");
        (blob as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
      });
    };
    window.addEventListener("scroll", handleParallax, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleParallax);
    };
  }, []);

  const scrollToNext = () => {
    const trustBar = document.getElementById("trust-bar");
    if (trustBar) trustBar.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* ── Hero Background Image ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/ejago-hero-v2.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.35,
        }}
      />

      {/* ── Dark gradient overlay ── */}
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,14,0.85) 0%, rgba(10,10,14,0.4) 40%, rgba(10,10,14,0.75) 100%)",
        }}
      />

      {/* ── Animated Mesh Gradient Blobs (Stitch animated) ── */}
      <div className="absolute inset-0 overflow-hidden z-2">
        {/* Violet blob — top left */}
        <div
          className="absolute -top-1/4 -left-1/4 w-[700px] h-[700px] stitch-blob-1"
          data-parallax="0.15"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.55) 0%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />
        {/* Amber blob — bottom right */}
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] stitch-blob-2"
          data-parallax="0.1"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,0.45) 0%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />
        {/* Emerald blob — center right */}
        <div
          className="absolute top-1/3 -right-1/6 w-[500px] h-[500px] stitch-blob-3"
          data-parallax="0.2"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.35) 0%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />
        {/* Center glow accent */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] stitch-blob-1 stitch-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Hero Content ── */}
      <div className="relative z-10 w-full max-w-[85vw] mx-auto px-6 md:px-10 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Tagline pill */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 stitch-fade-up"
            style={{
              backgroundColor: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(124,58,237,0.3)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span
              className="w-2 h-2 rounded-full stitch-pulse-glow"
              style={{ backgroundColor: "var(--success)" }}
            />
            <span
              className="text-sm font-medium tracking-wide"
              style={{ color: "var(--accent)" }}
            >
              Full-Stack Digital Agency — Los Angeles
            </span>
          </motion.div>

          {/* Main Headline */}
          <h1
            className="text-4xl md:text-6xl lg:text-[80px] mb-8 leading-[1.05] tracking-tight stitch-fade-up stitch-delay-2"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text)",
            }}
          >
            240% Avg ROAS. We Build. <span style={{ color: "var(--accent)" }}>We Scale.</span> We Automate.
          </h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 stitch-fade-up stitch-delay-3"
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            AI automation + performance ads. One team. One system.{" "}
            <span className="font-semibold" style={{ color: "var(--text)" }}>
              Results that compound.
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 stitch-fade-up stitch-delay-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a
              href="/#contact"
              className="group flex items-center gap-2 px-10 py-5 rounded-xl font-semibold text-lg transition-all w-full sm:w-auto justify-center stitch-spring-btn"
              style={{
                backgroundColor: "var(--accent)",
                color: "white",
                boxShadow: "0 8px 32px rgba(124,58,237,0.3)",
              }}
            >
              Start a Project
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="https://calendly.com/indra-ejago"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-10 py-5 rounded-xl font-semibold text-lg transition-all w-full sm:w-auto justify-center stitch-hover-border-glow stitch-fade-up stitch-delay-5"
              style={{
                backgroundColor: "transparent",
                color: "var(--accent)",
                border: "2px solid var(--accent)",
              }}
            >
              <Calendar size={20} />
              Book a Call
            </a>
          </motion.div>

          {/* Social proof micro-bar */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 stitch-fade-up stitch-delay-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {[
              "60+ Projects Delivered",
              "240% Avg ROAS",
              "LA-Based Team",
              "4.9★ on Clutch",
            ].map((item, i) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm stitch-fade-up"
                style={{
                  color: "white",
                  textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                  transitionDelay: `${0.9 + i * 0.1}s`,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full stitch-pulse-glow"
                  style={{ backgroundColor: "var(--amber)" }}
                />
                {item}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 stitch-fade-up stitch-delay-8"
        style={{ color: "var(--text-secondary)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2 }}
        aria-label="Scroll down"
      >
        <span className="text-xs font-medium tracking-wider uppercase">
          Scroll
        </span>
        <ChevronDown
          size={24}
          className="stitch-chevron-bounce"
        />
      </button>
    </section>
  );
}
