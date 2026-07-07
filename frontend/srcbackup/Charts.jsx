import React from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  AreaChart, Area, CartesianGrid,
} from "recharts";
import { TrendingUp, FileCheck, CreditCard, IndianRupee } from "lucide-react";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

const chartCardStyle = {
  background: "var(--bg-elevated)",
  border: "1px solid var(--glass-border)",
  borderRadius: "var(--radius-lg)",
  padding: "1.25rem",
  transition: "all 0.3s ease",
};

function RevenueExpenseChart({ revenue, expense }) {
  const data = [
    { name: "Revenue", value: revenue, fill: "var(--color-primary)" },
    { name: "Expense", value: expense, fill: "var(--color-accent)" },
  ];
  const profit = revenue - expense;
  const profitMargin = revenue > 0 ? ((profit / revenue) * 100).toFixed(1) : 0;

  return (
    <motion.div
      style={chartCardStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -2, borderColor: "var(--glass-border-hover)" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(0,212,170,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <TrendingUp size={18} style={{ color: "var(--color-success)" }} />
        </div>
        <div>
          <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>Revenue vs Expense</h4>
          <p style={{ fontSize: "0.7rem", color: "var(--text-tertiary)" }}>Monthly comparison</p>
        </div>
        <div style={{
          marginLeft: "auto", fontSize: "0.7rem", fontWeight: 700,
          padding: "0.2rem 0.5rem", borderRadius: 6,
          background: profit >= 0 ? "var(--color-success-bg)" : "var(--color-danger-bg)",
          color: profit >= 0 ? "var(--color-success)" : "var(--color-danger)",
        }}>
          {profit >= 0 ? "+" : ""}{profitMargin}%
        </div>
      </div>

      <div style={{ height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={40}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
            <XAxis dataKey="name" tick={{ fill: "var(--text-tertiary)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "var(--text-tertiary)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--glass-border)",
                borderRadius: 8,
                boxShadow: "var(--glass-shadow)",
              }}
              formatter={(val) => [formatCurrency(val), ""]}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.03)", marginTop: "0.75rem" }}>
        Net Profit: <strong style={{ color: profit >= 0 ? "var(--color-success)" : "var(--color-danger)" }}>{formatCurrency(profit)}</strong>
      </div>
    </motion.div>
  );
}

function GSTChart({ complianceScore, turnover }) {
  const score = Math.min(Math.max(complianceScore || 0, 0), 100);
  const remaining = 100 - score;

  const pieData = [
    { name: "Compliance Score", value: score },
    { name: "Gap", value: remaining },
  ];

  const getScoreColor = () => {
    if (score >= 80) return "var(--color-success)";
    if (score >= 50) return "var(--color-warning)";
    return "var(--color-danger)";
  };

  return (
    <motion.div
      style={chartCardStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{ y: -2, borderColor: "var(--glass-border-hover)" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(77,171,247,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <FileCheck size={18} style={{ color: "var(--color-info)" }} />
        </div>
        <div>
          <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>GST Compliance</h4>
          <p style={{ fontSize: "0.7rem", color: "var(--text-tertiary)" }}>Score & turnover analysis</p>
        </div>
        <span style={{
          marginLeft: "auto", fontSize: "0.7rem", fontWeight: 700,
          padding: "0.2rem 0.5rem", borderRadius: 6,
          background: `${getScoreColor()}15`,
          color: getScoreColor(),
        }}>
          {score >= 80 ? "Excellent" : score >= 50 ? "Average" : "Poor"}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{ width: 120, height: 120, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%" cy="50%"
                innerRadius={32}
                outerRadius={52}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                <Cell fill={getScoreColor()} />
                <Cell fill="rgba(255,255,255,0.04)" />
              </Pie>
              <text x="60" y="63" textAnchor="middle" dominantBaseline="central"
                fill="var(--text-primary)" fontSize="22" fontWeight="700"
                fontFamily="var(--font-heading)">
                {score}
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.3rem 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>Annual Turnover</span>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
              {formatCurrency(turnover || 0)}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.3rem 0" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>Compliance Score</span>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: getScoreColor(), fontFamily: "var(--font-mono)" }}>
              {score}/100
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function UPIChart({ count, amount }) {
  const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  const trendData = months.map((m, i) => {
    const base = (amount || 0) / 3;
    return {
      month: m,
      count: Math.round((count || 0) / 3 * (0.7 + Math.random() * 0.6)),
      volume: Math.round(base * (0.7 + Math.random() * 0.6)),
    };
  });

  return (
    <motion.div
      style={chartCardStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ y: -2, borderColor: "var(--glass-border-hover)" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(108,99,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CreditCard size={18} style={{ color: "var(--color-primary)" }} />
        </div>
        <div>
          <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>UPI Transactions</h4>
          <p style={{ fontSize: "0.7rem", color: "var(--text-tertiary)" }}>Monthly digital activity</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", borderRadius: "var(--radius-sm)", background: "rgba(108,99,255,0.05)" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(108,99,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CreditCard size={18} style={{ color: "var(--color-primary)" }} />
          </div>
          <div>
            <p style={{ fontSize: "0.65rem", color: "var(--text-tertiary)", fontWeight: 500 }}>Txn Count</p>
            <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
              {count?.toLocaleString?.() || 0}
            </p>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", borderRadius: "var(--radius-sm)", background: "rgba(0,212,170,0.05)" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(0,212,170,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IndianRupee size={18} style={{ color: "var(--color-success)" }} />
          </div>
          <div>
            <p style={{ fontSize: "0.65rem", color: "var(--text-tertiary)", fontWeight: 500 }}>Txn Volume</p>
            <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
              {formatCurrency(amount || 0)}
            </p>
          </div>
        </div>
      </div>

      <div style={{ height: 80 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="volumeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
            <XAxis dataKey="month" tick={{ fill: "var(--text-tertiary)", fontSize: 9 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--glass-border)",
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(val) => [formatCurrency(val), "Volume"]}
            />
            <Area type="monotone" dataKey="volume" stroke="var(--color-primary)" fill="url(#volumeGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

function Charts({ formData }) {
  if (!formData) return null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
      <RevenueExpenseChart revenue={formData.monthly_revenue} expense={formData.monthly_expense} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <GSTChart complianceScore={formData.gst_compliance_score} turnover={formData.gst_turnover} />
        <UPIChart count={formData.upi_transaction_count} amount={formData.upi_transaction_amount} />
      </div>
      <style>{`
        @media (max-width: 640px) {
          .charts-grid-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default Charts;
