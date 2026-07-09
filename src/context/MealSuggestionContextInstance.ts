import { createContext } from 'react';
import type { MealSuggestions } from '../types/MealSuggestion';

interface MealSuggestionContextType {
  suggestions: MealSuggestions[];
  isLoading: boolean;
  error: string;
  generateMeals: (targetCalories: number, goal: string) => Promise<void>;
}

export const MealSuggestionContext =
  createContext<MealSuggestionContextType | null>(null);
