import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import React from "react";
import GuidancePage from "../pages/GuidancePage";
export function HomeRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/guidance" element={<GuidancePage />} />
      </Routes>
    </Router>
  );
}
