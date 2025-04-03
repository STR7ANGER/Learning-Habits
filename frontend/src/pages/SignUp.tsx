import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { Checkbox } from "@/components/ui/checkbox";

const SignUp = (): JSX.Element => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    status: "student", // Default value
    schoolName: "",
    companyName: "",
    password: "",
    confirmPassword: "",
  });
  
  // Define all preferences in an array for easier mapping
  const preferenceOptions = [
    "Ai Chatbot",
    "Ai Data Scientist",
    "AR-VR",
    "Blockchain",
    "Cloud",
    "Data Engineer",
    "Data Visualization",
    "DevOps",
    "Fullstack",
    "Golang",
    "Mobile Dev",
    "QA",
    "Rust"
  ];
  
  // Initialize preferences state with all options set to false
  const [preferences, setPreferences] = useState<Record<string, boolean>>(
    preferenceOptions.reduce((acc, pref) => {
      // Convert preference name to camelCase for use as object key
      const key = pref.replace(/\s+(.)/g, (_, c) => c.toLowerCase())
                      .replace(/\s+/g, '')
                      .replace(/^(.)/, (_, c) => c.toLowerCase())
                      .replace(/-(.)/g, (_, c) => c.toUpperCase());
      return { ...acc, [key]: false };
    }, {})
  );
  
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (preference: string) => {
    setPreferences((prev) => ({
      ...prev,
      [preference]: !prev[preference],
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (formData.status === "student" && !formData.schoolName) {
      setError("Please enter your school/college name");
      return;
    }
    
    if (formData.status === "job" && !formData.companyName) {
      setError("Please enter your company name");
      return;
    }
    
    // Check if at least one preference is selected
    const hasPreference = Object.values(preferences).some(value => value);
    if (!hasPreference) {
      setError("Please select at least one preference");
      return;
    }
    
    // In a real app, you would register the user with your backend
    login({ email: formData.email });
    
    // Navigation is handled by conditional rendering in the parent component
  };

  // Function to convert preference display name to camelCase key
  const getPreferenceKey = (displayName: string): string => {
    return displayName.replace(/\s+(.)/g, (_, c) => c.toLowerCase())
                     .replace(/\s+/g, '')
                     .replace(/^(.)/, (_, c) => c.toLowerCase())
                     .replace(/-(.)/g, (_, c) => c.toUpperCase());
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Blue background with animated grid pattern and text */}
      <div className="w-1/2 bg-blue-800 flex flex-col items-center justify-center text-white p-8 relative overflow-hidden">
        {/* Animated Grid Pattern */}
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.5}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
            "absolute inset-0 opacity-60"
          )}
        />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-4 text-center">LEARNING HABITS</h1>
          <p className="text-xl text-center text-gray-200 max-w-md">
            Join our community of learners and start your educational journey today
          </p>
        </div>
      </div>

      {/* Right side - Sign Up form (expanded to 2/3 of the screen) */}
      <div className="w-2/3 bg-gray-50 flex items-center justify-center py-8 overflow-y-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            {/* Status Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                  Current Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="student">Student</option>
                  <option value="job">Working Professional</option>
                </select>
              </div>
              
              <div>
                {formData.status === "student" ? (
                  <>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="schoolName">
                      School/College Name
                    </label>
                    <input
                      id="schoolName"
                      name="schoolName"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.schoolName}
                      onChange={handleInputChange}
                    />
                  </>
                ) : (
                  <>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
                      Company Name
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.companyName}
                      onChange={handleInputChange}
                    />
                  </>
                )}
              </div>
            </div>
            
            {/* Preferences Section - Using map function */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Preferences (Select multiple)
              </label>
              <div className="grid grid-cols-3 gap-3">
                {preferenceOptions.map((preference) => {
                  const prefKey = getPreferenceKey(preference);
                  return (
                    <div key={prefKey} className="flex items-center space-x-2">
                      <Checkbox 
                        id={prefKey} 
                        checked={preferences[prefKey]}
                        onCheckedChange={() => handleCheckboxChange(prefKey)}
                      />
                      <label htmlFor={prefKey} className="text-sm text-gray-700">{preference}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
            >
              Create Account
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a 
                href="/login" 
                className="text-blue-500 hover:text-blue-700 font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;