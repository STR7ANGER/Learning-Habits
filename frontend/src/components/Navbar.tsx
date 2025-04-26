import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, FC, MouseEventHandler } from "react";

interface User {
  name: string;
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
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);

  const toggleProjectsDropdown: MouseEventHandler<HTMLButtonElement> = () => {
    setProjectsDropdownOpen((prev) => !prev);
    if (updatesDropdownOpen) setUpdatesDropdownOpen(false);
    if (userDropdownOpen) setUserDropdownOpen(false);
  };

  const toggleUpdatesDropdown: MouseEventHandler<HTMLButtonElement> = () => {
    setUpdatesDropdownOpen((prev) => !prev);
    if (projectsDropdownOpen) setProjectsDropdownOpen(false);
    if (userDropdownOpen) setUserDropdownOpen(false);
  };

  const toggleUserDropdown: MouseEventHandler<HTMLButtonElement> = () => {
    setUserDropdownOpen((prev) => !prev);
    if (projectsDropdownOpen) setProjectsDropdownOpen(false);
    if (updatesDropdownOpen) setUpdatesDropdownOpen(false);
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
              <div className="flex items-center space-x-4 relative">
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-800 text-white hover:bg-blue-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-12 z-50 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <div className="block px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                        Hello! {user?.name}
                      </div>

                      <Link
                        to="/myproject"
                        className="text-black block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        My Projects
                      </Link>

                      <Link
                        to="/mysession"
                        className="text-black block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        My Sessions
                      </Link>

                      <div className="border-t border-gray-200">
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="text-red-600 flex items-center w-full text-left px-4 py-2 text-sm hover:bg-red-50"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
