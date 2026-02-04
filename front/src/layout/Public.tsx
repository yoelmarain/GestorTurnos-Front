import { useRoutes } from 'react-router-dom';
import routes from '../routes';
import { Header } from '@/components/Header/Header';

export default function PublicLayout() {
    const publicRoutes = routes.filter((route) => route.rol === 'public');
    const element = useRoutes(publicRoutes);

    const LINK_ITEMS = publicRoutes
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

