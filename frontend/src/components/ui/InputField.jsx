import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

function InputField({
  label, name, type = "number", value, onChange,
  placeholder, error, icon: Icon, min, max, step,
  required = true, description
}) {
  return (
    <motion.div
      className="form-group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="form-label" htmlFor={name}>
        {label}
        {required && <span style={{ color: "var(--color-danger)" }}> *</span>}
        {description && (
          <span
            title={description}
            style={{ cursor: "help", color: "var(--text-tertiary)", fontSize: "0.75rem", marginLeft: "4px" }}
          >
            &#9432;
          </span>
        )}
      </label>
      <div className="input-wrapper">
        {Icon && <Icon size={16} className="input-icon" />}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`input-field ${error ? "error" : ""}`}
          style={{ paddingLeft: Icon ? "2.75rem" : "1rem" }}
        />
      </div>
      {error && (
        <span className="input-error">
          <AlertCircle size={12} />
          {error}
        </span>
      )}
    </motion.div>
  );
}

export default InputField;
