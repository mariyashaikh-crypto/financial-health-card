import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { checkBackendHealth } from "../services/api";
import { useTheme } from "../context/ThemeContext";
import {
  Activity, ShieldCheck, ShieldAlert, Sun, Moon,
  RotateCcw, Menu, X, FileText
} from "lucide-react";

function Navbar({ onReset, hasResult }) {
  const [backendStatus, setBackendStatus] = useState("checking");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const verifyConnection = async () => {
    setBackendStatus("checking");
    const isAlive = await checkBackendHealth();
    setBackendStatus(isAlive ? "online" : "offline");
  };

  useEffect(() => {
    verifyConnection();
    const interval = setInterval(verifyConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { href: "#hero", label: "Home" },
    { href: "#form-section", label: "Predictor" },
  ];

  return (
    <motion.nav
      className="no-print"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: theme === "dark"
          ? "rgba(8, 9, 20, 0.85)"
          : "rgba(240, 242, 248, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--glass-border)",
        padding: "0.75rem 0",
      }}
    >
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <motion.a
          href="#"
          style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}
          whileHover={{ scale: 1.02 }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px var(--color-primary-glow)",
          }}>
            <Activity size={18} color="white" />
          </div>
          <span style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}>
            MSME<span style={{ color: "var(--color-primary)" }}>Health</span>
          </span>
        </motion.a>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div className="nav-links-desktop" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  borderRadius: "var(--radius-sm)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.target.style.color = "var(--text-primary)"; e.target.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={(e) => { e.target.style.color = "var(--text-secondary)"; e.target.style.background = "transparent"; }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {hasResult && (
            <motion.button
              className="btn-icon"
              onClick={onReset}
              title="New Assessment"
              whileHover={{ rotate: -180 }}
              transition={{ duration: 0.4 }}
            >
              <RotateCcw size={16} />
            </motion.button>
          )}

          <motion.button
            className="btn-icon"
            onClick={toggleTheme}
            title={`${theme === "dark" ? "Light" : "Dark"} mode`}
            whileTap={{ scale: 0.9 }}
            style={{ color: theme === "dark" ? "var(--color-warning)" : "var(--color-primary)" }}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>

          <AnimatePresence mode="wait">
            {backendStatus === "online" && (
              <motion.div
                key="online"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{
                  display: "flex", alignItems: "center", gap: "0.35rem",
                  padding: "0.35rem 0.65rem", fontSize: "0.7rem", fontWeight: 600,
                  borderRadius: 20, background: "var(--color-success-bg)",
                  color: "var(--color-success)", border: "1px solid rgba(0,212,170,0.2)",
                }}
              >
                <ShieldCheck size={12} />
                <span className="status-text">Live</span>
              </motion.div>
            )}
            {backendStatus === "checking" && (
              <motion.div
                key="checking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  display: "flex", alignItems: "center", gap: "0.35rem",
                  padding: "0.35rem 0.65rem", fontSize: "0.7rem", fontWeight: 600,
                  borderRadius: 20, background: "var(--color-warning-bg)",
                  color: "var(--color-warning)", border: "1px solid rgba(255,179,71,0.2)",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-warning)", animation: "pulse 1.5s infinite" }} />
                <span className="status-text">API</span>
              </motion.div>
            )}
            {backendStatus === "offline" && (
              <motion.div
                key="offline"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={verifyConnection}
                style={{
                  display: "flex", alignItems: "center", gap: "0.35rem",
                  padding: "0.35rem 0.65rem", fontSize: "0.7rem", fontWeight: 600,
                  borderRadius: 20, background: "var(--color-danger-bg)",
                  color: "var(--color-danger)", border: "1px solid rgba(255,71,87,0.2)",
                  cursor: "pointer",
                }}
              >
                <ShieldAlert size={12} />
                <span className="status-text">Offline</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            className="btn-icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
            style={{ display: "none" }}
            className="mobile-menu-btn"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </div>

      <style>{`
        .nav-links-desktop { display: flex; }
        .status-text { display: inline; }
        .mobile-menu-btn { display: none; }
        @media (max-width: 640px) {
          .nav-links-desktop { display: none; }
          .mobile-menu-btn { display: flex !important; }
          .status-text { display: none; }
        }
      `}</style>
    </motion.nav>
  );
}

export default Navbar;
