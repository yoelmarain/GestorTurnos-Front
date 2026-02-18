import ErrorPage from './pages/Error';
import LoginPage from './pages/LoginPage';
import StaffPage from './pages/Public/Staff';
import ReservasPage from './pages/Public/Reservas';
import AdminHome from './pages/Admin/Home';
import GestionPage from './pages/Admin/Gestion';

const routes = [
    {
        path: '/reservar',
        element: <ReservasPage />,
        title: 'Reservar',
        rol: 'public'
    },
    {
        path: '/staff',
        element: <StaffPage />,
        title: 'Staff',
        rol: 'public'
    },
    {
        path: '/login',
        element: <LoginPage />,
        title: 'login',
        rol: 'auth'
    },
    {
        path: '/home',
        element: <AdminHome />,
        title: 'Home',
        rol: 'admin'
    },
    {
        path: '/gestion',
        element: <GestionPage />,
        title: 'Gestion',
        rol: 'admin'
    },
    
]

export default routes;