import ErrorPage from './pages/Error';
import LoginPage from './pages/LoginPage';

const routes = [
    {
        path: '/error',
        element: <ErrorPage />,
        title: 'error',
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