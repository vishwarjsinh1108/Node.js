import { Link } from 'react-router-dom';

const Footer = () => {
  return (
       <footer className="bg-[#faf7f2] border-t border-gray-200 mt-auto">
  <div className="max-w-7xl mx-auto px-6 py-16">

    {/* TOP GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

      {/* BRAND */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Book<span className="text-rose-500">Store</span>
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Your trusted place to discover, read and grow with the world’s best books.
        </p>
      </div>

      {/* LINKS */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Explore</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="/" className="text-gray-600 hover:text-rose-500">Home</a></li>
          <li><a href="/books" className="text-gray-600 hover:text-rose-500">Books</a></li>
          <li><a href="/orders" className="text-gray-600 hover:text-rose-500">Orders</a></li>
        </ul>
      </div>

      {/* SUPPORT */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="text-gray-600 hover:text-rose-500">Help Center</a></li>
          <li><a href="#" className="text-gray-600 hover:text-rose-500">Privacy Policy</a></li>
          <li><a href="#" className="text-gray-600 hover:text-rose-500">Terms & Conditions</a></li>
        </ul>
      </div>

      {/* NEWSLETTER */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Stay Updated</h4>
        <p className="text-gray-600 text-sm mb-4">
          Get book updates & offers directly in your inbox.
        </p>
        <form className="flex gap-2">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
          <button
            type="submit"
            className="bg-rose-500 text-white px-4 rounded-md font-medium hover:bg-rose-600 transition"
          >
            Join
          </button>
        </form>
      </div>
    </div>

    {/* BOTTOM BAR */}
    <div className="border-t border-gray-300 mt-14 pt-6 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} BookStore. All rights reserved.
    </div>

  </div>
</footer>

  );
};

export default Footer;

