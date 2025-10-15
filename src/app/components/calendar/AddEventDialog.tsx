import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import { Add } from '@mui/icons-material';

interface AddEventDialogProps {
  open: boolean;
  selectedDate: Date | null;
  eventTitle: string;
  eventDescription: string;
  onClose: () => void;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onAddEvent: () => void;
}

export default function AddEventDialog({
  open,
  selectedDate,
  eventTitle,
  eventDescription,
  onClose,
  onTitleChange,
  onDescriptionChange,
  onAddEvent,
}: AddEventDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Add Event for {selectedDate?.toLocaleDateString()}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Event Title"
            fullWidth
            value={eventTitle}
            onChange={(e) => onTitleChange(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={eventDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onAddEvent}
          variant="contained"
          startIcon={<Add />}
          disabled={!eventTitle}
        >
          Add Event
        </Button>
      </DialogActions>
    </Dialog>
  );
}
