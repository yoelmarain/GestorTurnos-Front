import ListaServicios from "@/components/ListaServicios";
import BlurText from "@/components/BlurText";

export default function ReservasPage() {


    const handleAnimationComplete = () => {
        console.log('Animation completed!');
    };
    return (
        <div className="p-4">
            <div className="ml-6">
            <BlurText
            text="Reserva tu Turno"
            delay={400}
            animateBy="words"
            direction="top"
            className="text-6xl mb-8 text-white font-bold"
            onAnimationComplete={handleAnimationComplete}
            />
            </div>
            <ListaServicios />
        </div>
    );
}