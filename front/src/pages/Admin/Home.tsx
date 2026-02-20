import KPIs from "@/components/Home/KPIs";
import { HomeProfesionales } from "@/components/Home/Proximosturnos";
import GraficoSemanal from "@/components/Home/GraficoSemanal";

export default function AdminHome() {

    const hoy = new Date();
    const fecha = new Intl.DateTimeFormat('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(hoy);

    return (
        <div className="p-1">
            <div className="flex flex-col p-4">
                <span className="text-white font-bold text-2xl">Hola, Usuario!</span>
                <span className="text-slate-400 text-md font-medium">Aquí tienes el resumen de hoy, {fecha}</span>
            </div>
            <KPIs />
            <div className="mt-4"> 
            <GraficoSemanal />
            </div>
           
            <div className="flex flex-col p-4">
                <span className="text-white font-bold text-2xl">Próximos Turnos por Profesional</span>
            </div>
            <HomeProfesionales />
        </div>
    );
}
