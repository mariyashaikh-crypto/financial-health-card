import { motion } from "framer-motion";
import {
    BrainCircuit,
    Landmark,
    ShieldCheck,
    BarChart3,
    FileText,
    Zap,
} from "lucide-react";

const features = [
    {
        icon: BrainCircuit,
        title: "AI Credit Assessment",
        desc: "Machine learning evaluates MSME creditworthiness instantly.",
        color: "from-blue-500 to-cyan-500",
    },
    {
        icon: Landmark,
        title: "Alternative Data",
        desc: "GST, UPI, Banking and Financial Statements combined.",
        color: "from-cyan-500 to-sky-500",
    },
    {
        icon: ShieldCheck,
        title: "Explainable AI",
        desc: "Transparent reasons behind every prediction.",
        color: "from-green-500 to-emerald-500",
    },
    {
        icon: BarChart3,
        title: "Risk Analytics",
        desc: "Visual insights into financial health.",
        color: "from-orange-500 to-red-500",
    },
    {
        icon: FileText,
        title: "Health Card",
        desc: "Professional downloadable report.",
        color: "from-indigo-500 to-violet-500",
    },
    {
        icon: Zap,
        title: "2 Second Decision",
        desc: "Instant AI recommendation.",
        color: "from-pink-500 to-purple-500",
    },
];

export default function Features() {
    return (
        <section id="features" className="py-10">

            <div className="max-w-6xl mx-auto px-5">

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >

                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">

                        Features

                    </p>

                    <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900">

                        Built for Modern MSME Lending

                    </h2>

                    <p className="mt-4 max-w-2xl mx-auto text-base text-slate-500">

                        AI-powered financial analysis using GST, UPI, Banking and
                        Financial Statements for smarter lending decisions.

                    </p>

                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">

                    {features.map((item, index) => {

                        const Icon = item.icon;

                        return (

                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08 }}
                                viewport={{ once: true }}
                                whileHover={{
                                    y: -6,
                                }}
                                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md hover:shadow-lg transition"
                            >

                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${item.color} text-white`}
                                >

                                    <Icon size={22} />

                                </div>

                                <h3 className="mt-5 text-xl font-bold text-slate-900">

                                    {item.title}

                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">

                                    {item.desc}

                                </p>

                            </motion.div>

                        );

                    })}

                </div>

            </div>

        </section>
    );
}