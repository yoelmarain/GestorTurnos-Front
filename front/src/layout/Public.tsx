import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header/Header';

export default function PublicLayout() {
    const navItems = [
        { to: '/', label: 'Reservas', end: true },
        { to: '/staff', label: 'Staff', end: false },
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

