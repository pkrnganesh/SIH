import React, { useRef } from 'react';
import { Box, Typography, Container, Grid, Avatar, Card, CardContent, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, useInView } from 'framer-motion';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const SectionContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(12, 0),
  background: `
    linear-gradient(135deg, #667eea 0%, #764ba2 100%)
  `,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpolygon points="50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40"/%3E%3C/g%3E%3C/svg%3E")',
  },
}));

const TestimonialCard = styled(motion(Card))(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #FFD700, #FFA500)',
  },
}));

const QuoteIcon = styled(FormatQuoteIcon)(({ theme }) => ({
  fontSize: '4rem',
  color: 'rgba(255, 215, 0, 0.3)',
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
}));

const FloatingShape = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
}));

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c5cd?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      quote: "DreamTrax completely transformed my career trajectory. The AI-powered insights helped me identify opportunities I never knew existed, and the mentorship program connected me with industry leaders who guided me to my dream job at Google.",
      result: "150% salary increase"
    },
    {
      name: "Michael Chen",
      role: "Product Manager at Microsoft",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      quote: "The personalized career roadmap was incredibly detailed and actionable. Within 8 months of following their guidance, I successfully transitioned from a technical role to product management at Microsoft. The investment was worth every penny.",
      result: "Career pivot success"
    },
    {
      name: "Emily Rodriguez",
      role: "Data Scientist at Tesla",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      quote: "The quality of mentors on this platform is unmatched. I was paired with a senior data scientist from Tesla who not only helped me improve my technical skills but also provided insider insights that helped me land my current role.",
      result: "Dream job achieved"
    },
    {
      name: "David Kim",
      role: "Startup Founder",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      quote: "DreamTrax didn't just help me find a job – it helped me build a company. The entrepreneurship track and access to successful founders provided the guidance and network I needed to launch my own startup, which is now valued at $50M.",
      result: "$50M company valuation"
    },
    {
      name: "Lisa Wang",
      role: "Investment Banker at Goldman Sachs",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      quote: "The premium features and exclusive access to senior executives made all the difference. The mock interviews and industry insights prepared me perfectly for the competitive finance industry. I secured my position at Goldman Sachs with their help.",
      result: "Top-tier finance role"
    },
    {
      name: "James Thompson",
      role: "VP of Engineering at Uber",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      quote: "As someone with 15+ years of experience, I thought I had reached my ceiling. DreamTrax showed me new pathways and connected me with the right people. I went from senior engineer to VP level in just 18 months. Incredible ROI.",
      result: "Executive promotion"
    }
  ];

  const shapes = [
    { size: 120, top: '10%', left: '5%', duration: 20 },
    { size: 80, top: '60%', right: '8%', duration: 15 },
    { size: 100, bottom: '15%', left: '10%', duration: 25 },
    { size: 60, top: '30%', right: '30%', duration: 18 },
  ];

  return (
    <SectionContainer ref={ref}>
      {/* Floating Background Shapes */}
      {shapes.map((shape, index) => (
        <FloatingShape
          key={index}
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
          }}
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <Container maxWidth="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <Typography 
            variant="h2" 
            component="h2"
            sx={{ 
              fontWeight: 700,
              color: 'white',
              mb: 3,
            }}
          >
            Success Stories from Our Alumni
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '600px',
              mx: 'auto',
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Real people, real transformations, real results. 
            See how DreamTrax has changed lives and careers.
          </Typography>
        </motion.div>

        {/* Testimonials Grid */}
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <TestimonialCard
                  whileHover={{ 
                    y: -10,
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <CardContent sx={{ p: 4, position: 'relative' }}>
                    <QuoteIcon />
                    
                    <Box sx={{ mb: 3 }}>
                      <Rating 
                        value={testimonial.rating} 
                        readOnly 
                        sx={{ 
                          '& .MuiRating-iconFilled': {
                            color: '#FFD700',
                          },
                          mb: 2
                        }}
                      />
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: 'white',
                          lineHeight: 1.7,
                          fontSize: '1.1rem',
                          fontStyle: 'italic'
                        }}
                      >
                        "{testimonial.quote}"
                      </Typography>
                    </Box>

                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: 3,
                        pt: 3,
                        borderTop: '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          src={testimonial.avatar}
                          sx={{ 
                            width: 60, 
                            height: 60, 
                            mr: 2,
                            border: '2px solid rgba(255, 215, 0, 0.5)'
                          }}
                        />
                        <Box>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              color: 'white',
                              fontWeight: 600,
                              mb: 0.5
                            }}
                          >
                            {testimonial.name}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: 'rgba(255, 255, 255, 0.8)',
                              fontSize: '0.9rem'
                            }}
                          >
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box 
                      sx={{ 
                        mt: 2,
                        p: 2,
                        background: 'rgba(255, 215, 0, 0.1)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 215, 0, 0.3)'
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#FFD700',
                          fontWeight: 600,
                          textAlign: 'center'
                        }}
                      >
                        🎯 {testimonial.result}
                      </Typography>
                    </Box>
                  </CardContent>
                </TestimonialCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: '80px' }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'white',
              fontWeight: 600,
              mb: 2
            }}
          >
            Ready to Write Your Success Story?
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '1.1rem'
            }}
          >
            Join thousands of professionals who have transformed their careers with DreamTrax
          </Typography>
        </motion.div>
      </Container>
    </SectionContainer>
  );
};

export default Testimonials;
