import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-red-500">
          TASTY BITES
        </h2>

        <p className="text-gray-400 text-sm mt-1">
          Admin Panel
        </p>
      </div>

      <nav className="px-4 mt-4 space-y-2">
        <Link
          to="/admin/dashboard"
          className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/menu"
          className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Menu Items
        </Link>

        <Link
          to="/admin/menu/create"
          className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Add Menu Item
        </Link>

        <Link
          to="/admin/users"
          className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Users
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;