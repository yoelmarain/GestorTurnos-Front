import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getAllTurnos, updateEstadoTurno } from "@/API/Admin/Turnos";
import { getProfesionales } from "@/API/Public/Profesionales";
import { getServicios } from "@/API/Public/Servicios";
import { toast } from "sonner";
import {
    Calendar,
    CheckCircle2,
    XCircle,
    Circle,
    PackageOpen,
    Filter,
} from "lucide-react";

interface Turno {
    id: number;
    fecha_turno: string;
    estado: string;
    cliente: number | { id: number; nombre?: string };
    profesional: number | { id: number; nombre_profesional: string };
    servicio: number | { id: number; nombre_servicio: string };
}

interface Profesional {
    id: number;
    nombre_profesional: string;
}

interface Servicio {
    id: number;
    nombre_servicio: string;
}

const ESTADOS = ["Todos", "Reservado", "Completado", "Cancelado"];

function estadoBadge(estado: string) {
    switch (estado?.toLowerCase()) {
        case "reservado":
            return (
                <span className="inline-flex items-center gap-1 text-xs bg-blue-500/20 text-blue-400 px-2.5 py-1 rounded-full font-medium">
                    <Circle className="w-2.5 h-2.5 fill-blue-400" />
                    Reservado
                </span>
            );
        case "completado":
        case "finalizado":
            return (
                <span className="inline-flex items-center gap-1 text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full font-medium">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    Completado
                </span>
            );
        case "cancelado":
            return (
                <span className="inline-flex items-center gap-1 text-xs bg-red-500/20 text-red-400 px-2.5 py-1 rounded-full font-medium">
                    <XCircle className="w-2.5 h-2.5" />
                    Cancelado
                </span>
            );
        default:
            return (
                <span className="text-xs bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full">
                    {estado}
                </span>
            );
    }
}

function SkeletonRow() {
    return (
        <TableRow className="border-slate-700/60">
            {[...Array(6)].map((_, i) => (
                <TableCell key={i}>
                    <div className="h-4 bg-slate-700 rounded animate-pulse" />
                </TableCell>
            ))}
        </TableRow>
    );
}

