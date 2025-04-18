import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import { Clock, Calendar, Bookmark, ChevronRight, Search, Filter, MessageSquare, Heart} from "lucide-react";

const Blogs = () => {
  // State for filtering and search
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Blog categories
  const categories = ["All", "Technology", "Education", "AI & ML", "Programming", "Career Growth"];
  
  // Sample blog data
  const blogs = [
    {
      id: 1,
      title: "The Future of Learning: AI-Powered Educational Platforms",
      excerpt: "Explore how artificial intelligence is revolutionizing educational methodologies with personalized learning experiences for students of all ages and backgrounds.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      author: "Dr. Sarah Johnson",
      authorRole: "Education Technology Expert",
      date: "April 14, 2025",
      readTime: "8 min read",
      category: "Education",
      tags: ["AI", "EdTech", "Future of Learning"],
      image: "/images/ai-education.jpg",
      featured: true,
      comments: 24,
      likes: 156
    },
    {
      id: 2,
      title: "Mastering React Hooks: Advanced Patterns for Modern Web Development",
      excerpt: "Dive deep into React Hooks with practical examples and advanced patterns that will elevate your frontend development skills to the next level.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      author: "Michael Chen",
      authorRole: "Senior Frontend Developer",
      date: "April 10, 2025",
      readTime: "12 min read",
      category: "Programming",
      tags: ["React", "JavaScript", "Web Development"],
      image: "/images/react-hooks.jpg",
      featured: true,
      comments: 37,
      likes: 214
    },
    {
      id: 3,
      title: "Building a Learning Habit: The Science of Effective Studying",
      excerpt: "Discover scientifically-proven techniques to build consistent learning habits that will help you retain information better and study more efficiently.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      author: "Emma Rodriguez",
      authorRole: "Learning Psychologist",
      date: "April 8, 2025",
      readTime: "6 min read",
      category: "Education",
      tags: ["Study Tips", "Learning Habits", "Productivity"],
      image: "/images/learning-habits.jpg",
      featured: false,
      comments: 19,
      likes: 98
    },
    {
      id: 4,
      title: "Introduction to Machine Learning: Concepts Every Developer Should Know",
      excerpt: "A beginner-friendly guide to core machine learning concepts, algorithms, and implementation strategies for software developers looking to expand their skillset.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      author: "Dr. Amit Patel",
      authorRole: "Machine Learning Engineer",
      date: "April 5, 2025",
      readTime: "10 min read",
      category: "AI & ML",
      tags: ["Machine Learning", "Programming", "AI Basics"],
      image: "/images/machine-learning.jpg",
      featured: false,
      comments: 15,
      likes: 122
    },
    {
      id: 5,
      title: "From Junior to Senior: Navigating Your Tech Career Path",
      excerpt: "Practical advice for early and mid-career developers on how to advance professionally, develop critical skills, and position yourself for senior roles.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      author: "Jessica Taylor",
      authorRole: "Tech Career Coach",
      date: "April 3, 2025",
      readTime: "9 min read",
      category: "Career Growth",
      tags: ["Career Development", "Tech Industry", "Professional Growth"],
      image: "/images/career-path.jpg",
      featured: false,
      comments: 31,
      likes: 187
    },
    {
      id: 6,
      title: "Understanding Blockchain: Beyond Cryptocurrency",
      excerpt: "A comprehensive exploration of blockchain technology, its applications beyond cryptocurrency, and how it's reshaping various industries.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      author: "Robert Williams",
      authorRole: "Blockchain Specialist",
      date: "March 30, 2025",
      readTime: "11 min read",
      category: "Technology",
      tags: ["Blockchain", "Technology Trends", "Innovation"],
      image: "/images/blockchain.jpg",
      featured: false,
      comments: 22,
      likes: 139
    },
    {
      id: 7,
      title: "5 Essential Data Structures Every Programmer Should Master",
      excerpt: "An in-depth look at the most important data structures in computer science, with practical examples of when and how to use them effectively.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      author: "Thomas Lee",
      authorRole: "Computer Science Instructor",
      date: "March 27, 2025",
      readTime: "14 min read",
      category: "Programming",
      tags: ["Data Structures", "Algorithms", "Computer Science"],
      image: "/images/data-structures.jpg",
      featured: false,
      comments: 29,
      likes: 204
    },
    {
      id: 8,
      title: "The Role of Emotional Intelligence in Technical Leadership",
      excerpt: "Why technical expertise alone isn't enough for leadership roles, and how developing emotional intelligence can make you a more effective tech leader.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      author: "Dr. Olivia Martinez",
      authorRole: "Leadership Coach & Former CTO",
      date: "March 25, 2025",
      readTime: "7 min read",
      category: "Career Growth",
      tags: ["Leadership", "Emotional Intelligence", "Tech Management"],
      image: "/images/tech-leadership.jpg",
      featured: false,
      comments: 18,
      likes: 111
    },
  ];

  // Filter blogs based on search and category
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Split into featured and regular blogs
  const featuredBlogs = filteredBlogs.filter(blog => blog.featured);
  const regularBlogs = filteredBlogs.filter(blog => !blog.featured);

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
                text="Learning Habits Blog"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-5xl font-bold"
              />
            </div>
            <SplitText
              text="Insights, tutorials, and educational resources to help you develop effective learning habits and master new technologies."
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
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center mr-2">
              <Filter size={18} className="text-blue-600 mr-2" />
              <span className="text-gray-700 font-medium">Topics:</span>
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
      </div>

      {/* Blog content section */}
      <div className="container mx-auto px-6 pb-12">
        {/* Featured blogs section */}
        {featuredBlogs.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Featured Articles</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredBlogs.map((blog) => (
                <div key={blog.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-60 bg-gray-300 relative">
                    <div className="absolute inset-0 bg-blue-900 opacity-10"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors">
                      <a href={`/blogs/${blog.id}`}>{blog.title}</a>
                    </h3>
                    <p className="text-gray-600 mb-5">{blog.excerpt}</p>
                    <div className="flex items-center mb-5">
                      <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                      <div>
                        <p className="font-medium text-gray-800">{blog.author}</p>
                        <p className="text-sm text-gray-500">{blog.authorRole}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={16} className="mr-1" />
                        <span className="mr-4">{blog.date}</span>
                        <Clock size={16} className="mr-1" />
                        <span>{blog.readTime}</span>
                      </div>
                      <div className="flex space-x-3">
                        <div className="flex items-center text-gray-500">
                          <MessageSquare size={16} className="mr-1" />
                          <span>{blog.comments}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Heart size={16} className="mr-1" />
                          <span>{blog.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All blogs section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">All Articles</h2>
          
          {/* No results message */}
          {filteredBlogs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <Bookmark size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">No blogs found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
          
          {/* Grid layout for blogs */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularBlogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-300 relative">
                  <div className="absolute inset-0 bg-blue-900 opacity-10"></div>
                </div>
                <div className="p-5">
                  <div className="mb-3">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {blog.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                    <a href={`/blogs/${blog.id}`}>{blog.title}</a>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{blog.author}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex space-x-3">
                      <div className="flex items-center text-gray-500 text-xs">
                        <MessageSquare size={14} className="mr-1" />
                        <span>{blog.comments}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-xs">
                        <Heart size={14} className="mr-1" />
                        <span>{blog.likes}</span>
                      </div>
                    </div>
                    <a 
                      href={`/blogs/${blog.id}`} 
                      className="flex items-center text-blue-600 text-xs font-medium hover:text-blue-800 transition-colors"
                    >
                      Read more <ChevronRight size={14} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pagination for blogs */}
        <div className="flex justify-center mt-12">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
              Previous
            </button>
            <button className="px-3 py-1 rounded-md bg-blue-600 text-white">1</button>
            <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
              2
            </button>
            <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
              3
            </button>
            <span className="px-3 py-1">...</span>
            <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
              10
            </button>
            <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
              Next
            </button>
          </nav>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-blue-50 py-12">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Subscribe to Our Blog</h2>
              <p className="text-gray-600 mb-8">
                Get the latest articles, tutorials, and educational resources delivered straight to your inbox.
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
                We'll send you quality content only. No spam, we promise.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Author CTA section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-6">
          <div className="bg-blue-800 text-white rounded-lg shadow-lg p-8 relative overflow-hidden">
            <AnimatedGridPattern
              numSquares={20}
              maxOpacity={0.3}
              duration={3}
              repeatDelay={1}
              className={cn(
                "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
                "absolute inset-0 opacity-40"
              )}
            />
            <div className="relative z-10 md:flex items-center justify-between">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-3">Become a Contributor</h2>
                <p className="text-blue-100">
                  Share your knowledge and expertise with our community. Write for the Learning Habits blog and help others master new skills.
                </p>
              </div>
              <div>
                <button className="bg-white text-blue-800 font-bold py-3 px-6 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition-colors">
                  Apply as Author
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular tags section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Topics</h2>
        <div className="flex flex-wrap gap-3">
          {[
            "Programming", "AI", "Machine Learning", "React", "JavaScript", 
            "Python", "Career Development", "Education Technology", "Learning Habits",
            "Data Science", "Blockchain", "Web Development", "Algorithms", 
            "Professional Growth", "Coding Tips", "Study Techniques"
          ].map((tag, index) => (
            <a 
              key={index} 
              href={`/blogs/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors"
            >
              {tag}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;