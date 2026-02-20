import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { getProfesionales } from "@/API/Public/Profesionales"
import { useEffect, useState } from "react"
import { SquarePen, Trash, Plus, User, PackageOpen } from "lucide-react"
import { AgregarProfesional } from "./AgregarProfesional"
import { EditarProfesional } from "./EditarProfesional"
import { EliminarProfesional } from "./EliminarProfesional"

interface Profesional {
  id: number;
  nombre_profesional: string;
}

export function TablaProfesionales() {
  const [profesionales, setProfesionales] = useState<Profesional[]>([]);
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState<Profesional | null>(null);
  const [openAgregar, setOpenAgregar] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [openEliminar, setOpenEliminar] = useState(false);

  const fetchProfesionales = async () => {
    try {
      const data = await getProfesionales();
      setProfesionales(data);
    } catch (error) {
      console.error("Error fetching profesionales:", error);
    }
  };

  useEffect(() => {
    fetchProfesionales();
  }, []);

  const handleEditClick = (profesional: Profesional) => {
    setProfesionalSeleccionado(profesional);
    setOpenEditar(true);
  };

  const handleDeleteClick = (profesional: Profesional) => {
    setProfesionalSeleccionado(profesional);
    setOpenEliminar(true);
  };

  return (
    <div className="flex flex-col w-full gap-4">
      {/* Header de la sección */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-purple-500/20 p-2 rounded-lg">
            <User className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">Profesionales</h2>
            <p className="text-slate-400 text-xs">
              {profesionales.length} profesional{profesionales.length !== 1 ? "es" : ""} registrado{profesionales.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <Button
          onClick={() => setOpenAgregar(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          Agregar Profesional
        </Button>
      </div>

      {/* Tabla o estado vacío */}
      {profesionales.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-xl border border-dashed border-slate-700 text-center gap-3">
          <PackageOpen className="w-10 h-10 text-slate-600" />
          <p className="text-slate-400 font-medium">No hay profesionales registrados</p>
          <p className="text-slate-600 text-sm">Agregá un profesional para empezar</p>
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden border border-slate-700">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 bg-slate-800/60 hover:bg-slate-800/60">
                <TableHead className="text-slate-300 font-semibold py-3">Nombre</TableHead>
                <TableHead className="text-slate-300 font-semibold text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profesionales.map((profesional) => (
                <TableRow
                  key={profesional.id}
                  className="border-slate-700/60 hover:bg-slate-800/40 transition-colors"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://i.pravatar.cc/40?u=${profesional.id}`}
                        alt={profesional.nombre_profesional}
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-600"
                      />
                      <span className="font-medium text-white">{profesional.nombre_profesional}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        title="Editar"
                        className="p-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/25 text-amber-400 transition-colors"
                        onClick={() => handleEditClick(profesional)}
                      >
                        <SquarePen className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        title="Eliminar"
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 transition-colors"
                        onClick={() => handleDeleteClick(profesional)}
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AgregarProfesional
        open={openAgregar}
        onOpenChange={setOpenAgregar}
        onProfesionalCreado={fetchProfesionales}
      />
      <EditarProfesional
        open={openEditar}
        onOpenChange={setOpenEditar}
        profesional={profesionalSeleccionado}
        onProfesionalActualizado={fetchProfesionales}
      />
      <EliminarProfesional
        open={openEliminar}
        onOpenChange={setOpenEliminar}
        profesional={profesionalSeleccionado}
        onProfesionalEliminado={fetchProfesionales}
      />
    </div>
  );
}
