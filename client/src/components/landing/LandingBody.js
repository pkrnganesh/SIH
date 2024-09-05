import React from 'react';
import './LandingBody.css';

const LandingBody = () => {
  return (
    <div className="landing-body">
      <section className="intro">
        <h2>Welcome to Career Pathways</h2>
        <p>Helping students make informed career choices through AI-guided tools, mentorship programs, and valuable resources.</p>
      </section>

      <section id="student-guidance" className="feature-section">
        <h3>1. Direct Student Guidance</h3>
        <p>Explore valuable resources that guide students in their career decisions.</p>
        <a href="/student-guidance" className="cta-button">Learn More</a>
      </section>

      <section id="mentor-booking" className="feature-section">
        <h3>2. Mentorship Booking</h3>
        <p>Book sessions with expert mentors either offline or online via Zoom.</p>
        <a href="/mentor-booking" className="cta-button">Book Now</a>
      </section>

      <section id="ai-guidance" className="feature-section">
        <h3>3. AI Guidance</h3>
        <p>Receive AI-powered personalized career guidance based on your interests and strengths.</p>
        <a href="/ai-guidance" className="cta-button">Get AI Guidance</a>
      </section>

      <section id="become-mentor" className="feature-section">
        <h3>4. Become a Mentor</h3>
        <p>If you have qualified skills and experience, join us as a mentor to guide students in their careers.</p>
        <a href="/become-mentor" className="cta-button">Join Now</a>
      </section>
    </div>
  );
};

export default LandingBody;
