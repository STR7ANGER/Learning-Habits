import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  Code,
  Book,
  ArrowRight,
  Check,
  AlertCircle,
  Loader2,
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
  techInterest: string;
  techSpecifics: string;
  date: string;
  time: string;
  message: string;
}

const TechnologyLearning = () => {
  const [formData, setFormData] = useState<FormData>({
    uid: "", // Will be set from auth context
    name: "",
    email: "",
    techInterest: "",
    techSpecifics: "",
    date: "",
    time: "",
    message: "",
  });

  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const techInterests = [
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
    "Mobile Development",
    "Cloud Computing",
    "DevOps",
    "Data Science",
    "Blockchain",
    "AR/VR",
    "Cybersecurity",
    "Internet of Things",
    "Game Development",
    "UI/UX Design",
    "Robotics",
    "Others",
  ];

  const techLearningTopics = [
    {
      id: 1,
      name: "Personalized Learning Path",
      description:
        "Get a custom learning roadmap tailored to your goals and current skill level",
      icon: <Book size={24} className="text-blue-600" />,
      available: 10,
    },
    {
      id: 2,
      name: "Technical Mentorship",
      description:
        "One-on-one guidance from experts to overcome challenges and accelerate learning",
      icon: <MessageSquare size={24} className="text-blue-600" />,
      available: 15,
    },
    {
      id: 3,
      name: "Hands-on Workshop",
      description:
        "Interactive sessions focused on practical skills with real-world projects",
      icon: <Code size={24} className="text-blue-600" />,
      available: 8,
    },
    {
      id: 4,
      name: "Technology Deep Dive",
      description:
        "Comprehensive exploration of specific technologies with industry experts",
      icon: <Users size={24} className="text-blue-600" />,
      available: 12,
    },
  ];

  // Get user ID from auth context or localStorage
  useEffect(() => {
    try {
      // This is a placeholder - in a real app, you would get this from your auth context
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

  // Calculate minimum bookable date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

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

    setLoading(true);
    setError(null);
    const apiurl = import.meta.env.VITE_API_URL;

    try {
      // Modified to remove the topicName field that was causing issues with the backend
      const response = await axios.post(
        `${apiurl}/api/sessions/tech-learning`,
        {
          ...formData,
          // Backend doesn't expect topicName, so we'll remove it
        }
      );

      console.log("Tech learning session booked:", response.data);
      setBookingSuccess(true);

      // Scroll to success message
      setTimeout(() => {
        const successElement = document.getElementById("booking-success");
        if (successElement) {
          successElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
    } catch (err) {
      console.error("Error booking session:", err);
      setError("Failed to book your session. Please try again later.");

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

  const handleTopicSelect = (topicId: number): void => {
    setSelectedTopic(topicId === selectedTopic ? null : topicId);

    // Clear topic error if it exists
    if (formErrors.topic) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated.topic;
        return updated;
      });
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      uid: formData.uid, // Keep the user ID
      name: formData.name, // Keep the name for convenience
      email: formData.email, // Keep the email for convenience
      techInterest: "",
      techSpecifics: "",
      date: "",
      time: "",
      message: "",
    });
    setSelectedTopic(null);
    setBookingSuccess(false);
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
                text="TechLearning Sessions"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-5xl font-bold"
              />
            </div>
            <SplitText
              text="Book personalized technology learning sessions with industry experts who can accelerate your technical growth and mastery."
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
      {bookingSuccess && (
        <div id="booking-success" className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-6 flex flex-col items-center text-center max-w-2xl mx-auto"
          >
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">
              Booking Successful!
            </h3>
            <p className="text-green-700 mb-4">
              Your TechLearning session has been scheduled. We've sent a
              confirmation to your email.
            </p>
            <p className="text-green-600 mb-6">
              An expert will contact you shortly to confirm the details of your
              session.
            </p>
            <button
              onClick={resetForm}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Book Another Session
            </button>
          </motion.div>
        </div>
      )}

      {!bookingSuccess && (
        <>
          {/* Topic Selection Section */}
          <div className="container mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Select Your Learning Format
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Choose the type of technology learning support that best fits your
              needs
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {techLearningTopics.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => handleTopicSelect(topic.id)}
                  className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all hover:shadow-lg ${
                    selectedTopic === topic.id ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 p-4 rounded-full mb-4">
                      {topic.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {topic.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{topic.description}</p>
                    <div className="flex items-center text-blue-600">
                      <Users size={16} className="mr-1" />
                      <span className="text-sm">
                        {topic.available} Experts Available
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Topic selection error */}
            {formErrors.topic && (
              <div className="text-center mb-8">
                <p className="text-red-500 text-sm">{formErrors.topic}</p>
              </div>
            )}

            {/* Selected topic action button */}
            {selectedTopic && (
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
                        {
                          techLearningTopics.find((t) => t.id === selectedTopic)
                            ?.name
                        }
                      </span>
                    </p>
                    <p className="text-sm">
                      Proceed to schedule your session below
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </div>

          {/* Booking Form Section */}
          <div className="bg-white py-16">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                  Book Your TechLearning Session
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
                        placeholder="Enter your name"
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
                        htmlFor="techInterest"
                        className="block text-sm font-medium text-blue-600 mb-2"
                      >
                        Technology Interest *
                      </label>
                      <div className="relative">
                        <select
                          id="techInterest"
                          name="techInterest"
                          value={formData.techInterest}
                          onChange={handleChange}
                          className={`appearance-none w-full px-4 py-3 rounded-lg bg-blue-50 border ${
                            formErrors.techInterest
                              ? "border-red-300 focus:ring-red-400"
                              : "border-blue-200 focus:ring-blue-400"
                          } text-blue-800 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                          required
                        >
                          <option value="" disabled className="text-gray-600">
                            Select your technology interest
                          </option>
                          {techInterests.map((tech) => (
                            <option
                              key={tech}
                              value={tech}
                              className="text-gray-800"
                            >
                              {tech}
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
                      {formErrors.techInterest && (
                        <p className="mt-1 text-red-500 text-sm">
                          {formErrors.techInterest}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="techSpecifics"
                        className="block text-sm font-medium text-blue-600 mb-2"
                      >
                        Technology Specifics
                      </label>
                      <input
                        type="text"
                        id="techSpecifics"
                        name="techSpecifics"
                        value={formData.techSpecifics}
                        onChange={handleChange}
                        placeholder="Specific frameworks, tools, or concepts"
                        className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-blue-600 mb-2"
                      >
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={getMinDate()}
                        className={`w-full px-4 py-3 rounded-lg bg-blue-50 border ${
                          formErrors.date
                            ? "border-red-300 focus:ring-red-400"
                            : "border-blue-200 focus:ring-blue-400"
                        } text-blue-800 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                        required
                      />
                      {formErrors.date && (
                        <p className="mt-1 text-red-500 text-sm">
                          {formErrors.date}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="time"
                        className="block text-sm font-medium text-blue-600 mb-2"
                      >
                        Preferred Time *
                      </label>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg bg-blue-50 border ${
                          formErrors.time
                            ? "border-red-300 focus:ring-red-400"
                            : "border-blue-200 focus:ring-blue-400"
                        } text-blue-800 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                        required
                      />
                      {formErrors.time && (
                        <p className="mt-1 text-red-500 text-sm">
                          {formErrors.time}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-blue-600 mb-2"
                      >
                        Your Learning Goals & Questions *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Share details about what you want to learn, specific technical questions you have, or what you hope to gain from this session..."
                        rows={4}
                        className={`w-full px-4 py-3 rounded-lg bg-blue-50 border ${
                          formErrors.message
                            ? "border-red-300 focus:ring-red-400"
                            : "border-blue-200 focus:ring-blue-400"
                        } text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none`}
                        required
                      ></textarea>
                      {formErrors.message && (
                        <p className="mt-1 text-red-500 text-sm">
                          {formErrors.message}
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
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <span>Book TechLearning Session</span>
                            <ArrowRight size={18} />
                          </>
                        )}
                      </button>

                      <div className="mt-4 text-center text-blue-500 text-sm">
                        Fields marked with * are required. Our technology
                        instructors typically respond within 24 hours to confirm
                        your booking.
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* What to Expect Section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            What to Expect
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Expert Knowledge
              </h3>
              <p className="text-gray-600">
                Learn directly from professionals with deep experience in your
                technology of interest.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Hands-on Practice
              </h3>
              <p className="text-gray-600">
                Apply what you learn with practical exercises and real-world
                examples to reinforce your understanding.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Personalized Resources
              </h3>
              <p className="text-gray-600">
                Receive curated learning materials and resources tailored to
                your specific learning goals and skill level.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyLearning;
