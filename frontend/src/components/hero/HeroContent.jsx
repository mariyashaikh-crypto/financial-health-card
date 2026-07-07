import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroContent() {

    const navigate = useNavigate();

    return (

        <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="py-6"
        >

            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">

                <Sparkles size={16} />

                AI Powered Credit Assessment

            </div>

            {/* Heading */}

            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">

                Financial

                <br />

                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 bg-clip-text text-transparent">

                    Health Card

                </span>

            </h1>

            {/* Description */}

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600">

                Evaluate MSME loan eligibility using GST, UPI, Banking,
                Financial Statements and Explainable AI within seconds.

            </p>

            {/* Buttons */}

            <div className="mt-8 flex flex-wrap gap-4">

                <button
                    onClick={() => navigate("/assessment")}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
                >

                    Start Assessment

                    <ArrowRight size={16} />

                </button>

                <button className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:shadow-md">

                    Live Demo

                </button>

            </div>

            {/* Trust Points */}

            <div className="mt-10 flex flex-wrap gap-6 text-sm">

                <div className="flex items-center gap-2">

                    <ShieldCheck size={18} className="text-green-600" />

                    <span>Secure</span>

                </div>

                <div className="flex items-center gap-2">

                    <ShieldCheck size={18} className="text-green-600" />

                    <span>AI Powered</span>

                </div>

                <div className="flex items-center gap-2">

                    <ShieldCheck size={18} className="text-green-600" />

                    <span>Instant Decision</span>

                </div>

            </div>

        </motion.div>

    );

}