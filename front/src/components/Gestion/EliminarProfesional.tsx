import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteProfesional } from "@/API/Public/Profesionales"
import { toast } from "sonner"

interface Profesional {
  id: number;
  nombre_profesional: string;
}

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    profesional: Profesional | null;
    onProfesionalEliminado: () => void;
}

export function EliminarProfesional({ open, onOpenChange, profesional, onProfesionalEliminado }: Props) {
  const handleDelete = async () => {
    if (!profesional) return;
    try {
      await deleteProfesional(profesional.id);
      toast.success("Profesional eliminado con éxito", { position: "top-center" });
      onProfesionalEliminado();
      onOpenChange(false);
    } catch (error) {
      toast.error("Error al eliminar el profesional", {
        description: String(error),
        position: "top-center",
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-gray-900 border-gray-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300">
            {profesional ? (
              <>
                Esta acción eliminará permanentemente al profesional{" "}
                <span className="font-semibold text-white">
                  {profesional.nombre_profesional}
                </span>
                . Esta acción no se puede deshacer.
              </>
            ) : (
              "Esta acción no se puede deshacer."
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
