import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectRoute";
import Home from "../components/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Courses from "../pages/Courses";
import Events from "../pages/Events";
import News from "../pages/News";
import Blogs from "../pages/Blogs";

const ProtectedRoutes = () => {
  return [
    <Route
      key="home"
      path="/home"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />,
    <Route
      key="about"
      path="/about"
      element={
        <ProtectedRoute>
          <AboutUs />
        </ProtectedRoute>
      }
    />,
    <Route
      key="contact"
      path="/contact"
      element={
        <ProtectedRoute>
          <ContactUs />
        </ProtectedRoute>
      }
    />,
    <Route
      key="course"
      path="/course"
      element={
        <ProtectedRoute>
          <Courses />
        </ProtectedRoute>
      }
    />,
    <Route
      key="event"
      path="/event"
      element={
        <ProtectedRoute>
          <Events />
        </ProtectedRoute>
      }
    />,
    <Route
      key="news"
      path="/news"
      element={
        <ProtectedRoute>
          <News />
        </ProtectedRoute>
      }
    />,
    <Route
      key="blog"
      path="/blog"
      element={
        <ProtectedRoute>
          <Blogs />
        </ProtectedRoute>
      }
    />,
  ];
};

export default ProtectedRoutes;
