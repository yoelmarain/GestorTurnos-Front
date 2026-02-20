import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { Clock, Calendar, User, CheckCircle } from "lucide-react"

interface Props {
    nombre: string, 
    horaproximo: string,
    servicioproximo: string
    turnoshoy: number,
    libreshoy: number
}

export function ProfesionalTurnos ({nombre, horaproximo, servicioproximo, turnoshoy, libreshoy}: Props ) {

    return (
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex flex-col gap-4">
                {/* Header con nombre del profesional */}
                <div className="flex items-center gap-2 pb-3 border-b border-slate-700">
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                        <User className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-white font-semibold text-lg">{nombre}</h3>
                </div>

                {/* Próximo turno */}
                <div className="space-y-2">
                    <p className="text-slate-400 text-sm font-medium">Próximo turno</p>
                    <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span className="text-white font-medium">{horaproximo}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-300 text-sm">{servicioproximo}</span>
                    </div>
                </div>

                {/* Estadísticas del día */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                            <Calendar className="w-3 h-3" />
                            <span>Turnos hoy</span>
                        </div>
                        <p className="text-white text-xl font-bold">{turnoshoy}</p>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                            <CheckCircle className="w-3 h-3" />
                            <span>Libres</span>
                        </div>
                        <p className="text-white text-xl font-bold">{libreshoy}</p>
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-2 pt-2">
                    <Button 
                        variant="outline" 
                        className="flex-1 border-slate-600 hover:text-slate-400"
                    >
                        Ver agenda
                    </Button>
                    <Button 
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Crear Turno
                    </Button>
                </div>
            </div>
        </Card>
    );
}