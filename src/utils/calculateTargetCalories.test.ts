import { it, describe, expect } from 'vitest';
import type { UserProfile } from '../types/UserProfile';
import calculateTDEE from './calculateTDEE';
import calculateTargetCalories from './calculateTargetCalories';

describe('calculateTDEE', () => {
  it('calcule correctement le TDEE pour un homme modérément actif qui veut perdre du poids', () => {
    const profile: UserProfile = {
      user_id: 'test-user',
      age: 30,
      weight: 80,
      height: 180,
      gender: 'male',
      activityLevel: 'moderate',
      goal: 'lose',
    };
    expect(calculateTargetCalories(calculateTDEE(profile), profile.goal)).toBe(
      2259,
    );
  });
  it('calcule correctement le TDDE pour une femme légèrement active qui veut prendre du poids', () => {
    const profile: UserProfile = {
      user_id: 'test-user',
      age: 25,
      weight: 50,
      height: 165,
      gender: 'female',
      activityLevel: 'light',
      goal: 'gain',
    };
    expect(calculateTargetCalories(calculateTDEE(profile), profile.goal)).toBe(
      2112,
    );
  });
});
