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
import { updateProfesional } from "@/API/Public/Profesionales"
import { toast } from "sonner"
import { useState, useEffect } from "react"

interface Profesional {
  id: number;
  nombre_profesional: string;
}

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    profesional: Profesional | null;
    onProfesionalActualizado: () => void;
}

export function EditarProfesional({ open, onOpenChange, profesional, onProfesionalActualizado }: Props) {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (profesional) {
      setNombre(profesional.nombre_profesional);
    }
  }, [profesional]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profesional) return;
    try {
      await updateProfesional(profesional.id, { nombre_profesional: nombre });
      toast.success("Profesional actualizado con éxito", { position: "top-center" });
      onProfesionalActualizado();
      onOpenChange(false);
    } catch (error) {
      toast.error("Error al actualizar el profesional", {
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
            <DialogTitle className="text-white">Editar Profesional</DialogTitle>
            <DialogDescription className="text-gray-400">
              Modificá los datos del profesional.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="nombre-profesional" className="text-white">Nombre completo</Label>
              <Input
                id="nombre-profesional"
                name="nombre_profesional"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
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
  );
}
