import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock,
  MapPin,
  Download,
  Shield,
  Info,
  CheckCircle,
  DollarSign,
  IndianRupee,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  phone: string;
  [key: string]: string;
}

const BuyProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  useEffect(() => {
    // Check if user has previously selected a currency preference
    const savedCurrency = localStorage.getItem("preferredCurrency");
    if (savedCurrency === "INR" || savedCurrency === "USD") {
      setCurrency(savedCurrency);
    }

    const fetchProjectDetails = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/api/project/${projectId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch project details");
        }

        const result = await response.json();

        if (result.success) {
          setProject(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch project details");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching project details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProjectDetails();
    }
  }, [projectId]);

  // Calculate order details based on the selected currency
  const getPrice = () => {
    if (!project) return 0;
    
    if (currency === "USD" && project.internationalPrice) {
      return parseFloat(project.internationalPrice);
    }
    
    // For INR, remove the currency symbol and parse
    return parseFloat(project.price.replace(/[^0-9.]/g, ""));
  };

  const total = getPrice();

 

  // Function to toggle currency
  const toggleCurrency = () => {
    const newCurrency = currency === "INR" ? "USD" : "INR";
    setCurrency(newCurrency);
    localStorage.setItem("preferredCurrency", newCurrency);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDownload = (pdfFile: string) => {
    if (pdfFile && pdfFile !== "#") {
      window.open(pdfFile, "_blank");
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = async () => {
    try {
      // Validate form
      const requiredFields = ["firstName", "lastName", "email", "phone"];
      const missingFields = requiredFields.filter((field) => !formData[field]);

      if (missingFields.length > 0) {
        alert(`Please fill in required fields: ${missingFields.join(", ")}`);
        return;
      }

      setProcessingPayment(true);

      type User = {
        _id: string;
        name: string;
        email: string;
      };

      const item = localStorage.getItem("user");
      const user: User | null = item ? JSON.parse(item) : null;

      if (!user || !user._id) {
        alert("Please login to complete your purchase");
        navigate("/login");
        return;
      }

      const userId = user._id;

      const apiUrl = import.meta.env.VITE_API_URL;

      // Prepare the purchase data
      const purchaseData = {
        userId,
        projectId,
        ...formData,
        amount: total,
        paymentMethod,
        currency, // Include selected currency in purchase data
      };

      // Send purchase data to backend
      const response = await fetch(`${apiUrl}/api/purchase/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authorization if you have it implemented
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(purchaseData),
      });

      const result = await response.json();

      if (result.success) {
        // Show success popup instead of alert
        setShowSuccessPopup(true);

        // Set timeout to redirect after showing popup
        setTimeout(() => {
          navigate("/myproject");
        }, 3000);
      } else {
        throw new Error(result.message || "Payment failed");
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      alert(err instanceof Error ? err.message : "Payment processing failed");
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="text-xl text-gray-600">Loading project details...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            {" "}
            {error || "Project not found"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 relative">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-black border-2 border-blue-600 rounded-xl p-8 text-white text-center max-w-md mx-4 animate-fade-in">
            <div className="flex justify-center mb-4">
              <CheckCircle size={64} className="text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold mb-2">ORDER COMPLETE!</h2>
            <p className="text-xl mb-6">Your purchase was successful</p>
            <div className="w-full h-1 bg-blue-600 mb-6"></div>
            <p className="text-lg mb-4">
              Thank you for your purchase. You will be redirected to My Projects
              in a moment.
            </p>
            <div className="text-blue-400 font-bold">
              {currency === "USD" ? "$" : "₹"}{total.toFixed(2)}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Complete Your <span className="text-blue-600">Purchase</span>
        </h1>

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Left column - Project Card + Terms */}
          <div className="flex flex-col gap-3">
            {/* Project Card */}
            <div className="bg-black rounded-xl overflow-hidden text-white shadow-lg">
              <div className="h-48 relative">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-blue-600 to-blue-800"></div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">
                    {project.name}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-6">{project.description}</p>

                {/* Project info */}
                <div className="flex items-center text-sm text-gray-300 mb-4">
                  <Clock size={16} className="mr-1 text-blue-400" />
                  <span>Duration: {project.duration}</span>
                </div>

                {/* Location */}
                <div className="flex items-center text-sm text-gray-300 mb-6">
                  <MapPin size={16} className="mr-1 text-blue-400" />
                  <span>{project.location}</span>
                </div>

                {/* PDF Download */}
                <button
                  className="w-full bg-white hover:bg-gray-100 text-black font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                  onClick={() => handleDownload(project.pdfFile)}
                >
                  <Download size={18} className="mr-2" />
                  Download PDF
                </button>
              </div>
            </div>

            {/* Terms and Conditions Card */}
            <div className="bg-black rounded-xl p-4 shadow-sm">
              <h3 className=" font-bold text-white mb-2 pb-2 flex items-center">
                <Info size={16} className="mr-1 text-blue-600" />
                Terms & Policies
              </h3>
              <ul className="text-xs text-white  space-y-2">
                <li className="flex items-start">
                  <Shield size={12} className="mr-1 text-blue-600 mt-0.5" />
                  <span>Full refund available within 7 days of purchase</span>
                </li>
                <li className="flex items-start">
                  <Shield size={12} className="mr-1 text-blue-600 mt-0.5" />
                  <span>Digital content delivery within 24 hours</span>
                </li>
                <li className="flex items-start">
                  <Shield size={12} className="mr-1 text-blue-600 mt-0.5" />
                  <span>
                    Secure payment processing with end-to-end encryption
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Middle column - Delivery Information */}
          <div className="bg-black rounded-xl p-6 text-white shadow-lg">
            <h2 className="text-xl font-bold mb-2 text-blue-400">
              YOUR DETAILS
            </h2>
            <h3 className="text-2xl font-bold mb-4">DELIVERY INFORMATION</h3>
            <div className="w-full h-1 bg-blue-600 mb-6"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name*"
                className="bg-gray-900 border-none rounded p-3 text-white"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name*"
                className="bg-gray-900 border-none rounded p-3 text-white"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email address*"
              className="bg-gray-900 border-none rounded p-3 text-white w-full mb-4"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <input
              type="text"
              name="street"
              placeholder="Street"
              className="bg-gray-900 border-none rounded p-3 text-white w-full mb-4"
              value={formData.street}
              onChange={handleInputChange}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                className="bg-gray-900 border-none rounded p-3 text-white"
                value={formData.city}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                className="bg-gray-900 border-none rounded p-3 text-white"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="zipcode"
                placeholder="Zipcode"
                className="bg-gray-900 border-none rounded p-3 text-white"
                value={formData.zipcode}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="bg-gray-900 border-none rounded p-3 text-white"
                value={formData.country}
                onChange={handleInputChange}
              />
            </div>

            <input
              type="tel"
              name="phone"
              placeholder="Phone*"
              className="bg-gray-900 border-none rounded p-3 text-white w-full"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Right column - Cart Total and Payment */}
          <div className="flex flex-col gap-6">
            {/* Cart Total */}
            <div className="bg-black rounded-xl p-6 text-white shadow-lg">
              <h2 className="text-xl font-bold mb-2 text-blue-400">
                YOUR ORDER
              </h2>
              <h3 className="text-2xl font-bold mb-4">CART TOTAL</h3>
              <div className="w-full h-1 bg-blue-600 mb-6"></div>

              <div className="flex justify-between items-center mb-4">
                <div className="text-lg">Subtotal</div>
                <div className="text-xl text-blue-400">
                  {currency === "USD" ? "$" : "₹"}{total.toFixed(2)}
                </div>
              </div>

              <div className="w-full h-0.5 bg-gray-700 mb-4"></div>

              <div className="flex justify-between items-center">
                <div className="text-lg font-bold">Total</div>
                <div className="text-2xl text-blue-400 font-bold">
                  {currency === "USD" ? "$" : "₹"}{total.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-black rounded-xl p-6 text-white shadow-lg">
              <h2 className="text-xl font-bold mb-2 text-blue-400">
                CHOOSE METHOD
              </h2>
              <h3 className="text-2xl font-bold mb-4">PAYMENT METHOD</h3>
              <div className="w-full h-1 bg-blue-600 mb-6"></div>

              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="razorpay"
                  name="paymentMethod"
                  value="razorpay"
                  checked={paymentMethod === "razorpay"}
                  onChange={() => handlePaymentMethodChange("razorpay")}
                  className="mr-2 accent-blue-400"
                />
                <label htmlFor="razorpay" className="cursor-pointer">
                  <span className="ml-2 text-lg">Razorpay</span>
                </label>
              </div>

              <div className="flex items-center mb-6">
                <input
                  type="radio"
                  id="upi"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={() => handlePaymentMethodChange("upi")}
                  className="mr-2 accent-blue-400"
                />
                <label htmlFor="upi" className="cursor-pointer">
                  <span className="ml-2 text-lg">UPI</span>
                </label>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={processingPayment}
                className={`${
                  processingPayment
                    ? "bg-blue-400"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white font-bold py-4 px-6 rounded-lg w-full transition-colors text-lg`}
              >
                {processingPayment ? "PROCESSING..." : "PLACE ORDER"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyProject;