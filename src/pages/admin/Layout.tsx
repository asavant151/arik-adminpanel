import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import Footer from "../../components/admin/Footer";
import NotificationDropdown from "../../components/admin/NotificationDropdown.tsx";
import AdminDropdown from "../../components/admin/AdminDropdown";
import SearchDropdown from "../../components/admin/SearchDropdown";

const Layout: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-end py-2 h-[70px] sm:px-12 border-b border-[#232321]/20 gap-x-8">
            <SearchDropdown />
            <NotificationDropdown />
            <AdminDropdown />
          </div>
          <div className="p-6 bg-[#e7e7e3] relative">
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
