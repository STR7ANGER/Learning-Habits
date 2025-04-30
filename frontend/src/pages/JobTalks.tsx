import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  Briefcase,
  Award,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";

const JobTalks = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jobInterest: "",
    date: "",
    time: "",
    message: "",
    level: "",
  });

  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  const jobInterests = [
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

  const experienceLevels = [
    "Entry Level",
    "Mid Level",
    "Senior Level",
    "Management",
    "Executive",
  ];

  const jobTalkTopics = [
    {
      id: 1,
      name: "Career Guidance",
      description:
        "Get personalized advice on career paths and growth opportunities",
      icon: <Briefcase size={24} className="text-blue-600" />,
      available: 8,
    },
    {
      id: 2,
      name: "Resume Review",
      description:
        "Professional feedback on your resume and application materials",
      icon: <MessageSquare size={24} className="text-blue-600" />,
      available: 12,
    },
    {
      id: 3,
      name: "Interview Preparation",
      description: "Practice technical and behavioral interviews with feedback",
      icon: <Users size={24} className="text-blue-600" />,
      available: 10,
    },
    {
      id: 4,
      name: "Skill Development",
      description:
        "Guidance on acquiring in-demand skills for your target role",
      icon: <Award size={24} className="text-blue-600" />,
      available: 7,
    },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const handleTopicSelect = (topicId: number): void => {
    setSelectedTopic(topicId === selectedTopic ? null : topicId);
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
                text="JobTalks Sessions"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-5xl font-bold"
              />
            </div>
            <SplitText
              text="Book personalized career consultation sessions with industry experts who can guide your professional journey."
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

      {/* Topic Selection Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Select Your Session Type
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Choose the type of career support you need from our expert advisors
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {jobTalkTopics.map((topic) => (
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
                    {jobTalkTopics.find((t) => t.id === selectedTopic)?.name}
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
              Book Your JobTalks Session
            </h2>

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
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-blue-600 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="jobInterest"
                    className="block text-sm font-medium text-blue-600 mb-2"
                  >
                    Job Interest
                  </label>
                  <div className="relative">
                    <select
                      id="jobInterest"
                      name="jobInterest"
                      value={formData.jobInterest}
                      onChange={handleChange}
                      className="appearance-none w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      required
                    >
                      <option value="" disabled className="text-gray-600">
                        Select your job interest
                      </option>
                      {jobInterests.map((job) => (
                        <option key={job} value={job} className="text-gray-800">
                          {job}
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
                </div>

                <div>
                  <label
                    htmlFor="level"
                    className="block text-sm font-medium text-blue-600 mb-2"
                  >
                    Experience Level
                  </label>
                  <div className="relative">
                    <select
                      id="level"
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className="appearance-none w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      required
                    >
                      <option value="" disabled className="text-gray-600">
                        Select your experience level
                      </option>
                      {experienceLevels.map((level) => (
                        <option
                          key={level}
                          value={level}
                          className="text-gray-800"
                        >
                          {level}
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
                </div>

                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-blue-600 mb-2"
                  >
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-blue-600 mb-2"
                  >
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-blue-600 mb-2"
                  >
                    Your Career Goals & Questions
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share details about your career goals, specific questions you have, or what you hope to gain from this session..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all resize-none"
                    required
                  ></textarea>
                </div>

                <div className="md:col-span-2 mt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
                  >
                    <span>Book JobTalks Session</span>
                    <ArrowRight size={18} />
                  </button>

                  <div className="mt-4 text-center text-blue-500 text-sm">
                    Our career advisors typically respond within 24 hours to
                    confirm your booking.
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

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
                Personalized Guidance
              </h3>
              <p className="text-gray-600">
                Receive tailored career advice specific to your industry,
                skills, and career goals.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Expert Insights
              </h3>
              <p className="text-gray-600">
                Gain insider knowledge and perspectives from professionals with
                real-world experience.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Action Plan
              </h3>
              <p className="text-gray-600">
                Walk away with concrete next steps and resources to advance your
                career journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobTalks;
