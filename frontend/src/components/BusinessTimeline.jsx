import React from "react";
import { motion } from "framer-motion";
import { Building2, TrendingUp, FileCheck, Award, Brain } from "lucide-react";

function formatCurrency(amount) {
  if (amount == null) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatCompact(num) {
  if (num == null) return "—";
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
  return `₹${num}`;
}

function BusinessTimeline({ formData, result, variants }) {
  if (!formData) return null;

  const milestones = [
    {
      year: `${formData.business_age_years || 0} yrs ago`,
      title: "Business Started",
      desc: `${formData.employee_count || 0} employees · ${formData.industry_type || "—"}`,
      icon: Building2,
      color: "var(--color-primary)",
    },
    {
      year: "Current",
      title: "Revenue Growth",
      desc: `${formData.revenue_growth_percent || 0}% YoY · ${formatCurrency(formData.monthly_revenue)}/mo`,
      icon: TrendingUp,
      color: "var(--color-success)",
    },
    {
      year: "Compliance",
      title: "GST Performance",
      desc: `${formData.gst_compliance_score || 0}/100 · ${formatCompact(formData.gst_turnover)} turnover`,
      icon: FileCheck,
      color: "var(--color-info)",
    },
    {
      year: "Credit",
      title: "Credit Behaviour",
      desc: `Score ${formData.credit_score || 0} · ${formData.repayment_history || "—"} · DTI ${((formData.debt_to_income_ratio || 0) * 100).toFixed(0)}%`,
      icon: Award,
      color: "var(--color-warning)",
    },
    {
      year: "Assessment",
      title: "AI-Powered Analysis",
      desc: `Score ${result?.financial_health_score || 0}/1000 · ${result?.risk_level || "—"} Risk · ${result?.loan_eligibility || "—"}`,
      icon: Brain,
      color: "var(--color-accent)",
    },
  ];

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", left: 23, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, var(--color-primary), var(--color-secondary), var(--color-info), var(--color-warning), var(--color-accent))", opacity: 0.3 }} />
      {milestones.map((m, i) => {
        const Icon = m.icon;
        return (
          <motion.div
            key={i}
            variants={variants}
            style={{ display: "flex", gap: "1rem", marginBottom: "1rem", position: "relative" }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: `${m.color}15`, border: `2px solid ${m.color}40`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, position: "relative", zIndex: 1,
            }}>
              <Icon size={20} color={m.color} />
            </div>
            <div style={{
              flex: 1, background: "var(--bg-elevated)",
              border: "1px solid var(--glass-border)",
              borderRadius: "var(--radius-md)", padding: "1rem 1.25rem",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 700, color: m.color, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {m.year}
                </span>
              </div>
              <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.1rem" }}>
                {m.title}
              </p>
              <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                {m.desc}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default BusinessTimeline;
