/**
 * Client-side input validation for MSME financial health predictor form fields.
 * Returns an object containing error messages, or an empty object if all inputs are valid.
 */
export const validateForm = (data) => {
  const errors = {};

  // Business Age (Years)
  if (data.business_age_years === undefined || data.business_age_years === null || data.business_age_years === "") {
    errors.business_age_years = "Business age is required";
  } else if (Number(data.business_age_years) < 0) {
    errors.business_age_years = "Business age cannot be negative";
  } else if (Number(data.business_age_years) > 100) {
    errors.business_age_years = "Please enter a realistic business age (0-100)";
  }

  // Monthly Revenue
  if (data.monthly_revenue === undefined || data.monthly_revenue === null || data.monthly_revenue === "") {
    errors.monthly_revenue = "Monthly revenue is required";
  } else if (Number(data.monthly_revenue) < 0) {
    errors.monthly_revenue = "Monthly revenue cannot be negative";
  }

  // Monthly Expense
  if (data.monthly_expense === undefined || data.monthly_expense === null || data.monthly_expense === "") {
    errors.monthly_expense = "Monthly expense is required";
  } else if (Number(data.monthly_expense) < 0) {
    errors.monthly_expense = "Monthly expense cannot be negative";
  }

  // GST Compliance Score
  if (data.gst_compliance_score === undefined || data.gst_compliance_score === null || data.gst_compliance_score === "") {
    errors.gst_compliance_score = "GST compliance score is required";
  } else {
    const gstScore = Number(data.gst_compliance_score);
    if (gstScore < 0 || gstScore > 100) {
      errors.gst_compliance_score = "GST compliance score must be between 0 and 100";
    }
  }

  // GST Turnover
  if (data.gst_turnover === undefined || data.gst_turnover === null || data.gst_turnover === "") {
    errors.gst_turnover = "GST turnover is required";
  } else if (Number(data.gst_turnover) < 0) {
    errors.gst_turnover = "GST turnover cannot be negative";
  }

  // UPI Transaction Count
  if (data.upi_transaction_count === undefined || data.upi_transaction_count === null || data.upi_transaction_count === "") {
    errors.upi_transaction_count = "UPI transaction count is required";
  } else if (Number(data.upi_transaction_count) < 0 || !Number.isInteger(Number(data.upi_transaction_count))) {
    errors.upi_transaction_count = "Must be a non-negative whole number";
  }

  // UPI Transaction Amount
  if (data.upi_transaction_amount === undefined || data.upi_transaction_amount === null || data.upi_transaction_amount === "") {
    errors.upi_transaction_amount = "UPI transaction amount is required";
  } else if (Number(data.upi_transaction_amount) < 0) {
    errors.upi_transaction_amount = "UPI transaction amount cannot be negative";
  }

  // Employee Count
  if (data.employee_count === undefined || data.employee_count === null || data.employee_count === "") {
    errors.employee_count = "Employee count is required";
  } else if (Number(data.employee_count) < 0 || !Number.isInteger(Number(data.employee_count))) {
    errors.employee_count = "Must be a non-negative whole number";
  }

  // Existing Loan Amount
  if (data.existing_loan_amount === undefined || data.existing_loan_amount === null || data.existing_loan_amount === "") {
    errors.existing_loan_amount = "Existing loan amount is required";
  } else if (Number(data.existing_loan_amount) < 0) {
    errors.existing_loan_amount = "Existing loan amount cannot be negative";
  }

  // Monthly EMI
  if (data.monthly_emi === undefined || data.monthly_emi === null || data.monthly_emi === "") {
    errors.monthly_emi = "Monthly EMI is required";
  } else if (Number(data.monthly_emi) < 0) {
    errors.monthly_emi = "Monthly EMI cannot be negative";
  }

  // Credit Score
  if (data.credit_score === undefined || data.credit_score === null || data.credit_score === "") {
    errors.credit_score = "Credit score is required";
  } else {
    const credit = Number(data.credit_score);
    if (credit < 300 || credit > 900) {
      errors.credit_score = "Credit score must be between 300 and 900";
    }
  }

  // Debt to Income Ratio
  if (data.debt_to_income_ratio === undefined || data.debt_to_income_ratio === null || data.debt_to_income_ratio === "") {
    errors.debt_to_income_ratio = "Debt to income ratio is required";
  } else {
    const dti = Number(data.debt_to_income_ratio);
    if (dti < 0 || dti > 1) {
      errors.debt_to_income_ratio = "Debt to income ratio must be between 0.0 and 1.0";
    }
  }

  // Revenue Growth Percent
  if (data.revenue_growth_percent === undefined || data.revenue_growth_percent === null || data.revenue_growth_percent === "") {
    errors.revenue_growth_percent = "Revenue growth % is required";
  } else if (isNaN(Number(data.revenue_growth_percent))) {
    errors.revenue_growth_percent = "Revenue growth % must be a number";
  } else {
    const growth = Number(data.revenue_growth_percent);
    if (growth < -100 || growth > 1000) {
      errors.revenue_growth_percent = "Must be between -100% and 1000%";
    }
  }

  return errors;
};
