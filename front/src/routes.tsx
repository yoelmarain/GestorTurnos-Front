import ErrorPage from './pages/Error';
import LoginPage from './pages/LoginPage';
import StaffPage from './pages/Public/Staff';
import ReservasPage from './pages/Public/Reservas';

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
    }
]

export default routes;