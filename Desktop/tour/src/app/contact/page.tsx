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
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
          Contact Me
        </Typography>

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
          <Box sx={{ mt: 4, p: 2, backgroundColor: '#FEE500', borderRadius: 2 }}>
            <Typography variant="body2" textAlign="center" color="textSecondary">
              Loading KakaoTalk integration...
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
