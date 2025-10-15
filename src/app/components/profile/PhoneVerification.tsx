'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Stack,
  Paper
} from '@mui/material';
import { Phone, VerifiedUser } from '@mui/icons-material';
import { RecaptchaVerifier } from 'firebase/auth';
import { useAuth } from '@/contexts/AuthContext';
import {
  initializeRecaptcha,
  sendPhoneVerificationCode,
  verifyAndUpdatePhoneNumber
} from '@/services/profileService';

export default function PhoneVerification() {
  const { user } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [step, setStep] = useState<'input' | 'verify'>('input');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);

  useEffect(() => {
    // Initialize reCAPTCHA when component mounts
    const verifier = initializeRecaptcha('recaptcha-container');
    setRecaptchaVerifier(verifier);

    return () => {
      // Cleanup reCAPTCHA on unmount
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
      }
    };
  }, []);

  const handleSendCode = async () => {
    if (!user || !recaptchaVerifier) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const verificationIdResult = await sendPhoneVerificationCode(
        phoneNumber,
        recaptchaVerifier
      );
      setVerificationId(verificationIdResult);
      setStep('verify');
      setSuccess('Verification code sent! Please check your phone.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!user) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await verifyAndUpdatePhoneNumber(user, verificationId, verificationCode);
      setSuccess('Phone number verified and updated successfully!');
      setStep('input');
      setPhoneNumber('');
      setVerificationCode('');
      setVerificationId('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Phone color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Phone Number Verification
          </Typography>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        {step === 'input' && (
          <Stack spacing={2}>
            <TextField
              label="Phone Number"
              placeholder="+1234567890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
              helperText="Enter phone number with country code (e.g., +1234567890)"
            />

            <Box id="recaptcha-container" />

            <Button
              variant="contained"
              onClick={handleSendCode}
              disabled={!phoneNumber || loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Phone />}
              fullWidth
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </Button>
          </Stack>
        )}

        {step === 'verify' && (
          <Stack spacing={2}>
            <Alert severity="info">
              A verification code has been sent to {phoneNumber}
            </Alert>

            <TextField
              label="Verification Code"
              placeholder="123456"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              fullWidth
            />

            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={() => {
                  setStep('input');
                  setVerificationCode('');
                  setVerificationId('');
                }}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleVerifyCode}
                disabled={!verificationCode || loading}
                startIcon={loading ? <CircularProgress size={20} /> : <VerifiedUser />}
                fullWidth
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </Button>
            </Stack>
          </Stack>
        )}

        {user?.phoneNumber && (
          <Alert severity="success" icon={<VerifiedUser />}>
            Current verified phone: {user.phoneNumber}
          </Alert>
        )}
      </Stack>
    </Paper>
  );
}
