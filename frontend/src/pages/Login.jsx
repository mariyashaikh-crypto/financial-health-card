import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("demo@msme.ai");
    const [password, setPassword] = useState("Demo@123");

    function handleDemoFill() {

        setEmail("demo@msme.ai");
        setPassword("Demo@123");

    }

    function handleLogin() {

        navigate("/home");

    }

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-sky-50 to-cyan-100 flex items-center justify-center p-6">

            <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl border border-slate-200 p-8">

                <div className="text-center">

                    <h1 className="text-3xl font-extrabold text-slate-800">

                        Financial Health Card

                    </h1>

                    <p className="mt-2 text-slate-500">

                        AI Powered MSME Credit Assessment

                    </p>

                </div>

                <div className="mt-8 space-y-5">

                    <div>

                        <label className="block text-sm font-medium text-slate-600 mb-2">

                            Email

                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-medium text-slate-600 mb-2">

                            Password

                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                        />

                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-white font-bold hover:scale-[1.02] transition"
                    >

                        Login

                    </button>

                    <button
                        onClick={handleDemoFill}
                        className="w-full rounded-xl border border-blue-600 py-3 text-blue-600 font-semibold hover:bg-blue-50 transition"
                    >

                        Fill Demo Credentials

                    </button>

                    <button
                        onClick={() => navigate("/home")}
                        className="w-full rounded-xl border border-slate-300 py-3 text-slate-700 font-semibold hover:bg-slate-100 transition"
                    >

                        Continue as Guest

                    </button>

                </div>

                <div className="mt-8 rounded-xl bg-sky-50 border border-sky-200 p-4">

                    <p className="text-sm font-semibold text-sky-700">

                        Demo Credentials

                    </p>

                    <p className="mt-2 text-sm text-slate-600">

                        <strong>Email:</strong> demo@msme.ai

                    </p>

                    <p className="text-sm text-slate-600">

                        <strong>Password:</strong> Demo@123

                    </p>

                </div>

            </div>

        </div>

    );

}