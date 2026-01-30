import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from './layout/Public';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/public/*" element={<PublicLayout />} />
        <Route path="/" element={<Navigate to="/public/error" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
