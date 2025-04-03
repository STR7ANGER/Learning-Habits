
import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectRoute";
import Home from "../components/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Courses from "../pages/Courses";

const ProtectedRoutes = (): JSX.Element[] => {
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
    />
  ];
};

export default ProtectedRoutes;