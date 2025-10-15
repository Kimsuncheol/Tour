'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Typography, Grid, Paper, Button } from '@mui/material';
import { CalendarMonth, People, Dashboard, Settings } from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.status !== 'admin')) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!user || user.status !== 'admin') {
    return null;
  }

  const adminCards = [
    {
      title: 'Calendar Management',
      description: 'Manage events and schedules',
      icon: <CalendarMonth sx={{ fontSize: 48 }} />,
      href: '/admin/calendar',
      color: '#1976d2',
    },
    {
      title: 'User Management',
      description: 'Manage users and permissions',
      icon: <People sx={{ fontSize: 48 }} />,
      href: '/admin/users',
      color: '#2e7d32',
    },
    {
      title: 'Dashboard',
      description: 'View analytics and reports',
      icon: <Dashboard sx={{ fontSize: 48 }} />,
      href: '/admin/dashboard',
      color: '#ed6c02',
    },
    {
      title: 'Settings',
      description: 'Configure application settings',
      icon: <Settings sx={{ fontSize: 48 }} />,
      href: '/admin/settings',
      color: '#9c27b0',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Admin Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Welcome back, {user.displayName || 'Admin'}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {adminCards.map((card) => (
          <Grid size={{ xs: 12, sm: 6, md: 6 }} key={card.title}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              <Box sx={{ color: card.color, mb: 2 }}>
                {card.icon}
              </Box>
              <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                {card.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                {card.description}
              </Typography>
              <Button
                component={Link}
                href={card.href}
                variant="contained"
                sx={{
                  bgcolor: card.color,
                  '&:hover': {
                    bgcolor: card.color,
                    filter: 'brightness(0.9)',
                  },
                }}
              >
                Open
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
