import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiArrowRight, FiBook } from "react-icons/fi";

const Home = () => {
  const { user } = useAuth();

  const categories = [
    "Fiction",
    "Self-Help",
    "Education",
    "Kids",
    "Novels",
    "Business",
  ];

  const books = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      price: 399,
      img: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 299,
      img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
    },
    {
      title: "Ikigai",
      author: "H. García",
      price: 350,
      img: "https://images.unsplash.com/photo-1528207776546-365bb710ee93",
    },
    {
      title: "Rich Dad Poor Dad",
      author: "R. Kiyosaki",
      price: 349,
      img: "https://images.unsplash.com/photo-1529042410759-befb1204b468",
    },
  ];

  return (
    <div className="bg-[#f9fafb] text-gray-800">

      {/* HERO */}
      <section className="relative overflow-hidden">
  {/* BACKGROUND */}
  <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-500 opacity-95"></div>

  <div className="relative max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-14 items-center text-white">
    
    {/* LEFT CONTENT */}
    <div>
      <span className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm mb-6 backdrop-blur">
        <FiBook /> India’s Smart Bookstore
      </span>

      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
        Read. Learn.
        <span className="block text-orange-300">Grow Everyday.</span>
      </h1>

      <p className="text-white/90 text-lg mb-10 max-w-lg">
        Hand-picked books for self-growth, success and imagination.
      </p>

      <Link
        to={user ? "/books" : "/register"}
        className="inline-flex items-center gap-3 bg-orange-400 text-emerald-900 px-8 py-4 rounded-xl font-semibold hover:scale-105 hover:bg-orange-500 transition"
      >
        Explore Books <FiArrowRight />
      </Link>
    </div>

    {/* RIGHT IMAGE */}
    <img
      src="https://images.unsplash.com/photo-1519682337058-a94d519337bc"
      alt="Books"
      className="rounded-3xl shadow-2xl hidden md:block"
    />
  </div>
</section>


      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Explore Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((c) => (
            <div
              key={c}
              className="bg-white rounded-2xl p-6 text-center shadow hover:shadow-xl hover:-translate-y-1 transition cursor-pointer font-medium"
            >
              {c}
            </div>
          ))}
        </div>
      </section>

      {/* BOOKS */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Trending Books</h2>
            <Link to="/books" className="text-indigo-600 font-medium">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {books.map((b, i) => (
              <div
                key={i}
                className="group bg-gray-50 rounded-3xl overflow-hidden shadow hover:shadow-2xl transition"
              >
                <img
                  src={b.img}
                  alt={b.title}
                  className="h-56 w-full object-cover group-hover:scale-105 transition"
                />

                <div className="p-5">
                  <h3 className="font-semibold mb-1">{b.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{b.author}</p>

                  <div className="flex justify-between items-center">
                    <span className="font-bold text-indigo-600">
                      ₹{b.price}
                    </span>
                    <Link
                      to="/books"
                      className="text-sm font-medium text-indigo-600 hover:underline"
                    >
                      Buy Now →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-24 text-center text-white">
        <h2 className="text-4xl font-bold mb-6">
          Build a Habit of Reading 📖
        </h2>

        <p className="text-white/90 max-w-xl mx-auto mb-10">
          Join thousands of readers discovering powerful ideas every day.
        </p>

        <Link
          to={user ? "/books" : "/register"}
          className="bg-white text-indigo-700 px-10 py-4 rounded-xl font-semibold hover:scale-105 transition"  .
          >
          Start Reading
        </Link>
      </section> */}
    </div>
  );
};

export default Home;
