import type { UserProfile } from '../types/UserProfile';

export default function calculateTargetCalories(
  tdee: number,
  goal: UserProfile['goal'],
): number {
  if (goal === 'lose') {
    return tdee - 500;
  }
  if (goal === 'gain') {
    return tdee + 400;
  }
  return tdee;
}
