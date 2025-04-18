import { createContext, useState, useContext, useEffect, ReactNode } from "react";

// Enhanced user type with more specific properties
interface User {
  email: string;
  role: 'learner' | 'expert';
  name?: string;
  // Learner specific properties
  status?: 'student' | 'job';
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
  userType: 'learner' | 'expert' | null;
  login: (userData: User) => void;
  logout: () => void;
  setUserType: (type: 'learner' | 'expert') => void;
  // Add additional methods as needed
  updateUserProfile?: (updates: Partial<User>) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | null>(null);

// Create provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<'learner' | 'expert' | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    const storedUserType = localStorage.getItem("userType") as 'learner' | 'expert' | null;
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
      setUserType(storedUserType);
    }
  }, []);

  // Login function
  const login = (userData: User): void => {
    // In a real app, you would validate credentials with your backend
    localStorage.setItem("token", "dummy-token");
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("userType", userData.role);
    setIsAuthenticated(true);
    setUser(userData);
    setUserType(userData.role);
  };

  // Logout function
  const logout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    setIsAuthenticated(false);
    setUser(null);
    setUserType(null);
  };

  // Function to set user type (learner or expert)
  const changeUserType = (type: 'learner' | 'expert'): void => {
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
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  // Value to be provided to consumers
  const value: AuthContextType = {
    isAuthenticated,
    user,
    userType,
    login,
    logout,
    setUserType: changeUserType,
    updateUserProfile
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