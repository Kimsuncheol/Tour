import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import {
  updateProfile,
  updateEmail,
  RecaptchaVerifier,
  PhoneAuthProvider,
  linkWithCredential,
  User
} from 'firebase/auth';
import { db, auth } from '@/lib/firebase';

export interface ProfileData {
  displayName?: string;
  shortBio?: string;
  location?: string;
  phoneNumber?: string;
  photoURL?: string;
}

/**
 * Get user profile data from Firestore
 */
export const getUserProfile = async (uid: string): Promise<ProfileData | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'members', uid));
    if (userDoc.exists()) {
      return userDoc.data() as ProfileData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

/**
 * Update user display name in both Auth and Firestore
 */
export const updateDisplayName = async (user: User, displayName: string): Promise<void> => {
  try {
    await updateProfile(user, { displayName });
    await updateDoc(doc(db, 'members', user.uid), { displayName });
  } catch (error) {
    console.error('Error updating display name:', error);
    throw error;
  }
};

/**
 * Update user photo URL in both Auth and Firestore
 */
export const updatePhotoURL = async (user: User, photoURL: string): Promise<void> => {
  try {
    await updateProfile(user, { photoURL });
    await updateDoc(doc(db, 'members', user.uid), { photoURL });
  } catch (error) {
    console.error('Error updating photo URL:', error);
    throw error;
  }
};

/**
 * Update user short bio in Firestore
 */
export const updateShortBio = async (uid: string, shortBio: string): Promise<void> => {
  try {
    await updateDoc(doc(db, 'members', uid), { shortBio });
  } catch (error) {
    console.error('Error updating short bio:', error);
    throw error;
  }
};

/**
 * Update user location in Firestore
 */
export const updateLocation = async (uid: string, location: string): Promise<void> => {
  try {
    await updateDoc(doc(db, 'members', uid), { location });
  } catch (error) {
    console.error('Error updating location:', error);
    throw error;
  }
};

/**
 * Initialize reCAPTCHA verifier for phone authentication
 */
export const initializeRecaptcha = (containerId: string): RecaptchaVerifier => {
  return new RecaptchaVerifier(auth, containerId, {
    size: 'normal',
    callback: () => {
      // reCAPTCHA solved, allow phone verification
    },
    'expired-callback': () => {
      // Response expired, ask user to solve reCAPTCHA again
      console.log('reCAPTCHA expired');
    }
  });
};

/**
 * Send SMS verification code to phone number
 */
export const sendPhoneVerificationCode = async (
  phoneNumber: string,
  recaptchaVerifier: RecaptchaVerifier
): Promise<string> => {
  try {
    const phoneProvider = new PhoneAuthProvider(auth);
    const verificationId = await phoneProvider.verifyPhoneNumber(
      phoneNumber,
      recaptchaVerifier
    );
    return verificationId;
  } catch (error) {
    console.error('Error sending verification code:', error);
    throw error;
  }
};

/**
 * Verify SMS code and update phone number
 */
export const verifyAndUpdatePhoneNumber = async (
  user: User,
  verificationId: string,
  verificationCode: string
): Promise<void> => {
  try {
    const credential = PhoneAuthProvider.credential(verificationId, verificationCode);

    // Link phone credential to the user account
    await linkWithCredential(user, credential);

    // Update phone number in Firestore
    await updateDoc(doc(db, 'members', user.uid), {
      phoneNumber: credential.providerId === 'phone' ? user.phoneNumber : null,
    });
  } catch (error) {
    console.error('Error verifying phone number:', error);
    throw error;
  }
};

/**
 * Update multiple profile fields at once
 */
export const updateProfile_bulk = async (
  user: User,
  profileData: ProfileData
): Promise<void> => {
  try {
    const authUpdates: { displayName?: string; photoURL?: string } = {};

    if (profileData.displayName) {
      authUpdates.displayName = profileData.displayName;
    }

    if (profileData.photoURL) {
      authUpdates.photoURL = profileData.photoURL;
    }

    // Update Firebase Auth profile
    if (Object.keys(authUpdates).length > 0) {
      await updateProfile(user, authUpdates);
    }

    // Update Firestore document
    await updateDoc(doc(db, 'members', user.uid), {
      ...profileData,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};
