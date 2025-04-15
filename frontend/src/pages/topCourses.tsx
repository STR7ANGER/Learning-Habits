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

const TopCourses = () => {
  const courses = [
    {
      id: 1,
      title: "Fullstack",
      description:
        "Build full-stack applications with MongoDB, Express, React, and Node.js. Learn how to create modern web applications from start to finish.",
      icon: assets.mern,
      url: "/courses/mern-stack",
    },
    {
      id: 2,
      title: "Cloud computing",
      description:
        "Master AWS, Azure, and Google Cloud platforms. Deploy scalable applications and understand cloud infrastructure management.",
      icon: assets.clodservs,
      url: "/courses/cloud-services",
    },
    {
      id: 3,
      title: "Artificial Intelligence",
      description:
        "Develop intelligent conversational agents using natural language processing and machine learning techniques.",
      icon: assets.chatbot,
      url: "/courses/ai-chatbot",
    },
    {
      id: 4,
      title: "Data Visualization",
      description:
        "Learn data processing, visualization, and analytical techniques to extract insights from complex datasets.",
      icon: assets.dataanlys,
      url: "/courses/data-analysis",
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Top Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="relative overflow-hidden bg-black/80 border-gray-800 text-white hover:scale-105 transition-transform duration-300"
            >
              <ShineBorder shineColor={["#3B82F6", "#1E40AF", "#60A5FA"]} />

              <div className="flex items-center justify-center bg-black/40 p-4">
                <img
                  src={course.icon}
                  alt={`${course.title} icon`}
                  className="w-full max-h-64 object-fill"
                />
              </div>

              <CardHeader className="pb-2">
                <CardTitle>{course.title}</CardTitle>
              </CardHeader>

              <CardContent className="text-gray-300">
                <p>{course.description}</p>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  asChild
                >
                  <a href={course.url}>Explore</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCourses;
