import HeroContent from "./HeroContent";
import HeroDashboard from "./HeroDashboard";

export default function Hero() {
    return (
        <section className="relative overflow-hidden">

            {/* Background Glow */}

            <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-blue-300/20 blur-[120px]" />

            <div className="absolute top-10 right-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-[130px]" />

            <div className="absolute bottom-0 left-1/2 h-72 w-72 rounded-full bg-indigo-300/15 blur-[120px]" />

            {/* Content */}

            <div className="relative max-w-6xl mx-auto px-5 pt-14 pb-16">

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    <HeroContent />

                    <HeroDashboard />

                </div>

            </div>

        </section>
    );
}