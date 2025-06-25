import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
 
  Code,
  
  ArrowRight,
  Check,
  AlertCircle,
  Loader2,
  Briefcase,
  GraduationCap,
  Clock,
  IndianRupee,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import axios from "axios";

interface FormData {
  uid: string;
  name: string;
  email: string;
  contact: string;
  college: string;
  fieldOfInterest: string;
  duration: string;
  currentYear: string;
  specialization: string;
  experience: string;
  motivation: string;
}

const Internship = () => {
  const [formData, setFormData] = useState<FormData>({
    uid: "",
    name: "",
    email: "",
    contact: "",
    college: "",
    fieldOfInterest: "",
    duration: "",
    currentYear: "",
    specialization: "",
    experience: "",
    motivation: "",
  });

  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const techFields = [
    "Web Development",
    "Mobile App Development",
    "Data Science & Analytics",
    "Artificial Intelligence",
    "Machine Learning",
    "Cloud Computing",
    "DevOps & Infrastructure",
    "Cybersecurity",
    "UI/UX Design",
    "Game Development",
    "Blockchain Technology",
    "Internet of Things (IoT)",
    "Software Testing",
    "Digital Marketing",
    "Product Management",
    "Others",
  ];

  const academicYears = [
    "1st Year",
    "2nd Year", 
    "3rd Year",
    "4th Year",
    "Final Year",
    "Post Graduate"
  ];

  const durationOptions = [
    {
      id: "1-month",
      name: "1 Month",
      duration: "1 Month",
      price: "₹499",
      description: "Perfect for getting started with tech internship experience",
      recommended: false,
    },
    {
      id: "3-months",
      name: "3 Months", 
      duration: "3 Months",
      price: "₹1,497",
      originalPrice: "₹1,497",
      description: "Ideal for building substantial project experience",
      recommended: true,
    },
    {
      id: "6-months",
      name: "6 Months",
      duration: "6 Months", 
      price: "₹2,994",
      originalPrice: "₹2,994",
      description: "Comprehensive internship for deep industry exposure",
      recommended: false,
    },
    {
      id: "1-year",
      name: "1 Year",
      duration: "1 Year",
      price: "₹5,988",
      originalPrice: "₹5,988", 
      description: "Complete professional development program",
      recommended: false,
    },
  ];

  const internshipBenefits = [
    {
      id: 1,
      name: "Real Projects",
      description: "Work on actual industry projects with real-world impact and learning",
      icon: <Code size={24} className="text-blue-600" />,
      features: ["Live project assignments", "Code reviews", "Technical documentation"],
    },
    {
      id: 2,
      name: "Mentorship",
      description: "Get guidance from experienced professionals in your field",
      icon: <Users size={24} className="text-blue-600" />,
      features: ["1-on-1 mentoring sessions", "Career guidance", "Technical support"],
    },
    {
      id: 3,
      name: "Certification",
      description: "Receive industry-recognized certificates upon completion",
      icon: <GraduationCap size={24} className="text-blue-600" />,
      features: ["Completion certificate", "Skill assessments", "Portfolio development"],
    },
    {
      id: 4,
      name: "Job Assistance",
      description: "Get help with job placement and career opportunities",
      icon: <Briefcase size={24} className="text-blue-600" />,
      features: ["Resume building", "Interview preparation", "Job referrals"],
    },
  ];

  // Get user ID from auth context or localStorage
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user && user._id) {
        setFormData((prev) => ({
          ...prev,
          uid: user._id,
        }));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedDuration) {
      setFormErrors({ duration: "Please select an internship duration" });
      return;
    }

    setLoading(true);
    setError(null);
    const apiurl = import.meta.env.VITE_API_URL;

    try {
      const response = await axios.post(
        `${apiurl}/api/internships/tech-internship`,
        {
          ...formData,
          duration: selectedDuration,
        }
      );

      console.log("Tech internship applied:", response.data);
      setApplicationSuccess(true);

      // Scroll to success message
      setTimeout(() => {
        const successElement = document.getElementById("application-success");
        if (successElement) {
          successElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
    } catch (err) {
      console.error("Error applying for internship:", err);
      setError("Failed to submit your application. Please try again later.");

      // Scroll to error message
      setTimeout(() => {
        const errorElement = document.getElementById("error-message");
        if (errorElement) {
          errorElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  const handleDurationSelect = (durationId: string): void => {
    setSelectedDuration(durationId === selectedDuration ? null : durationId);

    // Clear duration error if it exists
    if (formErrors.duration) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated.duration;
        return updated;
      });
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      uid: formData.uid,
      name: formData.name,
      email: formData.email,
      contact: "",
      college: "",
      fieldOfInterest: "",
      duration: "",
      currentYear: "",
      specialization: "",
      experience: "",
      motivation: "",
    });
    setSelectedDuration(null);
    setApplicationSuccess(false);
    setError(null);
    setFormErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                text="Tech Internship Program"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-5xl font-bold"
              />
            </div>
            <SplitText
              text="Launch your tech career with our comprehensive paid internship program. Get hands-on experience, mentorship, and industry exposure for just ₹499/month."
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

      {/* Success Message */}
      {applicationSuccess && (
        <div id="application-success" className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-6 flex flex-col items-center text-center max-w-2xl mx-auto"
          >
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">
              Application Submitted!
            </h3>
            <p className="text-green-700 mb-4">
              Your tech internship application has been received successfully. We've sent a confirmation to your email.
            </p>
            <p className="text-green-600 mb-6">
              Our team will review your application and contact you within 48 hours with next steps and payment details.
            </p>
            <button
              onClick={resetForm}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Apply for Another Program
            </button>
          </motion.div>
        </div>
      )}

      {!applicationSuccess && (
        <>
          {/* Duration Selection Section */}
          <div className="container mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Choose Your Internship Duration
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Select the duration that best fits your learning goals and schedule
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {durationOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleDurationSelect(option.id)}
                  className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all hover:shadow-lg relative ${
                    selectedDuration === option.id ? "ring-2 ring-blue-500" : ""
                  } ${option.recommended ? "border-2 border-blue-500" : ""}`}
                >
                  {option.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Recommended
                      </span>
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 p-4 rounded-full mb-4">
                      <Clock size={24} className="text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {option.name}
                    </h3>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {option.price}
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">{option.description}</p>
                    <div className="flex items-center text-blue-600">
                      <IndianRupee size={16} className="mr-1" />
                      <span className="text-sm">₹499/month</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Duration selection error */}
            {formErrors.duration && (
              <div className="text-center mb-8">
                <p className="text-red-500 text-sm">{formErrors.duration}</p>
              </div>
            )}

            {/* Selected duration confirmation */}
            {selectedDuration && (
              <div className="flex justify-center mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-blue-800 max-w-md">
                    <p className="font-medium">
                      You've selected{" "}
                      <span className="font-bold">
                        {durationOptions.find((d) => d.id === selectedDuration)?.name}
                      </span>{" "}
                      internship
                    </p>
                    <p className="text-sm">
                      Total cost: {durationOptions.find((d) => d.id === selectedDuration)?.price}
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </div>

          {/* Benefits Section */}
          <div className="bg-blue-50 py-16">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                What You'll Get
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {internshipBenefits.map((benefit) => (
                  <div
                    key={benefit.id}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-blue-100 p-4 rounded-full mb-4">
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {benefit.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{benefit.description}</p>
                      <ul className="text-sm text-gray-500 space-y-1">
                        {benefit.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <Check size={12} className="text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Application Form Section */}
          <div className="bg-white py-16">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                  Apply for Tech Internship
                </h2>

                {/* Global error message */}
                {error && (
                  <div id="error-message" className="mb-8">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                        <p className="text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-8 border border-blue-100 relative overflow-hidden">
                  <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-200/30 blur-3xl"></div>

                  <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-blue-600 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-3 rounded-lg bg-blue-50 border ${
                          formErrors.name
                            ? "border-red-300 focus:ring-red-400"
                            : "border-blue-200 focus:ring-blue-400"
                        } text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                        required
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-red-500 text-sm">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-blue-600 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`w-full px-4 py-3 rounded-lg bg-blue-50 border ${
                          formErrors.email
                            ? "border-red-300 focus:ring-red-400"
                            : "border-blue-200 focus:ring-blue-400"
                        } text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                        required
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-red-500 text-sm">
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact"
                        className="block text-sm font-medium text-blue-600 mb-2"
                      >
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        className={`w-full px-4 py-3 rounded-lg bg-blue-50 border ${
                          formErrors.contact
                            ? "border-red-300 focus:ring-red-400"
                            : "border-blue-200 focus:ring-blue-400"
                        } text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                        required
                      />
                      {formErrors.contact && (
                        <p className="mt-1 text-red-500 text-sm">
                          {formErrors.contact}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="college"
                        className="block text-sm font-medium text-blue-600 mb-2"
                      >
                        College/University *
                      </label>
                      <input
                        type="text"
                        id="college"
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        placeholder="Enter your college name"
                        className={`w-full px-4 py-3 rounded-lg bg-blue-50 border ${
                          formErrors.college
                            ? "border-red-300 focus:ring-red-400"
                            : "border-blue-200 focus:ring-blue-400"
                        } text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                        required
                      />
                      {formErrors.college && (
                        <p className="mt-1 text-red-500 text-sm">
                          {formErrors.college}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="currentYear"
                        className="block text-sm font-medium text-blue-600 mb-2"
                      >
                        Current Academic Year *
                      </label>
                      <div className="relative">
                        <select
                          id="currentYear"
                          name="currentYear"
                          value={formData.currentYear}
                          onChange={handleChange}
                          className={`appearance-none w-full px-4 py-3 rounded-lg bg-blue-50 border ${
                            formErrors.currentYear
                              ? "border-red-300 focus:ring-red-400"
                              : "border-blue-200 focus:ring-blue-400"
                          } text-blue-800 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                          required
                        >
                          <option value="" disabled className="text-gray-600">
                            Select your current year
                          </option>
                          {academicYears.map((year) => (
                            <option
                              key={year}
                              value={year}
                              className="text-gray-800"
                            >
                              {year}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-500">
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
                      {formErrors.currentYear && (
                        <p className="mt-1 text-red-500 text-sm">
                          {formErrors.currentYear}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="specialization"
                        className="block text-sm font-medium text-blue-600 mb-2"
                      >
                        Specialization/Branch *
                      </label>
                      <input
                        type="text"
                        id="specialization"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        placeholder="e.g., Computer Science, IT, Electronics, etc."
                        className={`w-full px-4 py-3 rounded-lg bg-blue-50 border ${
                          formErrors.specialization
                            ? "border-red-300 focus:ring-red-400"
                            : "border-blue-200 focus:ring-blue-400"
                        } text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                        required
                      />
                      {formErrors.specialization && (
                        <p className="mt-1 text-red-500 text-sm">
                          {formErrors.specialization}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="fieldOfInterest"
                        className="block text-sm font-medium text-blue-600 mb-2"
                      >
                        Field of Interest *
                      </label>
                      <div className="relative">
                        <select
                          id="fieldOfInterest"
                          name="fieldOfInterest"
                          value={formData.fieldOfInterest}
                          onChange={handleChange}
                          className={`appearance-none w-full px-4 py-3 rounded-lg bg-blue-50 border ${
                            formErrors.fieldOfInterest
                              ? "border-red-300 focus:ring-red-400"
                              : "border-blue-200 focus:ring-blue-400"
                          } text-blue-800 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                          required
                        >
                          <option value="" disabled className="text-gray-600">
                            Select your field of interest
                          </option>
                          {techFields.map((field) => (
                            <option
                              key={field}
                              value={field}
                              className="text-gray-800"
                            >
                              {field}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-500">
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
                      {formErrors.fieldOfInterest && (
                        <p className="mt-1 text-red-500 text-sm">
                          {formErrors.fieldOfInterest}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="experience"
                        className="block text-sm font-medium text-blue-600 mb-2"
                      >
                        Previous Experience
                      </label>
                      <input
                        type="text"
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="Any relevant projects, internships, or skills"
                        className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="motivation"
                        className="block text-sm font-medium text-blue-600 mb-2"
                      >
                        Why do you want this internship? *
                      </label>
                      <textarea
                        id="motivation"
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleChange}
                        placeholder="Tell us about your career goals, what you hope to learn, and why you're interested in this field..."
                        rows={4}
                        className={`w-full px-4 py-3 rounded-lg bg-blue-50 border ${
                          formErrors.motivation
                            ? "border-red-300 focus:ring-red-400"
                            : "border-blue-200 focus:ring-blue-400"
                        } text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none`}
                        required
                      ></textarea>
                      {formErrors.motivation && (
                        <p className="mt-1 text-red-500 text-sm">
                          {formErrors.motivation}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2 mt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 ${
                          loading ? "opacity-80 cursor-not-allowed" : ""
                        }`}
                      >
                        {loading ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Submitting Application...</span>
                          </>
                        ) : (
                          <>
                            <span>Apply for Tech Internship</span>
                            <ArrowRight size={18} />
                          </>
                        )}
                      </button>

                      <div className="mt-4 text-center text-blue-500 text-sm">
                        Fields marked with * are required. Payment details will be shared after application review.
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Program Highlights Section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Program Highlights
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                <Briefcase size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Industry Experience
              </h3>
              <p className="text-gray-600">
                Work on real-world projects with modern technologies and industry-standard practices used by top companies.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Expert Mentorship
              </h3>
              <p className="text-gray-600">
                Get personalized guidance from experienced professionals who will help accelerate your learning journey.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Career Growth
              </h3>
              <p className="text-gray-600">
                Build a strong foundation for your tech career with certificates, portfolio projects, and job assistance.
              </p>
            </div>
          </div>

          {/* Pricing Info */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Affordable Investment in Your Future
              </h3>
              <div className="flex items-center justify-center mb-4">
                <IndianRupee size={32} className="text-blue-600" />
                <span className="text-4xl font-bold text-blue-600">499</span>
                <span className="text-gray-600 ml-2">/month</span>
              </div>
              <p className="text-gray-600 mb-6">
                Pay only ₹499 per month for comprehensive tech internship experience. 
                Duration can be extended from 1 month to 4 years based on your learning goals.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center justify-center p-3 bg-green-50 rounded-lg">
                  <Check size={16} className="text-green-600 mr-2" />
                  <span className="text-green-800">Real project work</span>
                </div>
                <div className="flex items-center justify-center p-3 bg-green-50 rounded-lg">
                  <Check size={16} className="text-green-600 mr-2" />
                  <span className="text-green-800">1-on-1 mentorship</span>
                </div>
                <div className="flex items-center justify-center p-3 bg-green-50 rounded-lg">
                  <Check size={16} className="text-green-600 mr-2" />
                  <span className="text-green-800">Industry certificate</span>
                </div>
                <div className="flex items-center justify-center p-3 bg-green-50 rounded-lg">
                  <Check size={16} className="text-green-600 mr-2" />
                  <span className="text-green-800">Job assistance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Who can apply for this internship?
              </h3>
              <p className="text-gray-600">
                Any college student from any year (1st to final year) and any specialization can apply. 
                We welcome students from all domains who are interested in technology.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                What is the payment structure?
              </h3>
              <p className="text-gray-600">
                The internship fee is ₹499 per month, payable monthly. You can choose duration from 1 month to 4 years 
                based on your learning goals and career plans.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                What kind of projects will I work on?
              </h3>
              <p className="text-gray-600">
                You'll work on real-world projects relevant to your field of interest, including web applications, 
                mobile apps, data analysis projects, AI/ML models, and more based on your chosen specialization.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Will I get a certificate?
              </h3>
              <p className="text-gray-600">
                Yes, you'll receive an industry-recognized completion certificate along with project completion certificates 
                that you can add to your resume and LinkedIn profile.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Is job assistance provided?
              </h3>
              <p className="text-gray-600">
                Yes, we provide comprehensive job assistance including resume building, interview preparation, 
                and connections with our partner companies for placement opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Internship;