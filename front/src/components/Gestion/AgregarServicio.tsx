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
import { createServicio } from "@/API/Public/Servicios"
import { toast } from "sonner"
import { useState } from "react"

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onServicioCreado: () => void;
}

export function AgregarServicio({ open, onOpenChange, onServicioCreado }: Props) {
  const [nombreServicio, setNombreServicio] = useState("");
  const [duracionMinutos, setDuracionMinutos] = useState(30);
  const [precio, setPrecio] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      await createServicio({
        nombre_servicio: nombreServicio,
        duracion_minutos: duracionMinutos,
        precio: precio,
      });
      
      toast.success("Servicio creado con éxito", {
        position: "top-center",
      });
      
      // Reset form
      setNombreServicio("");
      setDuracionMinutos(30);
      setPrecio("");
      
      onServicioCreado();  // para actualizar la tabla 
      onOpenChange(false);
    } catch (error) {
      toast.error("Error al crear el servicio", {
        description: String(error),
        position: "top-center",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm bg-gray-900 border-gray-700 gap-6">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-4"> 
            <DialogTitle className="text-white">Agregar Servicio</DialogTitle>
            <DialogDescription className="text-gray-400">
              Completa los datos del nuevo servicio. Haz clic en guardar cuando termines.
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
                placeholder="Ej: Corte de cabello"
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
                placeholder="Ej: 5000"
                required
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancelar</Button>
            </DialogClose>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
