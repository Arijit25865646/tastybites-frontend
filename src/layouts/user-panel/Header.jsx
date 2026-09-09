import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";

const Header = () => {
  const navigate = useNavigate();

  const token = Cookies.get("token");
  const userCookie = Cookies.get("user");

  let user;

  try {
    user = userCookie ? JSON.parse(userCookie) : null;
  } catch {
    user = null;
  }

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("user");

    toast.success("Logged out successfully");

    navigate("/");
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl font-bold text-red-600">
            TASTY BITES
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">

          <Link
            to="/"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Home
          </Link>

          <Link
            to="/menu"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Menu
          </Link>

          {token ? (
            <>
              {/* User Name */}
              <span className="text-gray-700 font-medium">
                Hi, {user?.name}
              </span>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-red-600 font-medium"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-gray-700 hover:text-red-600 font-medium"
              >
                Register
              </Link>
            </>
          )}

        </nav>
      </div>
    </header>
  );
};

export default Header;