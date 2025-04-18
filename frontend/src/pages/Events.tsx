import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import {
  Clock,
  MapPin,
  Users,
  Award,
  ArrowUpRight,
  Filter,
  Search,
} from "lucide-react";

const Events = () => {
  const [view, setView] = useState("all"); // "all", "hackathons", "workshops", "conferences"
  const [searchQuery, setSearchQuery] = useState("");

  // Event categories
  const categories = [
    "All",
    "Hackathons",
    "Workshops",
    "Conferences",
    "Webinars",
  ];

  // Sample event data
  const events = [
    {
      id: 1,
      title: "Annual Tech Innovation Summit",
      description:
        "Join industry leaders for our flagship tech conference covering AI, blockchain, and emerging technologies.",
      date: "May 15-17, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Tech Center, Silicon Valley",
      category: "Conferences",
      attendees: 1200,
      ranking: 1,
      featured: true,
      image: "/images/tech-summit.jpg",
    },
    {
      id: 2,
      title: "AI Solutions Hackathon",
      description:
        "48-hour coding competition to build innovative AI solutions for real-world problems. $10,000 in prizes.",
      date: "June 3-5, 2025",
      time: "10:00 AM (start)",
      location: "Online & Innovation Hub",
      category: "Hackathons",
      attendees: 500,
      ranking: 2,
      featured: true,
      image: "/images/ai-hackathon.jpg",
    },
    {
      id: 3,
      title: "Frontend Development Workshop",
      description:
        "Hands-on workshop covering the latest frameworks and best practices in modern frontend development.",
      date: "May 25, 2025",
      time: "1:00 PM - 4:00 PM",
      location: "Learning Center, Downtown",
      category: "Workshops",
      attendees: 75,
      ranking: 4,
      featured: false,
      image: "/images/frontend-workshop.jpg",
    },
    {
      id: 4,
      title: "Cloud Computing Conference",
      description:
        "Explore the future of cloud infrastructure, serverless architecture, and multi-cloud strategies.",
      date: "June 10, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Convention Center",
      category: "Conferences",
      attendees: 800,
      ranking: 3,
      featured: false,
      image: "/images/cloud-conference.jpg",
    },
    {
      id: 5,
      title: "Data Science Webinar Series",
      description:
        "Weekly online sessions covering data analytics, machine learning, and data visualization tools.",
      date: "Every Thursday in May",
      time: "7:00 PM - 8:30 PM",
      location: "Online",
      category: "Webinars",
      attendees: 350,
      ranking: 6,
      featured: false,
      image: "/images/data-webinar.jpg",
    },
    {
      id: 6,
      title: "Blockchain Hackathon",
      description:
        "Build decentralized applications and smart contracts in this intensive weekend coding event.",
      date: "May 20-22, 2025",
      time: "9:00 AM (start)",
      location: "Tech Incubator, East Campus",
      category: "Hackathons",
      attendees: 200,
      ranking: 5,
      featured: false,
      image: "/images/blockchain-hackathon.jpg",
    },
  ];

  // Filter events based on search and category
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      view === "all" || event.category.toLowerCase() === view.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Sort events by ranking
  const sortedEvents = [...filteredEvents].sort(
    (a, b) => a.ranking - b.ranking
  );

  // Get featured events
  const featuredEvents = sortedEvents.filter((event) => event.featured);
  // Get regular events
  const regularEvents = sortedEvents.filter((event) => !event.featured);

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
                text="Events & Hackathons"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-5xl font-bold"
              />
            </div>
            <SplitText
              text="Stay connected with the tech community through our events. Participate, learn, and grow with us."
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

      {/* Events section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left side: Event Rankings */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Top Events</h2>
                <Award size={20} className="text-blue-600" />
              </div>

              <div className="space-y-4">
                {sortedEvents.slice(0, 5).map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center border-b border-gray-100 pb-4 last:border-0"
                  >
                    <div className="text-2xl font-bold text-blue-600 w-8">
                      #{event.ranking}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-800">
                        {event.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users size={14} className="mr-1" />
                        <span>{event.attendees} attendees</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Upcoming Highlights */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Upcoming Highlights</h2>
              </div>

              <div className="space-y-3">
                {sortedEvents.slice(0, 5).map((event, index) => (
                  <div
                    key={index}
                    className="flex items-start py-2 border-t border-gray-100 first:border-0"
                  >
                    <div className="bg-blue-100 text-blue-800 p-2 rounded-md mr-3">
                      <Clock size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{event.title}</p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side: Events listing */}
          <div className="lg:col-span-2">
            {/* Search and filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              {/* Search bar */}
              <div className="relative w-full md:w-2/3">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category filters */}
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center mr-2">
                  <Filter size={18} className="text-blue-600 mr-2" />
                  <span className="text-gray-700 font-medium">Type:</span>
                </div>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() =>
                      setView(
                        category === "All" ? "all" : category.toLowerCase()
                      )
                    }
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                      view ===
                        (category === "All" ? "all" : category.toLowerCase())
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured events */}
            {featuredEvents.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Featured Events
                </h2>
                <div className="space-y-6">
                  {featuredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="md:flex">
                        <div className="w-full md:w-1/3 h-40 md:h-auto bg-gray-300 relative">
                          <div className="absolute inset-0 bg-blue-900 opacity-10"></div>
                          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                            {event.category}
                          </div>
                        </div>
                        <div className="p-6 md:w-2/3">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {event.description}
                          </p>
                          <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <div className="flex items-center text-gray-600">
                              <Clock size={16} className="mr-2 text-blue-600" />
                              {event.date}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock size={16} className="mr-2 text-blue-600" />
                              {event.time}
                            </div>
                            <div className="flex items-center text-gray-600 col-span-2">
                              <MapPin
                                size={16}
                                className="mr-2 text-blue-600"
                              />
                              {event.location}
                            </div>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <Users size={16} className="mr-1" />
                              <span>{event.attendees} attendees</span>
                            </div>
                            <a
                              href={`/events/${event.id}`}
                              className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                            >
                              View Details{" "}
                              <ArrowUpRight size={16} className="ml-1" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Regular events */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Upcoming Events
              </h2>
              <div className="space-y-5">
                {regularEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full mb-2">
                            {event.category}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {event.title}
                          </h3>
                        </div>
                        <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          Rank #{event.ranking}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        {event.description}
                      </p>
                      <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-2 text-blue-600" />
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-2 text-blue-600" />
                          {event.time}
                        </div>
                        <div className="flex items-center col-span-2">
                          <MapPin size={14} className="mr-2 text-blue-600" />
                          {event.location}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500">
                          <Users size={14} className="mr-1" />
                          <span>{event.attendees} attendees</span>
                        </div>
                        <a
                          href={`/events/${event.id}`}
                          className="flex items-center text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
                        >
                          View Details{" "}
                          <ArrowUpRight size={14} className="ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* No results message */}
            {filteredEvents.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <Clock size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No events found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
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
          <h2 className="text-3xl font-bold mb-4">Join Our Next Hackathon!</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Challenge yourself, learn new skills, and connect with like-minded
            tech enthusiasts.
          </p>
          <button className="bg-white text-blue-800 font-bold py-3 px-8 rounded-md hover:bg-blue-100 transition-colors">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Events;