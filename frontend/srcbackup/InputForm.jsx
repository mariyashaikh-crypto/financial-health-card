import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { predictFinancialHealth } from "../services/api";
import { validateForm } from "../utils/validation";
import InputField from "./ui/InputField";
import SelectField from "./ui/SelectField";
import Spinner from "./ui/Spinner";
import StepIndicator from "./ui/StepIndicator";
import {
  Building2, TrendingUp, TrendingDown, CreditCard, ShieldAlert,
  DollarSign, Clock, Users, Percent, FileCheck,
  AlertTriangle, Award, CircleDot, Play, RotateCcw,
  ArrowRight, ArrowLeft, Sparkles, Info, CheckCircle,
  BarChart3, Smartphone, Wallet, Landmark, Gauge
} from "lucide-react";

const INITIAL_FORM = {
  industry_type: "Food",
  business_age_years: 10,
  monthly_revenue: 250000,
  monthly_expense: 180000,
  gst_compliance_score: 90,
  gst_turnover: 240000,
  upi_transaction_count: 120,
  upi_transaction_amount: 180000,
  employee_count: 15,
  existing_loan_amount: 300000,
  monthly_emi: 12000,
  credit_score: 760,
  debt_to_income_ratio: 0.35,
  repayment_history: "Good",
  revenue_growth_percent: 15,
  default_risk: 0,
};

const tabFields = {
  profile: ["industry_type", "business_age_years", "employee_count"],
  financial: ["monthly_revenue", "monthly_expense", "revenue_growth_percent", "gst_turnover"],
  digital: ["upi_transaction_count", "upi_transaction_amount", "gst_compliance_score"],
  credit: ["credit_score", "debt_to_income_ratio", "existing_loan_amount", "monthly_emi", "repayment_history", "default_risk"],
};

const sectionConfig = {
  profile: {
    title: "Business Profile",
    desc: "Tell us about your business",
    icon: Building2,
    color: "var(--color-primary)",
  },
  financial: {
    title: "Financial Performance",
    desc: "Revenue, expenses & growth metrics",
    icon: TrendingUp,
    color: "var(--color-success)",
  },
  digital: {
    title: "Digital Presence",
    desc: "UPI transactions & GST compliance",
    icon: Smartphone,
    color: "var(--color-info)",
  },
  credit: {
    title: "Credit Profile",
    desc: "Loans, scores & repayment history",
    icon: Award,
    color: "var(--color-warning)",
  },
};

function SectionHeader({ config }) {
  const Icon = config.icon;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "0.75rem",
      marginBottom: "1.5rem", paddingBottom: "1rem",
      borderBottom: "1px solid var(--glass-border)",
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: `${config.color}15`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={20} color={config.color} />
      </div>
      <div>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>
          {config.title}
        </h3>
        <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
          {config.desc}
        </p>
      </div>
      <div style={{ marginLeft: "auto" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "0.3rem",
          fontSize: "0.6rem", fontWeight: 600, color: "var(--text-tertiary)",
          padding: "0.2rem 0.5rem", borderRadius: 4,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid var(--glass-border)",
        }}>
          <Info size={10} /> Required
        </span>
      </div>
    </div>
  );
}

