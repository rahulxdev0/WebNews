import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicLayout from './public/publicLayout';
import Home from './public/Home';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout />} >
            <Route index element={<Home />}/>
          </Route>
          <Route path="/admin" element={<AdminLayout />} >
            <Route index element={<AdminDashboard />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
