import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AssessmentWizard from "../components/wizard/AssessmentWizard";

export default function Assessment() {

    const navigate = useNavigate();

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-50">

            <div className="max-w-5xl mx-auto px-6 py-10">

                <button
                    onClick={() => navigate("/home")}
                    className="flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-900 mb-8"
                >
                    <ArrowLeft size={20} />
                    Back to Home
                </button>

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-black text-slate-800">

                        MSME Financial Health Assessment

                    </h1>

                    <p className="text-slate-600 mt-4 text-lg">

                        Complete the assessment below to generate your AI-powered
                        Financial Health Card.

                    </p>

                </div>

                <AssessmentWizard />

            </div>

        </div>

    );

}