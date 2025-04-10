import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import { Linkedin, Facebook, Twitter, Instagram, BookOpen, Award, Globe, Rocket, Lightbulb, Building, Trophy, Star } from 'lucide-react';
import { assets } from "./../assets/assets";

const AboutUs = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Pankaj Pathak",
      role: "Founder & CEO",
      description: "EdTech innovator with 10+ years experience revolutionizing online learning",
      image: "https://media.istockphoto.com/id/1400771418/vector/elderly-man-with-laptop.jpg?s=612x612&w=0&k=20&c=DDBvSaaAfQ4Yax0g823hUgdd62FObaLhahHWWNSQcc4=",
      linkedin: "https://www.linkedin.com/",
    },
    {
      name: "Marcus Johnson",
      role: "Chief Learning Officer",
      description: "Former professor specialized in adaptive learning methodologies",
      image: "https://static.vecteezy.com/system/resources/previews/007/525/705/non_2x/teenage-boy-with-modern-fashionable-hairstyle-in-blue-sweatshirt-with-hood-isolated-on-white-background-portrait-avatar-funny-boy-character-vector.jpg",
      linkedin: "https://www.linkedin.com/",
    },
    {
      name: "Aisha Patel",
      role: "Head of Curriculum",
      description: "Education expert focused on creating engaging interactive content",
      image: "https://static.vecteezy.com/system/resources/previews/001/312/555/non_2x/beautiful-teenage-girl-with-different-facial-expression-vector.jpg",
      linkedin: "https://www.linkedin.com/",
    },
  ];

  // Company milestones
  const companyMilestones = [
    {
      year: 2018,
      event: "Foundation",
      description: "Started as a small online platform to make learning accessible to everyone.",
      icon: <Building size={24} className="text-blue-500" />,
    },
    {
      year: 2019,
      event: "First Course Launch",
      description: "Released our first interactive course series, gaining over 10,000 students.",
      icon: <BookOpen size={24} className="text-green-500" />,
    },
    {
      year: 2020,
      event: "Mobile App Launch",
      description: "Introduced our mobile app for learning on-the-go with offline capabilities.",
      icon: <Lightbulb size={24} className="text-yellow-500" />,
    },
    {
      year: 2021,
      event: "Adaptive Learning",
      description: "Implemented AI-driven personalized learning paths for all students.",
      icon: <Award size={24} className="text-purple-500" />,
    },
    {
      year: 2022,
      event: "Corporate Training",
      description: "Expanded our services to include tailored corporate training solutions.",
      icon: <Star size={24} className="text-emerald-500" />,
    },
    {
      year: 2023,
      event: "Global Expansion",
      description: "Reached students in over 50 countries with courses in 12 languages.",
      icon: <Globe size={24} className="text-indigo-500" />,
    },
    {
      year: 2024,
      event: "Learning Habits Platform",
      description: "Launched our comprehensive platform focused on building sustainable learning habits.",
      icon: <Rocket size={24} className="text-cyan-500" />,
    },
  ];

  // Statistics
  const stats = [
    { label: "Active Students", value: "50,000+" },
    { label: "Courses", value: "250+" },
    { label: "Instructors", value: "120" },
    { label: "Success Rate", value: "93%" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with blue background and animated pattern */}
      <div className="bg-blue-800 text-white py-20 relative overflow-hidden">
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
                text="About Learning Habits"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-5xl font-bold"
              />
            </div>
            <SplitText
              text="We're on a mission to transform education through technology and make continuous learning a habit for everyone"
              className="text-xl text-gray-200 max-w-2xl mx-auto"
              delay={10}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              easing="easeOutCubic"
              threshold={0.2}
              rootMargin="-50px"
            />
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={assets.abt_img}
              alt="Our Story"
              className="rounded-lg shadow-xl object-cover w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Learning Habits began with a simple idea: education should adapt to each learner, not the other way around.
              Founded by a team of educators and technologists, we set out to create a platform that makes learning
              not just effective, but enjoyable and habitual.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We believe that building sustainable learning habits is the key to personal and professional growth.
              Our platform combines behavioral science with cutting-edge technology to help learners establish
              routines that stick, while making the learning experience interactive and engaging.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <blockquote className="italic text-gray-600">
                "Education is not just about filling a bucket, but lighting a fire. Our mission is to spark that
                flame and keep it burning through habitual learning."
                <span className="block text-right mt-2 text-gray-800">
                  — Pankaj Pathak, Founder
                </span>
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {member.name}
                  </h3>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Linkedin size={24} />
                    </a>
                  )}
                </div>
                <p className="text-blue-600 font-semibold mb-4">
                  {member.role}
                </p>
                <p className="text-gray-700">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section - Custom Implementation */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Our Journey
          </h2>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500"></div>
            
            {/* Timeline Items */}
            {companyMilestones.map((milestone, index) => (
              <div key={milestone.year} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{milestone.event}</h3>
                  <p className="text-sm text-blue-600 font-semibold mb-2">{milestone.year}</p>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
                
                {/* Icon */}
                <div className="w-2/12 flex justify-center">
                  <div className="w-12 h-12 bg-white rounded-full border-4 border-blue-500 flex items-center justify-center z-10">
                    {milestone.icon}
                  </div>
                </div>
                
                {/* Empty space for alternating pattern */}
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 text-center shadow-md">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Accessible Education</h3>
              <p className="text-gray-700">We believe quality education should be available to everyone, regardless of background or circumstance.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8 text-center shadow-md">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Continuous Innovation</h3>
              <p className="text-gray-700">We constantly push boundaries to create learning experiences that are more effective, engaging, and personalized.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8 text-center shadow-md">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lifelong Learning</h3>
              <p className="text-gray-700">We champion the philosophy that learning is a lifelong journey that extends far beyond formal education.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-blue-800 text-white py-16 relative overflow-hidden">
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
          <h2 className="text-3xl font-bold mb-6">Join Our Learning Community</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Ready to transform your learning habits? Start your journey with us today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-800 font-bold py-3 px-8 rounded-md hover:bg-blue-100 transition-colors">
              Get Started
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-md hover:bg-white hover:text-blue-800 transition-colors">
              Contact Us
            </button>
          </div>
          <div className="mt-12 flex justify-center space-x-6">
            <Facebook size={24} className="hover:text-blue-300 cursor-pointer transition-colors" />
            <Twitter size={24} className="hover:text-blue-300 cursor-pointer transition-colors" />
            <Instagram size={24} className="hover:text-blue-300 cursor-pointer transition-colors" />
            <Linkedin size={24} className="hover:text-blue-300 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;