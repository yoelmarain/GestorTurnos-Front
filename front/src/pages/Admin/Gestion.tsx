import { TablaServicios } from "@/components/Gestion/TablaServicios";


export default function GestionPage() {
    return (
        <div className="p-4 flex flex-col gap-1">
            <h1 className="text-2xl text-white font-bold mb-4">Gestión de Servicios, Profesionales y Turnos</h1>
            <div className="flex items-center justify-center w-2/3 mx-auto p-6 bg-gray-800/80 rounded border border-gray-600 ">
                <TablaServicios />
            </div>
            
        </div>
    );
}