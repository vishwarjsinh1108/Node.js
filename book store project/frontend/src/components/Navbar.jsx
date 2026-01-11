import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import {
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiSearch,
} from "react-icons/fi";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const cartItemsCount = getCartItemsCount();

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#faf7f2] shadow-md"
          : "bg-[#faf7f2]"
      } border-b border-gray-200`}
    >
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-wide text-gray-900">
              Book<span className="text-rose-500">store</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            {["Home", "Books"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : "/books"}
                className="relative text-gray-700 font-medium hover:text-rose-500
                after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0
                after:bg-rose-500 hover:after:w-full after:transition-all"
              >
                {item}
              </Link>
            ))}

            {/* SEARCH */}
            <form onSubmit={handleSearch} className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books..."
                className="pl-11 pr-4 py-2 rounded-full w-64 bg-white border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </form>

            {user && (
              <>
                <Link
                  to="/orders"
                  className="text-gray-700 font-medium hover:text-rose-500"
                >
                  Orders
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="text-rose-500 font-semibold"
                  >
                    Admin
                  </Link>
                )}
              </>
            )}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link to="/cart" className="relative text-gray-700">
                  <FiShoppingCart className="w-6 h-6" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>

                {/* PROFILE */}
                <div className="relative group">
                  <button className="flex items-center gap-2 text-gray-700">
                    <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center">
                      <FiUser className="text-white" />
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </button>

                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                    >
                      <FiUser /> Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 font-medium">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-rose-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-rose-600 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white rounded-xl shadow-lg p-5 mt-3 space-y-3">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/books" onClick={() => setMobileMenuOpen(false)}>Books</Link>
            <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>
              Cart ({cartItemsCount})
            </Link>

            {user ? (
              <>
                <Link to="/profile">Profile</Link>
                {isAdmin && <Link to="/admin/dashboard">Admin</Link>}
                <button onClick={handleLogout} className="text-red-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
