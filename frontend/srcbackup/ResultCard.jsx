import React, { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ScoreGauge from "./ScoreGauge";
import Charts from "./Charts";
import ExecutiveSummaryCard from "./ExecutiveSummary";
import FinancialBreakdown from "./FinancialBreakdown";
import BusinessTimeline from "./BusinessTimeline";
import {
  Sparkles,
  RotateCcw,
  Download,
  Printer,
  Share2,
  TrendingUp,
  TrendingDown,
  CreditCard,
  FileCheck,
  Smartphone,
  Percent,
  Users,
  Calendar,
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Brain,
  Clock,
  BarChart3,
  Building2,
  Gauge,
  Award,
  PieChart,
  Activity,
  ShieldCheck,
  AlertOctagon,
  Info,
  Landmark,
  ArrowUpRight,
  Star
} from "lucide-react";

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

function getScoreColor(score) {
  if (score >= 750) return "var(--color-success)";
  if (score >= 600) return "var(--color-secondary)";
  if (score >= 400) return "var(--color-warning)";
  return "var(--color-danger)";
}

function getScoreLabel(score) {
  if (score >= 800) return { label: "Exceptional", icon: Star };
  if (score >= 700) return { label: "Excellent", icon: Award };
  if (score >= 600) return { label: "Good", icon: ShieldCheck };
  if (score >= 400) return { label: "Fair", icon: Activity };
  return { label: "Needs Attention", icon: AlertOctagon };
}

function getRiskConfig(level) {
  switch (level?.toLowerCase()) {
    case "low": return { color: "var(--color-success)", bg: "var(--color-success-bg)", icon: ShieldCheck, label: "Low Risk" };
    case "medium": return { color: "var(--color-warning)", bg: "var(--color-warning-bg)", icon: AlertTriangle, label: "Medium Risk" };
    case "high": return { color: "var(--color-danger)", bg: "var(--color-danger-bg)", icon: AlertOctagon, label: "High Risk" };
    default: return { color: "var(--color-info)", bg: "var(--color-info-bg)", icon: Info, label: level || "Unknown" };
  }
}

function generateInsights(formData, result) {
  if (!formData) return [];
  const insights = [];
  const profit = (formData.monthly_revenue || 0) - (formData.monthly_expense || 0);
  const profitMargin = formData.monthly_revenue > 0 ? (profit / formData.monthly_revenue) * 100 : 0;

  if (profitMargin > 25) {
    insights.push({
      icon: TrendingUp, title: "Strong Profit Margins",
      desc: `Your ${profitMargin.toFixed(1)}% profit margin significantly exceeds industry benchmarks. Consider reinvesting in growth initiatives.`,
      impact: "High", color: "var(--color-success)",
    });
  } else if (profitMargin > 10) {
    insights.push({
      icon: TrendingUp, title: "Healthy Profit Margins",
      desc: `At ${profitMargin.toFixed(1)}%, your margins are stable. Focus on cost optimization to drive further growth.`,
      impact: "Medium", color: "var(--color-secondary)",
    });
  } else {
    insights.push({
      icon: TrendingDown, title: "Tight Profit Margins",
      desc: `Your ${profitMargin.toFixed(1)}% margin indicates high costs relative to revenue. Consider expense optimization strategies.`,
      impact: "Action Needed", color: "var(--color-warning)",
    });
  }

  if (formData.gst_compliance_score >= 80) {
    insights.push({
      icon: FileCheck, title: "GST Compliance Excellence",
      desc: "Your GST compliance score places you in the top tier. This strengthens your credibility for loan applications and government tenders.",
      impact: "High", color: "var(--color-success)",
    });
  } else if (formData.gst_compliance_score >= 50) {
    insights.push({
      icon: FileCheck, title: "GST Compliance Needs Improvement",
      desc: `At ${formData.gst_compliance_score}/100, improving your GST compliance could unlock better financing options.`,
      impact: "Medium", color: "var(--color-warning)",
    });
  }

  if (formData.credit_score >= 750) {
    insights.push({
      icon: CreditCard, title: "Premium Credit Profile",
      desc: "Your credit score of 750+ qualifies you for premium lending products with competitive interest rates.",
      impact: "High", color: "var(--color-success)",
    });
  } else if (formData.credit_score >= 650) {
    insights.push({
      icon: CreditCard, title: "Good Credit Standing",
      desc: "Maintain consistent repayment to cross the 750 threshold for better rates.",
      impact: "Medium", color: "var(--color-secondary)",
    });
  }

  if (formData.revenue_growth_percent >= 15) {
    insights.push({
      icon: TrendingUp, title: "High Growth Trajectory",
      desc: `At ${formData.revenue_growth_percent}% growth, your business is expanding rapidly. Ensure operational capacity scales accordingly.`,
      impact: "High", color: "var(--color-success)",
    });
  }

  const dti = formData.debt_to_income_ratio || 0;
  if (dti < 0.3) {
    insights.push({
      icon: Shield, title: "Low Debt Burden",
      desc: "Your debt-to-income ratio indicates strong debt management capacity. You're well-positioned for additional credit if needed.",
      impact: "Positive", color: "var(--color-success)",
    });
  } else if (dti < 0.5) {
    insights.push({
      icon: Shield, title: "Manageable Debt Levels",
      desc: "Your DTI ratio is within acceptable range. Avoid taking on significant new debt until existing obligations reduce.",
      impact: "Info", color: "var(--color-info)",
    });
  }

  if (formData.upi_transaction_count > 100) {
    insights.push({
      icon: Smartphone, title: "Strong Digital Adoption",
      desc: "Your high UPI transaction volume indicates strong digital finance adoption. This positively impacts your alternative credit score.",
      impact: "High", color: "var(--color-primary)",
    });
  }

  return insights;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const cardHover = {
  rest: { y: 0, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" },
  hover: { y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.3)", transition: { duration: 0.3, ease: "easeOut" } },
};

function DashboardHeader({ onReset, handlePrint, handleDownloadPDF }) {
  return (
    <motion.div variants={itemVariants} style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      marginBottom: "2rem", paddingBottom: "1.25rem",
      borderBottom: "1px solid var(--glass-border)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{
          width: 44, height: 44, borderRadius: 14,
          background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 16px var(--color-primary-glow)",
        }}>
          <BarChart3 size={22} color="white" />
        </div>
        <div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-heading)", letterSpacing: "-0.03em" }}>
            Financial Health Dashboard
          </h2>
          <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", fontWeight: 500 }}>
            MSME Alternate Credit Scoring Report
          </p>
        </div>
      </div>

      <div className="no-print" style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
        <motion.button
          className="btn-icon"
          onClick={onReset}
          title="New Assessment"
          whileHover={{ rotate: -90, scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          style={{ width: 38, height: 38 }}
        >
          <RotateCcw size={15} />
        </motion.button>
        <motion.button
          className="btn-icon"
          onClick={handlePrint}
          title="Print Report"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          style={{ width: 38, height: 38 }}
        >
          <Printer size={15} />
        </motion.button>
        <motion.button
          className="btn-icon"
          onClick={handleDownloadPDF}
          title="Download PDF"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          style={{ width: 38, height: 38 }}
        >
          <Download size={15} />
        </motion.button>
        <motion.button
          className="btn-icon"
          title="Share Report"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          style={{ width: 38, height: 38 }}
        >
          <Share2 size={15} />
        </motion.button>
      </div>
    </motion.div>
  );
}

function FinancialHealthHero({ score, riskLevel, loanEligibility, formData }) {
  const scoreInfo = getScoreLabel(score);
  const ScoreIcon = scoreInfo.icon;
  const riskConfig = getRiskConfig(riskLevel);
  const RiskIcon = riskConfig.icon;
  const scoreColor = getScoreColor(score);

  const profit = (formData?.monthly_revenue || 0) - (formData?.monthly_expense || 0);
  const profitMargin = formData?.monthly_revenue > 0 ? (profit / formData?.monthly_revenue) * 100 : 0;

  return (
    <motion.div
      variants={itemVariants}
      style={{
        position: "relative", overflow: "hidden",
        borderRadius: "var(--radius-2xl)",
        background: "linear-gradient(135deg, rgba(108,99,255,0.12), rgba(0,212,170,0.06), rgba(14,16,37,0.9))",
        border: "1px solid var(--glass-border)",
        marginBottom: "2rem",
      }}
    >
      <div style={{
        position: "absolute", top: "-40%", right: "-10%", width: 400, height: 400,
        borderRadius: "50%", background: `radial-gradient(circle, ${scoreColor}15, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{
        display: "grid", gridTemplateColumns: "auto 1fr", gap: "2.5rem",
        padding: "2.5rem", alignItems: "center",
      }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ScoreGauge score={score} riskLevel={riskLevel} />
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <ScoreIcon size={24} color={scoreColor} />
            <span style={{
              fontSize: "1.5rem", fontWeight: 800, color: scoreColor,
              fontFamily: "var(--font-heading)", letterSpacing: "-0.03em",
            }}>
              {scoreInfo.label}
            </span>
          </div>

          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.25rem", lineHeight: 1.5, maxWidth: 480 }}>
            Your business demonstrates {score >= 700 ? "strong" : score >= 500 ? "moderate" : "concerning"} financial fundamentals based on our multi-factor ML analysis.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.5rem 1rem", borderRadius: "var(--radius-md)",
              background: riskConfig.bg, border: `1px solid ${riskConfig.color}20`,
            }}>
              <RiskIcon size={14} color={riskConfig.color} />
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: riskConfig.color, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                {riskConfig.label}
              </span>
            </div>

            <div style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.5rem 1rem", borderRadius: "var(--radius-md)",
              background: "var(--color-primary-subtle)", border: "1px solid rgba(108,99,255,0.2)",
            }}>
              <CheckCircle2 size={14} color="var(--color-primary)" />
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                {loanEligibility || "Assessment Pending"}
              </span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
            {[
              { icon: TrendingUp, label: "Monthly Revenue", value: formatCompact(formData?.monthly_revenue), color: "var(--color-success)" },
              { icon: DollarSign, label: "Profit Margin", value: `${profitMargin.toFixed(1)}%`, color: profitMargin >= 0 ? "var(--color-success)" : "var(--color-danger)" },
              { icon: BarChart3, label: "Credit Score", value: formData?.credit_score || "—", color: "var(--color-info)" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -2, borderColor: "var(--glass-border-hover)", transition: { duration: 0.2 } }}
                style={{
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  padding: "0.65rem 0.85rem", borderRadius: "var(--radius-sm)",
                  background: "var(--bg-elevated)", border: "1px solid var(--glass-border)",
                  cursor: "default",
                }}
              >
                <div style={{
                  width: 34, height: 34, borderRadius: 8,
                  background: `${item.color}15`, display: "flex",
                  alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <item.icon size={15} color={item.color} />
                </div>
                <div>
                  <p style={{ fontSize: "0.6rem", color: "var(--text-tertiary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.1rem" }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function KpiMetricCard({ icon: Icon, label, value, subtext, color, trend }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover="hover"
      initial="rest"
      style={{
        background: "var(--bg-elevated)", border: "1px solid var(--glass-border)",
        borderRadius: "var(--radius-lg)", padding: "1.25rem",
        position: "relative", overflow: "hidden",
        cursor: "default",
      }}
    >
      <div style={{
        position: "absolute", top: 0, right: 0, width: 80, height: 80,
        borderRadius: "0 0 0 80px",
        background: `radial-gradient(circle at top right, ${color}08, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: `${color}15`, display: "flex",
          alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={18} color={color} />
        </div>
        {trend != null && (
          <div style={{
            display: "flex", alignItems: "center", gap: "0.15rem",
            fontSize: "0.65rem", fontWeight: 700,
            color: trend >= 0 ? "var(--color-success)" : "var(--color-danger)",
          }}>
            {trend >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(trend).toFixed(1)}%
          </div>
        )}
      </div>
      <p style={{ fontSize: "0.68rem", color: "var(--text-tertiary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
        {label}
      </p>
      <p style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em", marginBottom: "0.15rem" }}>
        {value}
      </p>
      {subtext && (
        <p style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", fontWeight: 500 }}>
          {subtext}
        </p>
      )}
    </motion.div>
  );
}

function AiInsightCard({ insight, index }) {
  const Icon = insight.icon;
  return (
    <motion.div
      variants={itemVariants}
      whileHover="hover"
      initial="rest"
      style={{
        background: "var(--bg-elevated)", border: "1px solid var(--glass-border)",
        borderRadius: "var(--radius-lg)", padding: "1.5rem",
        borderLeft: `3px solid ${insight.color}`,
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{
          width: 42, height: 42, borderRadius: 12,
          background: `${insight.color}15`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon size={20} color={insight.color} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem" }}>
            <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>
              {insight.title}
            </h4>
            <span style={{
              fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.06em", padding: "0.15rem 0.5rem", borderRadius: 4,
              background: `${insight.color}20`, color: insight.color,
            }}>
              {insight.impact}
            </span>
          </div>
          <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            {insight.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function StrengthCard({ strength, index }) {
  const strengthIcons = {
    "GST": FileCheck,
    "Credit": CreditCard,
    "Revenue": TrendingUp,
    "Repayment": ShieldCheck,
    "Growth": TrendingUp,
    "Digital": Smartphone,
    "Compliance": FileCheck,
    "Income": DollarSign,
    "Debt": Shield,
  };

  const getIcon = () => {
    const key = Object.keys(strengthIcons).find(k => strength.toLowerCase().includes(k.toLowerCase()));
    return key ? strengthIcons[key] : Award;
  };

  const Icon = getIcon();

  return (
    <motion.div
      variants={itemVariants}
      whileHover="hover"
      initial="rest"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid rgba(0,212,170,0.15)",
        borderRadius: "var(--radius-lg)", padding: "1.25rem",
        borderLeft: "3px solid var(--color-success)",
        display: "flex", alignItems: "center", gap: "1rem",
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: "var(--color-success-bg)", display: "flex",
        alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Icon size={20} color="var(--color-success)" />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.15rem" }}>
          {strength}
        </p>
        <p style={{ fontSize: "0.7rem", color: "var(--color-success)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <CheckCircle2 size={11} /> Positive Factor
        </p>
      </div>
    </motion.div>
  );
}

function RiskAnalysisCard({ weakness, index }) {
  const riskIcons = {
    "Expense": TrendingDown,
    "Debt": AlertTriangle,
    "Credit": AlertOctagon,
    "DTI": Percent,
    "Revenue": TrendingDown,
    "Growth": TrendingDown,
    "Compliance": AlertTriangle,
    "Risk": AlertOctagon,
    "Repayment": AlertTriangle,
    "CASH": DollarSign,
  };

  const getIcon = () => {
    const key = Object.keys(riskIcons).find(k => weakness.toLowerCase().includes(k.toLowerCase()));
    return key ? riskIcons[key] : AlertTriangle;
  };

  const Icon = getIcon();
  const severity = weakness.toLowerCase().includes("high") || weakness.toLowerCase().includes("poor") ? "high" : "medium";
  const severityColor = severity === "high" ? "var(--color-danger)" : "var(--color-warning)";

  return (
    <motion.div
      variants={itemVariants}
      whileHover="hover"
      initial="rest"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid rgba(255,71,87,0.12)",
        borderRadius: "var(--radius-lg)", padding: "1.25rem",
        borderLeft: "3px solid var(--color-danger)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: "var(--color-danger-bg)", display: "flex",
          alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Icon size={20} color="var(--color-danger)" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)", flex: 1 }}>
              {weakness}
            </p>
            <span style={{
              fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.06em", padding: "0.15rem 0.5rem", borderRadius: 4,
              background: `${severityColor}20`, color: severityColor,
            }}>
              {severity} Priority
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ flex: 1, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: severity === "high" ? "85%" : "50%" }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                style={{ height: "100%", borderRadius: 2, background: severityColor }}
              />
            </div>
            <span style={{ fontSize: "0.65rem", color: "var(--text-tertiary)", fontWeight: 600 }}>
              Risk Score
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function RecommendationTimelineItem({ rec, index }) {
  const priorityColors = {
    high: "var(--color-danger)",
    medium: "var(--color-warning)",
    low: "var(--color-success)",
  };

  const isLast = false;
  const priority = index < 2 ? "high" : index < 4 ? "medium" : "low";

  return (
    <div style={{ display: "flex", gap: "1rem", position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 28, flexShrink: 0 }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px var(--color-primary-glow)",
          position: "relative", zIndex: 1,
        }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "white" }}>{index + 1}</span>
        </div>
        <div style={{
          width: 2, flex: 1, minHeight: 24,
          background: `linear-gradient(to bottom, var(--color-primary)40, var(--color-primary)05)`,
          marginTop: "0.25rem",
        }} />
      </div>
      <motion.div
        variants={itemVariants}
        style={{
          flex: 1, marginBottom: "1rem",
          background: "var(--bg-elevated)", border: "1px solid var(--glass-border)",
          borderRadius: "var(--radius-md)", padding: "1rem 1.25rem",
        }}
        whileHover={{ x: 4, borderColor: "var(--glass-border-hover)" }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem" }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.15rem", lineHeight: 1.4 }}>
              {rec}
            </p>
          </div>
          <span style={{
            fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.06em", padding: "0.2rem 0.55rem", borderRadius: 4,
            background: `${priorityColors[priority]}20`, color: priorityColors[priority],
            whiteSpace: "nowrap", flexShrink: 0,
          }}>
            {priority === "high" ? "Priority" : priority === "medium" ? "Standard" : "Optional"}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function BusinessSummaryCard({ icon: Icon, label, value, color }) {
  return (
    <motion.div
      variants={itemVariants}
      style={{
        background: "var(--bg-elevated)", border: "1px solid var(--glass-border)",
        borderRadius: "var(--radius-md)", padding: "1rem",
        display: "flex", alignItems: "center", gap: "0.75rem",
      }}
      whileHover={{ y: -2, borderColor: "var(--glass-border-hover)" }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: `${color}15`, display: "flex",
        alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Icon size={18} color={color} />
      </div>
      <div>
        <p style={{ fontSize: "0.65rem", color: "var(--text-tertiary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {label}
        </p>
        <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>
          {value}
        </p>
      </div>
    </motion.div>
  );
}

function ResultCard({ result, formData, onReset }) {
  const reportRef = useRef(null);

  if (!result) return null;

  const {
    financial_health_score,
    risk_level,
    loan_eligibility,
    strengths = [],
    weaknesses = [],
    recommendations = [],
  } = result;

  const insights = useMemo(() => generateInsights(formData, result), [formData, result]);

  const handlePrint = () => window.print();

  const handleDownloadPDF = async () => {
    const element = reportRef.current;
    if (!element) return;
    try {
      const canvas = await html2canvas(element, {
        backgroundColor: "#080914",
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("MSME_Health_Report.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
  };

  const sectionTitle = (icon, title) => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
      <div style={{
        width: 30, height: 30, borderRadius: 8,
        background: "var(--color-primary-subtle)", display: "flex",
        alignItems: "center", justifyContent: "center",
      }}>
        {React.cloneElement(icon, { size: 15 })}
      </div>
      <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}>
        {title}
      </h3>
    </div>
  );

  return (
    <motion.div
      ref={reportRef}
      className="glass-card"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        position: "relative", overflow: "hidden",
        padding: "2rem",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary), var(--color-accent), var(--color-primary))",
        backgroundSize: "300% 100%",
        animation: "borderShine 4s linear infinite",
      }} />

      <DashboardHeader onReset={onReset} handlePrint={handlePrint} handleDownloadPDF={handleDownloadPDF} />

      <FinancialHealthHero
        score={financial_health_score}
        riskLevel={risk_level}
        loanEligibility={loan_eligibility}
        formData={formData}
      />

      <ExecutiveSummaryCard formData={formData} result={result} variants={itemVariants} />

      {formData && (
        <>
          <div style={{ marginBottom: "2rem" }}>
            {sectionTitle(<Gauge size={16} color="var(--color-primary)" />, "Key Performance Indicators")}
            <div className="dash-kpi-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem",
            }}>
              <KpiMetricCard
                icon={TrendingUp} label="Monthly Revenue"
                value={formatCurrency(formData.monthly_revenue)}
                subtext={`${formData.revenue_growth_percent || 0}% growth YoY`}
                color="var(--color-success)"
                trend={formData.revenue_growth_percent}
              />
              <KpiMetricCard
                icon={TrendingDown} label="Monthly Expenses"
                value={formatCurrency(formData.monthly_expense)}
                subtext={formData.monthly_revenue > 0 ? `${((formData.monthly_expense / formData.monthly_revenue) * 100).toFixed(1)}% of revenue` : "—"}
                color="var(--color-accent)"
                trend={null}
              />
              <KpiMetricCard
                icon={FileCheck} label="GST Compliance"
                value={`${formData.gst_compliance_score || 0}/100`}
                subtext={`Turnover: ${formatCompact(formData.gst_turnover)}`}
                color="var(--color-info)"
                trend={null}
              />
              <KpiMetricCard
                icon={CreditCard} label="Credit Score"
                value={formData.credit_score || "—"}
                subtext={`DTI: ${((formData.debt_to_income_ratio || 0) * 100).toFixed(0)}%`}
                color="var(--color-primary)"
                trend={null}
              />
              <KpiMetricCard
                icon={Smartphone} label="UPI Transactions"
                value={formData.upi_transaction_count?.toLocaleString() || "0"}
                subtext={`Volume: ${formatCompact(formData.upi_transaction_amount)}`}
                color="var(--color-success)"
                trend={null}
              />
              <KpiMetricCard
                icon={Percent} label="Growth Rate"
                value={`${formData.revenue_growth_percent || 0}%`}
                subtext="Year-over-year"
                color="var(--color-info)"
                trend={formData.revenue_growth_percent}
              />
            </div>
          </div>

          {insights.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              {sectionTitle(<Brain size={16} color="var(--color-primary)" />, "AI-Powered Insights")}
              <div className="dash-insight-grid" style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem",
              }}>
                {insights.slice(0, 4).map((insight, i) => (
                  <AiInsightCard key={i} insight={insight} index={i} />
                ))}
              </div>
            </div>
          )}

          <div style={{ marginBottom: "2rem" }}>
            {sectionTitle(<PieChart size={16} color="var(--color-primary)" />, "Financial Health Breakdown")}
            <FinancialBreakdown formData={formData} variants={itemVariants} />
          </div>
        </>
      )}

      <div style={{ marginBottom: "2rem" }}>
        {sectionTitle(<Award size={16} color="var(--color-success)" />, "Financial Strengths")}
        <div className="dash-strength-grid" style={{
          display: "grid", gridTemplateColumns: strengths.length > 2 ? "1fr 1fr" : "1fr",
          gap: "0.85rem",
        }}>
          {strengths.length > 0 ? strengths.map((s, i) => (
            <StrengthCard key={i} strength={s} index={i} />
          )) : (
            <p style={{ fontSize: "0.85rem", color: "var(--text-tertiary)", fontStyle: "italic", padding: "0.5rem 0" }}>
              No specific strengths identified for this assessment.
            </p>
          )}
        </div>
      </div>

      {weaknesses.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          {sectionTitle(<Shield size={16} color="var(--color-danger)" />, "Risk Analysis")}
          <div className="dash-risk-grid" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem",
          }}>
            {weaknesses.map((w, i) => (
              <RiskAnalysisCard key={i} weakness={w} index={i} />
            ))}
          </div>
        </div>
      )}

      {formData && (
        <div style={{ marginBottom: "2rem" }}>
          {sectionTitle(<Activity size={16} color="var(--color-primary)" />, "Financial Analytics")}
          <Charts formData={formData} />
        </div>
      )}

      {recommendations.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          {sectionTitle(<Lightbulb size={16} color="var(--color-warning)" />, "Recommendation Timeline")}
          <div style={{ paddingLeft: "0.25rem" }}>
            {recommendations.map((rec, i) => (
              <RecommendationTimelineItem key={i} rec={rec} index={i} />
            ))}
          </div>
        </div>
      )}

      {formData && (
        <div style={{ marginBottom: "2rem" }}>
          {sectionTitle(<Clock size={16} color="var(--color-primary)" />, "Business Journey Timeline")}
          <BusinessTimeline formData={formData} result={result} variants={itemVariants} />
        </div>
      )}

      {formData && (
        <div>
          {sectionTitle(<Building2 size={16} color="var(--color-info)" />, "Business Summary")}
          <div className="dash-summary-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem",
          }}>
            <BusinessSummaryCard
              icon={Calendar} label="Business Age"
              value={`${formData.business_age_years || 0} years`}
              color="var(--color-primary)"
            />
            <BusinessSummaryCard
              icon={Users} label="Employees"
              value={formData.employee_count || 0}
              color="var(--color-info)"
            />
            <BusinessSummaryCard
              icon={Smartphone} label="UPI Transactions"
              value={(formData.upi_transaction_count || 0).toLocaleString()}
              color="var(--color-success)"
            />
            <BusinessSummaryCard
              icon={Landmark} label="Loan Amount"
              value={formatCurrency(formData.existing_loan_amount)}
              color="var(--color-warning)"
            />
          </div>
        </div>
      )}

      <motion.div
        variants={itemVariants}
        style={{
          marginTop: "2rem", paddingTop: "1.25rem",
          borderTop: "1px solid var(--glass-border)",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Sparkles size={14} color="var(--color-warning)" />
          <span style={{ fontSize: "0.7rem", color: "var(--text-tertiary)" }}>
            ML Model: Random Forest Classifier
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "0.65rem", color: "var(--text-tertiary)" }}>
            Report generated in real-time
          </span>
          <span style={{
            width: 4, height: 4, borderRadius: "50%",
            background: "var(--color-success)",
            display: "inline-block",
            animation: "pulse 2s ease-in-out infinite",
          }} />
        </div>
      </motion.div>

    </motion.div>
  );
}

export default ResultCard;
