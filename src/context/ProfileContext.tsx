import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import type { UserProfile } from '../types/UserProfile';
import { supabase } from '../config/supabase';
import { ProfileContext } from './ProfileContextInstance';
import { fromDbProfile, toDbProfile } from '../utils/profileMapper';

interface ProfileProviderProps {
  children: React.ReactNode;
}

export default function ProfileProvider({ children }: ProfileProviderProps) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  async function saveProfile(newProfile: Omit<UserProfile, 'id'>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([toDbProfile(newProfile)])
      .select()
      .single();

    if (error) throw error;
    if (data) setProfile(fromDbProfile(data));
  }

  async function updateProfile(updatedProfile: UserProfile) {
    const { error } = await supabase
      .from('user_profiles')
      .update(toDbProfile(updatedProfile))
      .eq('user_id', updatedProfile.user_id);
    if (error) {
      throw error;
    }
    setProfile(updatedProfile);
  }

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.log(error);
        return;
      }
      setProfile(data ? fromDbProfile(data) : null);
    }
    fetchProfile();
  }, [user]);

  return (
    <ProfileContext.Provider value={{ saveProfile, updateProfile, profile }}>
      {children}
    </ProfileContext.Provider>
  );
}
