import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectRoute";
import Courses from "../pages/Courses";
import Events from "../pages/Events";
import News from "../pages/News";
import Blogs from "../pages/Blogs";

const ProtectedRoutes = () => {
  return [
    
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
