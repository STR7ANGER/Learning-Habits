import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

// Define the User interface based on your auth context
interface User {
  email: string;
  // Add other user properties as needed
}

// Define the AuthContextType interface based on your auth context
interface AuthContextType {
  logout: () => void;
  user: User | null;
  isAuthenticated: boolean;
}

const Navbar: React.FC = () => {
  const { logout, user, isAuthenticated } = useAuth() as AuthContextType;
  const [projectsDropdownOpen, setProjectsDropdownOpen] =
    useState<boolean>(false);
  const [updatesDropdownOpen, setUpdatesDropdownOpen] =
    useState<boolean>(false);

  const toggleProjectsDropdown = (): void => {
    setProjectsDropdownOpen(!projectsDropdownOpen);
    if (updatesDropdownOpen) setUpdatesDropdownOpen(false);
  };

  const toggleUpdatesDropdown = (): void => {
    setUpdatesDropdownOpen(!updatesDropdownOpen);
    if (projectsDropdownOpen) setProjectsDropdownOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-blue-800 font-bold text-xl">
                Learning Habits
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* Dropdown Menu for Projects/Expert */}
              <div className="relative">
                <button
                  onClick={toggleProjectsDropdown}
                  className="text-black hover:text-blue-800 px-3 py-2 rounded-md font-medium transition-colors flex items-center"
                  aria-expanded={projectsDropdownOpen}
                >
                  Projects
                  <svg
                    className={`ml-1 h-4 w-4 transform ${
                      projectsDropdownOpen ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {/* Projects Dropdown Menu */}
                {projectsDropdownOpen && (
                  <div
                    className="absolute z-50 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    <div className="py-1" role="none">
                      <Link
                        to="/project"
                        className="text-black block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                        role="menuitem"
                        onClick={() => setProjectsDropdownOpen(false)}
                      >
                        Projects
                      </Link>
                      <Link
                        to="/expert"
                        className="text-black block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                        role="menuitem"
                        onClick={() => setProjectsDropdownOpen(false)}
                      >
                        Expert
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Dropdown Menu for Updates (Events, News, Blogs) */}
              <div className="relative">
                <button
                  onClick={toggleUpdatesDropdown}
                  className="text-black hover:text-blue-800 px-3 py-2 rounded-md font-medium transition-colors flex items-center"
                  aria-expanded={updatesDropdownOpen}
                >
                  Updates
                  <svg
                    className={`ml-1 h-4 w-4 transform ${
                      updatesDropdownOpen ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {/* Updates Dropdown Menu */}
                {updatesDropdownOpen && (
                  <div
                    className="absolute z-50 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    <div className="py-1" role="none">
                      <Link
                        to="/event"
                        className="text-black block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                        role="menuitem"
                        onClick={() => setUpdatesDropdownOpen(false)}
                      >
                        Events
                      </Link>
                      <Link
                        to="/news"
                        className="text-black block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                        role="menuitem"
                        onClick={() => setUpdatesDropdownOpen(false)}
                      >
                        News
                      </Link>
                      <Link
                        to="/blog"
                        className="text-black block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                        role="menuitem"
                        onClick={() => setUpdatesDropdownOpen(false)}
                      >
                        Blogs
                      </Link>
                    </div>
                  </div>
                )}
              </div>

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
