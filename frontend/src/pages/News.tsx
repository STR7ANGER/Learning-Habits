import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import { ChevronRight, Clock, Tag, Search, Filter, ArrowUpRight } from "lucide-react";

const News = () => {
  // State for search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Categories for filtering
  const categories = ["All", "Technology", "AI & ML", "Programming", "Education Tech", "Industry News"];
  
  // News articles data
  const newsArticles = [
    {
      id: 1,
      title: "The Future of AI in Education: Personalized Learning Paths",
      excerpt: "Explore how artificial intelligence is revolutionizing educational methodologies by creating tailored learning experiences for students of all ages.",
      category: "AI & ML",
      date: "April 15, 2025",
      readTime: "8 min read",
      image: "/images/ai-education.jpg",
      featured: true,
    },
    {
      id: 2,
      title: "New Programming Languages to Watch in 2025",
      excerpt: "Discover emerging programming languages that are gaining traction among developers and could shape the future of software development.",
      category: "Programming",
      date: "April 12, 2025",
      readTime: "6 min read",
      image: "/images/programming-langs.jpg",
      featured: false,
    },
    {
      id: 3,
      title: "Virtual Reality Classrooms: The Next Big Step in Remote Learning",
      excerpt: "How VR technology is transforming remote education, creating immersive classroom experiences regardless of physical location.",
      category: "Education Tech",
      date: "April 10, 2025",
      readTime: "5 min read", 
      image: "/images/vr-classroom.jpg",
      featured: false,
    },
    {
      id: 4,
      title: "Tech Giants Collaborate on Open-Source Learning Platform",
      excerpt: "Major technology companies announce a joint initiative to develop a free, accessible educational platform for underserved communities.",
      category: "Industry News",
      date: "April 8, 2025",
      readTime: "4 min read",
      image: "/images/open-source.jpg",
      featured: true,
    },
    {
      id: 5,
      title: "Quantum Computing: Simplified Concepts for Beginners",
      excerpt: "Breaking down complex quantum computing principles into digestible explanations for students and enthusiasts new to the field.",
      category: "Technology",
      date: "April 5, 2025",
      readTime: "10 min read",
      image: "/images/quantum.jpg",
      featured: false,
    },
    {
      id: 6,
      title: "The Rise of Micro-Credentials in Professional Development",
      excerpt: "How short-form certifications are changing the landscape of continuing education and career advancement opportunities.",
      category: "Education Tech",
      date: "April 3, 2025",
      readTime: "7 min read",
      image: "/images/micro-credentials.jpg",
      featured: false,
    },
  ];

  // Filter articles based on search query and selected category
  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Split articles into featured and regular
  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

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
                text="Tech News"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-5xl font-bold"
              />
            </div>
            <SplitText
              text="Stay updated with the latest in technology, education, and innovation."
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

      {/* Search and filters section */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Search bar */}
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center mr-2">
              <Filter size={18} className="text-blue-600 mr-2" />
              <span className="text-gray-700 font-medium">Filter:</span>
            </div>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-1 rounded-full text-sm font-medium transition-colors",
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Articles Section */}
        {featuredArticles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Stories</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-60 bg-gray-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-900 opacity-10"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                      <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full mb-2">
                        {article.category}
                      </span>
                      <h3 className="text-xl font-bold text-white">{article.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={16} className="mr-1" />
                        <span className="mr-4">{article.readTime}</span>
                        <span>{article.date}</span>
                      </div>
                      <a 
                        href={`/news/${article.id}`} 
                        className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                      >
                        Read More <ArrowUpRight size={16} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-900 opacity-10"></div>
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-2">
                    <Tag size={14} className="text-blue-600 mr-1" />
                    <span className="text-xs font-medium text-blue-600">{article.category}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>{article.readTime}</span>
                    </div>
                    <a 
                      href={`/news/${article.id}`} 
                      className="flex items-center text-blue-600 font-medium text-sm hover:text-blue-800 transition-colors"
                    >
                      Read <ChevronRight size={14} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No results message */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-blue-50 py-12 mt-16">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Stay Updated with Tech News</h2>
              <p className="text-gray-600 mb-8">
                Subscribe to our newsletter to receive the latest updates, articles, and resources directly in your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="bg-blue-600 text-white font-medium py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                We respect your privacy. Unsubscribe at any time.
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
            Want to Learn More About Technology?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Explore our courses and resources to stay ahead in the rapidly evolving tech landscape.
          </p>
          <button className="bg-white text-blue-800 font-bold py-3 px-8 rounded-md hover:bg-blue-100 transition-colors">
            Explore Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;