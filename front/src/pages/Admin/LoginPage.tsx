import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/Auth";
import { toast } from "sonner";

export default function LoginPageAdmin() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/admin';
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            await login(email, password); 
            toast.success("Inicio de sesión exitoso", {
            position: "top-center",
            });
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Network error', error);
            toast.error("Error al iniciar sesión", {
            position: "top-center",
            });
        } 
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#1a1a2e_0%,_#0a0a0a_70%)] flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-6 w-full max-w-sm">

            {/* Badge */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-700 bg-gray-900/60 text-gray-400 text-xs font-medium tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Panel de administración
            </div>

            <Card className="w-full border border-gray-700/60 bg-gray-950/80 shadow-2xl shadow-black/60">
                <CardHeader className="space-y-1 pb-4">
                    <CardTitle className="text-xl font-bold text-center text-white">
                        Acceso restringido
                    </CardTitle>
                    <CardDescription className="text-center text-gray-500 text-xs">
                        Solo personal autorizado
                    </CardDescription>
                </CardHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                <CardContent>
                        <div className="space-y-1">
                            <Label htmlFor="email" className="text-gray-400 text-xs uppercase tracking-wide">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 focus:border-gray-500 text-sm"
                                required
                            />
                        </div>
                        <div className="space-y-1 mt-3">
                            <Label htmlFor="password" className="text-gray-400 text-xs uppercase tracking-wide">
                                Contraseña
                            </Label>
                            <Input 
                                id="password" 
                                type="password" 
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 focus:border-gray-500 text-sm"
                                required 
                            />
                        </div> 
                </CardContent>
                <CardFooter className="flex flex-col gap-3 pt-0">
                    <Button 
                        type="submit" 
                        className="w-full bg-gray-100 text-black hover:bg-white font-semibold text-sm"
                    >
                        Ingresar
                    </Button>
                    <a href="/" className="text-center text-xs text-gray-600 hover:text-gray-400 transition-colors mt-1">
                        ← Volver al inicio
                    </a>
                </CardFooter>
                </form>
            </Card>
        </div>
        </div>
    )
}