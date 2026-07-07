import React from "react";
import { motion } from "framer-motion";
import { Check, Building2, TrendingUp, CreditCard, Award } from "lucide-react";

const steps = [
  { key: "profile", label: "Business", icon: Building2 },
  { key: "financial", label: "Financials", icon: TrendingUp },
  { key: "digital", label: "Digital", icon: CreditCard },
  { key: "credit", label: "Credit", icon: Award },
];

function StepIndicator({ active, hasErrors }) {
  const activeIdx = steps.findIndex((s) => s.key === active);
  const progress = ((activeIdx + 1) / steps.length) * 100;

  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1rem",
      }}>
        {steps.map((step, i) => {
          const isActive = i === activeIdx;
          const isCompleted = i < activeIdx;
          const isError = hasErrors(step.key);
          const Icon = step.icon;

          return (
            <div
              key={step.key}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.35rem",
                flex: 1,
              }}
            >
              <motion.div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-heading)",
                  border: "2px solid",
                  borderColor: isError
                    ? "var(--color-danger)"
                    : isCompleted
                    ? "var(--color-success)"
                    : isActive
                    ? "var(--color-primary)"
                    : "var(--glass-border)",
                  background: isError
                    ? "var(--color-danger-bg)"
                    : isCompleted
                    ? "var(--color-success-bg)"
                    : isActive
                    ? "var(--color-primary-subtle)"
                    : "transparent",
                  color: isError
                    ? "var(--color-danger)"
                    : isCompleted
                    ? "var(--color-success)"
                    : isActive
                    ? "var(--color-primary)"
                    : "var(--text-tertiary)",
                  position: "relative",
                }}
                whileHover={{ scale: 1.1 }}
                animate={isActive ? { scale: [1, 1.08, 1] } : {}}
                transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
              >
                {isCompleted ? <Check size={16} /> : <Icon size={16} />}
              </motion.div>
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive
                    ? "var(--text-primary)"
                    : isCompleted
                    ? "var(--text-secondary)"
                    : "var(--text-tertiary)",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{
        width: "100%", height: 4,
        background: "rgba(255,255,255,0.04)",
        borderRadius: 4, overflow: "hidden", position: "relative",
      }}>
        <motion.div
          style={{
            height: "100%", borderRadius: 4,
            background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
          }}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          display: "flex",
        }}>
          {steps.slice(0, -1).map((_, i) => (
            <div key={i} style={{ flex: 1, borderRight: "1px solid rgba(255,255,255,0.05)" }} />
          ))}
        </div>
      </div>

      <div style={{
        display: "flex", justifyContent: "space-between", marginTop: "0.4rem",
      }}>
        <span style={{ fontSize: "0.6rem", color: "var(--text-tertiary)" }}>
          Step {activeIdx + 1} of {steps.length}
        </span>
        <span style={{ fontSize: "0.6rem", color: "var(--text-tertiary)" }}>
          {Math.round(progress)}% Complete
        </span>
      </div>
    </div>
  );
}

export default StepIndicator;
