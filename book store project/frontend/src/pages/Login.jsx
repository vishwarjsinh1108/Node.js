import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';
import { FiMail, FiLock, FiBook, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success('Login successful! Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const signInWithProvider = (provider) => {
    // Redirect to backend OAuth route. Backend must implement /api/auth/:provider
    const url = `/api/auth/${provider}`;
    // Open in same tab so OAuth redirect works cleanly
    window.location.href = url;
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-blue-600 to-indigo-700 px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative">

      {/* Close icon (optional) */}
      <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
        ✕
      </button>

      {/* Logo */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-2 text-2xl font-extrabold">
          <span className="text-blue-700">Kitab</span>
          <span className="text-yellow-400">Kart</span>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
        Login to Kitab Kart
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="relative mt-1">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="relative mt-1">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Sign up */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-yellow-500 font-semibold">
          Sign Up
        </Link>
      </p>

      {/* Divider */}
      <div className="flex items-center gap-2 my-5">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-sm text-gray-400">Or login with</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* Social Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => signInWithProvider("google")}
          className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50"
        >
          <FaGoogle className="text-red-500" />
          <span className="text-sm font-medium">Google</span>
        </button>

        <button
          type="button"
          onClick={() => signInWithProvider("facebook")}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700"
        >
          <span className="text-sm font-medium">Facebook</span>
        </button>
      </div>
    </div>
  </div>
);
};
export default Login;

