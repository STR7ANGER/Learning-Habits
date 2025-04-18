import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import { Calendar, Book, Users, ArrowRight } from "lucide-react";

// Define types for our data
interface ExpertTopic {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  available: number;
}

interface FeaturedExpert {
  id: number;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  sessions: number;
}

const Expert: React.FC = () => {
  // Expert categories/topics
  const expertTopics: ExpertTopic[] = [
    {
      id: 1,
      name: "Mathematics",
      description: "Algebra, Calculus, Statistics and more",
      icon: <Book size={24} className="text-blue-600" />,
      available: 12,
    },
    {
      id: 2,
      name: "Computer Science",
      description: "Programming, Algorithms, Web Development",
      icon: <Book size={24} className="text-blue-600" />,
      available: 8,
    },
    {
      id: 3,
      name: "Languages",
      description: "English, Spanish, French, German",
      icon: <Book size={24} className="text-blue-600" />,
      available: 15,
    },
    {
      id: 4,
      name: "Science",
      description: "Physics, Chemistry, Biology",
      icon: <Book size={24} className="text-blue-600" />,
      available: 10,
    },
    {
      id: 5,
      name: "Business",
      description: "Finance, Marketing, Management",
      icon: <Book size={24} className="text-blue-600" />,
      available: 7,
    },
    {
      id: 6,
      name: "Arts",
      description: "Music, Drawing, Photography",
      icon: <Book size={24} className="text-blue-600" />,
      available: 5,
    },
  ];

  // Featured experts
  const featuredExperts: FeaturedExpert[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Mathematics",
      image: "/api/placeholder/400/400",
      rating: 4.9,
      sessions: 250,
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      specialty: "Computer Science",
      image: "/api/placeholder/400/400",
      rating: 4.8,
      sessions: 180,
    },
    {
      id: 3,
      name: "Emma Williams",
      specialty: "Languages",
      image: "/api/placeholder/400/400",
      rating: 4.7,
      sessions: 320,
    },
  ];

  // State for selected topic
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  // Handle topic selection
  const handleTopicSelect = (topicId: number): void => {
    setSelectedTopic(topicId === selectedTopic ? null : topicId);
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
                text="Expert Sessions"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-5xl font-bold"
              />
            </div>
            <SplitText
              text="Connect with our expert instructors for personalized online learning sessions that fit your schedule and learning needs."
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

      {/* Topic Selection Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Choose Your Topic</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Select a subject area to see available experts and schedule a personalized learning session.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {expertTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => handleTopicSelect(topic.id)}
              className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedTopic === topic.id ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  {topic.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {topic.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{topic.description}</p>
                  <div className="flex items-center text-blue-600">
                    <Users size={16} className="mr-1" />
                    <span className="text-sm">{topic.available} Experts Available</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected topic action button */}
        {selectedTopic && (
          <div className="mt-8 text-center">
            <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-colors flex items-center mx-auto">
              Browse Experts <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        )}
      </div>

      {/* Featured Experts Section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Featured Experts</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Meet some of our top-rated instructors who are ready to help you succeed.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredExperts.map((expert) => (
              <div key={expert.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {expert.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">{expert.specialty} Expert</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="text-yellow-500 mr-1">★</div>
                      <span className="font-medium">{expert.rating}</span>
                    </div>
                    <div className="text-gray-600 text-sm">
                      {expert.sessions}+ sessions
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <Calendar size={18} className="mr-2" />
                    Book Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Choose a Topic</h3>
              <p className="text-gray-600">
                Browse our extensive range of subjects and select the area you need help with.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Select an Expert</h3>
              <p className="text-gray-600">
                Review profiles, ratings, and availability to find the perfect instructor for you.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Schedule & Learn</h3>
              <p className="text-gray-600">
                Book a session at a time that suits you and connect for personalized learning.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-action section */}
      <div className="bg-blue-800 text-white py-12 relative overflow-hidden">
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
          <h2 className="text-3xl font-bold mb-4">
            Ready to Learn from the Best?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have accelerated their learning with our expert instructors.
          </p>
          <button className="bg-white text-blue-800 font-bold py-3 px-8 rounded-md hover:bg-blue-100 transition-colors">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default Expert;