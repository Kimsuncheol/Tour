import { Grid, Card, CardContent, Stack, Box, Typography } from '@mui/material';
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
    <Grid container spacing={3} mb={4}>
      {contactInfo.map((info, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Card
            sx={{
              height: '100%',
              cursor: info.href ? 'pointer' : 'default',
              '&:hover': info.href ? {
                boxShadow: 3,
                transform: 'translateY(-2px)',
                transition: 'all 0.2s',
              } : {},
            }}
            onClick={() => info.href && window.open(info.href, '_blank')}
          >
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: 'primary.light',
                    color: 'primary.main',
                  }}
                >
                  {info.icon}
                </Box>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    {info.label}
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {info.value}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
