import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChefHat,
  Heart,
  Leaf,
  Star,
  Quote,
} from "lucide-react";

import heroFood from "../assets/hero-food.jpg";

const Home = () => {
  // ================= CUSTOMER REVIEWS =================
  const reviews = [
    {
      name: "Rahul",
      role: "Happy Customer",
      rating: 5,
      review:
        "The food was absolutely delicious! Everything tasted fresh and the presentation was amazing. Definitely coming back again.",
    },
    {
      name: "Priya",
      role: "Food Lover",
      rating: 5,
      review:
        "TastyBites has become one of my favorite places to order from. Great taste, fresh ingredients and a wonderful experience.",
    },
    {
      name: "Arjun",
      role: "Regular Customer",
      rating: 5,
      review:
        "Loved the authentic flavors and the quality of the food. The menu has something for everyone. Highly recommended!",
    },
  ];

  return (
    <main className="bg-[#FFFCF2]">

      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section
        className="relative min-h-[650px] md:min-h-[720px] flex items-center overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroFood})`,
        }}
      >

        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Soft Theme Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-24">

          <div className="max-w-3xl">

            {/* Rating Badge */}
            <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/30 mb-6">

              <Star
                size={16}
                className="text-[#D99A2B] fill-[#D99A2B]"
              />

              <span className="text-sm font-semibold text-gray-800">
                Fresh Food • Great Taste
              </span>

            </div>


            {/* Small Heading */}
            <p className="text-[#D9EAD3] font-bold tracking-widest text-sm uppercase mb-4">
              Welcome to TastyBites
            </p>


            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-white leading-[1.05]">

              Delicious Food,

              <span className="block text-[#D99A2B] mt-2">
                Made With Love.
              </span>

            </h1>


            {/* Description */}
            <p className="text-gray-200 text-lg md:text-xl mt-7 max-w-2xl leading-relaxed">
              Discover delicious meals prepared with fresh ingredients,
              authentic flavors, and a passion for great food.
            </p>


            {/* CTA BUTTON */}
            <div className="mt-9">

              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-[#166534] text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-[#14532D] transition shadow-xl"
              >
                Explore Our Menu
                <ArrowRight size={19} />
              </Link>

            </div>


            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/30">

              <div>
                <p className="text-2xl font-bold text-white">
                  30+
                </p>

                <p className="text-sm text-gray-300 mt-1">
                  Delicious Dishes
                </p>
              </div>


              <div>
                <p className="text-2xl font-bold text-white">
                  100%
                </p>

                <p className="text-sm text-gray-300 mt-1">
                  Fresh Ingredients
                </p>
              </div>


              <div>
                <p className="text-2xl font-bold text-white">
                  5★
                </p>

                <p className="text-sm text-gray-300 mt-1">
                  Great Experience
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          WHY CHOOSE US
      ========================================================= */}
      <section className="py-20 md:py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto">

            <p className="text-[#166534] font-bold tracking-widest text-sm uppercase">
              Why TastyBites?
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
              Food Made For Food Lovers
            </h2>

            <p className="text-gray-600 mt-4 leading-relaxed">
              We focus on quality ingredients, authentic flavors,
              and a dining experience you'll want to come back to.
            </p>

          </div>


          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">

            {/* Fresh Ingredients */}
            <div className="group p-8 rounded-2xl border border-[#E8E1D0] bg-[#FFFCF2] hover:border-[#166534]/30 hover:shadow-xl transition">

              <div className="w-14 h-14 rounded-xl bg-[#ECFDF5] flex items-center justify-center group-hover:bg-[#166534] transition">

                <Leaf
                  size={27}
                  className="text-[#166534] group-hover:text-white transition"
                />

              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-6">
                Fresh Ingredients
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                We believe great food starts with fresh,
                carefully selected ingredients.
              </p>

            </div>


            {/* Expert Chefs */}
            <div className="group p-8 rounded-2xl border border-[#E8E1D0] bg-[#FFFCF2] hover:border-[#166534]/30 hover:shadow-xl transition">

              <div className="w-14 h-14 rounded-xl bg-[#ECFDF5] flex items-center justify-center group-hover:bg-[#166534] transition">

                <ChefHat
                  size={27}
                  className="text-[#166534] group-hover:text-white transition"
                />

              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-6">
                Expert Chefs
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                Every dish is prepared with care and attention
                to deliver great taste every time.
              </p>

            </div>


            {/* Made With Love */}
            <div className="group p-8 rounded-2xl border border-[#E8E1D0] bg-[#FFFCF2] hover:border-[#166534]/30 hover:shadow-xl transition">

              <div className="w-14 h-14 rounded-xl bg-[#ECFDF5] flex items-center justify-center group-hover:bg-[#166534] transition">

                <Heart
                  size={27}
                  className="text-[#166534] group-hover:text-white transition"
                />

              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-6">
                Made With Love
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                From preparation to presentation, every meal
                is made to create a memorable experience.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          CUSTOMER REVIEWS
      ========================================================= */}
      <section className="py-20 md:py-24 bg-[#FFFCF2]">

        <div className="max-w-7xl mx-auto px-6">

          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto">

            <p className="text-[#166534] font-bold tracking-widest text-sm uppercase">
              Customer Reviews
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
              What Our Customers Say
            </h2>

            <p className="text-gray-600 mt-4 leading-relaxed">
              Great food is even better when our customers love it too.
              Here's what some of our happy customers have to say.
            </p>

          </div>


          {/* Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">

            {reviews.map((review, index) => (

              <div
                key={index}
                className="relative bg-white border border-[#E8E1D0] rounded-2xl p-7 shadow-sm hover:shadow-xl hover:border-[#166534]/30 transition"
              >

                {/* Quote Icon */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#ECFDF5] flex items-center justify-center">

                  <Quote
                    size={19}
                    className="text-[#166534]"
                  />

                </div>


                {/* Stars */}
                <div className="flex items-center gap-1">

                  {[...Array(review.rating)].map((_, starIndex) => (

                    <Star
                      key={starIndex}
                      size={17}
                      className="text-[#D99A2B] fill-[#D99A2B]"
                    />

                  ))}

                </div>


                {/* Review */}
                <p className="text-gray-600 leading-relaxed mt-5 pr-4">
                  "{review.review}"
                </p>


                {/* Customer */}
                <div className="flex items-center gap-3 mt-7 pt-5 border-t border-[#E8E1D0]">

                  <div className="w-11 h-11 rounded-full bg-[#166534] text-white flex items-center justify-center font-bold">
                    {review.name.charAt(0)}
                  </div>

                  <div>

                    <p className="font-bold text-gray-900">
                      {review.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {review.role}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          MENU CTA
      ========================================================= */}
      <section className="px-6 pb-20 bg-white">

        <div className="max-w-7xl mx-auto">

          <div className="relative overflow-hidden rounded-3xl bg-[#123524] px-8 py-14 md:px-16 md:py-16">

            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#D99A2B]/20 rounded-full blur-3xl" />

            <div className="absolute -bottom-24 -left-20 w-72 h-72 bg-[#166534]/30 rounded-full blur-3xl" />

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">

              <div className="text-center md:text-left">

                <p className="text-[#D99A2B] font-bold tracking-widest text-sm uppercase">
                  Hungry?
                </p>

                <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
                  There's Something Delicious Waiting.
                </h2>

                <p className="text-gray-300 mt-3 max-w-xl">
                  Explore our menu and find your next favorite dish.
                </p>

              </div>


              <Link
                to="/menu"
                className="shrink-0 inline-flex items-center gap-2 bg-[#D99A2B] text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-[#B98220] transition"
              >
                Explore Menu
                <ArrowRight size={19} />
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Home;