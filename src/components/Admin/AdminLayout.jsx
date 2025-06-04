import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar'
import Navbar from '../Navbar/Navbar'

function AdminLayout() {
  return (
    <div className='flex min-h-screen'>
        <AdminSidebar/>
        <div className='flex flex-col flex-1'>
          <Navbar/>
          <main className="mt-22 ml-[18%] w-[82%]">
            <Outlet />
          </main>
        </div>
    </div>
  )
}

export default AdminLayout