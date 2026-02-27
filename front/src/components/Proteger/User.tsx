import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/Auth';
import { useEffect, useRef } from 'react';

export function UsuarioRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const location = useLocation();
    const hasShownToast = useRef(false);

    useEffect(() => {
        if (user?.role !== 'usuario' && !hasShownToast.current) {
            // toast.error('Acceso denegado. Solo usuarios pueden acceder a esta sección.');
            hasShownToast.current = true;
        }
    }, [user]);

    if (user?.role === 'usuario') {
        return <>{children}</>;   // Si es usuario, renderiza el componente hijo (UserLayout)
    } else {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }
}