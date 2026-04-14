"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Database, Megaphone, DollarSign } from "lucide-react";

const nodes = [
  {
    id: "ai",
    icon: Brain,
    label: "AI Automation",
    description: "Intelligent workflows that learn and improve",
    position: { x: 50, y: 10 },
    color: "#7C3AED",
  },
  {
    id: "data",
    icon: Database,
    label: "Customer Data",
    description: "Deep insights into behavior and preferences",
    position: { x: 90, y: 40 },
    color: "#F59E0B",
  },
  {
    id: "ads",
    icon: Megaphone,
    label: "Smarter Ads",
    description: "Precision-targeted campaigns that convert",
    position: { x: 50, y: 70 },
    color: "#10B981",
  },
  {
    id: "revenue",
    icon: DollarSign,
    label: "Revenue Growth",
    description: "Compounding returns that scale your business",
    position: { x: 10, y: 40 },
    color: "#EC4899",
  },
];

const connections = [
  { from: "ai", to: "data" },
  { from: "data", to: "ads" },
  { from: "ads", to: "revenue" },
  { from: "revenue", to: "ai" },
];

export default function ConvergenceEngine() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [animatedNodes, setAnimatedNodes] = useState<string[]>([]);

  const handleNodeHover = (nodeId: string | null) => {
    setHoveredNode(nodeId);
    if (nodeId) {
      setAnimatedNodes((prev) => [...prev, nodeId]);
      setTimeout(() => {
        setAnimatedNodes((prev) => prev.filter((id) => id !== nodeId));
      }, 1000);
    }
  };

  return (
    <section aria-label="Technology integrations and convergence engine"
      id="convergence"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124, 58, 237, 0.1) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[85vw] mx-auto px-6 relative z-10">
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
            The System
          </p>
          <h2
            className="text-3xl md:text-5xl mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text)",
            }}
          >
            Convergence Engine
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Four forces. One flywheel. Compound growth on autopilot.
          </p>
        </motion.div>

        {/* Flywheel SVG */}
        <motion.div
          className="relative max-w-xl mx-auto aspect-square"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full"
          >
            {/* Outer ring - visible dashed circle */}
            <circle
              cx="200"
              cy="200"
              r="180"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeDasharray="12 8"
              opacity="0.4"
            />

            {/* Inner ring */}
            <circle
              cx="200"
              cy="200"
              r="100"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1.5"
              strokeDasharray="8 6"
              opacity="0.5"
            />

            {/* Connection lines */}
            {connections.map((conn, i) => {
              const fromNode = nodes.find((n) => n.id === conn.from);
              const toNode = nodes.find((n) => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              const x1 = (fromNode.position.x / 100) * 280 + 60;
              const y1 = (fromNode.position.y / 100) * 280 + 60;
              const x2 = (toNode.position.x / 100) * 280 + 60;
              const y2 = (toNode.position.y / 100) * 280 + 60;

              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={hoveredNode === conn.from ? fromNode.color : "var(--accent)"}
                  strokeWidth="3"
                  strokeDasharray="12 6"
                  className="transition-all duration-300"
                  opacity="0.7"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-36"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </line>
              );
            })}

            {/* Center text */}
            <text
              x="200"
              y="195"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--text)"
              fontSize="14"
              fontWeight="600"
              fontFamily="var(--font-sans)"
            >
              Compound
            </text>
            <text
              x="200"
              y="215"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--accent)"
              fontSize="14"
              fontWeight="600"
              fontFamily="var(--font-sans)"
            >
              Growth
            </text>

            {/* Nodes */}
            {nodes.map((node) => {
              const x = (node.position.x / 100) * 280 + 60;
              const y = (node.position.y / 100) * 280 + 60;
              const isHovered = hoveredNode === node.id;
              const isAnimated = animatedNodes.includes(node.id);

              return (
                <g
                  key={node.id}
                  transform={`translate(${x}, ${y})`}
                  onMouseEnter={() => handleNodeHover(node.id)}
                  onMouseLeave={() => handleNodeHover(null)}
                  className="cursor-pointer"
                >
                  {/* Pulse effect */}
                  {(isHovered || isAnimated) && (
                    <circle
                      r="35"
                      fill="none"
                      stroke={node.color}
                      strokeWidth="2"
                      opacity="0.5"
                    >
                      <animate
                        attributeName="r"
                        from="25"
                        to="45"
                        dur="0.8s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.5"
                        to="0"
                        dur="0.8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}

                  {/* Node circle */}
                  <circle
                    r="32"
                    fill="var(--surface)"
                    stroke={isHovered ? node.color : "var(--accent)"}
                    strokeWidth="2.5"
                    style={{
                      filter: isHovered
                        ? `drop-shadow(0 0 20px ${node.color})`
                        : "drop-shadow(0 0 8px rgba(124, 58, 237, 0.3))",
                    }}
                  />

                  {/* Icon */}
                  <g transform="translate(-14, -14)">
                    <node.icon
                      size={28}
                      style={{ color: isHovered ? node.color : "var(--accent)" }}
                      strokeWidth={1.5}
                    />
                  </g>

                  {/* Label */}
                  <text
                    y="55"
                    textAnchor="middle"
                    fill="var(--text)"
                    fontSize="12"
                    fontWeight="700"
                    fontFamily="var(--font-sans)"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Tooltip */}
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 p-4 rounded-xl text-center"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
              }}
            >
              <p
                className="font-semibold mb-1"
                style={{ color: "var(--text)" }}
              >
                {nodes.find((n) => n.id === hoveredNode)?.label}
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                {nodes.find((n) => n.id === hoveredNode)?.description}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
