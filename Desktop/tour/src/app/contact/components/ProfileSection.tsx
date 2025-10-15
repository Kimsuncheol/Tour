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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 8 }}>
      <Box
        sx={{
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: -8,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            opacity: 0.15,
            zIndex: 0,
          },
        }}
      >
        <Avatar
          sx={{
            width: 140,
            height: 140,
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '4px solid white',
            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
            position: 'relative',
            zIndex: 1,
            '&:hover': {
              transform: 'scale(1.1) rotate(5deg)',
              boxShadow: '0 12px 32px rgba(102, 126, 234, 0.6)',
            },
          }}
          onClick={onAvatarClick}
          alt="Profile Avatar"
          src={avatarSrc}
        />
      </Box>

      {kakaoInitialized && (
        <Chip
          label="Click to share via KakaoTalk"
          size="small"
          sx={{
            mt: 2,
            background: 'linear-gradient(135deg, #FEE500 0%, #FDD835 100%)',
            color: 'rgba(0,0,0,0.7)',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(254, 229, 0, 0.3)',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(254, 229, 0, 0.5)',
            },
          }}
        />
      )}

      <Typography
        variant="h4"
        fontWeight="700"
        mt={3}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
        }}
      >
        {name}
      </Typography>

      <Typography
        variant="body1"
        mt={1.5}
        sx={{
          color: 'text.secondary',
          textAlign: 'center',
          fontWeight: 400,
          fontSize: '1.1rem',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}
