import  { useState } from "react";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../Breadcrumb";
import Header from "../DrDashboard/Header";
import Sidebar from "../DrDashboard/Sidebar";

export default function DrLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className={`flex flex-1 flex-col transition-all duration-200 ease-in-out ${isSidebarOpen ? "md:pl-64" : "md:pl-20"}`}>
        <div className={`fixed top-0 right-0 left-0 z-10 transition-all duration-200 ease-in-out ${isSidebarOpen ? "md:left-64" : "md:left-20"}`}>
          <Header />
        </div>
        <main className="flex-1 overflow-y-auto pt-16">
          <div className="container p-4 md:p-6 lg:p-8">
            <Breadcrumb />
            <div className="mt-4">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

