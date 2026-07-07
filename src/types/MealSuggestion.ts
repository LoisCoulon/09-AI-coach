import type { Meal } from './Meal';

export interface MealSuggestions {
  id: number;
  user_id: string;
  date: string;
  meals: Meal[];
  totalCalories: number;
}
