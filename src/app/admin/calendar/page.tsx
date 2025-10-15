'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Paper, Button, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Link from 'next/link';
import CalendarHeader from '@/app/components/calendar/CalendarHeader';
import CalendarGrid from '@/app/components/calendar/CalendarGrid';
import AddEventDialog from '@/app/components/calendar/AddEventDialog';
import { useAuth } from '@/contexts/AuthContext';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  description?: string;
}

export default function AdminCalendarPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Meeting',
      date: new Date(2025, 9, 15, 10, 0),
      description: 'Monthly team sync',
    },
    {
      id: '2',
      title: 'Project Deadline',
      date: new Date(2025, 9, 20, 17, 0),
      description: 'Final submission',
    },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', description: '' });

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

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    const selected = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(selected);
    setOpenDialog(true);
  };

  const handleAddEvent = () => {
    if (selectedDate && newEvent.title) {
      const event: CalendarEvent = {
        id: Date.now().toString(),
        title: newEvent.title,
        date: selectedDate,
        description: newEvent.description,
      };
      setEvents([...events, event]);
      setNewEvent({ title: '', description: '' });
      setOpenDialog(false);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <Button
          component={Link}
          href="/admin"
          startIcon={<ArrowBack />}
          variant="outlined"
          sx={{ mb: 2 }}
        >
          Back to Admin Dashboard
        </Button>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Admin Calendar Management
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Manage all events and schedules for the organization
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 3 }}>
        <CalendarHeader
          currentDate={currentDate}
          onPreviousMonth={previousMonth}
          onNextMonth={nextMonth}
        />

        <CalendarGrid
          currentDate={currentDate}
          events={events}
          onDateClick={handleDateClick}
        />
      </Paper>

      <AddEventDialog
        open={openDialog}
        selectedDate={selectedDate}
        eventTitle={newEvent.title}
        eventDescription={newEvent.description}
        onClose={() => setOpenDialog(false)}
        onTitleChange={(title) => setNewEvent({ ...newEvent, title })}
        onDescriptionChange={(description) => setNewEvent({ ...newEvent, description })}
        onAddEvent={handleAddEvent}
      />
    </Box>
  );
}
