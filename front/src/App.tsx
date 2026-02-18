import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from './layout/Public';
import AuthLayout from './layout/Auth';
import { Toaster } from "@/components/ui/sonner"
import { useEffect } from 'react';
import { toast } from "sonner"

function App() {

   useEffect(() => {
        const ok = sessionStorage.getItem("turno_ok")
        if (ok === "1") {
                toast("Turno reservado con éxito", {
                description: "Monday, January 3rd at 6:00pm",
        })
          sessionStorage.removeItem("turno_ok");
        }
    }, []);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route path="/public/*" element={<PublicLayout />} />
        <Route path="/" element={<Navigate to="/public/error" replace />} />
      </Routes>
     <Toaster />
    </BrowserRouter>
  </>
  )
}

export default App
