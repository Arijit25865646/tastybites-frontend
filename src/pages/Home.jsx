import { Link } from "react-router-dom";
import MenuCard from "../components/MenuCard";
import menuData from "../data/menuData";

const Home = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-[80vh] bg-orange-50 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <p className="text-red-600 font-semibold text-lg mb-4">
              WELCOME TO TASTYBITES
            </p>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Delicious Food,
              <span className="text-red-600">
                {" "}Made With Love
              </span>
            </h1>

            <p className="text-gray-600 text-lg mt-6 leading-relaxed">
              Enjoy delicious meals prepared with fresh ingredients
              and served with love. Explore our menu and discover
              your new favorite dish.
            </p>

            {/* Explore Menu Button */}
            <Link
              to="/menu"
              className="inline-block mt-8 bg-red-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose TastyBites Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose TastyBites?
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We believe great food brings people together.
            That's why we focus on quality ingredients,
            delicious recipes, and excellent service.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

            {/* Fresh Food */}
            <div className="p-8 rounded-xl bg-orange-50">
              <div className="text-4xl mb-4">
                🍕
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                Fresh Food
              </h3>

              <p className="text-gray-600 mt-3">
                Fresh ingredients are used to prepare
                every delicious meal.
              </p>
            </div>

            {/* Expert Chefs */}
            <div className="p-8 rounded-xl bg-orange-50">
              <div className="text-4xl mb-4">
                👨‍🍳
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                Expert Chefs
              </h3>

              <p className="text-gray-600 mt-3">
                Our dishes are prepared with care
                and attention to detail.
              </p>
            </div>

            {/* Made With Love */}
            <div className="p-8 rounded-xl bg-orange-50">
              <div className="text-4xl mb-4">
                ❤️
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                Made With Love
              </h3>

              <p className="text-gray-600 mt-3">
                Every dish is prepared to give you
                a memorable dining experience.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section Heading */}
          <div className="text-center">

            <p className="text-red-600 font-semibold">
              OUR MENU
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Explore Our Delicious Menu
            </h2>

            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Discover our selection of delicious dishes prepared
              with fresh ingredients and lots of love.
            </p>

          </div>

          {/* Menu Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {menuData.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
              />
            ))}
          </div>

        </div>
      </section>
    </main>
  );
};

export default Home;