function InputForm({ onResult }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({ ...INITIAL_FORM });

  const tabs = ["profile", "financial", "digital", "credit"];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleReset = () => {
    setFormData({ ...INITIAL_FORM });
    setValidationErrors({});
    setApiError(null);
    setActiveTab("profile");
  };

  const handleNext = () => {
    const currentIdx = tabs.indexOf(activeTab);
    if (currentIdx < tabs.length - 1) setActiveTab(tabs[currentIdx + 1]);
  };

  const handlePrev = () => {
    const currentIdx = tabs.indexOf(activeTab);
    if (currentIdx > 0) setActiveTab(tabs[currentIdx - 1]);
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setApiError(null);

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      const firstErrorTab = Object.keys(errors).some((k) => tabFields.profile.includes(k)) ? "profile"
        : Object.keys(errors).some((k) => tabFields.financial.includes(k)) ? "financial"
        : Object.keys(errors).some((k) => tabFields.digital.includes(k)) ? "digital"
        : "credit";
      setActiveTab(firstErrorTab);
      return;
    }

    try {
      setLoading(true);
      const prediction = await predictFinancialHealth(formData);
      onResult(prediction, formData);
      setTimeout(() => {
        document.querySelector(".glass-card.result-dashboard")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      console.error(err);
      setApiError(
        err.response?.data?.message ||
        "Unable to connect to prediction API. Please ensure your Python Flask backend is running on http://127.0.0.1:5000."
      );
    } finally {
      setLoading(false);
    }
  };

  const tabHasErrors = (tab) => {
    return tabFields[tab]?.some((f) => validationErrors[f]) ?? false;
  };

  const isLastTab = activeTab === "credit";
  const isFirstTab = activeTab === "profile";

  return (
    <motion.div
      id="form-section"
      className="glass-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ marginBottom: "3rem", overflow: "hidden" }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary), var(--color-accent), var(--color-primary))",
        backgroundSize: "300% 100%",
        animation: "borderShine 4s linear infinite",
      }} />

      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", marginBottom: "0.5rem",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.15rem" }}>
            <BarChart3 size={18} color="var(--color-primary)" />
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}>
              Business Assessment
            </h2>
          </div>
          <p style={{ fontSize: "0.78rem", color: "var(--text-tertiary)" }}>
            Complete all sections to generate your AI-powered financial health report
          </p>
        </div>
        <motion.button
          className="btn-icon"
          onClick={handleReset}
          title="Reset Form"
          whileHover={{ rotate: -90 }}
          transition={{ duration: 0.3 }}
          style={{ width: 36, height: 36 }}
        >
          <RotateCcw size={14} />
        </motion.button>
      </div>

      <StepIndicator active={activeTab} hasErrors={tabHasErrors} />

      <AnimatePresence>
        {apiError && (
          <motion.div
            className="alert alert-danger"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ marginBottom: "1.5rem" }}
          >
            <ShieldAlert className="alert-icon" />
            <div>
              <strong>Backend Error: </strong>
              {apiError}
              <div style={{ marginTop: "0.5rem", fontSize: "0.8rem", opacity: 0.9 }}>
                <em>To run backend:</em> Navigate to the <code>backend/</code> folder and execute <code>python app.py</code>.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handlePredict} noValidate>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="spinner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Spinner />
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeTab === "profile" && (
                <div>
                  <SectionHeader config={sectionConfig.profile} />
                  <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem",
                  }}>
                    <SelectField label="Industry Segment" name="industry_type" value={formData.industry_type} onChange={handleChange} options={["Food", "Manufacturing", "Retail", "Services", "Trading"]} icon={Building2} description="Standard Industrial Classification code category." />
                    <InputField label="Business Tenure (Years)" name="business_age_years" value={formData.business_age_years} onChange={handleChange} placeholder="e.g. 5" error={validationErrors.business_age_years} icon={Clock} min="0" max="100" description="Number of years since commercial operation registration." />
                    <InputField label="Employee Strength" name="employee_count" value={formData.employee_count} onChange={handleChange} placeholder="e.g. 12" error={validationErrors.employee_count} icon={Users} min="0" description="Total active payroll staff." />
                  </div>
                </div>
              )}

              {activeTab === "financial" && (
                <div>
                  <SectionHeader config={sectionConfig.financial} />
                  <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem",
                  }}>
                    <InputField label="Monthly Revenue (₹)" name="monthly_revenue" value={formData.monthly_revenue} onChange={handleChange} placeholder="e.g. 350000" error={validationErrors.monthly_revenue} icon={TrendingUp} min="0" description="Average sales revenue in last 3 months." />
                    <InputField label="Monthly Expenses (₹)" name="monthly_expense" value={formData.monthly_expense} onChange={handleChange} placeholder="e.g. 240000" error={validationErrors.monthly_expense} icon={TrendingDown} min="0" description="Includes salaries, rent, material costs, utility, etc." />
                    <InputField label="Revenue Growth Rate (%)" name="revenue_growth_percent" value={formData.revenue_growth_percent} onChange={handleChange} placeholder="e.g. 15" error={validationErrors.revenue_growth_percent} icon={Percent} min="-100" max="1000" step="0.1" description="Percentage growth in revenue year-over-year." />
                    <InputField label="Annual GST Turnover (₹)" name="gst_turnover" value={formData.gst_turnover} onChange={handleChange} placeholder="e.g. 4200000" error={validationErrors.gst_turnover} icon={DollarSign} min="0" description="Turnover reported in the GSTR filing." />
                  </div>
                </div>
              )}

              {activeTab === "digital" && (
                <div>
                  <SectionHeader config={sectionConfig.digital} />
                  <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem",
                  }}>
                    <InputField label="Monthly UPI Txn Count" name="upi_transaction_count" value={formData.upi_transaction_count} onChange={handleChange} placeholder="e.g. 450" error={validationErrors.upi_transaction_count} icon={CreditCard} min="0" description="Alternative cashflow indicator based on digital transactions count." />
                    <InputField label="Monthly UPI Txn Volume (₹)" name="upi_transaction_amount" value={formData.upi_transaction_amount} onChange={handleChange} placeholder="e.g. 280000" error={validationErrors.upi_transaction_amount} icon={Smartphone} min="0" description="Total volume transacted digitally in a month." />
                    <InputField label="GST Compliance Score" name="gst_compliance_score" value={formData.gst_compliance_score} onChange={handleChange} placeholder="e.g. 95" error={validationErrors.gst_compliance_score} icon={FileCheck} min="0" max="100" description="Filing consistency rating between 0 and 100." />
                  </div>
                </div>
              )}

              {activeTab === "credit" && (
                <div>
                  <SectionHeader config={sectionConfig.credit} />
                  <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem",
                  }}>
                    <InputField label="Bureau Credit Score" name="credit_score" value={formData.credit_score} onChange={handleChange} placeholder="e.g. 750" error={validationErrors.credit_score} icon={Award} min="300" max="900" description="CIBIL or equivalent credit bureau rating." />
                    <InputField label="Debt-to-Income Ratio" name="debt_to_income_ratio" value={formData.debt_to_income_ratio} onChange={handleChange} placeholder="e.g. 0.35" error={validationErrors.debt_to_income_ratio} icon={Percent} min="0" max="1" step="0.01" description="Ratio of total monthly debt liabilities against gross monthly income (0.0 to 1.0)." />
                    <InputField label="Existing Loan Outstandings (₹)" name="existing_loan_amount" value={formData.existing_loan_amount} onChange={handleChange} placeholder="e.g. 500000" error={validationErrors.existing_loan_amount} icon={Landmark} min="0" description="Total principal outstanding of active institutional loans." />
                    <InputField label="Monthly Loan EMI (₹)" name="monthly_emi" value={formData.monthly_emi} onChange={handleChange} placeholder="e.g. 15000" error={validationErrors.monthly_emi} icon={Wallet} min="0" description="Combined EMI liability for all business loans." />
                    <SelectField label="Repayment History" name="repayment_history" value={formData.repayment_history} onChange={handleChange} options={["Good", "Poor"]} icon={CheckCircle} description="Historical record of delay or defaults on EMIs." />
                    <SelectField label="Default Risk Tag" name="default_risk" value={formData.default_risk} onChange={handleChange} options={[{ value: 0, label: "No Default" }, { value: 1, label: "Default Risk" }]} icon={AlertTriangle} description="Whether active warnings exist in the system (0 for No, 1 for Yes)." />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && (
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "2rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid var(--glass-border)",
          }}>
            <div>
              {!isFirstTab && (
                <motion.button
                  type="button"
                  className="btn btn-ghost"
                  onClick={handlePrev}
                  whileHover={{ x: -2 }}
                  style={{ width: "auto" }}
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </motion.button>
              )}
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              {!isLastTab ? (
                <motion.button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                  whileHover={{ scale: 1.02, boxShadow: "0 6px 24px var(--color-primary-glow)" }}
                  whileTap={{ scale: 0.98 }}
                  style={{ width: "auto" }}
                >
                  <span>Next Step</span>
                  <ArrowRight size={14} />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  className="btn btn-primary"
                  whileHover={{ scale: 1.02, boxShadow: "0 6px 24px var(--color-primary-glow)" }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: "auto", position: "relative", overflow: "hidden",
                    background: "linear-gradient(135deg, var(--color-primary), #5a52e0)",
                  }}
                >
                  <Sparkles size={16} />
                  <span>Generate Report</span>
                </motion.button>
              )}
            </div>
          </div>
        )}
      </form>
    </motion.div>
  );
}

export default InputForm;
