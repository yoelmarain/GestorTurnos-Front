import { useRoutes } from 'react-router-dom';
import routes from '../routes';
import { Header } from '@/components/Header/Header';

export default function AdminLayout() {
    const adminRoutes = routes.filter((route) => route.rol === 'admin');
    const element = useRoutes(adminRoutes);

    const LINK_ITEMS = adminRoutes
        .map((route) => ({
            title: route.title!,
            url: route.path,
            rol: route.rol!,
        }));

    return (
        <>
            <div className=" min-h-screen bg-gradient-to-br from-black to-gray-900">
             <Header linkItems={LINK_ITEMS} />
             {element}
             </div>
        </>
    );
}

