import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Award, Shield, Smartphone, FileCheck } from "lucide-react";

function FinancialBreakdownCard({ label, score, maxScore, icon: Icon, color, description, variants }) {
  const pct = maxScore > 0 ? Math.min(score / maxScore, 1) : 0;
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -3, borderColor: `${color}40` }}
      style={{
        background: "var(--bg-elevated)", border: `1px solid ${color}15`,
        borderRadius: "var(--radius-lg)", padding: "1.25rem",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, borderRadius: "0 0 0 60px", background: `${color}08`, pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={17} color={color} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }}>{label}</p>
          {description && <p style={{ fontSize: "0.65rem", color: "var(--text-tertiary)", marginTop: "0.05rem" }}>{description}</p>}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.04)", overflow: "hidden" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct * 100}%` }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: "100%", borderRadius: 3, background: `linear-gradient(90deg, ${color}, ${color}80)` }}
          />
        </div>
        <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-heading)", minWidth: 40, textAlign: "right" }}>
          {score}{maxScore ? `/${maxScore}` : ""}
        </span>
      </div>
    </motion.div>
  );
}

function FinancialBreakdown({ formData, variants }) {
  if (!formData) return null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.85rem" }} className="dash-breakdown-grid">
      <FinancialBreakdownCard
        label="Revenue Quality" score={Math.min(formData.monthly_revenue / 5000, 100)} maxScore={100}
        icon={TrendingUp} color="var(--color-success)" variants={variants}
        description="Revenue stability and growth trajectory"
      />
      <FinancialBreakdownCard
        label="Credit Behaviour" score={formData.credit_score} maxScore={900}
        icon={Award} color="var(--color-primary)" variants={variants}
        description="Bureau score and repayment pattern"
      />
      <FinancialBreakdownCard
        label="Debt Health" score={Math.max(0, 100 - (formData.debt_to_income_ratio || 0) * 100)} maxScore={100}
        icon={Shield} color="var(--color-info)" variants={variants}
        description="Debt-to-income ratio assessment"
      />
      <FinancialBreakdownCard
        label="Digital Presence" score={Math.min((formData.upi_transaction_count || 0) / 2, 100)} maxScore={100}
        icon={Smartphone} color="var(--color-secondary)" variants={variants}
        description="UPI transaction volume and consistency"
      />
      <FinancialBreakdownCard
        label="GST Compliance" score={formData.gst_compliance_score} maxScore={100}
        icon={FileCheck} color="var(--color-warning)" variants={variants}
        description="GST filing compliance score"
      />
      <FinancialBreakdownCard
        label="Growth Potential" score={Math.min(Math.max(formData.revenue_growth_percent || 0, 0), 100)} maxScore={100}
        icon={TrendingUp} color="var(--color-accent)" variants={variants}
        description="Revenue growth momentum"
      />
    </div>
  );
}

export { FinancialBreakdownCard };
export default FinancialBreakdown;
