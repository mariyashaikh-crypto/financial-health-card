import React from "react";
import { motion } from "framer-motion";
import {
  Brain, TrendingUp, Shield, CheckCircle2, ShieldCheck, Zap
} from "lucide-react";

function ExecutiveSummaryCard({ formData, result, variants }) {
  if (!formData) return null;

  const profit = (formData.monthly_revenue || 0) - (formData.monthly_expense || 0);
  const profitMargin = formData.monthly_revenue > 0 ? (profit / formData.monthly_revenue) * 100 : 0;
  const score = result?.financial_health_score || 0;

  let summaryText = "";
  let healthLabel = "";
  let healthColor = "var(--color-success)";

  if (score >= 750) {
    summaryText = "Exceptional financial health. Strong revenue generation, excellent credit behaviour, and robust compliance practices position this business for favourable lending outcomes.";
    healthLabel = "Strong Financial Position";
  } else if (score >= 600) {
    summaryText = "Satisfactory financial standing with stable revenue streams and manageable credit exposure. Targeted improvements in digital adoption and expense optimisation can enhance the score further.";
    healthLabel = "Stable Outlook";
    healthColor = "var(--color-secondary)";
  } else if (score >= 400) {
    summaryText = "Moderate financial health with identified risk factors. Revenue stability is adequate but credit behaviour and cost management require strategic attention to improve the overall profile.";
    healthLabel = "Watch List";
    healthColor = "var(--color-warning)";
  } else {
    summaryText = "Concerning financial indicators detected. Immediate intervention needed across revenue generation, expense management, and credit discipline to restore financial viability.";
    healthLabel = "Turnaround Needed";
    healthColor = "var(--color-danger)";
  }

  return (
    <motion.div
      variants={variants}
      style={{
        background: `linear-gradient(135deg, ${healthColor}08, var(--bg-elevated), ${healthColor}05)`,
        border: `1px solid ${healthColor}20`,
        borderRadius: "var(--radius-xl)",
        padding: "1.5rem",
        marginBottom: "2rem",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: "-50%", right: "-10%", width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${healthColor}10, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: `${healthColor}15`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, border: `1px solid ${healthColor}20`,
        }}>
          <Brain size={24} color={healthColor} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>
              AI Executive Summary
            </h3>
            <span style={{
              fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.06em", padding: "0.2rem 0.6rem", borderRadius: 4,
              background: `${healthColor}20`, color: healthColor,
              border: `1px solid ${healthColor}20`,
            }}>
              <ShieldCheck size={10} style={{ marginRight: "0.2rem", display: "inline" }} />
              {healthLabel}
            </span>
            <span style={{
              fontSize: "0.6rem", fontWeight: 600,
              padding: "0.2rem 0.5rem", borderRadius: 4,
              background: "var(--color-primary-subtle)",
              color: "var(--color-primary)",
              display: "flex", alignItems: "center", gap: "0.2rem",
            }}>
              <Zap size={10} /> AI Verified
            </span>
          </div>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 680 }}>
            {summaryText}
          </p>
          <div style={{
            display: "flex", gap: "1.5rem", marginTop: "1rem",
            flexWrap: "wrap",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <TrendingUp size={12} color={profitMargin >= 0 ? "var(--color-success)" : "var(--color-danger)"} />
              <span style={{ fontSize: "0.72rem", color: "var(--text-tertiary)" }}>
                Margin: <strong style={{ color: profitMargin >= 0 ? "var(--color-success)" : "var(--color-danger)" }}>{profitMargin.toFixed(1)}%</strong>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Shield size={12} color={result?.risk_level === "Low" ? "var(--color-success)" : "var(--color-warning)"} />
              <span style={{ fontSize: "0.72rem", color: "var(--text-tertiary)" }}>
                Risk: <strong style={{ color: result?.risk_level === "Low" ? "var(--color-success)" : "var(--color-warning)" }}>{result?.risk_level || "—"}</strong>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <CheckCircle2 size={12} color="var(--color-info)" />
              <span style={{ fontSize: "0.72rem", color: "var(--text-tertiary)" }}>
                Eligibility: <strong style={{ color: "var(--color-info)" }}>{result?.loan_eligibility || "—"}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ExecutiveSummaryCard;
