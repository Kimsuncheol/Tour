'use client';

import { useState } from 'react';
import { Box, Paper } from '@mui/material';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarGrid from '../components/calendar/CalendarGrid';
import AddEventDialog from '../components/calendar/AddEventDialog';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  description?: string;
}

export default function CalendarPage() {
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
