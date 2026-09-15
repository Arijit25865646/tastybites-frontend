import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import {
  House,
  Utensils,
  User,
  LogOut,
  Menu,
  X,
  ShoppingCart,
  Heart,
  ClipboardList,
  LayoutDashboard,
} from "lucide-react";

import logo from "../../assets/tastybites-logo.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ================= LOGIN DATA =================

  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const userCookie = Cookies.get("user");

  let user;

  try {
    user = userCookie ? JSON.parse(userCookie) : null;
  } catch {
    user = null;
  }

  // ================= ADMIN CHECK =================

  const isAdmin = token && role === "admin";

  // ================= CART & WISHLIST COUNT =================

  const getCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      return cart.reduce(
        (total, item) => total + (item.quantity || 1),
        0
      );
    } catch {
      return 0;
    }
  };

  const getWishlistCount = () => {
    try {
      const wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

      return wishlist.length;
    } catch {
      return 0;
    }
  };

  const [cartCount, setCartCount] = useState(getCartCount);
  const [wishlistCount, setWishlistCount] =
    useState(getWishlistCount);

  // ================= UPDATE COUNTS =================

  useEffect(() => {
    const updateCounts = () => {
      setCartCount(getCartCount());
      setWishlistCount(getWishlistCount());
    };

    updateCounts();

    window.addEventListener("storage", updateCounts);

    window.addEventListener("cartUpdated", updateCounts);
    window.addEventListener("wishlistUpdated", updateCounts);

    return () => {
      window.removeEventListener("storage", updateCounts);

      window.removeEventListener("cartUpdated", updateCounts);
      window.removeEventListener(
        "wishlistUpdated",
        updateCounts
      );
    };
  }, [location.pathname]);

  // ================= LOGOUT =================

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("user");

    setMobileMenuOpen(false);

    toast.success("Logged out successfully");

    navigate("/");
  };

  // ================= ACTIVE LINK =================

  const isActive = (path) => {
    return location.pathname === path;
  };

  // ================= CLOSE MOBILE MENU =================

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#FFFCF2] border-b border-[#E8E1D0] sticky top-0 z-50">

      {/* =====================================================
          HEADER CONTAINER
      ===================================================== */}

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* ================= LOGO ================= */}

        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center"
        >
          <img
            src={logo}
            alt="TastyBites"
            className="h-16 w-auto object-contain"
          />
        </Link>


        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}

        <nav className="hidden md:flex items-center gap-2">

          {/* ================= HOME ================= */}

          <Link
            to="/"
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition ${
              isActive("/")
                ? "bg-[#166534] text-white"
                : "text-gray-700 hover:text-[#166534] hover:bg-[#ECFDF5]"
            }`}
          >
            <House size={18} />
            <span>Home</span>
          </Link>


          {/* ================= MENU ================= */}

          <Link
            to="/menu"
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition ${
              isActive("/menu")
                ? "bg-[#166534] text-white"
                : "text-gray-700 hover:text-[#166534] hover:bg-[#ECFDF5]"
            }`}
          >
            <Utensils size={18} />
            <span>Menu</span>
          </Link>


          {/* =================================================
              LOGGED IN USER
          ================================================= */}

          {token ? (
            <>

              {/* ================= CART ================= */}

              <Link
                to="/cart"
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition ${
                  isActive("/cart")
                    ? "bg-[#166534] text-white"
                    : "text-gray-700 hover:text-[#166534] hover:bg-[#ECFDF5]"
                }`}
              >
                <ShoppingCart size={18} />

                <span>Cart</span>

                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 flex items-center justify-center bg-[#D99A2B] text-white text-xs font-bold rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>


              {/* ================= WISHLIST ================= */}

              <Link
                to="/wishlist"
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition ${
                  isActive("/wishlist")
                    ? "bg-[#166534] text-white"
                    : "text-gray-700 hover:text-[#166534] hover:bg-[#ECFDF5]"
                }`}
              >
                <Heart size={18} />

                <span>Wishlist</span>

                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>


              {/* ================= MY ORDERS ================= */}

              <Link
                to="/orders"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition ${
                  isActive("/orders")
                    ? "bg-[#166534] text-white"
                    : "text-gray-700 hover:text-[#166534] hover:bg-[#ECFDF5]"
                }`}
              >
                <ClipboardList size={18} />

                <span>My Orders</span>
              </Link>


              {/* ================= ADMIN DASHBOARD ================= */}

              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition ${
                    location.pathname.startsWith("/admin")
                      ? "bg-[#123524] text-white"
                      : "text-[#166534] bg-[#ECFDF5] hover:bg-[#D9EAD3]"
                  }`}
                >
                  <LayoutDashboard size={18} />

                  <span>Admin Dashboard</span>
                </Link>
              )}


              {/* ================= USER ================= */}

              <div className="flex items-center gap-2 ml-2 px-4 py-2 bg-[#F3F7ED] rounded-lg">

                <User
                  size={18}
                  className="text-[#166534]"
                />

                <span className="text-gray-800 font-semibold">
                  Hi, {user?.name}
                </span>

              </div>


              {/* ================= LOGOUT ================= */}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 ml-1 px-4 py-2.5 rounded-lg text-gray-700 hover:text-[#166534] hover:bg-[#ECFDF5] font-medium transition"
              >
                <LogOut size={18} />

                <span>Logout</span>
              </button>

            </>
          ) : (

            /* =================================================
               LOGGED OUT USER
            ================================================= */

            <>

              {/* ================= LOGIN ================= */}

              <Link
                to="/login"
                className="flex items-center gap-2 ml-2 px-4 py-2.5 rounded-lg text-gray-700 hover:text-[#166534] hover:bg-[#ECFDF5] font-medium transition"
              >
                <User size={18} />

                <span>Login</span>
              </Link>


              {/* ================= REGISTER ================= */}

              <Link
                to="/register"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#166534] text-white rounded-lg font-semibold hover:bg-[#14532D] transition shadow-sm"
              >
                <User size={18} />

                <span>Register</span>
              </Link>

            </>
          )}

        </nav>


        {/* =====================================================
            MOBILE MENU BUTTON
        ===================================================== */}

        <button
          onClick={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }
          className="md:hidden p-2.5 rounded-lg text-[#166534] hover:bg-[#ECFDF5] transition"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X size={26} />
          ) : (
            <Menu size={26} />
          )}
        </button>

      </div>


      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E1D0] bg-[#FFFCF2]">

          <nav className="px-6 py-5 space-y-2">

            {/* ================= HOME ================= */}

            <Link
              to="/"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                isActive("/")
                  ? "bg-[#166534] text-white"
                  : "text-gray-700 hover:bg-[#ECFDF5] hover:text-[#166534]"
              }`}
            >
              <House size={19} />

              <span>Home</span>
            </Link>


            {/* ================= MENU ================= */}

            <Link
              to="/menu"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                isActive("/menu")
                  ? "bg-[#166534] text-white"
                  : "text-gray-700 hover:bg-[#ECFDF5] hover:text-[#166534]"
              }`}
            >
              <Utensils size={19} />

              <span>Menu</span>
            </Link>


            {token ? (
              <>

                {/* ================= CART ================= */}

                <Link
                  to="/cart"
                  onClick={closeMobileMenu}
                  className={`relative flex items-center justify-between px-4 py-3 rounded-lg font-medium transition ${
                    isActive("/cart")
                      ? "bg-[#166534] text-white"
                      : "text-gray-700 hover:bg-[#ECFDF5] hover:text-[#166534]"
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <ShoppingCart size={19} />

                    <span>Cart</span>

                  </div>

                  {cartCount > 0 && (
                    <span className="min-w-[22px] h-5 px-1 flex items-center justify-center bg-[#D99A2B] text-white text-xs font-bold rounded-full">
                      {cartCount}
                    </span>
                  )}

                </Link>


                {/* ================= WISHLIST ================= */}

                <Link
                  to="/wishlist"
                  onClick={closeMobileMenu}
                  className={`relative flex items-center justify-between px-4 py-3 rounded-lg font-medium transition ${
                    isActive("/wishlist")
                      ? "bg-[#166534] text-white"
                      : "text-gray-700 hover:bg-[#ECFDF5] hover:text-[#166534]"
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <Heart size={19} />

                    <span>Wishlist</span>

                  </div>

                  {wishlistCount > 0 && (
                    <span className="min-w-[22px] h-5 px-1 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">
                      {wishlistCount}
                    </span>
                  )}

                </Link>


                {/* ================= MY ORDERS ================= */}

                <Link
                  to="/orders"
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                    isActive("/orders")
                      ? "bg-[#166534] text-white"
                      : "text-gray-700 hover:bg-[#ECFDF5] hover:text-[#166534]"
                  }`}
                >
                  <ClipboardList size={19} />

                  <span>My Orders</span>
                </Link>


                {/* ================= ADMIN DASHBOARD ================= */}

                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition ${
                      location.pathname.startsWith("/admin")
                        ? "bg-[#123524] text-white"
                        : "bg-[#ECFDF5] text-[#166534] hover:bg-[#D9EAD3]"
                    }`}
                  >
                    <LayoutDashboard size={19} />

                    <span>Admin Dashboard</span>
                  </Link>
                )}


                {/* ================= USER ================= */}

                <div className="flex items-center gap-3 px-4 py-3 mt-3 bg-[#F3F7ED] rounded-lg">

                  <User
                    size={19}
                    className="text-[#166534]"
                  />

                  <span className="text-gray-800 font-semibold">
                    Hi, {user?.name}
                  </span>

                </div>


                {/* ================= LOGOUT ================= */}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-[#ECFDF5] hover:text-[#166534] font-medium transition"
                >
                  <LogOut size={19} />

                  <span>Logout</span>
                </button>

              </>
            ) : (
              <>

                {/* ================= LOGIN ================= */}

                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-[#ECFDF5] hover:text-[#166534] font-medium transition"
                >
                  <User size={19} />

                  <span>Login</span>
                </Link>


                {/* ================= REGISTER ================= */}

                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#166534] text-white rounded-lg font-semibold hover:bg-[#14532D] transition"
                >
                  <User size={19} />

                  <span>Register</span>
                </Link>

              </>
            )}

          </nav>

        </div>
      )}

    </header>
  );
};

export default Header;