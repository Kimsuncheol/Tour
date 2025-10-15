import { Box, Typography, Stack, IconButton } from '@mui/material';
import { ReactNode } from 'react';

interface SocialLink {
  icon: ReactNode;
  label: string;
  href: string;
  color: string;
}

interface SocialLinksProps {
  socialLinks: SocialLink[];
}

export default function SocialLinks({ socialLinks }: SocialLinksProps) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        fontWeight="700"
        mb={4}
        textAlign="center"
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Connect with Me
      </Typography>
      <Stack
        direction="row"
        spacing={3}
        justifyContent="center"
        sx={{ flexWrap: 'wrap', gap: 3 }}
      >
        {socialLinks.map((social, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: -4,
                background: `linear-gradient(135deg, ${social.color}40 0%, ${social.color}60 100%)`,
                borderRadius: '20px',
                opacity: 0,
                transition: 'opacity 0.3s',
              },
              '&:hover::before': {
                opacity: 1,
              },
            }}
          >
            <IconButton
              sx={{
                width: 72,
                height: 72,
                backgroundColor: 'white',
                border: '3px solid',
                borderColor: social.color,
                color: social.color,
                position: 'relative',
                zIndex: 1,
                borderRadius: '20px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  backgroundColor: social.color,
                  color: 'white',
                  transform: 'translateY(-8px) scale(1.05)',
                  boxShadow: `0 12px 24px ${social.color}40`,
                },
                '& svg': {
                  fontSize: '2rem',
                },
              }}
              onClick={() => window.open(social.href, '_blank')}
              aria-label={social.label}
            >
              {social.icon}
            </IconButton>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
