"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "The team delivered a fully functional app in 6 weeks. Their AI integration cut our customer service load by 40%. We recouped the investment in the first month.",
    name: "Marcus Chen",
    title: "CEO",
    company: "Bloom Botanics",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote:
      "We went from struggling with disconnected tools to having one cohesive system. Ejago's automation pipeline saved us 20+ hours per week.",
    name: "Sarah Mitchell",
    title: "COO",
    company: "Meridian Capital",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote:
      "240% ROAS improvement in 90 days. The convergence strategy — combining data, automation, and ads — was the differentiator.",
    name: "James Okonkwo",
    title: "Founder",
    company: "Orbit Media",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const startAutoRotation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  const stopAutoRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoRotation();
    return () => stopAutoRotation();
  }, []);

  const handleMouseEnter = () => {
    stopAutoRotation();
  };

  const handleMouseLeave = () => {
    startAutoRotation();
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section
      id="testimonials"
      className="py-24 md:py-32"
      style={{ backgroundColor: "var(--bg)" }}
    >
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
            Client Stories
          </p>
          <h2
            className="text-3xl md:text-5xl mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text)",
            }}
          >
            What Our Clients Say
          </h2>
        </motion.div>

        {/* Testimonials carousel */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={sectionRef}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[0, 1, 2].map((offset) => {
                const index = (currentIndex + offset) % testimonials.length;
                const t = testimonials[index];
                const isCenter = offset === 1;

                return (
                  <div
                    key={t.name}
                    className={`p-8 rounded-2xl transition-all ${
                      isCenter ? "" : "hidden md:block opacity-50"
                    }`}
                    style={{
                      backgroundColor: "var(--surface)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {/* Quote */}
                    <p
                      className="text-base md:text-lg italic mb-6"
                      style={{
                        color: "var(--text)",
                        lineHeight: 1.7,
                      }}
                    >
                      "{t.quote}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p
                          className="font-semibold"
                          style={{ color: "var(--text)" }}
                        >
                          {t.name}
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {t.title}, {t.company}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text)",
              }}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    index === currentIndex ? "w-6" : ""
                  }`}
                  style={{
                    backgroundColor:
                      index === currentIndex
                        ? "var(--accent)"
                        : "var(--border)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text)",
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
