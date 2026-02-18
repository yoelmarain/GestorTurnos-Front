import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getServicios } from "@/API/Public/Servicios"
import { useEffect, useState } from "react"
import { SquarePen } from 'lucide-react';
import { Trash } from 'lucide-react';
import { EditarServicio } from "./EditarServicio";

interface Servicio {
    id: number;
    nombre_servicio: string;
    duracion_minutos: number;
    precio: string;
}


export function TablaServicios() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [openEditar, setOpenEditar] = useState(false);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const data = await getServicios();
        setServicios(data);
      } catch (error) {
        console.error("Error fetching servicios:", error);
      }
    };
    fetchServicios();
  }, []);

  return (
    <>
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
              <button className="mr-2 bg-yellow-50 p-3" onClick={() => setOpenEditar(true)}> <SquarePen className="w-4 h-4" /></button>
              <button className="bg-red-300 p-3"> <Trash className="w-4 h-4" /></button>
            </TableCell>
          </TableRow>
        ))} 
      </TableBody>
    </Table>
    <EditarServicio open={openEditar} onOpenChange={setOpenEditar} />
    </>
  )
}
