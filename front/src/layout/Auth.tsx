import routes from '../routes';
import { useRoutes } from 'react-router-dom';


export default function Auth() {
   const element = useRoutes(routes.filter(route => route.rol === 'auth'));

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-900">
            {element}
        </div>
    );
    
  
}