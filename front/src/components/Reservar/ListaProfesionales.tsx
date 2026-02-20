import { getProfesionales } from "@/API/Public/Profesionales";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { User, CheckCircle2 } from "lucide-react";

interface ListaProfesionalesProps {
    profesionalSeleccionado: number | null;
    setProfesionalSeleccionado: (id: number) => void;
}

interface Profesional {
    id: number;
    nombre_profesional: string;
}

export default function ListaProfesionales({ profesionalSeleccionado, setProfesionalSeleccionado }: ListaProfesionalesProps) {

    const [profesionales, setProfesionales] = useState<Profesional[]>([]);

    useEffect(() => {
        const fetchProfesionales = async () => {
            try {
                const data = await getProfesionales();
                setProfesionales(data);
            } catch (error) {
                console.error('Error fetching profesionales:', error);
            }
        };
        fetchProfesionales();
    }, []);

    return (
        <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                    <User className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-2xl text-white font-bold">Seleccioná un profesional</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profesionales.map((profesional) => {
                    const seleccionado = profesional.id === profesionalSeleccionado;
                    return (
                        <Card
                            key={profesional.id}
                            className={`relative flex items-center gap-4 p-5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
                                seleccionado
                                    ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/10'
                                    : 'bg-gray-800/80 border-gray-700 hover:border-gray-500'
                            }`}
                            onClick={() => setProfesionalSeleccionado(profesional.id)}
                        >
                            <img
                                src={`https://i.pravatar.cc/150?u=${profesional.id}`}
                                alt={profesional.nombre_profesional}
                                className={`w-16 h-16 rounded-full object-cover flex-shrink-0 ring-2 transition-all ${
                                    seleccionado ? 'ring-blue-500' : 'ring-slate-600'
                                }`}
                            />
                            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                                <h3 className="text-base font-semibold text-white leading-tight">
                                    {profesional.nombre_profesional}
                                </h3>
                                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full w-fit">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    Disponible
                                </span>
                            </div>
                            {seleccionado && (
                                <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                            )}
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
