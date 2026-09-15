import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";

import {
  ArrowLeft,
  ShoppingBag,
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";

import api from "../api/axios";

const Orders = () => {
  const navigate = useNavigate();

  // =====================================================
  // LOGIN
  // =====================================================

  const token = Cookies.get("token");

  // =====================================================
  // ORDERS STATE
  // =====================================================

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH ORDERS
  // =====================================================

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setOrders(response.data.data);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load your orders"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  // =====================================================
  // ORDER STATUS ICON
  // =====================================================

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle size={18} />;

      case "Preparing":
        return <Clock size={18} />;

      case "Out for Delivery":
        return <Truck size={18} />;

      case "Cancelled":
        return <XCircle size={18} />;

      case "Confirmed":
        return <CheckCircle size={18} />;

      default:
        return <Package size={18} />;
    }
  };

  // =====================================================
  // ORDER STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-[#ECFDF5] text-[#166534]";

      case "Confirmed":
        return "bg-blue-50 text-blue-700";

      case "Preparing":
        return "bg-amber-50 text-amber-700";

      case "Out for Delivery":
        return "bg-purple-50 text-purple-700";

      case "Cancelled":
        return "bg-red-50 text-red-600";

      case "Pending":
        return "bg-gray-100 text-gray-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // =====================================================
  // LOGIN CHECK
  // =====================================================

  if (!token) {
    return (
      <div className="min-h-screen bg-[#FFFCF2] flex items-center justify-center px-6">

        <div className="text-center bg-white border border-[#E8E1D0] rounded-3xl shadow-md p-10 max-w-md">

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
            You need to login to view your orders.
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

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFCF2] flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-[#DDE9E1] border-t-[#166534] rounded-full animate-spin mx-auto"></div>

          <p className="text-gray-600 font-semibold mt-4">
            Loading your orders...
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // EMPTY ORDERS
  // =====================================================

  if (orders.length === 0) {
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

              <Package
                size={38}
                className="text-[#166534]"
              />

            </div>

            <h1 className="text-3xl font-bold text-gray-900 mt-6">
              No Orders Yet
            </h1>

            <p className="text-gray-500 mt-3">
              You haven't placed any orders yet. Explore our menu and
              find something delicious.
            </p>

            <Link
              to="/menu"
              className="inline-flex items-center gap-2 mt-7 bg-[#166534] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#14532D] transition"
            >
              <ShoppingBag size={18} />
              Explore Menu
            </Link>

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // ORDERS PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-[#FFFCF2] px-6 py-12">

      <div className="max-w-6xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>

            <p className="text-[#166534] font-bold tracking-widest text-sm uppercase">
              TastyBites
            </p>

            <h1 className="text-4xl font-extrabold text-gray-900 mt-1">
              My Orders
            </h1>

            <p className="text-gray-500 mt-2">
              View your previous orders and their status.
            </p>

          </div>

          <Link
            to="/menu"
            className="self-start inline-flex items-center gap-2 border border-[#166534] text-[#166534] px-5 py-2.5 rounded-xl font-semibold hover:bg-[#ECFDF5] transition"
          >
            <ShoppingBag size={18} />
            Order More
          </Link>

        </div>


        {/* =================================================
            ORDER LIST
        ================================================= */}

        <div className="space-y-6">

          {orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              getStatusIcon={getStatusIcon}
              getStatusStyle={getStatusStyle}
            />
          ))}

        </div>

      </div>

    </div>
  );
};


// =====================================================
// ORDER CARD
// =====================================================

