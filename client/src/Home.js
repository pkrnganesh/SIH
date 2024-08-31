// HomePage.js
import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #1a73e8;
  color: white;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: white;
  font-size: 16px;
  &:hover {
    text-decoration: underline;
  }
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  background: url('your-banner-image-url') no-repeat center center/cover;
  color: white;
  text-align: center;
`;

const HeroText = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
`;

const GetStartedButton = styled.button`
  background-color: #1a73e8;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: #155bb5;
  }
`;

const FeaturesSection = styled.section`
  display: flex;
  justify-content: space-around;
  padding: 40px 20px;
  background-color: #f0f4f8;
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 30%;
`;

const FeatureIcon = styled.div`
  font-size: 40px;
  margin-bottom: 15px;
`;

const FeatureTitle = styled.h3`
  font-size: 22px;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  margin-bottom: 15px;
`;

const LearnMoreLink = styled.a`
  color: #1a73e8;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const TestimonialsSection = styled.section`
  padding: 40px 20px;
  background-color: #e8f0fe;
`;

const TestimonialCard = styled.div`
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
`;

const TestimonialText = styled.p`
  font-size: 16px;
  margin-bottom: 15px;
`;

const TestimonialAuthor = styled.h4`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Footer = styled.footer`
  background-color: #1a73e8;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 150px;
  margin-bottom: 20px;
`;

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  display: block;
  margin-bottom: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const HomePage = () => {
  return (
    <>
      <Header>
        <Logo>CareerCounsel</Logo>
        <Nav>
          <NavLink href="#">Home</NavLink>
          <NavLink href="#">Career Guidance</NavLink>
          <NavLink href="#">Mentorship</NavLink>
          <NavLink href="#">Resources</NavLink>
          <NavLink href="#">Contact</NavLink>
        </Nav>
      </Header>
      <HeroSection>
        <HeroText>Empowering Students to Make Informed Career Choices</HeroText>
        <GetStartedButton>Get Started</GetStartedButton>
      </HeroSection>
      <FeaturesSection>
        <FeatureCard>
          <FeatureIcon>🤖</FeatureIcon>
          <FeatureTitle>AI-Powered Career Guidance</FeatureTitle>
          <FeatureDescription>Personalized career advice based on your strengths.</FeatureDescription>
          <LearnMoreLink href="#">Learn More</LearnMoreLink>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>👥</FeatureIcon>
          <FeatureTitle>Mentorship Programs</FeatureTitle>
          <FeatureDescription>Connect with professionals in your field of interest.</FeatureDescription>
          <LearnMoreLink href="#">Learn More</LearnMoreLink>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>🛠</FeatureIcon>
          <FeatureTitle>Interactive Tools</FeatureTitle>
          <FeatureDescription>Explore careers through simulations and interactive content.</FeatureDescription>
          <LearnMoreLink href="#">Learn More</LearnMoreLink>
        </FeatureCard>
      </FeaturesSection>
      <TestimonialsSection>
        <h2>What Students Say</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          <TestimonialCard>
            <TestimonialText>"This platform changed my life!"</TestimonialText>
            <TestimonialAuthor>John Doe</TestimonialAuthor>
          </TestimonialCard>
          <TestimonialCard>
            <TestimonialText>"I found my passion thanks to the mentors."</TestimonialText>
            <TestimonialAuthor>Jane Smith</TestimonialAuthor>
          </TestimonialCard>
          <TestimonialCard>
            <TestimonialText>"The AI guidance was spot on!"</TestimonialText>
            <TestimonialAuthor>Emily Johnson</TestimonialAuthor>
          </TestimonialCard>
        </div>
      </TestimonialsSection>
      <Footer>
        <FooterSection>
          <h4>Quick Links</h4>
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
        </FooterSection>
        <FooterSection>
          <h4>Contact Us</h4>
          <p>Email: support@careercounsel.com</p>
          <div>
            <FooterLink href="#">Facebook</FooterLink>
            <FooterLink href="#">Twitter</FooterLink>
            <FooterLink href="#">LinkedIn</FooterLink>
          </div>
        </FooterSection>
      </Footer>
    </>
  );
};

export default HomePage;
