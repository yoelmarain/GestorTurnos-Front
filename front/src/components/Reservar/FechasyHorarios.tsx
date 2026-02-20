import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Clock } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Slot {
    start: string;
    end: string;
}

interface Props {
    slots_disponibles: Slot[];
    slotSeleccionado: Slot | null;
    setSlotSeleccionado: (slot: Slot) => void;
}

export default function SeleccionadorSlot({ slots_disponibles, slotSeleccionado, setSlotSeleccionado }: Props) {
    const [selectedDate, setSelectedDate] = useState<Date>();

    const availableDates = Array.from(
        new Set(
            slots_disponibles.map((slot) =>
                new Date(slot.start).toISOString().split('T')[0]
            )
        )
    ).map(date => new Date(date));

    const slotsForSelectedDate = selectedDate
        ? slots_disponibles
            .filter(
                (slot) =>
                    new Date(slot.start).toISOString().split('T')[0] ===
                    selectedDate.toISOString().split('T')[0]
            )
            .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
        : [];

    return (
        <div className="flex flex-col p-4">
            <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-2xl text-white font-bold">Seleccioná un horario</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-auto ">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) =>
                            !availableDates.some(
                                (availableDate) =>
                                    availableDate.toISOString().split('T')[0] ===
                                    date.toISOString().split('T')[0]
                            )
                        }
                        className="rounded-xl border text-white border-slate-700 bg-slate-800/50 p-4 w-full"
                    />
                </div>

                <div className="flex-1 w-full">
                    {!selectedDate ? (
                        <div className="flex flex-col items-center justify-center h-32 rounded-xl border border-slate-700 bg-slate-800/30 text-center p-4">
                            <Clock className="w-8 h-8 text-slate-600 mb-2" />
                            <p className="text-slate-500 text-sm">Seleccioná una fecha en el calendario para ver los horarios disponibles.</p>
                        </div>
                    ) : (
                        <>
                            <p className="text-white font-semibold mb-3 capitalize">
                                {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
                                <span className="text-slate-400 font-normal text-sm ml-2">
                                    — {slotsForSelectedDate.length} horario{slotsForSelectedDate.length !== 1 ? 's' : ''} disponible{slotsForSelectedDate.length !== 1 ? 's' : ''}
                                </span>
                            </p>
                            {slotsForSelectedDate.length === 0 ? (
                                <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-6 text-center">
                                    <p className="text-slate-500 text-sm">Sin horarios disponibles para este día.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 gap-2">
                                    {slotsForSelectedDate.map((slot, index) => {
                                        const hora = slot.start.slice(11, 16);
                                        const seleccionado = slotSeleccionado?.start === slot.start;
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => setSlotSeleccionado(slot)}
                                                className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 ${
                                                    seleccionado
                                                        ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/20 scale-105'
                                                        : 'bg-slate-800/60 border-slate-600 text-slate-300 hover:border-slate-400 hover:bg-slate-700/60'
                                                }`}
                                            >
                                                <Clock className={`w-3.5 h-3.5 flex-shrink-0 ${seleccionado ? 'text-blue-200' : 'text-slate-500'}`} />
                                                {hora}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
