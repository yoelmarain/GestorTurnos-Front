import { useRoutes } from 'react-router-dom';
import routes from '../routes';

export default function PublicLayout() {
    const element = useRoutes(routes.filter(route => route.rol === 'public'));

    return (
        <>
            {element}
        </>
    );
}

