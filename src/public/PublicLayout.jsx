import React from 'react'
import { Outlet } from 'react-router-dom';
import PublicHeader from './components/PublicHeader';

const PublicLayout = () => {
  return (
    <div>
      <PublicHeader />
      <Outlet />
    </div>
  )
}

export default PublicLayout;