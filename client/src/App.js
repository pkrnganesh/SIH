import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/landing/Header';
import Footer from './components/landing/Footer';
import LandingBody from './components/landing/LandingBody';
import MentorBooking from './components/landing/MentorBooking';
import StudentGuidance from './components/landing/StudentGuidance';
import AIGuidance from './components/landing/AIGuidance';
import BecomeMentor from './components/landing/BecomeMentor';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<LandingBody />} />
          <Route path="/mentor-booking" element={<MentorBooking />} />
          <Route path="/student-guidance" element={<StudentGuidance />} />
          <Route path="/ai-guidance" element={<AIGuidance />} />
          <Route path="/become-mentor" element={<BecomeMentor />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