export function TablaTurnos() {
    const [turnos, setTurnos] = useState<Turno[]>([]);
    const [profesionales, setProfesionales] = useState<Profesional[]>([]);
    const [servicios, setServicios] = useState<Servicio[]>([]);
    const [loading, setLoading] = useState(true);
    const [actualizando, setActualizando] = useState<number | null>(null);

    const [filtroProfesional, setFiltroProfesional] = useState<string>("");
    const [filtroEstado, setFiltroEstado] = useState<string>("Todos");
    const [filtroFecha, setFiltroFecha] = useState<string>("");

    const fetchTurnos = async () => {
        setLoading(true);
        try {
            const data = await getAllTurnos();
            setTurnos(data);
        } catch {
            toast.error("Error al cargar los turnos", { position: "top-center" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        Promise.all([fetchTurnos(), getProfesionales(), getServicios()]).then(
            ([, profsData, servsData]) => {
                setProfesionales(profsData);
                setServicios(servsData);
            }
        );
    }, []);

    const resolveId = (val: number | { id: number }): number =>
        typeof val === "object" ? val.id : val;

    const getNombreProfesional = (val: number | { id: number; nombre_profesional: string }) => {
        if (typeof val === "object") return val.nombre_profesional;
        return profesionales.find((p) => p.id === val)?.nombre_profesional ?? `#${val}`;
    };

    const getNombreServicio = (val: number | { id: number; nombre_servicio: string }) => {
        if (typeof val === "object") return val.nombre_servicio;
        return servicios.find((s) => s.id === val)?.nombre_servicio ?? `#${val}`;
    };

    const turnosFiltrados = turnos.filter((t) => {
        const profId = resolveId(t.profesional);
        const matchProf = !filtroProfesional || profId === Number(filtroProfesional);
        const matchEstado =
            filtroEstado === "Todos" || t.estado?.toLowerCase() === filtroEstado.toLowerCase();
        const matchFecha =
            !filtroFecha ||
            new Date(t.fecha_turno).toISOString().split("T")[0] === filtroFecha;
        return matchProf && matchEstado && matchFecha;
    });

    const handleCambiarEstado = async (id: number, nuevoEstado: string) => {
        setActualizando(id);
        try {
            await updateEstadoTurno(id, nuevoEstado);
            toast.success(`Turno marcado como ${nuevoEstado}`, { position: "top-center" });
            await fetchTurnos();
        } catch (error) {
            toast.error("Error al actualizar el turno", {
                description: String(error),
                position: "top-center",
            });
        } finally {
            setActualizando(null);
        }
    };

    const selectClass =
        "bg-slate-800 border border-slate-600 text-slate-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors";

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-amber-500/20 p-2 rounded-lg">
                        <Calendar className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                        <h2 className="text-white font-semibold text-lg">Turnos</h2>
                        <p className="text-slate-400 text-xs">
                            {turnosFiltrados.length} turno{turnosFiltrados.length !== 1 ? "s" : ""} encontrado{turnosFiltrados.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                </div>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl border border-slate-700 bg-slate-800/40">
                <div className="flex items-center gap-2 text-slate-400">
                    <Filter className="w-4 h-4" />
                    <span className="text-sm font-medium">Filtros</span>
                </div>

                <select
                    className={selectClass}
                    value={filtroProfesional}
                    onChange={(e) => setFiltroProfesional(e.target.value)}
                >
                    <option value="">Todos los profesionales</option>
                    {profesionales.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.nombre_profesional}
                        </option>
                    ))}
                </select>

                <select
                    className={selectClass}
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                >
                    {ESTADOS.map((e) => (
                        <option key={e} value={e}>
                            {e}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    className={selectClass}
                    value={filtroFecha}
                    onChange={(e) => setFiltroFecha(e.target.value)}
                />

                {(filtroProfesional || filtroEstado !== "Todos" || filtroFecha) && (
                    <button
                        className="text-sm text-slate-400 hover:text-white transition-colors underline"
                        onClick={() => {
                            setFiltroProfesional("");
                            setFiltroEstado("Todos");
                            setFiltroFecha("");
                        }}
                    >
                        Limpiar filtros
                    </button>
                )}
            </div>

            {/* Tabla */}
            {loading ? (
                <div className="rounded-xl overflow-hidden border border-slate-700">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-700 bg-slate-800/60 hover:bg-slate-800/60">
                                {["Fecha y Hora", "Profesional", "Servicio", "Cliente", "Estado", "Acciones"].map((h) => (
                                    <TableHead key={h} className="text-slate-300 font-semibold py-3">{h}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[...Array(5)].map((_, i) => <SkeletonRow key={i} />)}
                        </TableBody>
                    </Table>
                </div>
            ) : turnosFiltrados.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 rounded-xl border border-dashed border-slate-700 text-center gap-3">
                    <PackageOpen className="w-10 h-10 text-slate-600" />
                    <p className="text-slate-400 font-medium">No hay turnos con los filtros seleccionados</p>
                </div>
            ) : (
                <div className="rounded-xl overflow-hidden border border-slate-700">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-700 bg-slate-800/60 hover:bg-slate-800/60">
                                <TableHead className="text-slate-300 font-semibold py-3">Fecha y Hora</TableHead>
                                <TableHead className="text-slate-300 font-semibold">Profesional</TableHead>
                                <TableHead className="text-slate-300 font-semibold">Servicio</TableHead>
                                <TableHead className="text-slate-300 font-semibold text-center">Cliente</TableHead>
                                <TableHead className="text-slate-300 font-semibold text-center">Estado</TableHead>
                                <TableHead className="text-slate-300 font-semibold text-center">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {turnosFiltrados.map((turno) => {
                                const fecha = new Date(turno.fecha_turno);
                                const fechaStr = `${String(fecha.getDate()).padStart(2, "0")}/${String(fecha.getMonth() + 1).padStart(2, "0")}/${fecha.getFullYear()}`;
                                const horaStr = `${String(fecha.getHours()).padStart(2, "0")}:${String(fecha.getMinutes()).padStart(2, "0")}`;
                                const esReservado = turno.estado?.toLowerCase() === "reservado";
                                const cargando = actualizando === turno.id;
                                const clienteId = resolveId(turno.cliente as number | { id: number });

                                return (
                                    <TableRow
                                        key={turno.id}
                                        className="border-slate-700/60 hover:bg-slate-800/40 transition-colors"
                                    >
                                        <TableCell className="py-4">
                                            <div className="flex flex-col">
                                                <span className="text-white font-medium text-sm">{fechaStr}</span>
                                                <span className="text-slate-400 text-xs">{horaStr}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-slate-300 text-sm">
                                            {getNombreProfesional(turno.profesional)}
                                        </TableCell>
                                        <TableCell className="text-slate-300 text-sm">
                                            {getNombreServicio(turno.servicio)}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="text-slate-400 text-sm">#{clienteId}</span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {estadoBadge(turno.estado)}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {esReservado ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        title="Marcar como Completado"
                                                        disabled={cargando}
                                                        onClick={() => handleCambiarEstado(turno.id, "Completado")}
                                                        className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 transition-colors disabled:opacity-50"
                                                    >
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        title="Cancelar turno"
                                                        disabled={cargando}
                                                        onClick={() => handleCambiarEstado(turno.id, "Cancelado")}
                                                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 transition-colors disabled:opacity-50"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-slate-600 text-xs">—</span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
