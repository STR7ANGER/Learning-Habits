import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Home from "@/components/Home";
import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";
import Projects from "@/pages/Projects";
import Events from "@/pages/Events";
import News from "@/pages/News";
import Blogs from "@/pages/Blogs";
import Expert from "@/pages/Expert";
import ExpertSignUp from "@/pages/expert/ExpertSignUp";
import ExpertLogin from "@/pages/expert/ExpertLogin";
import LearnerLogin from "@/pages/LearnerLogin";
import LearnerSignUp from "@/pages/LeanerSignUp";
import Dashboard from "@/pages/expert/Dashboard";
import Sessions from "@/pages/expert/Sessions";
import MyProjects from "@/pages/MyProjects";
import JobTalks from "@/pages/JobTalks";
import TechnologyLearning from "@/pages/TechnologyLearning";

const PublicRoutes = () => {
  const { isAuthenticated } = useAuth();

  return [
    <Route
      key="login"
      path="/login"
      element={
        isAuthenticated ? <Navigate to="/project" replace /> : <LearnerLogin />
      }
    />,
    <Route
      key="signup"
      path="/signup"
      element={
        isAuthenticated ? <Navigate to="/project" replace /> : <LearnerSignUp />
      }
    />,
    <Route key="home" path="/" element={<Home />} />,
    <Route key="about" path="/about" element={<AboutUs />} />,
    <Route key="contact" path="/contact" element={<ContactUs />} />,
    <Route key="project" path="/project" element={<Projects />} />,
    <Route key="event" path="/event" element={<Events />} />,
    <Route key="news" path="/news" element={<News />} />,
    <Route key="blog" path="/blog" element={<Blogs />} />,
    <Route key="expert" path="/expert" element={<Expert />} />,
    <Route
      key="expertsingup"
      path="/expertsignup"
      element={<ExpertSignUp />}
    />,
    <Route key="expertlogin" path="/expertlogin" element={<ExpertLogin />} />,
    <Route key="dashboard" path="/dashboard" element={<Dashboard />} />,
    <Route key="session" path="/session" element={<Sessions />} />,
    <Route key="myproject" path="/myproject" element={<MyProjects />} />,
    <Route key="jobtalk" path="/jobtalk" element={<JobTalks />} />,
    <Route
      key="techlearning"
      path="/techlearning"
      element={<TechnologyLearning />}
    />,
  ];
};

export default PublicRoutes;
