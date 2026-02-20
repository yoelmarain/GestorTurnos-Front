import { Card } from "../ui/card";
import { Calendar, X, DollarSign, FileChartColumn } from "lucide-react";


export default function KPIs() {
    return (
        <div className="p-4 -mt-2 grid grid-cols-4 gap-6">
            
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800  border-slate-800 p-6 shadow-lg ">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                        <span className="text-slate-400 text-sm font-medium">
                            Turnos Hoy
                        </span>
                        <span className="text-white font-bold text-4xl">
                            18
                        </span>
                    
                    </div>
                    <div className="bg-amber-100 p-3 rounded-xl">
                        <Calendar className="w-6 h-6 text-amber-600" />
                    </div>
                </div>
            </Card>

           <Card className="bg-gradient-to-br from-slate-900 to-slate-800  border-slate-800 p-6 shadow-lg ">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                        <span className="text-slate-400 text-sm font-medium">
                            Ocupación
                        </span>
                        <span className="text-white font-bold text-4xl">
                            70 %
                        </span>
                    
                    </div>
                    <div className="bg-cyan-100 p-3 rounded-xl">
                        <FileChartColumn className="w-6 h-6 text-cyan-600" />
                    </div>
                </div>
            </Card>


            <Card className="bg-gradient-to-br from-slate-900 to-slate-800  border-slate-800 p-6 shadow-lg ">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                        <span className="text-slate-400 text-sm font-medium">
                            Cancelaciones
                        </span>
                        <span className="text-white font-bold text-4xl">
                            1
                        </span>
                    
                    </div>
                    <div className="bg-red-100 p-3 rounded-xl">
                        <X className="w-6 h-6 text-red-600" />
                    </div>
                </div>
            </Card>


            <Card className="bg-gradient-to-br from-slate-900 to-slate-800  border-slate-800 p-6 shadow-lg ">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                        <span className="text-slate-400 text-sm font-medium">
                            Ingresos estimados
                        </span>
                        <span className="text-white font-bold text-4xl">
                            $ 45.000
                        </span>
                    
                    </div>
                    <div className="bg-green-100 p-3 rounded-xl">
                        <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                </div>
            </Card>


            
        </div>
    );
}