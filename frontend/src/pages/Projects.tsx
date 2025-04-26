import { Clock, MapPin, Download, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";

// Define interfaces for our data structures
interface Project {
  id: number;
  name: string;
  description: string;
  tags: string[];
  duration: string;
  location: string;
  image: string;
  pdfUrl: string;
  price: string;
}

const Projects = () => {
  // Sample project data using all the categories you provided
  const projects: Project[] = [
    {
      id: 1,
      name: "AI Chatbot Assistant",
      description:
        "An intelligent conversational agent that provides customer support, information retrieval, and task automation across multiple platforms.",
      tags: ["AI Chatbot", "NLP", "Machine Learning"],
      duration: "3 months",
      location: "Remote",
      image: "/api/placeholder/400/200",
      pdfUrl: "#",
      price: "$499",
    },
    {
      id: 2,
      name: "ML Data Analysis Platform",
      description:
        "Advanced machine learning solution that processes and analyzes large datasets to extract meaningful patterns and predictions.",
      tags: ["AI Data Scientist", "Machine Learning", "Big Data"],
      duration: "5 months",
      location: "Remote",
      image: "/api/placeholder/400/200",
      pdfUrl: "#",
      price: "$899",
    },
    {
      id: 3,
      name: "Virtual Reality Training",
      description:
        "Immersive VR training environment for high-risk industries with realistic simulations and interactive learning modules.",
      tags: ["AR-VR", "3D Modeling", "Training"],
      duration: "4 months",
      location: "Remote",
      image: "/api/placeholder/400/200",
      pdfUrl: "#",
      price: "$1299",
    },
    {
      id: 4,
      name: "Supply Chain Ledger",
      description:
        "Transparent blockchain solution for tracking products throughout the supply chain with immutable record-keeping.",
      tags: ["Blockchain", "Smart Contracts", "Supply Chain"],
      duration: "6 months",
      location: "Remote",
      image: "/api/placeholder/400/200",
      pdfUrl: "#",
      price: "$899",
    },
    {
      id: 5,
      name: "Enterprise Cloud Migration",
      description:
        "Comprehensive cloud migration strategy and implementation for scalable, secure enterprise infrastructure.",
      tags: ["Cloud", "AWS", "Azure"],
      duration: "7 months",
      location: "Remote",
      image: "/api/placeholder/400/200",
      pdfUrl: "#",
      price: "$1499",
    },
    {
      id: 6,
      name: "ETL Pipeline Solution",
      description:
        "Robust data pipeline for extracting, transforming, and loading data from multiple sources into unified storage systems.",
      tags: ["Data Engineer", "ETL", "Big Data"],
      duration: "3 months",
      location: "Remote",
      image: "/api/placeholder/400/200",
      pdfUrl: "#",
      price: "$799",
    },
    {
      id: 7,
      name: "Analytics Dashboard",
      description:
        "Interactive visualization platform that transforms complex data into intuitive charts and actionable insights.",
      tags: ["Data Visualization", "Analytics", "Dashboard"],
      duration: "2 months",
      location: "Remote",
      image: "/api/placeholder/400/200",
      pdfUrl: "#",
      price: "$599",
    },
    {
      id: 8,
      name: "CI/CD Pipeline Implementation",
      description:
        "Automated development workflow with continuous integration and delivery for faster, more reliable software releases.",
      tags: ["DevOps", "CI/CD", "Automation"],
      duration: "4 months",
      location: "Remote",
      image: "/api/placeholder/400/200",
      pdfUrl: "#",
      price: "$899",
    },
    {
      id: 9,
      name: "Web Application Platform",
      description:
        "Complete end-to-end web solution with responsive frontend, robust backend, and seamless database integration.",
      tags: ["Fullstack", "JavaScript", "Node.js"],
      duration: "6 months",
      location: "Remote",
      image: "/api/placeholder/400/200",
      pdfUrl: "#",
      price: "$1299",
    },
    {
      id: 10,
      name: "Microservices Architecture",
      description:
        "High-performance, scalable microservices built with Golang for efficient resource utilization and rapid deployment.",
      tags: ["Golang", "Microservices", "Cloud Native"],
      duration: "5 months",
      location: "Remote",
      image: "/api/placeholder/400/200",
      pdfUrl: "#",
      price: "$999",
    },
    {
      id: 11,
      name: "Cross-Platform Mobile App",
      description:
        "Feature-rich mobile application that works seamlessly across iOS and Android with native-like performance.",
      tags: ["Mobile Dev", "React Native", "Flutter"],
      duration: "4 months",
      location: "Remote",
      image: "/api/placeholder/400/200",
      pdfUrl: "#",
      price: "$899",
    },
    {
      id: 12,
      name: "Automated Testing Framework",
      description:
        "Comprehensive testing solution with automated unit, integration, and end-to-end tests for quality assurance.",
      tags: ["QA", "Test Automation", "Selenium"],
      duration: "3 months",
      location: "Remote",
      image: "/api/placeholder/400/200",
      pdfUrl: "#",
      price: "$699",
    },
    {
      id: 13,
      name: "High-Performance Systems",
      description:
        "Memory-safe, concurrent systems programming solution built with Rust for maximum performance and reliability.",
      tags: ["Rust", "Systems Programming", "Performance"],
      duration: "5 months",
      location: "Remote",
      image: "/api/placeholder/400/200",
      pdfUrl: "#",
      price: "$1099",
    },
    {
      id: 14,
      name: "Enterprise Java Platform",
      description:
        "Scalable enterprise solution with Java backend, Spring framework, and comprehensive business logic implementation.",
      tags: ["Java", "Spring", "Enterprise"],
      duration: "6 months",
      location: "Remote",
      image: "/api/placeholder/400/200",
      pdfUrl: "#",
      price: "$1199",
    },
    {
      id: 15,
      name: "High-Performance Computing",
      description:
        "Optimized C++ solution for compute-intensive applications requiring maximum processing efficiency.",
      tags: ["CPP", "HPC", "Optimization"],
      duration: "7 months",
      location: "Remote",
      image: "/api/placeholder/400/200",
      pdfUrl: "#",
      price: "$1299",
    },
    {
      id: 16,
      name: "Data Science Toolkit",
      description:
        "Python-based data science solution with machine learning models, data processing, and predictive analytics.",
      tags: ["Python", "Data Science", "ML/AI"],
      duration: "4 months",
      location: "Remote",
      image: "/api/placeholder/400/200",
      pdfUrl: "#",
      price: "$899",
    },
  ];

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

      <div className="container mx-auto py-12">
        {/* Grid of all project cards with better spacing */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">
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
                <p className="text-gray-600 mb-6">{project.description}</p>

                {/* Project info */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock size={16} className="mr-1" />
                  <span>Duration: {project.duration}</span>
                </div>

                {/* Location */}
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <MapPin size={16} className="mr-1" />
                  <span>{project.location}</span>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center">
                    <Download size={18} className="mr-2" />
                    Download PDF
                  </button>
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center">
                    <ShoppingCart size={18} className="mr-2" />
                    Buy {project.price}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
