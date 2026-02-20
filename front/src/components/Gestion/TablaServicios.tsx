import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { getServicios } from "@/API/Public/Servicios"
import { useEffect, useState } from "react"
import { SquarePen, Trash, Plus, Scissors, Clock, DollarSign, PackageOpen } from 'lucide-react';
import { EditarServicio } from "./EditarServicio";
import { AgregarServicio } from "./AgregarServicio";
import { EliminarServicio } from "./EliminarServicio";

interface Servicio {
    id: number;
    nombre_servicio: string;
    duracion_minutos: number;
    precio: string;
}

export function TablaServicios() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState<Servicio | null>(null);
  const [openEditar, setOpenEditar] = useState(false);
  const [openAgregar, setOpenAgregar] = useState(false);
  const [openEliminar, setOpenEliminar] = useState(false);

  const fetchServicios = async () => {
    try {
      const data = await getServicios();
      setServicios(data);
    } catch (error) {
      console.error("Error fetching servicios:", error);
    }
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  const handleEditClick = (servicio: Servicio) => {
    setServicioSeleccionado(servicio);
    setOpenEditar(true);
  };

  const handleDeleteClick = (servicio: Servicio) => {
    setServicioSeleccionado(servicio);
    setOpenEliminar(true);
  };

  const formatPrecio = (precio: string) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(Number(precio));

  return (
    <div className="flex flex-col w-full gap-4">
      {/* Header de la sección */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-amber-500/20 p-2 rounded-lg">
            <Scissors className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">Servicios</h2>
            <p className="text-slate-400 text-xs">
              {servicios.length} servicio{servicios.length !== 1 ? 's' : ''} registrado{servicios.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <Button
          onClick={() => setOpenAgregar(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          Agregar Servicio
        </Button>
      </div>

      {/* Tabla o estado vacío */}
      {servicios.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-xl border border-dashed border-slate-700 text-center gap-3">
          <PackageOpen className="w-10 h-10 text-slate-600" />
          <p className="text-slate-400 font-medium">No hay servicios registrados</p>
          <p className="text-slate-600 text-sm">Agregá un servicio para empezar</p>
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden border border-slate-700">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 bg-slate-800/60 hover:bg-slate-800/60">
                <TableHead className="text-slate-300 font-semibold py-3">Servicio</TableHead>
                <TableHead className="text-slate-300 font-semibold text-center">Duración</TableHead>
                <TableHead className="text-slate-300 font-semibold text-center">Precio</TableHead>
                <TableHead className="text-slate-300 font-semibold text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {servicios.map((servicio) => (
                <TableRow
                  key={servicio.id}
                  className="border-slate-700/60 hover:bg-slate-800/40 transition-colors"
                >
                  <TableCell className="font-medium text-white py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      {servicio.nombre_servicio}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center gap-1.5 text-sm text-slate-300 bg-slate-800/60 px-3 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {servicio.duracion_minutos} min
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-300 bg-blue-500/10 px-3 py-1 rounded-full">
                      <DollarSign className="w-3.5 h-3.5" />
                      {formatPrecio(servicio.precio)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        title="Editar"
                        className="p-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/25 text-amber-400 transition-colors"
                        onClick={() => handleEditClick(servicio)}
                      >
                        <SquarePen className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        title="Eliminar"
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 transition-colors"
                        onClick={() => handleDeleteClick(servicio)}
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

      <EditarServicio
        open={openEditar}
        onOpenChange={setOpenEditar}
        servicio={servicioSeleccionado}
        onServicioActualizado={fetchServicios}
      />

      <AgregarServicio
        open={openAgregar}
        onOpenChange={setOpenAgregar}
        onServicioCreado={fetchServicios}
      />

      <EliminarServicio
        open={openEliminar}
        onOpenChange={setOpenEliminar}
        servicio={servicioSeleccionado}
        onServicioEliminado={fetchServicios}
      />
    </div>
  );
}
