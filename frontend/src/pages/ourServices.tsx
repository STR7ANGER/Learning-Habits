import { useNavigate } from "react-router-dom";


const OurServices = () => {
  const navigate = useNavigate();
  const services = [
    {
      id: 1,
      title: "Project-Based Training",
      tagline: "World's First Platform - Learn by Building",
      description:
        "Real projects that companies are looking for today - the missing link between knowledge and job offers",
      icon: "📚",
    },
    {
      id: 2,
      title: "One-on-One Mentorship",
      tagline: "Personalized Growth Path",
      description: "Direct guidance from experienced industry professionals",
      icon: "👨‍🏫",
    },
    {
      id: 3,
      title: "Pay As You Learn",
      tagline: "Flexible Payment Options",
      description:
        "Affordable installment plans that adapt to your learning journey",
      icon: "💳",
    },
    {
      id: 4,
      title: "Job Support & MNC Exposure",
      tagline: "Launch Your Career",
      description:
        "Direct exposure to top MNCs and placement assistance once you complete your project",
      icon: "🚀",
    },
    {
      id: 5,
      title: "4 Internships Program",
      tagline: "Supercharge Career Growth",
      description:
        "Unlock 4 internships over 4 years designed to accelerate your professional journey",
      icon: "🏆",
    },
    {
      id: 6,
      title: "Global Talent Pool",
      tagline: "Join Elite Network Worldwide",
      description:
        "Become part of our exclusive talent pool with amazing responses from India and abroad",
      icon: "🔄",
    },
    {
      id: 7,
      title: "Real Project Development",
      tagline: "Learn How Projects Are Actually Built",
      description: "Experience complete project development lifecycle that turns knowledge into job offers",
      icon: "🔔",
    },
    {
      id: 8,
      title: "Community Support",
      tagline: "Learn Together, Build Together",
      description: "Join a network of passionate learners building the future",
      icon: "👥",
    },
  ];

  // First row has 5 services, second row has the rest
  const firstRowServices = services.slice(0, 5);
  const secondRowServices = services.slice(5);

  return (
    <div className="w-full py-12 px-4 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
          
          {/* World's First Badge */}
          <div className="text-center mb-6">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold">
              🌟 World's First Project-Based Training & Internship Platform
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            <span className="text-black">One Stop</span>{" "}
            <span className="text-blue-700">Learning Powerhouse</span>
          </h2>

          {/* Mission Statement */}
          <div className="bg-blue-50 rounded-xl p-4 mb-12 border-l-4 border-blue-600">
            <p className="text-gray-800 text-sm leading-relaxed text-center">
              <span className="font-semibold text-blue-700">Our Mission:</span> Help tech learners and professionals not just know technology, but build real projects that companies are looking for today. 
              <span className="font-medium"> Learn how projects are actually developed — the missing link that turns knowledge into job offers.</span>
            </p>
          </div>

          {/* First row - 5 services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {firstRowServices.map((service) => (
              <div
                key={service.id}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4 shadow-md border-2 border-blue-100">
                  <span className="text-2xl">{service.icon}</span>
                </div>

                <h3 className="text-blue-700 font-bold text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-black font-medium text-sm mb-2">
                  {service.tagline}
                </p>
                <p className="text-gray-700 text-xs mb-3">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Second row - 3 services centered */}
          <div className="flex justify-center mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl">
              {secondRowServices.map((service) => (
                <div
                  key={service.id}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4 shadow-md border-2 border-blue-100">
                    <span className="text-2xl">{service.icon}</span>
                  </div>

                  <h3 className="text-blue-700 font-bold text-lg mb-2">
                    {service.title}
                  </h3>
                  <p className="text-black font-medium text-sm mb-2">
                    {service.tagline}
                  </p>
                  <p className="text-gray-700 text-xs mb-3">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center">
            <h3 className="text-xl font-bold mb-4">
              Don't Just Learn. Build, Stand Out, and Get Hired! 🚀
            </h3>
            <p className="text-blue-100 text-sm mb-6">
              Complete your project → Join exclusive talent pool → Get MNC exposure → Land your dream job
            </p>
            <button onClick={() => navigate("/internship")} className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
              Register Now & Unlock 4 Internships
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;