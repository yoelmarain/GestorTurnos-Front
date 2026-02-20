import { useEffect, useState } from "react";
import { getProfesionales } from "@/API/Public/Profesionales";
import { ProfesionalTurnos } from "./CardProximoTurno";

interface Profesional {
    id: number;
    nombre_profesional: string;
}

function SkeletonCard() {
    return (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg animate-pulse">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-700 mb-4">
                <div className="w-9 h-9 bg-slate-700 rounded-lg" />
                <div className="h-5 bg-slate-700 rounded w-32" />
            </div>
            <div className="space-y-2 mb-4">
                <div className="h-4 bg-slate-700 rounded w-24" />
                <div className="h-10 bg-slate-800/50 rounded-lg" />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="h-16 bg-slate-800/50 rounded-lg" />
                <div className="h-16 bg-slate-800/50 rounded-lg" />
            </div>
            <div className="flex gap-2">
                <div className="flex-1 h-9 bg-slate-700 rounded" />
                <div className="flex-1 h-9 bg-slate-700 rounded" />
            </div>
        </div>
    );
}

export function HomeProfesionales() {
    const [profesionales, setProfesionales] = useState<Profesional[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProfesionales = async () => {
            try {
                const data = await getProfesionales();
                setProfesionales(data);
            } catch (err) {
                console.error("Error al cargar profesionales:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchProfesionales();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-2 gap-4 p-4 -mt-4">
                <SkeletonCard />
                <SkeletonCard />
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-4 -mt-4 p-6 rounded-xl bg-red-500/10 border border-red-500/30 text-center">
                <p className="text-red-400 font-medium">No se pudieron cargar los profesionales.</p>
                <p className="text-slate-500 text-sm mt-1">Verificá que el servidor esté en línea.</p>
            </div>
        );
    }

    if (profesionales.length === 0) {
        return (
            <div className="mx-4 -mt-4 p-6 rounded-xl bg-slate-800/50 border border-slate-700 text-center">
                <p className="text-slate-400 font-medium">No hay profesionales registrados.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4 p-4 -mt-4">
            {profesionales.map((profesional) => (
                <ProfesionalTurnos
                    key={profesional.id}
                    nombre={profesional.nombre_profesional}
                    horaproximo={"—"}
                    servicioproximo={"Sin turnos"}
                    turnoshoy={0}
                    libreshoy={0}
                    profesionalId={profesional.id}
                />
            ))}
        </div>
    );
}
