import React from 'react'
import { Outlet } from 'react-router-dom';
import PublicHeader from './components/PublicHeader';
import Footer from './components/Footer';

const PublicLayout = () => {
  return (
    <div>
      <PublicHeader />
      <Outlet />
      <Footer />
    </div>
  )
}

export default PublicLayout;