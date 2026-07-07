import type { UserProfile } from '../types/UserProfile';

const activityMultipliers = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

export default function calculateTDEE(profile: UserProfile): number {
  let bmr: number;

  if (profile.gender === 'male') {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
  } else {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
  }
  const tdee = bmr * activityMultipliers[profile.activityLevel];
  return Math.round(tdee);
}
