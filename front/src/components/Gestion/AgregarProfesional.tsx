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
import { createProfesional } from "@/API/Public/Profesionales"
import { toast } from "sonner"
import { useState } from "react"

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onProfesionalCreado: () => void;
}

export function AgregarProfesional({ open, onOpenChange, onProfesionalCreado }: Props) {
  const [nombre, setNombre] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProfesional({ nombre_profesional: nombre });
      toast.success("Profesional agregado con éxito", { position: "top-center" });
      setNombre("");
      onProfesionalCreado();
      onOpenChange(false);
    } catch (error) {
      toast.error("Error al agregar el profesional", {
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
            <DialogTitle className="text-white">Agregar Profesional</DialogTitle>
            <DialogDescription className="text-gray-400">
              Ingresá el nombre del nuevo profesional.
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
                placeholder="Ej: Juan Pérez"
                required
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancelar</Button>
            </DialogClose>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
