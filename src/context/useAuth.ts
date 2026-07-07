import { useContext } from 'react';
import { AuthContext } from './AuthContextInstance';

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
}
