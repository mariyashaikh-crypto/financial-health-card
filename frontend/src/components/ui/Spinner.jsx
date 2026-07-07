import React from "react";
import { motion } from "framer-motion";
import { Cpu, Brain, TrendingUp, FileText } from "lucide-react";

const steps = [
  { icon: Brain, text: "Analyzing financial data..." },
  { icon: TrendingUp, text: "Running ML prediction model..." },
  { icon: FileText, text: "Generating credit report..." },
];

function Spinner() {
  const [stepIndex, setStepIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((i) => (i < steps.length - 1 ? i + 1 : i));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="spinner-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem",
        gap: "2rem",
      }}
    >
      <div style={{ position: "relative", width: 80, height: 80 }}>
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "3px solid transparent",
            borderTopColor: "var(--color-primary)",
            borderRightColor: "var(--color-secondary)",
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        <motion.div
          style={{
            position: "absolute",
            inset: 8,
            borderRadius: "50%",
            border: "3px solid transparent",
            borderBottomColor: "var(--color-accent)",
            borderLeftColor: "var(--color-primary)",
          }}
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <Cpu size={28} style={{ color: "var(--color-primary)", opacity: 0.6 }} />
        </motion.div>
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: "1.1rem", fontFamily: "var(--font-heading)", marginBottom: "0.5rem" }}>
          Processing Assessment
        </p>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
          {steps[stepIndex].text}
        </p>
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        {steps.map((s, i) => (
          <motion.div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: i <= stepIndex ? "var(--color-primary)" : "var(--bg-tertiary)",
            }}
            animate={{ scale: i === stepIndex ? [1, 1.5, 1] : 1 }}
            transition={{ repeat: i === stepIndex ? Infinity : 0, duration: 1 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default Spinner;
