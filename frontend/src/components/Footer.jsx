import React from "react";
import { Activity, Github, Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="no-print" style={{
      textAlign: "center",
      padding: "2.5rem 1.5rem",
      borderTop: "1px solid var(--glass-border)",
      marginTop: "4rem",
    }}>
      <div style={{
        maxWidth: 640,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", opacity: 0.6 }}>
          <Activity size={16} style={{ color: "var(--color-primary)" }} />
          <span style={{
            fontFamily: "var(--font-heading)",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "var(--text-secondary)",
          }}>
            MSME<span style={{ color: "var(--color-primary)" }}>Health</span>
          </span>
        </div>

        <p style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", lineHeight: 1.6 }}>
          Built with <span style={{ color: "var(--color-accent)" }}>&#9829;</span> using React, Vite, Flask &amp; Machine Learning.
          <br />
          &copy; {new Date().getFullYear()} MSME Financial Health Card. All rights reserved.
        </p>

        <div style={{ display: "flex", gap: "1rem", fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy</a>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terms</a>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
