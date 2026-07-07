import { motion } from "framer-motion";
import {
    TrendingUp,
    Wallet,
    ShieldCheck,
    BarChart3,
} from "lucide-react";

export default function HeroDashboard() {

    return (

        <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-md mx-auto"
        >

            {/* Floating Card */}

            <div className="absolute -top-5 -left-5 bg-white rounded-xl shadow-lg px-4 py-3 z-20">

                <p className="text-[11px] text-slate-500">

                    Loan Eligibility

                </p>

                <h3 className="font-bold text-green-600 text-lg">

                    ₹18 Lakh

                </h3>

            </div>

            {/* Floating Card */}

            <div className="absolute -bottom-5 -right-5 bg-white rounded-xl shadow-lg px-4 py-3 z-20">

                <p className="text-[11px] text-slate-500">

                    AI Confidence

                </p>

                <h3 className="font-bold text-blue-600 text-lg">

                    98%

                </h3>

            </div>

            <div className="rounded-3xl border border-slate-200 bg-white shadow-xl p-6">

                <div className="flex items-start justify-between">

                    <div>

                        <p className="text-sm text-slate-500">

                            Financial Health Score

                        </p>

                        <h1 className="mt-2 text-5xl font-black text-blue-600">

                            842

                        </h1>

                    </div>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                        Excellent

                    </span>

                </div>

                <div className="mt-6 h-2 rounded-full bg-slate-200 overflow-hidden">

                    <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"></div>

                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">

                    <div className="rounded-xl bg-slate-50 p-4">

                        <TrendingUp size={20} className="text-green-600" />

                        <h2 className="mt-2 text-xl font-bold">

                            +18%

                        </h2>

                        <p className="text-xs text-slate-500">

                            Revenue Growth

                        </p>

                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">

                        <Wallet size={20} className="text-blue-600" />

                        <h2 className="mt-2 text-xl font-bold">

                            ₹18L

                        </h2>

                        <p className="text-xs text-slate-500">

                            Eligible Loan

                        </p>

                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">

                        <ShieldCheck size={20} className="text-green-600" />

                        <h2 className="mt-2 text-xl font-bold">

                            Low

                        </h2>

                        <p className="text-xs text-slate-500">

                            Risk Level

                        </p>

                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">

                        <BarChart3 size={20} className="text-cyan-600" />

                        <h2 className="mt-2 text-xl font-bold">

                            91%

                        </h2>

                        <p className="text-xs text-slate-500">

                            GST Score

                        </p>

                    </div>

                </div>

            </div>

        </motion.div>

    );

}