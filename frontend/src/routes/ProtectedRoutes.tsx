import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectRoute";
import Hero from "../components/Hero";
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
          <Hero />
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