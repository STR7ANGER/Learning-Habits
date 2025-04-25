import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

// Enhanced user type with more specific properties
interface User {
  _id?: string;
  email: string;
  role: "learner" | "expert";
  name?: string;
  // Learner specific properties
  status?: "student" | "job";
  schoolName?: string;
  companyName?: string;
  preferences?: string[];
  // Expert specific properties
  expertise?: string;
  experience?: string;
  portfolioLink?: string;
  bio?: string;
  // Allow for additional user properties
  [key: string]: any;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  userType: "learner" | "expert" | null;
  login: (userData: Partial<User> & { password?: string }) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  setUserType: (type: "learner" | "expert") => void;
  updateUserProfile: (updates: Partial<User>) => void;
  error: string | null;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

// API base URL
const API_URL = import.meta.env.VITE_API_URL;

// Create the context with a default value
const AuthContext = createContext<AuthContextType | null>(null);

// Create provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<"learner" | "expert" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    const storedUserType = localStorage.getItem("userType") as
      | "learner"
      | "expert"
      | null;

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
      setUserType(storedUserType);

      // Configure axios to use token for all requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // Register function (for learner)
  const register = async (
    userData: Partial<User> & { password: string }
  ): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const requestData = {
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        password: userData.password,
        status: userData.status,
        schoolName:
          userData.status === "student" ? userData.schoolName : undefined,
        companyName:
          userData.status === "job" ? userData.companyName : undefined,
        preferences: userData.preferences || [],
      };

      const response = await axios.post(
        `${API_URL}/api/learner/register`,
        requestData
      );

      if (response.data.success) {
        // Log the full response to see its structure

        // Check different possible locations of the token
        const token =
          response.data.token ||
          response.data.data?.token ||
          (typeof response.data === "object"
            ? Object.values(response.data).find(
                (v) => typeof v === "string" && v.length > 30
              )
            : null);

        if (!token) {
          console.error(
            "Token not found in registration response:",
            response.data
          );
          throw new Error(
            "No token found in server response during registration"
          );
        }

        // Now set the token
        localStorage.setItem("token", token);

        const { data } = response.data;

        // Configure axios to use token for all requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Create a complete user object with required fields
        const completeUser: User = {
          _id: data._id,
          email: data.email,
          name: data.name,
          role: "learner",
          status: data.status,
          preferences: data.preferences,
          // Add other fields as needed
        };

        localStorage.setItem("user", JSON.stringify(completeUser));
        localStorage.setItem("userType", "learner");

        setIsAuthenticated(true);
        setUser(completeUser);
        setUserType("learner");
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (
    userData: Partial<User> & { password?: string }
  ): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      if (!userData.role) {
        throw new Error("Role must be specified when logging in");
      }

      // Determine which API endpoint to use based on role
      const endpoint =
        userData.role === "learner"
          ? "/api/learner/login"
          : "/api/expert/login";

      console.log("Sending login request to:", `${API_URL}${endpoint}`);
      const response = await axios.post(`${API_URL}${endpoint}`, {
        email: userData.email,
        password: userData.password,
      });

      console.log("Login response received:", response.data);

      if (response.data.success) {
        // Log the full response to see its structure
        console.log("Full login response:", response.data);

        // Check different possible locations of the token
        const token =
          response.data.token ||
          response.data.data?.token ||
          (typeof response.data === "object"
            ? Object.values(response.data).find(
                (v) => typeof v === "string" && v.length > 30
              )
            : null);

        if (!token) {
          console.error("Token not found in login response:", response.data);
          throw new Error("No token found in server response during login");
        }

        // Now set the token
        localStorage.setItem("token", token);

        const { data } = response.data;

        // Configure axios to use token for all requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Create a complete user object with required fields
        const completeUser: User = {
          _id: data._id,
          email: data.email,
          name: data.name,
          role: userData.role,
          status: data.status,
          preferences: data.preferences,
          // Add other fields as needed
        };

        localStorage.setItem("user", JSON.stringify(completeUser));
        localStorage.setItem("userType", userData.role);

        setIsAuthenticated(true);
        setUser(completeUser);
        setUserType(userData.role);
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");

    // Remove Authorization header
    delete axios.defaults.headers.common["Authorization"];

    setIsAuthenticated(false);
    setUser(null);
    setUserType(null);
  };

  // Function to set user type (learner or expert)
  const changeUserType = (type: "learner" | "expert"): void => {
    setUserType(type);
    localStorage.setItem("userType", type);

    // If user already exists, update their role
    if (user) {
      const updatedUser = { ...user, role: type };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  // Function to update user profile
  const updateUserProfile = (updates: Partial<User>): void => {
    if (user) {
      // Ensure status is properly handled when updated
      let parsedStatus: "student" | "job" | undefined = user.status;
      if (updates.status === "student" || updates.status === "job") {
        parsedStatus = updates.status;
      }

      const updatedUser = {
        ...user,
        ...updates,
        status: parsedStatus,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Here you would also update the user profile in the backend
      // This is a placeholder for that functionality
    }
  };

  // Value to be provided to consumers
  const value: AuthContextType = {
    isAuthenticated,
    user,
    userType,
    login,
    register,
    logout,
    setUserType: changeUserType,
    updateUserProfile,
    error,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
