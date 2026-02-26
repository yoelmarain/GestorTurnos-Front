import ErrorPage from './pages/Error';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Public/Home';
import StaffPage from './pages/Public/Staff';
import ReservasPage from './pages/Public/Reservas';
import AdminHome from './pages/Admin/Home';
import GestionPage from './pages/Admin/Gestion';

import PublicLayout from './layout/Public';
import AdminLayout from './layout/Admin';

import { AdminRoute } from './components/Proteger/Admin';
import { UsuarioRoute } from './components/Proteger/User';

import { BrowserRouter, Route, Routes } from 'react-router-dom';


export function AppRouter() {
    return (
        <BrowserRouter>

            <Routes>
                {/* Public */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/reservas" element={
                        <UsuarioRoute>
                            <ReservasPage />
                        </UsuarioRoute>
                    } />
                    <Route path="/staff" element={
                        <UsuarioRoute>
                            <StaffPage />
                        </UsuarioRoute>
                        } />
                </Route>

                {/* Auth */}
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/admin/login" element={<LoginPage />} />

                {/* Admin */}
                <Route path="/admin" element={
                    <AdminRoute>
                        <AdminLayout />
                    </AdminRoute>
                }>
                    <Route index element={<AdminHome />} />
                    <Route path="gestion" element={<GestionPage />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        
        </BrowserRouter>
    )

}


