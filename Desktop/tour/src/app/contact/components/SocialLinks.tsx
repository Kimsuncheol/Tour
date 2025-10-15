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
    <Box>
      <Typography variant="h6" fontWeight="bold" mb={2} textAlign="center">
        Connect with Me
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        {socialLinks.map((social, index) => (
          <IconButton
            key={index}
            sx={{
              width: 56,
              height: 56,
              backgroundColor: social.color,
              color: 'white',
              '&:hover': {
                backgroundColor: social.color,
                opacity: 0.8,
                transform: 'scale(1.1)',
              },
            }}
            onClick={() => window.open(social.href, '_blank')}
            aria-label={social.label}
          >
            {social.icon}
          </IconButton>
        ))}
      </Stack>
    </Box>
  );
}
