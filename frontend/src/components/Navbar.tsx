import  { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = (): JSX.Element => {
  const { logout, user } = useAuth();
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
              <Link to="/" className="text-black hover:text-blue-800 px-3 py-2 rounded-md font-medium transition-colors">
                Home
              </Link>
              <Link to="/courses" className="text-black hover:text-blue-800 px-3 py-2 rounded-md font-medium transition-colors">
                Courses
              </Link>
              <Link to="/about" className="text-black hover:text-blue-800 px-3 py-2 rounded-md font-medium transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-black hover:text-blue-800 px-3 py-2 rounded-md font-medium transition-colors">
                Contact
              </Link>
              <Link to="/event" className="text-black hover:text-blue-800 px-3 py-2 rounded-md font-medium transition-colors">
                Events
              </Link>
              <Link to="/news" className="text-black hover:text-blue-800 px-3 py-2 rounded-md font-medium transition-colors">
                News
              </Link>
              <Link to="/blog" className="text-black hover:text-blue-800 px-3 py-2 rounded-md font-medium transition-colors">
                Blogs
              </Link>
            </div>
          </div>

          {/* User and Logout */}
          <div className="hidden md:flex items-center">
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-black font-medium">Aditya</span>
                <button
                  onClick={logout}
                  className="bg-blue-800 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-800 hover:text-blue-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-black hover:text-blue-800 block px-3 py-2 rounded-md font-medium">
              Home
            </Link>
            <Link to="/courses" className="text-black hover:text-blue-800 block px-3 py-2 rounded-md font-medium">
              Courses
            </Link>
            <Link to="/about" className="text-black hover:text-blue-800 block px-3 py-2 rounded-md font-medium">
              About Us
            </Link>
            <Link to="/contact" className="text-black hover:text-blue-800 block px-3 py-2 rounded-md font-medium">
              Contact
            </Link>
          </div>
          {user && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-4 flex items-center justify-between">
                <span className="text-black font-medium">Aditya</span>
                <button
                  onClick={logout}
                  className="bg-blue-800 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;