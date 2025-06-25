import { useState, FormEvent, ChangeEvent } from "react";
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
  Trophy,
  Calendar,
  Code,
  Target,
  Github,
  Linkedin,
  Mail,
  User,
  Phone,
  Briefcase,
  CheckCircle,
  LucideIcon,
} from "lucide-react";

// Type definitions
interface Hackathon {
  id: number;
  title: string;
  theme: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "completed";
  registrationOpen: boolean;
  registrationDeadline: string;
  participants: number;
  maxParticipants: number;
  prizePool: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  requirements: string[];
  mentors: string[];
  sponsors: string[];
}

interface Winner {
  team: string;
  project: string;
  members: string[];
  prize: string;
  description: string;
}

interface PreviousHackathon {
  id: number;
  title: string;
  theme: string;
  date: string;
  winner: Winner;
  participants: number;
  projects: number;
}

interface LeaderboardEntry {
  rank: number;
  team: string;
  points: number;
  wins: number;
  participations: number;
}

interface SkillPoolEntry {
  skill: string;
  participants: number;
  demand: "Very High" | "High" | "Medium" | "Low";
}

interface RegistrationForm {
  name: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  experience: string;
  skills: string;
  teamName: string;
  motivation: string;
}

interface TabConfig {
  id: string;
  label: string;
  icon: LucideIcon;
}

type ActiveTab = "upcoming" | "leaderboard" | "winners" | "skills";

