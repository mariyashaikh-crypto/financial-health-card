import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Shield, Activity, BarChart3, Zap,
  CheckCircle2, TrendingUp, Sparkles,
  Globe, Lock, Cpu
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

function FloatingStatCard({ value, label, icon: Icon, color, delay, style: posStyle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "rgba(12, 13, 26, 0.8)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "var(--radius-lg)",
        padding: "0.9rem 1.15rem",
        display: "flex", alignItems: "center", gap: "0.7rem",
        position: "absolute",
        boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
        ...posStyle,
      }}
      whileHover={{ y: -6, borderColor: "rgba(255,255,255,0.12)", transition: { duration: 0.25 } }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: `${color}15`, display: "flex",
        alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={16} color={color} />
      </div>
      <div>
        <p style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}>
          {value}
        </p>
        <p style={{ fontSize: "0.68rem", color: "var(--text-secondary)", fontWeight: 500 }}>{label}</p>
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <motion.section
      id="hero"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        padding: "5rem 0 3rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: "-15%", left: "-5%", width: 600, height: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,115,255,0.08), transparent 65%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-25%", right: "-5%", width: 550, height: 550,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,212,170,0.05), transparent 65%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "30%", left: "50%", width: 400, height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(77,171,247,0.03), transparent 60%)",
        pointerEvents: "none",
      }} />

      <motion.div
        style={{
          position: "absolute", top: "10%", left: "15%", width: 120, height: 120,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,115,255,0.04), transparent 70%)",
          pointerEvents: "none",
          filter: "blur(40px)",
        }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{
          position: "absolute", bottom: "20%", right: "20%", width: 160, height: 160,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,170,0.03), transparent 70%)",
          pointerEvents: "none",
          filter: "blur(50px)",
        }}
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "3rem",
        alignItems: "center",
      }} className="hero-grid">
        <div>
          <motion.div variants={itemVariants} style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              background: "linear-gradient(135deg, var(--color-primary-subtle), rgba(0,212,170,0.06))",
              border: "1px solid rgba(124,115,255,0.15)",
              color: "var(--color-primary)", padding: "0.3rem 0.8rem",
              borderRadius: 20, fontSize: "0.68rem", fontWeight: 600,
              letterSpacing: "0.03em", textTransform: "uppercase",
            }}>
              <Cpu size={11} />
              AI Powered
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              padding: "0.3rem 0.75rem", borderRadius: 20,
              fontSize: "0.65rem", fontWeight: 600,
              background: "rgba(0,212,170,0.08)",
              border: "1px solid rgba(0,212,170,0.15)",
              color: "var(--color-success)",
            }}>
              <Zap size={10} />
              Instant Analysis
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              padding: "0.3rem 0.75rem", borderRadius: 20,
              fontSize: "0.65rem", fontWeight: 600,
              background: "rgba(77,171,247,0.08)",
              border: "1px solid rgba(77,171,247,0.15)",
              color: "var(--color-info)",
            }}>
              <Lock size={10} />
              Loan Ready Assessment
            </div>
          </motion.div>

          <motion.div variants={itemVariants} style={{ position: "relative", marginBottom: "1.25rem" }}>
            <div style={{
              position: "absolute", top: "10%", left: "-5%", width: 300, height: 120,
              background: "radial-gradient(ellipse, rgba(124,115,255,0.06), transparent 70%)",
              filter: "blur(40px)",
              pointerEvents: "none",
            }} />
            <h1 style={{
              fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
              lineHeight: 1.08,
              fontWeight: 800,
              color: "var(--text-primary)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.05em",
              position: "relative",
            }}>
              Financial Health Card{" "}
              <span style={{
                background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                for MSMEs
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            style={{
              fontSize: "1rem", lineHeight: 1.7,
              color: "var(--text-secondary)", marginBottom: "2rem",
              maxWidth: 520,
            }}
          >
            Evaluate MSME financial health in real-time using an ensemble ML model that combines traditional bureau data with alternate digital signals — GST, UPI, and revenue growth vectors.
          </motion.p>

          <motion.div
            variants={itemVariants}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2.5rem" }}
          >
            <motion.a
              href="#form-section"
              className="btn btn-primary"
              style={{ width: "auto", padding: "0.85rem 1.8rem", fontSize: "0.9rem" }}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(124,115,255,0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              Start Free Diagnosis
              <ArrowRight size={17} />
            </motion.a>
            <a href="#learn-more" className="btn btn-secondary" style={{ width: "auto", padding: "0.85rem 1.8rem", fontSize: "0.9rem" }}>
              <Shield size={16} />
              How It Works
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}
          >
            {[
              { icon: CheckCircle2, text: "UPI Flow Analytics" },
              { icon: CheckCircle2, text: "GST Compliance Metrics" },
              { icon: CheckCircle2, text: "ML Risk Assessment" },
              { icon: CheckCircle2, text: "Real-Time Scoring" },
            ].map((feat, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                <feat.icon size={13} color="var(--color-success)" />
                <span>{feat.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="hero-visual-col" style={{ position: "relative", minHeight: 380 }}>
          <motion.div
            variants={itemVariants}
            style={{
              background: "rgba(12, 13, 26, 0.6)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "var(--radius-2xl)",
              maxWidth: 400, margin: "0 auto",
              position: "relative", overflow: "hidden",
              zIndex: 2,
              boxShadow: "0 16px 64px rgba(0,0,0,0.4)",
            }}
            whileHover={{ y: -4 }}
          >
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 3,
              background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary), var(--color-accent), var(--color-primary))",
              backgroundSize: "300% 100%",
              animation: "borderShine 4s linear infinite",
            }} />

            <div style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: "linear-gradient(135deg, rgba(0,212,170,0.12), rgba(124,115,255,0.08))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Activity size={19} color="var(--color-secondary)" />
                </div>
                <div>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>
                    Apex Traders Ltd
                  </h4>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <Globe size={9} color="var(--text-tertiary)" />
                    <p style={{ fontSize: "0.68rem", color: "var(--text-tertiary)" }}>
                      GST Registered · Retail
                    </p>
                  </div>
                </div>
                <motion.span
                  style={{
                    marginLeft: "auto", fontSize: "0.6rem", fontWeight: 700,
                    padding: "0.2rem 0.65rem", borderRadius: 20,
                    background: "rgba(0,212,170,0.1)", color: "var(--color-success)",
                    border: "1px solid rgba(0,212,170,0.15)",
                    display: "flex", alignItems: "center", gap: "0.25rem",
                    textTransform: "uppercase", letterSpacing: "0.04em",
                  }}
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--color-success)", display: "inline-block" }} />
                  Live
                </motion.span>
              </div>

              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "flex-end",
                marginBottom: "1rem",
              }}>
                <div>
                  <p style={{ fontSize: "0.62rem", color: "var(--text-tertiary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.1rem" }}>
                    AI Health Score
                  </p>
                  <p style={{ fontSize: "2.4rem", fontWeight: 800, color: "var(--color-success)", fontFamily: "var(--font-heading)", lineHeight: 1, letterSpacing: "-0.04em" }}>
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      762
                    </motion.span>
                    <small style={{ fontSize: "0.85rem", color: "var(--text-tertiary)", fontWeight: 500 }}>/1000</small>
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "0.62rem", color: "var(--text-tertiary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.2rem" }}>
                    Risk Category
                  </p>
                  <span style={{
                    fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.04em", padding: "0.25rem 0.7rem", borderRadius: 20,
                    background: "rgba(0,212,170,0.1)", color: "var(--color-success)",
                    border: "1px solid rgba(0,212,170,0.15)",
                  }}>
                    Low Risk
                  </span>
                </div>
              </div>

              <div style={{
                width: "100%", height: 5,
                background: "rgba(255,255,255,0.03)",
                borderRadius: 10, overflow: "hidden", marginBottom: "1rem",
              }}>
                <motion.div
                  style={{
                    height: "100%", borderRadius: 10,
                    background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: "76.2%" }}
                  transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                {["Excellent GST", "UPI Volume High", "Low DTI"].map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    style={{
                      fontSize: "0.62rem", fontWeight: 600,
                      padding: "0.15rem 0.5rem", borderRadius: 4,
                      background: "rgba(255,255,255,0.03)",
                      color: "var(--text-secondary)",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          <FloatingStatCard
            value="₹2.4Cr+"
            label="Total Credit Assessed"
            icon={BarChart3}
            color="var(--color-primary)"
            delay={1.2}
            style={{ top: -12, right: -24, zIndex: 3 }}
          />
          <FloatingStatCard
            value="98.5%"
            label="Accuracy Rate"
            icon={TrendingUp}
            color="var(--color-success)"
            delay={1.4}
            style={{ bottom: -12, left: -24, zIndex: 3 }}
          />

          <style>{`
            @media (min-width: 992px) {
              .hero-grid { grid-template-columns: 1.1fr 0.9fr; }
              .hero-visual-col { min-height: 420px; display: flex; align-items: center; justify-content: center; }
            }
            @media (max-width: 768px) {
              .hero-visual-col { display: none; }
            }
          `}</style>
        </div>
      </div>
    </motion.section>
  );
}

export default Hero;
