import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import IntermediateCourse from "../pages/IntermediateCourse";
import CareerGuidanceAssessment from "../pages/CareerGuidanceAI";
import StudentDashboad from "../pages/StudentDashboard";
import CareerGuidanceSignup from "../pages/StudentSignup";
import StudentLogin from "../pages/StudentLogin"
import MentorDashboard from "../pages/MentorDashboard";

import React from "react";
import GuidancePage from "../pages/GuidancePage";
export function HomeRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/guidance" element={<GuidancePage />} />
        <Route path="/intermediate-course" element={<IntermediateCourse />} />
        <Route path="/career-guidance-ai" element={<CareerGuidanceAssessment />} />
        <Route path="/student-dashboard" element={<StudentDashboad />} />
        <Route path="/student-signup" element={<CareerGuidanceSignup />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/mentor-dashbord" element={<MentorDashboard />} />

      </Routes>
    </Router>
  );
}
