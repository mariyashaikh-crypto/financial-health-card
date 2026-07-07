import React from "react";
import { motion } from "framer-motion";
import { FileQuestion, BarChart3, Shield, Activity } from "lucide-react";

function EmptyState() {
  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center", padding: "3rem 2rem",
        borderStyle: "dashed", borderWidth: 2,
        borderColor: "rgba(255,255,255,0.1)",
      }}
    >
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "var(--color-primary-subtle)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: "1.5rem",
        }}
      >
        <FileQuestion size={32} style={{ color: "var(--color-primary)", opacity: 0.8 }} />
      </motion.div>

      <h3 style={{
        fontSize: "1.25rem", fontWeight: 700,
        color: "var(--text-primary)", marginBottom: "0.75rem",
        fontFamily: "var(--font-heading)",
      }}>
        Awaiting Assessment
      </h3>

      <p style={{
        fontSize: "0.9rem", color: "var(--text-secondary)",
        lineHeight: 1.6, marginBottom: "2rem", maxWidth: 320,
      }}>
        Input your business credentials and click the diagnosis button. The AI model will calculate your financial health score, loan eligibility status, and provide customized risk analysis in real time.
      </p>

      <div style={{
        display: "flex", flexDirection: "column", gap: "0.75rem",
        textAlign: "left", width: "100%", maxWidth: 320,
        borderTop: "1px dashed rgba(255,255,255,0.06)",
        paddingTop: "1.5rem",
      }}>
        {[
          { icon: BarChart3, text: "Direct API link to Flask Random Forest model" },
          { icon: Activity, text: "Alternate transactional data weights" },
          { icon: Shield, text: "Executive credit recommendation summaries" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-tertiary)" }}>
            <div style={{
              width: 5, height: 5, borderRadius: "50%",
              background: "var(--color-secondary)",
              flexShrink: 0,
            }} />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default EmptyState;
