import { Card } from "../ui/card";
import { Calendar, X, DollarSign, FileChartColumn, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPI {
    label: string;
    valor: string;
    icono: React.ReactNode;
    iconoBg: string;
    tendencia: number;
    tendenciaLabel: string;
}

const kpis: KPI[] = [
    {
        label: "Turnos Hoy",
        valor: "18",
        icono: <Calendar className="w-6 h-6 text-amber-600" />,
        iconoBg: "bg-amber-100",
        tendencia: 2,
        tendenciaLabel: "vs ayer",
    },
    {
        label: "Ocupación",
        valor: "70 %",
        icono: <FileChartColumn className="w-6 h-6 text-cyan-600" />,
        iconoBg: "bg-cyan-100",
        tendencia: 5,
        tendenciaLabel: "vs semana anterior",
    },
    {
        label: "Cancelaciones",
        valor: "1",
        icono: <X className="w-6 h-6 text-red-600" />,
        iconoBg: "bg-red-100",
        tendencia: -1,
        tendenciaLabel: "vs ayer",
    },
    {
        label: "Ingresos estimados",
        valor: "$ 45.000",
        icono: <DollarSign className="w-6 h-6 text-green-600" />,
        iconoBg: "bg-green-100",
        tendencia: 8,
        tendenciaLabel: "vs ayer",
    },
];

function BadgeTendencia({ tendencia, label }: { tendencia: number; label: string }) {
    if (tendencia === 0) {
        return (
            <div className="flex items-center gap-1 text-slate-400">
                <Minus className="w-3 h-3" />
                <span className="text-xs">Sin cambios {label}</span>
            </div>
        );
    }
    const positivo = tendencia > 0;
    return (
        <div className={`flex items-center gap-1 ${positivo ? "text-emerald-400" : "text-red-400"}`}>
            {positivo ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span className="text-xs font-medium">
                {positivo ? "+" : ""}
                {tendencia} {label}
            </span>
        </div>
    );
}

export default function KPIs() {
    return (
        <div className="p-4 -mt-2 grid grid-cols-4 gap-6">
            {kpis.map((kpi) => (
                <Card
                    key={kpi.label}
                    className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-800 p-6 shadow-lg"
                >
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-2">
                            <span className="text-slate-400 text-sm font-medium">{kpi.label}</span>
                            <span className="text-white font-bold text-4xl">{kpi.valor}</span>
                            <BadgeTendencia tendencia={kpi.tendencia} label={kpi.tendenciaLabel} />
                        </div>
                        <div className={`${kpi.iconoBg} p-3 rounded-xl`}>{kpi.icono}</div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
