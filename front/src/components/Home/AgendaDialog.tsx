import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { getTurnosByProfesional } from "@/API/Public/SacarTurno";
import { getServicios } from "@/API/Public/Servicios";
import { updateEstadoTurno } from "@/API/Admin/Turnos";
import { toast } from "sonner";
import { Clock, CalendarDays, CheckCircle2, XCircle, Circle } from "lucide-react";

interface Turno {
    id: number;
    fecha_turno: string;
    estado: string;
    cliente: number;
    profesional: number;
    servicio: number | { id: number; nombre_servicio: string };
}

interface Servicio {
    id: number;
    nombre_servicio: string;
}

interface DiaAgenda {
    fecha: Date;
    label: string;
    esHoy: boolean;
    turnos: Turno[];
}

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    profesionalId: number;
    nombreProfesional: string;
}

const DIAS_COMPLETO = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

function getLunesToViernes(): Date[] {
    const hoy = new Date();
    const diaSemana = hoy.getDay();
    const lunes = new Date(hoy);
    lunes.setDate(hoy.getDate() - (diaSemana === 0 ? 6 : diaSemana - 1));
    lunes.setHours(0, 0, 0, 0);
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(lunes);
        d.setDate(lunes.getDate() + i);
        return d;
    });
}

function mismaFecha(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

function estadoBadge(estado: string) {
    switch (estado?.toLowerCase()) {
        case "reservado":
            return (
                <span className="flex items-center gap-1 text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                    <Circle className="w-2.5 h-2.5 fill-blue-400" />
                    Reservado
                </span>
            );
        case "completado":
        case "finalizado":
            return (
                <span className="flex items-center gap-1 text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    Completado
                </span>
            );
        case "cancelado":
            return (
                <span className="flex items-center gap-1 text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                    <XCircle className="w-2.5 h-2.5" />
                    Cancelado
                </span>
            );
        default:
            return (
                <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
                    {estado}
                </span>
            );
    }
}

export function AgendaDialog({ open, onOpenChange, profesionalId, nombreProfesional }: Props) {
    const [turnos, setTurnos] = useState<Turno[]>([]);
    const [servicios, setServicios] = useState<Servicio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [actualizando, setActualizando] = useState<number | null>(null);

    const cargarTurnos = async () => {
        try {
            const [turnosData, serviciosData] = await Promise.all([
                getTurnosByProfesional(profesionalId),
                getServicios(),
            ]);
            setTurnos(turnosData);
            setServicios(serviciosData);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!open) return;
        setLoading(true);
        setError(false);
        cargarTurnos();
    }, [open, profesionalId]);

    const handleCambiarEstado = async (id: number, nuevoEstado: string) => {
        setActualizando(id);
        try {
            await updateEstadoTurno(id, nuevoEstado);
            toast.success(`Turno marcado como ${nuevoEstado}`, { position: "top-center" });
            setTurnos((prev) =>
                prev.map((t) => (t.id === id ? { ...t, estado: nuevoEstado } : t))
            );
        } catch (err) {
            toast.error("Error al actualizar el turno", {
                description: String(err),
                position: "top-center",
            });
        } finally {
            setActualizando(null);
        }
    };

    const getNombreServicio = (servicio: number | { id: number; nombre_servicio: string }) => {
        if (typeof servicio === "object" && servicio !== null) {
            return servicio.nombre_servicio;
        }
        const found = servicios.find((s) => s.id === servicio);
        return found ? found.nombre_servicio : `Servicio #${servicio}`;
    };

    const semana = getLunesToViernes();
    const hoy = new Date();

    const diasAgenda: DiaAgenda[] = semana.map((fecha) => ({
        fecha,
        label: `${DIAS_COMPLETO[fecha.getDay()]} ${fecha.getDate()}/${fecha.getMonth() + 1}`,
        esHoy: mismaFecha(fecha, hoy),
        turnos: turnos
            .filter((t) => mismaFecha(new Date(t.fecha_turno), fecha))
            .sort((a, b) => new Date(a.fecha_turno).getTime() - new Date(b.fecha_turno).getTime()),
    }));

    const totalSemana = diasAgenda.reduce((acc, d) => acc + d.turnos.length, 0);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto bg-gray-900 border-gray-700">
                <DialogHeader>
                    <DialogTitle className="text-white text-xl flex items-center gap-2">
                        <CalendarDays className="w-5 h-5 text-blue-400" />
                        Agenda — {nombreProfesional}
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Turnos de la semana actual · {totalSemana} turno{totalSemana !== 1 ? "s" : ""} en total
                    </DialogDescription>
                </DialogHeader>

                {loading && (
                    <div className="space-y-3 py-2">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="animate-pulse rounded-lg bg-slate-800 h-16" />
                        ))}
                    </div>
                )}

                {error && (
                    <div className="py-6 text-center">
                        <p className="text-red-400 font-medium">No se pudo cargar la agenda.</p>
                        <p className="text-slate-500 text-sm mt-1">Verificá que el servidor esté en línea.</p>
                    </div>
                )}

                {!loading && !error && (
                    <div className="space-y-3 py-1">
                        {diasAgenda.map((dia) => (
                            <div
                                key={dia.label}
                                className={`rounded-xl border p-4 transition-colors ${
                                    dia.esHoy
                                        ? "border-blue-500/50 bg-blue-500/5"
                                        : "border-slate-700 bg-slate-800/40"
                                }`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`text-sm font-semibold ${
                                                dia.esHoy ? "text-blue-400" : "text-white"
                                            }`}
                                        >
                                            {dia.label}
                                        </span>
                                        {dia.esHoy && (
                                            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-medium">
                                                Hoy
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs text-slate-400">
                                        {dia.turnos.length} turno{dia.turnos.length !== 1 ? "s" : ""}
                                    </span>
                                </div>

                                {dia.turnos.length === 0 ? (
                                    <p className="text-slate-500 text-sm text-center py-2">Sin turnos</p>
                                ) : (
                                    <div className="space-y-2">
                                        {dia.turnos.map((turno) => {
                                            const hora = new Date(turno.fecha_turno);
                                            const horaStr = `${String(hora.getHours()).padStart(2, "0")}:${String(hora.getMinutes()).padStart(2, "0")}`;
                                            const esReservado = turno.estado?.toLowerCase() === "reservado";
                                            const cargando = actualizando === turno.id;

                                            return (
                                                <div
                                                    key={turno.id}
                                                    className="flex items-center justify-between bg-slate-900/60 rounded-lg px-3 py-2 gap-2"
                                                >
                                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                                        <div className="flex items-center gap-1.5 text-amber-400 flex-shrink-0">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            <span className="text-sm font-medium text-white">
                                                                {horaStr}
                                                            </span>
                                                        </div>
                                                        <span className="text-slate-300 text-sm truncate">
                                                            {getNombreServicio(turno.servicio)}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-2 flex-shrink-0">
                                                        {estadoBadge(turno.estado)}

                                                        {esReservado && (
                                                            <div className="flex items-center gap-1">
                                                                <button
                                                                    title="Marcar como Completado"
                                                                    disabled={cargando}
                                                                    onClick={() => handleCambiarEstado(turno.id, "Completado")}
                                                                    className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 transition-colors disabled:opacity-40"
                                                                >
                                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                                </button>
                                                                <button
                                                                    title="Cancelar turno"
                                                                    disabled={cargando}
                                                                    onClick={() => handleCambiarEstado(turno.id, "Cancelado")}
                                                                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 transition-colors disabled:opacity-40"
                                                                >
                                                                    <XCircle className="w-3.5 h-3.5" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
