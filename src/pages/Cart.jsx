import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Utensils,
} from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();

  // ================= CHECK LOGIN =================

  const token = Cookies.get("token");

  // ================= CART STATE =================

  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  // ================= SAVE CART =================

  const saveCart = (updatedCart) => {
    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    // Notify Navbar / other components
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ================= UPDATE QUANTITY =================

  const updateCart = (id, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity: newQuantity,
          }
        : item
    );

    saveCart(updatedCart);
  };

  // ================= REMOVE ITEM =================

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item._id !== id
    );

    saveCart(updatedCart);

    toast.success("Item removed from cart");
  };

  // ================= CLEAR CART =================

  const clearCart = () => {
    saveCart([]);

    toast.success("Cart cleared");
  };

  // ================= TOTAL ITEMS =================

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + (item.quantity || 1),
    0
  );

  // ================= TOTAL PRICE =================

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        (item.quantity || 1),
    0
  );

  // =================================================
  // LOGIN CHECK
  // =================================================

  if (!token) {
    return (
      <div className="min-h-screen bg-[#FFFCF2] flex items-center justify-center px-6">

        <div className="text-center bg-white border border-[#E8E1D0] rounded-3xl shadow-md p-10 max-w-md">

          <div className="w-20 h-20 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto">

            <ShoppingCart
              size={38}
              className="text-[#166534]"
            />

          </div>

          <h1 className="text-2xl font-bold text-gray-900 mt-6">
            Please Login
          </h1>

          <p className="text-gray-500 mt-3">
            You need to login to view your shopping cart.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-2 mt-7 bg-[#166534] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#14532D] transition"
          >
            <ShoppingCart size={18} />
            Login
          </button>

        </div>

      </div>
    );
  }

  // =================================================
  // EMPTY CART
  // =================================================

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFCF2] px-6 py-12">

        <div className="max-w-5xl mx-auto">

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#166534] font-semibold transition"
          >
            <ArrowLeft size={18} />
            Back to Menu
          </Link>

          <div className="bg-white border border-[#E8E1D0] rounded-3xl shadow-md mt-8 py-20 px-6 text-center">

            <div className="w-20 h-20 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto">

              <ShoppingBag
                size={38}
                className="text-[#166534]"
              />

            </div>

            <h1 className="text-3xl font-bold text-gray-900 mt-6">
              Your Cart is Empty
            </h1>

            <p className="text-gray-500 mt-3">
              Looks like you haven't added anything to your cart yet.
            </p>

            <Link
              to="/menu"
              className="inline-flex items-center gap-2 mt-7 bg-[#166534] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#14532D] transition"
            >
              <ShoppingCart size={18} />
              Explore Menu
            </Link>

          </div>

        </div>

      </div>
    );
  }

  // =================================================
  // CART PAGE
  // =================================================

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
              Your Cart
            </h1>

            <p className="text-gray-500 mt-2">
              {totalItems}{" "}
              {totalItems === 1
                ? "item"
                : "items"}{" "}
              in your cart
            </p>

          </div>

          {/* Clear Cart */}

          <button
            onClick={clearCart}
            className="self-start sm:self-auto inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition"
          >
            <Trash2 size={18} />
            Clear Cart
          </button>

        </div>


        {/* ================= MAIN CONTENT ================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ================= CART ITEMS ================= */}

          <div className="lg:col-span-2 space-y-5">

            {cartItems.map((item) => (

              <div
                key={item._id}
                className="bg-white border border-[#E8E1D0] rounded-2xl shadow-sm p-5"
              >

                <div className="flex gap-5">

                  {/* ================= FOOD IMAGE ================= */}

                  <div className="w-28 h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">

                    {item.image ? (
                      <img
                        src={
                          typeof item.image === "string"
                            ? item.image
                            : item.image?.url
                        }
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#ECFDF5]">
                        <Utensils
                          size={30}
                          className="text-[#166534]"
                        />
                      </div>
                    )}

                  </div>


                  {/* ================= ITEM DETAILS ================= */}

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <div>

                        <h2 className="text-xl font-bold text-gray-900">
                          {item.name}
                        </h2>

                        <p className="text-sm text-[#166534] font-semibold mt-1">
                          {item.category}
                        </p>

                      </div>


                      {/* Remove */}

                      <button
                        onClick={() =>
                          removeItem(item._id)
                        }
                        className="text-gray-400 hover:text-red-600 transition"
                        title="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>

                    </div>


                    {/* ================= PRICE ================= */}

                    <p className="text-lg font-bold text-[#166534] mt-3">
                      ₹{item.price}
                    </p>


                    {/* ================= QUANTITY + TOTAL ================= */}

                    <div className="flex items-center justify-between mt-4">

                      {/* Quantity Controls */}

                      <div className="flex items-center border border-[#E8E1D0] rounded-lg overflow-hidden">

                        <button
                          onClick={() =>
                            updateCart(
                              item._id,
                              (item.quantity || 1) - 1
                            )
                          }
                          disabled={
                            (item.quantity || 1) <= 1
                          }
                          className={`w-9 h-9 flex items-center justify-center text-gray-700 transition ${
                            (item.quantity || 1) <= 1
                              ? "opacity-40 cursor-not-allowed"
                              : "hover:bg-[#ECFDF5]"
                          }`}
                        >
                          <Minus size={16} />
                        </button>

                        <span className="w-10 text-center font-semibold">
                          {item.quantity || 1}
                        </span>

                        <button
                          onClick={() =>
                            updateCart(
                              item._id,
                              (item.quantity || 1) + 1
                            )
                          }
                          className="w-9 h-9 flex items-center justify-center hover:bg-[#ECFDF5] text-gray-700 transition"
                        >
                          <Plus size={16} />
                        </button>

                      </div>


                      {/* Item Total */}

                      <p className="font-bold text-gray-900">
                        ₹
                        {Number(item.price) *
                          (item.quantity || 1)}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>


          {/* ================= ORDER SUMMARY ================= */}

          <div className="lg:col-span-1">

            <div className="bg-white border border-[#E8E1D0] rounded-2xl shadow-md p-6 sticky top-28">

              <h2 className="text-2xl font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="border-t border-[#E8E1D0] my-5" />


              {/* Items */}

              <div className="flex justify-between text-gray-600">

                <span>
                  Items
                </span>

                <span>
                  {totalItems}
                </span>

              </div>


              {/* Subtotal */}

              <div className="flex justify-between text-gray-600 mt-3">

                <span>
                  Subtotal
                </span>

                <span>
                  ₹{totalPrice}
                </span>

              </div>


              {/* Delivery */}

              <div className="flex justify-between text-gray-600 mt-3">

                <span>
                  Delivery
                </span>

                <span className="text-[#166534] font-semibold">
                  Free
                </span>

              </div>


              <div className="border-t border-[#E8E1D0] my-5" />


              {/* Total */}

              <div className="flex justify-between items-center">

                <span className="text-lg font-bold text-gray-900">
                  Total
                </span>

                <span className="text-2xl font-extrabold text-[#166534]">
                  ₹{totalPrice}
                </span>

              </div>


              {/* Checkout */}

              <Link
                to="/checkout"
                className="flex items-center justify-center w-full mt-6 bg-[#166534] text-white py-3.5 rounded-xl font-semibold hover:bg-[#14532D] transition"
              >
                Proceed to Checkout
              </Link>


              {/* Continue Shopping */}

              <Link
                to="/menu"
                className="flex items-center justify-center gap-2 w-full mt-3 border border-[#166534] text-[#166534] py-3 rounded-xl font-semibold hover:bg-[#ECFDF5] transition"
              >
                <ArrowLeft size={18} />
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cart;