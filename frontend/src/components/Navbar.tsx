import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout, user, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-blue-800 font-bold text-xl">
                YourApp
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/home"
                className="text-black hover:text-blue-800 px-3 py-2 rounded-md font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/courses"
                className="text-black hover:text-blue-800 px-3 py-2 rounded-md font-medium transition-colors"
              >
                Courses
              </Link>
              <Link
                to="/about"
                className="text-black hover:text-blue-800 px-3 py-2 rounded-md font-medium transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-black hover:text-blue-800 px-3 py-2 rounded-md font-medium transition-colors"
              >
                Contact
              </Link>

              <Link
                to="/event"
                className="text-black hover:text-blue-800 px-3 py-2 rounded-md font-medium transition-colors"
              >
                Events
              </Link>
              <Link
                to="/news"
                className="text-black hover:text-blue-800 px-3 py-2 rounded-md font-medium transition-colors"
              >
                News
              </Link>
              <Link
                to="/blog"
                className="text-black hover:text-blue-800 px-3 py-2 rounded-md font-medium transition-colors"
              >
                Blogs
              </Link>
            </div>
          </div>

          {/* User and Authentication Buttons */}
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-black font-medium">{user?.email}</span>
                <button
                  onClick={logout}
                  className="bg-blue-800 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="bg-blue-800 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-blue-800 border border-blue-800 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
