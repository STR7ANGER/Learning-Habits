import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";

interface FormData {
  uid: string;
  name: string;
  email: string;
  techArea: string;
  specificTech: string;
  date: string;
  time: string;
  message: string;
}

const Expert: React.FC = () => {
  // Available tech areas
  const techAreas = [
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
    "Cyber Security",
    "Others",
  ];

  // State
  const [formData, setFormData] = useState<FormData>({
    uid: "", // Will be set from auth context
    name: "",
    email: "",
    techArea: "",
    specificTech: "",
    date: "",
    time: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get user ID from auth context or localStorage
  useEffect(() => {
    // This is a placeholder - in a real app, you would get this from your auth context
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );
    if (user && user._id) {
      setFormData((prev) => ({
        ...prev,
        uid: user._id,
      }));
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // FIX: Get the API URL from environment variables correctly
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    try {
      // FIX: Send the formData object directly, not the FormData class
      const response = await axios.post(
        `${apiUrl}/api/sessions/expert`,
        formData
      );

      console.log("Booking successful:", response.data);
      setBookingSuccess(true);
    } catch (err) {
      console.error("Error booking session:", err);
      // Provide more specific error information
      setError("Failed to book session. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form for new booking
  const resetForm = () => {
    setFormData({
      uid: formData.uid, // Keep the user ID
      name: "",
      email: "",
      techArea: "",
      specificTech: "",
      date: "",
      time: "",
      message: "",
    });
    setBookingSuccess(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero section with blue background and animated pattern */}
      <div className="bg-blue-800 text-white py-16 relative overflow-hidden">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.5}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
            "absolute inset-0 opacity-60"
          )}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6">
              <BlurText
                text="Tech Expert Sessions"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-5xl font-bold"
              />
            </div>
            <SplitText
              text="Connect with industry tech experts for personalized mentoring, code reviews, and skill development sessions to accelerate your technical career."
              className="text-xl text-gray-200 max-w-2xl mx-auto"
              delay={10}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              threshold={0.2}
              rootMargin="-50px"
            />
          </div>
        </div>
      </div>

      {/* Main content area with booking form */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left content - Booking form */}
          <div className="lg:w-2/3 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Book Your Tech Session
            </h2>
            <p className="text-gray-600 max-w-2xl mb-8">
              Schedule a personalized mentoring session with professionals
              actively working in the tech industry. Our experts will help you
              enhance your skills and advance your technical career.
            </p>

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
                <p className="font-medium">Error: {error}</p>
              </div>
            )}

            {!bookingSuccess ? (
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Technology Area
                  </label>
                  <div className="relative">
                    <select
                      name="techArea"
                      value={formData.techArea}
                      onChange={handleInputChange}
                      className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="" disabled>
                        Select a technology area
                      </option>
                      {techAreas.map((tech) => (
                        <option key={tech} value={tech}>
                          {tech}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Specific Technology (Optional)
                  </label>
                  <Input
                    type="text"
                    name="specificTech"
                    value={formData.specificTech}
                    onChange={handleInputChange}
                    placeholder="e.g., React, TensorFlow, Kubernetes, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Preferred Date
                  </label>
                  <Input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Preferred Time
                  </label>
                  <Input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    What do you need help with?
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full ${
                      loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                    } text-white font-bold py-3 px-4 rounded-md transition-colors flex items-center justify-center`}
                  >
                    {loading ? (
                      <>Loading...</>
                    ) : (
                      <>
                        <Calendar size={18} className="mr-2" />
                        Schedule Session
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-10">
                <div className="bg-green-100 p-4 rounded-full inline-flex mb-6">
                  <CheckCircle size={48} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Booking Submitted!
                </h3>
                <p className="text-gray-600 mb-8">
                  Thank you for scheduling a tech mentoring session. We'll send
                  you a confirmation email shortly with meeting details.
                </p>
                <button
                  onClick={resetForm}
                  className="bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Book Another Session
                </button>
              </div>
            )}
          </div>

          {/* Right sidebar - Session types and benefits */}
          <div className="lg:w-1/3 mt-10 lg:mt-0">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8 mb-8">
              <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center">
                <Clock size={20} className="mr-2 text-blue-600" />
                Available Session Types
              </h3>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle
                    size={18}
                    className="text-blue-600 mr-2 mt-0.5"
                  />
                  <div>
                    <span className="font-medium text-gray-800">
                      1-on-1 Code Review (60min)
                    </span>
                    <p className="text-sm text-gray-600">
                      Get personalized feedback on your code and learn best
                      practices.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    size={18}
                    className="text-blue-600 mr-2 mt-0.5"
                  />
                  <div>
                    <span className="font-medium text-gray-800">
                      Technical Interview Prep (90min)
                    </span>
                    <p className="text-sm text-gray-600">
                      Practice technical interview questions with expert
                      guidance.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    size={18}
                    className="text-blue-600 mr-2 mt-0.5"
                  />
                  <div>
                    <span className="font-medium text-gray-800">
                      Project Architecture Consultation (60min)
                    </span>
                    <p className="text-sm text-gray-600">
                      Get advice on system design and architecture decisions.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    size={18}
                    className="text-blue-600 mr-2 mt-0.5"
                  />
                  <div>
                    <span className="font-medium text-gray-800">
                      Career Path Planning (45min)
                    </span>
                    <p className="text-sm text-gray-600">
                      Discuss your tech career goals and create a roadmap for
                      success.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg shadow-md p-6">
              <h3 className="font-bold text-xl text-gray-800 mb-4">
                Why Book With Us?
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Industry Expertise
                    </h4>
                    <p className="text-sm text-gray-600">
                      Learn from professionals actively working at top tech
                      companies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Personalized Support
                    </h4>
                    <p className="text-sm text-gray-600">
                      Get solutions tailored to your specific needs and skill
                      level.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Fast-Track Your Growth
                    </h4>
                    <p className="text-sm text-gray-600">
                      Avoid common pitfalls and learn industry best practices
                      directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            The Tech Mentoring Process
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Select Technology
              </h3>
              <p className="text-gray-600">
                Choose your specific technology focus area or add any custom
                tech stack you need help with.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Book Time Slot
              </h3>
              <p className="text-gray-600">
                Schedule a session at your convenience through our simple
                booking system.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Collaborate & Learn
              </h3>
              <p className="text-gray-600">
                Meet virtually for pair programming, code reviews, technical
                guidance, and hands-on learning.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-action section */}
      <div className="bg-blue-800 text-white py-12 relative overflow-hidden">
        <AnimatedGridPattern
          numSquares={20}
          maxOpacity={0.3}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
            "absolute inset-0 opacity-50"
          )}
        />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Level Up Your Tech Skills</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who have accelerated their careers with
            personalized tech mentoring sessions.
          </p>
          <button
            className="bg-white text-blue-800 font-bold py-3 px-8 rounded-md hover:bg-blue-100 transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default Expert;
