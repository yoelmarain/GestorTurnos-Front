import profesionales from "@/API/Public/Profesionales";
import { Card } from "@/components/ui/card";

interface ListaProfesionalesProps {
    profesionalSeleccionado: number | null;
    setProfesionalSeleccionado: (id: number) => void;
}

export default function ListaProfesionales({ profesionalSeleccionado, setProfesionalSeleccionado }: ListaProfesionalesProps) {
    return (
        <div className="p-4">
            <h2 className="text-2xl text-white font-bold mb-2">Seleccionar Profesional</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profesionales.map((profesional, index) => (
                    <Card
                        key={index}
                        className={` flex flex-col items-center gap-2 p-6 bg-gray-800/80 hover:border-gray-400 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer ${profesional.id === profesionalSeleccionado ? 'border-gray-400 scale-105 shadow-xl bg-slate-600' : ''}`}
                        onClick={() => setProfesionalSeleccionado(profesional.id)}
                    >
                        <img src={profesional.foto} alt={profesional.nombre} className="size-24 rounded-full mb-2" />
                        <h3 className="text-xl font-semibold text-white">{profesional.nombre}</h3>
                    </Card>
                ))}
            </div>
        </div>
    );
}