import { useState } from "react";
import AdminHeader from "./components/AdminHeader";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import { useUserInfoQuery } from "../store/api/authEndpoints";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data, isLoading } = useUserInfoQuery();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar
          data={data}
          isLoading={isLoading}
          isOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
        />

        <div className="flex-1 flex flex-col lg:ml-64">
          <AdminHeader
            data={data}
            isLoading={isLoading}
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />

          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