const Events: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("upcoming");
  const [registrationForm, setRegistrationForm] = useState<RegistrationForm>({
    name: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    experience: "",
    skills: "",
    teamName: "",
    motivation: "",
  });
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(
    null
  );
  const [showRegistrationForm, setShowRegistrationForm] =
    useState<boolean>(false);

  // Weekly hackathon themes
  const hackathons: Hackathon[] = [
    {
      id: 1,
      title: "Learning Habits Hackathon #8",
      theme: "Educational Technology & Learning Systems",
      date: "Saturday, June 28, 2025",
      time: "9:00 AM - 9:00 PM IST",
      location: "Online & Hybrid Hub",
      status: "upcoming",
      registrationOpen: true,
      registrationDeadline: "Friday, June 27, 2025 11:59 PM",
      participants: 0,
      maxParticipants: 200,
      prizePool: "₹50,000",
      difficulty: "Intermediate",
      description:
        "Build innovative solutions to enhance learning experiences and educational habits.",
      requirements: [
        "Web/Mobile Development",
        "UI/UX Design",
        "Educational Psychology",
      ],
      mentors: ["Dr. Sarah Johnson", "Alex Chen", "Priya Sharma"],
      sponsors: ["EduTech Inc.", "Learning Labs", "TechForEd"],
    },
    {
      id: 2,
      title: "Learning Habits Hackathon #9",
      theme: "AI-Powered Personal Development",
      date: "Saturday, July 5, 2025",
      time: "9:00 AM - 9:00 PM IST",
      location: "Online & Hybrid Hub",
      status: "upcoming",
      registrationOpen: false,
      registrationDeadline: "Friday, July 4, 2025 11:59 PM",
      participants: 0,
      maxParticipants: 200,
      prizePool: "₹50,000",
      difficulty: "Advanced",
      description:
        "Create AI solutions that help individuals develop better learning and productivity habits.",
      requirements: [
        "Machine Learning",
        "Natural Language Processing",
        "Mobile Development",
      ],
      mentors: ["Dr. Raj Patel", "Maria Rodriguez", "Zhang Wei"],
      sponsors: ["AI Solutions", "MindTech", "Future Labs"],
    },
  ];

  // Previous hackathons with winners
  const previousHackathons: PreviousHackathon[] = [
    {
      id: 1,
      title: "Learning Habits Hackathon #7",
      theme: "Gamified Learning Platforms",
      date: "Saturday, June 21, 2025",
      winner: {
        team: "CodeCrafters",
        project: "EduQuest",
        members: ["Arjun Kumar", "Sneha Patel", "Rahul Singh"],
        prize: "₹25,000",
        description:
          "A gamified platform that turns daily learning into an RPG adventure.",
      },
      participants: 180,
      projects: 45,
    },
    {
      id: 2,
      title: "Learning Habits Hackathon #6",
      theme: "Mental Health & Wellness Apps",
      date: "Saturday, June 14, 2025",
      winner: {
        team: "MindfulCoders",
        project: "ZenStudy",
        members: ["Anita Sharma", "Vikram Joshi", "Priya Nair"],
        prize: "₹25,000",
        description:
          "An app that combines mindfulness practices with study routines.",
      },
      participants: 165,
      projects: 42,
    },
    {
      id: 3,
      title: "Learning Habits Hackathon #5",
      theme: "Accessibility in Education",
      date: "Saturday, June 7, 2025",
      winner: {
        team: "InclusiveTech",
        project: "LearnForAll",
        members: ["Ravi Gupta", "Meera Shah", "Arun Kumar"],
        prize: "₹25,000",
        description:
          "Educational platform with advanced accessibility features for differently-abled learners.",
      },
      participants: 155,
      projects: 38,
    },
  ];

  // Leaderboard data
  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, team: "CodeCrafters", points: 2850, wins: 3, participations: 5 },
    {
      rank: 2,
      team: "MindfulCoders",
      points: 2620,
      wins: 2,
      participations: 6,
    },
    {
      rank: 3,
      team: "InclusiveTech",
      points: 2400,
      wins: 2,
      participations: 4,
    },
    { rank: 4, team: "InnovateEdu", points: 2150, wins: 1, participations: 7 },
    { rank: 5, team: "TechLearners", points: 1980, wins: 1, participations: 5 },
    { rank: 6, team: "FutureMakers", points: 1750, wins: 0, participations: 4 },
    { rank: 7, team: "DevMinds", points: 1650, wins: 1, participations: 3 },
    {
      rank: 8,
      team: "CreativeCoders",
      points: 1520,
      wins: 0,
      participations: 6,
    },
  ];

  // Skill pool data
  const skillPool: SkillPoolEntry[] = [
    { skill: "React/Next.js", participants: 145, demand: "High" },
    { skill: "Python/Django", participants: 120, demand: "High" },
    { skill: "Machine Learning", participants: 89, demand: "Very High" },
    { skill: "UI/UX Design", participants: 110, demand: "High" },
    { skill: "Node.js", participants: 95, demand: "Medium" },
    { skill: "Flutter/React Native", participants: 78, demand: "High" },
    { skill: "Data Science", participants: 65, demand: "Very High" },
    { skill: "DevOps", participants: 45, demand: "Medium" },
    { skill: "Blockchain", participants: 32, demand: "Low" },
    { skill: "Cybersecurity", participants: 28, demand: "Medium" },
  ];

  const tabs: TabConfig[] = [
    { id: "upcoming", label: "Upcoming Hackathons", icon: Calendar },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "winners", label: "Previous Winners", icon: Award },
    { id: "skills", label: "Skill Pool", icon: Code },
  ];

  // Handle form input changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setRegistrationForm({
      ...registrationForm,
      [name]: value,
    });
  };

  // Handle registration submission
  const handleRegistration = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Simulate registration process
    alert(`Successfully registered for ${selectedHackathon?.title}!`);
    setShowRegistrationForm(false);
    setRegistrationForm({
      name: "",
      email: "",
      phone: "",
      github: "",
      linkedin: "",
      experience: "",
      skills: "",
      teamName: "",
      motivation: "",
    });
  };

  const upcomingHackathons = hackathons.filter((h) => h.status === "upcoming");

  const getDemandColor = (demand: SkillPoolEntry["demand"]): string => {
    switch (demand) {
      case "Very High":
        return "bg-red-100 text-red-800";
      case "High":
        return "bg-orange-100 text-orange-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy size={20} className="text-yellow-500 mr-2" />;
      case 2:
        return <Award size={20} className="text-gray-400 mr-2" />;
      case 3:
        return <Award size={20} className="text-orange-600 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
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
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <BlurText
                text="Weekly Learning Habits Hackathon"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-5xl font-bold"
              />
            </div>
            <SplitText
              text="Join us every Saturday for exciting hackathons focused on educational technology, learning systems, and innovative solutions that enhance how we learn and grow."
              className="text-xl text-gray-200 max-w-3xl mx-auto mb-8"
              delay={10}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              threshold={0.2}
              rootMargin="-50px"
            />
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm font-medium">Every Saturday</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm font-medium">₹50,000 Prize Pool</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm font-medium">12 Hours Challenge</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="flex flex-wrap border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={cn(
                  "flex items-center px-6 py-4 font-medium transition-colors",
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                )}
              >
                <tab.icon size={18} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Hackathons Tab */}
        {activeTab === "upcoming" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left sidebar - Quick Stats */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Hackathons</span>
                    <span className="font-bold text-blue-600">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Participants</span>
                    <span className="font-bold text-blue-600">1,200+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Projects Built</span>
                    <span className="font-bold text-blue-600">300+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prize Money Awarded</span>
                    <span className="font-bold text-blue-600">₹4,00,000</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Upcoming Themes
                </h3>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                    <p className="font-medium text-gray-800">
                      Educational Technology
                    </p>
                    <p className="text-sm text-gray-600">June 28, 2025</p>
                  </div>
                  <div className="p-3 border-l-4 border-green-500 bg-green-50">
                    <p className="font-medium text-gray-800">
                      AI-Powered Development
                    </p>
                    <p className="text-sm text-gray-600">July 5, 2025</p>
                  </div>
                  <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
                    <p className="font-medium text-gray-800">
                      Sustainable Tech
                    </p>
                    <p className="text-sm text-gray-600">July 12, 2025</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content - Hackathon Cards */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {upcomingHackathons.map((hackathon) => (
                  <div
                    key={hackathon.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            {hackathon.title}
                          </h3>
                          <p className="text-lg text-blue-600 font-medium">
                            {hackathon.theme}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={cn(
                              "px-3 py-1 rounded-full text-sm font-medium",
                              hackathon.registrationOpen
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            )}
                          >
                            {hackathon.registrationOpen
                              ? "Registration Open"
                              : "Coming Soon"}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-6">
                        {hackathon.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="space-y-3">
                          <div className="flex items-center text-gray-600">
                            <Calendar
                              size={18}
                              className="mr-3 text-blue-600"
                            />
                            <span>{hackathon.date}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock size={18} className="mr-3 text-blue-600" />
                            <span>{hackathon.time}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin size={18} className="mr-3 text-blue-600" />
                            <span>{hackathon.location}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center text-gray-600">
                            <Trophy size={18} className="mr-3 text-blue-600" />
                            <span>Prize Pool: {hackathon.prizePool}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users size={18} className="mr-3 text-blue-600" />
                            <span>
                              {hackathon.participants}/
                              {hackathon.maxParticipants} registered
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Target size={18} className="mr-3 text-blue-600" />
                            <span>Level: {hackathon.difficulty}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Required Skills:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {hackathon.requirements.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          Registration closes: {hackathon.registrationDeadline}
                        </div>
                        {hackathon.registrationOpen && (
                          <button
                            onClick={() => {
                              setSelectedHackathon(hackathon);
                              setShowRegistrationForm(true);
                            }}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                          >
                            Register Now{" "}
                            <ArrowUpRight size={16} className="ml-1" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Trophy size={24} className="mr-3 text-yellow-500" />
                Team Leaderboard
              </h2>
              <p className="text-gray-600 mt-2">
                Rankings based on overall performance across all hackathons
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Team
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Wins
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Participations
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaderboard.map((team) => (
                    <tr
                      key={team.rank}
                      className={team.rank <= 3 ? "bg-yellow-50" : ""}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getRankIcon(team.rank)}
                          <span className="text-sm font-medium text-gray-900">
                            #{team.rank}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {team.team}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-semibold">
                          {team.points}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{team.wins}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {team.participations}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Previous Winners Tab */}
        {activeTab === "winners" && (
          <div className="space-y-6">
            {previousHackathons.map((hackathon) => (
              <div
                key={hackathon.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {hackathon.title}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        {hackathon.theme}
                      </p>
                      <p className="text-sm text-gray-500">{hackathon.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        {hackathon.participants} participants
                      </div>
                      <div className="text-sm text-gray-600">
                        {hackathon.projects} projects
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-4 rounded">
                    <div className="flex items-start">
                      <Trophy size={24} className="text-yellow-500 mr-3 mt-1" />
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-800 mb-2">
                          🏆 Winner: {hackathon.winner.team}
                        </h4>
                        <h5 className="font-semibold text-gray-700 mb-2">
                          Project: {hackathon.winner.project}
                        </h5>
                        <p className="text-gray-600 mb-3">
                          {hackathon.winner.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">
                              Team Members:
                            </p>
                            <p className="text-sm font-medium text-gray-800">
                              {hackathon.winner.members.join(", ")}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Prize Won</p>
                            <p className="text-lg font-bold text-green-600">
                              {hackathon.winner.prize}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skill Pool Tab */}
        {activeTab === "skills" && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Code size={24} className="mr-3 text-blue-600" />
                Skill Pool Analysis
              </h2>
              <p className="text-gray-600 mt-2">
                Overview of participant skills and market demand
              </p>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skillPool.map((skill, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {skill.skill}
                      </h3>
                      <span
                        className={cn(
                          "px-2 py-1 rounded text-xs font-medium",
                          getDemandColor(skill.demand)
                        )}
                      >
                        {skill.demand} Demand
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users size={16} className="mr-2" />
                      <span>{skill.participants} participants</span>
                    </div>
                    <div className="mt-3 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(skill.participants / 150) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Registration Form Modal */}
      {showRegistrationForm && selectedHackathon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                Register for {selectedHackathon.title}
              </h2>
              <p className="text-gray-600 mt-1">{selectedHackathon.theme}</p>
            </div>

            <form onSubmit={handleRegistration} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <User size={16} className="inline mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={registrationForm.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail size={16} className="inline mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={registrationForm.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone size={16} className="inline mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={registrationForm.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Briefcase size={16} className="inline mr-1" />
                    Experience Level
                  </label>
                  <select
                    name="experience"
                    value={registrationForm.experience}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select experience level</option>
                    <option value="beginner">Beginner (0-1 years)</option>
                    <option value="intermediate">
                      Intermediate (1-3 years)
                    </option>
                    <option value="advanced">Advanced (3+ years)</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Github size={16} className="inline mr-1" />
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={registrationForm.github}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Linkedin size={16} className="inline mr-1" />
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={registrationForm.linkedin}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Code size={16} className="inline mr-1" />
                  Technical Skills *
                </label>
                <textarea
                  name="skills"
                  required
                  value={registrationForm.skills}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="List your technical skills (e.g., React, Node.js, Python, UI/UX Design, etc.)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Users size={16} className="inline mr-1" />
                  Team Name (Optional)
                </label>
                <input
                  type="text"
                  name="teamName"
                  value={registrationForm.teamName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="If you're registering as a team, enter team name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Target size={16} className="inline mr-1" />
                  Why do you want to participate? *
                </label>
                <textarea
                  name="motivation"
                  required
                  value={registrationForm.motivation}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about your motivation and what you hope to achieve..."
                />
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <div className="flex">
                  <CheckCircle
                    size={20}
                    className="text-blue-600 mr-2 mt-0.5"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">
                      Registration Details
                    </h4>
                    <ul className="text-sm text-blue-700 mt-2 space-y-1">
                      <li>
                        • Registration is free and open to all skill levels
                      </li>
                      <li>
                        • You can participate individually or in teams of up to
                        4 members
                      </li>
                      <li>
                        • All necessary resources and mentorship will be
                        provided
                      </li>
                      <li>• Winners receive cash prizes and certificates</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRegistrationForm(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                >
                  <CheckCircle size={16} className="mr-2" />
                  Register Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our community of innovative developers, designers, and
            problem-solvers. Every Saturday brings a new challenge and
            opportunity to learn.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                if (
                  upcomingHackathons.length > 0 &&
                  upcomingHackathons[0]?.registrationOpen
                ) {
                  setSelectedHackathon(upcomingHackathons[0]);
                  setShowRegistrationForm(true);
                }
              }}
              className="bg-white text-blue-800 font-bold py-3 px-8 rounded-md hover:bg-blue-100 transition-colors"
            >
              Register for Next Hackathon
            </button>
            <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-md hover:bg-white hover:text-blue-800 transition-colors">
              Join Our Community
            </button>
          </div>
          <div className="mt-8 flex justify-center space-x-8 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold">8</div>
              <div className="text-blue-200">Hackathons Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">1200+</div>
              <div className="text-blue-200">Participants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">₹4L+</div>
              <div className="text-blue-200">Prizes Awarded</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
