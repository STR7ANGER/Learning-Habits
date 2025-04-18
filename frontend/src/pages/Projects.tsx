import { useState } from "react";
import {
  Search,
  Filter,
  Code,
  Lightbulb,
  BookOpen,
  Users,
  User,
  ExternalLink,
  Clock,
  MapPin,
  Send,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";

// Define interfaces for our data structures
interface Author {
  name: string;
  role: string;
  avatar: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  tags: string[];
  authors: Author[];
  timeframe: string;
  image: string;
  featured: boolean;
  location: string;
}

const Projects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Project categories/tags
  const categories: string[] = [
    "All",
    "Web Development",
    "Mobile",
    "AI/ML",
    "Open Source",
    "Research",
  ];

  // Sample project data
  const projects: Project[] = [
    {
      id: 1,
      name: "EcoTrack Dashboard",
      description:
        "A comprehensive dashboard for monitoring environmental metrics and sustainability goals. Features real-time data visualization and predictive analytics.",
      tags: ["Web Development", "Data Visualization", "Environmental"],
      authors: [
        {
          name: "Alex Johnson",
          role: "Lead Developer",
          avatar: "/avatars/alex.jpg",
        },
        {
          name: "Sarah Chen",
          role: "UI/UX Designer",
          avatar: "/avatars/sarah.jpg",
        },
        {
          name: "Miguel Rodriguez",
          role: "Data Scientist",
          avatar: "/avatars/miguel.jpg",
        },
      ],
      timeframe: "3 months",
      image: "/projects/ecotrack.jpg",
      featured: true,
      location: "Environmental Research Center, North Campus",
    },
    {
      id: 2,
      name: "HealthPulse Mobile App",
      description:
        "A cross-platform mobile application that connects patients with healthcare providers. Includes appointment scheduling, medication reminders, and secure messaging.",
      tags: ["Mobile", "Healthcare", "React Native"],
      authors: [
        {
          name: "Jamie Smith",
          role: "Mobile Developer",
          avatar: "/avatars/jamie.jpg",
        },
        {
          name: "Priya Patel",
          role: "Backend Engineer",
          avatar: "/avatars/priya.jpg",
        },
      ],
      timeframe: "6 months",
      image: "/projects/healthpulse.jpg",
      featured: true,
      location: "Healthcare Innovation Lab, West Wing",
    },
    {
      id: 3,
      name: "NLP Text Summarizer",
      description:
        "An AI-powered tool that generates concise summaries of long documents. Uses advanced natural language processing techniques to maintain context and key points.",
      tags: ["AI/ML", "NLP", "Python"],
      authors: [
        {
          name: "David Kim",
          role: "ML Engineer",
          avatar: "/avatars/david.jpg",
        },
        {
          name: "Olivia Washington",
          role: "Data Scientist",
          avatar: "/avatars/olivia.jpg",
        },
      ],
      timeframe: "4 months",
      image: "/projects/nlp-summarizer.jpg",
      featured: false,
      location: "AI Research Lab, Main Building",
    },
    {
      id: 4,
      name: "OpenLibrary",
      description:
        "A community-driven digital library platform with distributed hosting capabilities. Contributors can add and categorize educational resources for free public access.",
      tags: ["Open Source", "Education", "Web Development"],
      authors: [
        {
          name: "Carlos Mendez",
          role: "Full Stack Developer",
          avatar: "/avatars/carlos.jpg",
        },
        {
          name: "Emma Wilson",
          role: "Content Strategist",
          avatar: "/avatars/emma.jpg",
        },
        {
          name: "Raj Patel",
          role: "DevOps Engineer",
          avatar: "/avatars/raj.jpg",
        },
      ],
      timeframe: "Ongoing",
      image: "/projects/openlibrary.jpg",
      featured: false,
      location: "Digital Commons, Library Building",
    },
    {
      id: 5,
      name: "Urban Mobility Research",
      description:
        "A comprehensive study on sustainable transportation solutions for urban environments. Includes traffic pattern analysis and public transit optimization recommendations.",
      tags: ["Research", "Urban Planning", "Data Analysis"],
      authors: [
        {
          name: "Dr. Lisa Chen",
          role: "Lead Researcher",
          avatar: "/avatars/lisa.jpg",
        },
        {
          name: "Marcus Johnson",
          role: "Urban Planner",
          avatar: "/avatars/marcus.jpg",
        },
      ],
      timeframe: "12 months",
      image: "/projects/urban-mobility.jpg",
      featured: false,
      location: "Urban Studies Center, East Campus",
    },
    {
      id: 6,
      name: "Quantum Computing Simulator",
      description:
        "An educational platform that simulates quantum computing principles. Features interactive visualizations and guided tutorials for quantum algorithms.",
      tags: ["Education", "Quantum Computing", "Web Development"],
      authors: [
        {
          name: "Dr. Ahmed Hassan",
          role: "Quantum Physicist",
          avatar: "/avatars/ahmed.jpg",
        },
        {
          name: "Julia Martinez",
          role: "Educational Designer",
          avatar: "/avatars/julia.jpg",
        },
      ],
      timeframe: "8 months",
      image: "/projects/quantum-simulator.jpg",
      featured: false,
      location: "Physics Department, Science Complex",
    },
    {
      id: 7,
      name: "SmartFarm IoT Platform",
      description:
        "An IoT solution for agricultural monitoring and automation. Collects soil, weather, and crop data to optimize irrigation and resource usage.",
      tags: ["IoT", "Agriculture", "Mobile"],
      authors: [
        {
          name: "Thomas Lee",
          role: "IoT Engineer",
          avatar: "/avatars/thomas.jpg",
        },
        {
          name: "Fatima Al-Zahra",
          role: "Embedded Systems Developer",
          avatar: "/avatars/fatima.jpg",
        },
        {
          name: "John Doe",
          role: "Agricultural Consultant",
          avatar: "/avatars/john.jpg",
        },
      ],
      timeframe: "10 months",
      image: "/projects/smartfarm.jpg",
      featured: true,
      location: "Agricultural Sciences Building, South Campus",
    },
    {
      id: 8,
      name: "Blockchain Voting System",
      description:
        "A secure and transparent election platform built on blockchain technology. Ensures voter privacy while maintaining public verifiability of results.",
      tags: ["Blockchain", "Security", "Web Development"],
      authors: [
        {
          name: "Nina Williams",
          role: "Blockchain Developer",
          avatar: "/avatars/nina.jpg",
        },
        {
          name: "Kwame Adu",
          role: "Cryptography Expert",
          avatar: "/avatars/kwame.jpg",
        },
      ],
      timeframe: "7 months",
      image: "/projects/blockchain-voting.jpg",
      featured: false,
      location: "Computer Science Building, Main Campus",
    },
  ];

  // Filter projects based on search and category
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.authors.some((author) =>
        author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      activeFilter === "all" ||
      project.tags.some(
        (tag) => tag.toLowerCase() === activeFilter.toLowerCase()
      );

    return matchesSearch && matchesCategory;
  });

  // Separate featured and regular projects
  const featuredProjects = filteredProjects.filter(
    (project) => project.featured
  );
  const regularProjects = filteredProjects.filter(
    (project) => !project.featured
  );

  // Function to get icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "web development":
        return <Code size={16} />;
      case "mobile":
        return <Lightbulb size={16} />;
      case "ai/ml":
        return <BookOpen size={16} />;
      case "open source":
        return <Users size={16} />;
      case "research":
        return <BookOpen size={16} />;
      default:
        return <Code size={16} />;
    }
  };

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
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
                text="Project Showcase"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-5xl font-bold"
              />
            </div>
            <SplitText
              text="Explore a diverse collection of innovative projects across multiple disciplines and technologies."
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

      <div className="container mx-auto px-4 py-12">
        {/* Search and filters */}
        <div className="mb-10 bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="relative w-full md:w-1/3">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search projects, technologies, or team members..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="flex items-center mr-2 text-gray-700">
                <Filter size={18} className="mr-1" /> Categories:
              </span>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === category.toLowerCase()
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() =>
                    setActiveFilter(
                      category === "All" ? "all" : category.toLowerCase()
                    )
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Lightbulb className="mr-2 text-yellow-500" size={24} />
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  onClick={() => openProjectDetails(project)}
                >
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-2xl font-bold text-white">
                        {project.name}
                      </h3>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-xs font-medium text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-6">{project?.description}</p>

                    {/* Project info */}
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Clock size={16} className="mr-1" />
                      <span>Duration: {project?.timeframe}</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <MapPin size={16} className="mr-1" />
                      <span>{project?.location}</span>
                    </div>

                    {/* Authors */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Team Members:
                      </h4>
                      <div className="space-y-2">
                        {project.authors.map((author, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                              <User size={14} className="text-gray-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {author?.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {author?.role}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-4 py-2 rounded-md">
                        View Details <ExternalLink size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Projects */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            All Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => openProjectDetails(project)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-800">
                      {project.name}
                    </h3>
                    <div className="flex gap-1">
                      {project.tags.slice(0, 1).map((tag, index) => (
                        <span
                          key={index}
                          className="flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                        >
                          {getCategoryIcon(tag)}
                          <span className="ml-1">{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Project timeframe and location */}
                  <div className="text-xs text-gray-500 mb-2 flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>{project.timeframe}</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-4 flex items-center">
                    <MapPin size={14} className="mr-1" />
                    <span>{project.location}</span>
                  </div>

                  {/* Authors */}
                  <div className="flex flex-wrap items-center mb-4">
                    <span className="text-xs text-gray-500 mr-2">Team:</span>
                    <div className="flex -space-x-2">
                      {project.authors.slice(0, 3).map((author, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center border border-white"
                          title={`${author.name} - ${author.role}`}
                        >
                          {author.avatar ? (
                            <img
                              src={author.avatar}
                              alt={author.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full rounded-full flex items-center justify-center bg-blue-100 text-blue-600 text-xs font-medium">
                              {author.name.charAt(0)}
                            </div>
                          )}
                        </div>
                      ))}
                      {project.authors.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium border border-white">
                          +{project.authors.length - 3}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end mt-2">
                    <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center">
                      Details <ExternalLink size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <Search size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No projects found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
              <div className="absolute inset-0 bg-black opacity-20"></div>
              <button
                className="absolute top-4 right-4 bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-colors"
                onClick={closeProjectDetails}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-3xl font-bold text-white">
                  {selectedProject.name}
                </h3>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedProject.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-xs font-medium text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">
                    Project Overview
                  </h4>
                  <p className="text-gray-600 mb-6">
                    {selectedProject?.description}
                  </p>

                  <h4 className="text-xl font-bold text-gray-800 mb-4">
                    Project Details
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3 mb-6">
                    <div className="flex items-start">
                      <Clock size={20} className="text-blue-600 mr-3 mt-1" />
                      <div>
                        <h5 className="font-medium text-gray-700">Timeline</h5>
                        <p className="text-gray-600">
                          {selectedProject?.timeframe}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin size={20} className="text-blue-600 mr-3 mt-1" />
                      <div>
                        <h5 className="font-medium text-gray-700">Location</h5>
                        <p className="text-gray-600">
                          {selectedProject?.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-gray-800 mb-4">
                    Project Goals
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                    <li>
                      Develop innovative solutions for real-world problems
                    </li>
                    <li>
                      Create a platform for collaboration between different
                      domains
                    </li>
                    <li>
                      Implement cutting-edge technology to improve efficiency
                    </li>
                    <li>
                      Provide learning opportunities for students and
                      researchers
                    </li>
                  </ul>

                  <div className="mt-8">
                    <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors flex items-center justify-center">
                      <Send size={18} className="mr-2" />
                      Request to Join Project
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4">
                    Team Members
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-4">
                      {selectedProject.authors.map((author, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <User size={18} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              {author.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {author.role}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">
                      Contact Information
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <a
                        href="#"
                        className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <Mail size={18} className="mr-2" />
                        project-contact@example.com
                      </a>
                      <a
                        href="#"
                        className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <ExternalLink size={18} className="mr-2" />
                        Project Website
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call-to-action section */}
      <div className="bg-blue-800 text-white py-12 relative overflow-hidden mt-16">
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
          <h2 className="text-3xl font-bold mb-4">Have a Project Idea?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            We're always looking for innovative project proposals and
            collaborations.
          </p>
          <button className="bg-white text-blue-800 font-bold py-3 px-8 rounded-md hover:bg-blue-100 transition-colors">
            Submit Your Proposal
          </button>
        </div>
      </div>

      {/* FAQ section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-3">
                How can I join a project?
              </h3>
              <p className="text-gray-700">
                You can request to join a project by viewing its details and
                clicking the "Request to Join Project" button. The project lead
                will review your request and get back to you.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-3">
                Can I propose my own project?
              </h3>
              <p className="text-gray-700">
                Yes! We welcome new project proposals. Click on the "Submit Your
                Proposal" button and fill out the project proposal form with
                your idea and required resources.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-3">
                Are there any funding opportunities?
              </h3>
              <p className="text-gray-700">
                Selected projects may be eligible for funding through our
                innovation grants program. Details about funding opportunities
                are shared with project teams during the review process.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-3">
                How long do projects typically last?
              </h3>
              <p className="text-gray-700">
                Project durations vary based on scope and complexity. Most
                projects run between 3-12 months, but some ongoing research
                projects may continue for longer periods.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
