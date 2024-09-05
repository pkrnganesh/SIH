import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Career Pathways</h1>
      </div>
      <nav>
        <ul>
          <li><a href="#student-guidance">Student Guidance</a></li>
          <li><a href="#mentor-booking">Mentor Booking</a></li>
          <li><a href="#ai-guidance">AI Guidance</a></li>
          <li><a href="#become-mentor">Become a Mentor</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
