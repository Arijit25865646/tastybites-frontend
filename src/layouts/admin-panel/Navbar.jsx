import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Home, LogOut } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("user");

    toast.success("Logged out successfully");

    navigate("/");
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <header className="h-16 bg-white border-b border-[#E8E1D0] flex items-center justify-between px-6">

      {/* ================= LEFT ================= */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">
          Admin Dashboard
        </h1>

        <p className="text-xs text-gray-500 hidden sm:block">
          TastyBites Management Panel
        </p>
      </div>


      {/* ================= RIGHT ================= */}
      <div className="flex items-center gap-3">

        {/* Home Button */}
        <button
          onClick={handleHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#166534] text-[#166534] font-medium hover:bg-[#ECFDF5] transition"
        >
          <Home size={17} />

          <span className="hidden sm:inline">
            Home
          </span>
        </button>


        {/* Admin */}
        <div className="hidden sm:flex items-center gap-2">

          <div className="w-9 h-9 rounded-full bg-[#166534] text-white flex items-center justify-center font-bold">
            A
          </div>

          <span className="text-gray-700 font-medium">
            Admin
          </span>

        </div>


        {/* Logout */}
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 bg-[#166534] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#14532D] transition"
        >
          <LogOut size={17} />

          <span>
            Logout
          </span>
        </button>

      </div>

    </header>
  );
};

export default Navbar;