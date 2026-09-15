import { Link } from "react-router-dom";
import { Eye, Utensils } from "lucide-react";

const MenuCard = ({ item }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#E8E1D0] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

      {/* ================= IMAGE ================= */}
      <div className="relative h-60 w-full overflow-hidden bg-[#F3F7ED]">

        <img
          src={item.image?.url}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 bg-[#FFFCF2]/95 backdrop-blur-sm text-[#166534] px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
            <Utensils size={14} />
            {item.category}
          </span>
        </div>

        {/* Availability Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
              item.availability
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {item.availability ? "Available" : "Unavailable"}
          </span>
        </div>

      </div>


      {/* ================= CONTENT ================= */}
      <div className="p-5">

        {/* Name + Price */}
        <div className="flex items-start justify-between gap-4 mb-3">

          <h2 className="text-xl font-bold text-gray-900 leading-snug">
            {item.name}
          </h2>

          <span className="text-xl font-extrabold text-[#166534] whitespace-nowrap">
            ₹{item.price}
          </span>

        </div>


        {/* Small separator */}
        <div className="w-10 h-1 bg-[#166534] rounded-full mb-5" />


        {/* View Details */}
        <Link
          to={`/menu/${item._id}`}
          className="w-full flex items-center justify-center gap-2 bg-[#166534] text-white py-3 rounded-xl font-semibold hover:bg-[#14532D] transition-all duration-200"
        >
          <Eye size={18} />
          View Details
        </Link>

      </div>

    </div>
  );
};

export default MenuCard;