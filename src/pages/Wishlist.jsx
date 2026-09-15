import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";

import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Trash2,
  ShoppingBag,
  Utensils,
} from "lucide-react";

const Wishlist = () => {
  const navigate = useNavigate();

  // =====================================================
  // CHECK LOGIN
  // =====================================================

  const token = Cookies.get("token");

  // =====================================================
  // WISHLIST STATE
  // =====================================================

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch {
      return [];
    }
  });

  // =====================================================
  // SAVE WISHLIST
  // =====================================================

  const saveWishlist = (updatedWishlist) => {
    setWishlistItems(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

     // Notify Navbar that wishlist changed
  window.dispatchEvent(new Event("wishlistUpdated"));
};
  

  // =====================================================
  // REMOVE FROM WISHLIST
  // =====================================================

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlistItems.filter(
      (item) => item._id !== id
    );

    saveWishlist(updatedWishlist);

    toast.success("Removed from wishlist");
  };

  // =====================================================
  // ADD TO CART
  // =====================================================

  const addToCart = (item) => {
    try {
      // Get existing cart
      const existingCart =
        JSON.parse(localStorage.getItem("cart")) || [];

      // Check if item already exists
      const existingItem = existingCart.find(
        (cartItem) => cartItem._id === item._id
      );

      let updatedCart;

      // =================================================
      // ITEM ALREADY IN CART
      // =================================================

      if (existingItem) {
        updatedCart = existingCart.map((cartItem) =>
          cartItem._id === item._id
            ? {
                ...cartItem,
                quantity: (cartItem.quantity || 1) + 1,
              }
            : cartItem
        );
      }

      // =================================================
      // NEW ITEM
      // =================================================

      else {
        updatedCart = [
          ...existingCart,
          {
            ...item,
            quantity: 1,
          },
        ];
      }

      // =================================================
      // SAVE CART
      // =================================================

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

      // Notify Navbar / other components
      window.dispatchEvent(new Event("cartUpdated"));

      toast.success(`${item.name} added to cart`);

    } catch (error) {
      console.error("Add to cart error:", error);

      toast.error("Failed to add item to cart");
    }
  };

  // =====================================================
  // MOVE TO CART
  // =====================================================

  const moveToCart = (item) => {
    try {
      // Add item to cart
      addToCart(item);

      // Remove item from wishlist
      const updatedWishlist = wishlistItems.filter(
        (wishlistItem) =>
          wishlistItem._id !== item._id
      );

      saveWishlist(updatedWishlist);

      toast.success(`${item.name} moved to cart`);

    } catch (error) {
      console.error("Move to cart error:", error);

      toast.error("Failed to move item to cart");
    }
  };

  // =====================================================
  // CLEAR WISHLIST
  // =====================================================

  const clearWishlist = () => {
    saveWishlist([]);

    toast.success("Wishlist cleared");
  };

  // =====================================================
  // GET IMAGE URL
  // =====================================================

  const getImageUrl = (item) => {
    if (typeof item.image === "string") {
      return item.image;
    }

    return item.image?.url || "";
  };

  // =====================================================
  // LOGIN CHECK
  // =====================================================

  if (!token) {
    return (
      <div className="min-h-screen bg-[#FFFCF2] flex items-center justify-center px-6">

        <div className="text-center bg-white border border-[#E8E1D0] rounded-3xl shadow-md p-10 max-w-md">

          {/* Icon */}

          <div className="w-20 h-20 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto">

            <Heart
              size={38}
              className="text-[#166534]"
            />

          </div>

          {/* Heading */}

          <h1 className="text-2xl font-bold text-gray-900 mt-6">
            Please Login
          </h1>

          {/* Message */}

          <p className="text-gray-500 mt-3">
            You need to login to view your wishlist.
          </p>

          {/* Login Button */}

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

  // =====================================================
  // EMPTY WISHLIST
  // =====================================================

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
              Save your favorite dishes here and enjoy them later.
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

  // =====================================================
  // WISHLIST PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-[#FFFCF2] px-6 py-12">

      <div className="max-w-6xl mx-auto">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

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

          {/* Clear Wishlist */}

          <button
            onClick={clearWishlist}
            className="self-start sm:self-auto inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition"
          >

            <Trash2 size={18} />

            Clear Wishlist

          </button>

        </div>


        {/* =================================================
            WISHLIST ITEMS
        ================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

          {wishlistItems.map((item) => (

            <div
              key={item._id}
              className="bg-white border border-[#E8E1D0] rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition"
            >

              {/* =================================================
                  IMAGE
              ================================================= */}

              <div className="relative h-56 bg-gray-100">

                {getImageUrl(item) ? (

                  <img
                    src={getImageUrl(item)}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />

                ) : (

                  <div className="w-full h-full flex items-center justify-center">

                    <Utensils
                      size={40}
                      className="text-gray-400"
                    />

                  </div>

                )}

                {/* Wishlist Button */}

                <button
                  onClick={() =>
                    removeFromWishlist(item._id)
                  }
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-red-600 hover:bg-red-50 transition"
                  title="Remove from wishlist"
                >

                  <Heart
                    size={20}
                    fill="currentColor"
                  />

                </button>

                {/* Category */}

                <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-[#166534] px-3 py-1.5 rounded-full text-sm font-bold shadow-sm">

                  {item.category}

                </span>

              </div>


              {/* =================================================
                  CONTENT
              ================================================= */}

              <div className="p-5">

                <h2 className="text-xl font-bold text-gray-900">
                  {item.name}
                </h2>

                {/* Price */}

                <p className="text-[#166534] font-bold text-lg mt-2">
                  ₹{item.price}
                </p>

                {/* Description */}

                {item.description && (
                  <p className="text-gray-500 text-sm mt-3 line-clamp-2">
                    {item.description}
                  </p>
                )}


                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div className="grid grid-cols-2 gap-3 mt-5">

                  {/* View Details */}

                  <Link
                    to={`/menu/${item._id}`}
                    className="flex items-center justify-center gap-2 border border-[#166534] text-[#166534] py-2.5 rounded-lg font-semibold hover:bg-[#ECFDF5] transition"
                  >

                    <Utensils size={17} />

                    Details

                  </Link>


                  {/* Add To Cart */}

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


                {/* =================================================
                    MOVE TO CART
                ================================================= */}

                {item.availability && (

                  <button
                    onClick={() => moveToCart(item)}
                    className="w-full mt-3 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition"
                  >

                    <ShoppingBag size={17} />

                    Move to Cart

                  </button>

                )}

              </div>

            </div>

          ))}

        </div>


        {/* =================================================
            CONTINUE SHOPPING
        ================================================= */}

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