const OrderCard = ({
  order,
  getStatusIcon,
  getStatusStyle,
}) => {

  const [expanded, setExpanded] = useState(false);

  // =====================================================
  // ORDER DATE
  // =====================================================

  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "Date unavailable";

  // =====================================================
  // TOTAL ITEMS
  // =====================================================

  const totalItems =
    order.items?.reduce(
      (total, item) =>
        total + (item.quantity || 1),
      0
    ) || 0;

  // =====================================================
  // CHECK CANCELLED
  // =====================================================

  const isCancelled = order.status === "Cancelled";

  return (
    <div
      className={`bg-white border rounded-2xl shadow-sm overflow-hidden ${
        isCancelled
          ? "border-red-200"
          : "border-[#E8E1D0]"
      }`}
    >

      {/* =================================================
          ORDER HEADER
      ================================================= */}

      <div
        className={`p-5 md:p-6 ${
          isCancelled
            ? "bg-red-50/40"
            : ""
        }`}
      >

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          {/* Order Information */}

          <div>

            <div className="flex items-center gap-3">

              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  isCancelled
                    ? "bg-red-100"
                    : "bg-[#ECFDF5]"
                }`}
              >

                {isCancelled ? (
                  <XCircle
                    size={21}
                    className="text-red-600"
                  />
                ) : (
                  <Package
                    size={21}
                    className="text-[#166534]"
                  />
                )}

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Order ID
                </p>

                <p className="font-bold text-gray-900 break-all">
                  #{order._id}
                </p>

              </div>

            </div>

            <p className="text-sm text-gray-500 mt-3">
              Placed on {orderDate}
            </p>

          </div>


          {/* =================================================
              STATUS
          ================================================= */}

          <div
            className={`inline-flex items-center gap-2 self-start md:self-auto px-4 py-2 rounded-full font-semibold text-sm ${getStatusStyle(
              order.status
            )}`}
          >

            {getStatusIcon(order.status)}

            {order.status || "Pending"}

          </div>

        </div>


        {/* =================================================
            CANCELLED MESSAGE
        ================================================= */}

        {isCancelled && (
          <div className="mt-5 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">

            <AlertCircle
              size={20}
              className="text-red-600 flex-shrink-0 mt-0.5"
            />

            <div>

              <p className="font-bold text-red-700">
                Order Cancelled
              </p>

              <p className="text-sm text-red-600 mt-1">
                This order has been cancelled and will not be
                processed or delivered.
              </p>

            </div>

          </div>
        )}


        {/* =================================================
            SUMMARY
        ================================================= */}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-5 border-t border-[#E8E1D0]">

          {/* Items */}

          <div>

            <p className="text-sm text-gray-500">
              Items
            </p>

            <p className="font-bold text-gray-900 mt-1">
              {totalItems}
            </p>

          </div>


          {/* Total */}

          <div>

            <p className="text-sm text-gray-500">
              Total
            </p>

            <p
              className={`font-bold mt-1 ${
                isCancelled
                  ? "text-gray-500"
                  : "text-[#166534]"
              }`}
            >
              ₹{order.totalAmount || 0}
            </p>

          </div>


          {/* View Details */}

          <div className="col-span-2 md:col-span-1">

            <button
              onClick={() =>
                setExpanded(!expanded)
              }
              className={`flex items-center gap-2 font-semibold transition ${
                isCancelled
                  ? "text-red-600 hover:text-red-700"
                  : "text-[#166534] hover:text-[#14532D]"
              }`}
            >

              {expanded ? (
                <>
                  Hide Details
                  <ChevronUp size={18} />
                </>
              ) : (
                <>
                  View Details
                  <ChevronDown size={18} />
                </>
              )}

            </button>

          </div>

        </div>

      </div>


      {/* =================================================
          ORDER DETAILS
      ================================================= */}

      {expanded && (
        <div
          className={`border-t p-5 md:p-6 ${
            isCancelled
              ? "border-red-200 bg-red-50/30"
              : "border-[#E8E1D0] bg-[#FFFCF2]"
          }`}
        >

          <h3 className="font-bold text-gray-900 mb-4">
            Order Items
          </h3>

          <div className="space-y-4">

            {order.items?.map((item, index) => (

              <div
                key={
                  item._id ||
                  `${item.menuItem}-${index}`
                }
                className={`flex items-center gap-4 bg-white border rounded-xl p-3 ${
                  isCancelled
                    ? "border-red-200"
                    : "border-[#E8E1D0]"
                }`}
              >

                {/* =================================================
                    IMAGE
                ================================================= */}

                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">

                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`w-full h-full object-cover ${
                        isCancelled
                          ? "grayscale opacity-70"
                          : ""
                      }`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Package size={24} />
                    </div>
                  )}

                </div>


                {/* =================================================
                    DETAILS
                ================================================= */}

                <div className="flex-1">

                  <p
                    className={`font-bold ${
                      isCancelled
                        ? "text-gray-500"
                        : "text-gray-900"
                    }`}
                  >
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    ₹{item.price} ×{" "}
                    {item.quantity || 1}
                  </p>

                </div>


                {/* =================================================
                    ITEM TOTAL
                ================================================= */}

                <p
                  className={`font-bold ${
                    isCancelled
                      ? "text-gray-500"
                      : "text-gray-900"
                  }`}
                >
                  ₹
                  {Number(item.price) *
                    (item.quantity || 1)}
                </p>

              </div>

            ))}

          </div>


          {/* =================================================
              CANCELLED NOTICE INSIDE DETAILS
          ================================================= */}

          {isCancelled && (
            <div className="mt-5 flex items-center gap-2 text-sm text-red-600 font-semibold">

              <XCircle size={17} />

              <span>
                This order is cancelled and cannot be processed.
              </span>

            </div>
          )}


          {/* =================================================
              TOTAL
          ================================================= */}

          <div className="flex justify-between items-center mt-6 pt-5 border-t border-[#E8E1D0]">

            <p className="font-semibold text-gray-700">
              Order Total
            </p>

            <p
              className={`text-xl font-extrabold ${
                isCancelled
                  ? "text-gray-500"
                  : "text-[#166534]"
              }`}
            >
              ₹{order.totalAmount || 0}
            </p>

          </div>

        </div>
      )}

    </div>
  );
};

export default Orders;