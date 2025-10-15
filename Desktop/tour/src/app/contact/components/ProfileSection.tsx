import { Box, Avatar, Chip, Typography } from '@mui/material';

interface ProfileSectionProps {
  kakaoInitialized: boolean;
  onAvatarClick: () => void;
  name: string;
  title: string;
  avatarSrc?: string;
}

export default function ProfileSection({
  kakaoInitialized,
  onAvatarClick,
  name,
  title,
  avatarSrc,
}: ProfileSectionProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 6 }}>
      <Box sx={{ position: 'relative' }}>
        <Avatar
          sx={{
            width: 120,
            height: 120,
            mb: 2,
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
          onClick={onAvatarClick}
          alt="Profile Avatar"
          src={avatarSrc}
        />
        {kakaoInitialized && (
          <Chip
            label="Click to share via KakaoTalk"
            size="small"
            color="warning"
            sx={{ mt: 1 }}
          />
        )}
      </Box>
      <Typography variant="h5" fontWeight="bold" mt={2}>
        {name}
      </Typography>
      <Typography variant="body1" color="textSecondary" mt={1}>
        {title}
      </Typography>
    </Box>
  );
}
