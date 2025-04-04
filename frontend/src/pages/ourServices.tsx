const OurServices = () => {
  const services = [
    {
      id: 1,
      title: "Project-Based Courses",
      tagline: "Learn by Doing, Build with Purpose",
      description:
        "Practical hands-on projects to develop industry-relevant skills",
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
      title: "Interactive Sessions",
      tagline: "Stay Current, Stay Connected",
      description:
        "Regular tech updates and collaborative learning opportunities",
      icon: "🔄",
    },
    {
      id: 4,
      title: "Continuous Updates",
      tagline: "Evolve with Technology",
      description: "Lifetime access to course improvements and new content",
      icon: "🔔",
    },
    {
      id: 5,
      title: "Community Support",
      tagline: "Learn Together, Grow Together",
      description: "Join a network of passionate learners and experts",
      icon: "👥",
    },
  ];

  return (
    <div className="relative w-full ">
      {/* Hero Section with white background */}
      <div className="py-20 px-4 relative">
        {/* White overlay box that sits on top of the hero section */}
        <div className="absolute ml-10 -bottom-32 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-center mb-12">
                <span className="text-black">One Stop</span>{" "}
                <span className="text-blue-700">Learning Powerhouse</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="flex flex-col items-center text-center group hover:transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4 relative shadow-md group-hover:shadow-lg group-hover:bg-blue-100 transition-all duration-300">
                      <span className="text-2xl">{service.icon}</span>
                      <div className="absolute inset-0 border-2 border-blue-800 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
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
          </div>
        </div>
      </div>

      {/* Spacer to account for the overlapping box */}
      <div className="h-40"></div>
    </div>
  );
};

export default OurServices;
