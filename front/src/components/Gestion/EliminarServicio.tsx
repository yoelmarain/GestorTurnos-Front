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
import { deleteServicio } from "@/API/Public/Servicios"
import { toast } from "sonner"

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
    onServicioEliminado: () => void;
}

export function EliminarServicio({ open, onOpenChange, servicio, onServicioEliminado }: Props) {
  const handleDelete = async () => {
    if (!servicio) return;

    try {
      await deleteServicio(servicio.id);
      
      toast.success("Servicio eliminado con éxito", {
        position: "top-center",
      });
      
      onServicioEliminado();
      onOpenChange(false);
    } catch (error) {
      toast.error("Error al eliminar el servicio", {
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
            {servicio ? (
              <>
                Esta acción eliminará permanentemente el servicio{" "}
                <span className="font-semibold text-white">
                  {servicio.nombre_servicio}
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
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
