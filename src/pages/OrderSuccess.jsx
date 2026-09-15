import { Link, useLocation } from "react-router-dom";
import {
  CheckCircle,
  ShoppingBag,
  Home,
  Package,
} from "lucide-react";

const OrderSuccess = () => {
  const location = useLocation();

  // Get order data sent from Checkout page
  const order = location.state?.order;

  return (
    <div className="min-h-screen bg-[#FFFCF2] px-6 py-16 flex items-center justify-center">

      <div className="w-full max-w-2xl">

        {/* ================= SUCCESS CARD ================= */}

        <div className="bg-white border border-[#E8E1D0] rounded-3xl shadow-lg p-8 md:p-12 text-center">

          {/* ================= SUCCESS ICON ================= */}

          <div className="w-24 h-24 rounded-full bg-[#ECFDF5] flex items-center justify-center mx-auto">

            <CheckCircle
              size={52}
              className="text-[#166534]"
            />

          </div>


          {/* ================= HEADING ================= */}

          <p className="text-[#166534] font-bold tracking-widest text-sm uppercase mt-7">
            TastyBites
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
            Order Successful!
          </h1>


          {/* ================= MESSAGE ================= */}

          <p className="text-gray-600 text-lg leading-relaxed max-w-lg mx-auto mt-5">
            Thank you for ordering from TastyBites. Your order has been
            successfully placed and is being prepared with care.
          </p>


          {/* ================= ORDER ID ================= */}

          {order?._id && (
            <div className="mt-6 bg-gray-50 border border-[#E8E1D0] rounded-2xl p-4">

              <div className="flex items-center justify-center gap-2">

                <Package
                  size={20}
                  className="text-[#166534]"
                />

                <span className="text-sm font-semibold text-gray-600">
                  Order ID
                </span>

              </div>

              <p className="font-bold text-gray-900 mt-2 break-all">
                #{order._id}
              </p>

            </div>
          )}


          {/* ================= ORDER STATUS ================= */}

          <div className="mt-8 bg-[#F3F7ED] border border-[#D9EAD3] rounded-2xl p-5">

            <div className="flex items-center justify-center gap-2">

              <CheckCircle
                size={20}
                className="text-[#166534]"
              />

              <span className="font-bold text-[#166534]">
                Order Confirmed
              </span>

            </div>

            <p className="text-sm text-gray-500 mt-2">
              We'll make sure your food is prepared fresh and delivered
              with care.
            </p>

          </div>


          {/* ================= BUTTONS ================= */}

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-9">

            {/* Continue Shopping */}

            <Link
              to="/menu"
              className="inline-flex items-center justify-center gap-2 bg-[#166534] text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-[#14532D] transition shadow-sm"
            >
              <ShoppingBag size={19} />
              Continue Shopping
            </Link>


            {/* Home */}

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 border border-[#166534] text-[#166534] px-7 py-3.5 rounded-xl font-semibold hover:bg-[#ECFDF5] transition"
            >
              <Home size={19} />
              Back to Home
            </Link>

          </div>

        </div>


        {/* ================= BOTTOM MESSAGE ================= */}

        <p className="text-center text-gray-500 text-sm mt-6">
          Thank you for choosing TastyBites ❤️
        </p>

      </div>

    </div>
  );
};

export default OrderSuccess;