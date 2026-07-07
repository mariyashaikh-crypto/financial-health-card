import { motion } from "framer-motion";
import {
    Brain,
    Clock3,
    Building2,
    BadgeCheck,
} from "lucide-react";

const stats = [
    {
        icon: <BadgeCheck size={24} />,
        value: "98%",
        title: "Prediction Accuracy",
        color: "text-blue-600",
    },
    {
        icon: <Building2 size={24} />,
        value: "500+",
        title: "MSMEs Assessed",
        color: "text-cyan-600",
    },
    {
        icon: <Clock3 size={24} />,
        value: "2 Sec",
        title: "Average Response",
        color: "text-green-600",
    },
    {
        icon: <Brain size={24} />,
        value: "AI",
        title: "Explainable Intelligence",
        color: "text-purple-600",
    },
];

export default function Stats() {
    return (
        <section className="py-10">

            <div className="max-w-6xl mx-auto px-5">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: .6 }}
                    viewport={{ once: true }}
                >

                    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-900">

                        Trusted Financial Intelligence

                    </h2>

                    <p className="text-center text-slate-500 mt-3 text-base">

                        Fast, transparent and AI-powered MSME credit assessment.

                    </p>

                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">

                    {stats.map((item, index) => (

                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="rounded-2xl bg-white border border-slate-200 shadow-md p-5"
                        >

                            <div className={item.color}>

                                {item.icon}

                            </div>

                            <h1 className="text-3xl font-black mt-4">

                                {item.value}

                            </h1>

                            <p className="mt-2 text-sm text-slate-500">

                                {item.title}

                            </p>

                        </motion.div>

                    ))}

                </div>

            </div>

        </section>
    );
}