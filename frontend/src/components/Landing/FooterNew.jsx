import React from "react";
import {
  Container,
  Typography,
  Grid,
  Link,
  Box,
  IconButton,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import SendIcon from '@mui/icons-material/Send';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedIcon from '@mui/icons-material/Verified';

const FooterContainer = styled(Box)(({ theme }) => ({
  background: `
    linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)
  `,
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.1,
  },
}));

const LogoSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontFamily: '"Playfair Display", serif',
  fontWeight: 700,
  fontSize: '2.5rem',
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginRight: theme.spacing(1),
}));

const VerifiedBadge = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  background: 'rgba(255, 215, 0, 0.1)',
  padding: theme.spacing(0.5, 1.5),
  borderRadius: '20px',
  border: '1px solid rgba(255, 215, 0, 0.3)',
}));

const NewsletterBox = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  borderRadius: '20px',
  padding: theme.spacing(4),
  border: '1px solid rgba(255, 255, 255, 0.1)',
  textAlign: 'center',
}));

const PremiumTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '25px',
    color: 'white',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 215, 0, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFD700',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiInputBase-input': {
    color: 'white',
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  color: 'white',
  margin: theme.spacing(0.5),
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 215, 0, 0.2)',
    borderColor: '#FFD700',
    transform: 'translateY(-2px)',
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  textDecoration: 'none',
  fontSize: '0.95rem',
  transition: 'all 0.3s ease',
  display: 'block',
  marginBottom: theme.spacing(1),
  '&:hover': {
    color: '#FFD700',
    transform: 'translateX(5px)',
  },
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  color: 'rgba(255, 255, 255, 0.8)',
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1.5),
    color: '#FFD700',
  },
}));

const TrustBadge = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  background: 'rgba(255, 255, 255, 0.05)',
  padding: theme.spacing(1, 2),
  borderRadius: '25px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  marginTop: theme.spacing(2),
}));

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { label: "Career Guidance", href: "/guidance" },
        { label: "AI Analysis", href: "/ai-analysis" },
        { label: "Mentorship", href: "/mentorship" },
        { label: "Course Recommendations", href: "/courses" },
        { label: "Student Dashboard", href: "/student-dashboard" },
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Mission", href: "/mission" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
        { label: "Blog", href: "/blog" },
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Documentation", href: "/docs" },
        { label: "API Reference", href: "/api" },
        { label: "Community", href: "/community" },
        { label: "Contact Support", href: "/support" },
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "GDPR Compliance", href: "/gdpr" },
        { label: "Refund Policy", href: "/refunds" },
      ]
    }
  ];

  return (
    <FooterContainer>
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <LogoSection>
                <Logo>DreamTrax</Logo>
                <VerifiedBadge>
                  <VerifiedIcon sx={{ fontSize: '1rem', color: '#FFD700' }} />
                  <Typography variant="caption" sx={{ color: '#FFD700', fontWeight: 600 }}>
                    Verified
                  </Typography>
                </VerifiedBadge>
              </LogoSection>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  mb: 3,
                  lineHeight: 1.7,
                  fontSize: '1.1rem'
                }}
              >
                Transform your career with AI-powered insights, expert mentorship, 
                and personalized guidance from industry leaders.
              </Typography>

              <ContactItem>
                <LocationOnIcon />
                <Typography variant="body2">
                  Silicon Valley, CA 94301, USA
                </Typography>
              </ContactItem>

              <ContactItem>
                <EmailIcon />
                <Typography variant="body2">
                  hello@dreamtrax.com
                </Typography>
              </ContactItem>

              <ContactItem>
                <PhoneIcon />
                <Typography variant="body2">
                  +1 (555) 123-4567
                </Typography>
              </ContactItem>

              <TrustBadge>
                <SecurityIcon sx={{ fontSize: '1rem' }} />
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  Enterprise-grade Security
                </Typography>
              </TrustBadge>
            </motion.div>
          </Grid>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <Grid item xs={6} md={2} key={section.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                viewport={{ once: true }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'white',
                    fontWeight: 600,
                    mb: 3,
                    fontSize: '1.1rem'
                  }}
                >
                  {section.title}
                </Typography>
                {section.links.map((link) => (
                  <FooterLink key={link.label} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </motion.div>
            </Grid>
          ))}

          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <NewsletterBox>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'white',
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                  Stay Updated
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    mb: 3,
                    lineHeight: 1.6
                  }}
                >
                  Get the latest career insights, industry trends, and exclusive offers 
                  delivered to your inbox.
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                  <PremiumTextField
                    fullWidth
                    placeholder="Enter your email"
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            sx={{ 
                              color: '#FFD700',
                              '&:hover': {
                                background: 'rgba(255, 215, 0, 0.1)'
                              }
                            }}
                          >
                            <SendIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.6)',
                    display: 'block',
                    mb: 3
                  }}
                >
                  Join 50,000+ professionals who trust DreamTrax
                </Typography>

                <Box sx={{ textAlign: 'center' }}>
                  <SocialButton component={motion.div} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <TwitterIcon />
                  </SocialButton>
                  <SocialButton component={motion.div} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <LinkedInIcon />
                  </SocialButton>
                  <SocialButton component={motion.div} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <GitHubIcon />
                  </SocialButton>
                  <SocialButton component={motion.div} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <InstagramIcon />
                  </SocialButton>
                </Box>
              </NewsletterBox>
            </motion.div>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.6)',
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                © {currentYear} DreamTrax. All rights reserved. Built with ❤️ in Silicon Valley.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  display: 'flex',
                  gap: 2,
                  justifyContent: { xs: 'center', md: 'flex-end' },
                  flexWrap: 'wrap'
                }}
              >
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}
                >
                  <SecurityIcon sx={{ fontSize: '0.8rem' }} />
                  SOC 2 Compliant
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}
                >
                  <VerifiedIcon sx={{ fontSize: '0.8rem' }} />
                  GDPR Ready
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}
                >
                  <SecurityIcon sx={{ fontSize: '0.8rem' }} />
                  ISO 27001
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
