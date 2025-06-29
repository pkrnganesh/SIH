import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import IntermediateCourse from "../pages/IntermediateCourse";
import CareerGuidanceAssessment from "../pages/CareerGuidanceAI";
import StudentDashboard from "../pages/StudentDashboard";
import CareerGuidanceSignup from "../pages/StudentSignup";
import StudentLogin from "../pages/StudentLogin";
import MentorDashboard from "../pages/MentorDashboard";
import MentorLogin from "../pages/MentorLogin";
import MentorSignup from "../pages/MentorSignup";
import GuidancePage from "../pages/GuidancePage";
import ResumeBuilder from "../pages/ResumeBuilder";
import ResumeEditor from "../pages/ResumeEditor";
import InterviewPrep from "../pages/InterviewPrep";
import InterviewSession from "../pages/InterviewSession";

export function HomeRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/guidance" element={<GuidancePage />} />
        <Route path="/intermediate-course" element={<IntermediateCourse />} />
        <Route path="/career-guidance-ai" element={<CareerGuidanceAssessment />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-signup" element={<CareerGuidanceSignup />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/mentor-dashboard" element={<MentorDashboard />} />
        <Route path="/mentor-login" element={<MentorLogin />} />
        <Route path="/mentor-signup" element={<MentorSignup />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/resume-editor" element={<ResumeEditor />} />
        <Route path="/interview-prep" element={<InterviewPrep />} />
        <Route path="/interview-session" element={<InterviewSession />} />

      </Routes>
    </Router>
  );
}
