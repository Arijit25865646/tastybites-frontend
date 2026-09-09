import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div>
          <Link to="/">
            <h1 className="text-2xl font-bold text-red-600">
              TASTY BITES
            </h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">

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

        </div>

      </div>
    </nav>
  );
};

export default Navbar;