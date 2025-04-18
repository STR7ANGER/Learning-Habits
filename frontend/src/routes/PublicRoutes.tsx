import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "@/components/Home";
import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";
import Projects from "@/pages/Projects";
import Events from "@/pages/Events";
import News from "@/pages/News";
import Blogs from "@/pages/Blogs";
import Expert from "@/pages/Expert";

const PublicRoutes = () => {
  const { isAuthenticated } = useAuth();

  return [
    <Route
      key="login"
      path="/login"
      element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
    />,
    <Route
      key="signup"
      path="/signup"
      element={isAuthenticated ? <Navigate to="/" replace /> : <SignUp />}
    />,
    <Route key="home" path="/" element={<Home />} />,
    <Route key="about" path="/about" element={<AboutUs />} />,
    <Route key="contact" path="/contact" element={<ContactUs />} />,
    <Route key="project" path="/project" element={<Projects />} />,
    <Route key="event" path="/event" element={<Events />} />,
    <Route key="news" path="/news" element={<News />} />,
    <Route key="blog" path="/blog" element={<Blogs />} />,
    <Route key="expert" path="/expert" element={<Expert />} />,
  ];
};

export default PublicRoutes;
