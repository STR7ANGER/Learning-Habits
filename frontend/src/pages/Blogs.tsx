import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import {
  Send,
  User,
  Clock,
  Filter,
  Heart,
  Bookmark,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Define types for our data structures
interface Comment {
  id: number;
  user: string;
  userRole: string;
  content: string;
  timestamp: string;
}

interface Message {
  id: number;
  user: string;
  userRole: string;
  avatar: string;
  content: string;
  timestamp: string;
  category: string;
  likes: number;
  comments: Comment[];
}

type CommentTextMap = {
  [key: number]: string;
};

type ExpandedCommentsMap = {
  [key: number]: boolean;
};

const Blogs: React.FC = () => {
  // State for filtering and search
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Chat categories
  const categories: string[] = [
    "All",
    "Questions",
    "Resources",
    "Study Groups",
    "Career Tips",
    "Technical Help",
  ];

  // State for the new message, comments, and message category
  const [newMessage, setNewMessage] = useState<string>("");
  const [newCommentText, setNewCommentText] = useState<CommentTextMap>({});
  const [messageCategory, setMessageCategory] = useState<string>("Questions");
  const [expandedComments, setExpandedComments] = useState<ExpandedCommentsMap>(
    {}
  );

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: "Sarah Johnson",
      userRole: "Education Technology Expert",
      avatar: "/avatars/sarah.jpg",
      content:
        "Has anyone tried the new learning platform that was mentioned in last week's webinar?",
      timestamp: "Today at 10:23 AM",
      category: "Questions",
      likes: 12,
      comments: [
        {
          id: 101,
          user: "Alex Brown",
          userRole: "Learning Designer",
          content:
            "Yes! I've been using it for a week now. The UI is very intuitive.",
          timestamp: "Today at 10:45 AM",
        },
      ],
    },
    {
      id: 2,
      user: "Michael Chen",
      userRole: "Senior Frontend Developer",
      avatar: "/avatars/michael.jpg",
      content:
        "I'm working on a React project and struggling with context API. Any resources you'd recommend?",
      timestamp: "Today at 10:15 AM",
      category: "Technical Help",
      likes: 8,
      comments: [],
    },
    {
      id: 3,
      user: "Emma Rodriguez",
      userRole: "Learning Psychologist",
      avatar: "/avatars/emma.jpg",
      content:
        "Just finished an amazing course on machine learning fundamentals. Happy to share notes if anyone's interested!",
      timestamp: "Today at 9:58 AM",
      category: "Resources",
      likes: 15,
      comments: [
        {
          id: 102,
          user: "James Wilson",
          userRole: "Data Science Student",
          content:
            "I'd love to see your notes! Been looking for good ML resources.",
          timestamp: "Today at 10:30 AM",
        },
      ],
    },
    {
      id: 4,
      user: "Amit Patel",
      userRole: "Machine Learning Engineer",
      avatar: "/avatars/amit.jpg",
      content:
        "Looking for study partners for the upcoming AWS certification exam. Anyone interested?",
      timestamp: "Today at 9:45 AM",
      category: "Study Groups",
      likes: 9,
      comments: [],
    },
    {
      id: 5,
      user: "Jessica Taylor",
      userRole: "Tech Career Coach",
      avatar: "/avatars/jessica.jpg",
      content:
        "I published a new blog post about productivity techniques for remote learning. Check it out and let me know what you think!",
      timestamp: "Today at 9:30 AM",
      category: "Resources",
      likes: 20,
      comments: [],
    },
    {
      id: 6,
      user: "Robert Williams",
      userRole: "Learning Specialist",
      avatar: "/avatars/robert.jpg",
      content:
        "Has anyone experimented with spaced repetition for learning programming concepts? I'd love to hear about your experience.",
      timestamp: "Yesterday at 5:15 PM",
      category: "Questions",
      likes: 7,
      comments: [],
    },
    {
      id: 7,
      user: "Thomas Lee",
      userRole: "Computer Science Instructor",
      avatar: "/avatars/thomas.jpg",
      content:
        "I'm organizing a virtual study group for data structures and algorithms. DM me if you want to join!",
      timestamp: "Yesterday at 4:30 PM",
      category: "Study Groups",
      likes: 18,
      comments: [],
    },
    {
      id: 8,
      user: "Olivia Martinez",
      userRole: "Leadership Coach",
      avatar: "/avatars/olivia.jpg",
      content:
        "Which note-taking app do you all prefer for technical subjects? I've been using Notion but looking for alternatives.",
      timestamp: "Yesterday at 3:45 PM",
      category: "Questions",
      likes: 14,
      comments: [],
    },
    {
      id: 9,
      user: "David Wilson",
      userRole: "Python Developer",
      avatar: "/avatars/david.jpg",
      content:
        "Just discovered a great YouTube channel for Python tutorials. The instructor explains concepts really well. Link in my profile!",
      timestamp: "Yesterday at 2:20 PM",
      category: "Resources",
      likes: 22,
      comments: [],
    },
    {
      id: 10,
      user: "Sophia Garcia",
      userRole: "Junior Developer",
      avatar: "/avatars/sophia.jpg",
      content:
        "Working on my portfolio website. Any feedback on which projects I should highlight as a junior developer?",
      timestamp: "Yesterday at 1:10 PM",
      category: "Career Tips",
      likes: 11,
      comments: [],
    },
  ]);

  // Filter messages based on category
  const filteredMessages = messages.filter((message) => {
    return selectedCategory === "All" || message.category === selectedCategory;
  });

  // Handle form submission for new message
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    // Create a new message
    const newChatMessage: Message = {
      id: messages.length + 1,
      user: "You",
      userRole: "Learning Community Member",
      avatar: "/avatars/default.jpg",
      content: newMessage,
      timestamp: "Just now",
      category: messageCategory, // Use the selected category
      likes: 0,
      comments: [], // Initialize with empty comments array
    };

    // Add the new message to the list
    setMessages([newChatMessage, ...messages]);

    // Clear the input field
    setNewMessage("");
  };

  // Handle like button
  const handleLike = (id: number) => {
    setMessages(
      messages.map((message) =>
        message.id === id ? { ...message, likes: message.likes + 1 } : message
      )
    );
  };

  // Handle comment submission
  const handleCommentSubmit = (messageId: number) => {
    if (!newCommentText[messageId] || newCommentText[messageId].trim() === "")
      return;

    const newComment: Comment = {
      id: Date.now(), // Use timestamp as id
      user: "You",
      userRole: "Learning Community Member",
      content: newCommentText[messageId],
      timestamp: "Just now",
    };

    setMessages(
      messages.map((message) =>
        message.id === messageId
          ? { ...message, comments: [...message.comments, newComment] }
          : message
      )
    );

    // Clear comment input for this message
    setNewCommentText((prev) => ({ ...prev, [messageId]: "" }));
  };

  // Toggle comment section visibility
  const toggleComments = (messageId: number) => {
    setExpandedComments((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }));
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
                text="Learning Community Chat"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-5xl font-bold"
              />
            </div>
            <SplitText
              text="Connect with fellow learners, share resources, and ask questions in our open chat pool."
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

      {/* Category filters section */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <div className="flex items-center mr-2">
            <Filter size={18} className="text-blue-600 mr-2" />
            <span className="text-gray-700 font-medium">Filter by:</span>
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

      {/* Main content with chat pool */}
      <div className="container mx-auto px-6 pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Message list */}
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Community Messages
            </h2>

            {/* No results message */}
            {filteredMessages.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <Bookmark size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No messages found
                </h3>
                <p className="text-gray-500">
                  Try selecting a different category
                </p>
              </div>
            )}

            <div className="space-y-6">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow",
                    message.user === "You" ? "border-l-4 border-blue-500" : ""
                  )}
                >
                  <div className="p-5">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center">
                        <User size={20} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {message.user}
                        </p>
                        <p className="text-sm text-gray-500">
                          {message.userRole}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">
                          {message.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{message.content}</p>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock size={14} className="mr-1" />
                        <span>{message.timestamp}</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleComments(message.id)}
                          className="flex items-center text-gray-500 hover:text-blue-500 transition-colors"
                        >
                          <MessageSquare size={16} className="mr-1" />
                          <span>{message.comments.length}</span>
                          {expandedComments[message.id] ? (
                            <ChevronUp size={16} className="ml-1" />
                          ) : (
                            <ChevronDown size={16} className="ml-1" />
                          )}
                        </button>

                        <button
                          onClick={() => handleLike(message.id)}
                          className="flex items-center text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Heart
                            size={16}
                            className="mr-1"
                            fill={message.likes > 0 ? "#ef4444" : "none"}
                          />
                          <span>{message.likes}</span>
                        </button>
                      </div>
                    </div>

                    {/* Comments section */}
                    {expandedComments[message.id] && (
                      <div className="mt-4 pl-4 border-l-2 border-gray-100">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Comments
                        </h4>

                        {message.comments.length === 0 ? (
                          <p className="text-sm text-gray-500 italic">
                            No comments yet
                          </p>
                        ) : (
                          <div className="space-y-3">
                            {message.comments.map((comment) => (
                              <div
                                key={comment.id}
                                className="bg-gray-50 p-3 rounded-md"
                              >
                                <div className="flex items-center mb-1">
                                  <p className="text-sm font-medium text-gray-700">
                                    {comment.user}
                                  </p>
                                  <span className="mx-2 text-gray-400">•</span>
                                  <p className="text-xs text-gray-500">
                                    {comment.timestamp}
                                  </p>
                                </div>
                                <p className="text-sm text-gray-600">
                                  {comment.content}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Comment input */}
                        <div className="mt-3 flex">
                          <input
                            type="text"
                            value={newCommentText[message.id] || ""}
                            onChange={(e) =>
                              setNewCommentText({
                                ...newCommentText,
                                [message.id]: e.target.value,
                              })
                            }
                            placeholder="Add a comment..."
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => handleCommentSubmit(message.id)}
                            className="bg-blue-500 text-white px-3 py-2 rounded-r-md hover:bg-blue-600 transition-colors"
                            disabled={!newCommentText[message.id]}
                          >
                            <Send size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Message input */}
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-8">
              <div className="h-12 bg-blue-600 flex items-center px-4">
                <h2 className="text-white font-medium">Add Your Message</h2>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Share your thoughts, questions, or resources:
                    </label>
                    <textarea
                      className="w-full h-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Type your message here..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    ></textarea>
                  </div>

                  {/* Category selection */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Message Category:
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      value={messageCategory}
                      onChange={(e) => setMessageCategory(e.target.value)}
                    >
                      {categories
                        .filter((cat) => cat !== "All")
                        .map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center font-medium"
                      disabled={newMessage.trim() === ""}
                    >
                      <Send size={18} className="mr-2" />
                      Post to Community
                    </button>
                  </div>
                </form>

                <div className="mt-6 p-4 bg-blue-50 rounded-md">
                  <h3 className="text-blue-800 font-medium mb-2">
                    Community Guidelines
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Be respectful and supportive of others</li>
                    <li>• Stay on topic with learning-related discussions</li>
                    <li>• Share valuable resources and insights</li>
                    <li>• No spam or self-promotion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
