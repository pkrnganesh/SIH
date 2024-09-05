import React from 'react';
import { Typography, Grid, Box, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';

const Container = styled(motion.div)(({ theme }) => ({
  borderRadius: '20px',
  padding: theme.spacing(3), // Reduced padding
  color: 'black',
  overflow: 'hidden',
  fontFamily: '"Outfit", sans-serif',
}));

const TeamMemberCard = styled(motion.div)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '20px',
  padding: theme.spacing(3), // Reduced padding
  // boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
  '&:hover': {
    transform: 'translateY(-15px)',
    boxShadow: '0 20px 45px rgba(0, 0, 0, 0.15)',
  },
}));

const SocialIcons = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '15px', // Reduced margin
  gap: '10px', // Reduced gap
});

const SocialIcon = styled(motion.svg)({
  width: '25px', // Reduced size
  height: '25px', // Reduced size
  cursor: 'pointer',
});

const AvatarWrapper = styled(motion.div)({
  position: 'relative',
  marginBottom: '15px', // Reduced margin
});

const teamMembers = [
  {
    name: 'Swapanth Vakapalli',
    role: 'Founder & UI/UX Designer',
    avatar: require('../../images/founders/3.svg').default,
  },
  {
    name: 'Krishna Vamsi',
    role: 'Co-Founder & SDE',
    avatar: require('../../images/founders/4.svg').default,
  },
  {
    name: 'Ram Ganesh ',
    role: 'Co-Founder & Tech Lead',
    avatar: require('../../images/founders/5.svg').default,
  },
];

const Team = () => {
  return (
    <Container
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Typography
        variant="h2"
        gutterBottom
        sx={{
          color: '#6e8efb',
          fontWeight: '600',
          textAlign: 'left',
          mb: 6, // Reduced margin
          fontSize: { xs: '2rem', md: '2.5rem' }, // Reduced font size
          letterSpacing: '1px',
        }}
      >
        Meet Our Visionaries
      </Typography>
      <Grid container spacing={4}> 
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <TeamMemberCard
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 * index, ease: "easeOut" }}
            >
              <AvatarWrapper
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Avatar
                  src={member.avatar}
                  sx={{
                    width: 150, // Reduced size
                    height: 150, // Reduced size
                    mx: 'auto',
                    // Removed borderRadius to make it rectangular
                  }}
                />
              </AvatarWrapper>
              <Box>
                <Typography
                  variant="h5" // Reduced font size
                  gutterBottom
                  sx={{
                    fontWeight: '700',
                    color: '#333',
                    fontSize: '1.4rem', // Reduced font size
                    mb: 0.5, // Reduced margin
                    letterSpacing: '-0.5px'
                  }}
                >
                  {member.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#6e8efb',
                    fontSize: '1rem', // Reduced font size
                    fontWeight: '600',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}
                >
                  {member.role}
                </Typography>
              </Box>
              <SocialIcons>
                <SocialIcon as={motion.svg} whileHover={{ scale: 1.2 }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8V8Z" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 9H2V21H6V9Z" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </SocialIcon>
                <SocialIcon as={motion.svg} whileHover={{ scale: 1.2 }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </SocialIcon>
                <SocialIcon as={motion.svg} whileHover={{ scale: 1.2 }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 22V18.13C16.0375 17.6532 15.9731 17.1738 15.811 16.7238C15.6489 16.2738 15.3929 15.8634 15.06 15.52C18.2 15.17 21.5 13.98 21.5 8.52C21.4997 7.12383 20.9627 5.7812 20 4.77C20.4559 3.54851 20.4236 2.19835 19.91 0.999999C19.91 0.999999 18.73 0.649999 16 2.48C13.708 1.85882 11.292 1.85882 9 2.48C6.27 0.649999 5.09 0.999999 5.09 0.999999C4.57638 2.19835 4.54414 3.54851 5 4.77C4.03013 5.7887 3.49252 7.14346 3.5 8.55C3.5 13.97 6.8 15.16 9.94 15.55C9.611 15.89 9.35726 16.2954 9.19531 16.7399C9.03335 17.1844 8.96681 17.6581 9 18.13V22M9 19C4 20.5 4 16.5 2 16L9 19Z" stroke="#FF5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </SocialIcon>
              </SocialIcons>
            </TeamMemberCard>
          </Grid>
        ))}
      </Grid>
      <br />
      <br />
    </Container>
  );
};

export default Team;
