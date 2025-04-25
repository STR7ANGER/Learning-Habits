import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, FC, MouseEventHandler } from "react";

interface User {
  email: string;
  role: "learner" | "expert";
}

interface AuthContextType {
  logout: () => void;
  user: User | null;
  isAuthenticated: boolean;
  userType: "learner" | "expert" | null;
}

const Navbar: FC = () => {
  const { logout, user, isAuthenticated, userType } =
    useAuth() as AuthContextType;
  const [projectsDropdownOpen, setProjectsDropdownOpen] =
    useState<boolean>(false);
  const [updatesDropdownOpen, setUpdatesDropdownOpen] =
    useState<boolean>(false);

  const toggleProjectsDropdown: MouseEventHandler<HTMLButtonElement> = () => {
    setProjectsDropdownOpen((prev) => !prev);
    if (updatesDropdownOpen) setUpdatesDropdownOpen(false);
  };

  const toggleUpdatesDropdown: MouseEventHandler<HTMLButtonElement> = () => {
    setUpdatesDropdownOpen((prev) => !prev);
    if (projectsDropdownOpen) setProjectsDropdownOpen(false);
  };

  const isExpert = isAuthenticated && userType === "expert";

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-blue-800 font-bold text-xl">
              Learning Habits
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              {isExpert ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-black hover:text-blue-800 px-3 py-2 rounded-md font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/session"
                    className="text-black hover:text-blue-800 px-3 py-2 rounded-md font-medium transition-colors"
                  >
                    Session
                  </Link>
                </>
              ) : (
                <>
                  <div className="relative">
                    <button
                      onClick={toggleProjectsDropdown}
                      className="text-black hover:text-blue-800 px-3 py-2 rounded-md font-medium transition-colors flex items-center"
                    >
                      Learning
                      <svg
                        className={`ml-1 h-4 w-4 transform ${
                          projectsDropdownOpen ? "rotate-180" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {projectsDropdownOpen && (
                      <div className="absolute z-50 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          <Link
                            to="/project"
                            className="text-black block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                            onClick={() => setProjectsDropdownOpen(false)}
                          >
                            Projects
                          </Link>
                          <Link
                            to="/expert"
                            className="text-black block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                            onClick={() => setProjectsDropdownOpen(false)}
                          >
                            Expert Learning
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <button
                      onClick={toggleUpdatesDropdown}
                      className="text-black hover:text-blue-800 px-3 py-2 rounded-md font-medium transition-colors flex items-center"
                    >
                      Updates
                      <svg
                        className={`ml-1 h-4 w-4 transform ${
                          updatesDropdownOpen ? "rotate-180" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {updatesDropdownOpen && (
                      <div className="absolute z-50 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          <Link
                            to="/event"
                            className="text-black block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                            onClick={() => setUpdatesDropdownOpen(false)}
                          >
                            Events
                          </Link>
                          <Link
                            to="/news"
                            className="text-black block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                            onClick={() => setUpdatesDropdownOpen(false)}
                          >
                            News
                          </Link>
                          <Link
                            to="/blog"
                            className="text-black block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                            onClick={() => setUpdatesDropdownOpen(false)}
                          >
                            Blogs
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

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

          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-black font-medium">Hello! {user?.name}</span>
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
                  className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Learner Login
                </Link>
                <Link
                  to="/expertlogin"
                  className="bg-blue-800 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Expert Login
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
