import React, { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";

const ExpertSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    expertise: "",
    experience: "",
    portfolioLink: "",
    bio: "",
    password: "",
    confirmPassword: "",
  });

  // Define all expertise options
  const expertiseOptions = [
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

  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (!formData.expertise) {
      setError("Please specify your area of expertise");
      return;
    }
    
    if (!formData.experience) {
      setError("Please enter your years of experience");
      return;
    }

    // In a real app, you would register the user with your backend
    login({ 
      email: formData.email,
      role: 'expert',
      name: formData.name,
      expertise: formData.expertise,
      experience: formData.experience,
      portfolioLink: formData.portfolioLink,
      bio: formData.bio
    });

    // Redirect to dashboard
    navigate("/dashboard");
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
            text="Become an expert mentor and shape the future of learning with your knowledge"
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
            Create Expert Account
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {error}
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

            {/* Expert specific fields */}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="expertise"
              >
                Area of Expertise
              </label>
              <select
                id="expertise"
                name="expertise"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.expertise}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your expertise</option>
                {expertiseOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="experience"
                >
                  Years of Experience
                </label>
                <input
                  id="experience"
                  name="experience"
                  type="number"
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="portfolioLink"
                >
                  Portfolio Link (optional)
                </label>
                <input
                  id="portfolioLink"
                  name="portfolioLink"
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.portfolioLink}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="bio"
              >
                Professional Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={handleInputChange}
                required
              ></textarea>
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
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/expertlogin"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Log In
              </Link>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Want to register as a learner?{" "}
              <Link
                to="/signup"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Learner Registration
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertSignUp;