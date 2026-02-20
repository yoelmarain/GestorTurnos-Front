import { useEffect, useState } from "react";
import { getAllTurnos } from "@/API/Admin/Turnos";
import { getServicios } from "@/API/Public/Servicios";
import { Card } from "../ui/card";
import { CalendarCheck, CheckCircle2, XCircle, Activity, RefreshCw } from "lucide-react";

interface Turno {
    id: number;
    fecha_turno: string;
    estado: string;
    servicio: number | { id: number; nombre_servicio: string };
}

interface Servicio {
    id: number;
    nombre_servicio: string;
}

function tiempoRelativo(fechaStr: string): string {
    const ahora = new Date();
    const fecha = new Date(fechaStr);
    const diffMs = ahora.getTime() - fecha.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDias = Math.floor(diffHrs / 24);

    if (diffMin < 1) return "Ahora mismo";
    if (diffMin < 60) return `Hace ${diffMin} min`;
    if (diffHrs < 24) return `Hace ${diffHrs} hora${diffHrs !== 1 ? "s" : ""}`;
    if (diffDias === 1) return "Ayer";
    if (diffDias < 7) return `Hace ${diffDias} días`;
    return fecha.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
}

function iconoEstado(estado: string) {
    switch (estado?.toLowerCase()) {
        case "completado":
        case "finalizado":
            return <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />;
        case "cancelado":
            return <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />;
        default:
            return <CalendarCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />;
    }
}

function bgEstado(estado: string): string {
    switch (estado?.toLowerCase()) {
        case "completado":
        case "finalizado":
            return "bg-emerald-500/10";
        case "cancelado":
            return "bg-red-500/10";
        default:
            return "bg-blue-500/10";
    }
}

function descripcion(turno: Turno, servicios: Servicio[]): string {
    const nombreServicio =
        typeof turno.servicio === "object"
            ? turno.servicio.nombre_servicio
            : (servicios.find((s) => s.id === turno.servicio)?.nombre_servicio ?? `Servicio #${turno.servicio}`);

    const hora = new Date(turno.fecha_turno);
    const horaStr = `${String(hora.getHours()).padStart(2, "0")}:${String(hora.getMinutes()).padStart(2, "0")}`;

    switch (turno.estado?.toLowerCase()) {
        case "completado":
        case "finalizado":
            return `Turno completado — ${nombreServicio} a las ${horaStr}`;
        case "cancelado":
            return `Turno cancelado — ${nombreServicio} a las ${horaStr}`;
        default:
            return `Nuevo turno reservado — ${nombreServicio} a las ${horaStr}`;
    }
}

export default function ActividadReciente() {
    const [turnos, setTurnos] = useState<Turno[]>([]);
    const [servicios, setServicios] = useState<Servicio[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const cargar = async (silencioso = false) => {
        if (!silencioso) setLoading(true);
        else setRefreshing(true);
        try {
            const [turnosData, serviciosData] = await Promise.all([getAllTurnos(), getServicios()]);
            const ordenados = [...turnosData].sort(
                (a: Turno, b: Turno) =>
                    new Date(b.fecha_turno).getTime() - new Date(a.fecha_turno).getTime()
            );
            setTurnos(ordenados.slice(0, 8));
            setServicios(serviciosData);
        } catch {
            // silently fail
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        cargar();
    }, []);

    return (
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 p-5 shadow-lg mx-4 mb-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="bg-slate-700/60 p-1.5 rounded-lg">
                        <Activity className="w-4 h-4 text-slate-300" />
                    </div>
                    <h3 className="text-white font-semibold">Actividad reciente</h3>
                </div>
                <button
                    onClick={() => cargar(true)}
                    disabled={refreshing}
                    className="text-slate-500 hover:text-slate-300 transition-colors disabled:opacity-50"
                    title="Actualizar"
                >
                    <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
                </button>
            </div>

            {loading ? (
                <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="animate-pulse h-12 bg-slate-800/60 rounded-lg" />
                    ))}
                </div>
            ) : turnos.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-6">Sin actividad reciente</p>
            ) : (
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {turnos.map((turno) => (
                        <div
                            key={turno.id}
                            className={`flex items-center gap-3 p-3 rounded-lg ${bgEstado(turno.estado)}`}
                        >
                            {iconoEstado(turno.estado)}
                            <p className="text-slate-300 text-sm flex-1 leading-tight">
                                {descripcion(turno, servicios)}
                            </p>
                            <span className="text-slate-500 text-xs whitespace-nowrap">
                                {tiempoRelativo(turno.fecha_turno)}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
}
