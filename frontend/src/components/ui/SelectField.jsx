import React from "react";
import { motion } from "framer-motion";

function SelectField({
  label, name, value, onChange,
  options = [], icon: Icon,
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
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="input-field"
          style={{ paddingLeft: Icon ? "2.75rem" : "1rem" }}
        >
          {options.map((opt) => {
            const val = typeof opt === "object" ? opt.value : opt;
            const text = typeof opt === "object" ? opt.label : opt;
            return (
              <option key={val} value={val}>
                {text}
              </option>
            );
          })}
        </select>
      </div>
    </motion.div>
  );
}

export default SelectField;
