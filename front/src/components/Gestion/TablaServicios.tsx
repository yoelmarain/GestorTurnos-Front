import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { getServicios } from "@/API/Public/Servicios"
import { useEffect, useState } from "react"
import { SquarePen, Trash, Plus } from 'lucide-react';
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

  return (
    <div className="flex flex-col w-full">
      <div className="mb-4 flex justify-between flex-col items-center">
        <Button 
          onClick={() => setOpenAgregar(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Servicio
        </Button>
      </div>

      <Table>
        <TableCaption>Una lista de los servicios ofrecidos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className=" text-white">Nombre</TableHead>
            <TableHead className="text-white text-center">Duración</TableHead>
            <TableHead className="text-white text-center">Precio</TableHead>
            <TableHead className="text-white text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {servicios.map((servicio) => (
            <TableRow key={servicio.id}>
              <TableCell className="font-medium text-white">{servicio.nombre_servicio}</TableCell>
              <TableCell className="text-white text-center">{servicio.duracion_minutos} minutos</TableCell>
              <TableCell className="text-white text-center"> $ {servicio.precio}</TableCell>
              <TableCell className="w-[150px] text-center">
                <button 
                  type="button"
                  className="mr-2 bg-yellow-200 p-3 hover:bg-yellow-100 transition-colors rounded" 
                  onClick={() => handleEditClick(servicio)}
                > 
                  <SquarePen className="w-4 h-4" />
                </button>
                <button 
                  type="button"
                  className="bg-red-400 p-3 hover:bg-red-700 transition-colors rounded"
                  onClick={() => handleDeleteClick(servicio)}
                > 
                  <Trash className="w-4 h-4" />
                </button>
              </TableCell>
            </TableRow>
          ))} 
        </TableBody>
      </Table>

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
  )
}
