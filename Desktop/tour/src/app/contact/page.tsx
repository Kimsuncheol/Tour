'use client';

import { Box, Paper, Typography } from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Language,
  GitHub,
  LinkedIn,
} from '@mui/icons-material';
import ProfileSection from './components/ProfileSection';
import ContactInfoGrid from './components/ContactInfoGrid';
import SocialLinks from './components/SocialLinks';
import { useKakaoSDK } from './hooks/useKakaoSDK';

export default function ContactPage() {
  const { kakaoInitialized, shareViaKakao } = useKakaoSDK('YOUR_JAVASCRIPT_KEY');

  const handleKakaoShare = () => {
    shareViaKakao({
      title: 'Contact Me',
      description: "Let's get in touch! Reach out through any of these channels.",
      imageUrl: 'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
      url: typeof window !== 'undefined' ? window.location.href : '',
    });
  };

  const contactInfo = [
    {
      icon: <Email />,
      label: 'Email',
      value: 'contact@example.com',
      href: 'mailto:contact@example.com',
    },
    {
      icon: <Phone />,
      label: 'Phone',
      value: '+82 10-1234-5678',
      href: 'tel:+821012345678',
    },
    {
      icon: <LocationOn />,
      label: 'Location',
      value: 'Seoul, South Korea',
      href: null,
    },
    {
      icon: <Language />,
      label: 'Website',
      value: 'www.example.com',
      href: 'https://www.example.com',
    },
  ];

  const socialLinks = [
    {
      icon: <GitHub />,
      label: 'GitHub',
      href: 'https://github.com',
      color: '#333',
    },
    {
      icon: <LinkedIn />,
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      color: '#0077b5',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 8,
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            fontWeight="800"
            sx={{
              color: 'white',
              mb: 2,
              textShadow: '0 2px 10px rgba(0,0,0,0.1)',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Get In Touch
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 300,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Let&apos;s connect and create something amazing together
          </Typography>
        </Box>

        {/* Main Content Card */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <ProfileSection
            kakaoInitialized={kakaoInitialized}
            onAvatarClick={handleKakaoShare}
            name="Your Name"
            title="Software Developer | Designer | Creator"
            avatarSrc="/avatar.jpg"
          />

          <ContactInfoGrid contactInfo={contactInfo} />

          <SocialLinks socialLinks={socialLinks} />

          {!kakaoInitialized && (
            <Box
              sx={{
                mt: 4,
                p: 2.5,
                background: 'linear-gradient(135deg, #FEE500 0%, #FDD835 100%)',
                borderRadius: 3,
                boxShadow: '0 4px 15px rgba(254, 229, 0, 0.3)',
              }}
            >
              <Typography
                variant="body2"
                textAlign="center"
                sx={{
                  color: 'rgba(0,0,0,0.7)',
                  fontWeight: 500
                }}
              >
                Loading KakaoTalk integration...
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Footer Message */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255,255,255,0.8)',
              fontWeight: 300
            }}
          >
            Available for freelance opportunities and collaborations
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
