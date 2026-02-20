import { Card } from "../ui/card";
import { TrendingUp } from "lucide-react";

const datosSemanales = [
    { dia: "Lun", turnos: 12 },
    { dia: "Mar", turnos: 18 },
    { dia: "Mié", turnos: 9 },
    { dia: "Jue", turnos: 22 },
    { dia: "Vie", turnos: 25 },
    { dia: "Sáb", turnos: 30 },
    { dia: "Dom", turnos: 6 },
];

const diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const abreviaturas = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const diaActualAbrev = abreviaturas[new Date().getDay()];

const maxTurnos = Math.max(...datosSemanales.map((d) => d.turnos));
const totalSemana = datosSemanales.reduce((acc, d) => acc + d.turnos, 0);

export default function GraficoSemanal() {
    return (
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 p-6 shadow-lg mx-4 -mt-2 mb-2">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-white font-semibold text-lg">Turnos esta semana</h3>
                    <p className="text-slate-400 text-sm mt-0.5">Distribución diaria de turnos</p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 text-sm font-medium">{totalSemana} esta semana</span>
                </div>
            </div>

            <div className="flex items-end gap-3 h-36">
                {datosSemanales.map((dato) => {
                    const altura = Math.round((dato.turnos / maxTurnos) * 100);
                    const esHoy = dato.dia === diaActualAbrev;
                    return (
                        <div key={dato.dia} className="flex flex-col items-center gap-2 flex-1">
                            <span className={`text-xs font-semibold ${esHoy ? "text-blue-400" : "text-slate-400"}`}>
                                {dato.turnos}
                            </span>
                            <div className="w-full flex items-end" style={{ height: "96px" }}>
                                <div
                                    className={`w-full rounded-t-md transition-all duration-500 ${
                                        esHoy
                                            ? "bg-blue-500 shadow-lg shadow-blue-500/30"
                                            : "bg-slate-600 hover:bg-slate-500"
                                    }`}
                                    style={{ height: `${altura}%` }}
                                />
                            </div>
                            <span className={`text-xs font-medium ${esHoy ? "text-blue-400" : "text-slate-400"}`}>
                                {dato.dia}
                            </span>
                            {esHoy && (
                                <span className="text-xs bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-medium">
                                    hoy
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-700 flex gap-6">
                <div>
                    <p className="text-slate-400 text-xs">Pico de la semana</p>
                    <p className="text-white text-sm font-semibold mt-0.5">
                        {datosSemanales.reduce((a, b) => (a.turnos > b.turnos ? a : b)).dia} — {maxTurnos} turnos
                    </p>
                </div>
                <div>
                    <p className="text-slate-400 text-xs">Promedio diario</p>
                    <p className="text-white text-sm font-semibold mt-0.5">
                        {Math.round(totalSemana / 7)} turnos/día
                    </p>
                </div>
            </div>
        </Card>
    );
}
