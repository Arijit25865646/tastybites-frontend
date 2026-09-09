import { Link } from "react-router-dom";

const MenuCard = ({ item }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">

      {/* Image */}
      <div className="h-56 w-full bg-gray-200">
        <img
          src={item.image?.url}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5">

        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-gray-900">
            {item.name}
          </h2>

          <span className="text-lg font-bold text-red-600">
            ₹{item.price}
          </span>
        </div>

        <p className="text-gray-600 mb-5">
          {item.description}
        </p>

        <Link
          to={`/menu/${item._id}`}
          className="block w-full text-center bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          View Details
        </Link>

      </div>
    </div>
  );
};

export default MenuCard;