import { useState, useEffect } from "react";
import { Clock, MapPin, Download, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import { useNavigate } from "react-router-dom";

// Define interfaces for our data structures
interface Project {
  _id: string;
  name: string;
  description: string;
  duration: string;
  location: string;
  image: string;
  pdfFile: string;
  price: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/api/project/all`);

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const result = await response.json();

        if (result.success) {
          setProjects(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch projects");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Function to handle PDF download
  const handleDownload = (pdfFile: string) => {
    // Check if the URL is valid
    if (pdfFile && pdfFile !== "#") {
      window.open(pdfFile, "_blank");
    }
  };

  const handleBuy = (projectId: string) => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
  
    if (token) {
      // User is authenticated, redirect to checkout/purchase page
      navigate(`/checkout/${projectId}`);
    } else {
      // User is not authenticated, redirect to login page with redirect info
      navigate("/login", { 
        state: { redirectTo: `/checkout/${projectId}` } 
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
          className={cn(
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
            "absolute inset-0 opacity-60"
          )}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6">
              <BlurText
                text="Project Catalogue"
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
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-gray-600">Loading projects...</div>
          </div>
        ) : error ? (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        ) : (
          /* Grid of all project cards with better spacing */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-black opacity-20"></div>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white">
                        {project.name}
                      </h3>
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
                      <button
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                        onClick={() => handleDownload(project.pdfFile)}
                      >
                        <Download size={18} className="mr-2" />
                        Download PDF
                      </button>
                      <button
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                        onClick={() => handleBuy(project._id)}
                      >
                        <ShoppingCart size={18} className="mr-2" />
                        Buy {project.price}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">No projects found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
