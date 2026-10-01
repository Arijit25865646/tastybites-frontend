import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import api from "../api/axios";

import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Trash2,
  Utensils,
} from "lucide-react";

const Wishlist = () => {
  const navigate = useNavigate();

  // ================= CHECK LOGIN =================

  const token = Cookies.get("token");

  // ================= WISHLIST STATE =================

  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(!!token);

  // ================= FETCH WISHLIST =================

  useEffect(() => {
    const loadWishlist = async () => {
      const currentToken = Cookies.get("token");

      if (!currentToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/wishlist", {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        });

        if (response.data.success) {
          setWishlistItems(response.data.data || []);
        } else {
          setWishlistItems([]);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);

        toast.error(
          error.response?.data?.message ||
            "Failed to load wishlist"
        );

        setWishlistItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, []);

  // ================= REMOVE FROM WISHLIST =================

  const removeFromWishlist = async (menuItemId) => {
    const currentToken = Cookies.get("token");

    if (!currentToken) {
      toast.error("Please login first");
      return;
    }

    if (!menuItemId) {
      toast.error("Invalid menu item");
      return;
    }

    try {
      await api.delete(`/wishlist/${menuItemId}`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      // Remove from current UI
      setWishlistItems((prevItems) =>
        prevItems.filter(
          (item) =>
            String(item.menuItem) !== String(menuItemId)
        )
      );

      // Update header wishlist counter
      window.dispatchEvent(
        new Event("wishlistUpdated")
      );

      toast.success("Removed from wishlist");
    } catch (error) {
      console.error(
        "Failed to remove item from wishlist:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to remove item from wishlist"
      );
    }
  };

  // ================= ADD TO CART =================

  const addToCart = async (item) => {
    const currentToken = Cookies.get("token");

    if (!currentToken) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (!item.menuItem) {
      toast.error("Invalid menu item");
      return;
    }

    try {
      const response = await api.post(
        "/cart",
        {
          menuItem: item.menuItem,
          name: item.name,
          price: item.price,
          category: item.category,
          image: item.image,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      if (response.data.success) {
        // Update header cart counter
        window.dispatchEvent(
          new Event("cartUpdated")
        );

        toast.success(`${item.name} added to cart`);
      } else {
        toast.error(
          response.data.message ||
            "Failed to add item to cart"
        );
      }
    } catch (error) {
      console.error(
        "Failed to add item to cart:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to add item to cart"
      );
    }
  };

  // ================= CLEAR WISHLIST =================

  const clearWishlist = async () => {
    const currentToken = Cookies.get("token");

    if (!currentToken) {
      toast.error("Please login first");
      return;
    }

    try {
      const response = await api.delete("/wishlist", {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (response.data.success) {
        setWishlistItems([]);

        // Update header wishlist counter
        window.dispatchEvent(
          new Event("wishlistUpdated")
        );

        toast.success("Wishlist cleared");
      } else {
        toast.error(
          response.data.message ||
            "Failed to clear wishlist"
        );
      }
    } catch (error) {
      console.error(
        "Failed to clear wishlist:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to clear wishlist"
      );
    }
  };

  // ================= LOGIN CHECK =================

  if (!token) {
    return (
      <div className="min-h-screen bg-[#FFFCF2] flex items-center justify-center px-6">

        <div className="text-center bg-white border border-[#E8E1D0] rounded-3xl shadow-md p-10 max-w-md">

          <div className="w-20 h-20 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto">
            <Heart
              size={38}
              className="text-[#166534]"
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mt-6">
            Please Login
          </h1>

          <p className="text-gray-500 mt-3">
            You need to login to view your wishlist.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-2 mt-7 bg-[#166534] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#14532D] transition"
          >
            <Heart size={18} />
            Login
          </button>

        </div>

      </div>
    );
  }

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFCF2] flex items-center justify-center">

        <div className="text-center">

          <div className="w-10 h-10 border-4 border-[#166534] border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="text-gray-500 mt-4">
            Loading wishlist...
          </p>

        </div>

      </div>
    );
  }

  // ================= EMPTY WISHLIST =================

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFCF2] px-6 py-12">

        <div className="max-w-5xl mx-auto">

          {/* Back to Menu */}

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#166534] font-semibold transition"
          >
            <ArrowLeft size={18} />
            Back to Menu
          </Link>

          {/* Empty Wishlist */}

          <div className="bg-white border border-[#E8E1D0] rounded-3xl shadow-md mt-8 py-20 px-6 text-center">

            <div className="w-20 h-20 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto">

              <Heart
                size={38}
                className="text-[#166534]"
              />

            </div>

            <h1 className="text-3xl font-bold text-gray-900 mt-6">
              Your Wishlist is Empty
            </h1>

            <p className="text-gray-500 mt-3">
              Save your favorite dishes here and enjoy
              them later.
            </p>

            <Link
              to="/menu"
              className="inline-flex items-center gap-2 mt-7 bg-[#166534] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#14532D] transition"
            >
              <Utensils size={18} />
              Explore Menu
            </Link>

          </div>

        </div>

      </div>
    );
  }

  // ================= WISHLIST PAGE =================

  return (
    <div className="min-h-screen bg-[#FFFCF2] px-6 py-12">

      <div className="max-w-6xl mx-auto">

        {/* ================= PAGE HEADER ================= */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>

            <p className="text-[#166534] font-bold tracking-widest text-sm uppercase">
              TastyBites
            </p>

            <h1 className="text-4xl font-extrabold text-gray-900 mt-1">
              My Wishlist
            </h1>

            <p className="text-gray-500 mt-2">
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1
                ? "item"
                : "items"}{" "}
              saved
            </p>

          </div>

          {/* ================= CLEAR WISHLIST ================= */}

          <button
            onClick={clearWishlist}
            className="self-start sm:self-auto inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition"
          >
            <Trash2 size={18} />
            Clear Wishlist
          </button>

        </div>

        {/* ================= WISHLIST ITEMS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

          {wishlistItems.map((item) => (

            <div
              key={item.menuItem}
              className="bg-white border border-[#E8E1D0] rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition"
            >

              {/* ================= IMAGE ================= */}

              <div className="relative h-56 bg-gray-100">

                <img
                  src={item.image?.url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />

                {/* ================= REMOVE HEART ================= */}

                <button
                  onClick={() =>
                    removeFromWishlist(item.menuItem)
                  }
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-red-600 hover:bg-red-50 transition"
                  title="Remove from wishlist"
                >
                  <Heart
                    size={20}
                    fill="currentColor"
                  />
                </button>

                {/* ================= CATEGORY ================= */}

                <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-[#166534] px-3 py-1.5 rounded-full text-sm font-bold shadow-sm">
                  {item.category}
                </span>

              </div>

              {/* ================= CONTENT ================= */}

              <div className="p-5">

                <div className="flex items-start justify-between gap-3">

                  <div>

                    <h2 className="text-xl font-bold text-gray-900">
                      {item.name}
                    </h2>

                    <p className="text-[#166534] font-bold text-lg mt-2">
                      ₹{item.price}
                    </p>

                  </div>

                </div>

                {/* ================= DESCRIPTION ================= */}

                {item.description && (
                  <p className="text-gray-500 text-sm mt-3 line-clamp-2">
                    {item.description}
                  </p>
                )}

                {/* ================= ACTIONS ================= */}

                <div className="grid grid-cols-2 gap-3 mt-5">

                  {/* ================= DETAILS ================= */}

                  <Link
                    to={`/menu/${item.menuItem}`}
                    className="flex items-center justify-center gap-2 border border-[#166534] text-[#166534] py-2.5 rounded-lg font-semibold hover:bg-[#ECFDF5] transition"
                  >
                    <Utensils size={17} />
                    Details
                  </Link>

                  {/* ================= ADD TO CART ================= */}

                  <button
                    onClick={() => addToCart(item)}
                    disabled={!item.availability}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold transition ${
                      item.availability
                        ? "bg-[#166534] text-white hover:bg-[#14532D]"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart size={17} />

                    {item.availability
                      ? "Add to Cart"
                      : "Unavailable"}
                  </button>

                </div>

                {/* ================= REMOVE ITEM ================= */}

                <button
                  onClick={() =>
                    removeFromWishlist(item.menuItem)
                  }
                  className="w-full mt-3 flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2.5 rounded-lg font-semibold hover:bg-red-100 transition"
                >
                  <Trash2 size={17} />
                  Remove Item
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* ================= CONTINUE SHOPPING ================= */}

        <div className="mt-10 text-center">

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 border border-[#166534] text-[#166534] px-7 py-3 rounded-xl font-semibold hover:bg-[#ECFDF5] transition"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Wishlist;