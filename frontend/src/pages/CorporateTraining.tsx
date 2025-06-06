import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Code,
  ArrowRight,
  Building2,
  Target,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";

const CorporateTraining = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    trainingType: "",
    teamSize: "",
    duration: "",
    preferredDate: "",
    budget: "",
    specificRequirements: "",
    industryType: "",
  });

  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const trainingTypes = [
    "Technical Skills Development",
    "Leadership & Management",
    "Digital Transformation",
    "Data Analytics & AI",
    "Cybersecurity Awareness",
    "Project Management",
    "Communication & Soft Skills",
    "Sales & Marketing",
    "Customer Service Excellence",
    "Compliance & Regulatory",
    "Innovation & Creativity",
    "Custom Training Program",
  ];

  const teamSizes = [
    "5-10 employees",
    "11-25 employees",
    "26-50 employees",
    "51-100 employees",
    "100+ employees",
  ];

  const budgetRanges = [
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000+",
    "Custom Quote Required",
  ];

  const industryTypes = [
    "Technology",
    "Healthcare",
    "Finance & Banking",
    "Manufacturing",
    "Retail & E-commerce",
    "Education",
    "Government",
    "Non-profit",
    "Consulting",
    "Other",
  ];

  const trainingPrograms = [
    {
      id: 1,
      name: "Technical Excellence",
      description:
        "Comprehensive technical training programs for software development, DevOps, and emerging technologies",
      icon: <Code size={24} className="text-blue-600" />,
      duration: "2-12 weeks",
      participants: "5-50",
    },
    {
      id: 2,
      name: "Leadership Development",
      description:
        "Executive coaching and leadership skills development for managers and senior professionals",
      icon: <Target size={24} className="text-blue-600" />,
      duration: "4-16 weeks",
      participants: "5-30",
    },
    {
      id: 3,
      name: "Digital Transformation",
      description:
        "Strategic training on digital tools, processes, and organizational change management",
      icon: <TrendingUp size={24} className="text-blue-600" />,
      duration: "1-8 weeks",
      participants: "10-100",
    },
    {
      id: 4,
      name: "Innovation Workshops",
      description:
        "Creative problem-solving, design thinking, and innovation methodology training",
      icon: <Lightbulb size={24} className="text-blue-600" />,
      duration: "1-4 weeks",
      participants: "8-40",
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

  const handleProgramSelect = (programId: number): void => {
    setSelectedProgram(programId === selectedProgram ? null : programId);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus(null);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitStatus({
        success: true,
        message:
          "Training request submitted successfully! We'll contact you within 24 hours.",
      });

      // Reset form after successful submission
      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        trainingType: "",
        teamSize: "",
        duration: "",
        preferredDate: "",
        budget: "",
        specificRequirements: "",
        industryType: "",
      });
      setSelectedProgram(null);
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Failed to submit request. Please try again.",
      });
    }
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
          className="absolute inset-0 opacity-60"
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6">
              <BlurText
                text="Corporate Training Solutions"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-5xl font-bold"
              />
            </div>
            <SplitText
              text="Transform your workforce with customized training programs designed to enhance skills, boost productivity, and drive organizational success."
              className="text-xl text-gray-200 max-w-2xl mx-auto"
              delay={10}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            />
          </div>
        </div>
      </div>

      {/* Program Selection Section */}
      <div className="container mx-auto px-6 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl font-bold text-gray-800 mb-8 text-center"
        >
          Choose Your Training Program
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-600 text-center max-w-2xl mx-auto mb-12"
        >
          Select the training program that best fits your organization's needs
          and goals
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trainingPrograms.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              onClick={() => handleProgramSelect(program.id)}
              className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                selectedProgram === program.id
                  ? "ring-2 ring-blue-500 scale-105"
                  : ""
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  {program.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {program.name}
                </h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <div className="space-y-2 text-sm text-blue-600">
                  <div className="flex items-center justify-center">
                    <span>Duration: {program.duration}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Users size={14} className="mr-1" />
                    <span>{program.participants} participants</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected program action button */}
        {selectedProgram && (
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
                      trainingPrograms.find((p) => p.id === selectedProgram)
                        ?.name
                    }
                  </span>
                </p>
                <p className="text-sm">
                  Fill out the form below to get a customized proposal
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Request Form Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-center text-gray-800 mb-12"
            >
              Request Corporate Training
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-8 border border-blue-100 relative overflow-hidden"
            >
              <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-200/30 blur-3xl"></div>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-blue-600 mb-2"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter your company name"
                    className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contactPerson"
                    className="block text-sm font-medium text-blue-600 mb-2"
                  >
                    Contact Person
                  </label>
                  <input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder="Your full name"
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
                    placeholder="company@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-blue-600 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="industryType"
                    className="block text-sm font-medium text-blue-600 mb-2"
                  >
                    Industry Type
                  </label>
                  <div className="relative">
                    <select
                      id="industryType"
                      name="industryType"
                      value={formData.industryType}
                      onChange={handleChange}
                      className="appearance-none w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      required
                    >
                      <option value="" disabled className="text-gray-600">
                        Select your industry
                      </option>
                      {industryTypes.map((industry) => (
                        <option
                          key={industry}
                          value={industry}
                          className="text-gray-800"
                        >
                          {industry}
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
                    htmlFor="trainingType"
                    className="block text-sm font-medium text-blue-600 mb-2"
                  >
                    Training Type
                  </label>
                  <div className="relative">
                    <select
                      id="trainingType"
                      name="trainingType"
                      value={formData.trainingType}
                      onChange={handleChange}
                      className="appearance-none w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      required
                    >
                      <option value="" disabled className="text-gray-600">
                        Select training type
                      </option>
                      {trainingTypes.map((type) => (
                        <option
                          key={type}
                          value={type}
                          className="text-gray-800"
                        >
                          {type}
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
                    htmlFor="teamSize"
                    className="block text-sm font-medium text-blue-600 mb-2"
                  >
                    Team Size
                  </label>
                  <div className="relative">
                    <select
                      id="teamSize"
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      className="appearance-none w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      required
                    >
                      <option value="" disabled className="text-gray-600">
                        Select team size
                      </option>
                      {teamSizes.map((size) => (
                        <option
                          key={size}
                          value={size}
                          className="text-gray-800"
                        >
                          {size}
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
                    htmlFor="duration"
                    className="block text-sm font-medium text-blue-600 mb-2"
                  >
                    Preferred Duration
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 2 weeks, 1 month"
                    className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="preferredDate"
                    className="block text-sm font-medium text-blue-600 mb-2"
                  >
                    Preferred Start Date
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-blue-600 mb-2"
                  >
                    Budget Range
                  </label>
                  <div className="relative">
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="appearance-none w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      required
                    >
                      <option value="" disabled className="text-gray-600">
                        Select budget range
                      </option>
                      {budgetRanges.map((range) => (
                        <option
                          key={range}
                          value={range}
                          className="text-gray-800"
                        >
                          {range}
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

                <div className="md:col-span-2">
                  <label
                    htmlFor="specificRequirements"
                    className="block text-sm font-medium text-blue-600 mb-2"
                  >
                    Specific Requirements & Objectives
                  </label>
                  <textarea
                    id="specificRequirements"
                    name="specificRequirements"
                    value={formData.specificRequirements}
                    onChange={handleChange}
                    placeholder="Describe your training objectives, current skill gaps, specific technologies or methodologies to focus on, delivery preferences (on-site, remote, hybrid), and any other requirements..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all resize-none"
                    required
                  ></textarea>
                </div>

                <div className="md:col-span-2 mt-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
                  >
                    <span>Request Training Proposal</span>
                    <ArrowRight size={18} />
                  </motion.button>

                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 text-center p-3 rounded-lg ${
                        submitStatus.success
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {submitStatus.message}
                    </motion.div>
                  )}

                  <div className="mt-4 text-center text-blue-500 text-sm">
                    Our corporate training specialists will contact you within
                    24 hours with a customized proposal.
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            What We Offer
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                <Building2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Customized Programs
              </h3>
              <p className="text-gray-600">
                Tailored training solutions designed specifically for your
                organization's needs, culture, and objectives.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Expert Instructors
              </h3>
              <p className="text-gray-600">
                Industry-leading professionals and certified trainers with
                real-world experience and proven methodologies.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Measurable Results
              </h3>
              <p className="text-gray-600">
                Comprehensive assessments, progress tracking, and ROI
                measurement to ensure training effectiveness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateTraining;
