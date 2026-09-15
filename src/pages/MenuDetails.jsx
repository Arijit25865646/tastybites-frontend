import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import api from "../api/axios";

import {
  ArrowLeft,
  CheckCircle,
  CircleX,
  Utensils,
  Heart,
  ShoppingCart,
  Zap,
  Minus,
  Plus,
} from "lucide-react";

const MenuDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [menuItem, setMenuItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // ================= CART =================
  const [, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  // ================= WISHLIST =================
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch {
      return [];
    }
  });

  // ================= FETCH MENU ITEM =================
  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      toast.error("Please login to view menu details");
      navigate("/login");
      return;
    }

    const fetchMenuItem = async () => {
      try {
        const response = await api.get(`/menu-items/${id}`);

        if (response.data.success) {
          setMenuItem(response.data.data);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load menu item"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [id, navigate]);

  // ================= WISHLIST STATUS =================
  const isWishlisted = wishlistItems.some(
    (item) => item._id === menuItem?._id
  );

  // ================= QUANTITY =================
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  // ================= WISHLIST =================
  const handleWishlist = () => {
    if (!menuItem) return;

    setWishlistItems((prev) => {
      const exists = prev.some(
        (item) => item._id === menuItem._id
      );

      let updatedWishlist;

      if (exists) {
        updatedWishlist = prev.filter(
          (item) => item._id !== menuItem._id
        );

        toast.success("Removed from wishlist");
      } else {
        updatedWishlist = [...prev, menuItem];

        toast.success("Added to wishlist");
      }

      localStorage.setItem(
        "wishlist",
        JSON.stringify(updatedWishlist)
      );
      window.dispatchEvent(new Event("wishlistUpdated"));

      return updatedWishlist;
    });
  };

  // ================= ADD TO CART =================
  const handleAddToCart = () => {
    if (!menuItem) return;

    if (!menuItem.availability) {
      toast.error("This item is currently unavailable");
      return;
    }

    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item._id === menuItem._id
      );

      let updatedCart;

      if (existingItem) {
        updatedCart = prev.map((item) =>
          item._id === menuItem._id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      } else {
        updatedCart = [
          ...prev,
          {
            ...menuItem,
            quantity,
          },
        ];
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );
      window.dispatchEvent(new Event("cartUpdated"));

      return updatedCart;
    });

    toast.success(
      `${quantity} ${
        quantity === 1 ? "item" : "items"
      } added to cart`
    );
  };

  // ================= BUY NOW =================
  const handleBuyNow = () => {
    if (!menuItem) return;

    if (!menuItem.availability) {
      toast.error("This item is currently unavailable");
      return;
    }

    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item._id === menuItem._id
      );

      let updatedCart;

      if (existingItem) {
        updatedCart = prev.map((item) =>
          item._id === menuItem._id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      } else {
        updatedCart = [
          ...prev,
          {
            ...menuItem,
            quantity,
          },
        ];
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

      return updatedCart;
    });

    toast.success("Added to cart");

    navigate("/cart");
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFCF2] flex items-center justify-center">
        <div className="text-center">

          <div className="w-12 h-12 border-4 border-[#D9EAD3] border-t-[#166534] rounded-full animate-spin mx-auto" />

          <p className="text-lg font-semibold text-gray-700 mt-4">
            Loading details...
          </p>

        </div>
      </div>
    );
  }

  // ================= NOT FOUND =================
  if (!menuItem) {
    return (
      <div className="min-h-screen bg-[#FFFCF2] flex flex-col items-center justify-center px-6">

        <div className="w-16 h-16 rounded-full bg-[#ECFDF5] flex items-center justify-center">
          <Utensils
            size={30}
            className="text-[#166534]"
          />
        </div>

        <p className="text-xl font-bold text-gray-800 mt-5">
          Menu item not found
        </p>

        <p className="text-gray-500 mt-2">
          The dish you're looking for is unavailable.
        </p>

        <Link
          to="/menu"
          className="inline-flex items-center gap-2 mt-6 bg-[#166534] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#14532D] transition"
        >
          <ArrowLeft size={18} />
          Back to Menu
        </Link>

      </div>
    );
  }

  const totalPrice = menuItem.price * quantity;

  return (
    <div className="min-h-screen bg-[#FFFCF2] px-6 py-12">

      <div className="max-w-6xl mx-auto">

        {/* ================= BACK ================= */}
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#166534] font-semibold mb-6 transition"
        >
          <ArrowLeft size={18} />
          Back to Menu
        </Link>

        {/* ================= MAIN CARD ================= */}
        <div className="bg-white rounded-3xl overflow-hidden border border-[#E8E1D0] shadow-lg">

          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* ================= IMAGE ================= */}
            <div className="relative h-80 md:h-[520px] bg-gray-100">

              <img
                src={menuItem.image?.url}
                alt={menuItem.name}
                className="w-full h-full object-cover"
              />

              {/* CATEGORY */}
              <div className="absolute top-5 left-5">

                <span className="inline-flex items-center gap-2 bg-white/95 text-[#166534] px-4 py-2 rounded-full font-bold text-sm shadow-md">

                  <Utensils size={16} />

                  {menuItem.category}

                </span>

              </div>

              {/* ================= HEART WISHLIST ================= */}
              <button
                onClick={handleWishlist}
                className={`absolute top-5 right-5 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
                  isWishlisted
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-500"
                }`}
                title={
                  isWishlisted
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"
                }
              >

                <Heart
                  size={24}
                  fill={
                    isWishlisted
                      ? "currentColor"
                      : "none"
                  }
                />

              </button>

            </div>

            {/* ================= DETAILS ================= */}
            <div className="p-7 md:p-10 flex flex-col justify-center">

              {/* CATEGORY */}
              <p className="text-[#166534] font-bold tracking-widest text-sm uppercase mb-3">
                {menuItem.category}
              </p>

              {/* NAME */}
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                {menuItem.name}
              </h1>

              {/* DESCRIPTION */}
              <div className="mt-6">

                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                  About This Dish
                </p>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {menuItem.description}
                </p>

              </div>

              {/* PRICE + AVAILABILITY */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E8E1D0]">

                <div>

                  <p className="text-sm text-gray-500">
                    Price
                  </p>

                  <p className="text-3xl font-extrabold text-[#166534] mt-1">
                    ₹{menuItem.price}
                  </p>

                </div>

                <div>

                  {menuItem.availability ? (

                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#ECFDF5] text-[#166534] rounded-full font-bold">

                      <CheckCircle size={18} />

                      Available

                    </span>

                  ) : (

                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full font-bold">

                      <CircleX size={18} />

                      Unavailable

                    </span>

                  )}

                </div>

              </div>

              {/* ================= QUANTITY ================= */}
              {menuItem.availability && (

                <div className="mt-7">

                  <p className="text-sm font-bold text-gray-700 mb-3">
                    Quantity
                  </p>

                  <div className="flex items-center gap-3">

                    <button
                      onClick={decreaseQuantity}
                      className="w-10 h-10 rounded-lg border border-[#E8E1D0] flex items-center justify-center hover:bg-[#F5FAF2] hover:text-[#166534] transition"
                    >
                      <Minus size={18} />
                    </button>

                    <span className="w-10 text-center text-lg font-bold">
                      {quantity}
                    </span>

                    <button
                      onClick={increaseQuantity}
                      className="w-10 h-10 rounded-lg border border-[#E8E1D0] flex items-center justify-center hover:bg-[#F5FAF2] hover:text-[#166534] transition"
                    >
                      <Plus size={18} />
                    </button>

                    <span className="ml-3 text-sm text-gray-500">
                      Total:{" "}
                      <span className="font-bold text-[#166534]">
                        ₹{totalPrice}
                      </span>
                    </span>

                  </div>

                </div>

              )}

              {/* ================= CART + BUY ================= */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">

                <button
                  onClick={handleAddToCart}
                  disabled={!menuItem.availability}
                  className="flex items-center justify-center gap-2 bg-[#F3F7ED] text-[#166534] border border-[#D9EAD3] py-3.5 rounded-xl font-bold hover:bg-[#ECFDF5] transition disabled:opacity-50"
                >

                  <ShoppingCart size={19} />

                  Add to Cart

                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={!menuItem.availability}
                  className="flex items-center justify-center gap-2 bg-[#166534] text-white py-3.5 rounded-xl font-bold hover:bg-[#14532D] transition disabled:opacity-50"
                >

                  <Zap size={19} />

                  Buy Now

                </button>

              </div>

              {/* ================= BIG WISHLIST BUTTON ================= */}
              <button
                onClick={handleWishlist}
                className={`w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold border-2 transition ${
                  isWishlisted
                    ? "bg-red-50 border-red-300 text-red-600 hover:bg-red-100"
                    : "bg-white border-[#E8E1D0] text-gray-700 hover:border-red-300 hover:text-red-500"
                }`}
              >

                <Heart
                  size={20}
                  fill={
                    isWishlisted
                      ? "currentColor"
                      : "none"
                  }
                />

                {isWishlisted
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}

              </button>

              {/* ================= CONTINUE BROWSING ================= */}
              <Link
                to="/menu"
                className="flex items-center justify-center gap-2 w-full mt-3 text-gray-600 hover:text-[#166534] py-2.5 rounded-xl font-semibold transition"
              >

                <ArrowLeft size={18} />

                Continue Browsing

              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default MenuDetails;