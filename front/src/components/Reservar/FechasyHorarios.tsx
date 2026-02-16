import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";

interface Slot {
  start: string;
  end: string;
}

interface Props {
  slots_disponibles: Slot[];
  // onSelectSlot: (slot: Slot) => void;
}

export default function SeleccionadorSlot({ slots_disponibles }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>();

  // Extraer días únicos con slots disponibles
  const availableDates = Array.from(
    new Set(
      slots_disponibles.map((slot) => 
        new Date(slot.start).toISOString().split('T')[0]
      )   // convierte los slots a fechas sin hora 
    )  // El convertirlo a Set elimina las fechas duplicadas
  ).map(date => new Date(date)); //Se lo vuelve a convertir a Array y luego a Date a cada objeto del array para que el componente Calendar pueda reconocerlo como fecha válida

  // Filtrar slots del día seleccionado
  // NO hace falta un useEffect ya que es una variable calculada que se recalcula automáticamente en cada render (se vuelve a rendizar cada vez que cambia el estado, el selectedDay).
  const slotsForSelectedDate = selectedDate
    ? slots_disponibles.filter(   // filtra y se queda solo con los slots del dia seleccionado
        (slot) =>  // para recorrer
          new Date(slot.start).toISOString().split('T')[0] ===
          selectedDate.toISOString().split('T')[0]  // crea un nuevo objeto Date a partir del slot.start y lo convierte a string sin hora, luego compara con la fecha seleccionada también convertida a string sin hora
      )
    : [];

  console.log(slotsForSelectedDate)

  return (
    <div className="flex flex-col p-4">
      <h2 className="text-2xl text-white font-bold mb-2">Seleccionar Horario</h2>
      <div className="flex justify-center">
      <Calendar
        mode="single"   // permite seleccionar solo una fecha y no rangos
        selected={selectedDate}   // dia que va a aparecer seleccionado en el calendario
        onSelect={setSelectedDate}   // función que se ejecuta cuando se selecciona una fecha, actualiza el estado selectedDate
        disabled={(date) =>   //funcion que determina que fecha deshabilitar, date es cada fecha del calendario que se evalua
          !availableDates.some(   //devuelve TRUE si la fecha no esta en availableDates, lo que hace que esa fecha se deshabilite en el calendario
            (availableDate) =>
              availableDate.toISOString().split('T')[0] ===
              date.toISOString().split('T')[0]  // compara si el array con fechas disponibles es igual al dia del calendario que se esta evaluando (date)
          )
        }
        className="rounded-md border w-full max-w-xl p-4"
      />
      </div>

      {selectedDate && (
        <div className="flex-1 mt-8">
          <div className="grid grid-cols-3 gap-2">
            {slotsForSelectedDate.map((slot, index) => (
              <button
                key={index}
                // onClick={() => onSelectSlot(slot)}
                className="px-4 py-2 border rounded hover:bg-primary hover:text-primary-foreground"
              >
                <span className=" text-white font-medium">{slot.start.slice(11, 16)}</span> -
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}