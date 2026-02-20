import { TablaTurnos } from "@/components/Turnos/TablaTurnos";
import { CalendarClock } from "lucide-react";

export default function TurnosPage() {
    return (
        <div className="p-6 flex flex-col gap-6 max-w-6xl mx-auto">
            <div className="flex items-center gap-3">
                <div className="bg-amber-500/20 p-2.5 rounded-xl">
                    <CalendarClock className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                    <h1 className="text-2xl text-white font-bold">Turnos</h1>
                    <p className="text-slate-400 text-sm">Gestioná y actualizá el estado de los turnos</p>
                </div>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 shadow-xl">
                <TablaTurnos />
            </div>
        </div>
    );
}
