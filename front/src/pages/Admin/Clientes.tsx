import { TablaClientes } from "@/components/Clientes/TablaClientes";
import { Users } from "lucide-react";

export default function ClientesPage() {
    return (
        <div className="p-6 flex flex-col gap-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-3">
                <div className="bg-violet-500/20 p-2.5 rounded-xl">
                    <Users className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                    <h1 className="text-2xl text-white font-bold">Clientes</h1>
                    <p className="text-slate-400 text-sm">Listado de clientes registrados en el sistema</p>
                </div>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 shadow-xl">
                <TablaClientes />
            </div>
        </div>
    );
}
