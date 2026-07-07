import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const GRADIENT_COLORS = {
  excellent: { stops: ["#00d4aa", "#00f5d4"], glow: "rgba(0,212,170,0.5)" },
  good: { stops: ["#6c63ff", "#00d4aa"], glow: "rgba(108,99,255,0.4)" },
  average: { stops: ["#ffb347", "#ff8c00"], glow: "rgba(255,179,71,0.4)" },
  poor: { stops: ["#ff4757", "#ff6b81"], glow: "rgba(255,71,87,0.5)" },
};

function getScoreConfig(score) {
  if (score >= 750) return { ...GRADIENT_COLORS.excellent, label: "Excellent", key: "excellent" };
  if (score >= 600) return { ...GRADIENT_COLORS.good, label: "Good", key: "good" };
  if (score >= 400) return { ...GRADIENT_COLORS.average, label: "Average", key: "average" };
  return { ...GRADIENT_COLORS.poor, label: "High Risk", key: "poor" };
}

function ScoreGauge({ score, riskLevel }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  const maxScore = 1000;
  const percentage = Math.min(Math.max(score / maxScore, 0), 1);
  const radius = 96;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - percentage * circumference;

  const config = getScoreConfig(score);

  useEffect(() => {
    setAnimatedScore(score);
    const controls = animate(count, score, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [score, count]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative",
      }}
    >
      <svg width="260" height="270" viewBox="0 0 260 270">
        <defs>
          <linearGradient id="gauge-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={config.stops[0]} stopOpacity="1" />
            <stop offset="100%" stopColor={config.stops[1]} stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="gauge-track" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.03)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
          </linearGradient>
          <filter id="gauge-glow">
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor={config.glow} floodOpacity="0.6" />
          </filter>
          <filter id="gauge-glow-subtle">
            <feDropShadow dx="0" dy="0" stdDeviation="20" floodColor={config.glow} floodOpacity="0.2" />
          </filter>
        </defs>

        <circle cx="130" cy="130" r={radius + 14} fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="28" />

        <circle cx="130" cy="130" r={radius} fill="none" stroke="url(#gauge-track)" strokeWidth={strokeWidth} />

        <motion.circle
          cx="130" cy="130" r={radius}
          fill="none" stroke="url(#gauge-fill)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          transform="rotate(-90 130 130)"
          filter="url(#gauge-glow)"
          initial={false}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.circle
          cx="130" cy="130" r={radius - strokeWidth / 2}
          fill="none" stroke={config.stops[0]}
          strokeWidth="1"
          opacity="0.15"
          strokeDasharray="4 6"
          initial={false}
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.text
          x="130" y="115"
          fill="var(--text-primary)"
          textAnchor="middle"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "3.2rem",
            fontWeight: 800,
            letterSpacing: "-0.04em",
          }}
        >
          {rounded}
        </motion.text>

        <text
          x="130" y="147"
          fill="var(--text-secondary)"
          textAnchor="middle"
          style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em" }}
        >
          OF 1000
        </text>

        <motion.text
          x="130" y="175"
          fill={config.stops[0]}
          textAnchor="middle"
          style={{ fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.02em" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          {config.label}
        </motion.text>
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{
          display: "inline-flex", alignItems: "center", gap: "0.4rem",
          padding: "0.3rem 0.85rem", borderRadius: 20,
          fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.1em", marginTop: "0.15rem",
          background: `${config.stops[0]}18`,
          border: `1px solid ${config.stops[0]}30`,
          color: config.stops[0],
        }}
      >
        <motion.span
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 6, height: 6, borderRadius: "50%",
            background: config.stops[0], display: "inline-block",
          }}
        />
        {riskLevel || config.label}
      </motion.div>
    </motion.div>
  );
}

export default ScoreGauge;
