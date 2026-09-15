import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Utensils,
  PlusCircle,
  Users,
  ShoppingBag,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  // Check active sidebar item
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="w-64 min-h-screen bg-[#123524] text-white flex flex-col">
      {/* =====================================================
          BRAND
      ===================================================== */}

      <div className="px-6 py-7 border-b border-white/10">
        <Link to="/admin/dashboard" className="block">
          <h2 className="text-2xl font-extrabold tracking-wide">
            TASTY<span className="text-[#D99A2B]">BITES</span>
          </h2>

          <p className="text-[#B7C9BC] text-sm mt-1">Admin Panel</p>
        </Link>
      </div>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="px-4 py-6 space-y-2 flex-1">
        {/* ================= DASHBOARD ================= */}

        <Link
          to="/admin/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
            isActive("/admin/dashboard")
              ? "bg-[#166534] text-white shadow-sm"
              : "text-[#DDE9E1] hover:bg-white/10 hover:text-white"
          }`}
        >
          <LayoutDashboard size={19} />

          <span>Dashboard</span>
        </Link>

        {/* ================= MENU ITEMS ================= */}

        <Link
          to="/admin/menu"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
            isActive("/admin/menu")
              ? "bg-[#166534] text-white shadow-sm"
              : "text-[#DDE9E1] hover:bg-white/10 hover:text-white"
          }`}
        >
          <Utensils size={19} />

          <span>Menu Items</span>
        </Link>

        {/* ================= ADD MENU ITEM ================= */}

        <Link
          to="/admin/menu/create"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
            isActive("/admin/menu/create")
              ? "bg-[#166534] text-white shadow-sm"
              : "text-[#DDE9E1] hover:bg-white/10 hover:text-white"
          }`}
        >
          <PlusCircle size={19} />

          <span>Add Menu Item</span>
        </Link>

        {/* ================= ORDERS ================= */}

        <Link
          to="/admin/orders"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
            isActive("/admin/orders")
              ? "bg-[#166534] text-white shadow-sm"
              : "text-[#DDE9E1] hover:bg-white/10 hover:text-white"
          }`}
        >
          <ShoppingBag size={19} />

          <span>Orders</span>
        </Link>

        {/* ================= USERS ================= */}

        <Link
          to="/admin/users"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
            isActive("/admin/users")
              ? "bg-[#166534] text-white shadow-sm"
              : "text-[#DDE9E1] hover:bg-white/10 hover:text-white"
          }`}
        >
          <Users size={19} />

          <span>Users</span>
        </Link>
      </nav>

      {/* =====================================================
          SIDEBAR FOOTER
      ===================================================== */}

      <div className="px-6 py-5 border-t border-white/10">
        <p className="text-xs text-[#8FA99A]">TastyBites Admin</p>

        <p className="text-xs text-[#6F8C7A] mt-1">Manage your restaurant</p>
      </div>
    </aside>
  );
};

export default Sidebar;
