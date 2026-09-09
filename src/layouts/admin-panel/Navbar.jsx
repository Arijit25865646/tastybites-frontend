import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("user");

    toast.success("Logged out successfully");

    navigate("/");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          Admin Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">
          Admin
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;