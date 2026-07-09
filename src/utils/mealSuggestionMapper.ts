import type { MealSuggestions } from '../types/MealSuggestion';

export function toDbMealSuggestion(suggestion: Omit<MealSuggestions, 'id'>) {
  return {
    user_id: suggestion.user_id,
    date: suggestion.date,
    meals: suggestion.meals,
    total_calories: suggestion.totalCalories,
  };
}

export function fromDbMealSuggestion(data: any): MealSuggestions {
  return {
    id: data.id,
    user_id: data.user_id,
    date: data.date,
    meals: data.meals,
    totalCalories: data.total_calories,
  };
}
