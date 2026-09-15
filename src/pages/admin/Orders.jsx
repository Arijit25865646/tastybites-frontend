import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";

import {
  ShoppingBag,
  User,
  Mail,
  Calendar,
  Package,
  Utensils,
  Trash2,
} from "lucide-react";

import api from "../../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // =====================================================
  // FETCH ALL ORDERS
  // =====================================================

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = Cookies.get("token");

        const response = await api.get("/orders", {
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
            "Failed to load orders"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // =====================================================
  // UPDATE ORDER STATUS
  // =====================================================

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);

      const token = Cookies.get("token");

      const response = await api.put(
        `/orders/${orderId}/status`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(
          response.data.message ||
            "Order status updated successfully"
        );

        // Update order in UI
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  status: response.data.data.status,
                }
              : order
          )
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update order status"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // =====================================================
  // DELETE ORDER
  // =====================================================

  const handleDeleteOrder = async (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this order?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(orderId);

      const token = Cookies.get("token");

      const response = await api.delete(
        `/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(
          response.data.message ||
            "Order deleted successfully"
        );

        // Remove order from UI
        setOrders((prevOrders) =>
          prevOrders.filter(
            (order) => order._id !== orderId
          )
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete order"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // STATUS STYLING
  // =====================================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Confirmed":
        return "bg-blue-100 text-blue-700";

      case "Preparing":
        return "bg-orange-100 text-orange-700";

      case "Out for Delivery":
        return "bg-purple-100 text-purple-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-600">
          Loading orders...
        </p>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div>
      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="mb-8">
        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] flex items-center justify-center">
            <ShoppingBag
              size={25}
              className="text-[#166534]"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Orders
            </h1>

            <p className="text-gray-600 mt-1">
              Manage customer orders and update their status.
            </p>
          </div>

        </div>
      </div>


      {/* =================================================
          EMPTY STATE
      ================================================= */}

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E8E1D0] shadow-sm p-12 text-center">

          <Package
            size={45}
            className="mx-auto text-gray-400"
          />

          <h2 className="text-xl font-bold text-gray-800 mt-4">
            No Orders Found
          </h2>

          <p className="text-gray-500 mt-2">
            There are currently no customer orders.
          </p>

        </div>
      ) : (

        /* =================================================
           ORDERS
        ================================================= */

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white rounded-2xl border border-[#E8E1D0] shadow-sm overflow-hidden"
            >

              {/* =================================================
                  ORDER HEADER
              ================================================= */}

              <div className="px-6 py-5 bg-[#FFFCF2] border-b border-[#E8E1D0]">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                  {/* ================= CUSTOMER ================= */}

                  <div>

                    <div className="flex items-center gap-2">

                      <User
                        size={18}
                        className="text-[#166534]"
                      />

                      <h2 className="font-bold text-gray-900">
                        {order.user?.name || "Unknown User"}
                      </h2>

                    </div>

                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">

                      <Mail size={15} />

                      <span>
                        {order.user?.email || "No email"}
                      </span>

                    </div>

                  </div>


                  {/* ================= ORDER INFO ================= */}

                  <div className="flex flex-col sm:flex-row gap-4 sm:items-center">

                    {/* Date + ID */}

                    <div className="text-sm text-gray-500">

                      <div className="flex items-center gap-2">

                        <Calendar size={15} />

                        <span>
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>

                      </div>

                      <p className="text-xs text-gray-400 mt-1">
                        Order ID: {order._id}
                      </p>

                    </div>


                    {/* ================= STATUS ================= */}

                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value
                        )
                      }
                      disabled={
                        updatingId === order._id ||
                        order.status === "Cancelled" ||
                        order.status === "Delivered"
                      }
                      className={`px-4 py-2 rounded-lg text-sm font-semibold border-none outline-none ${getStatusClass(
                        order.status
                      )} ${
                        updatingId === order._id ||
                        order.status === "Cancelled" ||
                        order.status === "Delivered"
                          ? "opacity-60 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Confirmed">
                        Confirmed
                      </option>

                      <option value="Preparing">
                        Preparing
                      </option>

                      <option value="Out for Delivery">
                        Out for Delivery
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>


                    {/* ================= DELETE BUTTON ================= */}

                    <button
                      onClick={() =>
                        handleDeleteOrder(order._id)
                      }
                      disabled={
                        deletingId === order._id
                      }
                      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-red-200 text-red-600 bg-white hover:bg-red-50 transition ${
                        deletingId === order._id
                          ? "opacity-60 cursor-not-allowed"
                          : ""
                      }`}
                    >

                      <Trash2 size={16} />

                      {deletingId === order._id
                        ? "Deleting..."
                        : "Delete"}

                    </button>

                  </div>

                </div>

              </div>


              {/* =================================================
                  CANCELLED MESSAGE
              ================================================= */}

              {order.status === "Cancelled" && (
                <div className="mx-6 mt-5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">

                  <p className="text-sm font-semibold text-red-700">
                    This order has been cancelled.
                  </p>

                  <p className="text-xs text-red-600 mt-1">
                    The customer will see this order as
                    cancelled in their order history.
                  </p>

                </div>
              )}


              {/* =================================================
                  ORDER ITEMS
              ================================================= */}

              <div className="p-6">

                <h3 className="font-bold text-gray-900 mb-4">
                  Ordered Items
                </h3>


                <div className="space-y-4">

                  {order.items?.map((item, index) => (

                    <div
                      key={item._id || index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#E8E1D0] rounded-xl p-4"
                    >

                      {/* ================= ITEM ================= */}

                      <div className="flex items-center gap-4">

                        {item.image ? (

                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-xl"
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                          />

                        ) : (

                          <div className="w-16 h-16 rounded-xl bg-[#ECFDF5] flex items-center justify-center">

                            <Utensils
                              size={24}
                              className="text-[#166534]"
                            />

                          </div>

                        )}

                        <div>

                          <p className="font-semibold text-gray-900">
                            {item.name}
                          </p>

                          <p className="text-sm text-gray-500 mt-1">
                            ₹{item.price} ×{" "}
                            {item.quantity}
                          </p>

                        </div>

                      </div>


                      {/* ================= ITEM TOTAL ================= */}

                      <p className="font-bold text-gray-900">

                        ₹
                        {Number(item.price) *
                          Number(item.quantity)}

                      </p>

                    </div>

                  ))}

                </div>


                {/* =================================================
                    TOTAL
                ================================================= */}

                <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#E8E1D0]">

                  <span className="text-gray-600 font-medium">
                    Total Amount
                  </span>

                  <span className="text-2xl font-extrabold text-[#166534]">
                    ₹{order.totalAmount}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default Orders;