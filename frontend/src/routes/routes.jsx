import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import IntermediateCourse from "../pages/IntermediateCourse";
import CareerGuidanceAi from "../pages/CareerGuidanceAI";
import StudentDashboad from "../pages/StudentDashboard";

import React from "react";
import GuidancePage from "../pages/GuidancePage";
export function HomeRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/guidance" element={<GuidancePage />} />
        <Route path="/intermediate-course" element={<IntermediateCourse />} />
        <Route path="/career-guidance-ai" element={<CareerGuidanceAi />} />
        <Route path="/student-dashboard" element={<StudentDashboad />} />
      </Routes>
    </Router>
  );
}
