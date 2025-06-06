import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Calendar,
  CheckCircle,
  Users,
  MessageSquare,
  FileText,
  Presentation,
  Mail,
  Phone,
  Building,
} from "lucide-react";

interface FormData {
  uid: string;
  name: string;
  email: string;
  company: string;
  jobTitle: string;
  communicationType: string;
  specificArea: string;
  experienceLevel: string;
  date: string;
  time: string;
  sessionFormat: string;
  goals: string;
}

const BusinessComs: React.FC = () => {
  // Available communication types
  const communicationTypes = [
    "Executive Presentation Skills",
    "Business Writing & Email",
    "Meeting Facilitation",
    "Client Communication",
    "Team Leadership Communication",
    "Cross-Cultural Business Communication",
    "Negotiation & Persuasion",
    "Public Speaking",
    "Digital Communication",
    "Crisis Communication",
    "Sales Communication",
    "Others",
  ];

  const experienceLevels = [
    "Entry Level (0-2 years)",
    "Mid-Level (3-5 years)",
    "Senior Level (6-10 years)",
    "Executive Level (10+ years)",
  ];

  const sessionFormats = [
    "1-on-1 Coaching",
    "Small Group Workshop (2-5 people)",
    "Team Training Session",
    "Department Workshop",
  ];

  // State
  const [formData, setFormData] = useState<FormData>({
    uid: "",
    name: "",
    email: "",
    company: "",
    jobTitle: "",
    communicationType: "",
    specificArea: "",
    experienceLevel: "",
    date: "",
    time: "",
    sessionFormat: "",
    goals: "",
  });

  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get user ID from auth context or localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
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
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Business Communication session booking:", formData);
      setBookingSuccess(true);
    } catch (err) {
      console.error("Error booking session:", err);
      setError("Failed to book session. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form for new booking
  const resetForm = () => {
    setFormData({
      uid: formData.uid,
      name: "",
      email: "",
      company: "",
      jobTitle: "",
      communicationType: "",
      specificArea: "",
      experienceLevel: "",
      date: "",
      time: "",
      sessionFormat: "",
      goals: "",
    });
    setBookingSuccess(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero section with professional gradient */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Professional Business Communication
              </h1>
            </div>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Master the art of professional communication with expert-led
              training sessions. Enhance your presentation skills, business
              writing, and executive presence to advance your career.
            </p>
          </div>
        </div>
      </div>

      {/* Main content area with booking form */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left content - Booking form */}
          <div className="lg:w-2/3 bg-white rounded-xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <MessageSquare className="text-indigo-600 mr-3" size={32} />
              <h2 className="text-3xl font-bold text-gray-800">
                Book Your Communication Training
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mb-8 text-lg">
              Enhance your professional communication skills with personalized
              training from experienced business communication experts and
              executive coaches.
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
                <p className="font-medium">Error: {error}</p>
              </div>
            )}

            {!bookingSuccess ? (
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Professional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Job Title/Role
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Communication Focus */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Communication Focus Area
                    </label>
                    <div className="relative">
                      <select
                        name="communicationType"
                        value={formData.communicationType}
                        onChange={handleInputChange}
                        className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      >
                        <option value="" disabled>
                          Select focus area
                        </option>
                        {communicationTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
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
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Experience Level
                    </label>
                    <div className="relative">
                      <select
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleInputChange}
                        className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      >
                        <option value="" disabled>
                          Select experience level
                        </option>
                        {experienceLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
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
                </div>

                {/* Specific Area */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Specific Area of Interest (Optional)
                  </label>
                  <input
                    type="text"
                    name="specificArea"
                    value={formData.specificArea}
                    onChange={handleInputChange}
                    placeholder="e.g., Board presentations, Team meetings, Client proposals, etc."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Session Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Session Format
                    </label>
                    <div className="relative">
                      <select
                        name="sessionFormat"
                        value={formData.sessionFormat}
                        onChange={handleInputChange}
                        className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      >
                        <option value="" disabled>
                          Select format
                        </option>
                        {sessionFormats.map((format) => (
                          <option key={format} value={format}>
                            {format}
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
                </div>

                {/* Goals */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    What are your communication goals?
                  </label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Describe what you'd like to achieve from this training session..."
                    required
                  ></textarea>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full ${
                      loading
                        ? "bg-indigo-400"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    } text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center text-lg shadow-lg hover:shadow-xl`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Calendar size={20} className="mr-2" />
                        Book Communication Training
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-green-100 p-6 rounded-full inline-flex mb-6">
                  <CheckCircle size={48} className="text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  Training Session Booked!
                </h3>
                <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
                  Thank you for booking your business communication training.
                  We'll send you a confirmation email with session details
                  shortly.
                </p>
                <button
                  onClick={resetForm}
                  className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
                >
                  Book Another Session
                </button>
              </div>
            )}
          </div>

          {/* Right sidebar - Training types and benefits */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="font-bold text-xl text-gray-800 mb-6 flex items-center">
                <Presentation size={24} className="mr-3 text-indigo-600" />
                Training Programs
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <FileText
                    size={18}
                    className="text-indigo-600 mr-3 mt-1 flex-shrink-0"
                  />
                  <div>
                    <span className="font-semibold text-gray-800 block">
                      Executive Presentation Mastery
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      Command the boardroom with confident, persuasive
                      presentations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail
                    size={18}
                    className="text-indigo-600 mr-3 mt-1 flex-shrink-0"
                  />
                  <div>
                    <span className="font-semibold text-gray-800 block">
                      Professional Writing Workshop
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      Craft compelling emails, reports, and business documents.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users
                    size={18}
                    className="text-indigo-600 mr-3 mt-1 flex-shrink-0"
                  />
                  <div>
                    <span className="font-semibold text-gray-800 block">
                      Leadership Communication
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      Inspire and influence teams through effective
                      communication.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone
                    size={18}
                    className="text-indigo-600 mr-3 mt-1 flex-shrink-0"
                  />
                  <div>
                    <span className="font-semibold text-gray-800 block">
                      Client Relationship Building
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      Master client communications and relationship management.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-xl text-gray-800 mb-6 flex items-center">
                <Building size={24} className="mr-3 text-purple-600" />
                Why Choose Our Training?
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3 flex-shrink-0">
                    <CheckCircle size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Expert Instructors
                    </h4>
                    <p className="text-sm text-gray-600">
                      Learn from certified communication coaches and industry
                      leaders.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3 flex-shrink-0">
                    <CheckCircle size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Practical Approach
                    </h4>
                    <p className="text-sm text-gray-600">
                      Real-world scenarios and hands-on practice sessions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3 flex-shrink-0">
                    <CheckCircle size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Measurable Results
                    </h4>
                    <p className="text-sm text-gray-600">
                      Track your progress and see immediate improvement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3 flex-shrink-0">
                    <CheckCircle size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Flexible Formats
                    </h4>
                    <p className="text-sm text-gray-600">
                      Individual coaching or group workshops to suit your needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Training Process
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Assessment
              </h3>
              <p className="text-gray-600 text-sm">
                Evaluate your current communication strengths and areas for
                improvement.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Customization
              </h3>
              <p className="text-gray-600 text-sm">
                Tailor the training program to your specific role and
                objectives.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Practice</h3>
              <p className="text-gray-600 text-sm">
                Engage in interactive exercises and real-world simulations.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Integration
              </h3>
              <p className="text-gray-600 text-sm">
                Apply learned skills immediately in your work environment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-action section */}
      <div className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Transform Your Professional Communication
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join professionals who have elevated their careers through
            exceptional communication skills. Start your journey to becoming a
            more confident and effective communicator today.
          </p>
          <button
            className="bg-white text-indigo-800 font-bold py-4 px-8 rounded-lg hover:bg-indigo-50 transition-colors shadow-lg text-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Your Communication Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessComs;
