import { Card, CardContent, Stack, Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface ContactInfo {
  icon: ReactNode;
  label: string;
  value: string;
  href: string | null;
}

interface ContactInfoGridProps {
  contactInfo: ContactInfo[];
}

export default function ContactInfoGrid({ contactInfo }: ContactInfoGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
        gap: 3,
        mb: 6,
      }}
    >
      {contactInfo.map((info, index) => (
        <Card
          key={index}
          elevation={0}
          sx={{
            height: '100%',
            cursor: info.href ? 'pointer' : 'default',
            borderRadius: 3,
            border: '2px solid',
            borderColor: 'transparent',
            background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea 0%, #764ba2 100%) border-box',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': info.href ? {
              transform: 'translateY(-8px)',
              boxShadow: '0 12px 24px rgba(102, 126, 234, 0.25)',
              borderColor: 'transparent',
            } : {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 16px rgba(102, 126, 234, 0.15)',
            },
          }}
          onClick={() => info.href && window.open(info.href, '_blank')}
        >
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" spacing={2.5} alignItems="center">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 56,
                  height: 56,
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'rotate(10deg) scale(1.1)',
                  },
                }}
              >
                {info.icon}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontSize: '0.75rem',
                  }}
                >
                  {info.label}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="600"
                  sx={{
                    mt: 0.5,
                    color: 'text.primary',
                    fontSize: '1rem',
                  }}
                >
                  {info.value}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
