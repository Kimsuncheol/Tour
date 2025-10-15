'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar } from '@mui/material';
import { CustomizedUser } from '@/interfaces/userInterface';
import { useToast } from '@/contexts/ToastContext';

interface AvatarDropdownProps {
  user: CustomizedUser | null;
  signOut: () => Promise<void>;
  onSignInClick: () => void;
}

export default function AvatarDropdown({ user, signOut, onSignInClick }: AvatarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { showToast } = useToast();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleBookingClick = () => {
    setIsOpen(false);
    // TODO: Navigate to booking confirmation page
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    router.push('/profile');
  };

  const handleSignOut = async () => {
    setIsOpen(false);
    try {
      await signOut();
      showToast({
        message: 'Signed out successfully.',
        severity: 'success',
      });
    } catch (err) {
      console.error('Failed to sign out:', err);
      showToast({
        message: err instanceof Error ? err.message : 'Failed to sign out. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleSignIn = () => {
    setIsOpen(false);
    onSignInClick();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="hover:opacity-80 transition-opacity"
        aria-label="User menu"
      >
        <Avatar />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {user ? (
            <>
              <button
                type="button"
                onClick={handleBookingClick}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="text-gray-800">Travel Booking Confirmation</span>
              </button>

              <button
                type="button"
                onClick={handleProfileClick}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-gray-800">Profile</span>
              </button>

              <div className="border-t border-gray-200 my-2"></div>

              <button
                type="button"
                onClick={handleSignOut}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-red-600 font-medium">Sign Out</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleSignIn}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span className="text-blue-600 font-medium">Sign In</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
