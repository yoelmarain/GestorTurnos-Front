import { useEffect, useState } from 'react';
import ListaServicios from "@/components/Reservar/ListaServicios";
import BlurText from "@/components/BlurText";
import ListaProfesionales from "@/components/Reservar/ListaProfesionales";
import SeleccionadorSlot from '@/components/Reservar/FechasyHorarios';
import { getSlots, reservarTurno } from '@/API/Public/SacarTurno';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CheckCircle, Scissors, User, Clock, CheckCircle2 } from 'lucide-react';

interface Slot {
    start: string;
    end: string;
}

interface Respuesta {
    profesional_id: string;
    servicio_id: string;
    slots_disponibles: Slot[];
}

const pasos = [
    { num: 1, label: 'Servicio', icono: <Scissors className="w-4 h-4" /> },
    { num: 2, label: 'Profesional', icono: <User className="w-4 h-4" /> },
    { num: 3, label: 'Horario', icono: <Clock className="w-4 h-4" /> },
];

function Stepper({ pasoActual }: { pasoActual: number }) {
    return (
        <div className="flex items-center justify-center gap-0 mb-10 px-4">
            {pasos.map((paso, i) => {
                const completado = pasoActual > paso.num;
                const activo = pasoActual === paso.num;
                return (
                    <div key={paso.num} className="flex items-center">
                        <div className="flex flex-col items-center gap-1.5">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                                    completado
                                        ? 'bg-emerald-500 border-emerald-500 text-white'
                                        : activo
                                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/30'
                                        : 'bg-slate-800 border-slate-600 text-slate-500'
                                }`}
                            >
                                {completado ? <CheckCircle2 className="w-5 h-5" /> : paso.icono}
                            </div>
                            <span
                                className={`text-xs font-medium transition-colors ${
                                    completado
                                        ? 'text-emerald-400'
                                        : activo
                                        ? 'text-white'
                                        : 'text-slate-500'
                                }`}
                            >
                                {paso.label}
                            </span>
                        </div>
                        {i < pasos.length - 1 && (
                            <div
                                className={`w-24 h-0.5 mx-2 mb-5 transition-colors duration-300 ${
                                    pasoActual > paso.num ? 'bg-emerald-500' : 'bg-slate-700'
                                }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default function ReservasPage() {
    const [servicioSeleccionado, setServicioSeleccionado] = useState<number | null>(null);
    const [profesionalSeleccionado, setProfesionalSeleccionado] = useState<number | null>(null);
    const [slotsDisponibles, setSlotsDisponibles] = useState<Respuesta | null>(null);
    const [slotSeleccionado, setSlotSeleccionado] = useState<{ start: string; end: string } | null>(null);
    const [reservando, setReservando] = useState(false);

    const pasoActual = !servicioSeleccionado ? 1 : !profesionalSeleccionado ? 2 : 3;

    const ReservarTurno = async () => {
        if (!slotSeleccionado || !profesionalSeleccionado || !servicioSeleccionado) return;
        setReservando(true);
        try {
            await reservarTurno(slotSeleccionado.start, profesionalSeleccionado, servicioSeleccionado);
            sessionStorage.setItem('turno_ok', '1');
            sessionStorage.setItem('turno_hora', slotSeleccionado.start);
            window.location.reload();
        } catch (error) {
            toast.error('Error al reservar el turno', {
                description: String(error),
                position: 'top-center',
            });
        } finally {
            setReservando(false);
        }
    };

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const data = await getSlots(profesionalSeleccionado!, servicioSeleccionado!);
                setSlotsDisponibles(data);
            } catch (error) {
                console.error('Error fetching slots:', error);
            }
        };
        if (profesionalSeleccionado && servicioSeleccionado) {
            fetchSlots();
        }
    }, [profesionalSeleccionado]);

    return (
        <div className="min-h-screen p-4 pb-16">
            <div className="max-w-4xl mx-auto">
                <div className="ml-2 mb-2">
                    <BlurText
                        text="Reserva tu Turno"
                        delay={400}
                        animateBy="words"
                        direction="top"
                        className="text-5xl md:text-6xl text-white font-bold"
                    />
                    <p className="text-slate-400 mt-2 text-base">
                        Seguí los pasos para elegir tu servicio, profesional y horario.
                    </p>
                </div>

                <div className="mt-10">
                    <Stepper pasoActual={pasoActual} />
                </div>

                <div className="flex flex-col gap-2">
                    <ListaServicios
                        servicioSeleccionado={servicioSeleccionado}
                        setServicioSeleccionado={(id) => {
                            setServicioSeleccionado(id);
                            setProfesionalSeleccionado(null);
                            setSlotSeleccionado(null);
                            setSlotsDisponibles(null);
                        }}
                    />

                    {servicioSeleccionado && (
                        <ListaProfesionales
                            profesionalSeleccionado={profesionalSeleccionado}
                            setProfesionalSeleccionado={(id) => {
                                setProfesionalSeleccionado(id);
                                setSlotSeleccionado(null);
                            }}
                        />
                    )}

                    {profesionalSeleccionado && (
                        <SeleccionadorSlot
                            slots_disponibles={slotsDisponibles?.slots_disponibles || []}
                            slotSeleccionado={slotSeleccionado}
                            setSlotSeleccionado={setSlotSeleccionado}
                        />
                    )}

                    {slotSeleccionado && (
                        <div className="mt-4 p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col items-center gap-4">
                            <div className="text-center">
                                <p className="text-white font-semibold text-lg">¡Todo listo para reservar!</p>
                                <p className="text-slate-400 text-sm mt-1">
                                    Confirmá tu turno para el{' '}
                                    <span className="text-white font-medium">
                                        {(() => {
                                            const f = new Date(slotSeleccionado.start);
                                            return `${String(f.getDate()).padStart(2, '0')}/${String(f.getMonth() + 1).padStart(2, '0')} a las ${slotSeleccionado.start.slice(11, 16)}`;
                                        })()}
                                    </span>
                                </p>
                            </div>
                            <Button
                                onClick={ReservarTurno}
                                disabled={reservando}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-10 py-5 text-base rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/20"
                            >
                                <CheckCircle className="w-5 h-5" />
                                {reservando ? 'Reservando...' : 'Confirmar Reserva'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
