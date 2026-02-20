import { TablaServicios } from "@/components/Gestion/TablaServicios";
import { TablaProfesionales } from "@/components/Gestion/TablaProfesionales";
import { Settings } from "lucide-react";

export default function GestionPage() {
    return (
        <div className="p-6 flex flex-col gap-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 p-2.5 rounded-xl">
                    <Settings className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                    <h1 className="text-2xl text-white font-bold">Gestión</h1>
                    <p className="text-slate-400 text-sm">Administrá servicios y profesionales</p>
                </div>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 shadow-xl">
                <TablaServicios />
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 shadow-xl">
                <TablaProfesionales />
            </div>
        </div>
    );
}
