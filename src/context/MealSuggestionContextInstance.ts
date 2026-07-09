import { createContext } from 'react';
import type { MealSuggestions } from '../types/MealSuggestion';

interface MealSuggestionContextType {
  suggestions: MealSuggestions[];
  isLoading: boolean;
  generateMeals: (targetCalories: number, goal: string) => Promise<void>;
}

export const MealSuggestionContext =
  createContext<MealSuggestionContextType | null>(null);
