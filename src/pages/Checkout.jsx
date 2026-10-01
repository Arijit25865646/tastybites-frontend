import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";

import {
  ArrowLeft,
  ShoppingBag,
  MapPin,
  Phone,
  User,
  CreditCard,
  CheckCircle,
} from "lucide-react";

import api from "../api/axios";

const Checkout = () => {
  const navigate = useNavigate();

  // ================= LOGIN CHECK =================

  const token = Cookies.get("token");

  // ================= CART STATE =================

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(!!token);

  // ================= FORM STATE =================

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  // ================= ORDER LOADING =================

  const [placingOrder, setPlacingOrder] = useState(false);

  // ================= FETCH CART =================

  useEffect(() => {
    const fetchCart = async () => {
      const currentToken = Cookies.get("token");

      if (!currentToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/cart", {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        });

        if (response.data.success) {
          setCartItems(response.data.data || []);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);

        toast.error(
          error.response?.data?.message ||
            "Failed to load cart"
        );

        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= TOTAL =================

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + (item.quantity || 1),
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price) * (item.quantity || 1),
    0
  );

  const deliveryCharge = 0;

  const totalPrice = subtotal + deliveryCharge;

  // ================= PLACE ORDER =================

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const currentToken = Cookies.get("token");

    if (!currentToken) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    // ================= VALIDATE CUSTOMER DETAILS =================

    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    if (!formData.address.trim()) {
      toast.error("Please enter your delivery address");
      return;
    }

    if (!formData.city.trim()) {
      toast.error("Please enter your city");
      return;
    }

    if (!/^[0-9]{6}$/.test(formData.pincode.trim())) {
      toast.error("Please enter a valid 6-digit PIN code");
      return;
    }

    // ================= CHECK CART =================

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Make sure every cart item has a valid MenuItem ID.
    const invalidItem = cartItems.some(
      (item) => !item.menuItem
    );

    if (invalidItem) {
      toast.error("One or more cart items have an invalid ID");
      return;
    }

    try {
      setPlacingOrder(true);

      // ================= PREPARE ORDER ITEMS =================

      const orderItems = cartItems.map((item) => ({
        menuItem: item.menuItem,
        quantity: item.quantity || 1,
      }));

      // ================= CREATE ORDER =================

      const response = await api.post(
        "/orders",
        {
          items: orderItems,
        },
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      if (!response.data.success) {
        toast.error(
          response.data.message || "Failed to place order"
        );
        return;
      }

      // ================= ORDER CREATED =================

      const createdOrder = response.data.data;

      // Keep the latest order temporarily for OrderSuccess.
      localStorage.setItem(
        "lastOrder",
        JSON.stringify(createdOrder)
      );

      // ================= CLEAR MONGODB CART =================

      try {
        await api.delete("/cart", {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        });

        setCartItems([]);

        // Update header cart counter.
        window.dispatchEvent(
          new Event("cartUpdated")
        );
      } catch (clearError) {
        console.error(
          "Order created, but cart clearing failed:",
          clearError
        );

        toast.error(
          "Order placed, but your cart could not be cleared. Please refresh your cart."
        );
      }

      // ================= SUCCESS =================

      toast.success(
        response.data.message ||
          "Order placed successfully!"
      );

      navigate("/order-success");

    } catch (error) {
      console.error("Place Order Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to place order"
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  // ================= LOGIN REQUIRED =================

  if (!token) {
    return (
      <div className="min-h-screen bg-[#FFFCF2] flex items-center justify-center px-6">

        <div className="bg-white border border-[#E8E1D0] rounded-3xl shadow-md p-10 max-w-md text-center">

          <div className="w-20 h-20 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag
              size={38}
              className="text-[#166534]"
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mt-6">
            Please Login
          </h1>

          <p className="text-gray-500 mt-3">
            You need to login before proceeding to checkout.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-2 mt-7 bg-[#166534] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#14532D] transition"
          >
            Login
          </button>

        </div>

      </div>
    );
  }

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">

        <div className="text-center">

          <div className="w-10 h-10 border-4 border-[#166534] border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="text-gray-500 mt-4">
            Loading checkout...
          </p>

        </div>

      </div>
    );
  }

  // ================= EMPTY CART =================

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFCF2] flex items-center justify-center px-6">

        <div className="text-center">

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
            Add some delicious dishes before checking out.
          </p>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 mt-7 bg-[#166534] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#14532D] transition"
          >
            <ArrowLeft size={18} />
            Explore Menu
          </Link>

        </div>

      </div>
    );
  }

  // ================= CHECKOUT PAGE =================

  return (
    <div className="min-h-screen bg-[#FFFCF2] px-6 py-12">

      <div className="max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#166534] font-semibold transition"
          >
            <ArrowLeft size={18} />
            Back to Cart
          </Link>

          <p className="text-[#166534] font-bold tracking-widest text-sm uppercase mt-7">
            TastyBites
          </p>

          <h1 className="text-4xl font-extrabold text-gray-900 mt-1">
            Checkout
          </h1>

          <p className="text-gray-500 mt-2">
            Complete your details to place your order.
          </p>

        </div>

        {/* ================= MAIN ================= */}

        <form onSubmit={handlePlaceOrder}>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ================= CUSTOMER DETAILS ================= */}

            <div className="lg:col-span-2 space-y-6">

              {/* Delivery Details */}

              <div className="bg-white border border-[#E8E1D0] rounded-2xl shadow-sm p-7">

                <div className="flex items-center gap-3 mb-6">

                  <div className="w-11 h-11 rounded-xl bg-[#ECFDF5] flex items-center justify-center">
                    <MapPin
                      size={21}
                      className="text-[#166534]"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Delivery Details
                    </h2>

                    <p className="text-sm text-gray-500">
                      Where should we deliver your order?
                    </p>
                  </div>

                </div>

                {/* Name + Phone */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>

                    <div className="relative">

                      <User
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full pl-10 pr-4 py-3 border border-[#E8E1D0] rounded-xl outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10"
                      />

                    </div>

                  </div>

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>

                    <div className="relative">

                      <Phone
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter 10-digit phone number"
                        maxLength={10}
                        className="w-full pl-10 pr-4 py-3 border border-[#E8E1D0] rounded-xl outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10"
                      />

                    </div>

                  </div>

                </div>

                {/* Address */}

                <div className="mt-5">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Delivery Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="4"
                    placeholder="House number, street, area..."
                    className="w-full px-4 py-3 border border-[#E8E1D0] rounded-xl outline-none resize-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10"
                  />

                </div>

                {/* City + PIN */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      className="w-full px-4 py-3 border border-[#E8E1D0] rounded-xl outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10"
                    />

                  </div>

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      PIN Code
                    </label>

                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="Enter 6-digit PIN code"
                      maxLength={6}
                      className="w-full px-4 py-3 border border-[#E8E1D0] rounded-xl outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10"
                    />

                  </div>

                </div>

              </div>

              {/* ================= PAYMENT ================= */}

              <div className="bg-white border border-[#E8E1D0] rounded-2xl shadow-sm p-7">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-[#ECFDF5] flex items-center justify-center">
                    <CreditCard
                      size={21}
                      className="text-[#166534]"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Payment Method
                    </h2>

                    <p className="text-sm text-gray-500">
                      Payment integration will be added later.
                    </p>
                  </div>

                </div>

                <div className="mt-6 border border-[#E8E1D0] rounded-xl p-4 bg-[#FFFCF2]">

                  <div className="flex items-center gap-3">

                    <CheckCircle
                      size={20}
                      className="text-[#166534]"
                    />

                    <div>
                      <p className="font-semibold text-gray-900">
                        Cash on Delivery
                      </p>

                      <p className="text-sm text-gray-500">
                        Pay when your order arrives.
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* ================= ORDER SUMMARY ================= */}

            <div>

              <div className="bg-white border border-[#E8E1D0] rounded-2xl shadow-md p-6 sticky top-28">

                <h2 className="text-2xl font-bold text-gray-900">
                  Order Summary
                </h2>

                {/* Items */}

                <div className="mt-6 space-y-4">

                  {cartItems.map((item) => (

                    <div
                      key={item.menuItem}
                      className="flex items-center gap-3"
                    >

                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">

                        <img
                          src={
                            typeof item.image === "string"
                              ? item.image
                              : item.image?.url
                          }
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />

                      </div>

                      <div className="flex-1 min-w-0">

                        <p className="font-semibold text-gray-900 truncate">
                          {item.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity || 1}
                        </p>

                      </div>

                      <p className="font-bold text-gray-900">
                        ₹
                        {Number(item.price) *
                          (item.quantity || 1)}
                      </p>

                    </div>

                  ))}

                </div>

                <div className="border-t border-[#E8E1D0] my-6" />

                <div className="flex justify-between text-gray-600">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex justify-between text-gray-600 mt-3">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-gray-600 mt-3">
                  <span>Delivery</span>

                  <span className="text-[#166534] font-semibold">
                    Free
                  </span>
                </div>

                <div className="border-t border-[#E8E1D0] my-5" />

                <div className="flex justify-between items-center">

                  <span className="text-lg font-bold text-gray-900">
                    Total
                  </span>

                  <span className="text-2xl font-extrabold text-[#166534]">
                    ₹{totalPrice}
                  </span>

                </div>

                <button
                  type="submit"
                  disabled={placingOrder}
                  className={`w-full mt-6 text-white py-3.5 rounded-xl font-semibold transition shadow-sm ${
                    placingOrder
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#166534] hover:bg-[#14532D]"
                  }`}
                >
                  {placingOrder
                    ? "Placing Order..."
                    : "Place Order"}
                </button>

                <Link
                  to="/cart"
                  className="flex items-center justify-center gap-2 w-full mt-3 border border-[#166534] text-[#166534] py-3 rounded-xl font-semibold hover:bg-[#ECFDF5] transition"
                >
                  <ArrowLeft size={18} />
                  Back to Cart
                </Link>

              </div>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
};

export default Checkout;
