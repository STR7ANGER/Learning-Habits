import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShineBorder } from "@/components/magicui/shine-border";
import { motion } from "framer-motion";
import {
  Clock,
  Search,
  Filter,
  ArrowUpRight,
  ChevronRight,
  RefreshCw,
  Award,
} from "lucide-react";

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
  url: string;
  imageUrl: string;
  ranking?: number;
}

// Define animation variants
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

const News: React.FC = () => {
  // State for search, filter, and news data
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Categories for filtering - strictly tech-related categories
  const categories = [
    "All",
    "AI",
    "Blockchain",
    "Cloud",
    "Cybersecurity",
    "AR/VR",
    "Fullstack",
  ];

  // News fetching logic
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      const baseUrl = "https://newsapi.org/v2/everything";

      // Strictly tech topics query string
      const techQueryString =
        "artificial intelligence OR AI OR blockchain OR cryptocurrency OR crypto OR cloud computing OR AR OR VR OR augmented reality OR virtual reality OR cybersecurity OR cyber security OR fullstack OR full-stack OR tech OR technology";

      const params = new URLSearchParams({
        q: techQueryString,
        apiKey: apiKey || "",
        language: "en",
        sortBy: "publishedAt",
        pageSize: "15", // Fetch 15 articles
      });

      const response = await fetch(`${baseUrl}?${params}`);
      const data = await response.json();

      if (data.status !== "ok") {
        throw new Error(data.message || "Failed to fetch news");
      }

      if (!data.articles || data.articles.length === 0) {
        throw new Error("No tech news articles found");
      }

      // Process and transform the API data
      const processedArticles = data.articles.map(
        (article: any, index: number) => {
          // Determine specific tech category based on content
          let category = "Technology";
          const title = article.title.toLowerCase();
          const desc = article.description?.toLowerCase() || "";
          const content = article.content?.toLowerCase() || "";
          const combinedText = `${title} ${desc} ${content}`;

          if (
            combinedText.includes("ai") ||
            combinedText.includes("artificial intelligence") ||
            combinedText.includes("machine learning") ||
            combinedText.includes("deep learning")
          ) {
            category = "AI";
          } else if (
            combinedText.includes("blockchain") ||
            combinedText.includes("web3") ||
            combinedText.includes("ethereum") ||
            combinedText.includes("smart contract")
          ) {
            category = "Blockchain";
          } else if (
            combinedText.includes("crypto") ||
            combinedText.includes("bitcoin") ||
            combinedText.includes("cryptocurrency") ||
            combinedText.includes("token")
          ) {
            category = "Blockchain";
          } else if (
            combinedText.includes("cloud") ||
            combinedText.includes("aws") ||
            combinedText.includes("azure") ||
            combinedText.includes("serverless")
          ) {
            category = "Cloud";
          } else if (
            combinedText.includes("cyber") ||
            combinedText.includes("security") ||
            combinedText.includes("hack") ||
            combinedText.includes("breach")
          ) {
            category = "Cybersecurity";
          } else if (
            combinedText.includes("ar") ||
            combinedText.includes("vr") ||
            combinedText.includes("augmented reality") ||
            combinedText.includes("virtual reality") ||
            combinedText.includes("metaverse")
          ) {
            category = "AR/VR";
          } else if (
            combinedText.includes("fullstack") ||
            combinedText.includes("full-stack") ||
            combinedText.includes("frontend") ||
            combinedText.includes("backend") ||
            combinedText.includes("web development")
          ) {
            category = "Fullstack";
          }

          // Calculate read time (approx 200 words per minute)
          const contentLength =
            (article.content?.split(" ").length || 0) +
            (article.description?.split(" ").length || 0);
          const readTime = Math.max(1, Math.ceil(contentLength / 200));

          // Format date
          const date = new Date(article.publishedAt);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          // Make first three articles featured
          const featured = index < 3;

          // Use placeholder images for articles without images
          const imageUrl = article.urlToImage || "/api/placeholder/600/400";

          // Assign ranking based on relevance
          const ranking = index + 1;

          return {
            id: index + 1,
            title: article.title,
            excerpt: article.description || "No description available",
            category: category,
            date: formattedDate,
            readTime: `${readTime} min read`,
            featured: featured,
            url: article.url,
            imageUrl: imageUrl,
            ranking: ranking,
          };
        }
      );

      setNewsArticles(processedArticles);
    } catch (err: any) {
      setError(err.message || "Failed to fetch tech news");
      setNewsArticles([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter articles based on search query and selected category
  const filteredArticles = newsArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort articles based on ranking
  const sortedArticles = [...filteredArticles].sort(
    (a, b) => (a.ranking || 999) - (b.ranking || 999)
  );

  // Split articles into featured and regular
  const featuredArticles = sortedArticles.filter((article) => article.featured);
  const regularArticles = sortedArticles.filter((article) => !article.featured);

  // Color mapping for categories - updated for tech categories
  const categoryColors: Record<string, string> = {
    AI: "from-violet-600 to-purple-600",
    Blockchain: "from-blue-600 to-indigo-600",
    Cloud: "from-sky-500 to-blue-500",
    Cybersecurity: "from-red-500 to-rose-600",
    "AR/VR": "from-teal-500 to-green-500",
    Fullstack: "from-amber-500 to-orange-500",
    Technology: "from-gray-600 to-gray-800",
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
                text="Tech News & Updates"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-5xl font-bold"
              />
            </div>
            <SplitText
              text="Stay informed with the latest technology news, trends, and updates from around the world."
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

      {/* News section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left side: Top News Rankings */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    Top Stories
                  </CardTitle>
                  <Award size={20} className="text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sortedArticles.slice(0, 5).map((article, index) => (
                    <div
                      key={index}
                      className="flex items-center border-b border-gray-100 pb-4 last:border-0"
                    >
                      <div className="text-2xl font-bold text-blue-600 w-8">
                        #{article.ranking || index + 1}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-800">
                          {article.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock size={14} className="mr-1" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Latest Updates */}
            <Card className="shadow-lg mt-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    Latest Updates
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sortedArticles.slice(0, 5).map((article, index) => (
                    <div
                      key={index}
                      className="flex items-start py-2 border-t border-gray-100 first:border-0"
                    >
                      <div
                        className={`bg-gradient-to-r ${
                          categoryColors[article.category]
                        } p-2 rounded-md mr-3 text-white`}
                      >
                        <Clock size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {article.title}
                        </p>
                        <p className="text-sm text-gray-500">{article.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side: News articles */}
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
                  placeholder="Search tech news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category filters */}
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center mr-2">
                  <Filter size={18} className="text-blue-600 mr-2" />
                  <span className="text-gray-700 font-medium">Category:</span>
                </div>
                {categories.map((category) => (
                  <Badge
                    key={category}
                    className={cn(
                      "cursor-pointer px-3 py-1",
                      selectedCategory === category
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    )}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Loading state */}
            {loading && (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin h-8 w-8 rounded-full border-4 border-blue-600 border-r-transparent"></div>
              </div>
            )}

            {/* Error state */}
            {error && (
              <Card className="mb-8 border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-700">
                    Error loading tech news
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-600">{error}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    onClick={fetchNews}
                    className="text-red-700"
                  >
                    <RefreshCw size={16} className="mr-2" /> Try Again
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Featured articles */}
            {!loading && featuredArticles.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Featured Stories
                </h2>
                <motion.div
                  className="space-y-6"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {featuredArticles.map((article) => {
                    const colorClass =
                      categoryColors[article.category] ||
                      "from-gray-600 to-gray-800";

                    return (
                      <motion.div
                        key={article.id}
                        variants={cardVariants}
                        className="group"
                      >
                        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-gray-200">
                          <ShineBorder
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            shineColor={["#3B82F6", "#1E40AF", "#60A5FA"]}
                          />
                          <div className="md:flex">
                            <div className="w-full md:w-1/3 h-40 md:h-auto bg-gray-300 relative overflow-hidden">
                              <img
                                src={article.imageUrl}
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-blue-900 opacity-10"></div>
                              <Badge
                                className={`absolute top-2 left-2 bg-gradient-to-r ${colorClass} text-white border-0 px-2 py-1`}
                              >
                                {article.category}
                              </Badge>
                            </div>
                            <div className="p-6 md:w-2/3">
                              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                {article.title}
                              </h3>
                              <p className="text-gray-600 mb-4">
                                {article.excerpt}
                              </p>
                              <div className="grid grid-cols-2 gap-y-2 text-sm">
                                <div className="flex items-center text-gray-600">
                                  <Clock
                                    size={16}
                                    className="mr-2 text-blue-600"
                                  />
                                  {article.date}
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Clock
                                    size={16}
                                    className="mr-2 text-blue-600"
                                  />
                                  {article.readTime}
                                </div>
                              </div>
                              <div className="mt-4 flex items-center justify-between">
                                <Badge
                                  variant="outline"
                                  className="flex items-center text-sm text-gray-500"
                                >
                                  <span>Rank #{article.ranking || "?"}</span>
                                </Badge>
                                <Button
                                  className={`bg-gradient-to-r ${colorClass} text-white hover:saturate-150`}
                                  size="sm"
                                  asChild
                                >
                                  <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center"
                                  >
                                    Read{" "}
                                    <ArrowUpRight
                                      size={14}
                                      className="ml-1 group-hover:translate-x-1 transition-transform"
                                    />
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            )}

            {/* Regular articles */}
            {!loading && regularArticles.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Latest Tech News
                </h2>
                <motion.div
                  className="grid md:grid-cols-2 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {regularArticles.map((article) => {
                    const colorClass =
                      categoryColors[article.category] ||
                      "from-gray-600 to-gray-800";

                    return (
                      <motion.div
                        key={article.id}
                        variants={cardVariants}
                        className="group"
                      >
                        <Card className="overflow-hidden shadow hover:shadow-md transition-shadow duration-300 border-gray-200 h-full flex flex-col">
                          <ShineBorder
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            shineColor={["#3B82F6", "#1E40AF", "#60A5FA"]}
                          />
                          <div className="relative h-40 overflow-hidden">
                            <img
                              src={article.imageUrl}
                              alt={article.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <Badge
                              className={`absolute top-3 right-3 z-10 px-2 py-1 text-xs bg-gradient-to-r ${colorClass} text-white border-0`}
                            >
                              {article.category}
                            </Badge>
                          </div>

                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                {article.title}
                              </CardTitle>
                              <Badge
                                variant="outline"
                                className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1"
                              >
                                Rank #{article.ranking || "?"}
                              </Badge>
                            </div>
                          </CardHeader>

                          <CardContent className="flex-grow pb-2">
                            <p className="text-gray-600 text-sm line-clamp-2">
                              {article.excerpt}
                            </p>
                          </CardContent>

                          <CardFooter className="flex justify-between items-center pt-2">
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock size={12} className="mr-1" />
                              <span>{article.readTime}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-800 p-0"
                              asChild
                            >
                              <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-sm"
                              >
                                Read{" "}
                                <ChevronRight
                                  size={14}
                                  className="ml-1 group-hover:translate-x-1 transition-transform"
                                />
                              </a>
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            )}

            {/* No results */}
            {!loading && filteredArticles.length === 0 && !error && (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <Search size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No tech articles found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}

            {/* Refresh button */}
            {!loading && (
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={fetchNews}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Refresh Tech News
                </Button>
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
          <h2 className="text-3xl font-bold mb-4">
            Stay Informed with Tech News!
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for weekly updates on the latest
            technology trends and innovations.
          </p>
          <Button className="bg-white text-blue-800 hover:bg-blue-100 transition-colors font-bold py-3 px-8">
            Subscribe Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default News;
