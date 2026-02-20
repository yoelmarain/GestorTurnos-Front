import ErrorPage from './pages/Error';
import LoginPage from './pages/LoginPage';
import StaffPage from './pages/Public/Staff';
import ReservasPage from './pages/Public/Reservas';
import AdminHome from './pages/Admin/Home';
import GestionPage from './pages/Admin/Gestion';
import TurnosPage from './pages/Admin/Turnos';
import ClientesPage from './pages/Admin/Clientes';

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
    {
        path: '/turnos',
        element: <TurnosPage />,
        title: 'Turnos',
        rol: 'admin'
    },
    {
        path: '/clientes',
        element: <ClientesPage />,
        title: 'Clientes',
        rol: 'admin'
    },
]

export default routes;