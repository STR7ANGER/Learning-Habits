import BuyProject from "@/pages/BuyProject";
import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectRoute";
import MyProjects from "@/pages/MyProjects";

const ProtectedRoutes = () => {
  return [
    <Route
      key="buyProject"
      path="/checkout/:projectId"
      element={
        <ProtectedRoute>
          <BuyProject />
        </ProtectedRoute>
      }
    />,
    <Route
      key="myproject"
      path="/myproject"
      element={
        <ProtectedRoute>
          <MyProjects />
        </ProtectedRoute>
      }
    />,
  ];
};

export default ProtectedRoutes;
