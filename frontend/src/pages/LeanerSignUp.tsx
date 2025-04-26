import React, { useState, FormEvent, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { X } from "lucide-react";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";

const LearnerSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    status: "student" as "student" | "job", // Explicitly typed
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
    "Rust",
  ];

  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formError, setFormError] = useState<string>("");
  const navigate = useNavigate();
  const { register, error, loading } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update form error when auth context error changes
  useEffect(() => {
    if (error) {
      setFormError(error);
    }
  }, [error]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // Special handling for status field to maintain correct type
    if (name === "status") {
      setFormData((prev) => ({
        ...prev,
        [name]: value as "student" | "job",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const togglePreference = (preference: string) => {
    if (selectedPreferences.includes(preference)) {
      setSelectedPreferences(
        selectedPreferences.filter((p) => p !== preference)
      );
    } else {
      setSelectedPreferences([...selectedPreferences, preference]);
    }
  };

  const removePreference = (preference: string) => {
    setSelectedPreferences(selectedPreferences.filter((p) => p !== preference));
  };

  const filteredOptions = preferenceOptions.filter(
    (option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedPreferences.includes(option)
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setFormError("");

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords don't match");
      return;
    }

    if (formData.status === "student" && !formData.schoolName) {
      setFormError("Please enter your school/college name");
      return;
    }

    if (formData.status === "job" && !formData.companyName) {
      setFormError("Please enter your company name");
      return;
    }

    // Check if at least one preference is selected
    if (selectedPreferences.length === 0) {
      setFormError("Please select at least one preference");
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        role: "learner",
        status: formData.status,
        schoolName: formData.schoolName,
        companyName: formData.companyName,
        preferences: selectedPreferences,
      });

      // If registration is successful, redirect to home page
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      // Error handling is done in the context
    }
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
          <div className="mb-4 text-center ">
            <BlurText
              text="Learning Habits !!"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-5xl mb-8"
            />
          </div>
          <SplitText
            text="Join our community of learners and start your educational journey today"
            className="text-2xl text-center text-gray-200 max-w-md"
            delay={10}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            threshold={0.2}
            rootMargin="-50px"
          />
        </div>
      </div>

      {/* Right side - Sign Up form */}
      <div className="w-2/3 bg-gray-50 flex items-center justify-center py-8 overflow-y-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Create Learner Account
          </h2>

          {formError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
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
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phoneNumber"
                >
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
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
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

            {/* Status Selection for Learner */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="status"
                >
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
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="schoolName"
                    >
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
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="companyName"
                    >
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

            {/* Preferences Section - Dropdown with tags */}
            <div className="relative" ref={dropdownRef}>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Preferences (Select multiple)
              </label>
              <div
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer flex justify-between items-center"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="text-gray-500">
                  {selectedPreferences.length > 0
                    ? `${selectedPreferences.length} selected`
                    : "Select preferences"}
                </div>
                <div className="text-gray-500">▼</div>
              </div>

              {/* Selected preferences tags */}
              {selectedPreferences.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedPreferences.map((pref) => (
                    <div
                      key={pref}
                      className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm"
                    >
                      <span>{pref}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removePreference(pref);
                        }}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Search preferences..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((option) => (
                        <div
                          key={option}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePreference(option);
                          }}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">
                        No options available
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
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
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="confirmPassword"
                >
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
              className={`w-full ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors`}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Log In
              </Link>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Want to register as an expert?{" "}
              <Link
                to="/expertsignup"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Expert Registration
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerSignUp;
