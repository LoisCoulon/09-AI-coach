import { it, describe, expect } from 'vitest';
import type { UserProfile } from '../types/UserProfile';
import calculateTDEE from './calculateTDEE';

describe('calculateTDEE', () => {
  it('calcule correctement le TDEE pour un homme modérément actif', () => {
    const profile: UserProfile = {
      user_id: 'test-user',
      age: 30,
      weight: 80,
      height: 180,
      gender: 'male',
      activityLevel: 'moderate',
      goal: 'maintain',
    };
    expect(calculateTDEE(profile)).toBe(2759);
  });
  it('calcule correctement le TDDE pour une femme légèrement active', () => {
    const profile: UserProfile = {
      user_id: 'test-user',
      age: 25,
      weight: 60,
      height: 165,
      gender: 'female',
      activityLevel: 'light',
      goal: 'maintain',
    };
    expect(calculateTDEE(profile)).toBe(1850);
  });
});
