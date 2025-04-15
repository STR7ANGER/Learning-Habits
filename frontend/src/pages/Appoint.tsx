import { useState, ChangeEvent, FormEvent } from "react";
import { assets } from "./../assets/assets";

const Appoint = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preference: "",
    message: "",
  });

  const preferences = [
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
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  return (
    <div className="relative w-full bg-transparent h-screen">
      {/* Ballpit as background layer */}
      <div className="absolute inset-0 w-full h-full z-5 overflow-hidden">
        
      </div>

      {/* Card floating above in 3D space */}
      <div
        className="relative z-20 max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-8 transform translate-z-0 hover:translate-z-6 transition-transform"
        style={{
          boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
          transform: "translateZ(40px)",
          perspective: "1000px",
        }}
      >
        <div className="flex flex-col md:flex-row ">
          {/* Left side image */}
          <div className="w-full md:w-2/5 flex items-center justify-center p-6">
            <img
              src={assets.appoint}
              alt="Appointment illustration"
              className="max-w-full h-auto object-cover"
            />
          </div>

          {/* Right side form */}
          <div className="w-full md:w-3/5 p-8">
            <div className="text-center mb-6">
              <h1 className="text-4xl mt-6 font-bold text-blue-700">
                Book an Appointment
              </h1>
              <p className="text-xl mt-2 text-black">
                Schedule a meet for your tech learning journey
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="preference"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Preference
                </label>
                <select
                  id="preference"
                  name="preference"
                  value={formData.preference}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
                  required
                >
                  <option value="" disabled>
                    Select your preference
                  </option>
                  {preferences.map((pref) => (
                    <option key={pref} value={pref}>
                      {pref}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-800 transition-colors"
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Add perspective container */}
      <div
        className="perspective-container"
        style={{
          perspective: "1000px",
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      ></div>
    </div>
  );
};

export default Appoint;