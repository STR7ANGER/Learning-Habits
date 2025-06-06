import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, FC, MouseEventHandler, useEffect, useRef } from "react";
import assets from "@/assets/assets";

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
  const [sessionsDropdownOpen, setSessionsDropdownOpen] =
    useState<boolean>(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);

  // Refs for dropdown containers
  const projectsDropdownRef = useRef<HTMLDivElement>(null);
  const updatesDropdownRef = useRef<HTMLDivElement>(null);
  const sessionsDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const toggleProjectsDropdown: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setProjectsDropdownOpen((prev) => !prev);
    setUpdatesDropdownOpen(false);
    setSessionsDropdownOpen(false);
    setUserDropdownOpen(false);
  };

  const toggleUpdatesDropdown: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setUpdatesDropdownOpen((prev) => !prev);
    setProjectsDropdownOpen(false);
    setSessionsDropdownOpen(false);
    setUserDropdownOpen(false);
  };

  const toggleSessionsDropdown: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setSessionsDropdownOpen((prev) => !prev);
    setProjectsDropdownOpen(false);
    setUpdatesDropdownOpen(false);
    setUserDropdownOpen(false);
  };

  const toggleUserDropdown: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setUserDropdownOpen((prev) => !prev);
    setProjectsDropdownOpen(false);
    setUpdatesDropdownOpen(false);
    setSessionsDropdownOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click was outside project dropdown
      if (
        projectsDropdownOpen &&
        projectsDropdownRef.current &&
        !projectsDropdownRef.current.contains(event.target as Node)
      ) {
        setProjectsDropdownOpen(false);
      }

      // Check if click was outside updates dropdown
      if (
        updatesDropdownOpen &&
        updatesDropdownRef.current &&
        !updatesDropdownRef.current.contains(event.target as Node)
      ) {
        setUpdatesDropdownOpen(false);
      }

      // Check if click was outside sessions dropdown
      if (
        sessionsDropdownOpen &&
        sessionsDropdownRef.current &&
        !sessionsDropdownRef.current.contains(event.target as Node)
      ) {
        setSessionsDropdownOpen(false);
      }

      // Check if click was outside user dropdown
      if (
        userDropdownOpen &&
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    projectsDropdownOpen,
    updatesDropdownOpen,
    sessionsDropdownOpen,
    userDropdownOpen,
  ]);

  // Close dropdowns when pressing escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProjectsDropdownOpen(false);
        setUpdatesDropdownOpen(false);
        setSessionsDropdownOpen(false);
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const isExpert = isAuthenticated && userType === "expert";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-blue-800 font-bold text-xl">
              <img src={assets.logo} alt="logo" className="w-40 md:w-64 h-10" />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              {isExpert ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-black hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-md font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/session"
                    className="text-black hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-md font-medium transition-colors"
                  >
                    Session
                  </Link>
                </>
              ) : (
                <>
                  <div className="relative" ref={projectsDropdownRef}>
                    <button
                      onClick={toggleProjectsDropdown}
                      className={`text-black hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-md font-medium transition-colors flex items-center ${
                        projectsDropdownOpen ? "bg-blue-50 text-blue-800" : ""
                      }`}
                      aria-expanded={projectsDropdownOpen}
                    >
                      Learnings
                      <svg
                        className={`ml-1 h-4 w-4 transform transition-transform ${
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
                      <div className="absolute z-50 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="py-1">
                          <Link
                            to="/project"
                            className="text-black group flex items-center px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                            onClick={() => setProjectsDropdownOpen(false)}
                          >
                            <svg
                              className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-800"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v5a1 1 0 01-1 1h-12a1 1 0 01-1-1V4z"
                                clipRule="evenodd"
                              />
                              <path
                                fillRule="evenodd"
                                d="M3 10a1 1 0 011-1h12a1 1 0 011 1v5a1 1 0 01-1 1h-12a1 1 0 01-1-1v-5z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Project based learning 
                          </Link>
                          <Link
                            to="/techlearning"
                            className="text-black group flex items-center px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                            onClick={() => setProjectsDropdownOpen(false)}
                          >
                            <svg
                              className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-800"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                            </svg>
                            Pay as you learn
                          </Link>
                          <Link
                            to="/jobtalk"
                            className="text-black group flex items-center px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                            onClick={() => setSessionsDropdownOpen(false)}
                          >
                            <svg
                              className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-800"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                clipRule="evenodd"
                              />
                              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                            </svg>
                            Technical job support
                          </Link>
                          <Link
                            to="/corporate"
                            className="text-black group flex items-center px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                            onClick={() => setSessionsDropdownOpen(false)}
                          >
                            <svg
                              className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-800"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                clipRule="evenodd"
                              />
                              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                            </svg>
                            Corporate Training
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* New Sessions Dropdown */}
                  <div className="relative" ref={sessionsDropdownRef}>
                    <button
                      onClick={toggleSessionsDropdown}
                      className={`text-black hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-md font-medium transition-colors flex items-center ${
                        sessionsDropdownOpen ? "bg-blue-50 text-blue-800" : ""
                      }`}
                      aria-expanded={sessionsDropdownOpen}
                    >
                      Sessions
                      <svg
                        className={`ml-1 h-4 w-4 transform transition-transform ${
                          sessionsDropdownOpen ? "rotate-180" : ""
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
                    {sessionsDropdownOpen && (
                      <div className="absolute z-50 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="py-1">
                          <Link
                            to="/expert"
                            className="text-black group flex items-center px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                            onClick={() => setSessionsDropdownOpen(false)}
                          >
                            <svg
                              className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-800"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                            Expert Session
                          </Link>
                          <Link
                            to="/businesscomms"
                            className="text-black group flex items-center px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                            onClick={() => setSessionsDropdownOpen(false)}
                          >
                            <svg
                              className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-800"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                            Business Communication
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative" ref={updatesDropdownRef}>
                    <button
                      onClick={toggleUpdatesDropdown}
                      className={`text-black hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-md font-medium transition-colors flex items-center ${
                        updatesDropdownOpen ? "bg-blue-50 text-blue-800" : ""
                      }`}
                      aria-expanded={updatesDropdownOpen}
                    >
                      Updates
                      <svg
                        className={`ml-1 h-4 w-4 transform transition-transform ${
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
                      <div className="absolute z-50 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="py-1">
                          <Link
                            to="/event"
                            className="text-black group flex items-center px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                            onClick={() => setUpdatesDropdownOpen(false)}
                          >
                            <svg
                              className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-800"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Events
                          </Link>
                          <Link
                            to="/news"
                            className="text-black group flex items-center px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                            onClick={() => setUpdatesDropdownOpen(false)}
                          >
                            <svg
                              className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-800"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                                clipRule="evenodd"
                              />
                              <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                            </svg>
                            News
                          </Link>
                          <Link
                            to="/blog"
                            className="text-black group flex items-center px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                            onClick={() => setUpdatesDropdownOpen(false)}
                          >
                            <svg
                              className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-800"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
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
                className="text-black hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-md font-medium transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-black hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-md font-medium transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <div
                className="flex items-center space-x-4 relative"
                ref={userDropdownRef}
              >
                <button
                  onClick={toggleUserDropdown}
                  className={`flex items-center justify-center w-10 h-10 rounded-full bg-blue-800 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    userDropdownOpen ? "ring-2 ring-offset-2 ring-blue-500" : ""
                  }`}
                  aria-expanded={userDropdownOpen}
                >
                  <span className="sr-only">Open user menu</span>
                  <span className="text-sm font-medium">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-12 z-50 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="py-1">
                      <div className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <div className="border-t border-gray-100"></div>

                      <Link
                        to="/myproject"
                        className="text-black group flex items-center px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <svg
                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-800"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                        </svg>
                        My Projects
                      </Link>

                      <Link
                        to="/mysession"
                        className="text-black group flex items-center px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <svg
                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-800"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        My Sessions
                      </Link>

                      <div className="border-t border-gray-100"></div>

                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="text-red-600 group flex items-center w-full text-left px-4 py-2 text-sm hover:bg-red-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-3 text-red-500"
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
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Learner Login
                </Link>
                {/* <Link
                  to="/expertlogin"
                  className="text-blue-800 border border-blue-800 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Expert Login
                </Link> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
