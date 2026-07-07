import FinancialChart from "../components/charts/FinancialChart";
import { useLocation, useNavigate } from "react-router-dom";

export default function Report() {

    const location = useLocation();

    const navigate = useNavigate();

    const result = location.state?.result;
    const formData = location.state?.formData;

    if (!result) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <button
                    onClick={() => navigate("/assessment")}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl"
                >
                    Start New Assessment
                </button>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-100 p-8">

            <div
                id="report"
                className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-slate-200"
            >

                {/* Header */}

                <div className="flex justify-between items-center border-b pb-6">

                    <div>

                        <h1 className="text-3xl font-black text-slate-900">

                            Financial Health Card

                        </h1>

                        <p className="text-slate-500 mt-1">

                            AI Powered MSME Credit Assessment Report

                        </p>

                    </div>

                    <div className="text-right">

                        <p className="text-sm text-slate-500">

                            Report ID

                        </p>

                        <h2 className="font-bold">

                            FHC-{Date.now().toString().slice(-6)}

                        </h2>

                        <p className="text-sm text-slate-500">

                            {new Date().toLocaleDateString()}

                        </p>

                    </div>

                </div>

                {/* Score */}

                <div className="mt-10 grid lg:grid-cols-2 gap-8 items-center">

                    <div className="flex justify-center">

                        <div className="relative h-56 w-56 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-xl">

                            <div className="h-44 w-44 rounded-full bg-white flex flex-col items-center justify-center">

                                <span className="text-5xl font-black text-blue-600">

                                    {result.financial_health_score}

                                </span>

                                <span className="text-slate-500 text-sm">

                                    Health Score

                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="space-y-5">

                        <div className="rounded-2xl bg-blue-50 p-5">

                            <p className="text-slate-500">

                                Risk Level

                            </p>

                            <h2 className="text-2xl font-bold">

                                {result.risk_level}

                            </h2>

                        </div>

                        <div className="rounded-2xl bg-green-50 p-5">

                            <p className="text-slate-500">

                                Loan Eligibility

                            </p>

                            <h2 className="text-2xl font-bold text-green-600">

                                {result.loan_eligibility}

                            </h2>

                        </div>

                    </div>

                </div>

                {/* KPI Cards */}

                <div className="grid md:grid-cols-4 gap-5 mt-10">

                    <div className="rounded-2xl bg-slate-50 p-5">

                        <p className="text-slate-500">

                            Revenue

                        </p>

                        <h2 className="text-2xl font-bold text-green-600">

                            ₹ {formData.monthly_revenue.toLocaleString()}

                        </h2>

                    </div>

                    <div className="rounded-2xl bg-slate-50 p-5">

                        <p className="text-slate-500">

                            Expense

                        </p>

                        <h2 className="text-2xl font-bold text-red-600">

                            ₹ {formData.monthly_expense.toLocaleString()}

                        </h2>

                    </div>

                    <div className="rounded-2xl bg-slate-50 p-5">

                        <p className="text-slate-500">

                            Credit Score

                        </p>

                        <h2 className="text-2xl font-bold text-blue-600">

                            {formData.credit_score}

                        </h2>

                    </div>

                    <div className="rounded-2xl bg-slate-50 p-5">

                        <p className="text-slate-500">

                            GST Score

                        </p>

                        <h2 className="text-2xl font-bold text-cyan-600">

                            {formData.gst_compliance_score}%

                        </h2>

                    </div>

                </div>

                <div className="mt-10">

                    <h3 className="font-bold text-2xl">

                        Strengths

                    </h3>

                    <ul className="list-disc ml-6 mt-3">

                        {result.strengths.map((item, index) => (

                            <li key={index}>{item}</li>

                        ))}

                    </ul>

                </div>
                <div className="mt-10">

                    <h3 className="text-2xl font-bold text-red-600">

                        Weaknesses

                    </h3>

                    <ul className="list-disc ml-6 mt-4">

                        {result.weaknesses.map((item, index) => (

                            <li key={index}>{item}</li>

                        ))}

                    </ul>

                </div>
                <div className="mt-10">

                    <h3 className="text-2xl font-bold text-blue-600">

                        Recommendations

                    </h3>

                    <ul className="list-disc ml-6 mt-4">

                        {result.recommendations.map((item, index) => (

                            <li key={index}>{item}</li>

                        ))}

                    </ul>

                </div>

                <div className="mt-10">
                    <div className="mt-8">

                        <FinancialChart
                            revenue={formData.monthly_revenue}
                            expense={formData.monthly_expense}
                        />

                    </div>
                    <div className="mt-8 flex gap-4">


                        <button
                            onClick={() => navigate("/assessment")}
                            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
                        >
                            New Assessment
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}