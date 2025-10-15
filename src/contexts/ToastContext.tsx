'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import type { AlertColor } from '@mui/material/Alert';

interface ToastOptions {
  message: string;
  severity?: AlertColor;
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
}

interface ToastContextValue {
  showToast: (options: ToastOptions) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const DEFAULT_DURATION = 4000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<ToastOptions | null>(null);

  const hideToast = useCallback(() => {
    setOpen(false);
  }, []);

  const showToast = useCallback((options: ToastOptions) => {
    setToast({
      severity: 'info',
      ...options,
    });
    setOpen(true);
  }, []);

  const contextValue = useMemo(() => ({ showToast, hideToast }), [showToast, hideToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={toast?.duration ?? DEFAULT_DURATION}
        onClose={(_, reason) => {
          if (reason === 'clickaway') return;
          hideToast();
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          elevation={0}
          onClose={hideToast}
          severity={toast?.severity ?? 'info'}
          variant="filled"
          sx={{ borderRadius: 2, px: 3, py: 2, minWidth: 280 }}
          action={
            toast?.actionLabel && toast?.onAction
              ? (
                <button
                  type="button"
                  onClick={() => {
                    toast.onAction?.();
                    hideToast();
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  {toast.actionLabel}
                </button>
              )
              : undefined
          }
        >
          {toast?.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
