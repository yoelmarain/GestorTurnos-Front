import { Link } from "react-router-dom";
import BlurText from "@/components/BlurText";

export default function HomePage() {
    return (
        <div className="min-h-screen text-white">

            {/* Hero */}
            <section className="flex flex-col items-center justify-center text-center px-6 py-32 gap-6">
                <BlurText
                    text="Tu mejor versión empieza acá"
                    className="text-5xl md:text-6xl font-bold tracking-tight"
                    animateBy="words"
                    direction="top"
                    delay={80}
                />
                <p className="text-gray-400 text-lg max-w-xl">
                    Reservá tu turno online, elegí tu profesional y llega listo. Sin esperas, sin llamadas.
                </p>
                <Link
                    to="/reservas"
                    className="mt-4 px-8 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-colors duration-200 text-lg"
                >
                    Reservar turno
                </Link>
            </section>

            {/* Separator */}
            <div className="border-t border-gray-800 mx-12" />

            {/* Features */}
            <section className="py-24 px-6">
                <h2 className="text-center text-3xl font-bold mb-16 text-gray-100">¿Por qué elegirnos?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {[
                        {
                            icon: "✂️",
                            title: "Profesionales expertos",
                            desc: "Nuestro equipo tiene años de experiencia en cortes modernos y clásicos.",
                        },
                        {
                            icon: "📅",
                            title: "Turnos online 24/7",
                            desc: "Reservá cuando quieras desde tu celular o PC, sin necesidad de llamar.",
                        },
                        {
                            icon: "⚡",
                            title: "Atención puntual",
                            desc: "Respetamos tu tiempo. Cuando llegás, tu profesional ya está listo.",
                        },
                    ].map((f) => (
                        <div
                            key={f.title}
                            className="flex flex-col items-center text-center gap-4 p-8 rounded-xl border border-gray-800 bg-black/30 hover:bg-black/50 transition-colors duration-200"
                        >
                            <span className="text-4xl">{f.icon}</span>
                            <h3 className="text-xl font-semibold text-white">{f.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <div className="border-t border-gray-800 mx-12" />
            <section className="flex flex-col items-center justify-center text-center px-6 py-24 gap-6">
                <h2 className="text-3xl font-bold">¿Listo para tu próximo corte?</h2>
                <p className="text-gray-400 max-w-md">
                    Elegí el servicio, el profesional y el horario que más te convenga.
                </p>
                <div className="flex gap-4 flex-wrap justify-center">
                    <Link
                        to="/reservas"
                        className="px-8 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-colors duration-200"
                    >
                        Reservar ahora
                    </Link>
                    <Link
                        to="/staff"
                        className="px-8 py-3 border border-gray-700 text-white rounded-md hover:bg-gray-800/50 transition-colors duration-200"
                    >
                        Ver nuestro staff
                    </Link>
                </div>
            </section>
        </div>
    );
}
