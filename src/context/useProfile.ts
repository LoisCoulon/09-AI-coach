import { useContext } from 'react';
import { ProfileContext } from './ProfileContextInstance';

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === null) {
    throw new Error('useProfile doit être utilisé dans un ProfileProvider');
  }
  return context;
}
