import { useState } from 'react';
import ListaServicios from "@/components/Reservar/ListaServicios";
import BlurText from "@/components/BlurText";
import ListaProfesionales from "@/components/Reservar/ListaProfesionales";
import SeleccionadorSlot from '@/components/Reservar/FechasyHorarios';
import TurnosLibres from '@/API/Public/SacarTurno';
import { Button } from '@/components/ui/button';

export default function ReservasPage() {

    const [servicioSeleccionado, setServicioSeleccionado] = useState<number | null>(null);
    const [profesionalSeleccionado, setProfesionalSeleccionado] = useState<number | null>(null);
    const [slotSeleccionado, setSlotSeleccionado] = useState<{start: string, end: string} | null>(null);

    const ReservarTurno = () => {
        console.log('Aca se hace la llamadaa a la API');
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
            { profesionalSeleccionado && (
                <div className="flex flex-col justify-center">
                <SeleccionadorSlot 
                    slots_disponibles={TurnosLibres.slots_disponibles}
                    slotSeleccionado={slotSeleccionado}
                    setSlotSeleccionado={setSlotSeleccionado}
                />
                </div>
            )}
            { slotSeleccionado && (
                <div className=" p-4 flex justify-end">
                    <Button 
                    onClick={() => { ReservarTurno();}}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Reservar Turno
                    </Button>
                </div>
            )}
            </div>
        </div>
    );
}