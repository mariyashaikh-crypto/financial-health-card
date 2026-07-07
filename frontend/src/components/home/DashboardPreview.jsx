import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const revenueData = [
    { month: "Jan", value: 35 },
    { month: "Feb", value: 42 },
    { month: "Mar", value: 40 },
    { month: "Apr", value: 58 },
    { month: "May", value: 62 },
    { month: "Jun", value: 78 },
];

const riskData = [
    { name: "Healthy", value: 70 },
    { name: "Medium", value: 20 },
    { name: "High", value: 10 },
];

const COLORS = ["#2563eb", "#06b6d4", "#f97316"];

export default function DashboardPreview() {
    return (
        <section className="py-16 bg-slate-50">

            <div className="max-w-5xl mx-auto px-6">

                <div className="text-center">

                    <p className="text-blue-600 font-semibold uppercase tracking-widest">
                        Dashboard
                    </p>

                    <h2 className="mt-4 text-4xl font-black">
                        Financial Intelligence Dashboard
                    </h2>

                    <p className="mt-5 text-slate-500 max-w-3xl mx-auto text-lg">
                        AI-powered analytics for smarter MSME credit assessment.
                    </p>

                </div>

                <div className="grid lg:grid-cols-3 gap-8 mt-16">

                    {/* Revenue Chart */}

                    <div className="lg:col-span-2 rounded-3xl bg-white shadow-xl p-6">

                        <div className="flex justify-between items-center mb-8">

                            <div>

                                <p className="text-slate-500">
                                    Revenue Trend
                                </p>

                                <h2 className="text-3xl font-bold">
                                    +18%
                                </h2>

                            </div>

                            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                                Growing
                            </span>

                        </div>

                        <ResponsiveContainer width="100%" height={300}>

                            <LineChart data={revenueData}>

                                <CartesianGrid strokeDasharray="4 4" />

                                <XAxis dataKey="month" />

                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#2563eb"
                                    strokeWidth={4}
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    </div>

                    {/* Risk Pie */}

                    <div className="rounded-3xl bg-white shadow-xl p-8">

                        <h3 className="text-2xl font-bold mb-6">
                            Risk Distribution
                        </h3>

                        <ResponsiveContainer width="100%" height={250}>

                            <PieChart>

                                <Pie
                                    data={riskData}
                                    innerRadius={55}
                                    outerRadius={90}
                                    paddingAngle={4}
                                    dataKey="value"
                                >

                                    {riskData.map((entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={COLORS[index]}
                                        />
                                    ))}

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                        <div className="space-y-3 mt-6">

                            <div className="flex justify-between">

                                <span>Healthy</span>

                                <span className="font-semibold">
                                    70%
                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span>Medium</span>

                                <span className="font-semibold">
                                    20%
                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span>High</span>

                                <span className="font-semibold">
                                    10%
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* KPI Cards */}

                <div className="grid md:grid-cols-4 gap-6 mt-10">

                    {[
                        ["842", "Financial Score"],
                        ["₹18L", "Loan Eligibility"],
                        ["91%", "GST Compliance"],
                        ["Low", "Risk Level"],
                    ].map(([value, label], index) => (

                        <div
                            key={index}
                            className="rounded-3xl bg-white p-8 shadow-lg"
                        >

                            <h2 className="text-4xl font-black text-blue-600">
                                {value}
                            </h2>

                            <p className="mt-3 text-slate-500">
                                {label}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}