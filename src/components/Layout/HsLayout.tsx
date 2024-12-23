import { Outlet } from "react-router-dom";
import Breadcrumb from "../Breadcrumb";
import Header from "../HsDashboard/Header";
import Sidebar from "../HsDashboard/Sidebar";

export default function HsLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden border-r bg-background md:block md:w-64">
        <Sidebar />
      </div>
      <div className="flex w-full flex-col">
        <Header />
        <main className="container p-4 md:p-6 lg:p-8">
          <Breadcrumb />
          <div className="mt-4">
            <Outlet/>
          </div>
        </main>
      </div>
    </div>
  );
}
