import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

function ErrorPage({ message = "Something went wrong", onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", textAlign: "center",
        minHeight: "50vh", padding: "3rem 2rem", gap: "1.5rem",
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "var(--color-danger-bg)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <AlertTriangle size={36} style={{ color: "var(--color-danger)" }} />
      </motion.div>

      <h2 style={{
        fontSize: "1.75rem", fontWeight: 800,
        color: "var(--text-primary)", fontFamily: "var(--font-heading)",
      }}>
        Oops! Error Occurred
      </h2>

      <p style={{
        fontSize: "1rem", color: "var(--text-secondary)",
        maxWidth: 440, lineHeight: 1.6,
      }}>
        {message}
      </p>

      <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
        {onRetry && (
          <motion.button
            className="btn btn-primary"
            onClick={onRetry}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{ width: "auto" }}
          >
            <RefreshCw size={16} />
            Try Again
          </motion.button>
        )}
        <a href="#" className="btn btn-secondary" style={{ width: "auto" }}>
          <Home size={16} />
          Go Home
        </a>
      </div>
    </motion.div>
  );
}

export default ErrorPage;
