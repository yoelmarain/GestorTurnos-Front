
import { Toaster } from "@/components/ui/sonner"
import { useEffect } from 'react';
import { toast } from "sonner"
import { AppRouter } from "./routes";
import { AuthProvider } from "./context/Auth";

function App() {

   useEffect(() => {
        const ok = sessionStorage.getItem("turno_ok")
        const hora = sessionStorage.getItem("turno_hora")
        if (ok === "1") {
                let horaFormateada = hora;
                if (hora) {
                  const fecha = new Date(hora);
                  const dia = String(fecha.getDate()).padStart(2, '0');
                  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
                  const horas = String(fecha.getHours()).padStart(2, '0');
                  const minutos = String(fecha.getMinutes()).padStart(2, '0');
                  horaFormateada = `${dia}/${mes} a las ${horas}:${minutos}`;
                }
                toast.success("Turno reservado con éxito", 
                { description: horaFormateada, position: "top-center" ,}
              )
          sessionStorage.removeItem("turno_ok");
          sessionStorage.removeItem("turno_hora");
        }
    }, []);

  return (
    <AuthProvider>
      <AppRouter />
      <Toaster 
        position="top-center"
        richColors
        toastOptions={{
          classNames: {
            success: "bg-emerald-600 text-white",
            error: "bg-red-600 text-white",
            warning: "bg-yellow-500 text-black",
            info: "bg-blue-600 text-white",
          },
        }}
      />
  </AuthProvider>
  )
}

export default App
