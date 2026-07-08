import type { UserProfile } from '../types/UserProfile';

// Convert a profile from the app (camelCase) to a database format (snake_case)
export function toDbProfile(profile: Omit<UserProfile, 'id'>) {
  return {
    user_id: profile.user_id,
    age: profile.age,
    weight: profile.weight,
    height: profile.height,
    gender: profile.gender,
    activity_level: profile.activityLevel,
    goal: profile.goal,
  };
}

// Convert a line from the database (snake_case) to the app format (camelCase)
export function fromDbProfile(data: any): UserProfile {
  return {
    id: data.id,
    user_id: data.user_id,
    age: data.age,
    weight: data.weight,
    height: data.height,
    gender: data.gender,
    activityLevel: data.activity_level,
    goal: data.goal,
  };
}
