import { useState, useEffect } from "react";
import {
  Clock,
  MapPin,
  Download,
  ShoppingCart,
  DollarSign,
  IndianRupee,
  X,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
  internationalPrice?: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [showTNCModal, setShowTNCModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [agreedToTNC, setAgreedToTNC] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has previously selected a currency preference
    const savedCurrency = localStorage.getItem("preferredCurrency");
    if (savedCurrency === "INR" || savedCurrency === "USD") {
      setCurrency(savedCurrency);
    }

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

  // Function to show TNC modal when buy button is clicked
  const handleBuyClick = (projectId: string) => {
    setSelectedProjectId(projectId);
    setShowTNCModal(true);
    setAgreedToTNC(false);
  };

  // Function to proceed with purchase after TNC agreement
  const handleProceedToPurchase = () => {
    if (!agreedToTNC || !selectedProjectId) return;

    // Save current currency preference before navigating
    localStorage.setItem("preferredCurrency", currency);

    // Check if token exists in localStorage
    const token = localStorage.getItem("token");

    // Close modal
    setShowTNCModal(false);
    setSelectedProjectId(null);
    setAgreedToTNC(false);

    if (token) {
      // User is authenticated, redirect to checkout/purchase page
      navigate(`/checkout/${selectedProjectId}`);
    } else {
      // User is not authenticated, redirect to login page with redirect info
      navigate("/login", {
        state: { redirectTo: `/checkout/${selectedProjectId}` },
      });
    }
  };

  // Function to close TNC modal
  const handleCloseTNCModal = () => {
    setShowTNCModal(false);
    setSelectedProjectId(null);
    setAgreedToTNC(false);
  };

  // Function to toggle currency
  const toggleCurrency = () => {
    const newCurrency = currency === "INR" ? "USD" : "INR";
    setCurrency(newCurrency);
    localStorage.setItem("preferredCurrency", newCurrency);
  };

  // // Function to format price according to selected currency
  // const getDisplayPrice = (project: Project) => {
  //   if (currency === "USD" && project.internationalPrice) {
  //     return `$${project.internationalPrice}`;
  //   }
  //   return project.price; // Default INR price
  // };

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
        {/* Simple Click-to-Switch Currency Toggle Button */}
        <div className="flex justify-end mb-6">
          <h3 className="flex items-center mr-2 font-semibold">Click to switch: </h3>
          <Button
            onClick={toggleCurrency}
            variant="outline"
            className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm hover:bg-blue-50 text-gray-700 font-medium px-4 py-2 rounded-lg transition-all duration-200"
          >
            {currency === "INR" ? (
              <>
                <IndianRupee size={18} className="text-blue-600" />
                <span>INR</span>
              </>
            ) : (
              <>
                <DollarSign size={18} className="text-blue-600" />
                <span>USD</span>
              </>
            )}
          </Button>
        </div>

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
                        onClick={() => handleBuyClick(project._id)}
                      >
                        <ShoppingCart size={18} className="mr-2" />
                        Buy {/*{getDisplayPrice(project)}*/}
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

      {/* Terms and Conditions Modal */}
      {showTNCModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Terms and Conditions</h2>
              <button
                onClick={handleCloseTNCModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body - Scrollable Terms Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">1. Acceptance of Terms</h3>
                <p>
                  By purchasing and downloading our project materials, you agree to be bound by these Terms and Conditions. 
                  If you do not agree to these terms, please do not proceed with the purchase.
                </p>

                <h3 className="text-lg font-semibold text-gray-900">2. License and Usage Rights</h3>
                <p>
                  Upon purchase, you are granted a non-exclusive, non-transferable license to use the project materials 
                  for educational and personal purposes only. Commercial use requires separate licensing.
                </p>

                <h3 className="text-lg font-semibold text-gray-900">3. Intellectual Property</h3>
                <p>
                  All project materials, including but not limited to code, documentation, designs, and related content, 
                  remain the intellectual property of the original creators. You may not claim ownership or redistribute 
                  these materials without explicit permission.
                </p>

                <h3 className="text-lg font-semibold text-gray-900">4. Refund Policy</h3>
                <p>
                  Due to the digital nature of our products, all sales are final. Refunds may be considered only in 
                  exceptional circumstances and at our sole discretion.
                </p>

                <h3 className="text-lg font-semibold text-gray-900">5. Support and Warranty</h3>
                <p>
                  Project materials are provided "as is" without warranty. While we strive for accuracy and completeness, 
                  we do not guarantee that the materials will meet your specific requirements or be error-free.
                </p>

                <h3 className="text-lg font-semibold text-gray-900">6. Limitation of Liability</h3>
                <p>
                  In no event shall we be liable for any indirect, incidental, special, or consequential damages 
                  arising from the use of our project materials.
                </p>

                <h3 className="text-lg font-semibold text-gray-900">7. Contact Information</h3>
                <p>
                  For any questions regarding these terms or our services, please contact our support team.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="agreeToTNC"
                  checked={agreedToTNC}
                  onChange={(e) => setAgreedToTNC(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="agreeToTNC" className="ml-2 text-sm text-gray-700">
                  I have read and agree to the Terms and Conditions
                </label>
              </div>
              
              <div className="flex gap-3 justify-end">
                <Button
                  onClick={handleCloseTNCModal}
                  variant="outline"
                  className="px-6 py-2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleProceedToPurchase}
                  disabled={!agreedToTNC}
                  className={`px-6 py-2 flex items-center gap-2 ${
                    agreedToTNC 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle size={18} />
                  Proceed to Purchase
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;