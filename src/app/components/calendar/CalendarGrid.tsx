import { Box, Card, CardContent, Typography, Chip, Stack } from '@mui/material';
import { Event } from '@mui/icons-material';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  description?: string;
}

interface CalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateClick: (day: number) => void;
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarGrid({
  currentDate,
  events,
  onDateClick
}: CalendarGridProps) {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const getEventsForDate = (day: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7;
    const rows = [];

    let dayCounter = 1;

    for (let row = 0; row < totalCells / 7; row++) {
      const cells = [];

      for (let col = 0; col < 7; col++) {
        const cellIndex = row * 7 + col;

        if (cellIndex < firstDay || dayCounter > daysInMonth) {
          // Empty cell
          cells.push(
            <Box
              key={`empty-${cellIndex}`}
              sx={{
                height: 100,
                border: '1px solid #e0e0e0',
                backgroundColor: '#fafafa',
              }}
            />
          );
        } else {
          // Day cell
          const day = dayCounter;
          const dayEvents = getEventsForDate(day);
          const isToday =
            day === new Date().getDate() &&
            currentDate.getMonth() === new Date().getMonth() &&
            currentDate.getFullYear() === new Date().getFullYear();

          cells.push(
            <Card
              key={day}
              sx={{
                height: 100,
                cursor: 'pointer',
                border: isToday ? '2px solid #1976d2' : '1px solid #e0e0e0',
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
              onClick={() => onDateClick(day)}
            >
              <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                <Typography
                  variant="body2"
                  fontWeight={isToday ? 'bold' : 'normal'}
                  color={isToday ? 'primary' : 'textPrimary'}
                >
                  {day}
                </Typography>
                <Stack spacing={0.5} mt={0.5}>
                  {dayEvents.slice(0, 2).map((event) => (
                    <Chip
                      key={event.id}
                      label={event.title}
                      size="small"
                      color="primary"
                      icon={<Event />}
                      sx={{ fontSize: '0.65rem', height: 20 }}
                    />
                  ))}
                  {dayEvents.length > 2 && (
                    <Typography variant="caption" color="textSecondary">
                      +{dayEvents.length - 2} more
                    </Typography>
                  )}
                </Stack>
              </CardContent>
            </Card>
          );
          dayCounter++;
        }
      }

      rows.push(
        <Box key={`row-${row}`} sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {cells}
        </Box>
      );
    }

    return rows;
  };

  return (
    <>
      {/* Day Names Header */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', mb: 1 }}>
        {dayNames.map((day) => (
          <Box key={day} sx={{ p: 1, textAlign: 'center' }}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              color="textSecondary"
            >
              {day}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Calendar Grid */}
      <Box>
        {renderCalendarDays()}
      </Box>
    </>
  );
}
