import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import type { UserProfile } from '../types/UserProfile';
import { supabase } from '../config/supabase';
import { ProfileContext } from './ProfileContextInstance';

interface ProfileProviderProps {
  children: React.ReactNode;
}

export default function ProfileProvider({ children }: ProfileProviderProps) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  async function saveProfile(newProfile: Omit<UserProfile, 'id'>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([newProfile])
      .select()
      .single();
    if (error) {
      throw error;
    }
    if (data) {
      setProfile(data);
    }
  }

  async function updateProfile(updatedProfile: UserProfile) {
    const { error } = await supabase
      .from('user_profiles')
      .update(updatedProfile)
      .eq('id', updatedProfile.id);
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

      if (error) {
        console.log(error);
        return;
      }
      setProfile(data);
    }
    fetchProfile();
  }, [user]);

  return (
    <ProfileContext.Provider value={{ saveProfile, updateProfile, profile }}>
      {children}
    </ProfileContext.Provider>
  );
}
