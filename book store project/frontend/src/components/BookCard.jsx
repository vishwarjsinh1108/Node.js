import { Link } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const BookCard = ({ book }) => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      return;
    }
    try {
      await addToCart(book._id, 1);
      toast.success("Added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className="flex flex-col items-center text-center">

      {/* IMAGE */}
      <Link to={`/books/${book._id}`} className="mb-3">
        <div className="w-[160px] h-[240px] flex items-center justify-center">
          <img
            src={book.coverImage || "https://via.placeholder.com/160x240?text=Book"}
            alt={book.title}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </Link>

      {/* TITLE */}
      <Link to={`/books/${book._id}`}>
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:underline">
          {book.title}
        </h3>
      </Link>

      {/* AUTHOR */}
      <p className="text-xs text-gray-500 mt-1">
        by {book.author?.name || "Unknown Author"}
      </p>

      {/* PRICE */}
      <p className="text-sm font-semibold text-gray-900 mt-2">
        From ₹{book.price?.toFixed(2)}
      </p>

      {/* RATING (optional, subtle) */}
      <div className="flex items-center gap-1 mt-1">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`w-3 h-3 ${
              i < Math.floor(book.ratings?.average || 0)
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* ADD TO CART (optional, minimal) */}
      <button
        onClick={handleAddToCart}
        className="mt-2 text-xs text-primary-600 hover:underline"
      >
        Add to cart
      </button>
    </div>
  );
};

export default BookCard;
