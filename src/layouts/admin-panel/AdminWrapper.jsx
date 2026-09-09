import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AdminWrapper = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminWrapper;