import joblib
import pandas as pd

# Load model and encoders
model = joblib.load("../models/financial_health_model.pkl")
industry_encoder = joblib.load("../models/industry_encoder.pkl")
repayment_encoder = joblib.load("../models/repayment_encoder.pkl")


def predict_score(data):

    # Convert dictionary to DataFrame
    df = pd.DataFrame([data])

    # Encode categorical columns
    df["industry_type"] = industry_encoder.transform(df["industry_type"])
    df["repayment_history"] = repayment_encoder.transform(df["repayment_history"])

    # Predict score
    score = round(float(model.predict(df)[0]), 2)

    # Risk Level
    if score >= 700:
        risk = "Low"
    elif score >= 500:
        risk = "Medium"
    else:
        risk = "High"

    # Loan Eligibility
    if score >= 650:
        eligibility = "Eligible"
    elif score >= 500:
        eligibility = "Eligible with Conditions"
    else:
        eligibility = "Not Eligible"

    # Strengths
    strengths = []

    if data["gst_compliance_score"] >= 80:
        strengths.append("Excellent GST Compliance")

    if data["credit_score"] >= 750:
        strengths.append("High Credit Score")

    if data["revenue_growth_percent"] >= 15:
        strengths.append("Strong Revenue Growth")

    if data["repayment_history"] == "Good":
        strengths.append("Good Repayment History")

    # Weaknesses
    weaknesses = []

    if data["debt_to_income_ratio"] > 0.5:
        weaknesses.append("High Debt-to-Income Ratio")

    if data["monthly_expense"] > data["monthly_revenue"] * 0.8:
        weaknesses.append("High Monthly Expenses")

    if data["credit_score"] < 650:
        weaknesses.append("Low Credit Score")

    # Recommendations
    recommendations = []

    if data["debt_to_income_ratio"] > 0.5:
        recommendations.append("Reduce debt burden.")

    if data["credit_score"] < 700:
        recommendations.append("Improve credit score.")

    if data["gst_compliance_score"] < 80:
        recommendations.append("Maintain better GST compliance.")

    if len(recommendations) == 0:
        recommendations.append("Business is financially healthy.")

    return {
        "financial_health_score": score,
        "risk_level": risk,
        "loan_eligibility": eligibility,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "recommendations": recommendations
    }