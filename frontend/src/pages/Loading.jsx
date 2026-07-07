import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Brain, Database, ShieldCheck, BarChart3 } from "lucide-react";

export default function Loading() {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        const timer = setTimeout(() => {

            navigate("/report", {
                state: location.state,
            });

        }, 3000);

        return () => clearTimeout(timer);

    }, []);

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-700 via-cyan-600 to-indigo-700 flex items-center justify-center">

            <div className="bg-white rounded-3xl shadow-2xl p-12 w-[650px]">

                <h1 className="text-4xl font-black text-center text-blue-700">

                    AI Financial Analysis

                </h1>

                <p className="text-center text-slate-500 mt-3">

                    Generating Financial Health Card...

                </p>

                <div className="mt-12 space-y-8">

                    <div className="flex items-center gap-4">

                        <Database className="text-blue-600 animate-pulse" />

                        <span className="text-lg">

                            Analysing GST & Banking Records

                        </span>

                    </div>

                    <div className="flex items-center gap-4">

                        <BarChart3 className="text-cyan-600 animate-pulse" />

                        <span className="text-lg">

                            Processing Financial Statements

                        </span>

                    </div>

                    <div className="flex items-center gap-4">

                        <Brain className="text-indigo-600 animate-pulse" />

                        <span className="text-lg">

                            Running Machine Learning Model

                        </span>

                    </div>

                    <div className="flex items-center gap-4">

                        <ShieldCheck className="text-green-600 animate-pulse" />

                        <span className="text-lg">

                            Preparing Financial Health Card

                        </span>

                    </div>

                </div>

                <div className="mt-12">

                    <div className="h-3 rounded-full bg-slate-200 overflow-hidden">

                        <div className="h-full w-full bg-gradient-to-r from-blue-600 to-cyan-500 animate-pulse"></div>

                    </div>

                </div>

            </div>

        </div>

    );

}