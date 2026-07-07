import { useNavigate } from "react-router-dom";
import {
    Download,
    ShieldCheck,
    TriangleAlert,
    BadgeCheck,
    TrendingUp,
    TrendingDown,
    Lightbulb,
} from "lucide-react";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { assessBusiness } from "../../services/assessmentService";

export default function AssessmentWizard() {

    const {
        register,
        handleSubmit,
        setValue,
        reset
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const navigate = useNavigate();
    const autoFillDemo = () => {

        setValue("industry_type", "Food");
        setValue("business_age_years", 18);
        setValue("monthly_revenue", 250000);
        setValue("monthly_expense", 180000);
        setValue("gst_compliance_score", 92);
        setValue("gst_turnover", 240000);
        setValue("upi_transaction_count", 150);
        setValue("upi_transaction_amount", 190000);
        setValue("employee_count", 12);
        setValue("existing_loan_amount", 500000);
        setValue("monthly_emi", 18000);
        setValue("credit_score", 760);
        setValue("debt_to_income_ratio", 0.35);
        setValue("repayment_history", "Good");
        setValue("revenue_growth_percent", 18);
        setValue("default_risk", 0);

    };

    const clearForm = () => {

        reset();
        setResult(null);

    };
    const downloadPDF = async () => {

        const element = document.getElementById("financial-card");

        const canvas = await html2canvas(element, {
            scale: 2,
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");

        const width = pdf.internal.pageSize.getWidth();

        const height = (canvas.height * (width - 20)) / canvas.width;

        pdf.addImage(
            imgData,
            "PNG",
            10,
            10,
            width - 20,
            height
        );

        pdf.save("FinancialHealthCard.pdf");

    };

    async function onSubmit(data) {

        data.business_age_years = Number(data.business_age_years);
        data.monthly_revenue = Number(data.monthly_revenue);
        data.monthly_expense = Number(data.monthly_expense);
        data.gst_compliance_score = Number(data.gst_compliance_score);
        data.gst_turnover = Number(data.gst_turnover);
        data.upi_transaction_count = Number(data.upi_transaction_count);
        data.upi_transaction_amount = Number(data.upi_transaction_amount);
        data.employee_count = Number(data.employee_count);
        data.existing_loan_amount = Number(data.existing_loan_amount);
        data.monthly_emi = Number(data.monthly_emi);
        data.credit_score = Number(data.credit_score);
        data.debt_to_income_ratio = Number(data.debt_to_income_ratio);
        data.revenue_growth_percent = Number(data.revenue_growth_percent);
        data.default_risk = Number(data.default_risk);

        try {

            setLoading(true);

            const response = await assessBusiness(data);

            setResult(response);

            setTimeout(() => {

                navigate("/loading", {
                    state: {
                        result: response,
                        formData: data,
                    },
                });

            }, 1500);
            setTimeout(() => {

                document
                    .getElementById("result-card")
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

            }, 200);

        } catch (err) {

            console.error(err);

            alert("Backend Error");

        } finally {

            setLoading(false);

        }

    }

    return (

        <section id="assessment" className="py-16 bg-slate-50">

            <div className="max-w-5xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-black text-center">
                    MSME Assessment
                </h2>
                <p className="text-center text-slate-500 mt-4 max-w-3xl mx-auto">

                    Enter your business information or click <span className="font-semibold text-blue-600">Load Demo Data</span> to instantly test the AI Financial Health Assessment.

                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white rounded-2xl shadow-xl p-8 mt-12"
                >

                    <div className="grid md:grid-cols-2 gap-5">

                        <input {...register("industry_type")} placeholder="Industry Type (e.g. Food, Retail, Textile)" className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200" />

                        <input {...register("business_age_years")} type="number" placeholder="Business Age (Years)" className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200" />

                        <input {...register("monthly_revenue")} type="number" placeholder="Monthly Revenue" className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200" />

                        <input {...register("monthly_expense")} type="number" placeholder="Monthly Expense" className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200" />

                        <input {...register("gst_compliance_score")} type="number" placeholder="GST Compliance Score" className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200" />

                        <input {...register("gst_turnover")} type="number" placeholder="GST Turnover" className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200" />

                        <input {...register("upi_transaction_count")} type="number" placeholder="UPI Transaction Count" className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200" />

                        <input {...register("upi_transaction_amount")} type="number" placeholder="UPI Transaction Amount" className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200" />

                        <input {...register("employee_count")} type="number" placeholder="Employee Count" className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200" />

                        <input {...register("existing_loan_amount")} type="number" placeholder="Existing Loan Amount" className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200" />

                        <input {...register("monthly_emi")} type="number" placeholder="Monthly EMI" className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200" />

                        <input {...register("credit_score")} type="number" placeholder="Credit Score" className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200" />

                        <input {...register("debt_to_income_ratio")} type="number" step="0.01" placeholder="Debt To Income Ratio" className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200" />

                        <select {...register("repayment_history")} className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200">

                            <option value="Good">Good</option>
                            <option value="Average">Average</option>
                            <option value="Poor">Poor</option>

                        </select>

                        <input {...register("revenue_growth_percent")} type="number" placeholder="Revenue Growth %" className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200" />

                        <select {...register("default_risk")} className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200">

                            <option value={0}>No Default</option>
                            <option value={1}>Defaulted</option>

                        </select>

                    </div>

                    <div className="mt-10 flex flex-wrap gap-4">

                        <button
                            type="button"
                            onClick={autoFillDemo}
                            className="rounded-2xl bg-slate-200 px-6 py-3 font-semibold hover:bg-slate-300 transition"
                        >
                            Load Demo Data
                        </button>

                        <button
                            type="button"
                            onClick={clearForm}
                            className="rounded-2xl bg-red-100 px-6 py-3 text-red-700 font-semibold hover:bg-red-200 transition"
                        >
                            Clear
                        </button>

                        <button
                            type="submit"
                            className="flex-1 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-white font-bold hover:scale-[1.02] transition"
                        >
                            {loading ? "Generating..." : "Generate Financial Health Card"}
                        </button>

                    </div>

                </form>

                {result && (

                    <div
                        id="financial-card"
                        className="mt-12 overflow-hidden rounded-[36px] bg-white shadow-[0_30px_70px_rgba(0,0,0,0.12)]"
                    >

                        <h2 className="text-4xl font-black">
                            Financial Health Card
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8 mt-8">

                            <div>

                                <p className="text-slate-500">Financial Score</p>

                                <h1 className="text-7xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                    {result.financial_health_score}
                                </h1>

                                <div className="mt-6 h-4 bg-slate-200 rounded-full overflow-hidden">

                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-1000"
                                        style={{
                                            width: `${Math.min((result.financial_health_score / 900) * 100, 100)}%`
                                        }}
                                    />

                                </div>

                                <p className="text-slate-500 mt-2">
                                    Financial Health Score
                                </p>

                            </div>

                            <div>

                                <p className="text-slate-500">Risk Level</p>

                                <span
                                    className={`inline-block px-6 py-3 rounded-full text-white font-bold ${result.risk_level === "Low"
                                        ? "bg-green-500"
                                        : result.risk_level === "Medium"
                                            ? "bg-orange-500"
                                            : "bg-red-500"
                                        }`}
                                >
                                    {result.risk_level}
                                </span>

                            </div>

                            <div>

                                <p className="text-slate-500">Loan Eligibility</p>

                                <span
                                    className={`inline-block px-6 py-3 rounded-full font-bold ${result.loan_eligibility.includes("Not")
                                        ? "bg-red-100 text-red-700"
                                        : "bg-green-100 text-green-700"
                                        }`}
                                >
                                    {result.loan_eligibility}
                                </span>

                            </div>

                        </div>

                        <div className="mt-10">

                            <h3 className="font-bold text-xl">Strengths</h3>

                            <ul className="list-disc ml-6 mt-3">

                                {result.strengths.map((item, index) => (

                                    <li key={index}>{item}</li>

                                ))}

                            </ul>

                        </div>

                        <div className="mt-8">

                            <h3 className="font-bold text-xl">Weaknesses</h3>

                            <ul className="list-disc ml-6 mt-3">

                                {result.weaknesses.map((item, index) => (

                                    <li key={index}>{item}</li>

                                ))}

                            </ul>

                        </div>

                        <div className="mt-8">

                            <h3 className="font-bold text-xl">Recommendations</h3>

                            <ul className="list-disc ml-6 mt-3">

                                {result.recommendations.map((item, index) => (

                                    <li key={index}>{item}</li>

                                ))}

                            </ul>

                        </div>

                    </div>

                )}

            </div>

        </section>

    );

}