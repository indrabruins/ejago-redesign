"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How fast can you deliver?",
    answer:
      "We move fast without cutting corners. Our typical timeline: Discovery and strategy (1 week), Design and prototyping (1-2 weeks), Development and testing (2-4 weeks), Launch and optimization (1 week). For urgent projects, we offer accelerated timelines with a dedicated sprint team. Most projects are live within 7-21 days.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Our pricing scales with your ambitions. Website projects typically start at $8K, AI automation at $12K, and full-stack growth packages from $15K/month. We don't believe in one-size-fits-all pricing — every proposal is custom-built around your goals, competitive landscape, and growth targets. Book a call for a detailed breakdown.",
  },
  {
    question: "What if I already tried AI and it failed?",
    answer:
      "Most AI failures come from poor implementation, not AI itself. We've rescued dozens of 'broken AI' setups and turned them into revenue generators. We start with a thorough audit of what didn't work, identify the gaps, and rebuild with proper data foundations, human oversight loops, and measurable KPIs. AI works — when it's done right.",
  },
  {
    question: "Do you work with startups or only enterprises?",
    answer:
      "We love working with growth-stage companies (Series A to Series C) that are ready to scale. Our typical client: $1M-$20M ARR, has product-market fit, needs to accelerate growth but lacks internal bandwidth. We're not the right fit for early-stage idea phase or massive enterprise with slow procurement cycles. If you need to grow fast and make decisions quickly, we're built for that.",
  },
  {
    question: "What's your process?",
    answer:
      "We start with a 2-week deep dive: competitive analysis, audience research, technical audit, and opportunity mapping. Then we present a custom growth strategy with clear milestones, timelines, and KPIs. Once aligned, we execute in focused sprints with weekly updates and real-time dashboards. No black boxes, no mystery — just transparent execution and measurable results.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Launch is just the beginning. We provide 30 days of dedicated support post-launch to squash any bugs and optimize performance. Beyond that, most clients stay on our retainer for ongoing optimization. We set up monitoring dashboards so you can see real-time performance, and we conduct monthly strategy reviews to keep iterating and improving. We're in it for the long haul.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(index);
    }
  };

  return (
    <section
      id="faq"
      className="py-24 md:py-32"
      style={{ backgroundColor: "var(--surface-alt)" }}
    >
      <div className="max-w-3xl mx-auto px-6">
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
            FAQ
          </p>
          <h2
            className="text-3xl md:text-5xl mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text)",
            }}
          >
            Questions? Answered.
          </h2>
          <p
            className="text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Everything you need to know before getting started.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  id={`faq-button-${index}`}
                  onClick={() => toggle(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full p-6 rounded-xl flex items-center justify-between text-left cursor-pointer transition-colors"
                  style={{
                    backgroundColor: isOpen ? "var(--surface)" : "var(--surface)",
                    border: `1px solid ${isOpen ? "var(--accent)" : "var(--border)"}`,
                  }}
                >
                  <span
                    className="text-lg font-semibold pr-8"
                    style={{ color: "var(--text)" }}
                  >
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                    style={{ color: "var(--accent)" }}
                  >
                    {isOpen ? (
                      <Minus size={20} />
                    ) : (
                      <Plus size={20} />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-button-${index}`}
                    >
                      <div
                        className="p-6 pt-4"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
