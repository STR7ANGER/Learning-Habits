import BuyProject from "@/pages/BuyProject";
import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectRoute";


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
    
  ];
};

export default ProtectedRoutes;
