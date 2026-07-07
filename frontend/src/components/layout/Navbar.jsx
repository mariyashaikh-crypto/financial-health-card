import { Menu, BellDot } from "lucide-react";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-slate-200">

            <div className="max-w-5xl mx-auto h-20 px-6 flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black">

                        AI

                    </div>

                    <div>

                        <h1 className="font-bold text-lg">
                            Financial Health Card
                        </h1>

                        <p className="text-xs text-slate-500">
                            MSME Credit Intelligence
                        </p>

                    </div>

                </div>

                <nav className="hidden md:flex gap-10 font-medium">

                    <a href="#" className="hover:text-blue-600">
                        Home
                    </a>

                    <a href="#features" className="hover:text-blue-600">
                        Features
                    </a>

                    <a href="#assessment" className="hover:text-blue-600">
                        Assessment
                    </a>

                    <a href="#results" className="hover:text-blue-600">
                        Results
                    </a>

                </nav>

                <div className="flex items-center gap-4">

                    <button className="p-3 rounded-xl bg-slate-100">

                        <BellDot size={18} />

                    </button>

                    <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2.5 rounded-2xl font-semibold shadow-xl">

                        Get Started

                    </button>

                    <button className="md:hidden">

                        <Menu />

                    </button>

                </div>

            </div>

        </header>
    );
}