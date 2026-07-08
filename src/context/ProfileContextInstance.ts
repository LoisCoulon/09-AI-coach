import { createContext } from 'react';
import type { UserProfile } from '../types/UserProfile';

interface ProfileContextType {
  profile: UserProfile | null;
  saveProfile: (profile: UserProfile) => Promise<void>;
  updateProfile: (profile: UserProfile) => Promise<void>;
}

export const ProfileContext = createContext<ProfileContextType | null>(null);
