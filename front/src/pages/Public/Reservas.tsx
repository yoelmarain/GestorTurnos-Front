import { useState } from 'react';
import ListaServicios from "@/components/Reservar/ListaServicios";
import BlurText from "@/components/BlurText";
import ListaProfesionales from "@/components/Reservar/ListaProfesionales";
import SeleccionadorSlot from '@/components/Reservar/FechasyHorarios';
import TurnosLibres from '@/API/Public/SacarTurno';

export default function ReservasPage() {

    const [servicioSeleccionado, setServicioSeleccionado] = useState<number | null>(null);
    const [profesionalSeleccionado, setProfesionalSeleccionado] = useState<number | null>(null);

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
            <div className="flex flex-col justify-center gap-2 mt-8">
            <ListaServicios 
                servicioSeleccionado={servicioSeleccionado}
                setServicioSeleccionado={setServicioSeleccionado}
            />
            { servicioSeleccionado &&
            <ListaProfesionales 
                profesionalSeleccionado={profesionalSeleccionado}
                setProfesionalSeleccionado={setProfesionalSeleccionado}
            />
            }
            { profesionalSeleccionado && servicioSeleccionado && (
                <div className="flex flex-col justify-center">
                <SeleccionadorSlot 
                    slots_disponibles={TurnosLibres.slots_disponibles}
                />
                </div>
            )}
            </div>
        </div>
    );
}