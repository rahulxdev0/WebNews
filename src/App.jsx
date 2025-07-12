import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicLayout from './public/publicLayout';
import Home from './public/Home';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import ManageCategory from './admin/manageCategory/ManageCategory';
import ManageDistricts from './admin/manageDistricts/ManageDistricts';

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
            <Route path='manage-category' element={<ManageCategory />} />
            <Route path='manage-district' element={<ManageDistricts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
