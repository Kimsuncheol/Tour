import { User } from 'firebase/auth';

export interface CustomizedUser extends User {
  status: 'admin' | 'user';
  shortBio?: string;
  location: string;
  phoneNumber: string;
  method: 'email' | 'google';
}
