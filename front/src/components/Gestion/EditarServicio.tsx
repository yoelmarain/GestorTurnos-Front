import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateServicio } from "@/API/Public/Servicios"
import { toast } from "sonner"
import { useState, useEffect } from "react"

interface Servicio {
  id: number;
  nombre_servicio: string;
  duracion_minutos: number;
  precio: string;
}

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    servicio: Servicio | null;
    onServicioActualizado: () => void;
}

export function EditarServicio({ open, onOpenChange, servicio, onServicioActualizado }: Props) {
  const [nombreServicio, setNombreServicio] = useState("");
  const [duracionMinutos, setDuracionMinutos] = useState(0);
  const [precio, setPrecio] = useState("");

  useEffect(() => {
    if (servicio) {
      setNombreServicio(servicio.nombre_servicio);
      setDuracionMinutos(servicio.duracion_minutos);
      setPrecio(servicio.precio);
    }
  }, [servicio]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!servicio) return;

    try {
      await updateServicio(servicio.id, {
        nombre_servicio: nombreServicio,
        duracion_minutos: duracionMinutos,
        precio: precio,
      });
      
      toast.success("Servicio actualizado con éxito", {
        position: "top-center",
      });
      
      onServicioActualizado();
      onOpenChange(false);
    } catch (error) {
      toast.error("Error al actualizar el servicio", {
        description: String(error),
        position: "top-center",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm bg-gray-900 border-gray-700">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-4">
            <DialogTitle className="text-white">Editar Servicio</DialogTitle>
            <DialogDescription className="text-gray-400">
              Modifica los datos del servicio. Haz clic en guardar cuando termines.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="nombre-servicio" className="text-white">Nombre del Servicio</Label>
              <Input 
                id="nombre-servicio" 
                name="nombre_servicio" 
                value={nombreServicio}
                onChange={(e) => setNombreServicio(e.target.value)}
                className="text-white bg-gray-800 border-gray-600"
                required
              />
            </Field>
            <Field>
              <Label htmlFor="duracion-minutos" className="text-white">Duración (minutos)</Label>
              <Input 
                id="duracion-minutos" 
                name="duracion_minutos" 
                type="number"
                value={duracionMinutos}
                onChange={(e) => setDuracionMinutos(Number(e.target.value))}
                className="text-white bg-gray-800 border-gray-600"
                required
                min="1"
              />
            </Field>
            <Field>
              <Label htmlFor="precio" className="text-white">Precio</Label>
              <Input 
                id="precio" 
                name="precio" 
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className="text-white bg-gray-800 border-gray-600"
                required
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancelar</Button>
            </DialogClose>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Guardar cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
