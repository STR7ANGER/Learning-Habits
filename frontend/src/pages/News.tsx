import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import {
  ExternalLink,
  RefreshCcw,
  Search,
  Calendar,
  Tag,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Type definition for news articles
interface NewsArticle {
  article_id: string;
  title: string;
  link: string;
  description: string;
  image_url: string | null;
  pubDate: string;
  source_id: string;
  source_priority: string;
  country: string[];
  category: string[];
  sentiment_score?: number;
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  results: NewsArticle[];
  nextPage: string;
}

// API key for NewsData.io
const API_KEY = "78yNlubh4HnEZmFt9oAQ4p26hKyG9JEV6JmbCgYL";

// Categories for filtering
const CATEGORIES = [
  { value: "technology", label: "Technology" },
  { value: "science", label: "Science" },
  { value: "programming", label: "Programming" },
  { value: "ai", label: "Artificial Intelligence" },
  { value: "apps", label: "Applications" },
  { value: "gadgets", label: "Gadgets" },
];

const News = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState({
    category: "technology",
    timeRange: "24h",
  });

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      // Construct the API URL with parameters
      const baseUrl = "https://newsdata.io/api/1/news";

      const params = new URLSearchParams({
        apikey: API_KEY,
        language: "en",
        size: "12",
        page: page.toString(),
        category: filters.category,
      });

      if (searchTerm) {
        params.append("q", searchTerm);
      }

      // Add time range filter
      if (filters.timeRange) {
        const now = new Date();
        // Calculate 'from' date based on timeRange
        let fromDate = new Date();
        switch (filters.timeRange) {
          case "7d":
            fromDate.setDate(now.getDate() - 7);
            break;
          case "30d":
            fromDate.setDate(now.getDate() - 30);
            break;
          default: // 24h
            fromDate.setDate(now.getDate() - 1);
        }
        params.append("from_date", fromDate.toISOString().split("T")[0]);
      }

      const response = await fetch(`${baseUrl}?${params.toString()}`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch news: ${response.status} ${response.statusText}`
        );
      }

      const data: NewsApiResponse = await response.json();

      if (
        data.status === "success" &&
        data.results &&
        data.results.length > 0
      ) {
        if (page === 1) {
          setNews(data.results);
        } else {
          setNews((prev) => [...prev, ...data.results]);
        }
      } else {
        setNews([]);
      }
    } catch (err) {
      console.error("Error fetching news:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [page, filters.category, filters.timeRange]);

  // Reset page when search or filters change
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    } else {
      fetchNews();
    }
  }, [searchTerm]);

  // Format publication date
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "Recent";
    }
  };

  // Get tech categories from article
  const getTechCategories = (categories: string[] = []): string[] => {
    const techKeywords = [
      "tech",
      "technology",
      "ai",
      "crypto",
      "blockchain",
      "vr",
      "ar",
      "cloud",
      "programming",
      "web",
      "development",
      "computer",
      "software",
      "hardware",
      "quantum",
      "cyber",
      "security",
    ];
    return categories.filter((cat) =>
      techKeywords.some((keyword) => cat.toLowerCase().includes(keyword))
    );
  };

  // Get sentiment color based on score (similar to stock news)
  const getSentimentColor = (score?: number) => {
    if (!score) return "bg-gray-100 text-gray-600";
    if (score >= 0.5) return "bg-emerald-100 text-emerald-700";
    if (score > 0) return "bg-blue-100 text-blue-700";
    if (score <= -0.5) return "bg-rose-100 text-rose-700";
    return "bg-orange-100 text-orange-700";
  };

  const resetFilters = () => {
    setFilters({
      category: "technology",
      timeRange: "24h",
    });
    setSearchTerm("");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
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
              text="Stay updated with the latest innovations, trends, and breakthroughs in the world of technology."
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

      {/* News content section with filters */}
      <div className="container mx-auto px-6 py-16">
        <div className="sticky top-0 z-10 space-y-4 bg-white/90 backdrop-blur-md p-6 rounded-xl border border-gray-200/50 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Latest Tech News
            </h2>
            <Button
              onClick={() => {
                setPage(1);
                fetchNews();
              }}
              variant="outline"
              className="flex items-center gap-2"
              disabled={loading}
            >
              <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              placeholder="Search news..."
              className="w-full bg-gray-50 text-gray-800 px-4 py-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-300"
            />
            <Search
              className="absolute left-3 top-3.5 text-gray-500"
              size={20}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-800"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div className="relative">
              <Tag
                className="absolute left-3 top-2.5 text-gray-500"
                size={20}
              />
              <select
                value={filters.category}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }));
                  setPage(1);
                }}
                className="w-full bg-gray-50 text-gray-800 pl-10 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-300 appearance-none cursor-pointer"
              >
                {CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-3 text-gray-500 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>

            {/* Time Range */}
            <div className="relative">
              <Calendar
                className="absolute left-3 top-2.5 text-gray-500"
                size={20}
              />
              <select
                value={filters.timeRange}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    timeRange: e.target.value,
                  }));
                  setPage(1);
                }}
                className="w-full bg-gray-50 text-gray-800 pl-10 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-300 appearance-none cursor-pointer"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <div className="absolute right-3 top-3 text-gray-500 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Reset Filters */}
          <Button
            onClick={resetFilters}
            variant="ghost"
            className="text-gray-600 hover:text-gray-900"
          >
            Reset Filters
          </Button>
        </div>

        {loading && page === 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden h-[450px]">
                <Skeleton className="h-48 w-full" />
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-8 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {news.map((article) => (
              <Card
                key={article.article_id}
                className="overflow-hidden bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow duration-300 border border-gray-200"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-48 overflow-hidden bg-gray-200">
                    {article.image_url ? (
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Replace broken images with a placeholder
                          (e.target as HTMLImageElement).src =
                            "/api/placeholder/400/320";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-50">
                        <img
                          src="/api/placeholder/400/320"
                          alt="placeholder"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="md:flex-1 p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.category &&
                        getTechCategories(article.category).map((cat, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-blue-100 text-blue-700"
                          >
                            {cat}
                          </Badge>
                        ))}
                      {article.sentiment_score !== undefined && (
                        <Badge
                          variant="secondary"
                          className={getSentimentColor(article.sentiment_score)}
                        >
                          Sentiment: {article.sentiment_score.toFixed(2)}
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.description ||
                        "Read the full article for more information."}
                    </p>

                    <div className="flex flex-wrap items-center justify-between mt-4">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{formatDate(article.pubDate)}</span>
                        <span>via {article.source_id}</span>
                      </div>

                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-300 group inline-flex items-center"
                      >
                        Read full article
                        <ExternalLink size={16} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!loading && news.length > 0 && (
          <div className="mt-8 text-center">
            <Button
              onClick={() => setPage((p) => p + 1)}
              variant="default"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              disabled={loading}
            >
              {loading && page > 1 ? (
                <RefreshCcw size={16} className="animate-spin mr-2" />
              ) : null}
              Load More News
            </Button>
          </div>
        )}

        {/* Loading More Indicator */}
        {loading && page > 1 && (
          <div className="mt-8 text-center">
            <div className="animate-pulse space-y-6">
              {[1, 2].map((n) => (
                <div key={n} className="bg-gray-100 rounded-xl p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && news.length === 0 && (
          <div className="text-center text-gray-600 py-12 bg-gray-50 rounded-xl border border-gray-200">
            No news articles found matching your criteria. Try adjusting your
            filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
