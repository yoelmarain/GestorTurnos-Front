import servicios from '../../API/Public/Servicios';
import { Card } from '../ui/card';

interface ListaServiciosProps {
    servicioSeleccionado: number | null;
    setServicioSeleccionado: (id: number) => void;
}

export default function ListaServicios({ servicioSeleccionado, setServicioSeleccionado }: ListaServiciosProps) {

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CL', { 
            style: 'currency', 
            currency: 'CLP',
            minimumFractionDigits: 0
        }).format(price);
    };


    return (
        <div className="p-4">
            <h2 className="text-2xl text-white font-bold mb-2">Seleccionar Servicio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {servicios.map((servicio, index) => (
                    <Card 
                        key={index} 
                        className={` flex flex-col gap-2 p-6 bg-gray-800/80 hover:border-gray-400 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer ${servicio.id === servicioSeleccionado ? 'border-gray-400 scale-105 shadow-xl bg-slate-600' : ''}`}
                        onClick={() => setServicioSeleccionado(servicio.id)}
                    >
                            <h3 className="text-xl font-semibold text-white">
                                {servicio.nombre_servicio}
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-300">Precio:</span>
                                <span className="text-lg font-bold text-slate-700 bg-slate-400 px-3 py-1 rounded">
                                    {formatPrice(servicio.precio)}
                                </span>
                            </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}