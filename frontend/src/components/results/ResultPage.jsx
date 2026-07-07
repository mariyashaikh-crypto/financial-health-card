import {
    ShieldCheck,
    TrendingUp,
    AlertTriangle,
    BadgeIndianRupee,
} from "lucide-react";

export default function ResultPage() {
    return (
        <section className="py-16">

            <div className="max-w-5xl mx-auto px-6">

                <h2 className="text-5xl font-black text-center">
                    Financial Health Card
                </h2>

                <p className="text-center text-slate-500 mt-4">
                    AI Generated Credit Assessment Report
                </p>

                <div className="grid lg:grid-cols-3 gap-8 mt-16">

                    {/* Score */}

                    <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

                        <h1 className="text-7xl font-black text-blue-600">
                            842
                        </h1>

                        <p className="mt-3 text-slate-500">
                            Financial Score
                        </p>

                        <span className="inline-block mt-6 bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">
                            Excellent
                        </span>

                    </div>

                    {/* Recommendation */}

                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">

                        <h3 className="text-3xl font-bold">
                            AI Recommendation
                        </h3>

                        <p className="mt-5 text-slate-600 leading-8">
                            This MSME demonstrates strong financial stability,
                            excellent GST compliance and consistent revenue growth.
                            Recommended for loan approval with low credit risk.
                        </p>

                        <div className="grid md:grid-cols-3 gap-5 mt-10">

                            <div className="bg-slate-50 rounded-2xl p-5">

                                <ShieldCheck className="text-green-600" />

                                <h4 className="font-bold mt-4">
                                    Risk
                                </h4>

                                <p className="text-green-600">
                                    Low
                                </p>

                            </div>

                            <div className="bg-slate-50 rounded-2xl p-5">

                                <TrendingUp className="text-blue-600" />

                                <h4 className="font-bold mt-4">
                                    Growth
                                </h4>

                                <p>
                                    +18%
                                </p>

                            </div>

                            <div className="bg-slate-50 rounded-2xl p-5">

                                <BadgeIndianRupee className="text-cyan-600" />

                                <h4 className="font-bold mt-4">
                                    Loan
                                </h4>

                                <p>
                                    ₹18 Lakh
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Risk Factors */}

                <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

                    <div className="flex items-center gap-3">

                        <AlertTriangle className="text-orange-500" />

                        <h3 className="text-2xl font-bold">
                            Risk Factors
                        </h3>

                    </div>

                    <ul className="mt-6 space-y-4 text-slate-600">

                        <li>• Strong GST compliance history.</li>

                        <li>• Stable monthly revenue trend.</li>

                        <li>• Healthy banking transaction pattern.</li>

                        <li>• Low debt-to-income ratio.</li>

                    </ul>

                </div>

            </div>

        </section>
    );
}