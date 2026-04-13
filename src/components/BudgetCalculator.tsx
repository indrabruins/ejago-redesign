"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Clock, ArrowRight } from "lucide-react";

const goals = [
  { value: "leads", label: "More Leads" },
  { value: "revenue", label: "More Revenue" },
  { value: "costs", label: "Lower Costs" },
  { value: "all", label: "All of the Above" },
];

function calculateEstimates(spend: number, goal: string) {
  // Base ROAS multipliers based on goal
  const roasMultipliers: Record<string, number> = {
    leads: 2.0,
    revenue: 3.5,
    costs: 1.5,
    all: 2.8,
  };

  const multiplier = roasMultipliers[goal] || 2.5;
  const currentRoas = 1.5; // industry average
  const projectedRoas = currentRoas * multiplier;

  const roasImprovement = ((projectedRoas - currentRoas) / currentRoas) * 100;
  const potentialRevenueLift = spend * (projectedRoas - currentRoas);
  const hoursSavedPerWeek = Math.round((spend / 1000) * 2); // 2 hours per $1K spend

  return {
    roasImprovement: Math.round(roasImprovement),
    currentRoas: currentRoas.toFixed(1),
    projectedRoas: projectedRoas.toFixed(1),
    potentialRevenueLift: Math.round(potentialRevenueLift),
    hoursSavedPerWeek,
  };
}

export default function BudgetCalculator() {
  const [spend, setSpend] = useState(10000);
  const [goal, setGoal] = useState("all");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const estimates = calculateEstimates(spend, goal);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: import.meta.env.PUBLIC_WEB3FORMS_KEY,
        subject: `Budget Estimate — ${goal || "General"}`,
        email,
        spend,
        goal,
        estimatedRoasLift: estimates.roasImprovement,
        estimatedRevenueLift: estimates.potentialRevenueLift,
        website: "",
      }),
    });

    if (response.ok) {
      setSubmitted(true);
    }
    setLoading(false);
  };

  return (
    <section
      id="budget"
      className="py-24 md:py-32"
      style={{ backgroundColor: "var(--surface-alt)" }}
    >
      <div className="max-w-[85vw] mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Left - Calculator */}
          <div
            className="p-8 md:p-12 rounded-3xl"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <h2
              className="text-2xl md:text-3xl mb-8"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text)",
              }}
            >
              Estimate Your Growth
            </h2>

            {/* Spend slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <label
                  className="font-medium"
                  style={{ color: "var(--text)" }}
                >
                  Monthly Ad Spend
                </label>
                <span
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--accent)",
                  }}
                >
                  ${spend.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={spend}
                onChange={(e) => setSpend(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${
                    ((spend - 1000) / (100000 - 1000)) * 100
                  }%, var(--border) ${((spend - 1000) / (100000 - 1000)) * 100}%, var(--border) 100%)`,
                }}
              />
              <div
                className="flex justify-between text-xs mt-2"
                style={{ color: "var(--text-secondary)" }}
              >
                <span>$1K</span>
                <span>$100K</span>
              </div>
            </div>

            {/* Goal dropdown */}
            <div className="mb-8">
              <label
                className="block font-medium mb-4"
                style={{ color: "var(--text)" }}
              >
                Primary Goal
              </label>
              <div className="grid grid-cols-2 gap-3">
                {goals.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setGoal(g.value)}
                    className="p-4 rounded-xl text-sm font-medium transition-all cursor-pointer"
                    style={{
                      backgroundColor:
                        goal === g.value ? "var(--accent)" : "var(--surface-alt)",
                      color: goal === g.value ? "white" : "var(--text)",
                      border:
                        goal === g.value
                          ? "none"
                          : "1px solid var(--border)",
                    }}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Estimates */}
            <div className="grid grid-cols-3 gap-4 p-6 rounded-xl" style={{ backgroundColor: "var(--surface-alt)" }}>
              <div className="text-center">
                <TrendingUp
                  size={20}
                  style={{ color: "var(--success)", margin: "0 auto 8px" }}
                />
                <div
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--success)",
                  }}
                >
                  +{estimates.roasImprovement}%
                </div>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  ROAS Lift
                </p>
              </div>
              <div className="text-center">
                <DollarSign
                  size={20}
                  style={{ color: "var(--amber)", margin: "0 auto 8px" }}
                />
                <div
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--amber)",
                  }}
                >
                  ${(estimates.potentialRevenueLift / 1000).toFixed(0)}K
                </div>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Revenue Lift
                </p>
              </div>
              <div className="text-center">
                <Clock
                  size={20}
                  style={{ color: "var(--accent)", margin: "0 auto 8px" }}
                />
                <div
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--accent)",
                  }}
                >
                  {estimates.hoursSavedPerWeek}h
                </div>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Hours Saved
                </p>
              </div>
            </div>

            <p
              className="text-xs mt-4 text-center"
              style={{ color: "var(--text-secondary)" }}
            >
              * Estimates based on average client performance. Actual results
              may vary.
            </p>
          </div>

          {/* Right - Email capture */}
          <div className="text-center lg:text-left">
            <h2
              className="text-3xl md:text-4xl mb-6"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text)",
              }}
            >
              Get Your ROI Projection Report
            </h2>
            <p
              className="text-lg mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Enter your email and we'll send you a detailed growth analysis
              with specific recommendations for your business.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input name="website" type="text" tabIndex={-1} autoComplete="off" style={{position:"absolute",left:"-9999px"}} aria-hidden="true" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full max-w-md px-6 py-4 rounded-xl text-base"
                  style={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full max-w-md flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all cursor-pointer"
                  style={{
                    backgroundColor: loading ? "var(--text-secondary)" : "var(--accent)",
                    color: "white",
                  }}
                >
                  {loading ? "Sending..." : (
                    <>
                      Get ROI Projection Report
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl"
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid var(--success)",
                }}
              >
                <TrendingUp
                  size={48}
                  style={{
                    color: "var(--success)",
                    margin: "0 auto 16px",
                  }}
                />
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "var(--success)" }}
                >
                  You're All Set!
                </h3>
                <p
                  className="text-base"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Check your inbox for your personalized growth analysis.
                </p>
              </motion.div>
            )}

            <p
              className="text-xs mt-6"
              style={{ color: "var(--text-secondary)" }}
            >
              No spam. No pitch decks. Just real advice.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
