import DashboardPreview from "../components/home/DashboardPreview";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/hero/Hero";
import Stats from "../components/home/Stats";
import Features from "../components/home/Features";

export default function Home() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-slate-50">

            {/* Background */}
            <div className="absolute inset-0 -z-10">

                <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-400/15 blur-[160px]" />

                <div className="absolute top-72 -right-24 h-80 w-80 rounded-full bg-cyan-400/15 blur-[160px]" />

                <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-indigo-400/15 blur-[160px]" />

            </div>

            <Navbar />

            <div className="max-w-6xl mx-auto px-5">

                <Hero />

                <div className="mt-14">

                    <Stats />

                </div>

                <div className="mt-16">

                    <Features />

                </div>

                <div className="mt-16 mb-16">

                    <DashboardPreview />

                </div>

            </div>

        </main>
    );
}