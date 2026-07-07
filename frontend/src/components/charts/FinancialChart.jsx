import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Cell,
} from "recharts";

export default function FinancialChart({ revenue, expense }) {

    const data = [
        {
            name: "Revenue",
            Amount: revenue,
            color: "#2563eb",
        },
        {
            name: "Expense",
            Amount: expense,
            color: "#ef4444",
        },
    ];

    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <h2 className="text-xl font-bold text-slate-900">

                        Revenue vs Expense

                    </h2>

                    <p className="text-sm text-slate-500">

                        Monthly financial comparison

                    </p>

                </div>

            </div>

            <ResponsiveContainer width="100%" height={320}>

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="Amount"
                        radius={[10, 10, 0, 0]}
                    >

                        {data.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={entry.color}
                            />

                        ))}

                    </Bar>

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}