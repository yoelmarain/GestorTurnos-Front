import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/Auth';
import { useEffect, useRef } from 'react';

export function AdminRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const location = useLocation();
    const hasShownToast = useRef(false);

    useEffect(() => {
        if (user?.role !== 'admin' && !hasShownToast.current) {
            // toast.error('Acceso denegado. Solo administradores pueden acceder a esta sección.');
            hasShownToast.current = true;
        }
    }, [user]);

    if (user?.role === 'admin') {
        return <>{children}</>;   // Si es admin, renderiza el componente hijo (AdminLayout)
    } else {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
}