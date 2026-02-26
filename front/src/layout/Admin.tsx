import { Outlet, useRoutes } from 'react-router-dom';
import { Header } from '@/components/Header/Header';

export default function AdminLayout() {
    
    const navItems = [
    { to: '/admin', label: 'Dashboard', end: true },
    { to: '/admin/gestion', label: 'Gestión', end: false },
    ];

    return (
        <>
            <div className=" min-h-screen bg-gradient-to-br from-black to-gray-900">
             <Header navItems={navItems} />
             <Outlet />
             </div>
        </>
    );
}

