import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from './layout/Public';
import AuthLayout from './layout/Auth';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route path="/public/*" element={<PublicLayout />} />
        <Route path="/" element={<Navigate to="/public/error" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
