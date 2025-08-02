import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import Footer from "../../components/admin/Footer";
import NotificationDropdown from "../../components/admin/NotificationDropdown.tsx";
import AdminDropdown from "../../components/admin/AdminDropdown";
import SearchDropdown from "../../components/admin/SearchDropdown";

const Layout: React.FC = () => {
  const [isShow, setShow] = useState(true);

  const toggleMenu = () => {
    setShow(!isShow);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const isMobile = window.innerWidth < 1024;

  return (
    <div className="min-h-screen bg-[#e7e7e3] w-full">
      {/* Mobile menu button would go here */}

      <div className="flex flex-row h-full">
        {/* Sidebar - hidden on mobile, shown on medium screens and up */}
        <div style={{ display: isMobile ? (isShow ? "block" : "none") : "block" }}>
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-white shadow-sm">
            <div className="flex items-center md:justify-end justify-between py-2 px-4 h-[70px] border-b border-[#232321]/20">
              {/* Mobile menu button and logo would go here */}
              <div className="lg:hidden">
                {/* Mobile menu toggle button */}
                <button
                  className="p-2 rounded-md text-gray-700"
                  onClick={toggleMenu}
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
                <div className="hidden sm:block">
                  <SearchDropdown />
                </div>
                <NotificationDropdown />
                <AdminDropdown />
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 px-6 lg:px-8 py-6">
            <Outlet />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
