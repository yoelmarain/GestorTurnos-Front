import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ListaServicios from "@/components/Reservar/ListaServicios";
import ListaProfesionales from "@/components/Reservar/ListaProfesionales";
import SeleccionadorSlot from "@/components/Reservar/FechasyHorarios";
import { getSlots, reservarTurno } from "@/API/Public/SacarTurno";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

interface Slot {
    start: string;
    end: string;
}

interface Respuesta {
    profesional_id: string;
    servicio_id: string;
    slots_disponibles: Slot[];
}

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    profesionalPreseleccionado?: number | null;
}

export function CrearTurnoDialog({ open, onOpenChange, profesionalPreseleccionado }: Props) {
    const [servicioSeleccionado, setServicioSeleccionado] = useState<number | null>(null);
    const [profesionalSeleccionado, setProfesionalSeleccionado] = useState<number | null>(
        profesionalPreseleccionado ?? null
    );
    const [slotsDisponibles, setSlotsDisponibles] = useState<Respuesta | null>(null);
    const [slotSeleccionado, setSlotSeleccionado] = useState<Slot | null>(null);
    const [loading, setLoading] = useState(false);
    const [paso, setPaso] = useState<1 | 2 | 3>(1);

    useEffect(() => {
        if (open) {
            setServicioSeleccionado(null);
            setProfesionalSeleccionado(profesionalPreseleccionado ?? null);
            setSlotsDisponibles(null);
            setSlotSeleccionado(null);
            setPaso(profesionalPreseleccionado ? 1 : 1);
        }
    }, [open, profesionalPreseleccionado]);

    useEffect(() => {
        if (profesionalSeleccionado && servicioSeleccionado) {
            const fetchSlots = async () => {
                try {
                    const data = await getSlots(profesionalSeleccionado, servicioSeleccionado);
                    setSlotsDisponibles(data);
                    setPaso(3);
                } catch (error) {
                    console.error("Error al cargar slots:", error);
                }
            };
            fetchSlots();
        }
    }, [profesionalSeleccionado, servicioSeleccionado]);

    const handleReservar = async () => {
        if (!slotSeleccionado || !profesionalSeleccionado || !servicioSeleccionado) return;
        setLoading(true);
        try {
            await reservarTurno(slotSeleccionado.start, profesionalSeleccionado, servicioSeleccionado);
            toast.success("Turno creado con éxito", {
                description: (() => {
                    const fecha = new Date(slotSeleccionado.start);
                    const dia = String(fecha.getDate()).padStart(2, "0");
                    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
                    const horas = String(fecha.getHours()).padStart(2, "0");
                    const minutos = String(fecha.getMinutes()).padStart(2, "0");
                    return `${dia}/${mes} a las ${horas}:${minutos}`;
                })(),
                position: "top-center",
            });
            onOpenChange(false);
        } catch (error) {
            toast.error("Error al crear el turno", {
                description: String(error),
                position: "top-center",
            });
        } finally {
            setLoading(false);
        }
    };

    const pasos = [
        { num: 1, label: "Servicio" },
        { num: 2, label: "Profesional" },
        { num: 3, label: "Horario" },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto bg-gray-900 border-gray-700">
                <DialogHeader>
                    <DialogTitle className="text-white text-xl">Crear Nuevo Turno</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Seleccioná el servicio, profesional y horario disponible.
                    </DialogDescription>
                </DialogHeader>

                {/* Indicador de pasos */}
                <div className="flex items-center gap-2 mb-2">
                    {pasos.map((p, i) => (
                        <div key={p.num} className="flex items-center gap-2">
                            <div
                                className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-colors ${
                                    paso > p.num
                                        ? "bg-emerald-500 text-white"
                                        : paso === p.num
                                        ? "bg-blue-600 text-white"
                                        : "bg-slate-700 text-slate-400"
                                }`}
                            >
                                {paso > p.num ? <CheckCircle className="w-4 h-4" /> : p.num}
                            </div>
                            <span
                                className={`text-sm font-medium ${
                                    paso >= p.num ? "text-white" : "text-slate-500"
                                }`}
                            >
                                {p.label}
                            </span>
                            {i < pasos.length - 1 && (
                                <div
                                    className={`h-px w-8 mx-1 ${
                                        paso > p.num ? "bg-emerald-500" : "bg-slate-700"
                                    }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="space-y-2">
                    <ListaServicios
                        servicioSeleccionado={servicioSeleccionado}
                        setServicioSeleccionado={(id) => {
                            setServicioSeleccionado(id);
                            setPaso(2);
                        }}
                    />

                    {servicioSeleccionado && (
                        <ListaProfesionales
                            profesionalSeleccionado={profesionalSeleccionado}
                            setProfesionalSeleccionado={(id) => {
                                setProfesionalSeleccionado(id);
                            }}
                        />
                    )}

                    {profesionalSeleccionado && servicioSeleccionado && (
                        <SeleccionadorSlot
                            slots_disponibles={slotsDisponibles?.slots_disponibles || []}
                            slotSeleccionado={slotSeleccionado}
                            setSlotSeleccionado={setSlotSeleccionado}
                        />
                    )}
                </div>

                {slotSeleccionado && (
                    <div className="flex justify-end gap-3 pt-2 border-t border-slate-700">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="border-slate-600"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleReservar}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {loading ? "Creando..." : "Confirmar Turno"}
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
