import { getServicios } from '../../API/Public/Servicios';
import { Card } from '../ui/card';
import { useEffect, useState } from 'react';
import { Scissors, Clock, CheckCircle2, DollarSign } from 'lucide-react';

interface ListaServiciosProps {
    servicioSeleccionado: number | null;
    setServicioSeleccionado: (id: number) => void;
}

interface Servicio {
    id: number;
    nombre_servicio: string;
    duracion_minutos: number;
    precio: string;
}

export default function ListaServicios({ servicioSeleccionado, setServicioSeleccionado }: ListaServiciosProps) {

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0
        }).format(price);
    };

    const [servicios, setServicios] = useState<Servicio[]>([]);

    useEffect(() => {
        const fetchServicios = async () => {
            try {
                const data = await getServicios();
                setServicios(data);
            } catch (error) {
                console.error('Error fetching servicios:', error);
            }
        };
        fetchServicios();
    }, []);

    return (
        <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                    <Scissors className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-2xl text-white font-bold">Seleccioná un servicio</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {servicios.map((servicio) => {
                    const seleccionado = servicio.id === servicioSeleccionado;
                    return (
                        <Card
                            key={servicio.id}
                            className={`relative flex flex-col gap-3 p-5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
                                seleccionado
                                    ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/10'
                                    : 'bg-gray-800/80 border-gray-700 hover:border-gray-500'
                            }`}
                            onClick={() => setServicioSeleccionado(servicio.id)}
                        >
                            {seleccionado && (
                                <div className="absolute top-3 right-3">
                                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                                </div>
                            )}
                            <h3 className="text-lg font-semibold text-white pr-6">
                                {servicio.nombre_servicio}
                            </h3>
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="flex items-center gap-1.5 text-sm font-semibold bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                                    <DollarSign className="w-3.5 h-3.5" />
                                    {formatPrice(Number(servicio.precio))}
                                </span>
                                <span className="flex items-center gap-1.5 text-sm text-slate-400 bg-slate-800/60 px-3 py-1 rounded-full">
                                    <Clock className="w-3.5 h-3.5" />
                                    {servicio.duracion_minutos} min
                                </span>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
