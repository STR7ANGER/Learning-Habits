import { assets } from "./../assets/assets";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShineBorder } from "@/components/magicui/shine-border";
import { motion } from "framer-motion";

const TopCourses = () => {
  const courses = [
    {
      id: 1,
      title: "Fullstack Development",
      description:
        "Build modern web applications from scratch with MongoDB, Express, React, and Node.js. Master front-end and back-end technologies.",
      icon: assets.mern,
      url: "/courses/mern-stack",
      badge: "Most Popular",
      color: "from-blue-600 to-indigo-600",
    },
    {
      id: 2,
      title: "Cloud Computing",
      description:
        "Master AWS, Azure, and Google Cloud platforms. Deploy scalable applications and understand cloud infrastructure management.",
      icon: assets.clodservs,
      url: "/courses/cloud-services",
      badge: "High Demand",
      color: "from-cyan-500 to-blue-500",
    },
    {
      id: 3,
      title: "Artificial Intelligence",
      description:
        "Develop intelligent conversational agents using cutting-edge natural language processing and machine learning techniques.",
      icon: assets.chatbot,
      url: "/courses/ai-chatbot",
      badge: "Trending",
      color: "from-violet-600 to-purple-600",
    },
    {
      id: 4,
      title: "Data Visualization",
      description:
        "Transform complex data into compelling visual stories. Master tools like D3.js, Tableau, and Python visualization libraries.",
      icon: assets.dataanlys,
      url: "/courses/data-analysis",
      badge: "In Demand",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="py-20 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-400 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-indigo-500 opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-300 opacity-5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Top Courses
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Cutting-edge curriculum designed by industry experts to boost your
            tech career
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {courses.map((course) => (
            <motion.div key={course.id} variants={cardVariants}>
              <Card className="h-full relative overflow-hidden bg-black/70 backdrop-blur-sm border-gray-800 text-white group">
                <ShineBorder
                  className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  shineColor={["#3B82F6", "#1E40AF", "#60A5FA"]}
                />

                {/* Badge */}
                <div
                  className={`absolute top-4 right-4 py-1 px-3 rounded-full text-xs font-medium bg-gradient-to-r ${course.color} text-white`}
                >
                  {course.badge}
                </div>

                <div className="flex items-center justify-center bg-gradient-to-b from-black/60 to-black/20 p-6 h-52">
                  <img
                    src={course.icon}
                    alt={`${course.title} icon`}
                    className="w-full max-h-40 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-xl leading-tight">
                    {course.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="text-gray-300 text-sm">
                  <p>{course.description}</p>
                </CardContent>

                <CardFooter>
                  <Button
                    className={`w-full bg-gradient-to-r ${course.color} hover:saturate-150 text-white font-medium transition-all duration-300`}
                    asChild
                  >
                    <a
                      href={course.url}
                      className="flex items-center justify-center gap-2"
                    >
                      <span>Explore Course</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TopCourses;
